# my-project

## Project objective

> **Foundational Web Service Development using AI Coding Tools**

`my-project` is the central workspace for designing, building, testing, and documenting an AI-assisted web service. Its initial product is a solar decision-support MVP for Nigerian solar owners, currently using **SolarResolve** as a working name.

The service will help a user describe declining solar-battery performance, submit relevant evidence, receive a carefully limited AI-supported assessment, and create a structured brief for a qualified technician.

## Foundational role of this workspace

This repository is the project's single source of truth. It brings together:

- product intent and scope;
- functional, safety, privacy, and AI requirements;
- application and service code;
- prompts, schemas, and deterministic guardrails;
- automated tests and evaluation cases;
- deployment configuration;
- technical and user documentation; and
- a chronological record of important decisions.

The first development phase should establish a dependable web-service foundation before expanding product scope. That foundation includes clear module boundaries, validated inputs and outputs, safe AI integration, testable behavior, secure configuration, useful error handling, and repeatable local and production environments.

## Product direction

The core product transformation is:

> **Solar uncertainty → structured evidence → informed action**

The first MVP focuses on one scenario:

> A solar owner's battery previously lasted through the night but now runs down much earlier.

The user provides a description, basic system information, appliance usage, and—when available—a photograph of an inverter or battery display. The service organizes the evidence, asks targeted questions, explains plausible cause categories without claiming a definitive remote diagnosis, recommends only safe observations, and generates a technician-ready brief.

For complete product and MVP definitions, see:

- [Project concept](./PROJECT_CONCEPT.md)
- [MVP requirements](./requirement.md)
- [Conversation and decision history](./CONVERSATION_HISTORY.md)

## Development principles

### 1. Build a narrow, complete journey

The initial release prioritizes one polished battery-runtime assessment flow over incomplete support for many fault types.

### 2. Keep AI outputs grounded

Case-specific output must be based on confirmed user input, confirmed image observations, approved domain guidance, and explicit safety rules. The system must clearly separate facts from possibilities.

### 3. Treat safety as application logic

Electrical hazard screening, prohibited procedures, professional escalation, and honest uncertainty are functional requirements—not merely disclaimers added to generated text.

### 4. Protect user information

The service should collect the minimum necessary data, disclose retention behavior, protect credentials, and avoid unnecessary storage of uploaded images.

### 5. Keep behavior testable

Prompts, response schemas, validation rules, and safety policies should be versioned and evaluated against normal, ambiguous, unsafe, and adversarial cases.

### 6. Use AI coding tools with human oversight

AI coding tools may help generate, explain, refactor, test, and document code. Their output must still be reviewed, tested, and checked against the approved project requirements before acceptance.

## Planned folder hierarchy

The exact framework is not yet selected. The following structure defines the intended separation of responsibilities and may be adjusted in the technical design.

```text
my-project/
├── README.md                    # Project entry point and workspace guide
├── PROJECT_CONCEPT.md           # Product thesis, users, scope, and vision
├── requirement.md               # MVP functional and non-functional requirements
├── CONVERSATION_HISTORY.md      # Chronological decisions and project history
├── .env.example                 # Documented environment variables; no secrets
├── .gitignore                   # Files excluded from version control
├── docs/
│   ├── TECHNICAL_DESIGN.md      # Architecture, data flow, and design decisions
│   ├── SAFETY_POLICY.md         # Hazard rules, refusals, and escalation behavior
│   ├── PRIVACY.md               # Data collection, processing, and retention
│   └── API.md                   # Web-service interface documentation
├── src/
│   ├── app/                     # Application setup and service entry point
│   ├── api/                     # HTTP routes, request parsing, and responses
│   ├── domain/                  # Solar assessment rules and core business logic
│   ├── ai/                      # Model client, prompts, schemas, and grounding
│   ├── safety/                  # Deterministic hazard and output guardrails
│   ├── services/                # Assessment and technician-brief orchestration
│   ├── storage/                 # Case and upload persistence abstractions
│   ├── ui/                      # Web interface components when kept in one app
│   └── config/                  # Typed configuration and environment handling
├── tests/
│   ├── unit/                    # Isolated business-logic tests
│   ├── integration/             # API, AI-adapter, and storage integration tests
│   ├── safety/                  # Hazard, refusal, and escalation tests
│   ├── evaluation/              # AI quality and consistency test cases
│   └── fixtures/                # Synthetic inputs, images, and expected outputs
├── public/                      # Static public assets
├── scripts/                     # Development, evaluation, and maintenance tasks
└── deployment/                  # Hosting and deployment configuration
```

