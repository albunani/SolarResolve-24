# Antigravity Day 4 Implementation Prompt

## Mission

Implement the SolarResolve Day 4 text-assessment AI integration. Use Google Gemini through a provider-neutral adapter while preserving every validated Day 3 behavior and the strict zero-budget/no-card boundary.

## Reference order

Read these documents before changing code:

1. `PROJECT.md` — product scope and acceptance criteria; highest authority.
2. `DAY4_AI_INTEGRATION.md` — Day 4 architecture, safety, tests, and Definition of Done.
3. `AI_INTEGRATION_PLAN.md` — approved provider and zero-budget decision.
4. `docs/SAFETY_POLICY.md` — prohibited actions and escalation behavior.
5. `backend/src/models/assessment.py` — current public request/result contract.
6. `docs/TECHNICAL_DESIGN.md` and `docs/API.md` — existing boundaries and routes.
7. `CODEX_HANDOFF.md` — deployment context only.

If documents conflict, preserve `PROJECT.md`, the existing public API contract, and the stricter safety behavior. Record any unresolved conflict in the work report instead of inventing a requirement.

## Current verified baseline

- Frontend lint passes with zero warnings.
- Frontend production build passes.
- Frontend tests pass 8/8.
- Backend tests pass 48/48.
- Vercel frontend and Railway backend are deployed and connected.
- `backend/src/services/assessment_service.py` currently performs deterministic assessment generation.
- `backend/src/safety/hazard_policy.py` is the deterministic safety authority.
- The public frontend expects the current `AssessmentResult` field names.

Do not regress or unnecessarily rewrite this working baseline.

## Implementation scope

### 1. Add a provider-neutral AI boundary

Create a small AI layer under the backend using project-appropriate filenames. It must contain:

- an `AssessmentAIProvider` protocol or abstract interface;
- an internal Pydantic `ModelAssessmentDraft` schema;
- a Gemini implementation;
- a deterministic synthetic implementation; and
- provider construction/configuration isolated from API routes.

The service layer must depend on the interface. Do not import the Gemini SDK from FastAPI route modules or frontend code.

### 2. Use the Gemini API

- Add the official `google-genai` Python SDK to backend dependencies and update the lockfile.
- Use Gemini schema-constrained structured output parsed into `ModelAssessmentDraft`.
- Default `GEMINI_MODEL` to `gemini-3.8-flash`.
- Do not use legacy free-form JSON prompting when schema-constrained output is available.
- Detect refusals, incomplete responses, missing parsed output, timeouts, rate limits, and provider errors.
- Do not log the API key, raw provider response, or full user evidence.
- Treat schema compliance as structural validation only. Continue Pydantic and semantic safety validation in application code.

### 3. Keep authoritative fields deterministic

The model may propose only:

- normal assessment status;
- summary;
- possible causes using approved confidence labels;
- safe checks;
- recommended next action.

The application must continue generating:

- assessment ID and timestamp;
- known facts and their sources;
- missing/uncertain evidence;
- urgent escalation;
- insufficient-evidence result;
- prohibited actions;
- disclaimer; and
- technician brief.

Do not accept model-generated facts as confirmed evidence.

### 4. Preserve and strengthen the safety sequence

Implement this order:

1. Validate the request with Pydantic.
2. Run the existing deterministic hazard scan over all relevant text evidence and clarification answers.
3. Return urgent escalation immediately when a hazard is detected. Do not call the model.
4. Run the existing evidence-sufficiency rule. Return `more_information_needed` when insufficient. Do not call the model.
5. Send confirmed evidence to the selected provider.
6. Parse the schema-constrained draft.
7. Scan model-generated safe checks, recommended action, and explanatory text for prohibited instructions or definitive diagnosis language.
8. Permit at most one regeneration for invalid or unsafe model output.
9. If validation still fails, return a controlled recoverable error. Never return unsafe, partial, or synthetic success.
10. Assemble the final `AssessmentResult` and deterministic technician brief.

Do not weaken or duplicate the safety vocabulary outside the existing safety module unless a shared extension is necessary and tested.

### 5. Add typed configuration

Support:

```text
AI_PROVIDER=synthetic|gemini
GEMINI_API_KEY=<server-side secret>
GEMINI_MODEL=gemini-3.8-flash
AI_TIMEOUT_SECONDS=20
AI_MAX_RETRIES=1
```

Requirements:

