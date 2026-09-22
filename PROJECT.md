# SolarResolve — MVP Project Brief

## Document status

- **Working name:** SolarResolve
- **Product type:** AI-powered solar decision-support web service
- **Initial market:** Nigerian household and small-business solar owners
- **Initial use case:** Declining solar-battery runtime
- **Version:** 1.0
- **Last updated:** 2026-09-21
- **Status:** Ready for technical design and implementation planning

## 1. Project Overview

SolarResolve is a guided, AI-supported web service for non-technical solar owners who are uncertain why their system's battery runtime has declined.

The user describes what changed, supplies basic system and load information, and may upload a photograph of an inverter, battery, controller, error display, or equipment label. The service organizes the evidence, asks targeted questions, presents plausible cause categories with explicit uncertainty, recommends only safe observations, and generates a concise brief for a qualified technician.

The product is not a remote repair service or a replacement for professional inspection. Its purpose is to improve the decision made before a user pays for a visit, repair, replacement, or upgrade.

The core transformation is:

> **Solar uncertainty → structured evidence → informed action**

## 2. Problem

When solar performance declines, many non-technical owners cannot turn fragmented observations into trustworthy, safe, and actionable evidence.

A user may know that the battery once lasted until morning and now shuts down around 11 p.m., but not know whether the change is related to:

- a new or increased load;
- incomplete charging;
- reduced solar generation;
- battery ageing or reduced usable capacity;
- a configuration change;
- an inverter or battery-management warning; or
- wiring, protection, or another condition requiring professional inspection.

The owner may receive conflicting explanations from an installer, vendor, technician, friend, social-media group, web search, or general AI assistant. Without a structured record, the user makes a technical and financial decision under uncertainty.

This matters because the wrong next step can cause:

- unnecessary technician visits;
- avoidable repair or replacement cost;
- prolonged system downtime;
- generator-fuel or alternative-energy expense;
- unsafe attempts at self-repair;
- disputes between customer, installer, and vendor; and
- reduced confidence in solar technology.

The unsolved friction is:

> **The owner lacks a safe process for collecting relevant evidence, separating facts from guesses, and communicating the issue before making a costly decision.**

## 3. Target User

### Primary persona

A Nigerian household or small-business owner who:

- already has an inverter, battery, and solar-panel system;
- is experiencing noticeably reduced battery runtime;
- relies on the system for household continuity or business activity;
- understands normal everyday operation but lacks diagnostic expertise;
- may not know all equipment specifications;
- owns a smartphone and can provide text or a display photograph; and
- wants to avoid wasted money, extended downtime, and unsafe action.

### Trigger situation

> “My battery used to last through the night, but now the inverter shuts down around 11 p.m. I do not know what changed or who is right about the cause.”

### User job

The user wants to understand which observations matter, what may be happening, what can be checked safely, when a technician is needed, and what information to give that technician.

### Pain frequency

- **Recurring during the problem:** shorter runtime, incomplete charging, or unexpected shutdown may be experienced daily or weekly.
- **Episodic and urgent:** an error, sudden decline, or conflicting diagnosis triggers an immediate decision.
- **Infrequent but high-stakes:** major repair, battery replacement, or system upgrade may involve substantial and difficult-to-reverse spending.

Numeric frequency, cost, and willingness-to-pay remain validation questions and must not be invented.

## 4. Current Alternatives

| Alternative | Why users choose it | Main limitation |
| --- | --- | --- |
| Original installer | Knows the installation and may offer warranty support | May be unavailable, slow, biased toward prior assumptions, or receive a poorly described problem |
| Another technician | Can provide physical inspection or a second opinion | Adds visit cost; begins with little context; quality and diagnosis may vary |
| Equipment vendor | Understands its battery or inverter product | May assess only one component and redirect responsibility elsewhere |
| Web search and videos | Immediate, broad, and often free | Advice may not match the user's system and can include unsafe procedures |
| General AI assistant | Understands ordinary language and responds quickly | May mix facts with speculation, lack solar-specific safety rules, and provide no structured handoff |
| Friends or community groups | Locally familiar, experience-based advice | Context is incomplete, recommendations conflict, and evidence is not preserved consistently |
| Immediate replacement or upgrade | Appears to end the uncertainty quickly | Expensive, difficult to reverse, and may not address the actual cause |

The gap across these alternatives is the absence of one consistent process to:

> collect evidence → identify gaps → explain plausible categories → select a safe next action → prepare a professional handoff.

