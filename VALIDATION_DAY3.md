# SolarResolve MVP v0.1 — Day 3 Validation

## Audit metadata

| Field | Value |
| --- | --- |
| Requirements baseline | `PROJECT.md`, version 1.0, dated 2026-09-21 |
| Implementation audited | Current local MVP v0.1 in `frontend/` and `backend/` |
| Audit date | 2026-09-21 |
| Audit mode | Report-only; application source was not edited |
| Frontend URLs | `http://127.0.0.1:5173/` and fresh server `http://127.0.0.1:5174/` |
| Backend URL | `http://127.0.0.1:8000/` |
| Framework | React + TypeScript + Vite frontend; FastAPI backend |
| Overall verdict | **Fail — Day 3 foundation is not yet a runnable complete MVP** |
| Provisional QA health score | **52/100** |

## Important audit boundary

The workspace changed while the audit was running. New context, route-guard, safety, backend-assessment, and test files appeared between the first and final checks. This report therefore gives priority to the final cold-start verification, final build output, and final test runs. Earlier browser observations are labelled when they came from the already-running `:5173` instance before the latest edits were fully loaded.

Day 4 should begin by pausing concurrent edits, restarting both services from a clean process, and rerunning this validation from one stable revision.

## Executive summary

The Home screen renders successfully on a fresh Vite server with no initial console errors. The primary user loop does not continue beyond Home. Selecting **Assess my battery-runtime problem** navigates to `/safety-check`, then renders a blank page with:

```text
Error: useAssessment must be used within AssessmentProvider
```

Direct entry to `/intake`, `/clarification`, and `/assessment` produces the same blank-page family of failures instead of redirecting to the earliest valid screen.

The production frontend build fails. The only frontend test also fails. The backend health endpoint works, and the expanded backend suite contains meaningful deterministic safety coverage, but six assessment-generation tests fail because requests receive `422 Unprocessable Entity` instead of valid assessment results.

As a result:

- Must-Have 1 is **Partial** at policy/test level but **Fail** end-to-end.
- Must-Have 2 is **Fail** end-to-end.
- Must-Have 3 is **Fail**.
- Must-Have 4 is **Not Demonstrable** because no completed assessment can be generated.

## Automated verification results

| Check | Result | Evidence |
| --- | --- | --- |
| Frontend lint | **Pass with warnings** | `npm run lint` exited successfully with four warnings: unused types/imports and a Fast Refresh export warning. |
| Frontend test suite | **Fail** | 0 passed, 1 failed. `App.test.tsx` fails after CTA navigation with `useAssessment must be used within AssessmentProvider`. |
| Frontend production build | **Fail** | TypeScript reports unused imports, unsafe type conversions, missing jest-dom matcher types, missing CSS module declarations, and missing `ImportMeta.env` typing. |
| Fresh frontend startup | **Partial** | Home renders on `:5174`; CTA and protected routes crash to blank pages. |
| Backend health endpoint | **Pass** | `GET /api/v1/health` returned HTTP 200 with `status: ok`, service name, version, and timestamp. |
| Backend test suite | **Fail** | 39 passed, 6 failed, 4 warnings. All six failures are assessment-generation contract/result tests. |
| Assessment API from running service | **Fail** | Browser flow received `404 Not Found` from the assessment service on the running `:8000` process. The final backend suite reaches the newer route but receives 422 for the test payload contract. |
| Required responsive widths | **Partial** | Earlier runnable UI showed no horizontal overflow at 320, 390, 768, 1024, 1280, or 1440 px for Home, Safety, Intake, and Clarification. The current cold-start flow crashes after Home, so full-flow responsiveness is unverified. |

## Must-Have feature status matrix

