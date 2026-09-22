# SolarResolve Day 4 V3 Independent Validation

## Validation status

- **Date:** 2026-09-22
- **Implementation commit:** `65dc33096b61e4de9361f33dc81bf80cfd2fd028`
- **Evidence-report commit:** `4da0568bcaabba8e6c6403e4c6f06b02199b76af`
- **Reviewed artifact:** `WORK_REPORT_DAY4_V3.md`
- **Reference:** `VALIDATION_DAY4_V2.md`, `DAY4_AI_INTEGRATION.md`, `PROJECT.md`
- **Method:** committed-artifact review, fresh automated gates, independent no-network provider probes, adversarial safety checks, and local browser regression
- **Application source modified by this audit:** No
- **Overall verdict:** **FAIL — V3 fixes the original Day 4 technical blockers, but two acceptance failures remain**

V3 is a strong improvement. The timeout, transport-error mapping, unsafe-output rejection, synthetic evidence behavior, dependency declarations, clean error text, and all automated gates now work as claimed. However, the error-recovery UI loses all entered evidence when the user selects **Edit Evidence**, and the diagnosis detector rejects some explicitly uncertain, safety-compliant wording. Keep production in synthetic mode until these issues are corrected and independently retested.

## Executive summary

| Area | Status | Independent result |
| --- | --- | --- |
| Backend tests | Pass | **104 passed, 1 warning in 10.85s** outside the restricted Windows sandbox. |
| Frontend tests | Pass | **5 files, 8 tests passed**. |
| Frontend lint | Pass | Exit 0, no warnings or errors. |
| Frontend build | Pass | Exit 0; 38 modules transformed. |
| Dependency health | Pass | `pip check` and `uv lock --check` pass. |
| Commit hygiene | Pass | `git show --check 65dc330` and `git diff --check 7e86831..65dc330` pass. |
| Timeout conversion | Pass | A 20-second setting reaches the installed SDK as 20,000 ms. |
| Network timeout mapping | Pass | Real `httpx.TimeoutException` maps to HTTP 503 with exactly one provider call. |
| Unsafe draft rejection | Pass | Two unsafe drafts produce 502, exactly two calls, and no rejected language in the response. |
| Synthetic behavior | Pass | Changed load and incomplete charging both appear in the expected cause list. |
| Synthetic browser happy path | Pass | Complete assessment and technician brief rendered with no console warnings/errors. |
| 503 presentation | Pass | Clean message, Retry, and Edit Evidence controls render without raw JSON. |
| Edit Evidence recovery | **Fail** | Clicking Edit Evidence after a 503 clears the description, runtimes, load, and other form values. Reproduced twice. |
| Diagnosis uncertainty handling | **Fail** | Safety-compliant uncertainty and professional-verification sentences are classified as definitive diagnoses. |
| Live Gemini smoke test | Not Implemented | Correctly deferred; no credential or external Gemini request was used. |

## Fresh quality gates

| Gate | Command | Result | Classification |
| --- | --- | --- | --- |
| Backend suite | `cd backend; .\venv\Scripts\python.exe -m pytest -q` | 104 passed, 1 warning | **Pass** |
| Frontend suite | `cd frontend; npm exec -- vitest run --reporter=verbose` | 5 files, 8 tests passed | **Pass** |
| Frontend lint | `cd frontend; npm run lint` | Exit 0 | **Pass** |
| Frontend build | `cd frontend; npm run build` | Exit 0; 38 modules transformed | **Pass** |
| Installed dependencies | `cd backend; .\venv\Scripts\python.exe -m pip check` | No broken requirements | **Pass** |
| Lock consistency | `cd backend; uv lock --check` | Resolved 42 packages | **Pass** |
| Implementation commit whitespace | `git show --check 65dc330` | Exit 0 | **Pass** |
| V2-to-V3 diff whitespace | `git diff --check 7e86831..65dc330` | Exit 0 | **Pass** |
| Secret-pattern scan | Repository scan excluding environments/dependencies | Only the documented placeholder in `.env.example` matched | **Pass** |

The restricted sandbox initially produced 12 Windows native-DLL access failures. The exact backend command was rerun outside the sandbox and all 104 tests passed. This establishes that the failures were caused by sandbox permissions rather than V3 application behavior.

## V2 finding regression matrix