## 5. Core Value and Hypothesis

### Core value proposition

> **SolarResolve turns a solar owner's fragmented observations into a clear, safety-aware assessment and technician-ready brief so they can make a better next decision before spending more money.**

### Value hypothesis

> **If we provide a guided AI assessment that structures descriptions and display photos, identifies missing evidence, explains plausible cause categories, recommends safe next steps, and creates a technician-ready brief, then Nigerian household and small-business solar owners experiencing reduced battery runtime will make faster, safer, and better-informed support and repair decisions.**

### Signals supporting the hypothesis

- Users complete the flow without knowing every system specification.
- Users understand the difference between confirmed facts and possible causes.
- Users report greater clarity about their next action.
- Technicians find the generated brief more useful than an unstructured complaint.
- Users share the brief with an installer or technician.
- The flow prevents unsafe self-directed checks.

### Signals weakening the hypothesis

- Users cannot provide enough evidence for a useful result.
- The flow is slower or less useful than contacting a technician directly.
- Users mistake possibilities for diagnoses despite the interface safeguards.
- Technicians find the brief inaccurate, irrelevant, or burdensome.
- The problem occurs too rarely or produces too little cost to motivate use.

## 6. Core User Flow

### Input

1. The user opens the Home screen and starts a battery-runtime assessment.
2. The user completes urgent-hazard screening.
3. If a hazard is reported, ordinary troubleshooting stops and the system returns urgent safety escalation.
4. Otherwise, the user describes the runtime change.
5. The user supplies known system, charging, and appliance/load information.
6. The user optionally uploads a relevant display or equipment image.

### Processing

7. The application validates and normalizes the input while preserving the user's original wording.
8. The image-capable AI extracts readable observations and marks uncertain or unreadable values.
9. The user confirms, corrects, or rejects every extracted observation.
10. The AI asks three to five targeted follow-up questions when material evidence is missing.
11. The user reviews the source-labelled evidence summary.
12. The service combines confirmed evidence, reviewed domain guidance, deterministic safety rules, and AI-supported explanation.

### Result

13. The service returns an assessment status.
14. It separates known facts, missing information, and plausible cause categories.
15. It presents safe observations, prohibited actions, and a recommended next step.
16. It generates a copyable technician brief.
17. The user copies or exports the brief, corrects evidence, or starts a new assessment.

## 7. Features and Acceptance Criteria

The MVP contains exactly **four must-have features**. Optional image extraction is classified as **Should-Have** because the primary loop must remain complete without an image.

### Must-Have 1 — Hazard screening and safety escalation

The user completes a hazard check before normal assessment. Hazard rules may also interrupt the flow later if dangerous information appears in text, images, or answers.

#### Acceptance criteria

- [ ] The user cannot reach ordinary problem intake without completing the hazard screen.
- [ ] Selecting smoke/fire, burning smell, battery damage signs, exposed/sparking conductors, electric shock, severe heat, or water ingress prevents normal troubleshooting.
- [ ] A hazard selection returns **Urgent safety escalation** and no ordinary cause ranking.
- [ ] The urgent result instructs the user not to touch, open, disconnect, probe, or repair the equipment.
- [ ] Hazard text entered later in the flow also triggers the urgent path.
- [ ] Automated tests cover every defined hazard flag and the no-hazard path.

### Must-Have 2 — Guided problem and evidence intake

The user reports the runtime change, known system context, charging observations, loads, and any manually observed readings without needing technical expertise.

#### Acceptance criteria

- [ ] The flow collects an original problem description, previous runtime, current runtime, and change timing or explicitly records them as unknown.
- [ ] The user can mark technical system details as unknown and still continue.
- [ ] The user can add at least one appliance/load observation.
- [ ] The user can enter a visible display reading manually when known.
- [ ] Empty problem descriptions and negative numeric values are rejected with field-specific errors.
- [ ] Input survives validation errors and recoverable processing failures.
- [ ] The complete input flow works using only a keyboard at 320 px and 1280 px viewport widths.

### Must-Have 3 — Structured, safety-aware assessment

The service turns confirmed evidence into an understandable result without claiming a definitive remote diagnosis.

#### Acceptance criteria

