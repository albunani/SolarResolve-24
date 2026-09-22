# Technical Design

## 1. Introduction
This document outlines the technical architecture, technology stack, data flow, and deployment strategy for the SolarResolve MVP.

## 2. Technology Stack

The base stack was reconfirmed on 2026-09-21.

- **Backend:** Python 3.12+ with FastAPI
  - Chosen for its excellent support for asynchronous operations, type hints (Pydantic), and strong ecosystem for AI integration.
- **Frontend:** React with TypeScript (via Vite)
  - Provides robust state management for the multi-step intake form and structured assessment presentation.
- **Routing:** React Router, Declarative mode, using browser-history URLs
  - Selected for the five-screen web flow. Do not use hash routing, TanStack Router, or a custom state-only router.
- **Frontend Testing:** Vitest, React Testing Library, `@testing-library/user-event`, `@testing-library/jest-dom`, and jsdom
  - Selected for Vite-native component tests that verify rendered behavior through accessible user interactions.
- **Backend Testing:** pytest with FastAPI `TestClient` and HTTPX
  - Selected for synchronous route-level tests during the foundation phase.
- **Styling:** Plain component CSS with shared CSS custom properties
  - Apply an accessible dark cyan/blue foundation from Day 3. Defer glass effects and nonessential animation until the core flow works.
- **AI Provider:** Not selected for Day 3
  - The Must-Have text assessment and Should-Have image extraction must remain behind an adapter. Do not add a provider SDK or API key until the AI phase is approved.
- **Storage:** No persistent database for Day 3
  - Preserve only the state required for the current frontend session. Longer retention, image handling, and recovery after refresh remain open privacy and architecture decisions.

## 3. System Architecture & Boundaries

The system is separated into the following layers:
- **UI (Frontend):** React components for guided intake, evidence review, and assessment display.
- **API (Backend):** FastAPI HTTP routes handling client requests and validating payloads.
- **Service Layer:** Orchestrates the assessment process (calling AI, applying safety rules, generating the technician brief).
- **AI Layer:** Adapter for the AI provider (currently implemented as a deterministic synthetic demo adapter for Day 3/MVP). Uses structured outputs (JSON schema) to ensure consistent AI responses when a live model is integrated.
- **Safety Layer:** Deterministic rules to check for urgent hazards (S-02) and filter prohibited actions (S-01) before and after AI processing.
- **Domain Layer:** Data models representing the case, evidence, and assessment categories.

## 4. Data Flow
1. **Intake:** User submits hazard screening, problem description, and optional image.
2. **Safety Check:** Backend validates against urgent hazards. If flagged, returns an immediate escalation response and halts further processing.
3. **Clarification:** The service identifies missing evidence and provides the smallest useful question set.
4. **User Review:** Frontend displays reported facts and questions. If the Should-Have image feature exists, image observations require user confirmation.
5. **Final Assessment:** Backend sends confirmed evidence to the AI layer to generate plausible causes.
6. **Safety Filtering:** The Safety Layer reviews the AI output to ensure no prohibited actions are recommended.
7. **Technician Brief:** The Service Layer compiles the final assessment and brief, returning it to the Frontend.

## 5. AI Integration & Schemas

AI integration is deferred until after the Day 3 foundation. The application will enforce structured, validated outputs when a provider is selected.

- **Text Assessment:** Must-Have, behind a provider adapter
- **Image Extraction:** Should-Have, not required for the text-first loop
- **Formal Schemas:** Derive from `CORE_FLOW.md`; do not use the earlier abbreviated example fields as the production contract

## 6. Safety Policy Implementation
Safety rules (e.g., "Do not open equipment enclosures") will be implemented through:
1. **Deterministic Input Filtering:** Hardcoded hazard checks in the API layer.
2. **Prompt Constraints:** System instructions explicitly forbidding dangerous advice.
3. **Output Validation:** Post-generation heuristic checks (e.g., regex matching forbidden terms like "open", "unscrew", "bypass").

## 7. Deployment Strategy
- **Frontend:** Vercel is the preferred target for the Vite frontend.
- **Backend:** Render is the preferred target for the FastAPI service.
- **Day 3 boundary:** Do not add deployment credentials, production services, or Docker configuration. Keep the scaffold compatible with ordinary Vite builds and a standard Uvicorn start command.
- **CI/CD:** GitHub Actions for running tests and automated deployments.

## 8. Staged Implementation Plan
1. **Phase 1: Foundation:** Scaffold FastAPI backend and React frontend. Set up Pydantic domain models.
2. **Phase 2: Intake & Safety:** Build UI intake flow and deterministic hazard screening in the backend.
3. **Phase 3: Text AI Integration:** Select a provider, implement the provider adapter, and deliver the structured assessment.
4. **Phase 4: Technician Brief & Polish:** Implement brief generation, accessible visual polish, and error handling.
5. **Phase 5: Optional Image Evidence:** Add multimodal extraction and confirmation only if the text-first loop is complete and the Should-Have feature remains justified.
6. **Phase 6: Evaluation:** Run the evaluation plan from `requirement.md` using synthetic cases.
