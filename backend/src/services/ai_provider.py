"""Provider-neutral AI adapter for assessment generation.

Providers:
  - SyntheticAssessmentProvider: deterministic demo/test adapter.
  - GeminiAssessmentProvider: Google Gemini via google-genai SDK.

Exception contract:
  - ProviderUnavailableError → 503 (timeout, rate-limit, network, missing config)
  - ProviderOutputError      → 502 (empty, malformed, or unsafe model output)
"""

import logging
import os
from typing import Protocol

from pydantic import BaseModel

from src.models.assessment import CauseConfidenceLabel

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Internal draft schema (narrower than public AssessmentResult)
# ---------------------------------------------------------------------------
class ModelCauseAssessment(BaseModel):
    category: str
    description: str
    confidence: CauseConfidenceLabel


class ModelAssessmentDraft(BaseModel):
    summary: str
    possible_causes: list[ModelCauseAssessment]
    safe_checks: list[str]
    recommended_next_action: str


# ---------------------------------------------------------------------------
# Typed provider exceptions
# ---------------------------------------------------------------------------
class ProviderUnavailableError(Exception):
    """Mapped to HTTP 503 Service Unavailable.

    Raised for: missing config, timeout, network/transport failure,
    rate-limit (429), server error (5xx).  Must NOT be retried.
    """


class ProviderOutputError(Exception):
    """Mapped to HTTP 502 Bad Gateway.

    Raised for: empty response, malformed JSON, Pydantic validation failure,
    safety-policy violation in the draft.  May be retried once.
    """


# ---------------------------------------------------------------------------
# Protocol
# ---------------------------------------------------------------------------
class AssessmentAIProvider(Protocol):
    def generate_assessment_draft(self, prompt: str) -> ModelAssessmentDraft: ...


# ---------------------------------------------------------------------------
# Synthetic adapter — deterministic, no external calls
# ---------------------------------------------------------------------------
class SyntheticAssessmentProvider:
    """Deterministic provider for tests and local development."""

    def generate_assessment_draft(self, prompt: str) -> ModelAssessmentDraft:
        prompt_lower = prompt.lower()

        causes: list[ModelCauseAssessment] = [
            ModelCauseAssessment(
                category="Battery Degradation",
                description=(
                    "Battery capacity may have reduced over time. "
                    "This is possible but there is insufficient evidence "
                    "from remote observations to confirm."
                ),
                confidence=CauseConfidenceLabel.possible_insufficient,
            ),
        ]

        # D4V2-004: match on structured field labels produced by
        # build_provider_prompt, not snake_case env-var syntax.
        if "reaches full charge: no" in prompt_lower or "reaches full charge: sometimes" in prompt_lower:
            causes.insert(
                0,
                ModelCauseAssessment(
                    category="Incomplete Charging",
                    description=(
                        "The available information is more consistent with "
                        "the battery not reaching full state of charge "
                        "before evening use begins."
                    ),
                    confidence=CauseConfidenceLabel.more_consistent,
                ),
            )

        if "recently added/changed: yes" in prompt_lower:
            causes.insert(
                0,
                ModelCauseAssessment(
                    category="Increased Load",
                    description=(
                        "The available information is more consistent with "
                        "increased energy consumption from recently added "
                        "or changed appliances."
                    ),
                    confidence=CauseConfidenceLabel.more_consistent,
                ),
            )

        if len(causes) == 1:
            causes.append(
                ModelCauseAssessment(
                    category="Configuration Issue",
                    description=(
                        "A charge controller or inverter settings issue "
                        "cannot be assessed without professional inspection."
                    ),
                    confidence=CauseConfidenceLabel.cannot_assess,
                ),
            )

        return ModelAssessmentDraft(
            summary=(
                "The system shows a significant decline in battery runtime. "
                "The available evidence is reviewed below."
            ),
            possible_causes=causes,
            safe_checks=[
                "Record the displayed battery percentage at sunset",
                "Temporarily unplug non-essential loads overnight",
            ],
            recommended_next_action=(
                "Run a 24-hour observation with non-essential loads removed. "
                "If runtime does not improve with confirmed full charge, "
                "schedule a qualified technician to inspect battery cell "
                "health and charge controller settings."
            ),
        )


# ---------------------------------------------------------------------------
# Gemini adapter
# ---------------------------------------------------------------------------
class GeminiAssessmentProvider:
    """Google Gemini adapter using the google-genai SDK."""

    def __init__(self, api_key: str, model: str, timeout_seconds: int) -> None:
        from google import genai

        self.model = model
        self.timeout_seconds = timeout_seconds

        # D4V2-001: The SDK HttpOptions.timeout is documented in
        # milliseconds.  Convert the env-var seconds value exactly once.
        timeout_ms = timeout_seconds * 1000

        self.client = genai.Client(
            api_key=api_key,
            http_options={"timeout": timeout_ms},
        )

    def generate_assessment_draft(self, prompt: str) -> ModelAssessmentDraft:
        import httpx
        from google.genai import types
        from google.genai.errors import APIError

        from src.services.prompts import DAY4_SYSTEM_INSTRUCTION

        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ModelAssessmentDraft.model_json_schema(),
            system_instruction=DAY4_SYSTEM_INSTRUCTION,
            temperature=0.2,
        )

        try:
            interaction = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=config,
            )

            if not interaction.text:
                raise ProviderOutputError(
                    "Provider returned empty or blocked response."
                )

            return ModelAssessmentDraft.model_validate_json(interaction.text)

        # D4V2-002: network / transport / timeout → 503, no retry
        except (httpx.TimeoutException, httpx.ConnectError, httpx.TransportError) as exc:
            raise ProviderUnavailableError(
                "Provider timeout or network error"
            ) from exc

        except APIError as exc:
            error_str = str(exc)
            if "429" in error_str or "quota" in error_str.lower() or "503" in error_str:
                raise ProviderUnavailableError(
                    "Rate limit or service unavailable"
                ) from exc
            raise ProviderUnavailableError(
                "Provider API error"
            ) from exc

        except ProviderOutputError:
            raise

        except ProviderUnavailableError:
            raise

        except Exception as exc:
            raise ProviderOutputError(
                f"Failed to parse provider response: {exc.__class__.__name__}"
            ) from exc


# ---------------------------------------------------------------------------
# Factory
# ---------------------------------------------------------------------------
def get_ai_provider() -> AssessmentAIProvider:
    provider_type = os.environ.get("AI_PROVIDER", "synthetic").lower()

    if provider_type == "synthetic":
        return SyntheticAssessmentProvider()

    if provider_type == "gemini":
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise ProviderUnavailableError(
                "GEMINI_API_KEY is required when AI_PROVIDER=gemini"
            )
        model = "gemini-3.6-flash"
        timeout_seconds = int(os.environ.get("AI_TIMEOUT_SECONDS", "20"))
        return GeminiAssessmentProvider(api_key, model, timeout_seconds)

    raise ProviderUnavailableError(f"Unknown AI_PROVIDER: {provider_type}")
