# Conversation History

This file preserves the decisions, ideas, and next steps from conversations about the 3MTT × MIT Open Learning Universal AI Innovation Challenge project.

## How to maintain this file

After each project conversation, add a new entry using this structure:

```markdown
## YYYY-MM-DD — Short topic

### Context

What prompted the conversation.

### Decisions

- Decisions that were made.

### Important insights

- Research findings, constraints, or reasoning worth preserving.

### Open questions

- Anything still undecided.

### Next actions

- [ ] Concrete follow-up task.
```

---

## 2026-09-21 — Challenge requirements captured

### Context

The official 3MTT × MIT Open Learning Universal AI Innovation Challenge information session was summarized to establish the rules and submission requirements.

### Decisions

- The entry will be an individual project.
- It must solve a real-world problem through a meaningful use of AI.
- The output must be a demonstrable MVP, not only an idea or slide presentation.
- The solution may use code, low-code, no-code, or AI-assisted development.
- Responsible AI must be built into the product and explained in the submission.
- The MVP and all evidence links must be publicly accessible.

### Important insights

- Technological complexity is not the main judging goal; problem clarity, practical usefulness, innovation, responsible AI, and a convincing demonstration matter more.
- The submission needs a clear project title, description, problem statement, and explanation of the AI technology used.
- A public social-media demo/pitch video is required, with the relevant 3MTT and MIT accounts tagged.
- Eligibility requires at least 10 module-specific certificates and at least one industry/vertical certificate by submission time.
- The project should fit the creator's Mechatronics, AI/ML, clean-energy, and Nigerian problem-solving background.

### Open questions

- Which real-world problem should become the competition entry?
- What is the narrowest useful MVP that can be demonstrated convincingly?

### Next actions

- [x] Select a project direction.
- [x] Define a focused MVP journey.
- [ ] Confirm current official dates and submission form requirements before submitting.

---

## 2026-09-21 — Solar decision-support concept finalized

### Context

Research into the Nigerian solar ownership journey showed that the central problem is larger than solar repair. Users face information asymmetry and uncertainty when evaluating quotes, verifying installations, understanding declining performance, diagnosing faults, and deciding whether a proposed repair is credible.

### Decisions

- The product will focus on Nigerian solar users.
- **SolarResolve** is the working name only; the final product name remains undecided.
- The product thesis is **solar uncertainty → structured evidence → informed action**.
- The long-term product will support decisions across the solar ownership journey.
- The competition MVP will focus on one polished journey: **“My solar system is not performing properly.”**
- The MVP will accept a photo of an inverter or battery display plus a short user description.
- The AI will ask targeted follow-up questions, structure the evidence, explain plausible cause categories, recommend safe checks, state prohibited/dangerous actions, and generate a technician-ready brief and action plan.
- The system must communicate uncertainty and must not claim to make a definitive remote diagnosis.

### Important insights

- The user's pain is technical, financial, informational, and trust-related.
- The strongest intervention is not generic conversation; it is converting fragmented evidence into an understandable assessment and a useful technician handoff.
- The technician brief may be the MVP's strongest differentiating feature.
- The product should help users avoid unnecessary visits, replacements, repairs, downtime, and poor decisions.
- The founder story is credible because it connects Mechatronics Engineering, AI, clean-energy work, and experience with Solarpeer 360.

### Open questions

- What should the final product be called?
- Which inverter and battery displays or fault scenarios should the MVP support first?
- Which AI models and supporting knowledge base should power image understanding and assessment?
- How will the prototype be deployed publicly for judging?

### Next actions

- [ ] Explore and select the final product name.
- [ ] Define the primary user persona and exact demo scenario.
- [ ] Write the MVP requirements and user flow.
- [ ] Design the assessment output and technician-brief format.
- [ ] Establish safety boundaries and responsible-AI language.
- [ ] Build and test the MVP.
- [ ] Prepare the pitch, demo video, social post, and challenge submission.

---

## 2026-09-21 — MVP requirements defined