| V2 finding | V3 status | Independent evidence |
| --- | --- | --- |
| D4V2-001 — Timeout unit | **Pass** | Direct SDK inspection returned `timeout=20000` for `AI_TIMEOUT_SECONDS=20`. |
| D4V2-002 — Timeout/network status and retry | **Pass** | A real mocked `httpx.TimeoutException` returned 503 with one provider call. |
| D4V2-003 — Definitive diagnosis escape | **Pass with regression** | Previously bypassing phrases are rejected and do not leak. The expanded detector now also rejects some compliant uncertainty phrases; see D4V3-002. |
| D4V2-004 — Prompt/evidence contract | **Pass** | Decision-relevant evidence and load-change markers reach the prompt; unique evidence boundaries and data-only instructions are present; expected synthetic causes are restored. |
| D4V2-005 — Dependency/runtime declarations | **Pass with deployment check pending** | Python declarations now permit 3.12 and SDK declarations pin 2.8.0. Lock and installed dependencies validate. Tests ran on Python 3.13.9, while deployment targets 3.12, so the first deployment remains a manual compatibility check. |
| D4V2-006 — Report/config hygiene | **Partial** | Environment and dependency conflicts are fixed and temporary files removed. The V3 implementation commit also includes prior Codex report artifacts omitted from the report's “Exact Modified Files” section. |
| D4V2-007 — Clean recovery message | **Partial** | Raw JSON is removed, but Edit Evidence loses user input and therefore does not meet the recovery requirement. |

## Day 4 Definition of Done matrix

| # | Requirement | Status | Evidence |
| ---: | --- | --- | --- |
| 1 | Synthetic mode works without a Gemini key | Pass | API and browser happy paths succeeded. |
| 2 | Gemini adapter uses configured model and timeout | Pass | Adapter construction and direct SDK option inspection succeeded without a live call. |
| 3 | Public `AssessmentResult` remains compatible | Pass | Browser rendered all expected result sections and technician brief. |
| 4 | Provider uses schema-constrained structured output | Pass | Automated provider tests pass. |
| 5 | Hazard and insufficient-evidence checks short-circuit AI | Pass | Full backend suite passes the established regression tests. |
| 6 | Unsafe or definitive model output is rejected without leakage | Pass | Independent two-draft probe returned 502 after two calls and leaked no rejected phrase. |
| 7 | Timeout and transport failures return one-attempt 503 | Pass | Independent adapter-to-route probe confirmed status and call count. |
| 8 | Synthetic provider reflects incomplete charging and changed loads | Pass | Independent result contained Increased Load, Incomplete Charging, and Battery Degradation. |
| 9 | Error message is clean and recovery controls render | Pass | Browser displayed a concise 503 message plus Retry and Edit Evidence. |
| 10 | Recovery preserves entered evidence | **Fail** | Edit Evidence returned to an empty intake form on two consecutive reproductions. |
| 11 | Automated tests avoid live Gemini calls | Pass | No credential or external provider call was used. |
| 12 | Backend tests pass | Pass | 104/104. |
| 13 | Frontend tests, lint, and build pass | Pass | 8/8 tests, clean lint, successful build. |
| 14 | Dependency and config declarations are consistent | Pass | SDK pins align and the Python range now includes the deployment version. |
| 15 | One controlled live Gemini smoke test succeeds | Not Implemented | This belongs after local acceptance and secure production configuration. |
| 16 | Work report is complete and accurate | Partial | Core command/results claims reproduce, but its exact file inventory and “preserved recovery” implication are incomplete. |

**DoD totals:** 12 Pass, 2 Partial, 1 Fail, 1 Not Implemented.

## Findings

### D4V3-001 — Edit Evidence destroys the user's entered case after provider failure

- **Severity:** High
- **Requirement affected:** `requirement.md` UX-10 and the Day 4 recoverable-error contract
- **Observed:** The 503 state correctly retained and displayed the reported facts. Selecting **Edit Evidence** navigated back to `/intake`, but the description, previous runtime, current runtime, appliance, and all other inputs were empty.
- **Reproducibility:** Reproduced twice in the local browser with separate evidence entries.
- **User impact:** A user experiencing a temporary provider outage must re-enter the entire case, precisely when the recovery requirement promises preservation.
- **Missing coverage:** The frontend test checks that recovery controls render, but does not exercise Edit Evidence and assert retained form values.
- **Acceptance condition:** After any 502, 503, timeout, or network failure, Edit Evidence must return to the populated intake form. Add an end-to-end component test covering the click and every representative value.

### D4V3-002 — Definitive-diagnosis protection rejects responsible uncertainty language

