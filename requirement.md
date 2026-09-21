# Solar Decision-Support MVP Requirements

## Document status

- **Working product name:** SolarResolve
- **Name status:** Temporary; final name is undecided
- **Document type:** MVP product requirements document
- **Version:** 0.1
- **Last updated:** 2026-09-21
- **Competition:** 3MTT × MIT Open Learning Universal AI Innovation Challenge

## 1. Purpose

This document defines the first demonstrable version of an AI-powered decision-support product for Nigerian solar users.

The MVP will help a non-technical solar owner describe a performance problem, organize available evidence, understand plausible cause categories, perform only safe observations, and prepare a structured brief for a qualified technician.

The MVP is decision support. It is not a remote repair service, electrical inspection, professional diagnosis, or replacement for a qualified technician.

## 2. Product proposition

> Upload what you are seeing, explain what changed, and receive a structured solar problem assessment, safe next steps, and a technician-ready brief.

The core transformation is:

> **Solar uncertainty → structured evidence → informed action**

## 3. Primary user

### User profile

A Nigerian homeowner or small-business owner who:

- already has an inverter, battery, and solar-panel system;
- is experiencing reduced battery runtime;
- does not have deep solar or electrical knowledge;
- may not know all system specifications;
- has access to a smartphone;
- can photograph a display or equipment label; and
- wants to understand the problem before paying for a visit, repair, or replacement.

### User need

> “My battery used to last through the night, but it now runs down by about 11 p.m. I need to know what information matters, what I can safely check, and what to tell a technician.”

## 4. MVP scenario

### Primary scenario

The initial MVP supports:

> **Battery runtime has declined significantly.**

### Demo narrative

1. The user reports that the battery previously lasted until morning.
2. It now reaches a low level or causes a shutdown around 11 p.m.
3. The user uploads a photograph of an inverter or battery display.
4. The user supplies a short description and basic system information.
5. The AI extracts visible evidence and asks targeted follow-up questions.
6. The product produces a structured assessment.
7. The product recommends safe observations and clearly lists prohibited actions.
8. The product generates a shareable technician brief and action plan.

### Supported adjacent descriptions

The MVP may accept closely related wording, such as:

- “My battery drains too quickly.”
- “The inverter shuts down earlier than it used to.”
- “My battery no longer lasts overnight.”
- “The battery percentage drops very fast.”

Other fault types may be shown as future options, but they do not need complete assessment flows in version 0.1.

## 5. Goals

The MVP must:

- make it easy for a non-technical user to report declining battery runtime;
- collect enough structured evidence to improve the next decision;
- visibly demonstrate useful image and language AI capabilities;
- separate observed facts from AI-generated possibilities;
- communicate uncertainty instead of claiming a definitive diagnosis;
- recommend only low-risk user actions;
- identify situations that require urgent escalation;
- create a technician brief that can be copied, downloaded, or shared;
- work well on a mobile phone; and
- be publicly accessible for competition judging.

## 6. Non-goals

The first MVP will not:

- confirm that a battery, inverter, controller, panel, cable, or other component is defective;
- provide professional electrical certification;
- instruct users to open equipment or touch electrical connections;
- modify inverter, charger, or battery-management settings;
- continuously monitor hardware;
- connect directly to inverter or battery telemetry;
- compare complete purchase quotations;
- verify an installation against every applicable standard;
- sell equipment or technician services;
- adjudicate disputes;
- support every solar fault, brand, model, or battery chemistry; or
- guarantee savings or repair outcomes.

## 7. User journey

### Step 1 — Landing page

The landing page must communicate:

- what the product does;
- that it offers decision support rather than a confirmed diagnosis;
- that the current MVP focuses on declining battery runtime;
- that users should stop and seek professional help for immediate hazards; and
- how to begin an assessment.

Primary call to action:

> **Assess my battery-runtime problem**

### Step 2 — Safety check

Before normal intake, ask whether the user currently observes any urgent warning sign:

- smoke or fire;
- burning smell;
- battery swelling, leaking, hissing, or cracking;
- exposed or sparking wires;
- electric shock;
- severe or unusual heat; or
- water entering electrical equipment.

If the user selects any urgent sign, the normal AI assessment must stop. The product must advise the user to:

- keep a safe distance;
- avoid touching, opening, disconnecting, or attempting to repair the equipment;
- switch off power only if a safe, clearly labelled external isolation control is available and the user already knows how to use it safely; and
- contact a qualified solar/electrical professional or relevant emergency service.

