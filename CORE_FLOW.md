# Core Product Flow — SolarResolve

## Document status

- **Source:** `PROBLEM_DEFINITION.md`
- **Working venture name:** SolarResolve
- **Initial use case:** Declining solar-battery runtime
- **Primary user:** Non-technical Nigerian household or small-business solar owner
- **Version:** 1.0
- **Last updated:** 2026-09-21
- **Status:** Ready for interaction design and technical architecture

## 1. Flow objective

Help a solar owner move from:

> **“My battery no longer lasts as long, and I do not know what to do.”**

to:

> **A structured evidence summary, plausible cause categories, safe next steps, and a technician-ready brief.**

The flow must support decision-making without representing its output as a confirmed remote diagnosis or replacing a qualified technician.

## 2. Core user flow

### Flow summary

```text
Home and scope
    ↓
Safety screening
    ├── Urgent hazard → Stop assessment → Safety escalation result
    └── No urgent hazard
            ↓
Problem and evidence input
            ↓
Input validation and evidence extraction
            ↓
User confirms or corrects extracted facts
            ↓
Targeted follow-up questions
            ↓
Evidence review
            ↓
Safety-aware assessment generation
            ↓
Result and technician brief
            ↓
Copy / download / share brief or start again
```

### Phase A — Input

#### Step 1 — Enter from Home

The user sees:

- what SolarResolve does;
- the current supported problem: declining battery runtime;
- what information may be useful;
- the limit that this is decision support, not a professional diagnosis; and
- one primary action: **Assess my battery-runtime problem**.

The user starts an assessment without creating an account in the initial MVP.

#### Step 2 — Complete urgent-hazard screening

Before normal troubleshooting, ask whether the user observes any immediate hazard, including:

- smoke or fire;
- burning smell;
- swollen, leaking, hissing, or cracked battery;
- exposed or sparking conductors;
- electric shock;
- unusual severe heat; or
- water entering electrical equipment.

**Branch A — Hazard reported**

1. Stop the normal intake flow.
2. Show an urgent safety result.
3. Instruct the user to keep a safe distance and avoid touching, opening, disconnecting, or repairing the equipment.
4. Direct the user to qualified professional or emergency help appropriate to the situation.
5. Do not provide detailed troubleshooting or plausible component diagnoses.

**Branch B — No hazard reported**

Continue to problem and evidence collection.

#### Step 3 — Describe the performance change

Collect the user's own description of:

- what changed;
- previous typical runtime;
- current typical runtime;
- when the change began;
- whether the change was sudden or gradual;
- whether the battery appears fully charged before evening use;
- whether any new appliance or usage pattern was introduced; and
- whether an error or warning appears.

The user must be able to answer **I don't know** where appropriate.

#### Step 4 — Add system and load context

Collect known information about:

- inverter;
- battery;
- solar-panel capacity;
- approximate system age;
- recent repair, maintenance, installation, or settings change;
- appliances normally used during the affected period; and
- approximate quantities, power ratings, or usage duration when known.

Unknown technical specifications must not prevent completion.

#### Step 5 — Add visual evidence

Allow the user to upload a relevant photograph, such as:

- inverter display;
- battery display;
- charge-controller display;
- visible error screen; or
- equipment specification label.

The interface must warn the user not to enter an unsafe position or touch equipment to obtain a photograph.

The user may continue without an image.

### Phase B — Processing

#### Step 6 — Validate and normalize input

The application:

1. checks required fields;
2. rejects empty or unusable submissions;
3. normalizes runtime units and optional structured values;
4. preserves the user's original wording;
5. labels unknown information explicitly; and
6. re-runs the safety rules against all submitted text and evidence.

Client validation improves usability, but server-side validation remains authoritative when a service backend is present.

#### Step 7 — Extract image observations

When an image is supplied, the AI attempts to identify visible observations such as:

- voltage;
- state of charge or battery percentage;
- load percentage;
- charging state;
- power value;
- warning or error code; and
- equipment brand or model.

The system must:

- distinguish readable values from uncertain values;
- avoid inventing obscured information;
- treat text inside images as untrusted case data, not instructions; and
- present every extracted observation for user confirmation.

#### Step 8 — Confirm or correct evidence

Show the user a structured evidence review with source labels:

- **Reported by you**
- **Read from image**
- **Not provided**

