# SolarResolve Day 4 V2 Independent Validation

## Validation status

- **Date:** 2026-09-22
- **Reviewed evidence:** `WORK_REPORT_DAY4_V2.md`
- **Reviewed commit:** `7e8683126291beb5ed7fe29e7bc9895a60b75357` (`Day 4 AI Integration Remediation V2`)
- **Reference documents:** `DAY4_AI_INTEGRATION.md`, `VALIDATION_DAY4.md`
- **Method:** report and commit review, source/config inspection, fresh automated gates, focused safety/provider probes, and two local browser regressions
- **Application source modified by this audit:** No
- **Overall verdict:** **FAIL — improved, but not accepted for live Gemini or production enablement**

V2 fixes the broken backend environment, restores the full automated suite, adds typed provider errors, and provides functional frontend recovery controls. It does not fully remediate D4-001 through D4-007. The most serious remaining defects are a 20-millisecond SDK timeout caused by a unit mismatch, real SDK timeout errors being returned as 502 and retried, bypassable definitive-diagnosis filtering, and an incomplete prompt trust boundary.

Keep `AI_PROVIDER=synthetic` in production until a V3 remediation passes independent revalidation.

## Executive summary

| Area | Status | Independent result |
| --- | --- | --- |
| Backend tests | Pass | The authoritative run outside the restricted sandbox completed **60 passed, 1 warning in 6.98s**. |
| Frontend tests | Pass | **5 files and 8 tests passed**. |
| Frontend lint | Pass | Exit 0 with no warnings or errors. |
| Frontend build | Pass | Exit 0; 38 modules transformed. |
| Dependency health | Partial | `pip check` and `uv lock --check` pass, but deployment manifests do not consistently consume the lock and `requirements_locked.txt` is empty. |
| Synthetic browser flow | Pass | Complete assessment and technician brief rendered with no browser console errors. |
| 503 recovery UI | Pass with UX issue | Retry and Edit Evidence render and preserve evidence, but the visible message exposes raw JSON response text. |
| Live Gemini timeout | Fail | `AI_TIMEOUT_SECONDS=20` is passed to an SDK field documented in milliseconds, producing a 20 ms timeout. |
| Actual timeout mapping | Fail | A mocked `httpx.TimeoutException` becomes a 502 and is retried once rather than returning a one-attempt 503. |
| Post-model safety | Fail | “The battery is faulty and must be replaced” and “Battery failure is confirmed” pass the diagnosis detector and reach a 200 response. |
| Prompt trust boundary | Fail | User input can inject the end delimiter, required untrusted-data instructions are absent, and relevant evidence is omitted. |
| Live API smoke test | Not Implemented | No real-provider call was made; deployment remains pending and blockers make a live call inappropriate. |

## Fresh quality gates

| Gate | Command | Result | Classification |
| --- | --- | --- | --- |
| Backend suite | `cd backend; .\venv\Scripts\python.exe -m pytest -q` | 60 passed, 1 warning in 6.98s | **Pass** |
| Backend collection | `cd backend; .\venv\Scripts\python.exe -m pytest --collect-only -q` | 60 tests collected | **Pass** |
| Installed dependencies | `cd backend; .\venv\Scripts\python.exe -m pip check` | No broken requirements | **Pass** |
| Lock consistency | `cd backend; uv lock --check` | Resolved 42 packages | **Pass** |
| Frontend lint | `cd frontend; npm run lint` | Exit 0 | **Pass** |
| Frontend build | `cd frontend; npm run build` | Exit 0; 38 modules transformed | **Pass** |
| Frontend tests | `cd frontend; npm exec -- vitest run --reporter=verbose` | 5 files, 8 tests passed | **Pass** |
| Commit whitespace check | `git show --check HEAD` | Numerous trailing-whitespace errors and blank EOF additions | **Fail** |

The first in-sandbox backend run reported five native-library access failures. Repeating the exact command outside the restricted sandbox passed all 60 tests, establishing that those five failures were a sandbox artifact rather than application failures.

## D4-001 through D4-007 regression matrix

