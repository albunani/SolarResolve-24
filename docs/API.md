# API Design

## 1. Introduction
This document defines the web-service interface (API) for the SolarResolve MVP. The API is designed to support the progressive intake flow, synthetic AI image extraction (Day 3/MVP), and deterministic assessment generation.

## 2. API Routes

### 2.1 Check Hazards
**Endpoint:** `POST /api/v1/assessments/check-hazards`
**Purpose:** Validates the user's initial hazard screening answers before allowing them to enter the flow.
**Request Payload:**
```json
{
  "hazards_reported": ["smoke_or_fire"],
  "none_observed": false
}
```
**Response:**
```json
{
  "is_safe": false,
  "escalation_message": "Keep a safe distance. Do not touch, open, disconnect, probe, or attempt to repair the equipment...",
  "triggered_hazards": ["smoke_or_fire"]
}
```

### 2.2 Upload Image Evidence
**Endpoint:** `POST /api/v1/assessments/upload-image`
**Content-Type:** `multipart/form-data`
**Purpose:** Accepts an uploaded image, returning synthetic observations marked with their readability state (Clear, Uncertain, Unreadable).
**Payload:**
- `image` (file, max 5MB)
**Response:**
```json
[
  {
    "label": "Inverter Error Code",
    "extracted_value": "E04",
    "readability": "clear",
    "confirmed": false
  }
]
```

### 2.3 Inline Generate Assessment
**Endpoint:** `POST /api/v1/assessments/inline/generate`
**Purpose:** Submits the combined state (text evidence, follow-up answers, confirmed image observations) in a single stateless payload to generate the final assessment and technician brief.
**Request Payload:**
```json
{
  "evidence": {
    "original_description": "Battery dies early",
    "previous_runtime_value": 7.0,
    "previous_runtime_unit": "hours",
    "current_runtime_value": 3.0,
    "current_runtime_unit": "hours",
    "change_pattern": "gradual",
    "reaches_full_charge": "no",
    "loads": []
  },
  "clarifications": [
    {
      "question": "Has any appliance been added or used for longer recently?",
      "answer": "Yes, a freezer"
    }
  ],
  "image_observations": []
}
```
**Response:**
```json
{
  "assessment_id": "uuid-1234",
  "schema_version": "1.0",
  "generated_at": "2026-09-21T00:00:00Z",
  "status": "safe_observations_recommended",
  "summary": "The evidence suggests increased load or incomplete charging...",
  "known_facts": [
    {
      "label": "Previous runtime",
      "display_value": "7.0 hours",
      "source": "user",
      "confirmed": true
    }
  ],
  "missing_or_uncertain": [
    {"label": "Battery chemistry"}
  ],
  "possible_causes": [
    {
      "category": "Increased load",
      "description": "Addition of a freezer matches the timeline of reduced runtime.",
      "is_safety_concern": false,
      "confidence": "more consistent"
    }
  ],
  "safe_checks": [
    {"action": "Record Display", "reason": "Check voltage at sunset."}
  ],
  "prohibited_actions": [
    {"action": "Do not open enclosure", "hazard": "Electric shock"}
  ],
  "recommended_next_action": {
    "action": "Gather one missing observation before contacting support.",
    "timeline": "Next 24 hours",
    "requires_technician": false
  },
  "technician_brief": {
    "generated_text": "Date: 2026-09-21\nProblem: Reduced runtime...\n..."
  },
  "disclaimer": "This is decision support, not professional diagnosis."
}
```

## 3. Error Handling
The API will return standard HTTP status codes:
- `400 Bad Request`: Invalid input format or missing required fields.
- `413 Payload Too Large`: Uploaded image exceeds size limits.
- `422 Unprocessable Entity`: Safety layer blocked the request, or Pydantic validation failed (e.g. negative values).
- `500 Internal Server Error`: AI service unavailable or internal processing failure.

## 4. Privacy & Retention
- The API is fully stateless.
- `inline/generate` processes the text locally and generates deterministic outputs without a database.
- Images sent via `multipart/form-data` are held in memory during the request lifecycle and discarded immediately after AI extraction.
