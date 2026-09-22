# Independent Revalidation — Remediation V2

**Audit date:** 2026-09-22  
**Reference:** `PROJECT.md`  
**Implementation report reviewed:** `WORK_REPORT_REMEDIATION_V2.md`  
**Audit mode:** Read-only; no application source code was modified

## 1. Overall Verdict

**Status: NOT READY / remediation still required**

The primary user loop and almost all Must-Have acceptance criteria work in an independent browser run. However, the V2 release cannot be marked complete because the frontend production build fails and one frontend automated test fails.

- Must-Have acceptance criteria: **24 Pass, 2 Manual Check, 0 Fail, 0 Not Implemented**
- Backend tests: **Pass — 48/48**
- Frontend tests: **Fail — 7/8 passed**
- Frontend production build: **Fail**
- Frontend lint: **Pass with 5 warnings**, not the zero-warning result claimed in the work report
- Provisional quality score: **82/100**

The completed browser behaviors listed as Pass below are confirmed and should be **skipped during implementation and targeted revalidation**. They only need one final happy-path smoke test after the build/test repairs.

## 2. V2 Work Report Claim Review

| V2 report claim | Independent result | Status | Evidence |
|---|---|---:|---|
| Backend test suite passes 48/48 | 48 tests passed | Pass | `backend\venv\Scripts\python.exe -m pytest -q` |
| Frontend suite passes 8/8 | 7 passed and 1 failed | Fail | Assessment copy test expected `RESET_FLOW`, but implementation dispatched `RESET` |
| Production build passes | TypeScript compilation failed with 3 errors | Fail | `npm run build` in `frontend` |
| Lint has zero warnings/errors | Exit code 0, but 5 warnings were reported | Partial | `npm run lint` in `frontend` |
| Full text-only browser flow works | Independently completed from Home to Assessment Result | Pass | Fresh frontend/backend pair on ports 5177/8004 |
| All seven initial hazard choices escalate | Each was tested separately and escalated | Pass | Browser verification |
| Late hazard detection works | Ambiguous burning-smell wording escalated; clear negation did not | Pass | Browser verification |
| Failure recovery works | Network failure showed recovery UI; retry succeeded without losing facts | Pass | Browser verification with backend stopped and restarted |
| Copy action provides feedback | `Copied!` status appeared | Pass | Browser verification |
| Copied text is readable in a messaging app | Clipboard paste was not independently verified | Manual Check | Requires OS clipboard/paste verification |
| Optional image flow is fully implemented | Could not independently upload a file; no upload tests appeared in backend test listing | Manual Check | Optional Should-Have; not a Must-Have release blocker |
| Responsive and keyboard behavior is complete | Desktop overflow check passed; required mobile and full keyboard runs remain unverified | Manual Check | Requires 320 px and keyboard-only browser runs |

## 3. Automated Verification

| Check | Command | Result | Evidence |
|---|---|---:|---|
| Frontend lint | `npm run lint` | Pass with warnings | Exit 0; 5 warnings |
| Frontend build | `npm run build` | Fail | 3 TypeScript errors in two test files |
| Frontend tests | `npm exec -- vitest run --reporter=verbose` | Fail | 7/8 tests passed |
| Backend tests | `backend\venv\Scripts\python.exe -m pytest -q` | Pass | 48 passed |
| Backend health | `GET http://127.0.0.1:8004/health` | Pass | HTTP 200 with status, version, and timestamp |

### Frontend build errors

1. `AssessmentScreen.test.tsx:68` — `null` is not assignable to `EvidenceFormData`.
2. `ClarificationScreen.test.tsx:19` — `hazardsReported` is not a property of `FlowState`.
3. `ClarificationScreen.test.tsx:50` — TypeScript does not recognize the `toHaveValue` matcher.

### Frontend test failure

`AssessmentScreen > renders all sections and allows copying brief` failed at `AssessmentScreen.test.tsx:103`:

- Expected dispatch: `{ type: "RESET_FLOW" }`
- Actual dispatch: `{ type: "RESET" }`

### Lint warnings

