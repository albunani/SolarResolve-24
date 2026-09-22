"""Assessment service — orchestrates evidence processing and result generation.

On Day 3+, AI provider is not yet integrated. This service uses deterministic
logic and a synthetic demo adapter. The AI adapter slot is clearly separated.
"""

from __future__ import annotations

import time
from datetime import UTC, datetime

from src.models.assessment import (
    AssessmentResult,
    AssessmentStatus,
    CauseAssessment,
    CauseConfidenceLabel,
    ClarificationAnswer,
    EvidenceInput,
    EvidenceSource,
    ImageObservation,
    ProhibitedAction,
    RecommendedAction,
    ResultFact,
    ResultGap,
    SafeAction,
    TechnicianBrief,
)
from src.safety.hazard_policy import (
    ESCALATION_MESSAGE,
    contains_definitive_diagnosis,
    contains_prohibited_action,
    scan_text_for_hazards,
)

MINIMUM_EVIDENCE_FIELDS = 3  # description + at least 2 of: runtimes, pattern, charging


def _count_evidence(evidence: EvidenceInput) -> int:
    count = 1  # description is always present (validated)
    if evidence.previous_runtime_value is not None:
        count += 1
    if evidence.current_runtime_value is not None:
        count += 1
    if evidence.change_pattern.value != "unknown":
        count += 1
    if evidence.reaches_full_charge.value != "unknown":
        count += 1
    return count


def build_assessment(
    evidence: EvidenceInput,
    clarifications: list[ClarificationAnswer] | None = None,
    image_observations: list[ImageObservation] | None = None,
) -> AssessmentResult:
    """Build a structured assessment from validated evidence."""

    # --- Late-stage hazard scan ---
    all_text_parts = [
        evidence.original_description,
        evidence.warning_or_error or "",
        evidence.manual_display_reading or "",
        evidence.recent_maintenance or "",
    ]
    if clarifications:
        for c in clarifications:
            if c.answer:
                all_text_parts.append(c.answer)
    combined_text = " ".join(all_text_parts)
    late_hazards = scan_text_for_hazards(combined_text)

    if late_hazards:
        return AssessmentResult(
            assessment_id=f"eval-{int(time.time())}",
            generated_at=datetime.now(UTC).isoformat(),
            status=AssessmentStatus.urgent_safety_escalation,
            summary=ESCALATION_MESSAGE,
            known_facts=[],
            missing_or_uncertain=[],
            possible_causes=[],
            safe_checks=[],
            prohibited_actions=[ProhibitedAction(
                action="Do NOT touch, open, disconnect, or probe the equipment",
                hazard=ESCALATION_MESSAGE,
            )],
            recommended_next_action=RecommendedAction(
                action="Contact a qualified solar/electrical professional or emergency service immediately.",
                timeline="Immediately",
                requires_technician=True,
            ),
            technician_brief=None,
            disclaimer="This is a decision-support tool. It does not replace professional diagnosis.",
        )

    # --- Insufficient evidence check ---
    evidence_count = _count_evidence(evidence)
    if evidence_count < MINIMUM_EVIDENCE_FIELDS:
        missing_items = []
        if evidence.previous_runtime_value is None:
            missing_items.append(ResultGap(label="Previous battery runtime"))
        if evidence.current_runtime_value is None:
            missing_items.append(ResultGap(label="Current battery runtime"))
        if evidence.reaches_full_charge.value == "unknown":
            missing_items.append(ResultGap(label="Whether battery reaches full charge"))
        return AssessmentResult(
            assessment_id=f"eval-{int(time.time())}",
            generated_at=datetime.now(UTC).isoformat(),
            status=AssessmentStatus.more_information_needed,
            summary="There is not enough evidence to produce a meaningful assessment. Please provide additional observations.",
            known_facts=_build_known_facts(evidence, image_observations),
            missing_or_uncertain=missing_items,
            possible_causes=[],
            safe_checks=[],
            prohibited_actions=[
                ProhibitedAction(action="Do NOT open the inverter casing", hazard="Risk of lethal electric shock."),
                ProhibitedAction(action="Do NOT disconnect battery cables", hazard="Risk of arc flash and fire."),
            ],
            recommended_next_action=RecommendedAction(
                action="Provide the missing observations listed above, then re-run the assessment.",
                timeline="Before contacting a technician",
                requires_technician=False,
            ),
            technician_brief=None,
            disclaimer="This is a decision-support tool. It does not replace professional diagnosis.",
        )

    # --- Build normal assessment ---
    known_facts = _build_known_facts(evidence, image_observations)
    missing = _build_missing(evidence)
    
    # 3. LLM generation
    import logging

    from src.services.ai_provider import (
        ProviderOutputError,
        ProviderUnavailableError,
        get_ai_provider,
    )
    from src.services.prompts import build_provider_prompt

    logger = logging.getLogger(__name__)
    provider = get_ai_provider()

    prompt = build_provider_prompt(evidence, clarifications, image_observations)

    max_attempts = 2  # Hard cap: 1 original + 1 retry
    draft = None

    for attempt in range(max_attempts):
        try:
            draft = provider.generate_assessment_draft(prompt)

            # D4V2-003: validate EVERY model-controlled field individually
            fields_to_check: list[str] = [
                draft.summary,
                draft.recommended_next_action,
            ]
            for cause in draft.possible_causes:
                fields_to_check.append(cause.description)
                fields_to_check.append(cause.category)
            fields_to_check.extend(draft.safe_checks)

            for field_text in fields_to_check:
                if contains_prohibited_action(field_text):
                    raise ProviderOutputError(
                        "Draft field contained a prohibited action."
                    )
                if contains_definitive_diagnosis(field_text):
                    raise ProviderOutputError(
                        "Draft field contained a definitive diagnosis."
                    )

            break  # Valid draft

        except ProviderUnavailableError:
            # Never retry timeout/network/rate-limit errors
            raise

        except ProviderOutputError:
            if attempt == max_attempts - 1:
                logger.error(
                    "AI generation failed after %d attempts", max_attempts
                )
                raise
            logger.warning("AI draft attempt %d rejected, retrying", attempt + 1)

    # Map the validated draft to our deterministic CauseAssessment
    causes = [
        CauseAssessment(
            category=c.category,
            description=c.description,
            confidence=c.confidence,
        )
        for c in draft.possible_causes
    ]

    safe_checks = [
        SafeAction(action=check_text, reason="Recommended by AI assessment.")
        for check_text in draft.safe_checks
    ]
    rec_action_text = draft.recommended_next_action

    prohibited = [
        ProhibitedAction(action="Do NOT open the inverter casing", hazard="Risk of lethal electric shock. Contains high-voltage capacitors."),
        ProhibitedAction(action="Do NOT disconnect battery cables", hazard="Risk of severe arc flash and fire if under load."),
        ProhibitedAction(action="Do NOT bypass fuses or breakers", hazard="Removes critical overcurrent protection."),
    ]

    brief = _build_technician_brief(evidence, known_facts, missing, causes, clarifications)

    return AssessmentResult(
        assessment_id=f"eval-{int(time.time())}",
        generated_at=datetime.now(UTC).isoformat(),
        status=AssessmentStatus.professional_inspection_recommended
            if any(c.confidence == CauseConfidenceLabel.more_consistent for c in causes)
            else AssessmentStatus.safe_observations_recommended,
        summary=draft.summary,
        known_facts=known_facts,
        missing_or_uncertain=missing,
        possible_causes=causes,
        safe_checks=safe_checks,
        prohibited_actions=prohibited,
        recommended_next_action=RecommendedAction(
            action=rec_action_text,
            timeline="Within the next 3 days",
            requires_technician=True,
        ),
        technician_brief=brief,
        disclaimer="This assessment is a decision-support tool. It does not provide a confirmed professional diagnosis or replace a qualified solar technician.",
    )