### Context

The project concept was converted into an implementation-ready requirements document.

### Decisions

- The primary MVP scenario is declining overnight battery runtime.
- The primary user is a non-technical Nigerian homeowner or small-business solar owner.
- The application will use a guided assessment rather than an unrestricted chatbot interface.
- Emergency hazard screening will occur before normal problem assessment.
- Users will be able to continue when they do not know technical specifications or cannot supply an image.
- AI-extracted image evidence must be confirmed or corrected by the user.
- The assessment will clearly separate known facts, missing information, plausible causes, safe checks, prohibited actions, and recommended next steps.
- A copyable or downloadable technician brief is a mandatory MVP feature.
- A synthetic sample case will be included for judges and demonstrations.

### Important insights

- A narrow scenario gives the MVP enough depth to demonstrate meaningful AI, safety, and usefulness.
- Safety behavior and honest uncertainty are acceptance criteria, not optional disclaimers.
- The application needs both model-based interpretation and deterministic guardrails.
- The next major decision is the technical architecture.

### Open questions

- Which technology stack and AI model should be used?
- Which reviewed solar-domain sources will ground the assessment?
- Will images be processed ephemerally or stored temporarily?
- What export format should be used for the technician brief?

### Next actions

- [x] Define the primary user and demo scenario.
- [x] Write the MVP requirements and acceptance criteria.
- [ ] Select the technical architecture.
- [ ] Create the interface and AI data schemas.
- [ ] Build and test the MVP.

---

## 2026-09-21 — Workspace foundation documented

### Context

The project workspace was formally defined around the objective **“Foundational Web Service Development using AI Coding Tools.”**

### Decisions

- The repository is the single source of truth for product documentation, implementation, AI behavior, safety rules, tests, deployment configuration, and project decisions.
- The base README distinguishes existing documentation from the planned implementation structure.
- Planned implementation areas include API, domain, AI, safety, services, storage, UI, configuration, tests, documentation, scripts, and deployment.
- Empty implementation directories will not be created until the technology stack and technical design are approved.
- AI coding tools will accelerate implementation, but generated work must be reviewed, tested, and checked against project requirements.

### Important insights

- A dependable service foundation requires deterministic validation and safety controls around probabilistic AI behavior.
- Versioned prompts, schemas, fixtures, and evaluation cases are part of the product codebase.
- The next milestone remains the technical design and stack selection.

### Open questions

- Which web framework, AI model, storage approach, and deployment platform will be used?
- Will the interface and API live in one application or separate services?

### Next actions

- [x] Create the base project README.
- [ ] Create `docs/TECHNICAL_DESIGN.md`.
- [ ] Approve the stack and application boundaries.
- [ ] Scaffold the implementation and test directories.

---

## 2026-09-21 — Founder pitch page requirements defined

### Context

A page-specific specification was requested for an **Aspiring Founder Profile & Venture Introduction Page** titled **My Startup Pitch**.

### Decisions

- The page will be a focused, single-page founder and venture introduction.
- The top will contain the founder name, one-line bio, and exactly three domain tags.
- The middle will contain exactly two primary cards: the problem and the solution.
- The bottom will contain an interactive email CTA implemented with a `mailto:` link.
- The visual system will use a modern dark theme and Pretendard typography.
- The two cards will stack on mobile and sit side by side on desktop.
- The page will introduce the current SolarResolve concept but will not implement the assessment product itself.

### Important insights

- Founder name and email were not supplied, so explicit placeholders were documented for replacement before deployment.
- Responsiveness, accessibility, and clean card rendering are part of the Definition of Done.
- The page does not require a backend, database, authentication, or contact-form service.

### Open questions

- What founder name should be displayed?
- Which email address should the CTA use?
- Should SolarResolve remain the displayed venture name after naming exploration?

### Next actions

- [x] Create `PAGE_REQUIREMENTS.md`.
- [ ] Supply the final founder name and contact email.
- [ ] Implement and visually verify the page across the required viewports.
