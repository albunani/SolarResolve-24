# SolarResolve Remediation Roadmap

## Purpose

This document defines the order for taking SolarResolve MVP v0.1 from its current partially working state to a verified release candidate.

The goal is not to claim that software can never contain a defect. The completion standard is:

> **Zero known release blockers, zero failed Must-Have acceptance criteria, and reproducible evidence that the complete MVP flow works.**

`PROJECT.md` remains the product source of truth. This roadmap controls repair order and verification, not product scope.

## Documents in the repair cycle

| File | Owner | Purpose | When used |
| --- | --- | --- | --- |
| `PROJECT.md` | Project owner | Product scope and acceptance criteria | Always; highest authority |
| `REMEDIATION_ROADMAP.md` | Codex | Ordered repair plan and phase gates | Before and during remediation |
| `ANTIGRAVITY_REMEDIATION_PROMPT_V2.md` | Codex | Exact implementation instructions for Antigravity | Give to Antigravity now |
| `REVALIDATION_CHECKLIST.md` | Codex | Independent verification procedure | After Antigravity finishes |
| `WORK_REPORT_REMEDIATION_V2.md` | Antigravity | What Antigravity changed and its evidence | Antigravity creates this after implementation |
| `VALIDATION_REMEDIATION_V2.md` | Codex | Independent Pass/Fail audit against `PROJECT.md` | Codex creates this after Antigravity's report |

Historical files such as `ANTIGRAVITY_REMEDIATION_PROMPT.md`, `WORK_REPORT_REMEDIATION.md`, and `VALIDATION_DAY3.md` must remain unchanged as audit history. They are no longer the active instructions or current validation state.

## Current verified baseline

The following was independently verified after `WORK_REPORT_REMEDIATION.md` was generated:

- Frontend lint passes.
- Frontend production build passes.
- The single frontend test passes.
- All 45 backend tests pass, with one dependency deprecation warning.
- Home, Safety, Intake, Image Evidence, and Clarification screens render.
- Direct access to a protected route redirects safely.
- A selected hazard produces the required urgent warning.
- The normal flow fails when generating an assessment with HTTP 422 because the request body is missing the backend's required top-level `evidence` field.
- The assessment screen and technician brief are therefore not reachable through the complete browser journey.
- The single frontend test does not cover the API request contract or the complete user flow.
- Simple keyword scanning treats clear negative phrases such as “no smoke” as an affirmative hazard.

## Execution rule

Work through the phases in order. Do not begin a later phase while an earlier phase gate is failing.

```text
Stabilize revision
      ↓
Repair API contract
      ↓
Complete assessment and brief
      ↓
Harden safety behavior
      ↓
Harden validation and recovery
      ↓
Verify optional image flow
      ↓
Verify accessibility and responsiveness
      ↓
Run full quality gate
      ↓
Independent revalidation
```

## Phase 0 — Establish a stable test baseline

### Actions

1. Pause concurrent code edits.
2. Stop stale frontend and backend processes.
3. Start one frontend process and one backend process from the current workspace.
4. Record the exact run commands, ports, and current revision in `WORK_REPORT_REMEDIATION_V2.md`.
5. Confirm the frontend is connected to the freshly started backend rather than an older process.

### Pass gate

- The Home screen opens without a blank page or console exception.
- `GET /api/v1/health` returns HTTP 200 from the same backend used by the browser flow.
- There is only one authoritative frontend/backend pair used for remediation verification.

## Phase 1 — Repair the frontend/backend assessment contract

### Priority

**P0 release blocker. Implement first.**

### Actions

1. Make the frontend assessment request match the FastAPI endpoint contract exactly.
2. The inline endpoint must receive a body shaped like:

   ```json
   {
     "evidence": {},
     "clarifications": [],
     "image_observations": []
   }
   ```

3. Preserve schema names and null/unknown behavior defined in `PROJECT.md` and `CORE_FLOW.md`.
4. Correct backend tests whose malformed wrapper can produce a passing 422 for the wrong reason.
5. Add frontend tests that inspect the actual request body sent to the assessment endpoint.
6. Add at least one integration test proving a valid frontend-shaped payload receives a valid `AssessmentResult`.

### Pass gate

- The normal browser flow no longer returns `422 Field required: evidence`.
- Contract tests fail if `evidence` is flattened or omitted.
- Negative-runtime tests prove rejection is caused by the negative value, not by a missing wrapper.
- Lint, frontend tests, backend tests, and production build all pass.

## Phase 2 — Prove the complete Must-Have user loop

### Priority

**P0 release blocker.**

### Actions

1. Complete Home → Safety → Intake → optional Image → Clarification → Assessment.
2. Verify every required result section from `PROJECT.md` is displayed.
3. Verify source labels distinguish user facts, confirmed image facts, and deterministic calculations.
4. Verify cause labels use only the approved taxonomy.
5. Verify the technician brief contains every required field.
6. Verify **Copy Brief** copies readable plain text and provides visible success or error feedback.
7. Verify **Start New Assessment** clears prior state safely.