def _build_known_facts(evidence: EvidenceInput, image_obs: list[ImageObservation] | None = None) -> list[ResultFact]:
    facts = []
    if evidence.previous_runtime_value is not None:
        facts.append(ResultFact(label="Previous Runtime", display_value=f"{evidence.previous_runtime_value} {evidence.previous_runtime_unit or 'hours'}", source=EvidenceSource.user))
    if evidence.current_runtime_value is not None:
        facts.append(ResultFact(label="Current Runtime", display_value=f"{evidence.current_runtime_value} {evidence.current_runtime_unit or 'hours'}", source=EvidenceSource.user))
    if evidence.change_pattern.value != "unknown":
        facts.append(ResultFact(label="Change Pattern", display_value=evidence.change_pattern.value, source=EvidenceSource.user))
    if evidence.reaches_full_charge.value != "unknown":
        facts.append(ResultFact(label="Reaches Full Charge", display_value=evidence.reaches_full_charge.value, source=EvidenceSource.user))
    if evidence.approximate_age:
        facts.append(ResultFact(label="System Age", display_value=evidence.approximate_age, source=EvidenceSource.user))
    for load in evidence.loads:
        facts.append(ResultFact(label=f"Appliance: {load.name}", display_value=f"qty: {load.quantity or '?'}", source=EvidenceSource.user))
    if evidence.manual_display_reading:
        facts.append(ResultFact(label="Manual Display Reading", display_value=evidence.manual_display_reading, source=EvidenceSource.user, confirmed=False))
    if image_obs:
        for obs in image_obs:
            if obs.confirmed and not obs.rejected:
                facts.append(ResultFact(
                    label=obs.label,
                    display_value=obs.corrected_value or obs.extracted_value,
                    source=EvidenceSource.confirmed_image,
                ))
    return facts


def _build_missing(evidence: EvidenceInput) -> list[ResultGap]:
    gaps = []
    if evidence.previous_runtime_value is None:
        gaps.append(ResultGap(label="Previous battery runtime"))
    if evidence.current_runtime_value is None:
        gaps.append(ResultGap(label="Current battery runtime"))
    if evidence.reaches_full_charge.value == "unknown":
        gaps.append(ResultGap(label="Whether battery reaches full charge before evening use"))
    if not evidence.approximate_age:
        gaps.append(ResultGap(label="System age"))
    if not evidence.loads:
        gaps.append(ResultGap(label="Connected appliance/load details"))
    if not evidence.battery_brand and not evidence.battery_model:
        gaps.append(ResultGap(label="Battery brand and model"))
    return gaps