- Unused `AssessmentProvider` import.
- Unused `stateOverrides` value.
- Unused `afterEach` import.
- Two unnecessary regular-expression escapes in `hazardPolicy.ts`.

## 4. Must-Have Acceptance-Criteria Matrix

### Must-Have 1 — Safety hazard gate

| Acceptance criterion | Status | Evidence |
|---|---:|---|
| Hazard gate appears before appliance intake | Pass | Home CTA opened Safety before Intake |
| Each of the seven specified hazards blocks normal flow | Pass | Every hazard was selected and tested separately |
| Urgent safety result avoids cause ranking | Pass | Escalation screen contained safety guidance, not ranked causes |
| Full prohibition text is displayed | Pass | “Do not touch, open, disconnect, probe, or attempt to repair.” rendered |
| Hazard disclosed later still escalates | Pass | “I may have noticed a burning smell” escalated from Clarification |
| Automated tests cover each hazard and a safe path | Pass | Backend hazard-policy suite passed, supplemented by browser checks |

**Feature status: Pass — confirmed; skip implementation changes.**

### Must-Have 2 — Structured evidence intake

| Acceptance criterion | Status | Evidence |
|---|---:|---|
| Captures description, runtime comparison, timing, or records missing values | Pass | Fields accepted data; omitted runtime was reported as missing |
| Technical unknowns do not block continuation | Pass | Flow completed with runtime values omitted |
| At least one load/appliance is required | Pass | Empty appliance submission produced a field-level alert |
| Manual display reading can be supplied | Pass | Display-reading input is present and carried into the flow |
| Empty description and negative runtimes are rejected with field errors | Pass | Empty and `-7`/`-3` cases were rejected; focus moved to the first invalid field |
| Input survives validation and recoverable service failures | Pass | Values remained after validation errors and backend failure/retry |
| Flow is keyboard-only usable at 320 px and 1280 px | Manual Check | Full keyboard-only and 320 px runs were not independently completed |

**Feature status: Manual Check — implementation behavior otherwise passed.**

### Must-Have 3 — Evidence-based assessment

| Acceptance criterion | Status | Evidence |
|---|---:|---|
| Result shows all required sections | Pass | Known facts, missing facts, causes, prohibited actions, safe observations, next action, and disclaimer rendered |
| Known facts identify their source | Pass | Facts displayed `[user]` source labels |
| Cause confidence uses approved labels | Pass | Approved qualitative confidence labels rendered; backend contract tests passed |
| Result does not assert that a component is defective | Pass | Backend negative-contract test passed |
| Safe checks exclude prohibited repair actions | Pass | Browser output and backend policy tests passed |
| Insufficient evidence returns “More information needed” | Pass | No-runtime case returned that status and listed missing runtime/full-charge information |
| Service failure is recoverable and does not show partial success | Pass | `Failed to fetch` UI offered Retry/Edit Evidence; retry produced a complete assessment |

**Feature status: Pass — confirmed; skip implementation changes.**

### Must-Have 4 — Technician brief and handoff

| Acceptance criterion | Status | Evidence |
|---|---:|---|
| Brief contains the required fields | Pass | Technician brief rendered on the result screen |
| Reported facts and investigation items remain distinct | Pass | Separate sections were visible |
| Brief avoids presenting a diagnosis | Pass | Output used evidence-based possibilities and investigation items |
| One clear copy action is present | Pass | Single `Copy Brief` action produced `Copied!` status |
| Copied output is readable after pasting into a messaging app | Manual Check | UI feedback passed; OS clipboard paste was not independently tested |
| Synthetic demo can complete without personal data | Pass | Full browser run used synthetic appliance information only |

**Feature status: Manual Check — implementation behavior otherwise passed.**

## 5. Browser Scenarios Verified

