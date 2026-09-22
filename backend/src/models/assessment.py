"""Pydantic models for assessment input, output, and validation.

Derived from CORE_FLOW.md input schema and result payload.
"""

from __future__ import annotations

from enum import Enum

from pydantic import BaseModel, Field, field_validator


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------
class ChangePattern(str, Enum):
    sudden = "sudden"
    gradual = "gradual"
    unknown = "unknown"


class ChargingStatus(str, Enum):
    yes = "yes"
    no = "no"
    sometimes = "sometimes"
    unknown = "unknown"


class ReadabilityState(str, Enum):
    clear = "clear"
    uncertain = "uncertain"
    unreadable = "unreadable"


class EvidenceSource(str, Enum):
    user = "user"
    confirmed_image = "confirmed_image"
    deterministic_calculation = "deterministic_calculation"


class CauseConfidenceLabel(str, Enum):
    more_consistent = "more consistent"
    possible_insufficient = "possible but insufficient evidence"
    cannot_assess = "cannot assess"


class AssessmentStatus(str, Enum):
    more_information_needed = "more_information_needed"
    safe_observations_recommended = "safe_observations_recommended"
    professional_inspection_recommended = "professional_inspection_recommended"
    urgent_safety_escalation = "urgent_safety_escalation"


# ---------------------------------------------------------------------------
# Input models
# ---------------------------------------------------------------------------
class HazardCheckRequest(BaseModel):
    hazards_reported: list[str] = Field(default_factory=list)
    none_observed: bool = False


class HazardCheckResponse(BaseModel):
    is_safe: bool
    escalation_message: str | None = None
    triggered_hazards: list[str] = Field(default_factory=list)


class LoadObservation(BaseModel):
    name: str
    quantity: int | None = None
    stated_power: str | None = None
    recently_added_or_changed: bool | None = None


class EvidenceInput(BaseModel):
    original_description: str = Field(..., min_length=1)
    previous_runtime: str | None = None
    previous_runtime_value: float | None = None
    previous_runtime_unit: str | None = None
    current_runtime: str | None = None
    current_runtime_value: float | None = None
    current_runtime_unit: str | None = None
    change_pattern: ChangePattern = ChangePattern.unknown
    change_began: str | None = None
    warning_or_error: str | None = None
    reaches_full_charge: ChargingStatus = ChargingStatus.unknown
    daytime_charging_change: str | None = None
    approximate_age: str | None = None
    inverter_brand: str | None = None
    inverter_model: str | None = None
    battery_brand: str | None = None
    battery_model: str | None = None
    battery_chemistry: str | None = None
    panel_capacity: str | None = None
    recent_maintenance: str | None = None
    loads: list[LoadObservation] = Field(default_factory=list)
    manual_display_reading: str | None = None

    @field_validator("previous_runtime_value", "current_runtime_value", mode="before")
    @classmethod
    def reject_negative(cls, v: float | None) -> float | None:
        if v is not None and v < 0:
            raise ValueError("Runtime value cannot be negative")
        return v


class ImageObservation(BaseModel):
    label: str
    extracted_value: str
    readability: ReadabilityState
    confirmed: bool = False
    corrected_value: str | None = None
    rejected: bool = False


class ClarificationAnswer(BaseModel):
    question: str
    answer: str | None = None


# ---------------------------------------------------------------------------
# Result models
# ---------------------------------------------------------------------------
class ResultFact(BaseModel):
    label: str
    display_value: str
    source: EvidenceSource
    confirmed: bool = True


class ResultGap(BaseModel):
    label: str


class CauseAssessment(BaseModel):
    category: str
    description: str
    is_safety_concern: bool = False
    confidence: CauseConfidenceLabel


class SafeAction(BaseModel):
    action: str
    reason: str


class ProhibitedAction(BaseModel):
    action: str
    hazard: str


class RecommendedAction(BaseModel):
    action: str
    timeline: str
    requires_technician: bool = False


class TechnicianBrief(BaseModel):
    generated_text: str


class AssessmentResult(BaseModel):
    assessment_id: str
    schema_version: str = "1.0"
    generated_at: str
    status: AssessmentStatus
    summary: str
    known_facts: list[ResultFact]
    missing_or_uncertain: list[ResultGap]
    possible_causes: list[CauseAssessment]
    safe_checks: list[SafeAction]
    prohibited_actions: list[ProhibitedAction]
    recommended_next_action: RecommendedAction
    technician_brief: TechnicianBrief | None = None
    disclaimer: str
