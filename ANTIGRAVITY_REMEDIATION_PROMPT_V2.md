# Antigravity Remediation Prompt V2

Copy everything under **Implementation prompt** into Antigravity from the project root.

---

## Implementation prompt

You are performing the second remediation pass for the SolarResolve MVP.

This is a focused repair-and-verification task. Do not redesign the product, expand scope, or repeat already completed scaffold work.

### 1. Read these documents before editing

Read them completely in this order:

1. `PROJECT.md` — product scope and acceptance criteria; highest authority.
2. `REMEDIATION_ROADMAP.md` — required implementation order and pass gates.
3. `REVALIDATION_CHECKLIST.md` — evidence the independent audit will require.
4. `docs/SAFETY_POLICY.md` — deterministic safety and prohibited-action rules.
5. `CORE_FLOW.md` — flow state and logical data contracts.
6. `SCENARIOS.md` — happy, empty-input, and failure-recovery behavior.
7. `docs/API.md` — intended service boundaries.
8. `WORK_REPORT_REMEDIATION.md` — prior implementation claims; treat them as history, not proof.
9. `VALIDATION_DAY3.md` — pre-remediation audit history.

When documents conflict, follow `PROJECT.md`, then `docs/SAFETY_POLICY.md`, then `REMEDIATION_ROADMAP.md`. Record any unresolved conflict instead of inventing behavior.

Do not edit historical audit artifacts:

- `ANTIGRAVITY_REMEDIATION_PROMPT.md`
- `VALIDATION_DAY3.md`
- `WORK_REPORT_REMEDIATION.md`

Do not modify the unrelated root static pages:

- `index.html`
- `launch.html`
- `portfolio.html`

### 2. Verified current state

The following checks already pass and must remain passing:

- `npm run lint`
- `npm run build`
- the current frontend test
- 45 backend pytest cases
- Home, Safety, Intake, Image Evidence, and Clarification rendering
- protected-route redirect behavior
- selected-hazard escalation message

The primary release blocker is independently reproduced:

```text
Assessment service error (422):
body.evidence — Field required
```

The frontend currently flattens evidence fields into the top level of the JSON request, while the FastAPI inline endpoint expects a top-level `evidence` object plus optional `clarifications` and `image_observations`.

The current single frontend test proves only Home → Safety navigation. Passing frontend and backend suites independently does not prove their shared HTTP contract.

The current backend negative-runtime test also sends a differently shaped payload from the successful assessment tests. A 422 can therefore pass for a missing `evidence` wrapper rather than for the intended negative-value validation. Correct the test so it proves the intended failure reason.

A second issue is also independently reproduced: clear negative text such as “There is no smoke or exposed wiring” is treated as an affirmative hazard by simple keyword matching.

### 3. Required implementation order

Follow this order. Do not move forward while the current phase gate fails.

#### Phase A — Stabilize the local environment

1. Stop stale frontend and backend processes.
2. Start one clean frontend and one clean backend from the current workspace.
3. Confirm the browser and tests use that backend.
4. Record exact commands and ports in the final work report.

#### Phase B — Fix the assessment API contract

1. Make the frontend send this shape to `/api/v1/assessments/inline/generate`:

   ```json
   {
     "evidence": {
       "original_description": "..."
     },
     "clarifications": [],
     "image_observations": []
   }
   ```

2. Do not flatten evidence into the body root.
3. Keep API names consistent with the backend Pydantic schema.
4. Preserve explicit `null`/unknown values. Do not invent system facts.
5. Add a frontend test that mocks `fetch`, generates an assessment, and asserts the exact JSON body shape.
6. Add or correct backend endpoint tests for both valid and invalid wrapped requests.
7. Correct the negative-runtime test so it sends `{"evidence": evidence}` and proves the negative field caused the 422, preferably by checking the validation-error location/message.
8. Add a contract regression test that would fail if the frontend payload becomes flattened again.

Phase B is complete only when a real browser flow receives a valid assessment instead of HTTP 422.

#### Phase C — Complete and verify the core Must-Have loop

1. Run the complete text-only flow:

   ```text
   Home → Safety → Intake → Continue Without Image → Clarification → Assessment → Technician Brief
   ```

2. Verify the assessment displays every section required by `PROJECT.md`.
3. Verify facts retain their source labels.
4. Verify cause confidence uses only the approved labels.
5. Verify insufficient evidence produces `more_information_needed` rather than a forced ranking.
6. Verify **Copy Brief** copies the complete plain-text brief and provides accessible success/failure feedback.
7. Verify **Start New Assessment** clears old state.
8. Add frontend tests for successful generation, recoverable generation failure, assessment rendering, technician-brief copying, and new-assessment reset.

Do not report the technician brief as complete merely because rendering code exists. It must be reached and exercised through the real user flow.