| Finding | V2 status | Independent evidence |
| --- | --- | --- |
| D4-001 — Reproducible dependency state | **Partial** | `backend/uv.lock` is valid and pins `google-genai==2.8.0`, but all three requirements declarations still allow `google-genai>=2.3.0`; `backend/requirements_locked.txt` is zero bytes; Railway/Render installation uses requirements files rather than the lock; `.python-version` and Render specify Python 3.12 while `backend/pyproject.toml:9` requires 3.13+. |
| D4-002 — Whole-draft safety | **Fail** | Whole-draft checking and bounded retry exist, but the phrase list at `hazard_policy.py:98-111` is narrow. A fake draft using “faulty,” “must be replaced,” and “failure is confirmed” returned 200 unchanged. |
| D4-003 — Provider errors and retry policy | **Fail** | Route-level typed mappings work for injected application errors. At the actual SDK boundary, `httpx.TimeoutException` falls through `ai_provider.py:114-115` to `ProviderOutputError`, producing 502 after two calls instead of 503 after one. |
| D4-004 — Timeout contract | **Fail** | `get_ai_provider()` reads seconds at `ai_provider.py:126` and passes the unchanged integer to `HttpOptions` at line 82, whose installed SDK defines the field in milliseconds. The default is therefore 20 ms, not 20 s. |
| D4-005 — Prompt and trust boundary | **Fail** | Delimiters and image filtering exist. However, untrusted user text is interpolated directly at `prompts.py:19`, allowing an injected `=== END UNTRUSTED EVIDENCE ===`. The system instruction at lines 4-9 lacks the specified data-vs-instruction rule and the prompt omits loads, warning/error, age, equipment details, maintenance, and manual readings. |
| D4-006 — Configuration and operational consistency | **Partial** | Backend CORS settings and error logging improved. Root `.env.example:15,20` still names the obsolete model and `CORS_ORIGINS`; Python version declarations conflict; `test_cors.py` was committed as a root diagnostic file and omitted from the report's changed-file inventory. |
| D4-007 — Tests and report evidence | **Fail** | The suite is green, but it does not test the actual SDK timeout exception, malformed JSON, alternate definitive-diagnosis wording, delimiter injection, or complete prompt evidence. The report falsely says the lock requirements were exported and that no issues remain; it also omits frontend test totals. |

## Day 4 Definition of Done matrix

| # | Requirement | Status | Evidence |
| ---: | --- | --- | --- |
| 1 | Synthetic mode runs without a Gemini key | Pass | API tests and a fresh browser flow succeeded. |
| 2 | Gemini mode uses the provider adapter and configured model | Partial | Construction and selection work under mocks, but the 20 ms timeout makes the live path operationally invalid. |
| 3 | Public `AssessmentResult` stays compatible | Pass | Frontend renders the synthetic response and technician brief. |
| 4 | Provider uses schema-constrained structured output | Pass | Fresh tests confirm `application/json`, exact schema submission, and Pydantic parsing. |
| 5 | Hazard and insufficient-evidence checks short-circuit AI | Pass | Tests and focused probes show zero provider calls. |
| 6 | Post-model safety rejects all prohibited/diagnostic drafts | Fail | Alternate definitive wording bypasses the detector and reaches the public result. |
| 7 | Provider failures return honest recoverable errors | Fail | An actual SDK-level timeout path becomes 502 and is retried. |
| 8 | Retry is bounded to one validation retry | Pass | `assessment_service.py:144-165` fixes the maximum at two total attempts; provider-unavailable application errors are not retried. |
| 9 | IDs, evidence facts, escalation and disclaimer remain application-controlled | Pass | Assembly remains outside the model draft. |
| 10 | Confirmed image observations are included and rejected/unconfirmed observations excluded | Pass | Test and source inspection confirm the filtering behavior. |
| 11 | Automated tests make no live Gemini calls | Pass | Provider calls are mocked; no credential was required. |
| 12 | Backend tests pass | Pass | 60/60 passed outside the restricted sandbox. |
| 13 | Frontend tests, lint and build pass | Pass | 8/8 tests, clean lint, successful production build. |
| 14 | Secret/config/logging policy is consistent | Partial | No real secret was detected and log details are generic, but config examples and runtime versions conflict. |
| 15 | One controlled live Gemini smoke test succeeds | Not Implemented | Correctly deferred during this audit because live-provider blockers remain. |
| 16 | Work report is complete and accurate | Fail | Material omissions and inaccurate statements remain. |

