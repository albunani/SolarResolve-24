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

---

## 2026-09-21 — Founder pitch page validated

### Context

`index.html` was audited against every actionable requirement in `PAGE_REQUIREMENTS.md` using source inspection and live-browser checks.

### Decisions

- The implementation is considered technically and visually strong but not ready for public release.
- Viewport behavior passed at 320, 390, 768, 1280, and 1440 CSS pixels.
- Accessibility, contrast, keyboard focus, Pretendard loading, reduced motion, semantics, and console health passed.
- The founder-name and email placeholders are release blockers.
- `index.html` was not modified because the requested output was a validation report and Antigravity patch prompts.

### Important insights

- The two remaining failures are content completion issues rather than structural or responsive defects.
- The existing email element is correctly implemented as a `mailto:` link but needs a real recipient.
- Once the two real values are supplied, no other requirement-level page change is currently indicated.

### Open questions

- What founder name should replace `[Founder Name]`?
- What public email should replace `[founder-email@example.com]`?

### Next actions

- [x] Create `VALIDATION.md`.
- [ ] Replace the founder-name placeholder.
- [ ] Replace the contact-email placeholder.
- [ ] Run the final Antigravity revalidation prompt.

---

## 2026-09-21 — Professional portfolio requirements defined

### Context

A separate one-page professional developer and founder portfolio was specified for Idris Thaabit Onimisin. The brief and uploaded background notes were combined without treating uncertain claims or missing URLs as verified facts.

### Decisions

- The page title is **My Professional Portfolio**.
- The core positioning is a Mechatronics Engineering student who actively builds with AI.
- The identity combines Mechatronics, AI, robotics, clean energy, and entrepreneurship.
- The portfolio will display exactly five technical badges and exactly three project cards.
- Solarpeer 360 and Gemma Latent Probing are defined project cards.
- The third project remains an honest in-development or details-pending card until a real project is confirmed.
- LinkedIn uses the supplied verified profile path.
- GitHub, project URLs, email, and unconfirmed leadership roles must not be invented.
- Pending links must be shown as non-clickable states rather than dead or fake anchors.

### Important insights

- The strongest portfolio signal is evidence of building at the intersection of engineering and AI, not a long list of interests.
- Transparent placeholder states protect credibility while allowing the page to be prototyped before every asset and URL is available.
- Only the Solarpeer 360 co-founder role is required by the current brief; other leadership items need confirmation.

### Open questions

- What public email and GitHub URL should be used?
- Which real project should become the third featured project?
- Are the optional leadership roles accurate and approved for public display?
- Is a professional headshot available?

### Next actions

- [x] Create `PORTFOLIO_REQUIREMENTS.md`.
- [ ] Confirm the placeholder and verification register.
- [ ] Design and implement the portfolio page.
- [ ] Validate the finished page against the portfolio Definition of Done.

---

## 2026-09-21 — Pre-launch waitlist requirements defined

### Context

A standalone one-page pre-launch landing page was specified to explain a new venture, capture early-access interest, and answer common questions.

### Decisions

- The page title is **Service Pre-launch**.
- The top contains a brand mark, benefit-oriented headline, supporting copy, and exactly three value-proposition cards.
- The middle contains a required Name and Email address waitlist form.
- The bottom contains exactly three accessible FAQ accordion items.
- The visual direction is a restrained cyan/blue dark theme.
- A polished success modal is the primary completion state for a valid, confirmed submission.
- Production must not show success until the waitlist service confirms the submission.
- Invalid input and service failures must preserve data and must not open the success modal.
- Brand and service copy remain configurable because the venture details were not supplied.

### Important insights

- The success modal requires focus management, keyboard containment, Escape support, and focus restoration, not only visual styling.
- A prototype may simulate success only if it does not falsely imply that personal data was stored.
- Pending service and privacy details must be resolved before collecting real names and email addresses.

### Open questions