### Pass gate

- A synthetic text-only case reaches a completed assessment.
- A complete technician brief is visible and copyable.
- No partial or failed response is presented as success.
- Refresh/direct-route behavior follows the documented ephemeral-state rule.

## Phase 3 — Harden safety behavior

### Priority

**P0 because the product involves electrical equipment.**

### Actions

1. Retest every hazard flag and the no-hazard path.
2. Retest late hazards in the problem description, manual reading, image observation, and clarification answer paths.
3. Keep hazard enforcement deterministic and outside free-form generated output.
4. Add explicit tests for affirmative, negative, and ambiguous phrases:
   - affirmative example: “I saw smoke coming from the battery”;
   - clear negative example: “There is no smoke or exposed wiring”;
   - ambiguous example: “I may have noticed a burning smell.”
5. Clear negative statements must not be silently treated as affirmative hazards. Ambiguous safety statements should take the conservative path or request explicit confirmation.
6. Verify urgent results never include ordinary cause rankings or prohibited repair actions.

### Pass gate

- Every defined hazard escalates.
- Clear negative statements follow the documented safe behavior.
- Ambiguous statements cannot bypass safety review.
- Frontend and backend hazard-policy tests remain synchronized.

## Phase 4 — Complete validation and failure recovery

### Priority

**P1.**

### Actions

1. Reject empty descriptions and negative runtime values with field-specific messages.
2. Associate each error with its field and move focus to the first invalid field.
3. Preserve all entered evidence after validation errors, backend errors, and retry.
4. Verify unknown technical details are accepted without fabricated defaults.
5. Verify duplicate submission protection and loading state behavior.
6. Verify network, timeout, 4xx, 5xx, malformed-response, and retry paths.

### Pass gate

- Invalid input cannot advance.
- Recoverable failures preserve user work.
- Retry uses the preserved evidence and cannot create a false success.

## Phase 5 — Verify the Should-Have image flow

### Priority

**P1 after every Must-Have feature works.**

### Actions

1. Verify continue-without-image remains available.
2. Verify supported image type and size validation.
3. Verify the synthetic fixture returns clear, uncertain, and unreadable observations.
4. Require confirmation, correction, or rejection before an image observation becomes a known fact.
5. Verify extraction failure permits replacement, manual entry, or continuing without an image.
6. Verify text inside an image cannot override application or safety rules.

### Pass gate

- Text-only completion still works.
- Only confirmed or corrected image observations enter the result.
- Uncertain/unreadable observations are never silently promoted to fact.

## Phase 6 — Accessibility and responsive verification

### Priority

**P1.**

### Actions

1. Complete the full flow using only a keyboard.
2. Verify visible focus, logical focus order, semantic headings, input labels, alert announcements, and error associations.
3. Verify 200% zoom.
4. Verify widths 320, 390, 768, 1024, 1280, and 1440 px.
5. Confirm there is no horizontal overflow and primary actions remain usable.

### Pass gate

- All Must-Have screens and actions are keyboard operable.
- No required viewport has horizontal scrolling or clipped controls.
- No known WCAG AA contrast or form-labelling failure remains.

## Phase 7 — Final implementation quality gate

### Required automated checks

```powershell
cd frontend
npm run lint
npm exec -- vitest run --reporter=verbose
npm run build

cd ..
backend\venv\Scripts\python.exe -m pytest -q
```

### Required browser checks

- Complete text-only happy path.
- Every initial hazard.
- Late hazard.
- Empty and negative input.
- Backend unavailable and retry.
- Direct protected routes.
- Technician-brief copy.
- Optional image path.
- Mobile and desktop completion.
- Browser console contains no uncaught application errors.

### Pass gate

- Every command exits successfully.
- Every required browser scenario passes.
- `WORK_REPORT_REMEDIATION_V2.md` contains exact evidence, not only checked boxes.

## Phase 8 — Independent revalidation

Antigravity must stop editing before this phase.

Codex will:

1. Follow `REVALIDATION_CHECKLIST.md` from a clean process state.
2. Compare every Must-Have acceptance criterion in `PROJECT.md` against the implementation.
3. Generate `VALIDATION_REMEDIATION_V2.md` with Pass, Fail, Manual Check, or Not Implemented statuses.
4. Treat Antigravity's work report as a claim to verify, not proof.

### Outcome rules

- If every Must-Have criterion passes and no release blocker remains, mark the MVP **Green for the next milestone**.
- If any criterion fails, create a narrowly scoped `ANTIGRAVITY_REMEDIATION_PROMPT_V3.md` containing only the remaining defects, then repeat the repair → report → independent validation loop.
- Do not expand into deployment, live AI, authentication, persistence, payments, or other Out-of-Scope work until this MVP gate is green.

## What happens after the MVP is green

Only after Phase 8 passes:

1. Update technical and API documentation to match the verified implementation.
2. Prepare deployment configuration for Vercel and Render.
3. Deploy to a public test environment.
4. Run production smoke, safety, responsive, and accessibility checks.
5. Prepare the synthetic demo script and submission materials.

