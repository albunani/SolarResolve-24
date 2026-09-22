import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient

from src.app.main import app
from src.services.ai_provider import ModelAssessmentDraft, ProviderOutputError, ProviderUnavailableError

client = TestClient(app)

def _minimal_evidence() -> dict:
    return {
        "original_description": "Battery dies at 11pm",
        "previous_runtime_value": 7,
        "previous_runtime_unit": "hours",
        "current_runtime_value": 3,
        "current_runtime_unit": "hours",
        "change_pattern": "gradual",
        "reaches_full_charge": "no",
        "loads": [{"name": "Refrigerator"}],
    }

class TestD4SafetyAndValidation:

    @patch("src.services.ai_provider.get_ai_provider")
    def test_invalid_output_retry_success(self, mock_get_provider):
        mock_provider = MagicMock()
        mock_get_provider.return_value = mock_provider
        
        # First call has a prohibited action, second is clean
        draft1 = ModelAssessmentDraft(
            summary="Testing",
            possible_causes=[],
            safe_checks=["Check voltage"],
            recommended_next_action="open the inverter casing" # Prohibited!
        )
        draft2 = ModelAssessmentDraft(
            summary="Testing safe",
            possible_causes=[],
            safe_checks=["Check app"],
            recommended_next_action="Call technician"
        )
        mock_provider.generate_assessment_draft.side_effect = [draft1, draft2]
        
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": _minimal_evidence()})
        assert r.status_code == 200
        assert mock_provider.generate_assessment_draft.call_count == 2
        
    @patch("src.services.ai_provider.get_ai_provider")
    def test_repeated_unsafe_failure_returns_502(self, mock_get_provider):
        mock_provider = MagicMock()
        mock_get_provider.return_value = mock_provider
        
        # All calls have a definitive diagnosis
        draft_unsafe = ModelAssessmentDraft(
            summary="Testing",
            possible_causes=[],
            safe_checks=["Check app"],
            recommended_next_action="The battery is defective." # Definitive!
        )
        mock_provider.generate_assessment_draft.side_effect = [draft_unsafe, draft_unsafe]
        
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": _minimal_evidence()})
        assert r.status_code == 502
        assert mock_provider.generate_assessment_draft.call_count == 2

    @patch("src.services.ai_provider.get_ai_provider")
    def test_api_timeout_returns_503_no_retry(self, mock_get_provider):
        mock_provider = MagicMock()
        mock_get_provider.return_value = mock_provider
        mock_provider.generate_assessment_draft.side_effect = ProviderUnavailableError("Timeout")
        
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": _minimal_evidence()})
        assert r.status_code == 503
        assert mock_provider.generate_assessment_draft.call_count == 1 # NO RETRY
        
    @patch("src.services.ai_provider.get_ai_provider")
    def test_image_inclusion_exclusion(self, mock_get_provider):
        mock_provider = MagicMock()
        mock_get_provider.return_value = mock_provider
        
        draft = ModelAssessmentDraft(
            summary="Testing", possible_causes=[], safe_checks=[], recommended_next_action="Wait"
        )
        mock_provider.generate_assessment_draft.return_value = draft
        
        images = [
            {"image_id": "img1", "label": "Label 1", "extracted_value": "Val 1", "readability": "clear", "confirmed": True, "rejected": False}, # Included
            {"image_id": "img2", "label": "Label 2", "extracted_value": "Val 2", "readability": "clear", "confirmed": False, "rejected": False}, # Excluded
            {"image_id": "img3", "label": "Label 3", "extracted_value": "Val 3", "readability": "clear", "confirmed": True, "rejected": True}, # Excluded
        ]
        
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": _minimal_evidence(), "image_observations": images})
        assert r.status_code == 200
        
        call_args = mock_provider.generate_assessment_draft.call_args[0][0]
        assert "Val 1" in call_args
        assert "Val 2" not in call_args
        assert "Val 3" not in call_args

    @patch("src.services.ai_provider.get_ai_provider")
    def test_hazard_insufficiency_no_provider_calls(self, mock_get_provider):
        mock_provider = MagicMock()
        mock_get_provider.return_value = mock_provider
        
        # Test insufficient evidence
        insufficient = {"original_description": "short"}
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": insufficient})
        assert r.status_code == 200
        assert mock_provider.generate_assessment_draft.call_count == 0
        
        # Test late hazard
        hazard = _minimal_evidence()
        hazard["original_description"] = "Smoke and fire"
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": hazard})
        assert r.status_code == 200
        assert mock_provider.generate_assessment_draft.call_count == 0