- What is the final brand and service proposition?
- Which provider or backend will store waitlist submissions?
- What privacy notice and unsubscribe process will apply?
- Should the form reset or remain populated after success?

### Next actions

- [x] Create `LAUNCH_REQUIREMENTS.md`.
- [ ] Confirm brand, audience, copy, and waitlist provider.
- [ ] Implement the landing page and submission flow.
- [ ] Test all acceptance scenarios and the Definition of Done.

---

## 2026-09-21 — Startup problem definition documented

### Context

The SolarResolve concept was distilled into a focused problem definition covering the initial customer, primary friction, current alternatives, value proposition, and value hypothesis.

### Decisions

- The primary user is a non-technical Nigerian household or small-business solar owner with an installed system.
- The first trigger is a meaningful decline in battery runtime.
- The primary problem is a decision and evidence gap, not the lack of general solar information.
- The product must not promise remote diagnosis or replace a qualified technician.
- The core value is converting fragmented observations into a safety-aware assessment and technician-ready brief.
- Pain frequency is described qualitatively until user research supplies defensible numbers.

### Important insights

- The problem combines recurring operational uncertainty with infrequent but expensive and difficult-to-reverse decisions.
- The main alternatives provide information or opinion but rarely create a structured evidence-to-action process.
- Technician acceptance and usefulness of the handoff brief are central assumptions, not secondary details.

### Open questions

- How frequently do owners experience declining runtime or conflicting diagnoses?
- What costs, delays, or unsafe actions result?
- Which evidence do technicians find most useful before a visit?
- Will users trust calibrated AI guidance without mistaking it for a diagnosis?

### Next actions

- [x] Create `PROBLEM_DEFINITION.md`.
- [ ] Interview solar owners and technicians.
- [ ] Replace qualitative frequency assumptions with evidence.
- [ ] Test the value hypothesis with a prototype and technician brief.

---

## 2026-09-21 — Core product flow and data contracts defined

### Context

The SolarResolve problem definition was translated into the smallest complete user journey and an implementation-neutral data model.

### Decisions

- The core flow is Home → Safety check → Problem and evidence input → Clarification and evidence review → Assessment and technician brief.
- The MVP uses five essential screens or equivalent routed states.
- Urgent hazards override and terminate ordinary troubleshooting at any stage.
- User-reported facts, image extractions, confirmed values, calculations, and AI possibilities remain distinct data sources.
- Image-extracted values require user confirmation before assessment generation.
- The result payload separates facts, gaps, possible causes, safe checks, prohibited actions, recommended next action, and technician brief.
- Qualitative evidence labels are used instead of invented probability scores.

### Important insights

- Source attribution is a core data-model requirement because the product's value depends on distinguishing evidence from inference.
- Safety state must remain independent of cause hypotheses and be able to override the flow.
- Storage, retention, model, export, exact cause taxonomy, and professional safety language remain open decisions.

### Open questions

- Will cases and images be stored or processed ephemerally?
- Which AI model and reviewed knowledge sources will be used?
- Which cause-category taxonomy will be validated with technicians?
- Which export format should the technician brief support?

### Next actions

- [x] Create `CORE_FLOW.md`.
- [ ] Resolve the highest-impact open technical and safety questions.
- [ ] Convert the logical schemas into formal API schemas.
- [ ] Create wireframes for the five essential screens.

---

## 2026-09-21 — Consolidated MVP project brief created

### Context

The existing concept, problem definition, product requirements, and core flow were consolidated into one implementation-ready project document with fourteen requested sections.

### Decisions

- The MVP has exactly five must-have features: hazard screening, guided intake, AI evidence extraction and confirmation, structured assessment, and technician brief.
- Every must-have feature has verifiable acceptance criteria.
- The user experience is contained within five essential screens.
- The first release supports only declining battery runtime.
- Payments, billing, technician marketplaces, accounts, monitoring, and broad fault coverage are explicitly out of scope.
- The public demonstration uses synthetic or deliberately anonymized case data and equipment images.

### Important insights