| Scenario | Result | Key evidence |
|---|---:|---|
| Happy path without image | Pass | Home → Safety → Intake → Clarification → Assessment Result |
| Clear hazard negation | Pass | “There is no smoke or exposed wiring” did not trigger escalation |
| All initial hazard choices | Pass | All seven independently produced urgent safety guidance |
| Ambiguous late hazard | Pass | Possible burning smell escalated |
| Clear late-hazard negation | Pass | Negated hazard continued normally |
| Missing hazard selection | Pass | Readable “Please select…” alert appeared |
| Empty required inputs | Pass | Field-specific alerts appeared and focus moved to description |
| Negative runtime inputs | Pass | Both values were rejected and retained for correction |
| Direct protected routes | Pass | `/intake`, `/image-evidence`, `/clarification`, and `/assessment` redirected to Home |
| Backend unavailable | Pass | Recoverable error appeared and entered facts were preserved |
| Retry after backend recovery | Pass | Retry reached a complete Assessment Result |
| Insufficient evidence | Pass | “More information needed” appeared without forced cause ranking |
| Start new assessment | Pass | Returned to Home and reset the flow |
| Desktop horizontal overflow | Pass | At 1280 px, document scroll width did not exceed client width |

## 6. Open Manual Checks

These checks are not confirmed as defects. They require independent browser/device verification before final sign-off:

1. Complete the entire flow using only the keyboard at both 320 px and 1280 px widths.
2. Paste the copied technician brief into a plain-text field or messaging application and confirm ordering, readability, and no missing sections.
3. Exercise the optional image-upload flow with a supported file, invalid file type, and excessive file size. This is a Should-Have feature and does not block the core MVP unless its scope is promoted.
4. Capture the browser console during one happy path and confirm there are no uncaught application errors.

## 7. Blocking Issues and Reproduction

### V2-01 — Production build fails

**Priority:** P0  
**Impact:** A release artifact cannot be produced reliably.

Reproduction:

1. Open a terminal in `frontend`.
2. Run `npm run build`.
3. Observe the three TypeScript errors listed in Section 3.

Expected: TypeScript compilation and Vite build finish successfully.  
Actual: Command exits with code 1.

### V2-02 — Frontend test suite is not green

**Priority:** P0  
**Impact:** Automated verification contradicts the V2 work report and blocks completion.

Reproduction:

1. Open a terminal in `frontend`.
2. Run `npm exec -- vitest run --reporter=verbose`.
3. Observe the failed AssessmentScreen test.

Expected: 8/8 tests pass.  
Actual: 7/8 pass; reset-action expectation differs from implementation.

### V2-03 — Evidence in the V2 report is inaccurate

**Priority:** P1  
**Impact:** The report states that lint is warning-free, the build passes, and all frontend tests pass; independent commands contradict those statements.

Reproduction:

1. Run the three frontend commands in Section 3.
2. Compare their output with the V2 work report’s quality-gate table.

Expected: The work report records exact command results.  
Actual: Three claims do not match the independent run.

## 8. Prioritized Next Actions

### P0 — Repair only the failed release gates

1. Correct the three TypeScript test/build errors.
2. Reconcile the assessment reset action so the implementation and test use the intended action name.
3. Run lint, build, frontend tests, and backend tests again and record the exact totals.

### P1 — Close the two Must-Have manual checks

1. Verify keyboard-only operation at 320 px and 1280 px.
2. Verify the copied technician brief by pasting it into a plain-text destination.
3. Record reproducible evidence, not only a completion statement.

### P2 — Verify the optional image path

Test upload success, invalid type, excessive size, removal/replacement, and continuation without an image. If it is intentionally deferred, document it explicitly as Should-Have backlog.

## 9. Incremental Revalidation Plan

For the next remediation cycle, **do not redo or alter features marked Pass** unless a repair directly affects them.

1. Re-run the four automated quality gates.
2. Re-test only V2-01 and V2-02 after repair.
3. Complete the two Must-Have manual checks.
4. Run one short happy-path smoke test to detect regression.
5. Mark the release ready only when build and all automated suites pass and the two manual checks have evidence.

## 10. Final Assessment

V2 substantially repaired the core application: safety handling, evidence intake, assessment output, technician handoff, route protection, insufficient-evidence behavior, and failure recovery all passed independent browser verification. Those areas are complete and should be skipped during the next implementation pass.

The remaining work is narrow but release-blocking: fix the frontend TypeScript/build errors, correct the one failed frontend test, and close two manual acceptance checks. Until then, V2 should not be declared fully complete.
