"""Tests for assessment API endpoints."""

import pytest
from fastapi.testclient import TestClient

from src.app.main import app

client = TestClient(app)


class TestCheckHazards:
    def test_no_hazard_safe(self):
        r = client.post("/api/v1/assessments/check-hazards", json={"hazards_reported": [], "none_observed": True})
        assert r.status_code == 200
        assert r.json()["is_safe"] is True

    def test_hazard_triggers_escalation(self):
        r = client.post("/api/v1/assessments/check-hazards", json={"hazards_reported": ["smoke_or_fire"], "none_observed": False})
        assert r.status_code == 200
        data = r.json()
        assert data["is_safe"] is False
        assert "Keep a safe distance" in data["escalation_message"]

    def test_empty_selection_rejected(self):
        r = client.post("/api/v1/assessments/check-hazards", json={"hazards_reported": [], "none_observed": False})
        assert r.status_code == 400

    def test_invalid_hazard_id(self):
        r = client.post("/api/v1/assessments/check-hazards", json={"hazards_reported": ["fake_hazard"], "none_observed": False})
        assert r.status_code == 400


class TestGenerateAssessment:
    def _minimal_evidence(self) -> dict:
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

    def test_successful_assessment(self):
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": self._minimal_evidence()})
        assert r.status_code == 200
        data = r.json()
        assert data["status"] in ["safe_observations_recommended", "professional_inspection_recommended"]
        assert len(data["known_facts"]) > 0
        assert data["disclaimer"]
        assert data["technician_brief"] is not None

    def test_insufficient_evidence(self):
        r = client.post("/api/v1/assessments/test-case/generate", json={
            "evidence": {
                "original_description": "Battery dies early",
            }
        })
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "more_information_needed"

    def test_negative_runtime_rejected(self):
        evidence = self._minimal_evidence()
        evidence["previous_runtime_value"] = -5
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": evidence})
        assert r.status_code == 422
        data = r.json()
        assert "negative" in str(data).lower() or "greater than or equal to" in str(data).lower() or "runtime value cannot be negative" in str(data).lower()
        
    def test_missing_evidence_wrapper_rejected(self):
        # Sends flattened evidence instead of wrapped, expecting 422
        evidence = self._minimal_evidence()
        r = client.post("/api/v1/assessments/test-case/generate", json=evidence)
        assert r.status_code == 422
        data = r.json()
        # The error should be about 'evidence' field missing in body
        assert data["detail"][0]["loc"] == ["body", "evidence"]

    def test_empty_description_rejected(self):
        evidence = self._minimal_evidence()
        evidence["original_description"] = ""
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": evidence})
        assert r.status_code == 422

    def test_late_hazard_triggers_escalation(self):
        evidence = self._minimal_evidence()
        evidence["original_description"] = "Battery dies at 11pm and I saw smoke coming from it"
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": evidence})
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "urgent_safety_escalation"

    def test_late_hazard_clear_negative_ignored(self):
        evidence = self._minimal_evidence()
        evidence["original_description"] = "There is no smoke or exposed wiring."
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": evidence})
        assert r.status_code == 200
        data = r.json()
        assert data["status"] != "urgent_safety_escalation"

    def test_late_hazard_ambiguous_triggers_escalation(self):
        evidence = self._minimal_evidence()
        evidence["original_description"] = "I may have noticed a burning smell."
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": evidence})
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "urgent_safety_escalation"

    def test_approved_cause_labels(self):
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": self._minimal_evidence()})
        assert r.status_code == 200
        data = r.json()
        
        allowed_confidences = {
            "more consistent",
            "possible but insufficient evidence",
            "cannot assess"
        }
        
        for cause in data["possible_causes"]:
            assert cause["confidence"] in allowed_confidences, f"Invalid confidence: {cause['confidence']}"

    def test_no_defective_declaration(self):
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": self._minimal_evidence()})
        data = r.json()
        full_text = str(data)
        assert "is defective" not in full_text.lower()
        assert "has failed" not in full_text.lower()
        assert "is bad" not in full_text.lower()

    def test_result_contains_all_sections(self):
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": self._minimal_evidence()})
        data = r.json()
        required_keys = [
            "assessment_id", "status", "summary", "known_facts",
            "missing_or_uncertain", "possible_causes", "safe_checks",
            "prohibited_actions", "recommended_next_action", "disclaimer",
        ]
        for key in required_keys:
            assert key in data, f"Missing required key: {key}"

    def test_facts_have_source(self):
        r = client.post("/api/v1/assessments/test-case/generate", json={"evidence": self._minimal_evidence()})
        data = r.json()
        allowed_sources = {"user", "confirmed_image", "deterministic_calculation"}
        for fact in data["known_facts"]:
            assert fact["source"] in allowed_sources, f"Invalid source: {fact['source']}"
