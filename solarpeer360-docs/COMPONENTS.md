# Component Inventory

## Purpose

This document defines the public website's reusable UI components and their required behaviour. Component names are product-level names; implementation names may differ.

## Global components

### Site header

- Contains the home logo, primary navigation, and waitlist CTA.
- Desktop navigation includes How it works, Who it is for, Pricing, About, and Help.
- Mobile uses a button with an accessible expanded state and a visible menu panel.
- Header links must retain visible keyboard focus.

### Site footer

- Contains product description, About, Help, Privacy, Terms, App, and contact methods.
- Contact links must identify phone, WhatsApp, and email destinations.
- Time-sensitive pilot-location text must come from one shared content source.

## Marketing components

### Hero

Required fields: eyebrow/status, H1, supporting sentence, primary CTA, secondary CTA, three benefit points, and image. The hero must fit the primary proposition and CTA within the first mobile screen as far as practical.

### Evidence strip

Shows dated pilot-preparation evidence. Each item needs a claim, evidence owner, evidence date, and public wording approval. It must not visually resemble audited performance certification.

### Problem card

Contains an icon, audience-specific problem heading, and one short explanation. Limit to three cards in the primary problem section.

### Process step

Contains an ordered step, action heading, and result. The complete set must explain assessment, metering, prepayment, usage measurement, and receipts.

### Audience card

Contains audience title, up to four benefits or constraints, and a role-specific CTA. Query parameters may preselect the corresponding waitlist role.

### Pilot-status notice

Consolidates current locations, stage, evidence date, price status, and non-customer-outcome disclaimers.

### Energy-flow diagram

Shows energy moving from solar owner through the hub meter to the buyer meter, and payment returning to the solar owner. Provide an accessible text equivalent.

### Pricing calculator

- Displays the assumed price per kWh.
- Supports preset amounts and a continuous amount control.
- Updates currency and kWh output immediately.
- Presets should use a radio-group pattern because only one amount is active.
- Never present the pilot assumption as a final tariff.

### Field-photo carousel

- Supports previous and next controls, touch scrolling, keyboard operation, and captions.
- Controls are disabled at boundaries unless the carousel loops.
- Announce the active item and total count to assistive technology.

### FAQ accordion

- Uses native buttons with expanded state.
- Supports keyboard navigation and visible focus.
- Questions must remain readable with JavaScript unavailable where feasible.

## Form components

### Choice card

Wraps a radio input, title, and explanation. The full card is clickable, and the native input remains available to assistive technology.

### Text field and text area

Include a persistent label, optional hint, validation message, and programmatic relationship between them.

### Location request

Explains what is saved before asking for browser permission. Failure must leave manual locality entry usable.

### Consent checkbox

Uses explicit consent wording and links to the privacy notice. It must never be preselected.

### Submission status

Supports idle, validating, submitting, success, duplicate, network-error, and server-error states. Success includes a reference and clear next steps.

## Related documents

See [Form specification](FORM_SPECIFICATION.md), [Accessibility](ACCESSIBILITY.md), and [QA test plan](QA_TEST_PLAN.md).