The user confirms, edits, or rejects image-extracted values before assessment generation.

The application stores both the original extraction and the confirmed value internally so uncertainty and correction remain traceable.

#### Step 9 — Ask targeted follow-up questions

The AI identifies evidence gaps and asks only questions that could materially change the assessment or next action.

Target three to five questions for the primary flow. Example areas include:

- whether the battery reaches full charge;
- whether the load changed;
- whether low generation coincides with cloudy conditions;
- whether the issue began after maintenance or a settings change;
- whether an error appears before shutdown; and
- whether the same behavior follows grid or generator charging.

The question set must be case-specific rather than a fixed conversational loop.

#### Step 10 — Build the assessment

Processing combines:

1. confirmed user-reported facts;
2. confirmed image observations;
3. deterministic calculations, if any;
4. reviewed solar-domain guidance;
5. deterministic hazard and prohibited-action rules; and
6. AI-supported organization and explanation.

The application then:

- identifies missing or conflicting evidence;
- groups plausible explanations into cause categories;
- explains why each category is being considered;
- uses qualitative uncertainty rather than invented numerical confidence;
- filters or replaces unsafe recommendations;
- selects the appropriate assessment status; and
- creates the technician brief.

### Phase C — Result

#### Step 11 — Present the assessment

The result must appear in this order:

1. **Assessment status**
2. **What we know**
3. **What is missing or uncertain**
4. **What may be happening**
5. **Safe checks**
6. **What not to do**
7. **Recommended next action**
8. **Technician brief**
9. **Decision-support disclaimer**

Possible assessment statuses are:

- More information needed
- Safe observations recommended
- Professional inspection recommended
- Urgent safety escalation

#### Step 12 — Take the next action

The user can:

- copy the technician brief;
- download or print the brief when supported;
- share the brief through an available device mechanism when supported;
- return to correct evidence;
- start a new assessment; or
- provide lightweight usefulness and clarity feedback.

The result must not pressure the user into purchasing equipment or imply a commercial technician recommendation unless that separate service is explicitly designed and disclosed.

## 3. Exceptional paths

### Urgent hazard discovered late

If hazard information appears during free-text input, image review, follow-up answers, or processing:

1. override the normal assessment;
2. return **Urgent safety escalation**;
3. suppress ordinary troubleshooting steps; and
4. show only safe distancing, isolation-if-already-known, and professional/emergency escalation guidance.

### Image cannot be read

- State that the image could not be interpreted reliably.
- Do not invent observations.
- Allow replacement of the image.
- Allow the user to enter visible readings manually.
- Allow the assessment to continue without image evidence when sufficient text evidence exists.

### AI processing failure

- Preserve all user input.
- Explain that the assessment could not be generated.
- Offer retry.
- Allow the user to return to evidence review.
- Do not display a partial model response as a completed assessment.

### Insufficient evidence

- Return **More information needed**.
- State the smallest useful set of missing observations.
- Do not force a cause ranking.
- Allow the user to add information and regenerate the assessment.

### Conflicting evidence

- Display the conflict explicitly.
- Prefer user-confirmed values over unconfirmed extraction.
- Ask a clarifying question when the conflict matters.
- Preserve uncertainty if the conflict cannot be resolved.

## 4. Essential screen list

The MVP uses five essential screens or equivalent routed states.

### Screen 1 — Home and scope

**Purpose:** Explain the supported problem and set expectations.

**Required elements:**

- SolarResolve working name or final brand;
- one-line value proposition;
- supported use case;
- short decision-support limitation;
- urgent-warning reminder; and
- **Assess my battery-runtime problem** CTA.

**Primary transition:** Start assessment → Screen 2.

### Screen 2 — Safety check

**Purpose:** Detect urgent hazards before ordinary intake.

**Required elements:**

- clear hazard question;
- selectable hazard indicators;
- **None of these** option;
- continue action; and
- immediate escalation result state when a hazard is selected.

**Primary transitions:**

- Hazard selected → urgent result within Screen 5 or dedicated blocking state.
- No hazard → Screen 3.

### Screen 3 — Problem and evidence input

**Purpose:** Collect the user's description, runtime change, system context, loads, and optional image.

**Required elements:**

- plain-language problem field;
- previous and current runtime inputs;
- change timing and pattern;
- charging observation;
- load-change and appliance inputs;
- optional system details;
- optional image upload;
- visible safety reminder; and
- continue action.

