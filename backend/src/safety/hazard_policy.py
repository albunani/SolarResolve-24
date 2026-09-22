"""Deterministic hazard policy shared by input validation and result processing.

This is the single source of truth for hazard detection. Do not duplicate
hazard strings across components.
"""

import re

# ---------------------------------------------------------------------------
# Hazard flag definitions
# ---------------------------------------------------------------------------
HAZARD_FLAGS = [
    {"id": "smoke_or_fire", "label": "Smoke or fire"},
    {"id": "burning_smell", "label": "Burning smell"},
    {"id": "battery_damage", "label": "Battery swelling, leaking, hissing, cracking, or physical damage"},
    {"id": "exposed_conductors", "label": "Exposed or sparking conductors"},
    {"id": "electric_shock", "label": "Electric shock"},
    {"id": "severe_heat", "label": "Severe or unusual heat"},
    {"id": "water_ingress", "label": "Water entering electrical equipment"},
]

HAZARD_IDS = frozenset(h["id"] for h in HAZARD_FLAGS)

ESCALATION_MESSAGE = (
    "Keep a safe distance. Do not touch, open, disconnect, probe, or attempt "
    "to repair the equipment. Contact a qualified solar/electrical professional "
    "or emergency service as appropriate."
)

# ---------------------------------------------------------------------------
# Late-stage text scanning â€” deterministic keyword rules
# ---------------------------------------------------------------------------
_HAZARD_SYNONYMS: dict[str, list[str]] = {
    "smoke_or_fire": ["smoke", "fire", "flames", "burning", "on fire", "smouldering", "smoldering"],
    "burning_smell": ["burning smell", "acrid", "smell of burning", "chemical smell", "melting smell"],
    "battery_damage": [
        "swelling", "swollen", "leaking", "hissing", "cracking", "bulging",
        "battery damage", "battery leak", "expanding", "puffed up",
    ],
    "exposed_conductors": ["exposed wire", "sparking", "bare wire", "arcing", "spark", "exposed conductor"],
    "electric_shock": ["electric shock", "got shocked", "electrocuted", "tingling", "zapped"],
    "severe_heat": ["extremely hot", "severe heat", "too hot to touch", "overheating", "melting"],
    "water_ingress": ["water inside", "water ingress", "flooded", "water damage", "water entering", "wet inside"],
}

_compiled_patterns: dict[str, re.Pattern[str]] = {}
for _hid, _terms in _HAZARD_SYNONYMS.items():
    _pattern = "|".join(re.escape(t) for t in _terms)
    _compiled_patterns[_hid] = re.compile(_pattern, re.IGNORECASE)


_NEGATION_PATTERN = re.compile(
    r"\b(?:no|not|without|never)\b(?:(?!except|but|however|only)[^\.,;!\?]){0,40}\s*$",
    re.IGNORECASE,
)


def scan_text_for_hazards(text: str) -> list[str]:
    """Return list of hazard IDs found in free text via deterministic keyword matching."""
    found: list[str] = []
    if not text:
        return found

    text_lower = text.lower()
    for hid, pattern in _compiled_patterns.items():
        for match in pattern.finditer(text_lower):
            start = match.start()
            prefix = text_lower[max(0, start - 40):start]
            if _NEGATION_PATTERN.search(prefix):
                continue
            found.append(hid)
            break
    return found


# ---------------------------------------------------------------------------
# Prohibited action detection
# ---------------------------------------------------------------------------
PROHIBITED_VERBS = [
    "open", "unscrew", "remove cover", "disassemble",
    "touch terminal", "touch conductor", "handle wire",
    "disconnect", "reconnect", "detach", "unplug battery",
    "bypass", "bridge", "short", "jumper", "probe",
    "measure voltage", "use multimeter", "use voltmeter",
    "alter setting", "change firmware", "update firmware",
    "change charging voltage", "modify configuration",
]

_prohibited_pattern = re.compile(
    r"\b(" + "|".join(re.escape(v) for v in PROHIBITED_VERBS) + r")\b", re.IGNORECASE
)


def contains_prohibited_action(text: str) -> bool:
    """Return True if text contains a prohibited action verb."""
    if not text:
        return False
    return bool(_prohibited_pattern.search(text))


# ---------------------------------------------------------------------------
# Definitive diagnosis detection  (D4V2-003: expanded coverage)
# ---------------------------------------------------------------------------
DEFINITIVE_DIAGNOSIS_TERMS = [
    # State assertions
    "is defective", "is faulty", "is broken", "is dead", "is damaged",
    "is bad", "is worn out", "is degraded beyond",
    # Failure claims
    "has failed", "battery failed", "inverter failed",
    "failure confirmed", "failure is confirmed",
    # Replacement mandates
    "needs replacement", "must be replaced", "should be replaced",
    "requires replacement", "replace the battery", "replace the inverter",
    "replace immediately",
    # Definitive causality
    "the cause is", "the problem is", "the fault is",
    "is the cause", "root cause is",
    "caused the", "caused this", "caused by", "proves that", "proves the",
    "confirmed diagnosis", "definitive diagnosis",
    "certainly", "definitely failed", "without doubt",
]

_definitive_pattern = re.compile(
    "|".join(re.escape(v) for v in DEFINITIVE_DIAGNOSIS_TERMS), re.IGNORECASE,
)

_SAFE_CONTEXT_PATTERN = re.compile(
    r"\b(?:no|not|without|never|whether|if|may|might|could|possible|insufficient|ask|consult|check|determine|verify|evaluate|technician|professional|electrician)\b(?:(?!except|but|however|only|and must|and needs|and requires)[^\.,;!\?]){0,60}\s*$",
    re.IGNORECASE,
)


def contains_definitive_diagnosis(text: str) -> bool:
    """Return True if text contains definitive diagnosis claims, ignoring safe contexts."""
    if not text:
        return False

    text_lower = text.lower()
    for match in _definitive_pattern.finditer(text_lower):
        start = match.start()
        prefix = text_lower[max(0, start - 60):start]
        if _SAFE_CONTEXT_PATTERN.search(prefix):
            continue
        return True
    return False


# ---------------------------------------------------------------------------
# Convenience filter
# ---------------------------------------------------------------------------
def filter_safe_output(text: str) -> str:
    """If text contains prohibited actions or definitive diagnosis, replace."""
    if contains_prohibited_action(text) or contains_definitive_diagnosis(text):
        return (
            "This recommendation has been blocked because it may involve "
            "an unsafe action or definitive diagnosis. Please consult a qualified "
            "solar/electrical professional for physical inspection or repair."
        )
    return text