- Safety and evidence confirmation are product features, not secondary warnings.
- The MVP proves the decision-support loop rather than the breadth of a solar platform.
- Real financial transactions add no value to the competition demonstration and would create unnecessary risk and scope.

### Open questions

- Which model, knowledge sources, storage policy, and export format should be selected?
- Which parts of the assessment are most valuable to owners and technicians?
- Does the MVP require any persistent database?

### Next actions

- [x] Create `PROJECT.md`.
- [ ] Approve the five-feature MVP boundary.
- [ ] Produce the technical design and formal API schemas.
- [ ] Implement and verify the demo scenario.

---

## 2026-09-21 — User scenarios and recovery behavior mapped

### Context

The MVP requirements were expanded into Happy Path, Empty/Missing Input, and Failure Recovery scenarios, each mapped to screens, features, data, and expected results.

### Decisions

- The scenario document uses the five screens already defined in `PROJECT.md`.
- Empty technical fields do not automatically block the target user.
- Unsafe, partial, or schema-invalid AI output must never appear as a completed assessment.
- The strict primary loop requires four Must-Have capabilities rather than five.
- Optional image extraction is recommended as Should rather than Must.
- Plain-text copy is sufficient for the first technician-brief delivery mechanism.

### Important insights

- Twelve undefined or contradictory requirement areas were identified.
- The most important gaps concern optional image scope, minimum evidence, load-unknown behavior, session preservation, output repair, late hazard detection, and insufficient-evidence briefs.
- A text-first primary loop materially reduces upload, privacy, and model-failure complexity without removing the core customer outcome.

### Open questions

- What is the minimum evidence required for a normal assessment?
- Should More information needed produce an Evidence Collection Brief?
- What session-level preservation behavior is acceptable?
- Which bounded model-output repair policy should be adopted?

### Next actions

- [x] Create `SCENARIOS.md`.
- [ ] Apply the recommended scope corrections to `PROJECT.md` after approval.
- [ ] Resolve the highest-risk undefined behaviors.
- [ ] Turn the scenarios into integration and browser tests.

---

## 2026-09-21 — Day 3 implementation handoff prepared

### Context

An execution prompt was prepared so Antigravity can begin the SolarResolve implementation from the existing product and technical documentation.

### Decisions

- `PROJECT.md` is the implementation source of truth.
- Day 3 is limited to base React/Vite and FastAPI scaffolding plus the first navigable slice.
- The first verified interaction is Home and scope → primary CTA → Safety-check destination.
- Root-level static pages must remain intact, so application scaffolds should use dedicated frontend and backend directories.
- No live AI, database, authentication, payment, or out-of-scope functionality is part of Day 3.
- Optional image extraction remains a pending scope decision and is not implemented during this handoff.

### Important insights

- The existing technical design already selects React with TypeScript/Vite and Python/FastAPI, so Antigravity does not need to invent the base stack.
- Day 3 completion requires running and verifying the application, not merely generating files.
- The work report must make technical choices, commands, verification evidence, and backlog explicit.

### Open questions

- Will `PROJECT.md` be updated to adopt the four-item Must-Have correction from `SCENARIOS.md`?
- Which package-management convention should become the repository standard after scaffolding?

### Next actions

- [x] Create `HANDOFF_PROMPT.md`.
- [ ] Run the handoff prompt in Antigravity.
- [ ] Review the Day 3 work report and local verification.
- [ ] Continue with deterministic hazard screening.

---

## 2026-09-21 — Antigravity clarification decisions resolved

### Context

Antigravity requested eight decisions before beginning Day 3 implementation.

### Decisions