| Must-Have feature | Status | Acceptance coverage | Evidence | MVP impact |
| --- | --- | --- | --- | --- |
| 1. Hazard screening and safety escalation | **Partial / End-to-end Fail** | Initial hazard controls and deterministic policy tests exist; the current Safety screen crashes after Home. Late-hazard assessment test fails. | Earlier runnable instance escalated all seven hazards without cause rankings. Final frontend CTA crashes. Backend safety tests mostly pass, but `test_late_hazard_triggers_escalation` fails with HTTP 422. | Users cannot currently complete the required safety gate. |
| 2. Guided problem and evidence intake | **Fail** | Intake was visually present on the earlier instance, but the current route crashes. Earlier browser run accepted negative runtimes and hazardous text and advanced to Clarification. | Direct `/intake` now shows a blank page with the missing-provider error. Earlier run advanced with `-7`, `-3`, and “smoking and sparking.” | Unsafe or invalid evidence can enter the flow, and the current build cannot reach intake normally. |
| 3. Structured, safety-aware assessment | **Fail** | Assessment generation, insufficient-evidence behavior, approved labels, required result sections, and fact sources are failing backend tests. | Six backend assessment tests fail. The browser cannot produce a completed result. | The core decision-support output is unavailable. |
| 4. Technician-ready brief | **Not Demonstrable / Fail** | No completed result can be produced from the current cold-start app, so brief completeness and copy behavior cannot be verified. | Assessment API fails; direct `/assessment` crashes or redirects depending on the running instance. | The primary user loop cannot reach its promised handoff artifact. |

## Criterion-level status matrix

Status meanings:

- **Pass:** directly verified in the final audit state.
- **Partial:** some supporting behavior is verified, but the complete criterion is not.
- **Fail:** observed behavior contradicts the requirement.
- **Blocked:** the current application failure prevents verification.

### Must-Have 1 — Hazard screening and safety escalation

| Acceptance criterion | Status | Evidence |
| --- | --- | --- |
| Intake cannot be reached without completing the hazard screen | **Fail** | Earlier runnable instance allowed direct `/intake`. In the final state, direct `/intake` crashes rather than redirecting safely. |
| Every defined hazard prevents normal troubleshooting | **Partial** | Earlier runnable instance verified all seven options escalated. The final cold-start Safety screen is unreachable because the provider is missing. |
| Hazard selection returns urgent escalation with no cause ranking | **Partial** | Earlier instance displayed “Urgent Safety Hazard Detected” and no cause ranking for all seven hazards. Current end-to-end flow is broken. |
| Urgent result forbids touch, open, disconnect, probe, and repair | **Fail** | Earlier rendered warning said “Do not touch or operate” but did not explicitly cover open, disconnect, probe, and repair. Current screen cannot be rendered for recheck. |
| Hazard text entered later triggers urgent path | **Fail** | Earlier browser run accepted “smoking and sparking near exposed wiring” and advanced to Clarification. Final backend late-hazard test fails with HTTP 422. |
| Automated tests cover every hazard flag and safe path | **Partial** | Backend hazard-policy coverage is strong and passes. Frontend suite has one failing navigation test and no proven complete browser coverage. |

### Must-Have 2 — Guided problem and evidence intake

| Acceptance criterion | Status | Evidence |
| --- | --- | --- |
| Collect description, prior/current runtime, and change timing or explicit unknown | **Blocked** | Current intake crashes. Earlier UI showed the fields but did not prove explicit unknown handling for all required values. |
| Technical system details may be unknown | **Partial** | Earlier UI exposed an Unknown charging choice, but complete explicit unknown handling was not demonstrated. |
| At least one appliance/load observation can be added | **Partial** | Earlier UI had one combined “added loads or maintenance” field, not a demonstrated repeatable structured load observation. Current intake is unavailable. |
| A visible display reading can be entered manually | **Blocked** | Not present in the earlier rendered form; current form cannot be reached for final verification. |
| Empty descriptions and negative numbers get field-specific errors | **Fail** | Earlier UI accepted negative runtimes and advanced. Empty submission displayed icon-only errors, no readable field-specific text, and did not focus the first invalid field. |
| Input survives validation and recoverable processing failure | **Partial** | Earlier API 404 left the user on Clarification with reported facts visible. Full evidence persistence across the current flow is blocked. |
| Complete flow works by keyboard at 320 and 1280 px | **Blocked** | The full flow cannot complete because Safety crashes and assessment generation fails. |

