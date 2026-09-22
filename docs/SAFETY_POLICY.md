# Safety Policy

## 1. Introduction
This document defines the strict safety rules and escalation behaviors for the SolarResolve MVP. Safety is treated as application logic, not merely a disclaimer. The application must prioritize user safety above providing an assessment.

## 2. Urgent Hazard Screening (Hazard-First Behavior)
Before any normal assessment occurs, the system must screen for the following urgent warning signs:
- Smoke or fire
- Burning smell
- Battery swelling, leaking, hissing, or cracking
- Exposed or sparking wires
- Electric shock
- Severe or unusual heat
- Water entering electrical equipment

### Escalation Protocol
If any of these conditions are met, the normal AI troubleshooting flow must be immediately halted. The application must display an urgent escalation warning:
1. **Keep a safe distance.**
2. **Do not touch, open, disconnect, or attempt to repair the equipment.**
3. **Switch off power** ONLY if a safe, clearly labelled external isolation control is available and the user already knows how to use it safely.
4. **Contact a qualified solar/electrical professional or emergency service.**

## 3. Prohibited Procedures
Under no circumstances may the application (via deterministic rules or AI generation) instruct users to:
- Open equipment enclosures or remove covers.
- Touch terminals or conductors.
- Disconnect or reconnect batteries, panels, or inverters.
- Bypass fuses, breakers, isolators, or any protection devices.
- Short, bridge, or probe electrical contacts.
- Alter charging voltages, battery profiles, firmware, or protected configurations.
- Perform live electrical measurements (e.g., using a multimeter).

## 4. Honest Uncertainty (No Definitive Remote Diagnosis)
The product must not claim to provide a definitive diagnosis or certify that a component is defective based on remote evidence alone.
- **Allowed Language:** "The available information is more consistent with incomplete charging."
- **Prohibited Language:** "Your battery is bad." or "The inverter has failed."

## 5. Professional Escalation
The system must explicitly recommend consulting a qualified technician whenever an issue requires:
- Physical inspection or measurement.
- Opening of equipment.
- Repair or part replacement.
- Configuration changes.

## 6. Implementation Guardrails
- **Input Guardrails:** User inputs matching critical hazard keywords (e.g., "fire", "smoke", "shock") will trigger immediate escalation.
- **Prompt Constraints:** The AI system prompt will contain explicit instructions forbidding dangerous advice and enforcing the required uncertainty language.
- **Output Validation:** All AI-generated "Safe checks" and "Action plans" will be scanned for action verbs related to prohibited procedures (e.g., "open", "unscrew", "bypass"). If detected, the response will be blocked and replaced with a safe fallback message.