- React + TypeScript + Vite and Python + FastAPI remain confirmed.
- `CORE_FLOW.md` and `SCENARIOS.md` exist in the verified project root and must not be replaced with stubs.
- React Router Declarative mode with browser-history URLs is the selected router.
- Frontend tests use Vitest, React Testing Library, user-event, jest-dom, and jsdom.
- Backend tests use pytest with FastAPI TestClient and HTTPX.
- Day 3 prioritizes semantic and accessible structure while establishing reusable dark cyan/blue CSS tokens; advanced glass effects are deferred.
- Optional image extraction is formally Should-Have rather than Must-Have.
- Vercel is the preferred frontend deployment target and Render is the preferred backend target; Docker is not part of Day 3.
- No AI provider is selected or integrated during Day 3.

### Important insights

- Antigravity's missing-file report indicates it was viewing a different or stale folder, because both files exist at `C:\Users\USER\Documents\ChatGPT\MIT OL`.
- Formalizing image extraction as Should reduces the Must-Have set from five to four and resolves the core scope contradiction.
- Current official documentation supports Vite deployment on Vercel, FastAPI deployment on Render, React Router declarative routing, Vitest for Vite, and pytest with FastAPI TestClient.

### Open questions

- The eventual AI provider and image-capable model remain unselected.
- Persistence and image retention remain open until privacy requirements are resolved.

### Next actions

- [x] Update `PROJECT.md`, `HANDOFF_PROMPT.md`, and `docs/TECHNICAL_DESIGN.md` with the decisions.
- [ ] Re-open the verified project root in Antigravity.
- [ ] Execute the revised Day 3 handoff.
## 2026-09-21 — Antigravity remediation brief

- The user requested a Markdown file that Antigravity can follow to correct every error and omission identified during the `PROJECT.md` acceptance-criteria review.
- Created `ANTIGRAVITY_REMEDIATION_PROMPT.md` as an implementation-ready repair brief.
- The brief covers the frontend startup/build failures, route guards, deterministic hazard enforcement, intake validation, evidence source tracking, honest service-failure recovery, result taxonomy, technician-brief completeness, optional image evidence, accessibility, responsive browser checks, automated tests, final verification commands, and a required remediation work report.
- The brief instructs Antigravity to treat `PROJECT.md` as the primary source of truth, preserve the approved scope, avoid invented evidence and unsafe instructions, and not claim completion until all 34 acceptance criteria have Pass evidence.

## 2026-09-21 — Day 3 MVP validation

- The user requested a report-only comparison of the current MVP v0.1 against the Must-Have acceptance criteria in `PROJECT.md`.
- Audited fresh and already-running frontend instances, production build, lint, frontend tests, backend health, backend tests, route access, hazards, validation, failure recovery, and responsive widths without editing application source.
- Created `VALIDATION_DAY3.md` with feature and criterion status matrices, evidence, reproducible issues, a provisional QA health score, and prioritized Day 4 action items.
- Final audit state: Home rendered, but the primary CTA and protected routes crashed because assessment context consumers were outside the required provider; frontend build and frontend test failed; backend tests reported 39 passed and 6 failed.
- The workspace changed during the audit, so the report records the final cold-start state as authoritative and recommends rerunning from one stable revision.

## 2026-09-21 — Remediation V2 control plan

- Reviewed `WORK_REPORT_REMEDIATION.md` against automated checks and a real browser flow.
- Verified frontend lint/build/test and all 45 backend tests pass, but the complete flow still fails at assessment generation because the frontend flattens the JSON body while the backend requires a top-level `evidence` object.
- Confirmed the technician brief is not yet reachable through the primary browser flow and the current frontend test does not cover the API contract.
- Observed that simple keyword scanning treats clear negative phrases such as “no smoke” as affirmative hazards.
- Created `REMEDIATION_ROADMAP.md` to define the ordered repair and validation gates.
- Created `ANTIGRAVITY_REMEDIATION_PROMPT_V2.md` as the active implementation prompt; the original remediation prompt remains historical.
- Created `REVALIDATION_CHECKLIST.md` for the independent post-remediation audit.
- Defined the next evidence files: Antigravity must produce `WORK_REPORT_REMEDIATION_V2.md`, after which Codex will produce `VALIDATION_REMEDIATION_V2.md`.
