# Pilot Waitlist Form Specification

## Objective

Collect enough information to group and contact potential pilot participants while keeping the form understandable, mobile-friendly, and explicitly non-transactional.

## Entry states

The form may receive query parameters from audience CTAs. Supported public intents should map to visible selections rather than silently setting hidden values.

| Intent | Suggested parameter | Initial selection |
|---|---|---|
| Buyer | `interest=buyer` | I need reliable power |
| Solar owner | `interest=solar_owner` | I own a solar system |
| Installer | `interest=installer` | I install solar or electrical systems |
| Cluster partner | `interest=cluster_partner` | I represent a community, campus, or estate |
| Shop context | `context=shop` | Shop or small business |
| Campus context | `context=campus` | Campus or student residence |
| Home context | `context=home` | Home or residential street |

Unknown or malformed parameters must be ignored without breaking the form.

## Fields

| Field | Type | Required | Rules |
|---|---|---:|---|
| Interest | Radio group | Yes | One of four supported roles |
| Buyer context | Radio group | Conditional | Required only for buyers |
| Knows solar owner | Radio group | Conditional | Yes, No, or Not sure; buyer only |
| Name | Text | Yes | Trim whitespace; limits and character policy TBD |
| Mobile number | Tel | Yes | Accept common Nigerian local and international formats; normalise server-side |
| State | Radio group | Yes | Lagos, Niger, FCT Abuja, or Another state |
| Community or area | Text | Yes | Human-readable locality; do not require a street address |
| Map point | Geolocation | No | Save only after permission and explicit form submission |
| Notes | Text area | No | Appliance needs, timing, or relevant context; length limit TBD |
| Contact consent | Checkbox | Yes | Unchecked by default; link privacy notice |

## Conditional behaviour

- Buyer selection reveals Buyer context and Knows solar owner.
- Changing away from Buyer hides those fields and excludes their values from submission.
- State `Another state` should clearly label the entry as expansion interest.
- Location denial or browser failure must not block submission.

## Validation

- Display an error summary above the form after an invalid submit attempt.
- Move focus to the summary, then link each item to its field.
- Show an inline message beside every invalid field.
- Preserve all valid values.
- Do not reveal whether a mobile number belongs to an existing person.
- Prevent duplicate requests while a submission is in progress.

## Submission states

1. Idle
2. Validating
3. Submitting
4. Success with reference
5. Duplicate or previously registered
6. Recoverable network error
7. Server error

The success page or panel should state that the team reviews sign-ups by community, that joining creates no payment obligation, and that final terms precede installation.

## Data contract

The implemented API contract, reference format, duplicate key, retention period, encryption, and CRM destination are `TBD`. Until confirmed, no documentation should invent field names or response codes.

## Abuse controls

Use rate limiting, server-side validation, bot detection that does not exclude assistive technology, and audit logging. Do not introduce a CAPTCHA unless observed abuse justifies the accessibility and conversion cost.

## Related documents

See [Privacy and data](PRIVACY_AND_DATA.md), [Accessibility](ACCESSIBILITY.md), [Analytics plan](ANALYTICS_PLAN.md), and [QA test plan](QA_TEST_PLAN.md).