#### Phase D — Harden safety behavior

1. Preserve deterministic hazard enforcement in frontend and backend code.
2. Test every initial hazard and the none-observed path.
3. Test late hazards in descriptions, manual readings, confirmed image observations, and clarification answers.
4. Add tests for:
   - affirmative hazard: “I saw smoke coming from the battery”;
   - clear negative statement: “There is no smoke or exposed wiring”;
   - ambiguous statement: “I may have noticed a burning smell.”
5. Clear negative statements must not be silently treated as affirmative hazards. Ambiguous safety language must not silently pass as safe; use a conservative confirmation or escalation path consistent with `docs/SAFETY_POLICY.md`.
6. Keep urgent output free of cause rankings and unsafe repair guidance.
7. Keep frontend/backend hazard terms and behavior synchronized through tests rather than comments alone.

#### Phase E — Validate inputs and recovery

1. Verify field-specific rejection for empty descriptions and negative runtime values.
2. Associate validation messages with their fields and focus the first invalid field.
3. Preserve all input after validation errors, request errors, and retry.
4. Verify unknown technical fields remain valid.
5. Prevent accidental duplicate generation requests while processing.
6. Test timeout, network error, 4xx, 5xx, malformed success payload, Retry, and Edit Evidence.
7. Never present a partial response or fallback mock as a successful assessment.

#### Phase F — Verify optional image evidence

Do this only after every Must-Have phase above passes.

1. Preserve the text-only path.
2. Test file type and size validation.
3. Test the supported synthetic fixture.
4. Verify clear, uncertain, and unreadable labels.
5. Require confirmation, correction, or rejection for each extracted observation.
6. Ensure only confirmed/corrected observations become known facts.
7. Test replace image, manual entry, and continue-without-image recovery.
8. Verify image text cannot override system or safety rules.

#### Phase G — Accessibility and responsiveness

1. Complete the full flow using only the keyboard.
2. Verify visible focus, logical order, semantic headings, labels, alerts, and field errors.
3. Verify 200% zoom.
4. Verify widths 320, 390, 768, 1024, 1280, and 1440 px.
5. Confirm no horizontal overflow and no clipped or unreachable primary action.
6. Add automated checks where practical, but do not replace browser verification with unit tests.

### 4. Required verification commands

Run these from the documented directories and include complete results in the work report:

```powershell
cd frontend
npm run lint
npm exec -- vitest run --reporter=verbose
npm run build

cd ..
backend\venv\Scripts\python.exe -m pytest -q
```

Then start clean local services and verify the browser scenarios listed in `REVALIDATION_CHECKLIST.md`.

### 5. Non-negotiable constraints

- Keep the four Must-Have features in `PROJECT.md` unchanged.
- Implement Must-Have correctness before Should-Have polish.
- Do not add authentication, accounts, persistent history, payments, subscriptions, technician marketplace behavior, appointment booking, monitoring, notifications, or other Out-of-Scope features.
- Do not integrate a live AI provider during this repair pass.
- Do not invent evidence, equipment facts, diagnoses, or arbitrary requirements.
- Do not weaken safety checks to make tests pass.
- Do not expose secrets in frontend or committed files.
- Do not report completion while a build, test, browser flow, safety check, accessibility check, responsive check, or Must-Have acceptance criterion is failing.

### 6. Required work report

Create `WORK_REPORT_REMEDIATION_V2.md` containing:

1. Exact modified files and the reason for each change.
2. Root cause of every repaired issue.
3. Exact frontend request shape after the contract fix.
4. Commands used to start frontend and backend, including ports.
5. Full lint, build, frontend-test, and backend-test totals.
6. Browser evidence for every required scenario.
7. A criterion-by-criterion matrix for all Must-Have acceptance criteria in `PROJECT.md`.
8. Separate evidence for technician-brief rendering and copy behavior.
9. Separate evidence for the optional image path.
10. Accessibility and viewport results.
11. Remaining limitations and open questions.
12. An explicit statement that the report is implementation evidence and still requires independent revalidation.

Do not use a checked box without supporting evidence. If anything remains failing, mark the report **Incomplete**, list the exact failure, and stop rather than claiming all phases complete.

### 7. Definition of Done

This remediation pass is complete only when:

- the complete text-only browser flow reaches a finished assessment;
- the technician brief is visible and copyable;
- the request contract is protected by regression tests;
- every Must-Have acceptance criterion has evidence;
- all automated commands pass;
- required safety scenarios pass;
- required mobile and desktop viewports pass;
- no uncaught browser-console error occurs in the tested flow; and
- `WORK_REPORT_REMEDIATION_V2.md` has been created with reproducible evidence.

Stop after creating the work report. Do not deploy. Codex will perform the independent revalidation next.