Only the root documentation files currently exist. Implementation folders should be introduced when the technology stack and architecture are approved; empty directories do not need to be created in advance.

## Intended service boundaries

The finished foundation should keep these concerns separate:

| Area | Responsibility |
| --- | --- |
| Web interface | Guide the user through intake, evidence review, and results |
| API layer | Validate requests and provide stable service responses |
| Domain layer | Represent cases, evidence, assessment categories, and actions |
| AI layer | Interpret text and images and produce schema-constrained output |
| Safety layer | Apply deterministic hazard rules and prevent unsafe guidance |
| Service layer | Coordinate intake, assessment, and technician-brief generation |
| Storage layer | Control optional persistence and data-retention behavior |
| Test/evaluation layer | Verify software correctness, AI quality, and safety behavior |

## Expected MVP capabilities

- Guided declining-battery-runtime intake
- Urgent electrical-hazard screening
- Plain-language problem descriptions
- Optional inverter or battery-display image upload
- AI-assisted extraction with user confirmation
- Targeted follow-up questions
- Structured evidence review
- Plausible cause categories with explicit uncertainty
- Safe observations and prohibited-action guidance
- Recommended next action
- Copyable or downloadable technician brief
- Synthetic sample case for public demonstration
- Mobile-responsive public deployment

## AI-assisted development workflow

AI coding tools should be used as accelerators within a controlled workflow:

1. Start from an approved requirement or technical-design item.
2. Ask the tool for a small, reviewable change.
3. Inspect generated code for correctness, security, and scope.
4. Run formatting, static analysis, and relevant automated tests.
5. Test safety-critical and AI behavior with adversarial cases.
6. Record material architecture or product decisions.
7. Commit only code that can be explained and maintained.

AI-generated code must not introduce secrets, silently expand scope, weaken safety rules, or replace validation with unstructured model judgment.

## Current project status

- [x] Challenge requirements captured
- [x] Product concept defined
- [x] Primary MVP scenario selected
- [x] MVP requirements documented
- [x] Workspace role and planned hierarchy defined
- [x] Technical architecture selected
- [x] AI and API schemas designed
- [x] Safety policy formalized
- [x] Application scaffold created
- [ ] MVP implemented and tested
- [ ] Public deployment completed
- [ ] Demo and submission materials prepared

## Active remediation workflow

The current milestone is to make the complete MVP user loop pass independently verified acceptance testing before deployment or scope expansion.

Use these documents in order:

1. [Remediation roadmap](./REMEDIATION_ROADMAP.md) — repair order, phase gates, and ownership.
2. [Antigravity remediation prompt V2](./ANTIGRAVITY_REMEDIATION_PROMPT_V2.md) — active implementation instructions.
3. `WORK_REPORT_REMEDIATION_V2.md` — Antigravity creates this after completing the prompt.
4. [Independent revalidation checklist](./REVALIDATION_CHECKLIST.md) — Codex uses this to audit the result.
5. `VALIDATION_REMEDIATION_V2.md` — Codex creates this after the independent audit.

Do not begin deployment, live-AI integration, or other scope expansion until the independent validation marks every Must-Have criterion as Pass.

## Working agreements

- Keep secrets out of the repository.
- Use synthetic or deliberately anonymized data in demonstrations and tests.
- Update requirements before implementing meaningful scope changes.
- Record major decisions in `CONVERSATION_HISTORY.md`.
- Prefer small, testable changes over large generated code dumps.
- Do not merge or deploy behavior that cannot be explained or verified.
