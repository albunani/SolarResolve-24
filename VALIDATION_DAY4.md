# SolarResolve Day 4 Independent Validation

## Validation status

- **Date:** 2026-09-22
- **Reviewed artifact:** `WORK_REPORT_DAY4.md`
- **Reference:** `DAY4_AI_INTEGRATION.md`
- **Method:** report review, source/config inspection, fresh automated gates, focused API probes, and a local browser regression
- **Application source modified:** No
- **Overall verdict:** **FAIL — Day 4 is not ready for Gemini deployment or live-provider smoke testing**

The provider-neutral structure and local synthetic flow are present, and every frontend gate remains green. However, the current implementation does not meet the Day 4 safety, failure-recovery, timeout, dependency-lock, test-coverage, or work-report requirements.

## Executive summary

| Area | Status | Independent result |
| --- | --- | --- |
| Existing Day 3 browser flow | Pass | A fresh local synthetic case reached the complete assessment and technician brief with no browser console errors. |
| Frontend lint | Pass | `npm run lint` exited 0 with no warnings or errors. |
| Frontend build | Pass | Production build completed successfully. |
| Frontend tests | Pass | 5 files and 8 tests passed. |
| Backend tests | Fail | The required `backend\venv` run reported **50 passed, 4 failed** because `google-genai` is not installed. |
| Gemini runtime | Fail | The required local environment cannot construct `GeminiAssessmentProvider`. The alternate `.venv` cannot start its Python process. |
| Deterministic short circuits | Pass | Hazard and insufficient-evidence results returned without calling the provider. |
| Post-model safety | Fail | Definitive diagnosis text reached the public result; unsafe checks were silently dropped or replaced instead of triggering validation retry and then a controlled error. |
| Failure recovery | Fail | Missing Gemini configuration returns 500; a simulated timeout returns 502; retry count can exceed one. |
| Timeout contract | Fail | The backend reads but does not apply its 20-second timeout, while the frontend aborts after 15 seconds. |
| Dependency reproducibility | Fail | `google-genai>=2.3.0` is unpinned and `backend/uv.lock` contains no Gemini dependency update. |
| Live deployment check | Not Implemented | The Vercel landing page loads, but the Day 4 code is uncommitted and the work report lists deployment and live integration as still pending. No production form was submitted. |

## Automated quality gates

| Gate | Command | Result | Classification |
| --- | --- | --- | --- |
| Backend suite | `cd backend; .\venv\Scripts\python.exe -m pytest -q` | 50 passed, 4 failed, 4 warnings | **Fail** |
| Alternate backend environment | `cd backend; .\.venv\Scripts\python.exe -m pytest -q` | Python child process could not start (`permission denied`) | **Fail / unusable environment** |
| Frontend lint | `cd frontend; npm run lint` | Exit 0, no warnings/errors | **Pass** |
| Frontend build | `cd frontend; npm run build` | Exit 0; 38 modules transformed | **Pass** |
| Frontend tests | `cd frontend; npm exec -- vitest run --reporter=verbose` | 5 files, 8 tests passed | **Pass** |
| Patch hygiene | `git diff --check` | Seven trailing-whitespace errors in `assessment_service.py` | **Fail** |

The four backend failures are all in `backend/tests/test_ai_provider.py` and fail before exercising Gemini behavior because `google` cannot be imported. This does not reproduce the report's claim that all 54 backend tests passed.

## Day 4 Definition of Done matrix

