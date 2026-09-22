# Decision Log

This log records decisions inferred from the public website or recommended by the documentation baseline. `Observed` means the public implementation already reflects the decision. `Proposed` requires internal approval.

## D-001: Use a waitlist before service activation

- Status: Observed
- Date recorded: 22 September 2026
- Decision: The public website collects interest and does not activate service, take payment, or create an app account.
- Reason: The service is preparing pilot deployments and needs clustered demand and technical assessment first.
- Trade-off: Adds delay between interest and access, but prevents premature commitments.

## D-002: Support four participant roles in one intake

- Status: Observed
- Decision: Buyers, solar owners, installers, and cluster partners use one waitlist with role selection and conditional buyer questions.
- Reason: One entry point simplifies acquisition while preserving basic segmentation.
- Trade-off: A shared form cannot perform full role-specific qualification.

## D-003: Use cash or transfer in the proposed pilot design

- Status: Observed assumption
- Decision: The public explanation supports cash or bank transfer rather than requiring a bank card.
- Reason: Reduces payment-access barriers.
- Trade-off: Cash increases reconciliation, receipt, fraud, and dispute complexity.

## D-004: Prioritise communities with clustered interest

- Status: Observed, policy details TBD
- Decision: Sign-up concentration influences early deployment priority.
- Reason: Local energy sharing requires geographically close supply and demand.
- Trade-off: A popularity-only rule could exclude viable or high-need communities, so technical and safety criteria must also apply.

## D-005: Keep the app private until a participant's meter is ready

- Status: Observed
- Decision: Do not publish the Android app for general download during the current stage.
- Reason: Access is tied to approved pilot participation and meter readiness.
- Trade-off: Reduces public product visibility but avoids unusable or misleading downloads.

## D-006: Label AI illustrations and field evidence separately

- Status: Observed
- Decision: AI imagery is identified as illustrative and real field photography is dated and captioned.
- Reason: Visitors must be able to distinguish explanation from evidence.
- Trade-off: Labels add copy, but protect credibility.

## D-007: Consolidate public documentation in a standalone directory

- Status: Approved by user request and workspace constraints
- Date: 22 September 2026
- Decision: Store the 20 SolarPeer documents in `solarpeer360-docs/`.
- Reason: The current workspace contains another project and an existing root `README.md`; isolation prevents accidental overwrite.
- Trade-off: The documents are not yet integrated into the SolarPeer source repository.

## Proposed decisions awaiting approval

- D-008: Put WhatsApp beside the primary hero CTA.
- D-009: Reduce homepage length by 25–35%.
- D-010: Add a public safety and verification page.
- D-011: Use radio-group semantics for pricing presets.
- D-012: Add Pricing to primary navigation.

When approving a proposed decision, add owner, date, rationale, alternatives, and consequences. Do not delete superseded decisions; mark them superseded and link the replacement.

## Related documents

See [Roadmap](ROADMAP.md), [Product requirements](PRODUCT_REQUIREMENTS.md), and [Changelog](CHANGELOG.md).
