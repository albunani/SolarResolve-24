# Phase 3 Independent Validation

## Verdict

**FAIL — one production configuration blocker remains.**

The public frontend is live, points to the correct Railway backend, and the backend health endpoint returns HTTP 200. However, production CORS currently permits arbitrary origins with `Access-Control-Allow-Origin: *`. This contradicts the Phase 3 requirement to allow only the exact Vercel production origin. Phase 4 must remain locked until this is corrected and independently rechecked.

## Evidence matrix

| Check | Status | Independent evidence |
| --- | --- | --- |
| Phase 3 report committed | Pass | Commit `8ae5743` adds `WORK_REPORT_PHASE3.md`. |
| Vercel frontend available | Pass | `https://solar-resolve-24.vercel.app/` loaded successfully and rendered the SolarResolve start and safety-check screens. |
| Frontend backend URL | Pass | The deployed Vercel bundle contains `https://solarresolve-24-production.up.railway.app`. |
| Railway health endpoint | Pass | `GET https://solarresolve-24-production.up.railway.app/api/v1/health` returned HTTP 200 and `status: ok`. |
| Browser console on inspected pages | Pass | No warning or error entries were observed on the landing or safety-check screens. |
| Production CORS restriction | Fail | Preflight requests from both the Vercel origin and `https://evil.example` returned HTTP 200 with `Access-Control-Allow-Origin: *`. |
| Live Gemini assessment | Manual Check | `WORK_REPORT_PHASE3.md` states that one anonymized request passed. No second live request was made during this audit to avoid unnecessary provider usage. The report does not include sanitized status/timestamp evidence. |
| Gemini key sealed on Railway | Manual Check | The report states that it is sealed. Secret-manager UI state cannot be proven from the repository. Working-tree scanning found only the documented placeholder in `.env.example`. |
| Exact deployment identity | Partial | The report names commit `dff7a88740c121551140fb34c1b33efc28cc1d1e`, whose tree contains the V5 implementation. It omits Vercel/Railway deployment IDs and deployment timestamps. |
| Rollback readiness | Manual Check | The runbook defines rollback, but the report does not record a rollback drill or current synthetic recovery evidence. A destructive or unnecessary rollback was not performed during validation. |

## Required correction

1. In the Railway **backend service**, set `ALLOWED_ORIGINS` to exactly:

   ```text
   https://solar-resolve-24.vercel.app
   ```

2. Do not include `*`, quotes, brackets, spaces, or a trailing slash.
3. Confirm the variable is bound to the backend service rather than merely existing as an unreferenced Shared Variable.
4. Deploy the staged Railway variable change.
5. Verify the allowed-origin preflight echoes the exact Vercel origin.
6. Verify a preflight from `https://evil.example` is rejected or receives no `Access-Control-Allow-Origin` header.
7. Recheck `/api/v1/health` and the production frontend.
8. Update `WORK_REPORT_PHASE3.md` with sanitized timestamps, deployment identifiers, HTTP statuses, and the corrected CORS evidence.
9. Correct “image interpretation deferred to Phase 7” to the agreed **Phase 5** roadmap.

Do not change or reveal `GEMINI_API_KEY`. A second Gemini request is unnecessary for this CORS-only remediation unless the deployment produces an unrelated application regression.

## Antigravity remediation prompt

```text
Read VALIDATION_PHASE3.md and remediate only the remaining Phase 3 production
configuration issue. The live Railway API currently responds to CORS preflight
requests from both the production Vercel origin and https://evil.example with
Access-Control-Allow-Origin: *.

Set the Railway backend service variable ALLOWED_ORIGINS to exactly
https://solar-resolve-24.vercel.app with no wildcard, quotes, brackets, spaces,
or trailing slash. Confirm that the service actually references the variable,
deploy the staged change, and verify that the intended Vercel origin is allowed
while https://evil.example is rejected or receives no allow-origin header.

Recheck /api/v1/health and the Vercel landing/safety screens. Do not change,
display, rotate, or copy GEMINI_API_KEY. Do not make another paid/live Gemini
request for this CORS-only correction unless an unrelated regression requires it.

Update WORK_REPORT_PHASE3.md with sanitized deployment timestamps/IDs, HTTP
statuses, exact CORS verification results, and change the incorrect Phase 7 image
reference to Phase 5. Commit only the corrected report if no source change is
needed. Do not begin Phase 4. Report back for independent revalidation.
```