| # | Requirement | Status | Evidence |
| ---: | --- | --- | --- |
| 1 | Synthetic mode runs without a Gemini key | Pass | API probe returned 200 and `safe_observations_recommended`; browser happy path completed. |
| 2 | Gemini mode uses the adapter and configured model | Fail | Selection code exists, but the required environment lacks `google-genai`; no controlled live call succeeded. |
| 3 | Public `AssessmentResult` remains compatible | Pass | Synthetic API response retained all established fields and the frontend rendered the result. |
| 4 | Provider returns a schema-constrained draft validated by Pydantic | Partial | Schema and `model_validate_json` exist at `backend/src/services/ai_provider.py:16` and `:101`, but the provider tests cannot run and no test asserts the exact schema passed to the SDK. |
| 5 | Hazard and evidence-sufficiency checks short-circuit provider calls | Pass | Focused probes produced `urgent_safety_escalation` and `more_information_needed` with provider call count 0. |
| 6 | Post-model safety blocks prohibited or diagnostic output | Fail | A fake draft containing “The battery is defective” and “The battery has failed” returned those claims in a completed result. Unsafe actions did not trigger the required retry/error path. |
| 7 | Provider failures return recoverable errors without fake success | Fail | Missing key returned 500. A simulated timeout returned 502 after two calls. `AI_MAX_RETRIES=9` caused ten calls. |
| 8 | Authoritative metadata and evidence fields remain application-controlled | Pass | IDs, timestamps, known facts, gaps, prohibitions, disclaimer, and technician-brief assembly remain outside the provider draft. |
| 9 | Automated tests make no live provider calls | Pass by inspection | The only test provider call is replaced with a mock. No test network client was found. |
| 10 | Backend tests pass | Fail | 50 passed, 4 failed in the required environment. |
| 11 | Frontend tests pass | Pass | 8/8 passed. |
| 12 | Frontend lint passes with zero warnings | Pass | Exit 0. |
| 13 | Frontend production build passes | Pass | Exit 0. |
| 14 | One controlled live API smoke test succeeds | Not Implemented | The report explicitly leaves deployment and live E2E pending. |
| 15 | No key or unnecessary evidence appears in files/logs | Partial | Generic secret-pattern scan found placeholders only, but provider exception text is interpolated into warning/error logs. |
| 16 | Work report contains every required evidence section | Fail | It omits lockfile status, before/after totals, local run commands, explicit zero-live-call confirmation, known limitations/backlog, and a complete DoD accounting. Its 54/54 claim is not reproducible. |

**DoD totals:** 8 Pass, 2 Partial, 5 Fail, 1 Not Implemented.

## Findings

### D4-001 — Backend dependency state is not reproducible

- **Severity:** Blocker
- **Evidence:** `backend/requirements.txt:8` and `requirements.txt:8` use the unpinned declaration `google-genai>=2.3.0`. `backend/uv.lock` contains no `google-genai` package and currently declares only `requires-python = ">=3.14"` at line 3.
- **Observed result:** The required `backend\venv` test command fails four provider tests with `ModuleNotFoundError: No module named 'google'`.
- **Impact:** Local validation, CI-equivalent validation, and production reproducibility are not established.
- **Required correction:** Select one supported backend environment, pin the resolved SDK version, update its lockfile consistently, install from that declaration, and rerun the exact required command from a clean environment.

### D4-002 — Unsafe and definitive model output can be returned as a completed assessment

- **Severity:** Critical
- **Evidence:** `assessment_service.py:173` silently removes prohibited safe checks; line 175 substitutes a fallback action; line 191 returns the model summary unchanged. Model-generated cause descriptions are also returned without semantic validation.
- **Independent probe:** A fake draft with summary `The battery is defective.`, cause `The battery has failed.`, unsafe check `Open the inverter casing`, and action `Disconnect battery cables` produced a completed 200-style result. The definitive summary and cause survived. The unsafe check disappeared and the action was replaced. The provider was called only once.
- **Impact:** The app can present prohibited remote diagnosis language as a finished safety assessment, contradicting `PROJECT.md` and Day 4's safety envelope.
- **Required correction:** Validate summary, cause descriptions, safe checks, and recommended action as one draft. Any prohibited or definitive output must invalidate the whole draft, permit at most one safety retry, and then return a controlled 502 without a partial assessment.

### D4-003 — Provider errors and retry policy violate the contract

- **Severity:** High
- **Evidence:** `assessment_service.py:144` trusts any integer in `AI_MAX_RETRIES`; line 151 retries every exception. `ai_provider.py:116` raises an uncaught `ValueError` for a missing key. The service wraps timeouts into `RuntimeError`, so the route's `TimeoutError` handler is bypassed.
- **Independent probes:**
  - Gemini mode without a key returned **500 Internal Server Error**, expected 503.
  - A fake provider timeout was called twice and returned **502**, expected 503.
  - `AI_MAX_RETRIES=9` caused **10 provider calls**, violating the absolute one-retry limit.