### Must-Have 3 — Structured, safety-aware assessment

| Acceptance criterion | Status | Evidence |
| --- | --- | --- |
| Every result contains all required sections | **Fail** | Backend `test_result_contains_all_sections` fails because the request returns 422 without an assessment payload. |
| Known facts identify user, confirmed image, or deterministic source | **Fail** | Backend `test_facts_have_source` fails because no `known_facts` result is returned. |
| Cause categories use only the three approved labels | **Fail** | Backend `test_approved_cause_labels` fails with HTTP 422. |
| Result never declares a component defective remotely | **Pass at service-test level** | Backend `test_no_defective_declaration` passes. No completed browser result was available for an end-to-end content check. |
| Safe checks avoid every prohibited action | **Partial** | Deterministic prohibited-action unit tests pass, including open, disconnect, bypass, probe, and multimeter cases. No completed UI result was available. |
| Insufficient evidence returns More information needed | **Fail** | Backend `test_insufficient_evidence` receives HTTP 422 instead of a completed More information needed result. |
| Model/service failure is recoverable and never shown as finished output | **Partial** | Earlier browser run showed an inline 404 error and kept the user on Clarification rather than displaying a finished assessment. The current normal flow crashes before this state. |

### Must-Have 4 — Technician-ready brief

| Acceptance criterion | Status | Evidence |
| --- | --- | --- |
| Brief contains all required content | **Blocked** | No successful assessment/brief could be generated. |
| Confirmed facts and investigation areas are distinct | **Blocked** | No successful assessment/brief could be generated. |
| Possible causes do not become diagnoses | **Blocked** | Service-level non-defective wording test passes, but no brief was produced. |
| One clear action copies the complete brief | **Blocked** | Assessment screen is not reachable with a valid result. |
| Copied output is readable as plain text | **Blocked** | Clipboard workflow could not be exercised. |
| Synthetic demo produces a complete non-personal brief | **Fail** | The documented synthetic case reaches an assessment service error, not a complete brief. |

## Reproducible issues

### ISSUE-001 — Primary CTA produces a blank Safety screen

- **Severity:** Critical
- **Requirement affected:** Must-Have 1 and the entire primary loop
- **Evidence:** Fresh browser session on `:5174`; blank screenshot captured during audit; browser console reports missing `AssessmentProvider`.

Reproduction:

1. From `frontend/`, start a fresh server with `npm run dev -- --host 127.0.0.1`.
2. Open the printed local URL.
3. Confirm the Home screen renders.
4. Select **Assess my battery-runtime problem**.
5. Observe that the URL changes to `/safety-check` but the page is blank.
6. Open the console.

Actual result:

```text
Error: useAssessment must be used within AssessmentProvider
```

Expected result: the Safety Check screen renders with seven hazards, a none-observed option, and a Continue action.

### ISSUE-002 — Direct protected routes crash instead of redirecting

- **Severity:** Critical
- **Requirements affected:** hazard-first gating, recoverable navigation, route safety
- **Evidence:** Fresh `/intake`, `/clarification`, and `/assessment` navigation returned empty bodies and context-provider errors.

Reproduction:

1. Start a fresh frontend server.
2. Open `/intake` directly.
3. Repeat with `/clarification` and `/assessment`.

Actual result: blank page and `useAssessment must be used within AssessmentProvider` errors.

Expected result: redirect to the earliest incomplete valid screen without crashing.

### ISSUE-003 — Frontend production build fails

- **Severity:** Critical
- **Requirement affected:** locally runnable and deployable MVP
- **Evidence:** `npm run build` exits unsuccessfully.

Reproduction:

```powershell
cd frontend
npm run build
```

Observed error groups:

- unused imports/types;
- invalid `EvidenceFormData` to `Record<string, unknown>` conversions;
- missing `toBeInTheDocument` matcher typing;
- missing CSS side-effect import declarations;
- missing `ImportMeta.env` typing.