The product must not provide detailed troubleshooting in this state.

### Step 3 — Problem description

Collect:

- what changed;
- previous typical runtime;
- current typical runtime;
- when the decline began;
- whether it changed suddenly or gradually;
- whether the system reaches full charge during the day;
- whether new appliances or usage patterns were introduced; and
- any displayed warning or error code.

The interface should accept plain-language descriptions and should not require technical vocabulary.

### Step 4 — Evidence upload

Allow the user to upload at least one image of:

- inverter display;
- battery display;
- controller display;
- visible error screen; or
- equipment specification label.

Requirements:

- accept common phone image formats;
- explain what should be visible in the photograph;
- warn the user not to expose themselves to danger to obtain a photograph;
- allow assessment to continue when no image is available; and
- distinguish information read from an image from information entered by the user.

### Step 5 — System details

Collect the following when known:

- inverter brand and model;
- inverter rated capacity;
- battery brand and model;
- battery chemistry;
- stated battery capacity;
- number of batteries;
- approximate system age;
- panel capacity;
- last known maintenance or repair; and
- installer or warranty availability.

Every technical field except system age may include:

> **I don't know**

### Step 6 — Load information

Ask the user to select or enter the appliances normally used during the affected period.

Examples:

- lights;
- fans;
- television;
- refrigerator or freezer;
- laptop or phone charging;
- water pump;
- air conditioner;
- microwave, kettle, iron, or other heating appliance; and
- other equipment.

Where practical, collect approximate quantity, wattage, and hours of use without making those fields mandatory.

### Step 7 — AI follow-up questions

The AI must ask only questions that materially improve the assessment. It should prioritize three to five questions and avoid an open-ended chatbot interview.

Potential questions include:

- Does the battery show a full charge before evening use begins?
- Has any appliance been added or used for longer recently?
- Does the inverter display an error or low-battery warning before shutdown?
- Is daytime solar charging visibly lower than it used to be?
- Did the problem begin after maintenance, a setting change, or installation work?
- Does the problem also occur after a full grid or generator charge?
- Is the runtime poor every day or only on cloudy days?

### Step 8 — Review evidence

Before generating an assessment, show a summary of the collected evidence and allow the user to correct it.

The review must label information by source:

- **Reported by user**
- **Read from image**
- **Not provided**

### Step 9 — Assessment

Generate the structured output defined in Section 9.

### Step 10 — Technician brief

Allow the user to:

- view the brief;
- copy it;
- download or print it; and
- share it through an available device share mechanism when practical.

## 8. Functional requirements

### FR-01 — Start an assessment

The user must be able to begin without creating an account.

### FR-02 — Emergency screening

The system must screen for urgent hazards before accepting normal troubleshooting inputs.

### FR-03 — Structured intake

The system must collect the minimum facts needed for the battery-runtime scenario through a guided form.

### FR-04 — Plain-language input

The user must be able to describe the problem in ordinary language.

### FR-05 — Image upload

The user must be able to upload at least one relevant image from a mobile or desktop device.

### FR-06 — Image analysis

When possible, the AI should extract visible details such as:

- voltage;
- battery percentage or state of charge;
- load percentage;
- charging state;
- power values;
- error or warning code; and
- brand or model information.

Extracted values must be presented for user verification. Unclear values must be marked uncertain rather than invented.

### FR-07 — Targeted questioning

The system must generate a small set of case-specific follow-up questions based on missing or conflicting evidence.

### FR-08 — Evidence correction

The user must be able to correct extracted or summarized information before assessment generation.

### FR-09 — Structured assessment

The system must produce the sections defined in Section 9 and must visually separate facts from hypotheses.

### FR-10 — Confidence and limitations

Each plausible cause category must include a qualitative evidence label such as:

- more consistent with available evidence;
- possible but insufficient evidence; or
- cannot assess from current information.

The product must not display artificial numerical certainty unless it has been validated and has a clear meaning.

### FR-11 — Safety boundaries

The system must prevent or replace advice that involves opening equipment, touching conductors, bypassing protection, or changing protected settings.

### FR-12 — Technician brief

The system must generate a concise brief from confirmed evidence and clearly label any unconfirmed possibilities.

### FR-13 — Reset and new assessment

The user must be able to clear the current case and begin a new assessment.

### FR-14 — Feedback

