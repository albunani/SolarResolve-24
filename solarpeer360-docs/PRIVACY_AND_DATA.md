# Privacy and Data

## Purpose

This document describes the minimum privacy and data-governance requirements for the public website and pilot waitlist. It is a product specification, not legal advice. A qualified Nigerian privacy professional must review the final implementation and notice.

## Data inventory

| Data | Purpose | Required? |
|---|---|---:|
| Participant role | Route and qualify interest | Yes |
| Buyer context | Understand demand type | Buyer only |
| Nearby solar-owner knowledge | Support cluster formation | Buyer only |
| Name | Contact and identify the submission | Yes |
| Mobile number | Pilot communication | Yes |
| State | Eligibility and expansion planning | Yes |
| Community or area | Cluster analysis | Yes |
| Map coordinates | Help an installer locate the area | No |
| Notes | Capture appliances and contact context | No |
| Consent record | Prove permission to contact | Yes |
| Technical and security logs | Reliability, fraud prevention, and investigation | As necessary |

Do not ask for a precise street address, government identifier, payment information, or app password on the public waitlist.

## Consent

- Consent must be specific to pilot communication.
- The checkbox remains unselected until the participant acts.
- The privacy notice is available before consent.
- Record consent wording version and timestamp.
- Provide a practical method to withdraw from future pilot contact.

Consent is not the only possible lawful basis for every operational record. The final lawful-basis mapping is `TBD` pending legal review.

## Geolocation

Explain the purpose before invoking browser permission. Save coordinates only when the visitor submits the form. Do not retain permission-denial telemetry tied to the person. Provide manual community entry as the default alternative.

## Minimisation and access

- Collect only fields needed for pilot qualification.
- Restrict access by role.
- Use individual staff accounts and multi-factor authentication.
- Keep access and export logs.
- Do not export participant lists to personal devices or unmanaged spreadsheets.
- Redact personal data from analytics, error monitoring, screenshots, and support examples.

## Retention

The retention schedule is `TBD`. Define separate periods for active pilot leads, expansion-waitlist leads, rejected or unreachable entries, consent evidence, incident records, financial records, and backups. Deletion must cover downstream systems and scheduled backup expiry.

## Vendors and transfers

Document the form host, database, analytics provider, error-monitoring provider, messaging services, CRM, and backup locations. Complete vendor agreements and cross-border-transfer review before production processing.

## Rights handling

Provide a documented path for access, correction, deletion, objection, withdrawal, and complaints. Verify identity proportionately before disclosing or changing records.

## Security baseline

- TLS in transit and encryption at rest
- Secrets outside source control
- Server-side validation and rate limiting
- Least-privilege service accounts
- Backups with restore testing
- Incident detection and breach-response procedure
- No personal data in URL query parameters

## Related documents

See [Form specification](FORM_SPECIFICATION.md), [Analytics plan](ANALYTICS_PLAN.md), and [Trust and safety](TRUST_AND_SAFETY.md).
