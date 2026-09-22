# Remediation Report: SolarResolve MVP

## 1. Goal
The objective of this remediation was to stabilize the SolarResolve MVP (Day 3) by replacing brittle, non-deterministic prompts with strict, deterministic code. This ensures user safety, proper context flow, accurate hazard escalation, and a reliable foundation before integrating a live AI provider. 

## 2. Phase 1-10 Completion Status
- [x] **Phase 1: Build & Scaffold** - Re-established working Vite build (fixing TS interface imports) and FastAPI backend endpoints.
- [x] **Phase 2: Client Context & Guards** - Implemented a strict finite state machine in React Context with URL route guards.
- [x] **Phase 3: Shared Hazard Policy** - Centralized deterministic safety keyword scanning in both frontend and backend.
- [x] **Phase 4: Guided Evidence Intake** - Rebuilt the dynamic intake form with explicit UI fields matching the backend schema.
- [x] **Phase 5: Clarification State** - Created a distinct route for user follow-up questions from the API.
- [x] **Phase 6: Remove Fake-Success Fallbacks** - Removed static mocks; the app now properly handles 422s and API failures.
- [x] **Phase 7: Results Contract** - Visualized the result schema, strictly distinguishing confirmed facts from missing information.
- [x] **Phase 8: Technician Brief** - Generated a clean, formatted text summary available via the Clipboard API.
- [x] **Phase 9: Image Evidence (Optional)** - Added a fully functional image review screen utilizing a synthetic demo fixture.
- [x] **Phase 10: Accessibility & Responsiveness** - Verified keyboard accessibility (tab/focus rings), semantic HTML, and responsive form styles across breakpoints.

## 3. Hazard Policy
Hazard detection is now purely deterministic and centralized. The `hazard_policy.py` and `hazardPolicy.ts` files maintain a synchronized dictionary of terms (e.g., "smoke", "swelling", "sparking"). Any text input is scanned against these compiled regex patterns. 
- In the frontend, detection instantly triggers a hard stop with the standardized `ESCALATION_MESSAGE`.
- In the backend, the text is scanned before processing, guaranteeing that dangerous states result in a 422 Unprocessable Entity or an immediate `urgent_safety_escalation` status, bypassing all other logic.
- Prohibited action verbs (e.g., "unscrew", "disconnect") are also filtered out to prevent unsafe recommendations.

## 4. Testing Summary
- **Backend**: 45/45 pytest cases passed (100% success). This includes comprehensive tests for schema validation, hazard escalation, approved cause labels, and section completeness.
- **Frontend**: 1/1 vitest suites passed. The React test correctly renders the app, verifies the scope limitations, and ensures the routing guard transitions successfully upon CTA click. Build completes with 0 TypeScript and 0 ESLint errors.

## 5. Known Limitations
- **Synthetic Image Fixture**: The image upload endpoint (`/api/v1/assessments/upload-image`) currently ignores the actual image content and returns a hardcoded list of synthetic observations (Clear, Uncertain, Unreadable) to demonstrate the flow.
- **No Live AI Integration**: The assessment generation is driven by deterministic rule-based logic to mock an LLM response.
- **Ephemeral State**: There is no database layer. Refreshing the browser mid-flow drops the context state and routes the user back to the home screen.