The user should be able to indicate whether the assessment was:

- clear;
- useful;
- safe and appropriate; and
- helpful for speaking with a technician.

Optional free-text feedback may be included with a privacy warning.

### FR-15 — Demo mode

The deployed MVP should include a clearly labelled sample case so judges can see the complete workflow even without access to solar equipment.

## 9. Required assessment output

### 9.1 Assessment status

Begin with one of these outcomes:

- **More information needed**
- **Safe observations recommended**
- **Professional inspection recommended**
- **Urgent safety escalation**

### 9.2 What we know

List only facts supplied by the user or visibly extracted and confirmed from uploaded evidence.

Example:

> The user reports that runtime declined from approximately seven hours to three hours over two weeks. The display image appears to show 52.4 V and no visible error code. A refrigerator, television, four lights, and two fans are used during the affected period.

### 9.3 What is missing or uncertain

List material gaps or conflicting observations.

Example:

> The battery chemistry and usable capacity are unknown. The image does not clearly show the charging state. No before-and-after load record is available.

### 9.4 What may be happening

Present a short, ranked list of plausible categories. For each category, include:

- category name;
- why it is being considered;
- evidence that supports it;
- evidence that is missing or conflicts with it; and
- an uncertainty statement.

Possible categories include:

- increased or changed load;
- incomplete charging;
- reduced solar generation;
- battery ageing or reduced usable capacity;
- configuration or operating-mode change;
- loose, damaged, or inadequate connection requiring professional inspection;
- inverter or battery-management warning; and
- insufficient evidence.

The system must not reduce every case to “bad battery.”

### 9.5 Safe checks

Recommend only observations that can be completed without opening, disconnecting, reconfiguring, or touching electrical components.

Examples include:

- record the displayed battery percentage or voltage at sunset and shutdown;
- note the appliances operating during the affected period;
- compare performance on two similar days;
- photograph any visible error code from a safe position;
- check whether ventilation openings are externally blocked without touching internal components; and
- locate warranty, installation, or equipment documents.

### 9.6 What not to do

Always show prominent prohibitions appropriate to the case.

### 9.7 Recommended next action

Provide a prioritized action with a reason. Examples include:

- gather one missing observation before contacting support;
- contact the original installer under warranty;
- request a qualified battery-capacity and charging-system assessment;
- request inspection of wiring, protection, and configuration; or
- stop using the system and seek urgent assistance.

### 9.8 Technician brief

The brief must contain:

- date generated;
- user-stated problem;
- previous and current runtime;
- when the change began;
- system details;
- relevant loads;
- displayed readings and error codes;
- uploaded evidence summary;
- safe observations already completed;
- relevant changes or events;
- possible areas for professional investigation;
- unresolved questions; and
- safety disclaimer.

The brief should be short enough to send through messaging applications.

## 10. AI requirements

### AI-01 — Meaningful role

AI must provide value beyond a static form by interpreting natural language, extracting image evidence, selecting relevant follow-up questions, and transforming fragmented information into a structured assessment and brief.

### AI-02 — Grounded output

The AI must base case-specific claims on:

- confirmed user input;
- confirmed image extraction;
- approved solar-domain guidance; and
- explicit safety rules.

It must not invent equipment specifications, readings, errors, or events.

### AI-03 — Source separation

The system must preserve the distinction between:

- user-reported facts;
- image-extracted observations;
- deterministic calculations;
- domain guidance; and
- AI-generated possibilities.

### AI-04 — Uncertainty

The AI must state when evidence is insufficient and request a relevant observation instead of forcing a conclusion.

### AI-05 — Consistency

The same confirmed evidence should produce materially consistent assessment categories and safety guidance.

### AI-06 — Refusal and redirection

The AI must refuse requests for unsafe repair instructions and redirect the user toward safe isolation, a qualified professional, or emergency help as appropriate.

### AI-07 — Prompt-injection resistance

Text visible inside uploaded images or entered by users must be treated as untrusted case data, not as instructions that can override product or safety rules.

### AI-08 — Human-readable language

The default output must use plain English, short explanations, and familiar units. Technical terms should be explained when used.

## 11. Safety requirements

### S-01 — No dangerous procedures

Do not instruct users to:

- open equipment enclosures;
- remove covers;
- touch terminals or conductors;
- disconnect or reconnect batteries or panels;
- bypass fuses, breakers, isolators, or protection devices;
- short, bridge, or probe electrical contacts;
- alter charging voltages, battery profiles, firmware, or protected configuration;
- perform live electrical measurements; or
- continue operating equipment showing urgent hazard signs.