Expected result: TypeScript and Vite complete with exit code 0 and produce the production bundle.

### ISSUE-004 — Frontend regression test fails after CTA navigation

- **Severity:** High
- **Requirement affected:** automated proof of the start of the core flow
- **Evidence:** 0 of 1 frontend tests pass in the final run.

Reproduction:

```powershell
cd frontend
npm exec -- vitest run --reporter=verbose
```

Actual result: the test fails with `useAssessment must be used within AssessmentProvider`.

Expected result: Home renders, CTA navigation succeeds, and the Safety screen is asserted without uncaught errors.

### ISSUE-005 — Assessment API contract is inconsistent

- **Severity:** Critical
- **Requirements affected:** Must-Have 3 and Must-Have 4
- **Evidence:** backend suite reports 39 passed and 6 failed; each failing generation case receives HTTP 422.

Reproduction:

```powershell
cd backend
.\venv\Scripts\python.exe -m pytest -q
```

Failing behaviors:

- successful assessment;
- insufficient evidence;
- late hazard escalation;
- approved cause labels;
- required result sections; and
- known-fact source attribution.

Expected result: all supported request fixtures match the endpoint schema and return the specified result or escalation payload.

### ISSUE-006 — Late hazard and negative runtime reached Clarification

- **Severity:** High
- **Requirements affected:** late-stage hazard override and numeric validation
- **Evidence:** observed on the runnable `:5173` instance earlier in the audit before the final context changes.

Reproduction on that runnable snapshot:

1. Complete the hazard screen with **None observed**.
2. Enter “The battery is smoking and sparking near exposed wiring.”
3. Enter `-7` as previous runtime and `-3` as current runtime.
4. Choose Gradual decline.
5. Continue.

Actual result: Clarification renders and displays the negative runtimes.

Expected result: hazardous text immediately triggers urgent escalation; negative runtimes remain on Intake with field-specific errors.

Because the workspace changed during the audit, rerun this reproduction after ISSUE-001 is resolved.

### ISSUE-007 — Empty form errors are visual-only and do not move focus

- **Severity:** Medium
- **Requirements affected:** field-specific validation and accessibility
- **Evidence:** earlier runnable snapshot displayed red error icons without readable messages; focus remained on Continue.

Reproduction:

1. Open Intake.
2. Leave every required field empty.
3. Select Continue.

Actual result: red icons appear, body/accessibility text contains no error explanation, and focus stays on the button.

Expected result: readable errors are associated with each invalid field and focus moves to the first invalid input.

### ISSUE-008 — The synthetic demo cannot produce a technician brief

- **Severity:** Critical
- **Requirements affected:** Must-Have 3, Must-Have 4, and the demo scenario
- **Evidence:** documented synthetic inputs reached Clarification, then assessment generation returned a service error. Final route is now blocked earlier by ISSUE-001.

Reproduction:

1. Enter the synthetic case from `PROJECT.md`.
2. Continue to Clarification.
3. Generate the assessment.

Actual result: no assessment or technician brief is produced.

Expected result: a safety-aware result and complete copyable plain-text brief are generated.

## Browser evidence summary

Screenshots were captured inline during the audit for:

- fresh Home screen;
- blank page after the primary CTA;
- blank direct Intake route;
- earlier direct Intake bypass;
- earlier empty Safety validation;
- earlier urgent hazard escalation;
- earlier negative-runtime Clarification state;
- earlier API 404 recovery state; and
- 320 px Intake layout.

Final cold-start console evidence:

- Home: no initial errors.
- CTA to Safety: assessment-context provider error and blank page.
- Direct Intake, Clarification, Assessment: assessment-context provider errors and blank pages.

Earlier responsive measurements found no horizontal overflow on the rendered Home, Safety, Intake, and Clarification screens at 320, 390, 768, 1024, 1280, and 1440 px. This is not a full responsive Pass because the final flow cannot render beyond Home and the Assessment screen was never reached.