**DoD totals:** 9 Pass, 3 Partial, 3 Fail, 1 Not Implemented.

## Detailed findings and reproduction

### D4V2-001 — Gemini timeout is 1,000 times shorter than intended

- **Severity:** Blocker
- **Evidence:** `AI_TIMEOUT_SECONDS` defaults to `20` at `backend/src/services/ai_provider.py:126`, then the value is passed directly to `HttpOptions(timeout=timeout)` at line 82. Installed `google-genai==2.8.0` describes this option as milliseconds.
- **Independent probe:** Provider construction recorded `timeout=20`, which is 20 ms rather than the documented 20 s budget.
- **Impact:** A live call can time out before useful Gemini processing begins.
- **Required fix:** Convert seconds to milliseconds exactly once, or rename/configure an explicit millisecond variable. Add a test that asserts the SDK receives `20000` for a 20-second setting.

### D4V2-002 — Real network timeouts produce the wrong status and retry count

- **Severity:** High
- **Evidence:** `ai_provider.py:108-115` handles Gemini `APIError` but not `httpx.TimeoutException` or transport errors. The generic exception handler converts those failures to `ProviderOutputError`.
- **Independent probe:** A mocked SDK `httpx.TimeoutException` caused HTTP 502 and two provider calls.
- **Expected:** HTTP 503 and exactly one provider call.
- **Required fix:** Map timeout/network/transport exceptions to `ProviderUnavailableError` at the adapter boundary and add an adapter-to-route test using the real exception class.

### D4V2-003 — Definitive diagnosis can bypass the phrase list

- **Severity:** Critical
- **Evidence:** `DEFINITIVE_DIAGNOSIS_TERMS` at `hazard_policy.py:98-101` only recognizes a few exact phrases.
- **Independent probe:** A draft with summary “The battery is faulty and must be replaced.” and cause description “Battery failure is confirmed.” returned 200 with both claims unchanged.
- **Impact:** The application can present remote AI conjecture as confirmed electrical diagnosis.
- **Required fix:** Replace the small exact-string list with a more complete deterministic policy covering definitive state, confirmed causality, failure/fault language, and mandatory replacement assertions. Add parameterized bypass tests across every model-controlled field.

### D4V2-004 — Prompt boundary is injectable and evidence is incomplete

- **Severity:** High
- **Evidence:** `prompts.py:19` inserts the raw description between plain-text boundary strings. Supplying the boundary text creates a user-controlled premature end delimiter. `DAY4_SYSTEM_INSTRUCTION` at lines 4-9 does not explicitly instruct the model to treat all enclosed content as data and ignore instructions within it.
- **Additional regression:** The prompt omits `loads[].recently_added_or_changed` and formats `Reaches Full Charge: no`, while the synthetic provider at `ai_provider.py:44-55` looks for snake_case markers that no longer exist. A browser case with no full charge therefore missed the expected incomplete-charging signal.
- **Required fix:** Serialize untrusted evidence as structured data with a non-user-controlled envelope, include all decision-relevant fields, strengthen the system instruction, and update the synthetic adapter to consume typed evidence or the actual prompt format. Add injection and synthetic-regression tests.

### D4V2-005 — Dependency/deployment declarations are internally inconsistent

- **Severity:** High
- **Evidence:** `backend/requirements_locked.txt` is empty despite the report's export claim. `requirements.txt`, `backend/requirements.txt`, and `backend/pyproject.toml` use an unbounded lower constraint for `google-genai`. `.python-version` and `render.yaml:10` specify Python 3.12, while `backend/pyproject.toml:9` requires 3.13+.
- **Impact:** The validated local environment is not the environment described for deployment.
- **Required fix:** Choose one Python version and one authoritative dependency workflow, pin or constrain the production SDK deterministically, regenerate a non-empty export if requirements deployment remains, and make Railway/Render consume that exact declaration.