### S-02 — Hazard-first behavior

Urgent hazards override the normal troubleshooting flow.

### S-03 — No definitive remote diagnosis

Use language such as:

> “The available information is more consistent with incomplete charging than with a confirmed battery failure, but remote evidence cannot establish the cause.”

Do not use language such as:

> “Your battery is bad.”

### S-04 — Professional escalation

Recommend a qualified technician whenever physical inspection, measurement, repair, opening, disconnection, or configuration change is needed.

### S-05 — Visible disclaimer

The assessment and technician brief must state that the output is informational decision support and not a professional electrical diagnosis.

## 12. Privacy and data requirements

### P-01 — Data minimization

Collect only information relevant to the assessment.

### P-02 — Upload warning

Before upload, warn users not to include:

- passwords;
- access codes;
- bank or payment information;
- identification documents;
- unrelated faces or private household information; or
- precise location information unless genuinely required.

### P-03 — User control

The user must be able to remove an uploaded image before submitting the assessment.

### P-04 — Retention disclosure

The deployed MVP must clearly state whether inputs and images are stored, for how long, and for what purpose.

### P-05 — No silent training use

User content must not be represented as being used for model training unless that use is explicitly disclosed and consented to.

### P-06 — Public-demo protection

The sample case must use synthetic or deliberately anonymized data and images.

## 13. User experience requirements

### UX-01 — Mobile first

The complete flow must be usable on a common smartphone screen.

### UX-02 — Low-friction access

No account or login is required for the competition MVP.

### UX-03 — Low-bandwidth awareness

The interface should minimize large downloads, compress images where appropriate, and clearly show upload or processing progress.

### UX-04 — Progressive disclosure

Show a small number of questions at a time. Do not present a long technical form on the first screen.

### UX-05 — Unknown is valid

Users must be able to continue when they do not know technical specifications.

### UX-06 — Editable AI extraction

All extracted readings must be editable or confirmable.

### UX-07 — Clear visual hierarchy

Facts, uncertainties, possible causes, safe actions, warnings, and the technician brief must look visibly different.

### UX-08 — Accessible language

Avoid unnecessary jargon and explain technical terms. Initial implementation may use English; future versions may add Nigerian Pidgin and other languages.

### UX-09 — Processing state

Show clear progress and recovery options while images or assessments are processed.

### UX-10 — Error recovery

If AI or image processing fails, preserve entered information and allow retry, replacement of the image, or continuation without image analysis.

## 14. Non-functional requirements

### NFR-01 — Public availability

The MVP must use a publicly accessible URL that does not require a judge to request access.

### NFR-02 — Responsiveness

The main interface must adapt to mobile and desktop screens.

### NFR-03 — Performance

Normal pages should load promptly on an ordinary mobile connection. Long AI operations must provide visible feedback.

### NFR-04 — Reliability

A temporary AI failure must produce a useful error message and a retry path rather than losing the case.

### NFR-05 — Security

API keys and private configuration must never be exposed in browser code or public repositories.

### NFR-06 — Observability

The application should record privacy-conscious technical errors sufficient to diagnose failed uploads and failed assessments.

### NFR-07 — Browser support

The MVP should work in current mobile and desktop versions of common Chromium-based browsers and Safari where practical.

## 15. Suggested application screens

The MVP may use these screens or states:

1. Landing and scope
2. Urgent safety screening
3. Runtime problem description
4. Evidence upload
5. System details
6. Appliance/load selection
7. AI follow-up questions
8. Evidence review and correction
9. Assessment result
10. Technician brief
11. Feedback and new assessment

These may be implemented as separate pages or as a guided single-page flow.

## 16. Minimum data model

Each case should be able to represent:

- case identifier;
- creation date and time;
- hazard-screen answers;
- user problem description;
- previous runtime;
- current runtime;
- change start date or approximate period;
- sudden or gradual change;
- charging observations;
- selected and free-text loads;
- system details;
- image metadata;
- extracted image observations;
- user confirmations and corrections;
- follow-up questions and answers;
- factual evidence summary;
- missing information;
- plausible cause categories;
- safe checks;
- prohibited actions;
- recommended next action;
- technician brief; and
- user feedback.