- **Impact:** Users receive incorrect recovery signals, and free-tier quota/cost can be consumed by unintended retries.
- **Required correction:** Use typed provider error classes, cap validation/safety retries at one regardless of environment input, and do not retry authentication, configuration, cancellation, timeout, or ordinary upstream service failures unless explicitly specified.

### D4-004 — The timeout setting is not enforced and the frontend aborts first

- **Severity:** High
- **Evidence:** `ai_provider.py:70` stores `self.timeout`, but the call at line 92 never applies it. `frontend/src/services/api.ts:40` aborts after 15 seconds while backend configuration defaults to 20 seconds per attempt and currently permits another attempt.
- **Impact:** A valid Gemini request can be cancelled by the browser before the backend's intended processing window, producing misleading `Failed to fetch` behavior and wasting an in-flight provider request.
- **Required correction:** Apply the SDK HTTP timeout using the supported `google-genai` HTTP options, define one bounded total backend budget, set the frontend timeout above that total, and test the actual timeout state.

### D4-005 — Confirmed image evidence and prompt-trust requirements are incomplete

- **Severity:** High
- **Evidence:** The model prompt at `assessment_service.py:140-142` contains evidence and clarifications only. A confirmed `E04` image observation was present in deterministic known facts but absent from the provider prompt. The system instruction is embedded inside the adapter and does not explicitly delimit user evidence or direct the model to treat embedded instructions as untrusted data.
- **Impact:** The model ignores confirmed observations that the specification permits as text evidence, while user-entered prompt-injection text lacks the required explicit trust boundary.
- **Required correction:** Build a typed provider input from validated evidence, non-empty clarifications, and confirmed/non-rejected image observations. Use a dedicated versioned prompt constant/module with the complete Day 4 restrictions and explicit untrusted-data delimiters.

### D4-006 — Configuration, CORS, logging, and documentation are inconsistent

- **Severity:** High
- **Evidence:**
  - `backend/src/app/main.py:32` reads `ALLOWED_ORIGINS`, while both environment examples still retain the older `CORS_ORIGINS` name.
  - The code default allows only `http://localhost:5173`; independent preflights from `http://127.0.0.1:5173` and `https://solar-resolve-24.vercel.app` returned 400 unless an external environment value is supplied.
  - Root `.env.example:15` and a stale comment in `backend/.env.example:20` still name `gemini-1.5-flash`.
  - `assessments.py:133`, `:136`, `:153`, and `:156` log exception text; the service also logs the provider error text on every attempt.
- **Impact:** A misspelled or legacy variable can break production CORS, onboarding points to an obsolete model, and upstream response details may enter logs despite the no-provider-body requirement.
- **Required correction:** Use one typed configuration source and one CORS variable name, include explicit local and production origins in the deployment example, remove stale model examples, and log safe error codes/classes rather than raw provider exception text.

### D4-007 — Required Day 4 test coverage and work-report evidence are missing

- **Severity:** High
- **Evidence:** `backend/tests/test_ai_provider.py` contains six tests. It does not cover the required exact schema assertion, network timeout mapping, generic unavailability, invalid output retry, prohibited safe check, prohibited recommended action, repeated unsafe failure, hazard/insufficiency provider call counts, image inclusion/exclusion, authoritative facts, API error mapping, or non-fallback behavior.
- **Impact:** The most safety-sensitive behavior was neither implemented correctly nor protected by regression tests.
- **Required correction:** Add the full test matrix from `ANTIGRAVITY_DAY4_PROMPT.md`, then regenerate the work report from fresh command output.

## Browser and API verification evidence