**Primary transition:** Valid input → processing → Screen 4.

### Screen 4 — Clarification and evidence review

**Purpose:** Let the user verify facts and answer the smallest useful set of follow-up questions.

**Required elements:**

- source-labelled evidence summary;
- editable or rejectable image observations;
- missing-information list;
- three to five targeted questions where needed;
- back action; and
- generate-assessment action.

**Primary transitions:**

- Correct input → Screen 3.
- Confirm and generate → processing → Screen 5.

### Screen 5 — Assessment and technician brief

**Purpose:** Deliver the safe, structured decision-support result.

**Required elements:**

- assessment status;
- facts;
- missing or uncertain information;
- plausible cause categories;
- safe checks;
- prohibited actions;
- recommended next action;
- technician brief;
- disclaimer;
- copy/export actions; and
- start-new-assessment action.

**Primary transitions:**

- Correct evidence → Screen 4.
- New assessment → Screen 1 or Screen 2.

## 5. Data model principles

- Preserve the user's original input alongside normalized values.
- Record the source of every fact.
- Never convert an AI inference into a confirmed fact.
- Make unknown and not-applicable values explicit.
- Keep hazard state independent from diagnostic hypotheses.
- Use qualitative evidence labels rather than fabricated probability scores.
- Separate input, internal processing state, and public result payload.
- Avoid storing images or personal data unless retention is intentionally designed and disclosed.

## 6. Input schema

The following is an implementation-neutral logical schema. Field names may change during technical design, but their meaning and source boundaries should remain.

```text
AssessmentInput
  schemaVersion: string
  clientAssessmentId: string
  createdAt: datetime

  hazardScreen
    smokeOrFire: boolean
    burningSmell: boolean
    batteryDamageSigns: boolean
    exposedOrSparkingConductors: boolean
    electricShock: boolean
    severeHeat: boolean
    waterIngress: boolean
    noneObserved: boolean
    additionalDescription: string | null

  problem
    originalDescription: string
    changePattern: sudden | gradual | unknown
    changeBegan: UserReportedTime | null
    previousRuntime: DurationObservation | null
    currentRuntime: DurationObservation | null
    warningOrErrorReported: string | null

  charging
    reachesFullChargeBeforeUse: yes | no | sometimes | unknown
    daytimeChargingChange: lower | unchanged | variable | unknown
    gridOrGeneratorChargeObservation: string | null

  system
    approximateAge: UserReportedDuration | null
    inverter
      brand: string | null
      model: string | null
      ratedCapacity: UserReportedMeasurement | null
    battery
      brand: string | null
      model: string | null
      chemistry: string | null
      statedCapacity: UserReportedMeasurement | null
      quantity: integer | null
    panels
      statedCapacity: UserReportedMeasurement | null
    recentMaintenanceOrChange: string | null
    installerOrWarrantyAvailable: yes | no | unknown

  loads: LoadObservation[]
    name: string
    quantity: integer | null
    statedPower: UserReportedMeasurement | null
    estimatedUseDuration: DurationObservation | null
    recentlyAddedOrChanged: boolean | unknown

  uploads: EvidenceUpload[]
    clientUploadId: string
    evidenceType: inverter_display | battery_display | controller_display |
                  error_screen | equipment_label | other
    fileType: string
    fileSize: integer
    userDescription: string | null

  userLocale: string | null
```

### Supporting input types

```text
DurationObservation
  value: number | null
  unit: minutes | hours | unknown
  approximate: boolean
  originalText: string | null

UserReportedTime
  normalizedValue: date | datetime | null
  originalText: string

UserReportedDuration
  value: number | null
  unit: days | weeks | months | years | unknown
  approximate: boolean
  originalText: string | null

UserReportedMeasurement
  value: number | null
  unit: string | null
  approximate: boolean
  originalText: string | null
```

### Input validation rules

- `originalDescription` cannot be empty for a normal assessment.
- Hazard selections must not contradict `noneObserved`.
- Runtime values cannot be negative.
- Quantities cannot be negative.
- An uploaded file must use an allowed format and configured size limit.
- Unknown system details remain `null` or explicit `unknown`; they must not be guessed.
- Server validation must not trust client-provided file type alone.

