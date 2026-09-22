# Antigravity Final 4-Hour Submission Sprint

## Mission

Deliver a polished, stable, publicly accessible SolarResolve MVP before the submission deadline. Work sequentially, preserve all existing functionality, and make only low-risk changes that directly improve production reliability or the demonstration.

## Source of truth

Read these documents first:

1. `PROJECT.md`
2. `VALIDATION_PHASE3.md`
3. `PHASE3_PRODUCTION_CONFIGURATION.md`
4. `requirement.md`

Do not expand the product beyond the declining-battery-runtime scenario.

## Time and scope rules

- Total available time is under four hours.
- Complete Must-Have functionality before any polish.
- Do not redesign the architecture.
- Do not add authentication, databases, payments, persistent uploads, PDF ingestion, or new infrastructure.
- Do not implement live image interpretation during this sprint unless every preceding gate passes with at least 60 minutes remaining.
- Keep the existing optional synthetic/demo image path, but label its behavior honestly if it is shown.
- Never expose or print `GEMINI_API_KEY`.
- Use synthetic or deliberately anonymized test data only.
- Commit each completed phase separately.

## Phase A — Production blocker correction — maximum 20 minutes

1. Correct Railway backend CORS so `ALLOWED_ORIGINS` is exactly:

   ```text
   https://solar-resolve-24.vercel.app
   ```

2. Ensure the variable is bound to the backend service, not merely stored as an unreferenced Shared Variable.
3. Deploy the Railway configuration change.
4. Verify:
   - intended Vercel-origin preflight succeeds and returns that exact origin;
   - `https://evil.example` is rejected or receives no allow-origin header;
   - `/api/v1/health` returns HTTP 200;
   - the Vercel landing and safety-check screens still load.
5. Do not make another live Gemini request for this CORS-only change unless the frontend-to-backend flow cannot otherwise be verified.

If CORS cannot be corrected in 20 minutes, set `AI_PROVIDER=synthetic`, preserve the functioning public demo, document the limitation, and continue to Phase B.

## Phase B — Phase 4 production acceptance — maximum 50 minutes

Run a focused production acceptance pass. Do not perform broad exploratory refactoring.

Verify these paths:

1. Normal anonymized declining-runtime case produces a structured result.
2. Clear hazard input produces urgent safety escalation without ordinary diagnosis.
3. Missing evidence produces a useful correction or more-information state.
4. Provider failure preserves evidence and exposes Retry and Edit Evidence.
5. Edit Evidence returns directly to populated intake.
6. Technician brief is complete and copyable.
7. Mobile viewport has no horizontal overflow.
8. Browser console shows no application errors during the happy path.
9. Production output contains no confirmed diagnosis or prohibited electrical procedure.
10. No credential, raw provider payload, internal prompt, or stack trace appears in browser or Railway logs.

Run the established automated gates once:

```text
Backend tests
Backend lint
Frontend tests
Frontend lint
Frontend production build
Dependency integrity checks
```

Fix only submission-blocking failures. Do not polish internal code that already passes.

Create `WORK_REPORT_PHASE4.md` with exact commands, totals, production URLs, sanitized timestamps/status codes, deployed commit SHA, and remaining manual checks.

## Phase C — Demo polish — maximum 45 minutes

Only after Phase B passes:

1. Confirm the landing page explains the supported scenario and decision-support boundary immediately.
2. Confirm primary CTA labels are clear and consistent.
3. Confirm loading, success, hazard, missing-information, and provider-error states look intentional.
4. Confirm visible copy is concise, confident, and free of placeholder text.
5. Confirm buttons have visible hover and keyboard-focus states.
6. Confirm the primary flow works at approximately 375 px and 1280 px widths.
7. Make only small, reversible presentation fixes.

Do not replace the visual system or rewrite working components.

## Phase D — Phase 5 decision — maximum 5 minutes

Live image/Vision integration is a Should-Have and is deferred for this submission sprint unless all of the following are true:

- Phase A passed.
- Phase B passed.
- Phase C passed.
- At least 60 minutes remain.
- The integration can reuse the existing provider adapter without changing the public result contract.

Default decision: **do not implement live image interpretation now**.

Retain continue-without-image behavior. If the UI exposes synthetic extraction, clearly describe it as a demonstration path and do not imply that arbitrary uploaded images are interpreted live.

Record this decision in the final report.

## Phase E — Phase 6 submission package — reserve at least 75 minutes

Prepare these artifacts using only verified claims:

### 1. Demo scenario

Use one synthetic case:

- battery previously lasted about seven hours;
- now lasts about three hours;
- decline occurred over approximately two weeks;
- refrigerator, television, four lights, and two fans are used;
- no urgent hazard is reported;
- some technical specifications remain unknown.

Demonstrate:

1. Landing and safety boundary.
2. Evidence intake.
3. AI-generated structured assessment.
4. Separation of facts, unknowns, and possible causes.
5. Safe next action.
6. Technician-ready brief.

### 2. Submission copy

Create `SUBMISSION_PACKAGE.md` containing:

- project title;
- one-sentence pitch;
- problem statement;
- target user;
- solution overview;
- how Gemini is used;
- responsible-AI and safety approach;
- key differentiator;
- current scope and honest limitations;
- technology stack;
- public demo URL;
- GitHub URL;
- 60-second demo narration;
- 2–3 minute demo narration;
- concise judging-criteria mapping.

Do not claim live image AI if it was not implemented and verified.

### 3. Final production check

Immediately before handoff:

- open the public URL in a private browser window;
- complete the exact demo path once;
- confirm the deployed commit SHA;
- confirm health status;
- confirm no console error;
- confirm no sensitive data appears;
- capture screenshots of the landing, intake, assessment, and technician brief;
- do not redeploy after this final check unless correcting a submission blocker.

## Stop conditions

Stop adding features immediately if any of these occur:

- production becomes unavailable;
- safety regression appears;
- live Gemini repeatedly returns errors;
- a credential or sensitive value appears anywhere public;
- less than 75 minutes remain and the submission package is incomplete.

When stopped, restore the last known working deployment and finish the submission package.

## Final Definition of Done

- [ ] Public Vercel frontend loads.
- [ ] Railway health endpoint returns HTTP 200.
- [ ] Production CORS no longer permits arbitrary browser origins, or production is explicitly left in synthetic mode with the limitation documented.
- [ ] One complete text-first assessment works publicly.
- [ ] Hazard behavior remains deterministic.
- [ ] Output avoids confirmed diagnosis and unsafe electrical instructions.
- [ ] Technician brief is available.
- [ ] Mobile and desktop demonstration paths work.
- [ ] Automated gates pass.
- [ ] No secret is present in Git, frontend assets, reports, screenshots, or logs.
- [ ] `WORK_REPORT_PHASE4.md` is complete.
- [ ] `SUBMISSION_PACKAGE.md` is complete.
- [ ] Final public URLs and deployed SHA are recorded.

## Required final response

Report:

1. Current production mode: `gemini` or `synthetic`.
2. Production URLs.
3. Deployed commit SHA.
4. CORS verification result.
5. Automated test totals.
6. Production scenario results.
7. Whether live image interpretation was deferred.
8. Files created or modified.
9. Remaining submission actions requiring the project owner.

