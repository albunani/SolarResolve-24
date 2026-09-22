# Analytics Plan

## Goals

Measure whether visitors understand the proposition, reach relevant evidence, start the waitlist, complete it, and form usable pilot clusters. Analytics must not create a shadow copy of personal or location data.

## Funnel

```text
Landing view
  -> Role or information engagement
  -> Waitlist view
  -> Role selected
  -> Form started
  -> Form submitted
  -> Submission accepted
  -> Operational qualification
```

## Event catalogue

| Event | Trigger | Allowed properties |
|---|---|---|
| `page_view` | Page becomes active | Page name, referrer class, campaign tags |
| `primary_cta_click` | Waitlist CTA activated | Page, placement, audience context |
| `whatsapp_click` | WhatsApp contact activated | Page, placement |
| `section_view` | Key section meaningfully enters view | Section ID, page |
| `pricing_change` | Preset or range value changes | Amount band, control type; no user identifier |
| `faq_open` | Question expanded | Stable question ID |
| `waitlist_role_select` | Role selected | Role |
| `waitlist_start` | First field interaction | Entry context |
| `waitlist_validation_error` | Validation blocks progress | Field ID and error category only |
| `waitlist_submit_attempt` | Valid submission begins | Role and state category |
| `waitlist_submit_success` | Server accepts submission | Role and state category; never phone or reference |
| `waitlist_submit_failure` | Submission fails | Error category, not server payload |

## Prohibited analytics data

Do not send name, phone number, free-text notes, precise coordinates, submission reference, full IP address, or field values to product analytics. Do not record session replay on the waitlist form unless a privacy and security review explicitly approves redaction.

## Key metrics

- CTA click-through rate by page and placement
- Waitlist start and completion rate
- Completion rate by role and broad state category
- Validation failure rate by field
- Mobile versus desktop completion rate
- WhatsApp-to-form preference
- Percentage of submissions that become qualified leads and viable clusters
- Time from accepted submission to first operational contact

## Experiment rules

- Define one hypothesis and one primary metric before launch.
- Guard against lower consent quality, higher support confusion, or misleading claims.
- Do not experiment with required safety warnings, consent meaning, or material price qualifications.
- Set a stopping rule and retain variant wording with the result.

## Implementation requirements

- Use a consent approach appropriate to selected vendors and applicable law.
- Document data region, retention, access, deletion, and vendor terms.
- Create a stable event schema and version breaking changes.
- Test analytics in a non-production stream.
- Filter staff and automated test traffic where practical.

Analytics vendor, consent mechanism, event transport, and retention are `TBD`.

## Reporting cadence

- Weekly during active acquisition: funnel health, errors, location distribution, and channel quality.
- Monthly: qualification, cluster viability, content questions, and experiment results.
- Immediate alerts: submission failure spike, missing consent records, or suspicious traffic.

## Related documents

See [Privacy and data](PRIVACY_AND_DATA.md), [User flows](USER_FLOWS.md), and [QA test plan](QA_TEST_PLAN.md).