- Default local/test provider: `synthetic`.
- Set the provider options to `synthetic|gemini`, not `synthetic|openai`.
- Missing Gemini key while `AI_PROVIDER=gemini`: controlled configuration failure.
- Add or update `.env.example` with placeholders only.
- Never add a real key to the repository, frontend, tests, logs, or report.
- Keep provider/model selection changeable without source edits.
- Never ask the user to paste the key into chat. The user will configure it directly in an ignored local environment file and Railway secrets.
- Free-tier access and quotas are not permanent guarantees. Handle rate limits as recoverable service failures.
- Send only synthetic or deliberately anonymized evidence during the free-tier MVP phase.

### 6. Preserve recoverable frontend behavior

The existing Retry and Edit Evidence behavior must continue working.

- Map upstream timeout, rate limit, and unavailability to a generic `503` response.
- Map provider refusal, incomplete output, or repeated validation/safety failure to a generic `502` response.
- Do not expose prompt text, provider bodies, stack traces, or credentials.
- Ensure the frontend timeout exceeds the intended backend processing window.
- Preserve all user-entered evidence after failure.

### 7. Keep the synthetic adapter

Retain deterministic behavior for tests and local development. Do not use it as a silent production fallback after a Gemini request fails.

### 8. Restrict CORS during deployment preparation

Replace the temporary wildcard production CORS policy with environment-configured origins that support:

- `https://solar-resolve-24.vercel.app` in production; and
- explicit local Vite origins for development.

Do not combine wildcard origins with credentials.

### 9. Remove temporary deployment markers only when safe

- Replace the hard-coded `CORS_FIX_DEPLOYED_12345` version marker with a normal application version response or documented build version.
- Treat root `test_cors.py` as a temporary diagnostic. Do not delete it unless you confirm it is untracked and no longer needed; report the decision.

## Required automated tests

Add tests for:

1. Valid Gemini structured response parsing.
2. Exact draft schema use.
3. Provider selection.
4. Synthetic operation without an API key.
5. Missing key in Gemini mode.
6. Timeout/network failure.
7. Rate limiting/provider unavailability.
8. Refusal or incomplete response.
9. Invalid structured output.
10. Prohibited instruction in a safe check.
11. Prohibited instruction in the recommended action.
12. At most one permitted regeneration.
13. Repeated invalid/unsafe output returns an error.
14. Hazard input short-circuits before the provider call.
15. Insufficient evidence short-circuits before the provider call.
16. Confirmed image observations may enter evidence; unconfirmed/rejected observations do not.
17. Known facts cannot be supplied or invented by the model.
18. Public `AssessmentResult` response compatibility.
19. Frontend recoverable-error behavior and input preservation.

All tests must mock the provider or inject a fake adapter. Automated tests must make zero live network calls.

## Commands and quality gates

Run the project's actual commands and report exact output totals:

```powershell
cd backend
.\venv\Scripts\python.exe -m pytest -q

cd ..\frontend
npm run lint
npm run build
npm exec -- vitest run --reporter=verbose
```

If dependencies change, update both declared dependency files and the existing lockfile consistently.

Do not claim success when a command failed, timed out, was skipped, or produced warnings that contradict the report.

## Do not implement

- Live image extraction
- PDF/manual ingestion
- Vector database or retrieval system
- Accounts or persistent case storage
- Chat interface
- Payments
- UI redesign
- Additional solar-fault scenarios
- Automatic repair guidance
- Real provider calls inside tests
- Silent synthetic fallback in production

## Definition of Done

The implementation is complete only when every checkbox in Section 12 of `DAY4_AI_INTEGRATION.md` is satisfied or explicitly recorded as a manual deployment check.

At minimum:

- the synthetic provider works locally without credentials;
- the Gemini provider is selectable through environment configuration;
- the public API contract remains unchanged;
- deterministic hazard and insufficiency short circuits make no provider call;
- invalid or unsafe model output cannot reach the user;
- provider failures are recoverable;
- no secret is committed or logged;
- all automated quality gates pass; and
- the working Day 3 flow has one regression smoke test.

## Work report

Create `WORK_REPORT_DAY4.md` containing:

1. Summary of the implemented architecture.
2. Exact modified and created files.
3. Environment variables added, with placeholders only.
4. Dependency and lockfile changes.
5. Exact test/lint/build commands and their results.
6. Test totals before and after Day 4.
7. Safety tests and short-circuit evidence.
8. Confirmation that automated tests made no live provider calls.
9. Local run commands for synthetic mode.
10. Local run commands for Gemini mode without exposing the key.
11. Deployment steps still requiring the user, including setting Railway secrets.
12. Manual checks not completed.
13. Known limitations and the next backlog.

Stop after producing the work report. Do not declare independent validation complete. Codex performs the separate Day 4 revalidation.