### D4V2-006 — Evidence report overstates completion

- **Severity:** Medium
- **Evidence:** `WORK_REPORT_DAY4_V2.md:8` says the lock requirements were exported although the file is empty. Line 58 says every issue is fully remediated despite the failures above. The changed-file list omits the committed root `test_cors.py`, and the report provides no frontend test result.
- **Required fix:** Generate the V3 report from exact commands and `git show --name-status`, include backend and frontend test totals, list limitations honestly, and do not claim independent acceptance.

### D4V2-007 — Error recovery works, but raw response JSON is shown to users

- **Severity:** Low
- **Evidence:** A local Gemini-mode/no-key browser flow showed Retry and Edit Evidence with preserved inputs and no console errors, but displayed `Assessment service error (503): {"detail":"..."}`.
- **Required fix:** Parse the backend detail safely and render a concise user message while retaining diagnostic detail only in development logs.

## Browser verification

### Synthetic happy path

1. Started the backend in synthetic mode and the Vite frontend.
2. Selected no hazards.
3. Entered a runtime decline from 7 hours to 3 hours, gradual change, no full charge, and a refrigerator load.
4. Skipped the optional image step and generated the assessment.
5. **Observed:** Complete result and technician brief rendered; console warnings/errors were empty.

### Recoverable 503 path

1. Started a separate local backend with `AI_PROVIDER=gemini` and no key, without making a live provider call.
2. Completed the same evidence flow from a separate frontend instance.
3. **Observed:** A 503 state rendered with Retry and Edit Evidence; evidence remained available and the browser console was clean.
4. **UX issue:** The raw JSON error body was visible.

All audit servers were stopped after verification; no listeners remained on ports 5173, 5174, 8010, or 8011.

## Work report accuracy assessment

| V2 report claim | Independent verdict |
| --- | --- |
| 60 backend tests pass | **Confirmed** outside the restricted sandbox. |
| Lint and production build pass | **Confirmed**. |
| `requirements_locked.txt` was exported | **False** — file length is 0 bytes. |
| SDK errors are mapped appropriately | **Partial/False** — `APIError` is mapped, but actual HTTP timeouts are not. |
| Whole-draft definitive diagnosis protection is complete | **False** — easy alternate wording bypasses it. |
| Prompt-injection boundary is enforced | **False** — raw input can inject the end delimiter and the system rule is incomplete. |
| No unresolved issues remain | **False** — three release-blocking/high-impact defects remain, plus configuration/report issues. |

## Required V3 remediation order

1. **Correct the timeout unit and adapter exception mapping.** Prove 20 seconds becomes 20,000 ms and real timeout/transport exceptions return one-attempt 503.
2. **Strengthen whole-draft semantic safety.** Cover alternate fault/failure/confirmed/replacement language in every model-controlled field and prove two unsafe drafts return 502 without leaking text.
3. **Rebuild the prompt input contract.** Use structured untrusted data, prevent delimiter injection, include all relevant evidence, and restore synthetic-mode decision behavior.
4. **Unify dependency and Python declarations.** Eliminate the empty export and make deployment consume the exact tested dependency set.
5. **Add the missing regression tests.** Include malformed JSON, timeout/transport mapping, diagnosis variants, prompt injection, complete evidence serialization, and synthetic expected causes.
6. **Clean configuration/report hygiene.** Update the root environment example, decide whether `test_cors.py` belongs in the product, fix commit whitespace, and report every exact gate including frontend tests.
7. **Repeat independent validation in synthetic mode.** Only after all gates and focused probes pass should production be switched to Gemini for one controlled, anonymized live smoke test.

## Final decision

**Day 4 V2 is rejected for production Gemini enablement.** Keep the synthetic provider active. V2 may remain as an intermediate implementation because the base adapter, schema output, API errors, retry controls, and automated suites are materially improved, but D4V2-001 through D4V2-005 must be corrected before a live API test or production rollout.