def _build_causes(evidence: EvidenceInput, clarifications: list[ClarificationAnswer] | None) -> list[CauseAssessment]:
    causes = []
    # Check for load-related cause
    has_new_load = any(l.recently_added_or_changed for l in evidence.loads)
    if has_new_load:
        causes.append(CauseAssessment(
            category="Increased Load",
            description="The available information is more consistent with increased energy consumption from recently added or changed appliances.",
            confidence=CauseConfidenceLabel.more_consistent,
        ))
    # Check for charging-related cause
    if evidence.reaches_full_charge.value in ("no", "sometimes"):
        causes.append(CauseAssessment(
            category="Incomplete Charging",
            description="The available information is more consistent with the battery not reaching full state of charge before evening use begins.",
            confidence=CauseConfidenceLabel.more_consistent,
        ))
    # Battery age consideration
    causes.append(CauseAssessment(
        category="Battery Degradation",
        description="Battery capacity may have reduced over time. This is possible but there is insufficient evidence from remote observations to confirm.",
        confidence=CauseConfidenceLabel.possible_insufficient,
    ))
    # If no specific evidence points anywhere, mark cannot assess
    if len(causes) == 1:  # only battery degradation
        causes.append(CauseAssessment(
            category="Configuration Issue",
            description="A charge controller or inverter settings issue cannot be assessed without professional inspection.",
            confidence=CauseConfidenceLabel.cannot_assess,
        ))
    return causes


def _build_technician_brief(
    evidence: EvidenceInput,
    facts: list[ResultFact],
    missing: list[ResultGap],
    causes: list[CauseAssessment],
    clarifications: list[ClarificationAnswer] | None,
) -> TechnicianBrief:
    sections = []
    sections.append("=" * 50)
    sections.append("TECHNICIAN BRIEF — SolarResolve Decision Support")
    sections.append("=" * 50)
    sections.append("")
    sections.append("USER-STATED PROBLEM")
    sections.append(evidence.original_description)
    sections.append("")
    sections.append("RUNTIME CHANGE")
    prev = f"{evidence.previous_runtime_value} {evidence.previous_runtime_unit or 'hours'}" if evidence.previous_runtime_value else "Not provided"
    curr = f"{evidence.current_runtime_value} {evidence.current_runtime_unit or 'hours'}" if evidence.current_runtime_value else "Not provided"
    sections.append(f"  Previous: {prev}")
    sections.append(f"  Current:  {curr}")
    sections.append(f"  Pattern:  {evidence.change_pattern.value}")
    sections.append(f"  Began:    {evidence.change_began or 'Not provided'}")
    sections.append("")
    sections.append("SYSTEM SUMMARY")
    sections.append(f"  Age: {evidence.approximate_age or 'Unknown'}")
    sections.append(f"  Inverter: {evidence.inverter_brand or '?'} {evidence.inverter_model or '?'}")
    sections.append(f"  Battery: {evidence.battery_brand or '?'} {evidence.battery_model or '?'}")
    sections.append(f"  Panels: {evidence.panel_capacity or 'Unknown'}")
    sections.append("")
    sections.append("APPLIANCES AND LOADS")
    if evidence.loads:
        for load in evidence.loads:
            changed = " (recently added/changed)" if load.recently_added_or_changed else ""
            sections.append(f"  - {load.name}{changed}")
    else:
        sections.append("  No loads reported.")
    sections.append("")
    sections.append("DISPLAY READINGS")
    sections.append(f"  Manual reading: {evidence.manual_display_reading or 'None entered'}")
    sections.append("")
    sections.append("WARNINGS / ERROR CODES")
    sections.append(f"  {evidence.warning_or_error or 'None reported'}")
    sections.append("")
    sections.append("SAFE OBSERVATIONS COMPLETED")
    sections.append("  (To be filled by user after performing safe checks)")
    sections.append("")
    sections.append("CONFIRMED FACTS")
    for f in facts:
        sections.append(f"  [{f.source.value}] {f.label}: {f.display_value}")
    sections.append("")
    sections.append("PROFESSIONAL INVESTIGATION AREAS")
    for c in causes:
        sections.append(f"  - {c.category}: {c.description}")
    sections.append("")
    sections.append("UNRESOLVED QUESTIONS")
    for m in missing:
        sections.append(f"  - {m.label}")
    sections.append("")
    sections.append("SAFETY STATEMENT")
    sections.append("  Do not open equipment, touch terminals, disconnect cables,")
    sections.append("  bypass protection, probe contacts, or take live measurements.")
    sections.append("  All physical inspection requires a qualified technician.")
    sections.append("")
    sections.append("DISCLAIMER")
    sections.append("  This brief is generated by SolarResolve, a decision-support tool.")
    sections.append("  It does not provide a confirmed professional diagnosis or replace")
    sections.append("  a qualified solar technician.")
    sections.append("=" * 50)
    return TechnicianBrief(generated_text="\n".join(sections))