Exact character limits, file formats, upload count, and file-size limits remain open questions.

## 7. Internal processing state

```text
AssessmentState
  assessmentId: string
  schemaVersion: string
  flowStatus: created | safety_screened | collecting_input |
              extracting_evidence | awaiting_confirmation |
              asking_follow_up | generating_assessment |
              completed | blocked_by_hazard | failed
  currentScreen: home | safety | input | review | result

  input: AssessmentInput

  safety
    status: clear | review_required | urgent
    triggeredRules: SafetyRuleReference[]
    userFacingEscalation: string | null

  evidence
    facts: EvidenceFact[]
    conflicts: EvidenceConflict[]
    missingFields: MissingEvidence[]

  imageProcessing
    status: not_requested | queued | processing | needs_confirmation |
            confirmed | unreadable | failed
    observations: ExtractedObservation[]

  clarification
    questions: FollowUpQuestion[]
    answers: FollowUpAnswer[]

  assessmentDraft
    candidateCauseCategories: CauseAssessment[]
    safeChecks: SafeAction[]
    prohibitedActions: ProhibitedAction[]
    recommendedNextAction: RecommendedAction | null

  errors: ProcessingError[]
  updatedAt: datetime
```

### Evidence fact

```text
EvidenceFact
  factId: string
  label: string
  normalizedValue: string | number | boolean | null
  displayValue: string
  source: user_report | image_extraction | user_confirmed_image |
          deterministic_calculation | uploaded_document
  confirmationStatus: confirmed | unconfirmed | rejected | not_required
  originalReference: string | null
```

### Extracted observation

```text
ExtractedObservation
  observationId: string
  clientUploadId: string
  observationType: voltage | state_of_charge | load_percentage |
                   charging_state | power | error_code | brand | model | other
  rawText: string | null
  proposedValue: string | number | null
  proposedUnit: string | null
  readability: clear | uncertain | unreadable
  userDecision: pending | confirmed | corrected | rejected
  confirmedValue: string | number | null
```

`readability` describes whether the image content is legible. It is not a probability that a component is faulty.

### Follow-up question

```text
FollowUpQuestion
  questionId: string
  prompt: string
  responseType: single_choice | multiple_choice | number | short_text
  options: string[] | null
  reasonAsked: string
  requiredForAssessment: boolean
```

### Cause assessment

```text
CauseAssessment
  category: string
  evidenceLabel: more_consistent | possible_insufficient_evidence |
                 cannot_assess
  explanation: string
  supportingFactIds: string[]
  conflictingFactIds: string[]
  missingEvidenceIds: string[]
  requiresProfessionalInspection: boolean
```

The final cause-category taxonomy remains an open question. Initial candidates include load-related, incomplete charging, reduced solar generation, battery ageing or reduced usable capacity, configuration, inverter or battery-management warning, and wiring or protection requiring professional inspection.

## 8. Result payload

```text
AssessmentResult
  assessmentId: string
  schemaVersion: string
  generatedAt: datetime

  status: more_information_needed | safe_observations_recommended |
          professional_inspection_recommended | urgent_safety_escalation

  summary: string

  knownFacts: ResultFact[]
  missingOrUncertain: ResultGap[]
  possibleCauses: CauseAssessment[]
  safeChecks: SafeAction[]
  prohibitedActions: ProhibitedAction[]
  recommendedNextAction: RecommendedAction
  technicianBrief: TechnicianBrief | null
  disclaimer: string
```

### Result fact and gap

```text
ResultFact
  label: string
  displayValue: string
  sourceLabel: Reported by user | Confirmed from image |
               Calculated from confirmed input

ResultGap
  label: string
  whyItMatters: string
  suggestedSafeCollectionMethod: string | null
```

### Safe and prohibited actions

```text
SafeAction
  title: string
  instruction: string
  reason: string
  stopCondition: string | null

ProhibitedAction
  title: string
  explanation: string
  escalation: string | null
```

### Recommended next action

```text
RecommendedAction
  actionType: collect_more_evidence | continue_observation |
              contact_original_installer | contact_qualified_technician |
              urgent_escalation
  title: string
  explanation: string
  priority: normal | prompt | urgent
```

The exact meaning and display rules for `priority` require safety-policy review before implementation.

### Technician brief