- [ ] Every completed result contains an assessment status, known facts, missing/uncertain information, possible causes, safe checks, prohibited actions, recommended next action, and disclaimer.
- [ ] Known facts cite whether they came from the user, confirmed image evidence, or deterministic calculation.
- [ ] Cause categories use only the labels **more consistent**, **possible but insufficient evidence**, or **cannot assess** unless a later validated taxonomy replaces them.
- [ ] The result never states that a component is defective based only on remote evidence.
- [ ] Safe checks never require opening equipment, touching conductors, disconnecting components, bypassing protection, live measurement, or changing protected settings.
- [ ] Insufficient evidence produces **More information needed** rather than a forced cause ranking.
- [ ] A model failure returns a recoverable error and never displays a partial response as a finished assessment.

### Must-Have 4 — Technician-ready brief

The service creates a concise summary that the user can take into a professional support conversation.

#### Acceptance criteria

- [ ] The brief includes the user-stated problem, prior and current runtime, change timing, system summary, relevant loads, confirmed readings, warnings/errors, completed observations, investigation areas, unresolved questions, safety statement, and disclaimer.
- [ ] Confirmed facts and professional investigation areas are visibly distinct.
- [ ] The brief does not convert possible cause categories into a diagnosis.
- [ ] The user can copy the complete brief using one clear action.
- [ ] Copied output remains readable in a plain-text messaging application.
- [ ] The synthetic demo case produces a complete brief without exposing real personal data.

### Should-Have — Optional image evidence extraction and confirmation

When schedule permits, the user may upload a display or equipment image. The service extracts visible readings or identifiers and requires confirmation before using them as facts. This feature is not required to complete the text-first primary loop.

#### Acceptance criteria

- [ ] The user can upload a supported image or continue without one.
- [ ] The service can return structured observations for at least the supported demo image.
- [ ] Every observation is labelled as clear, uncertain, or unreadable.
- [ ] Unclear text is never silently converted into a confirmed value.
- [ ] The user can confirm, correct, or reject every extracted observation.
- [ ] Only user-confirmed values enter the known-facts section of the final assessment.
- [ ] Text found inside an image cannot override system, safety, or output rules.
- [ ] When extraction fails, the user can replace the image, enter a reading manually, or continue without it.

## 8. Screen List

The MVP uses five essential screens or equivalent routed states.

| Screen | Purpose | Required content/actions |
| --- | --- | --- |
| 1. Home and scope | Explain the supported problem and limits | Value proposition, supported scenario, safety reminder, start CTA |
| 2. Safety check | Detect urgent hazards before intake | Hazard options, none-observed option, continue action, escalation branch |
| 3. Problem and evidence input | Collect the case | Description, runtime change, system details, loads, optional image, validation |
| 4. Clarification and evidence review | Confirm evidence and close material gaps | Source-labelled facts, editable extractions, missing items, targeted questions, generate action |
| 5. Assessment and technician brief | Deliver decision support | Status, facts, gaps, possible causes, safe checks, prohibited actions, next step, brief, copy/new actions |

Responsive behavior:

- Screens must work at 320, 390, 768, 1024, 1280, and 1440 px widths.
- No horizontal scrolling may occur.
- Primary actions remain visible and keyboard operable.
- Result sections may stack but must preserve their required order.

## 9. Data Model

The data model must distinguish user input, internal state, and returned results. The detailed logical schemas live in `CORE_FLOW.md`.

### Input schema

```text
AssessmentInput
  schemaVersion
  clientAssessmentId
  createdAt
  hazardScreen
  problem
    originalDescription
    previousRuntime
    currentRuntime
    changeBegan
    changePattern
    warningOrErrorReported
  charging
  system
    inverter
    battery
    panels
    approximateAge
    recentMaintenanceOrChange
  loads[]
  uploads[]
  userLocale
```

All unknown technical fields remain explicit `null` or `unknown` values. The system must not guess them.

### Internal state

```text
AssessmentState
  assessmentId
  flowStatus
  currentScreen
  input
  safety
    status
    triggeredRules[]
  evidence
    facts[]
    conflicts[]
    missingFields[]
  imageProcessing
    status
    observations[]
  clarification
    questions[]
    answers[]
  assessmentDraft
    candidateCauseCategories[]
    safeChecks[]
    prohibitedActions[]
    recommendedNextAction
  errors[]
  updatedAt
```

Every evidence fact records its source and confirmation status. AI inferences must never be stored or displayed as confirmed observations.

### Result payload

```text
AssessmentResult
  assessmentId
  schemaVersion
  generatedAt
  status
  summary
  knownFacts[]
  missingOrUncertain[]
  possibleCauses[]
  safeChecks[]
  prohibitedActions[]
  recommendedNextAction
  technicianBrief
  disclaimer
```

### Data decisions not yet confirmed