## Day 4 prioritized action items

### P0 — Restore one stable runnable revision

1. Stop concurrent edits and take a stable workspace snapshot.
2. Make a fresh server reproduce the same behavior as the intended development instance.
3. Ensure the assessment state provider wraps every component and route that consumes it.
4. Add an application-level error boundary so a route fault does not become an unexplained blank page.
5. Rerun the Home → Safety browser check before continuing.

**Exit condition:** Home, CTA, Safety, and direct-route redirects work in a fresh browser with no console errors.

### P0 — Make build and frontend tests mandatory gates

1. Resolve every TypeScript build error.
2. Resolve all four lint warnings or explicitly configure justified exceptions.
3. Update the existing frontend test to use the same provider composition as production.
4. Add route-guard and hazard-path tests before accepting further feature work.

**Exit condition:** lint is clean, frontend tests pass, and `npm run build` exits 0.

### P0 — Align the assessment API request contract

1. Reconcile frontend payload, backend request schema, and backend fixtures around one documented structure.
2. Make successful, insufficient-evidence, and late-hazard requests return their specified payloads.
3. Keep validation failures distinct from valid `more_information_needed` results.

**Exit condition:** all 45 backend tests pass and the browser reaches a completed synthetic assessment.

### P0 — Revalidate safety from UI to API

1. Verify all seven initial hazards again on the stable build.
2. Verify late hazardous text overrides ordinary assessment.
3. Verify the urgent message explicitly prohibits touching, opening, disconnecting, probing, and repair.
4. Preserve the passing deterministic prohibited-action policy tests.

**Exit condition:** all initial and late hazard cases pass both automated and browser tests.

### P1 — Finish intake validation and evidence completeness

1. Reject negative runtime values in the UI.
2. Add readable, associated field errors and first-error focus.
3. Verify explicit unknown states for required technical details.
4. Verify at least one load observation and a manual display-reading path.
5. Preserve values through validation and recoverable API errors.

**Exit condition:** Must-Have 2 passes at 320 and 1280 px using keyboard only.

### P1 — Complete result and technician brief

1. Produce every required assessment section with approved cause labels and fact sources.
2. Produce `more_information_needed` for insufficient evidence.
3. Generate the complete fourteen-part technician brief.
4. Verify one-action copy and plain-text readability.

**Exit condition:** the complete synthetic demo produces a safe result and a readable copied brief.

### P1 — Add full-flow browser regression coverage

Cover:

- happy path;
- all seven hazards;
- late hazard text;
- invalid and unknown inputs;
- insufficient evidence;
- API failure and retry;
- direct route access;
- copyable brief;
- keyboard completion; and
- all six required viewport widths.

### P2 — Implement the Should-Have image flow only after the text loop passes

Do not let optional image extraction delay closure of the four Must-Have features. When implemented, verify confirmation, correction, rejection, readability labels, prompt-injection isolation, and all three failure-recovery options from `PROJECT.md`.

## Day 4 completion gate

Day 4 is not complete until all of the following are true:

- [ ] Fresh frontend startup works.
- [ ] Home → Safety → Intake → Clarification → Assessment completes.
- [ ] Direct routes redirect safely without blank pages.
- [ ] Frontend lint passes without warnings.
- [ ] Frontend tests pass.
- [ ] Frontend production build passes.
- [ ] All backend tests pass.
- [ ] Every Must-Have acceptance criterion has browser or automated evidence.
- [ ] The synthetic demo produces and copies a complete technician brief.
- [ ] Browser console remains free of errors throughout the flow.
- [ ] Responsive and keyboard checks pass at the required widths.

## Final assessment

MVP v0.1 contains useful scaffolding and substantially improved backend safety tests, but it is not yet a functioning end-to-end MVP. The most important Day 4 outcome is not additional feature breadth. It is one stable, buildable, safety-gated text-first loop that starts cleanly, accepts valid evidence, rejects unsafe or invalid input, returns a structured result, and produces the technician brief promised by `PROJECT.md`.
