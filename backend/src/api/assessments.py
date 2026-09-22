"""Assessment API routes.

Endpoints:
- POST /api/v1/assessments/check-hazards
- POST /api/v1/assessments/process-evidence
- POST /api/v1/assessments/{case_id}/generate
"""

from __future__ import annotations

import uuid

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from src.models.assessment import (
    AssessmentResult,
    ClarificationAnswer,
    EvidenceInput,
    HazardCheckRequest,
    HazardCheckResponse,
    ImageObservation,
    ReadabilityState,
)
from src.safety.hazard_policy import ESCALATION_MESSAGE, HAZARD_IDS
from src.services.assessment_service import build_assessment

router = APIRouter(prefix="/assessments", tags=["assessments"])

# In-memory case store (session-only, no persistent DB)
_cases: dict[str, dict] = {}


# ---------------------------------------------------------------------------
# Check Hazards
# ---------------------------------------------------------------------------
@router.post("/check-hazards", response_model=HazardCheckResponse)
def check_hazards(request: HazardCheckRequest) -> HazardCheckResponse:
    if not request.hazards_reported and not request.none_observed:
        raise HTTPException(status_code=400, detail="Select at least one hazard or 'None observed'.")

    invalid = [h for h in request.hazards_reported if h not in HAZARD_IDS]
    if invalid:
        raise HTTPException(status_code=400, detail=f"Unknown hazard IDs: {invalid}")

    if request.hazards_reported:
        return HazardCheckResponse(
            is_safe=False,
            escalation_message=ESCALATION_MESSAGE,
            triggered_hazards=request.hazards_reported,
        )
    return HazardCheckResponse(is_safe=True)


# ---------------------------------------------------------------------------
# Upload Image (Phase 9)
# ---------------------------------------------------------------------------
@router.post("/upload-image", response_model=list[ImageObservation])
def upload_image(image: UploadFile = File(...)):
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Must be an image.")
    
    # Read first chunk to check size
    file_bytes = image.file.read(1024 * 1024 * 5 + 1)  # Read up to 5MB + 1 byte
    if len(file_bytes) > 1024 * 1024 * 5:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 5MB.")
    
    # Synthetic demo fixture
    return [
        ImageObservation(
            label="Inverter Error Code",
            extracted_value="E04",
            readability=ReadabilityState.clear,
        ),
        ImageObservation(
            label="Battery Voltage",
            extracted_value="48.2V",
            readability=ReadabilityState.uncertain,
        ),
        ImageObservation(
            label="Load Output",
            extracted_value="---",
            readability=ReadabilityState.unreadable,
        ),
    ]


# ---------------------------------------------------------------------------
# Process Evidence
# ---------------------------------------------------------------------------
@router.post("/process-evidence")
def process_evidence(
    description: str = Form(...),
    system_details: str = Form(default="{}"),
    loads: str = Form(default="[]"),
):
    case_id = str(uuid.uuid4())
    _cases[case_id] = {
        "description": description,
        "system_details": system_details,
        "loads": loads,
    }
    follow_up_questions = [
        "Does the battery show a full charge before evening use begins?",
        "Has any appliance been added or used for longer recently?",
        "Did this issue begin after any maintenance or settings change?",
    ]
    return {
        "case_id": case_id,
        "extracted_facts": {},
        "follow_up_questions": follow_up_questions,
    }


import logging

from src.services.ai_provider import ProviderOutputError, ProviderUnavailableError

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Generate Assessment
# ---------------------------------------------------------------------------
@router.post("/{case_id}/generate", response_model=AssessmentResult)
def generate_assessment(
    case_id: str,
    evidence: EvidenceInput,
    clarifications: list[ClarificationAnswer] | None = None,
    image_observations: list[ImageObservation] | None = None,
) -> AssessmentResult:
    try:
        result = build_assessment(evidence, clarifications, image_observations)
        return result
    except ProviderUnavailableError as e:
        logger.error(f"AI timeout/rate limit: {e.__class__.__name__} - {str(e)}")
        raise HTTPException(status_code=503, detail=f"AI Error: {str(e)}")
    except ProviderOutputError as e:
        logger.error(f"AI provider error: {e.__class__.__name__} - {str(e)}")
        raise HTTPException(status_code=502, detail=f"AI Output Error: {str(e)}")


# ---------------------------------------------------------------------------
# Inline Generate ?" frontend calls this directly with evidence in body
# ---------------------------------------------------------------------------
@router.post("/inline/generate", response_model=AssessmentResult)
def inline_generate_assessment(
    evidence: EvidenceInput,
    clarifications: list[ClarificationAnswer] | None = None,
    image_observations: list[ImageObservation] | None = None,
) -> AssessmentResult:
    try:
        result = build_assessment(evidence, clarifications, image_observations)
        return result
    except ProviderUnavailableError as e:
        logger.error(f"AI timeout/rate limit: {e.__class__.__name__} - {str(e)}")
        raise HTTPException(status_code=503, detail=f"AI Error: {str(e)}")
    except ProviderOutputError as e:
        logger.error(f"AI provider error: {e.__class__.__name__} - {str(e)}")
        raise HTTPException(status_code=502, detail=f"AI Output Error: {str(e)}")
