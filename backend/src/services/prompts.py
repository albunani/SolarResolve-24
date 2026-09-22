from src.models.assessment import EvidenceInput, ClarificationAnswer, ImageObservation

# v1 Prompt Template
DAY4_SYSTEM_INSTRUCTION = (
    "You are an expert solar energy technician decision-support system. "
    "Analyze the provided evidence and generate a structured assessment draft. "
    "Do NOT include prohibited physical actions (e.g. opening inverter, bypassing fuses, taking live measurements, touching wires). "
    "Ensure causes use ONLY the permitted confidence labels."
)

def build_provider_prompt(
    evidence: EvidenceInput, 
    clarifications: list[ClarificationAnswer] | None, 
    image_observations: list[ImageObservation] | None
) -> str:
    prompt_lines = [
        "Please provide a safe, non-definitive assessment draft based on the following evidence.",
        "=== BEGIN UNTRUSTED EVIDENCE ===",
        f"Original Description: {evidence.original_description}",
        f"Change Pattern: {evidence.change_pattern.value}",
        f"Reaches Full Charge: {evidence.reaches_full_charge.value}",
    ]
    if evidence.previous_runtime_value is not None:
        prompt_lines.append(f"Previous Runtime: {evidence.previous_runtime_value} {evidence.previous_runtime_unit or 'hours'}")
    if evidence.current_runtime_value is not None:
        prompt_lines.append(f"Current Runtime: {evidence.current_runtime_value} {evidence.current_runtime_unit or 'hours'}")
    
    if image_observations:
        prompt_lines.append("Confirmed Images:")
        for obs in image_observations:
            if obs.confirmed and not obs.rejected:
                prompt_lines.append(f"- {obs.label}: {obs.corrected_value or obs.extracted_value}")
                
    if clarifications:
        prompt_lines.append("Clarifications:")
        for c in clarifications:
            if c.answer:
                prompt_lines.append(f"- Q: {c.question} A: {c.answer}")
                
    prompt_lines.append("=== END UNTRUSTED EVIDENCE ===")
    return "\n".join(prompt_lines)
