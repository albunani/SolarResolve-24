import pytest
from unittest.mock import MagicMock, patch
import os
import json

from src.services.ai_provider import (
    GeminiAssessmentProvider, 
    ModelAssessmentDraft, 
    get_ai_provider,
    ProviderUnavailableError,
    ProviderOutputError
)

def test_get_ai_provider_synthetic(monkeypatch):
    monkeypatch.setenv("AI_PROVIDER", "synthetic")
    provider = get_ai_provider()
    assert provider.__class__.__name__ == "SyntheticAssessmentProvider"

def test_get_ai_provider_gemini(monkeypatch):
    monkeypatch.setenv("AI_PROVIDER", "gemini")
    monkeypatch.setenv("GEMINI_API_KEY", "test-key")
    provider = get_ai_provider()
    assert provider.__class__.__name__ == "GeminiAssessmentProvider"
    assert provider.model == "gemini-3.8-flash"

def test_get_ai_provider_gemini_missing_key(monkeypatch):
    monkeypatch.setenv("AI_PROVIDER", "gemini")
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    with pytest.raises(ProviderUnavailableError, match="GEMINI_API_KEY is required"):
        get_ai_provider()

def test_gemini_assessment_provider_success():
    provider = GeminiAssessmentProvider(api_key="test", model="test-model", timeout=10)
    
    mock_interaction = MagicMock()
    mock_interaction.text = json.dumps({
        "summary": "Test Summary",
        "possible_causes": [
            {
                "category": "Test Cause",
                "description": "Test Desc",
                "confidence": "more consistent"
            }
        ],
        "safe_checks": ["Test Check"],
        "recommended_next_action": "Test Action"
    })
    
    provider.client.models.generate_content = MagicMock(return_value=mock_interaction)
    
    draft = provider.generate_assessment_draft("test prompt")
    
    # Verify exact schema configuration passed to SDK
    call_kwargs = provider.client.models.generate_content.call_args.kwargs
    assert call_kwargs["config"].response_schema == ModelAssessmentDraft.model_json_schema()
    assert call_kwargs["config"].response_mime_type == "application/json"
    
    assert isinstance(draft, ModelAssessmentDraft)
    assert draft.summary == "Test Summary"
    assert len(draft.possible_causes) == 1
    assert draft.possible_causes[0].category == "Test Cause"
    assert draft.possible_causes[0].confidence.value == "more consistent"

def test_gemini_assessment_provider_rate_limit():
    from google.genai.errors import APIError
    provider = GeminiAssessmentProvider(api_key="test", model="test-model", timeout=10)
    
    class MockError(APIError):
        def __init__(self, message):
            self.message = message
        def __str__(self):
            return self.message
            
    # Mock an APIError with 429
    error = MockError("429 Too Many Requests")
    provider.client.models.generate_content = MagicMock(side_effect=error)
    
    with pytest.raises(ProviderUnavailableError, match="Rate limit or service unavailable"):
        provider.generate_assessment_draft("test prompt")

def test_gemini_assessment_provider_generic_unavailability():
    from google.genai.errors import APIError
    provider = GeminiAssessmentProvider(api_key="test", model="test-model", timeout=10)
    
    class MockError(APIError):
        def __init__(self, message):
            self.message = message
        def __str__(self):
            return self.message
            
    # Mock an APIError with 503
    error = MockError("503 Service Unavailable")
    provider.client.models.generate_content = MagicMock(side_effect=error)
    
    with pytest.raises(ProviderUnavailableError, match="Rate limit or service unavailable"):
        provider.generate_assessment_draft("test prompt")

def test_gemini_assessment_provider_empty_response():
    provider = GeminiAssessmentProvider(api_key="test", model="test-model", timeout=10)
    
    mock_interaction = MagicMock()
    mock_interaction.text = ""  # Empty response
    provider.client.models.generate_content = MagicMock(return_value=mock_interaction)
    
    with pytest.raises(ProviderOutputError, match="Provider returned empty or blocked response"):
        provider.generate_assessment_draft("test prompt")