- whether cases are stored or processed ephemerally;
- whether uploaded images are retained;
- maximum text length, upload count, and file size;
- final cause-category taxonomy;
- final export format; and
- whether accounts or saved history exist after the MVP.

These remain open questions rather than arbitrary implementation values.

## 10. Technical Requirements

### Application architecture

- Use a responsive web application with clear UI, API, domain, AI, safety, and storage boundaries.
- Keep deterministic validation and safety enforcement outside free-form model output.
- Define structured request and response schemas for all AI operations.
- Preserve the ability to replace the AI provider without rewriting domain logic.
- Keep content, safety rules, prompts, and schema versions traceable.

### AI integration

- Use a text-capable model for the Must-Have structured assessment.
- If the Should-Have image feature is implemented, select an image-capable model for supported display evidence.
- Constrain model output to a validated structured schema.
- Ground explanations in reviewed solar-domain guidance.
- Treat uploaded text and images as untrusted data.
- Reject or repair invalid model output before it reaches the user.
- Never expose API keys in browser code or public repositories.

### Safety

- Run deterministic hazard checks before and after AI processing.
- Maintain a prohibited-action policy independent of the model prompt.
- Override normal assessment whenever urgent hazard rules fire.
- Log safety-rule identifiers without logging unnecessary personal content.

### Privacy and security

- Collect only data required for assessment.
- Warn users not to upload passwords, access codes, financial information, identification documents, unrelated faces, or unnecessary location data.
- Disclose storage and image-retention behavior before processing real cases.
- Use HTTPS in public deployment.
- Validate uploaded type, size, and content server-side.
- Apply rate limits and safe error handling.

### Reliability and usability

- Preserve input across recoverable failures.
- Provide explicit loading, empty, error, success, and retry states.
- Support current mobile and desktop browsers used by the target audience.
- Minimize asset size and image-upload bandwidth.
- Use a public URL that does not require judges or demo users to request access.

### Accessibility

- Use semantic HTML and a logical heading hierarchy.
- Meet WCAG AA contrast for text and controls.
- Support keyboard-only completion.
- Provide visible focus indicators.
- Associate labels and errors with their inputs.
- Respect reduced-motion settings.
- Preserve functionality at 200% zoom.

### Testing

- Add unit tests for validation, hazard rules, source attribution, and result formatting.
- Add integration tests for API, AI-adapter, and failure behavior.
- Add safety tests for every prohibited action and urgent hazard.
- If image extraction is implemented, add evaluation fixtures for clear, uncertain, unreadable, conflicting, and prompt-injection images.
- Add responsive browser checks for all required viewport widths.

### Payments and external services

- No payment flow is required for the MVP.
- Do not integrate real payments, billing, subscriptions, or financial credentials.
- Use synthetic data, mock equipment images, and simulated cases for the public demo.
- If a third-party AI service is used, only the model request is real; all customer, transaction, and technician-marketplace behavior remains absent or mocked.

## 11. MVP Scope

### Included

- One complete scenario: declining battery runtime
- Five essential screens
- Pre-intake and late-stage urgent-hazard detection
- Text-based guided intake
- Three to five targeted follow-up questions when necessary
- Structured assessment with explicit uncertainty
- Safe checks and prohibited actions
- Recommended next action
- Copyable technician brief
- Synthetic demo case
- Mobile-responsive public deployment

### Should-Have if time permits

- Optional single-case image evidence
- AI-assisted image extraction with user confirmation
- Download or print export beyond plain-text copy
- Preloaded synthetic demo shortcut

### MVP success condition

A first-time user can complete the scenario without diagnostic expertise, understand which information is known versus uncertain, receive no unsafe instruction, identify a reasonable next action, and create a useful technician brief.

## 12. Out of Scope

The following features are explicitly non-essential for the MVP:

- diagnosis of every solar fault;
- confirmed remote component diagnosis;
- electrical repair instructions;
- direct inverter, battery, controller, or sensor integration;
- continuous telemetry or performance monitoring;
- automatic settings or firmware changes;
- multiple user accounts or authentication;
- saved case history;
- technician marketplace or technician ranking;
- appointment booking;
- real payments, subscriptions, billing, or refunds;
- equipment sales or affiliate recommendations;
- warranty claim submission;
- quote comparison;
- installation certification;
- dispute adjudication;
- push, SMS, or email notifications;
- community forum;
- native mobile applications;
- offline-first synchronization;
- multi-language support beyond the initial chosen language;
- unrestricted general-purpose chatbot;
- coverage of every equipment brand and model; and
- production analytics beyond what is necessary for safe operation and evaluation.