```text
TechnicianBrief
  generatedAt: datetime
  userStatedProblem: string
  previousRuntime: string | null
  currentRuntime: string | null
  changeBegan: string | null
  changePattern: string
  systemSummary: string
  relevantLoads: string[]
  displayReadings: string[]
  warningOrErrorCodes: string[]
  changesOrEvents: string[]
  safeObservationsCompleted: string[]
  areasForProfessionalInvestigation: string[]
  unresolvedQuestions: string[]
  safetyStatement: string
  decisionSupportDisclaimer: string
```

The technician brief must contain confirmed facts and clearly labelled investigation areas. It must not convert possible causes into a diagnosis.

## 9. State transition rules

| Current state | Event | Next state |
| --- | --- | --- |
| Home | User starts | Safety check |
| Safety check | Urgent hazard selected | Blocked by hazard → urgent result |
| Safety check | No hazard reported | Input |
| Input | Validation fails | Input with errors |
| Input | Valid data submitted | Evidence extraction |
| Evidence extraction | Observations available | Review |
| Evidence extraction | Image unreadable | Review with unreadable state |
| Review | User corrects evidence | Review |
| Review | Material gaps exist | Follow-up questions |
| Review | Evidence sufficient | Assessment generation |
| Follow-up | Answers submitted | Assessment generation or more information needed |
| Any processing state | Hazard detected | Blocked by hazard → urgent result |
| Assessment generation | Success | Result |
| Assessment generation | Failure | Recoverable error |
| Result | User edits evidence | Review |
| Result | User starts again | Safety check |

## 10. Open questions

### Product and interaction

- Should Screen 2 use one combined hazard question or individual yes/no questions?
- Should the user be allowed to save and resume an assessment?
- Should the form use a single scrolling screen or a multi-step wizard?
- Should users see every extracted image observation or only observations relevant to the case?
- Should the technician brief be editable before export?
- Should the user be able to attach original images to the exported brief?
- Should the product support Nigerian Pidgin or voice input in the first public version?

### Data and privacy

- Is an account required in any later version?
- Are assessments stored, processed ephemerally, or saved only on the user's device?
- Are uploaded images retained? If so, for what purpose and duration?
- Which data may be used for product evaluation or model improvement, and what consent is required?
- What deletion and export controls are required?
- Which analytics events are appropriate without exposing personal or equipment information?

### AI and knowledge

- Which image-capable model will be used?
- Which reviewed solar-domain sources will ground explanations and safe actions?
- Which cause categories are useful and understandable to both owners and technicians?
- How will prompts, schemas, and safety rules be versioned?
- Which outputs require deterministic rules rather than model judgment?
- How will model quality be evaluated across equipment types and image quality?

### Technical

- What are the accepted image formats, upload count, and size limits?
- What are the maximum text lengths?
- Is image processing synchronous or queued?
- What retry, timeout, and rate-limit behavior is appropriate?
- Which export format is required: plain text, PDF, printable HTML, or more than one?
- Does the public competition MVP need persistent storage at all?

### Safety and professional review

- Which exact hazard rules must trigger immediate escalation?
- What wording should be used for local emergency escalation in Nigeria?
- Which safe observations are acceptable for an unqualified user?
- Which disclaimer wording should receive professional or legal review?
- How should the product distinguish urgent, prompt, and normal actions?

## 11. Flow acceptance criteria

- [ ] A user can start without creating an account in the MVP.
- [ ] Hazard screening occurs before normal evidence intake.
- [ ] Any urgent hazard bypasses normal assessment and returns safety escalation.
- [ ] The user can complete input without knowing all system specifications.
- [ ] The user can continue without an image.
- [ ] Image observations are never treated as confirmed before user review.
- [ ] The user can correct or reject extracted values.
- [ ] Follow-up questions are limited to evidence that affects the assessment.
- [ ] The result separates facts, gaps, possible causes, safe checks, prohibited actions, and next steps.
- [ ] Cause categories use qualitative uncertainty and do not claim confirmed component failure.
- [ ] The technician brief contains confirmed facts and labelled investigation areas.
- [ ] Unsafe requests are blocked by deterministic safety rules.
- [ ] A processing failure preserves the user's work and allows retry.
- [ ] The user can return to correct evidence.
- [ ] The user can copy the technician brief.
- [ ] Open implementation decisions remain documented rather than silently guessed.

