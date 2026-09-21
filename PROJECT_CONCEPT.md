# Project Concept

## Project status

- **Working name:** SolarResolve
- **Naming status:** Temporary; the final name has not been selected.
- **Product category:** AI-powered solar decision support
- **Initial market:** Nigerian residential and small-business solar users
- **Competition:** 3MTT × MIT Open Learning Universal AI Innovation Challenge
- **Current phase:** Concept definition and MVP planning

## One-line proposition

> An AI-powered assistant that helps Nigerian solar users understand what may be happening with their system, collect useful evidence, and take a safe and informed next step before losing more money.

## Core product thesis

Nigerian solar owners do not primarily need more general solar information. They need help making sound decisions when a system, quote, installation, or performance issue does not make sense.

The product turns:

> **Solar uncertainty → structured evidence → informed action**

It is not intended to be a generic “solar + chatbot” product or a substitute for a qualified technician.

## The problem

Nigerian solar users often cannot independently determine whether:

- a proposed system is appropriately sized;
- competing quotations are genuinely comparable;
- an installation has been configured correctly;
- system performance is normal;
- a reported fault has been diagnosed accurately; or
- a recommended repair or replacement is justified.

This creates a large information and trust gap between customers, installers, vendors, technicians, and the equipment itself. When something goes wrong, users usually possess fragmented information and may describe the problem imprecisely. They can become trapped between conflicting explanations and make expensive decisions under uncertainty.

Possible consequences include:

- unnecessary technician visits;
- avoidable battery or component replacement;
- unnecessary repairs or system upgrades;
- prolonged downtime and generator-fuel costs;
- unsafe attempts at self-repair; and
- declining trust in installers and solar technology.

## Target user

The initial user is a Nigerian household or small-business owner who already has a solar system but lacks the technical expertise to understand a performance problem or communicate it effectively to a technician.

Typical user statements include:

- “My battery used to last until morning, but now it dies by 11 p.m.”
- “My inverter keeps beeping or shutting down.”
- “The battery is not charging fully.”
- “My panels are producing less than before.”
- “An appliance trips the system.”
- “My installer says the battery is bad, but the vendor says it is the inverter.”

## Competition MVP

### Focused journey

> **“My solar system is not performing properly.”**

The competition prototype will demonstrate one complete and polished problem-assessment flow rather than attempting to cover the entire solar ownership lifecycle.

### User input

The user provides:

- a photo of an inverter, battery, controller, error display, label, or relevant installation detail;
- a short typed or spoken description of the problem;
- system age;
- known inverter, battery, and panel details;
- major connected appliances or loads; and
- when the problem began.

The first screen may offer structured issue choices such as:

- battery drains too quickly;
- battery is not charging;
- inverter keeps shutting down;
- inverter displays an error;
- panels produce less than expected;
- an appliance trips the system;
- performance has declined;
- the system works intermittently; or
- something else.

### AI-supported processing

The AI will:

1. extract visible information from uploaded images;
2. convert the user's description into structured facts;
3. identify missing information;
4. ask targeted follow-up questions;
5. organize the issue into plausible cause categories;
6. explain the uncertainty and limits of the assessment;
7. recommend low-risk observations and checks; and
8. generate a concise technician-ready brief.

### User output

The assessment should contain the following sections.

#### What we know

A factual summary based only on user-provided or visibly extracted evidence, such as:

- displayed voltage or state of charge;
- inverter error code;
- reported shutdown time;
- system age;
- connected loads; and
- recent changes.

#### What may be happening

One or more plausible categories, for example:

- load-related;
- battery-related;
- charging-related;
- configuration-related;
- inverter-related;
- wiring or protection-related; or
- environmental or solar-generation-related.

The system must use calibrated language. It should say that evidence is “more consistent with” a possibility, not assert that a component is defective when that cannot be confirmed remotely.

#### Safe next actions

Simple observations or user-level checks that do not require opening equipment, touching exposed conductors, changing protected settings, or performing electrical work.

#### What not to do

Clear safety boundaries, including instructions not to:

- open an inverter or battery enclosure;
- disconnect high-voltage components;
- bypass protection devices;
- alter technical settings without appropriate competence; or
- treat the AI assessment as a definitive electrical diagnosis.

#### Technician brief

A portable summary that a user can copy, download, or share with a technician. It should include:

- system configuration;
- problem and start date;
- observations and visible error codes;
- relevant loads;
- checks already completed;
- areas that may warrant professional investigation; and
- confirmation that the user was not directed to open or modify equipment.

#### Action plan

A prioritized next-step recommendation, such as continued observation, collecting a specific reading, contacting the original installer, scheduling a qualified inspection, or taking immediate safety action.

## Core value proposition

SolarResolve does not promise to repair equipment remotely. It helps the user:

- describe the problem clearly;
- distinguish facts from assumptions;
- understand plausible explanations;
- avoid unsafe actions;
- prepare for a more productive technician interaction; and
- make a better-informed financial decision.