Out-of-scope features must not be partially added to the MVP merely to make the demo appear broader.

## 13. Risks and Open Questions

### Key risks

| Risk | Potential impact | Initial mitigation |
| --- | --- | --- |
| User treats possibility as diagnosis | Unsafe or expensive decision | Separate facts and possibilities; calibrated language; visible disclaimer |
| Unsafe model recommendation | Physical harm or equipment damage | Deterministic hazard and prohibited-action filters; adversarial tests |
| Incorrect image extraction | False evidence enters assessment | Readability state plus mandatory user confirmation |
| Weak domain grounding | Irrelevant or inaccurate guidance | Reviewed knowledge base and technician review |
| Insufficient user evidence | Forced or unhelpful result | Return More information needed and request only useful evidence |
| Privacy leakage in images | Exposure of personal or equipment data | Upload warning, minimization, deliberate retention policy |
| Poor technician acceptance | Brief does not improve handoff | Co-design and test with qualified technicians |
| Narrow scenario has low demand | Weak adoption or repeat use | Validate frequency and cost before expanding build |
| Connectivity and upload cost | Drop-off for mobile users | Compress images and support text-only continuation |
| AI provider failure or cost | Unreliable or expensive service | Provider abstraction, retry state, usage limits, mock demo fallback |

### Open product questions

- Is declining battery runtime the highest-value first scenario?
- Do users want support before contacting a technician, or only after receiving conflicting advice?
- Which part of the result creates the most value: assessment, safe checks, or technician brief?
- Is the likely business model consumer-paid, technician-supported, installer-supported, partnership-based, or something else?

### Open safety and domain questions

- Which exact observations are safe for an unqualified user?
- Which hazards require local emergency guidance rather than technician contact?
- Which cause categories and wording do qualified technicians consider useful?
- What professional or legal review is needed for disclaimers?

### Open technical and data questions

- Which image-capable AI model should be used?
- Which sources form the reviewed solar knowledge base?
- Are cases and images processed ephemerally or retained?
- Which file formats, upload limits, and timeouts are appropriate?
- Which format should export the technician brief?
- Does the public MVP require any persistent database?

### Open validation questions

- How often does the target problem occur?
- What time, money, or downtime does it cause?
- Will users trust calibrated AI guidance?
- Will technicians use the generated brief?
- Does the flow change a real repair or support decision?

## 14. Demo Scenario

### Scenario

A Nigerian homeowner reports:

> “My solar battery used to last until morning. For the past two weeks, it has been shutting down around 11 p.m.”

### Synthetic demo inputs

- Previous runtime: approximately 7 hours
- Current runtime: approximately 3 hours
- Change pattern: gradual over 2 weeks
- System age: approximately 30 months
- Usual loads: refrigerator, television, four LED lights, and two fans
- Recent change: an additional freezer is sometimes used
- Charging observation: the battery does not always display full charge before sunset
- Visible error code: none
- Image: synthetic or deliberately anonymized inverter or battery display

### Demo sequence

1. Open SolarResolve and explain the supported scope.
2. Complete the hazard screen with no urgent hazard observed.
3. Enter the runtime change and system context.
4. Upload the synthetic display image.
5. Show AI-extracted observations marked for confirmation.
6. Correct or confirm the extracted values.
7. Answer targeted questions about full charge and the additional freezer.
8. Generate the assessment.
9. Show known facts separately from missing information.
10. Show increased load and incomplete charging as evidence-supported possibilities.
11. Show battery ageing or reduced usable capacity as possible but unconfirmed.
12. Show safe observations, including recording sunset and shutdown readings.
13. Show prohibited actions, including opening or disconnecting equipment.
14. Recommend comparing a safe observation period without the additional freezer and obtaining professional evaluation if poor runtime persists after confirmed full charge.
15. Generate and copy the technician brief.

### Expected result

The product must not declare the battery defective. It should demonstrate that AI converts fragmented text and image evidence into a structured, safety-aware decision aid and professional handoff.

### Demo proof points

- AI performs meaningful text and image interpretation.
- The user controls extracted evidence before it becomes fact.
- Responsible-AI behavior is visible in uncertainty and safety handling.
- The output supports a practical next action.
- The technician brief provides value beyond a generic chatbot response.
- All data is synthetic or deliberately anonymized.
- No real payment, repair transaction, or customer record is required.