| Check | Steps | Expected | Observed | Status |
| --- | --- | --- | --- | --- |
| Local synthetic happy path | Start backend with default synthetic provider; run frontend at `http://localhost:5173`; select no hazards; enter synthetic 7h→3h case; continue without image; generate | Complete result and technician brief | Result rendered with facts, gaps, possible causes, safety sections, next action, and brief; console errors: 0 | Pass |
| Synthetic API contract | POST a complete synthetic payload to `/api/v1/assessments/inline/generate` | 200 with established fields | 200; all public result keys present | Pass |
| Hazard short circuit | Patch a counting provider; submit text containing smoke | Urgent result; provider not called | `urgent_safety_escalation`; 0 calls | Pass |
| Insufficient-evidence short circuit | Patch a counting provider; submit description only | More-information result; provider not called | `more_information_needed`; 0 calls | Pass |
| Missing Gemini key | Set `AI_PROVIDER=gemini`, remove key, POST complete payload | Generic 503 | 500 Internal Server Error | Fail |
| Timeout mapping | Fake provider raises `TimeoutError`; POST complete payload | Generic 503, no improper retry | 502 after 2 calls | Fail |
| Unsafe model draft | Fake provider returns definitive claims and prohibited actions | One retry, then 502 if repeated | Completed result; definitive claims survived | Fail |
| Confirmed image prompt inclusion | Supply confirmed `E04`; inspect fake provider input | `E04` included as confirmed text evidence | `E04` absent | Fail |
| Production frontend availability | Open `https://solar-resolve-24.vercel.app` | Landing page loads | Landing page loaded | Pass |
| Live Day 4 result | Submit anonymized case through deployed frontend | Gemini-backed result and sanitized logs | Not run because deployment is pending and local blockers remain | Not Implemented |

## Review of `WORK_REPORT_DAY4.md`

| Report claim or required section | Independent assessment |
| --- | --- |
| “Passed 54/54 tests” | **Not reproducible.** Required environment result is 50 passed and 4 failed. |
| “Gemini structured output” | **Partially implemented.** Schema configuration exists, but runtime validation cannot run in the required environment and the exact schema is not asserted by a test. |
| “Model can never bypass the escalation matrix” | **False.** Definitive diagnosis text in summary/cause fields passes through; unsafe actions are silently filtered instead of invalidating the draft. |
| Credential check | **Current tree passes a generic pattern scan.** Only placeholders were found. This does not validate remote Railway secret naming or logs. |
| Dependency and lockfile changes | **Missing required report section.** The lockfile was not updated for Gemini. |
| Before/after totals | **Missing.** Baseline 48 and claimed post-change 54 are not presented as a verified comparison. |
| Local synthetic/Gemini run commands | **Missing.** |
| Explicit zero-live-call confirmation | **Missing.** |
| Known limitations and next backlog | **Missing.** Only three deployment tasks are listed. |

Correction to the early audit note: the work report does **not** claim that `uv.lock` was updated; it omits the required lockfile status entirely. Independent inspection shows the lockfile is unchanged for the Gemini dependency.

## Confirmed items skipped from full Day 3 re-audit

The following were previously validated and received only a focused regression check because Day 4 did not intentionally change them:

- Home-to-safety navigation
- Basic evidence intake
- Optional image skip path
- Result section rendering
- Technician brief rendering
- Frontend retry/edit controls (covered by the existing passing test)
- General responsive design and all individual hazard-option permutations

## Required remediation order

1. **Repair dependency reproducibility:** choose the authoritative Python environment, pin `google-genai`, update the lockfile, and make the exact backend test command runnable.
2. **Fix the safety boundary:** reject the entire unsafe/diagnostic draft, retry once only for invalid draft output, then return 502.
3. **Introduce typed provider errors and a hard retry cap:** make missing config/timeout/rate-limit/unavailability map to 503 and invalid/refused output map to 502.
4. **Enforce a real timeout budget:** apply SDK timeout settings and increase/test the frontend timeout.
5. **Complete the provider input/prompt contract:** include confirmed image observations as text, exclude rejected/unconfirmed values, and use a versioned injection-resistant prompt.
6. **Normalize configuration/security:** one CORS variable, explicit production origin, no stale model references, sanitized logs.
7. **Add every required provider/service/API regression test.**
8. **Rerun all gates and regenerate `WORK_REPORT_DAY4.md` from the actual outputs.**
9. **Only after 1–8 pass:** deploy, run one anonymized live Gemini case, inspect sanitized logs, and request another independent validation.

## Independent conclusion

Day 4 is **not accepted**. The app remains usable in deterministic synthetic mode, but Gemini mode must stay disabled until D4-001 through D4-007 are corrected and independently revalidated.

The selected model name itself is valid: Google's current official model catalog lists `gemini-3.8-flash` as a stable model with structured-output support. The failure is in this implementation and its reproducibility, not in the chosen model identifier.