## Differentiation

The product is different from a general-purpose chatbot because it uses:

- a structured, solar-specific intake flow;
- multimodal evidence such as display and label photographs;
- targeted follow-up questions;
- explicit confidence and uncertainty communication;
- strong safety boundaries;
- evidence-based assessment formatting; and
- a technician-ready handoff.

The technician brief is a potential signature feature because it improves communication between a non-technical owner and a technical professional.

## Responsible AI principles

Responsible AI is a product requirement, not a submission afterthought.

### Safety

- Never instruct an unqualified user to perform dangerous electrical work.
- Escalate urgent hazards—such as smoke, burning smells, swelling batteries, exposed conductors, unusual heat, fire, or electric shock—to immediate professional or emergency action.
- Clearly separate safe observation from technician-only work.

### Honest uncertainty

- Do not represent a remote assessment as a confirmed diagnosis.
- Explain what evidence supports each possibility.
- State what additional evidence or professional testing would be required.

### Privacy

- Ask only for information needed to assess the problem.
- Warn users not to upload documents containing unnecessary personal, financial, or access information.
- Explain how uploaded photographs, documents, and voice descriptions are handled.

### Fairness and accessibility

- Use plain language for non-technical users.
- Avoid assuming that all users know their system specifications.
- Design for common Nigerian connectivity constraints and mobile devices.
- Where feasible, support voice input and locally familiar language.

### Human oversight

- Preserve qualified technicians as the final authority for physical inspection, measurement, repair, and safety-critical decisions.
- Present the output as decision support rather than professional certification.

## Long-term vision

The MVP begins with troubleshooting, but the larger opportunity is an AI decision layer across the complete solar ownership journey.

### Before purchase

- Compare quotations and specifications.
- Check whether load assumptions and system sizing appear reasonable.
- Generate questions to ask an installer.

### Before and during installation

- Produce an installation-verification checklist.
- Help users record equipment details, warranties, and commissioning evidence.

### During normal ownership

- Establish performance baselines.
- Help users document changes in generation, runtime, and load.

### When performance declines

- Structure evidence and possible causes.
- Recommend safe observations.
- Generate a technician brief.

### Before a repair or replacement

- Help the user ask informed questions.
- Organize quotations, evidence, and technician explanations for comparison.

### During a dispute

- Turn the evidence trail into a structured complaint or service record.

## Why this project fits the founder

The concept connects the creator's Mechatronics Engineering background, AI/ML direction, interest in Nigerian problem-solving, and work around clean energy through Solarpeer 360.

The founder narrative is:

> Access to solar technology is only one part of the challenge. After people purchase these systems, many cannot independently judge whether the system is appropriately sized, configured, performing normally, or being diagnosed accurately. This project addresses that decision gap between the customer and the technical system.

## Demonstration scenario

A strong competition demo could show this sequence:

1. A user selects **“Battery drains too quickly.”**
2. The user uploads an inverter or battery display photo.
3. The user explains that runtime recently declined.
4. The AI extracts visible evidence and asks two or three targeted questions.
5. The product generates a structured assessment with plausible cause categories and calibrated confidence.
6. It presents safe checks and prominent warnings about prohibited actions.
7. It generates a technician-ready brief and a prioritized action plan.

## Success criteria for the MVP

The MVP is successful if a first-time user can:

- complete the intake without technical expertise;
- understand the distinction between facts and possible causes;
- receive only safe, appropriately limited guidance;
- leave with a concrete next action; and
- produce a useful brief for a technician.

For the competition, the experience must also be publicly accessible, easy to demonstrate in a short video, and clearly show how AI creates value beyond a static checklist.

## Scope boundaries

### In scope for the competition

- one structured performance-problem journey;
- image and text input;
- targeted AI questions;
- structured assessment;
- responsible-AI and safety guardrails;
- technician brief; and
- action plan.

### Out of scope for the first MVP

- complete quote comparison;
- installation certification;
- continuous hardware monitoring;
- automatic fault confirmation;
- technician marketplace;
- payment processing;
- dispute adjudication; and
- coverage of every equipment brand and model.

## Open decisions

- Final product name and tagline
- Primary user persona and exact first-use case
- Supported image types, equipment, and fault scenarios
- AI model and technical architecture
- Source and validation of solar-domain guidance
- Data-retention and privacy policy
- Public deployment platform
- Demo dataset and evaluation method

## Immediate next steps

- [ ] Explore final names without changing the underlying product thesis.
- [ ] Define the exact primary persona.
- [ ] Select one realistic demo fault scenario.
- [ ] Convert this concept into an MVP requirements document.
- [ ] Map the end-to-end user flow and assessment states.
- [ ] Write the safety and escalation policy.
- [ ] Design the structured assessment and technician brief.
- [ ] Decide the technical architecture.
- [ ] Build, test, deploy, and record the demo.

