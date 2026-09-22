import os
import json
import logging
from typing import Protocol, Optional
from pydantic import BaseModel, Field

from src.models.assessment import CauseConfidenceLabel

logger = logging.getLogger(__name__)

class ModelCauseAssessment(BaseModel):
    category: str
    description: str
    confidence: CauseConfidenceLabel

class ModelAssessmentDraft(BaseModel):
    summary: str
    possible_causes: list[ModelCauseAssessment]
    safe_checks: list[str]
    recommended_next_action: str

class ProviderUnavailableError(Exception):
    """Mapped to 503 Service Unavailable."""
    pass

class ProviderOutputError(Exception):
    """Mapped to 502 Bad Gateway."""
    pass

class AssessmentAIProvider(Protocol):
    def generate_assessment_draft(self, prompt: str) -> ModelAssessmentDraft:
        ...

class SyntheticAssessmentProvider:
    def generate_assessment_draft(self, prompt: str) -> ModelAssessmentDraft:
        causes = [
            ModelCauseAssessment(
                category="Battery Degradation",
                description="Battery capacity may have reduced over time. This is possible but there is insufficient evidence from remote observations to confirm.",
                confidence=CauseConfidenceLabel.possible_insufficient,
            )
        ]
        
        if "reaches_full_charge: no" in prompt.lower() or "reaches_full_charge: sometimes" in prompt.lower():
            causes.insert(0, ModelCauseAssessment(
                category="Incomplete Charging",
                description="The available information is more consistent with the battery not reaching full state of charge before evening use begins.",
                confidence=CauseConfidenceLabel.more_consistent,
            ))
        if "recently_added_or_changed: true" in prompt.lower():
            causes.insert(0, ModelCauseAssessment(
                category="Increased Load",
                description="The available information is more consistent with increased energy consumption from recently added or changed appliances.",
                confidence=CauseConfidenceLabel.more_consistent,
            ))
            
        if len(causes) == 1:
            causes.append(ModelCauseAssessment(
                category="Configuration Issue",
                description="A charge controller or inverter settings issue cannot be assessed without professional inspection.",
                confidence=CauseConfidenceLabel.cannot_assess,
            ))

        return ModelAssessmentDraft(
            summary="The system shows a significant decline in battery runtime. The available evidence is reviewed below.",
            possible_causes=causes,
            safe_checks=[
                "Record the displayed battery percentage at sunset",
                "Temporarily unplug non-essential loads overnight"
            ],
            recommended_next_action="Run a 24-hour observation with non-essential loads removed. If runtime does not improve with confirmed full charge, schedule a qualified technician to inspect battery cell health and charge controller settings."
        )

class GeminiAssessmentProvider:
    def __init__(self, api_key: str, model: str, timeout: int):
        from google import genai
        from google.genai.client import HttpOptions
        
        self.model = model
        self.timeout = timeout
        
        http_options = HttpOptions(timeout=timeout)
        self.client = genai.Client(api_key=api_key, http_options=http_options)

    def generate_assessment_draft(self, prompt: str) -> ModelAssessmentDraft:
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
                raise ProviderOutputError("Provider returned empty or blocked response.")
                
            return ModelAssessmentDraft.model_validate_json(interaction.text)
        except APIError as e:
            if "429" in str(e) or "quota" in str(e).lower() or "503" in str(e):
                raise ProviderUnavailableError("Rate limit or service unavailable") from e
            raise ProviderUnavailableError(f"Provider API Error: {e}") from e
        except ProviderOutputError:
            raise
        except Exception as e:
            raise ProviderOutputError(f"Failed to generate assessment: {e}") from e

def get_ai_provider() -> AssessmentAIProvider:
    provider_type = os.environ.get("AI_PROVIDER", "synthetic").lower()
    if provider_type == "synthetic":
        return SyntheticAssessmentProvider()
    elif provider_type == "gemini":
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise ProviderUnavailableError("GEMINI_API_KEY is required when AI_PROVIDER=gemini")
        model = os.environ.get("GEMINI_MODEL", "gemini-3.8-flash")
        timeout = int(os.environ.get("AI_TIMEOUT_SECONDS", "20"))
        
        # In testing environments, we might want to mock the client but it requires http_options which needs httpx.
        return GeminiAssessmentProvider(api_key, model, timeout)
    else:
        raise ProviderUnavailableError(f"Unknown AI_PROVIDER: {provider_type}")