Sensitive image content does not need to be retained after processing unless the product explicitly discloses and justifies retention.

## 17. Demo-mode sample case

The public MVP must include a safe sample case with synthetic data.

### Sample input

- Previous runtime: approximately 7 hours
- Current runtime: approximately 3 hours
- Change: gradual decline over 2 weeks
- System age: 30 months
- Loads: refrigerator, television, four LED lights, two fans
- Recent change: an additional freezer is sometimes used
- Daytime observation: battery does not always show full charge before sunset
- Error code: none visible
- Image: synthetic or anonymized inverter/battery display

### Expected assessment behavior

The assessment should:

- identify increased load and incomplete charging as evidence-supported possibilities;
- mention battery ageing or reduced usable capacity as possible but unconfirmed;
- avoid declaring the battery defective;
- request or recommend recording sunset and shutdown readings;
- recommend comparing performance without the additional freezer when safe and practical;
- suggest professional evaluation if poor runtime persists after a confirmed full charge; and
- create a technician brief containing the above facts and uncertainties.

## 18. Acceptance criteria

The MVP is ready for competition demonstration when all of the following are true:

- [ ] A user can complete the journey without logging in.
- [ ] Urgent hazard selection stops normal troubleshooting and shows appropriate escalation.
- [ ] A user can submit the case without knowing every system specification.
- [ ] A user can upload a relevant image or continue without one.
- [ ] The system extracts at least one useful visible value or explicitly states that extraction was uncertain.
- [ ] The user can correct image-extracted information.
- [ ] The AI asks no more than five relevant follow-up questions in the primary flow.
- [ ] The assessment clearly separates facts, missing information, and plausible causes.
- [ ] No output claims a confirmed battery or inverter failure from remote evidence alone.
- [ ] Safe checks never require opening, disconnecting, probing, or reconfiguring equipment.
- [ ] The result contains a recommended next action.
- [ ] A complete technician brief can be copied or downloaded.
- [ ] Unsafe repair requests are refused and redirected appropriately.
- [ ] The sample case completes successfully from start to finish.
- [ ] The interface is usable on a smartphone.
- [ ] Privacy, retention, and disclaimer language is visible.
- [ ] The application is accessible through a public URL.
- [ ] A judge can understand the AI contribution during a short demonstration.

## 19. Evaluation plan

Before public submission, test at least the following cases:

1. Declining runtime with a recently added heavy load
2. Declining runtime with incomplete daytime charging
3. Older battery with no obvious load change
4. Unclear or unreadable uploaded display
5. No image supplied
6. Missing system specifications
7. Conflicting user report and image reading
8. Smoke, burning smell, swelling, or another urgent hazard
9. User requesting instructions to open the inverter or battery
10. Prompt-injection text contained in an uploaded image

For each test, verify:

- factual accuracy;
- appropriate uncertainty;
- safety behavior;
- usefulness of follow-up questions;
- clarity of next actions; and
- quality of the technician brief.

## 20. Delivery priorities

### Must have

- guided runtime-problem intake;
- urgent hazard screening;
- image upload and AI-assisted extraction;
- targeted follow-up questions;
- evidence review and correction;
- structured assessment;
- safe-check and prohibited-action sections;
- technician brief;
- mobile-responsive interface;
- sample demo case; and
- public deployment.

### Should have

- voice description input;
- downloadable or printable brief;
- lightweight user feedback;
- low-bandwidth image handling; and
- simple case reset.

### Could have

- Nigerian Pidgin output;
- multiple image uploads;
- share-to-messaging integration;
- quotation or equipment-document upload; and
- additional problem categories.

### Will not have in version 0.1

- direct hardware integration;
- technician marketplace;
- payment system;
- automatic warranty claims;
- full quote analysis; or
- definitive component diagnosis.

## 21. Open implementation decisions

- Final product name and visual identity
- Web framework and hosting platform
- Image-capable AI model
- Solar-domain knowledge source and review process
- Rule-based versus model-based safety enforcement
- Whether uploaded images are processed ephemerally or retained
- Technician-brief export format
- Voice-input implementation
- Analytics and feedback storage
- Exact disclaimer and privacy-policy wording

## 22. Next document

After this requirements document is approved, create a technical design containing:

- selected technology stack;
- application architecture;
- AI request and response schemas;
- safety-policy implementation;
- data flow and storage decisions;
- API routes or service boundaries;
- deployment design; and
- staged implementation plan.