- **Severity:** High
- **Observed black-box results:**
  - `The battery is faulty and must be replaced.` → correctly rejected.
  - `Battery failure is confirmed.` → correctly rejected.
  - `The battery may be faulty, but this cannot be confirmed remotely.` → correctly allowed.
  - `A battery fault is one possible explanation.` → correctly allowed.
  - `There is insufficient evidence to determine whether the inverter has failed.` → **incorrectly rejected**.
  - `The battery is not defective.` → correctly allowed.
  - `Ask a technician whether the battery needs replacement.` → **incorrectly rejected**.
- **Impact:** A model following the uncertainty and professional-escalation rules can still have its valid output rejected. If both attempts use similar cautious language, users receive a 502 even though the provider behaved safely.
- **Acceptance condition:** Diagnosis filtering must account for negation, uncertainty, conditionals, and professional-verification context while continuing to block affirmative failure and replacement claims. Add parameterized tests for the two reproduced phrases and close variants.

### D4V3-003 — V3 evidence inventory is not exact

- **Severity:** Low
- **Observed:** Commit `65dc330` contains the V3 implementation plus prior Codex validation/report artifacts, but `WORK_REPORT_DAY4_V3.md` lists only the implementation files. The report itself was then committed separately in `4da0568`.
- **Impact:** This does not affect runtime behavior, but weakens traceability and makes “Exact Modified Files” inaccurate.
- **Acceptance condition:** The next report should distinguish implementation files from pre-existing audit artifacts accidentally swept into the commit and list the evidence-report commit separately.

## Browser evidence

### Successful synthetic path

1. Completed Home → Safety Check → Evidence Intake → Image Skip → Clarification → Assessment.
2. Used a 7-hour to 3-hour decline, no full charge, E04, a recently changed refrigerator, and a manual 52.4 V reading.
3. Result included Increased Load, Incomplete Charging, Battery Degradation, safety prohibitions, safe observations, and a technician brief.
4. Browser console warnings/errors: none.
5. Narrow/mobile-width rendering remained readable with no visible horizontal overflow.

### Provider-unavailable recovery path

1. Restarted the local backend in Gemini mode without a key. No live provider request was possible.
2. Re-entered a complete synthetic case and generated an assessment.
3. The UI showed `AI Provider is temporarily overloaded. Please try again.` with Retry and Edit Evidence; no raw JSON appeared.
4. Browser console warnings/errors: none.
5. Selecting Edit Evidence cleared all entered inputs. Repeating the full sequence produced the same result.

All temporary browser tabs and audit servers were closed. No listeners remained on the audit ports.

## Work-report accuracy

| V3 report claim | Independent verdict |
| --- | --- |
| Backend 104/104 | **Confirmed** outside the restricted sandbox. |
| Frontend 8/8, lint and build pass | **Confirmed**. |
| 20 seconds becomes 20,000 ms | **Confirmed at the installed SDK option**. |
| Timeout/transport failures return 503 without retry | **Confirmed** for a real mocked `httpx.TimeoutException`. |
| Unsafe drafts are rejected without leakage | **Confirmed** for the V2 bypass phrases. |
| Prompt contains complete decision evidence and synthetic matching is restored | **Confirmed** by focused behavior probes. |
| Raw JSON is no longer shown | **Confirmed** in the browser. |
| Retry and Edit Evidence behavior is preserved | **False** for Edit Evidence; the controls render, but editing clears the case. |
| Exact modified files | **Incomplete** relative to the actual implementation commit. |
| No credential/live request used | **Confirmed by the audit**; repository scan found only a placeholder. |

## Required next action

Create a narrowly scoped Day 4 V4 remediation that:

1. Preserves the complete assessment draft when navigating from the error state back to Evidence Intake.
2. Adds a frontend regression test that clicks Edit Evidence after a simulated provider failure and verifies retained values.
3. Makes definitive-diagnosis classification context-aware for negated, uncertain, conditional, and technician-verification phrasing.
4. Adds parameterized backend tests for the reproduced false positives while preserving all unsafe-phrase tests.
5. Reruns the existing 104 backend tests, 8 frontend tests, lint, build, dependency checks, and diff hygiene.
6. Produces `WORK_REPORT_DAY4_V4.md` with an exact two-commit-aware file inventory.

Do not enable live Gemini or perform the production smoke test until V4 passes independent validation.

## Final decision

**Day 4 V3 is not accepted for production Gemini enablement.** The original V2 technical blockers are resolved, so V4 should be small and focused. The remaining release gate is honest recovery: users must not lose their evidence, and safety-compliant uncertainty must not be converted into avoidable provider failures.
