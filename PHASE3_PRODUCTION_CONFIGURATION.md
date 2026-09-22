# Phase 3 Production Configuration Runbook

## Document status

- **Project:** SolarResolve
- **Phase:** Phase 3 — Secure Production Configuration
- **Purpose:** Configure and verify Vercel and Railway without exposing credentials or enabling live Gemini before the implementation passes independent validation.
- **Application mode during setup:** `AI_PROVIDER=synthetic`
- **Live-provider gate:** Do not change to `AI_PROVIDER=gemini` until `VALIDATION_DAY4_V5.md` records an overall **Pass** with no unresolved Critical or High findings.
- **Owner:** Project owner performs platform configuration; Antigravity implements and reports; Codex independently validates.

## 1. Objective

Phase 3 establishes a secure, reproducible production configuration for the existing frontend and backend. It must prove that:

1. Vercel can reach the deployed Railway API.
2. Railway exposes a healthy backend using the platform-provided port.
3. CORS permits the exact production frontend origin.
4. Gemini credentials remain server-side and secret.
5. Synthetic production mode works before any live model request is enabled.
6. Live Gemini can be activated through configuration only, then rolled back immediately if verification fails.

This phase does **not** add features, modify the API contract, enable image interpretation, introduce real customer data, or redesign the UI.

## 2. Configuration architecture

```text
User browser
    |
    | HTTPS
    v
Vercel frontend
    | VITE_API_BASE_URL = Railway origin
    | POST /api/v1/assessments/inline/generate
    v
Railway FastAPI backend
    | deterministic hazard and evidence checks
    | AI_PROVIDER = synthetic  <-- current safe setting
    |
    +-- after V5 approval only --> Gemini API
          GEMINI_API_KEY stays on Railway
```

Anything prefixed with `VITE_` is bundled for browser use and must be treated as public. The Gemini key must never be stored in Vercel, frontend files, Git, Markdown reports, screenshots, logs, prompts, or chat.

## 3. Required platform variables

### 3.1 Railway backend

Configure these as **service variables** on the backend service. If they already exist as Railway Shared Variables, explicitly share/reference them from the backend service; merely creating a shared variable does not guarantee that the service receives it.

| Variable | Required value now | Live value after V5 Pass | Security requirement |
| --- | --- | --- | --- |
| `AI_PROVIDER` | `synthetic` | `gemini` | Non-secret; keep synthetic until activation gate passes |
| `GEMINI_API_KEY` | Rotated replacement key | Same rotated replacement key | Secret; seal it; never copy it into reports or chat |
| `GEMINI_MODEL` | `gemini-3.8-flash` | `gemini-3.8-flash` | Non-secret; configurable |
| `AI_TIMEOUT_SECONDS` | `20` | `20` | Non-secret |
| `ALLOWED_ORIGINS` | Exact Vercel production origin | Same | Comma-separated origins; no wildcard and no trailing slash |
| `ENVIRONMENT` | `production` | `production` | Non-secret |

Example non-secret values:

```dotenv
AI_PROVIDER=synthetic
GEMINI_MODEL=gemini-3.8-flash
AI_TIMEOUT_SECONDS=20
ALLOWED_ORIGINS=https://solar-resolve-24.vercel.app
ENVIRONMENT=production
```

Do not manually define `PORT` unless Railway specifically requires it for this service. Railway supplies `PORT`, and the repository start command already listens on `0.0.0.0:$PORT`.

### 3.2 Vercel frontend

Configure exactly one required application variable for the Production environment:

```dotenv
VITE_API_BASE_URL=https://<your-railway-public-domain>
```

Rules:

- Use the public Railway HTTPS origin only, for example `https://example.up.railway.app`.
- Do not append `/api/v1`, `/health`, or a trailing slash.
- Do not create `VITE_GEMINI_API_KEY`, `GEMINI_API_KEY`, `AI_PROVIDER`, or other backend secrets in Vercel.
- After changing a Vercel variable, redeploy the frontend because changes apply only to new deployments.
- Add the variable to Preview only if preview deployments must call the production backend. If enabled, add the exact preview origin to Railway CORS deliberately rather than using `*`.

## 4. Phase 3A — Safe configuration and synthetic verification

The project owner has reported that the initial platform setup and Vercel redeployment are complete. Perform the checks below without revealing any secret value.

### Step 1 — Verify Railway variable binding

1. Open the Railway project and select the **backend service**, not only Project Settings.
2. Open **Variables**.
3. Confirm all six variables in section 3.1 appear in the backend service environment.
4. If using Shared Variables, confirm each is shared/referenced by the backend service.
5. Confirm the key name is exactly `GEMINI_API_KEY`; spaces such as `Gemini API Key` are invalid for this application.
6. Use the variable menu to seal `GEMINI_API_KEY`.
7. Never reveal the value to verify it. Presence and sealed status are sufficient.

### Step 2 — Apply Railway staged changes

Adding or editing Railway variables creates staged changes. Review and deploy those changes, then wait for the deployment to reach **Success**.

Expected runtime command from the repository:

```text
cd backend && python -m uvicorn src.app.main:app --host 0.0.0.0 --port $PORT
```

### Step 3 — Configure the Railway health check

In the Railway backend service settings, set:

```text
Healthcheck path: /api/v1/health
```

Expected response is HTTP `200` with a JSON body containing at least:

```json
{
  "status": "ok",
  "service": "SolarResolve API"
}
```

Railway health checks protect deployment cutover; they are not continuous monitoring after the deployment completes.

### Step 4 — Verify the deployed backend directly

Open:

```text
https://<your-railway-public-domain>/api/v1/health
```

Pass conditions:

- HTTPS loads successfully.
- Status is `200`.
- The response reports `status: ok`.
- No secret, stack trace, or internal prompt appears.

### Step 5 — Verify the Vercel-to-Railway connection in synthetic mode

1. Open the production Vercel URL in a private/incognito window.
2. Complete one synthetic, non-personal assessment case.
3. Confirm the assessment result renders normally.
4. In browser developer tools, confirm the assessment request targets:
   `https://<railway-domain>/api/v1/assessments/inline/generate`.
5. Confirm there is no CORS error and no mixed-content error.
6. Confirm Railway still has `AI_PROVIDER=synthetic`.

Use only invented or deliberately anonymized evidence. Do not upload real customer information or images.

### Step 6 — Record deployment evidence

Record identifiers, not credentials:

| Evidence | Value |
| --- | --- |
| Vercel production URL | `<record URL>` |
| Railway public URL | `<record URL>` |
| Git commit deployed by Vercel | `<record SHA>` |
| Git commit deployed by Railway | `<record SHA>` |
| Railway deployment status | `<Success/Fail>` |
| Health check timestamp (Africa/Lagos) | `<record time>` |
| Synthetic end-to-end result | `<Pass/Fail>` |

Do not place environment-variable values, authorization headers, full request bodies, or provider responses in the evidence record.

## 5. Mandatory gate before live Gemini activation

Phase 3B remains locked until every item below passes:

- [ ] Antigravity finishes V5 and supplies its work report.
- [ ] Codex performs an independent audit of the committed V5 implementation.
- [ ] `VALIDATION_DAY4_V5.md` has an overall **Pass** verdict.
- [ ] No unresolved Critical or High safety finding remains.
- [ ] Backend tests, frontend tests, lint, and production build all pass.
- [ ] The affirmative-causal-diagnosis bypass found in V4 is demonstrably blocked.
- [ ] The exact validated commit SHA is the commit selected for deployment.
- [ ] Secret scanning finds no real Gemini key in Git-tracked files or reports.
- [ ] Synthetic production verification in section 4 passes.

If any box is unchecked, leave `AI_PROVIDER=synthetic` and stop before Phase 3B.

## 6. Phase 3B — Controlled Gemini activation

Perform this only after the gate in section 5 passes.

### Step 1 — Confirm the deployment target

Confirm Railway is deploying the exact commit SHA accepted in `VALIDATION_DAY4_V5.md`. Do not activate Gemini against an uncommitted or different working tree.

### Step 2 — Activate Gemini

In the Railway backend service variables, change only:

```dotenv
AI_PROVIDER=gemini
```

Leave `GEMINI_MODEL`, `AI_TIMEOUT_SECONDS`, CORS, and the sealed replacement key unchanged. Review and deploy the staged change.

### Step 3 — Recheck backend health

Verify `/api/v1/health` returns HTTP `200`. This endpoint does not call Gemini, so it proves service availability but not provider availability.

### Step 4 — Run one controlled live smoke test

Use one synthetic, non-personal text-only case through the production Vercel frontend.

Pass conditions:

- A structured assessment completes.
- The public `AssessmentResult` shape remains intact.
- The result uses uncertainty language and does not claim a confirmed component failure.
- No prohibited repair, disassembly, probing, wiring, bypass, or protected-setting instruction appears.
- Retry/Edit Evidence remain available if the provider fails.
- No raw provider payload, key, prompt, or stack trace appears in the UI or logs.

Do not test live image interpretation; it remains out of scope.

### Step 5 — Inspect sanitized operational evidence

Check the Railway deployment and application logs for:

- successful startup;
- a single expected assessment request;
- no credential or authorization-header output;
- no full user evidence or provider response body;
- no uncontrolled retry loop; and
- no unexpected `500`, `502`, or `503` response.

Record only status codes, timestamps, request IDs if non-sensitive, and the deployed commit SHA.

### Step 6 — Maintain zero-budget controls

- Make only the one controlled live request needed for acceptance.
- Keep automated tests and routine local development on the synthetic provider.
- Do not run provider benchmarks or repeated manual generations.
- Review current Gemini and Railway usage/quota dashboards after the smoke test.
- Treat free-tier access as limited and changeable, not guaranteed.

## 7. Rollback procedure

Rollback immediately if the live smoke test exposes unsafe output, configuration failure, repeated provider errors, unexpected cost/usage, data leakage, or a frontend regression.

1. In Railway, change `AI_PROVIDER` back to `synthetic`.
2. Review and deploy the staged variable change.
3. Wait for the deployment to reach **Success**.
4. Verify `/api/v1/health` returns `200`.
5. Run one synthetic assessment to confirm service recovery.
6. Record the failure category, timestamp, deployed SHA, and sanitized reproduction steps.
7. Do not paste the provider response, key, or sensitive evidence into a report.
8. Return the defect to Antigravity for remediation and require another independent validation before reactivation.

Rollback is a configuration change; do not delete the project, key, service, or deployment.

## 8. Acceptance criteria / Definition of Done

Phase 3 is complete only when:

- [ ] Railway backend variables use the exact names in section 3.1.
- [ ] `GEMINI_API_KEY` is rotated, service-bound, and sealed.
- [ ] No Gemini credential exists in Vercel or any `VITE_*` variable.
- [ ] Vercel `VITE_API_BASE_URL` is the Railway origin with no API path appended.
- [ ] Railway health check uses `/api/v1/health` and the deployment is healthy.
- [ ] `ALLOWED_ORIGINS` contains the exact Vercel origin and no wildcard.
- [ ] The Vercel frontend successfully completes the primary loop in synthetic mode.
- [ ] The exact production deployment SHAs are recorded.
- [ ] Independent V5 validation passes before Gemini activation.
- [ ] One controlled text-only Gemini smoke test passes using synthetic data.
- [ ] Production logs contain no key, sensitive evidence, raw model response, or stack trace.
- [ ] The rollback procedure has been reviewed and remains immediately available.

## 9. Troubleshooting guide

| Symptom | Likely cause | Corrective action |
| --- | --- | --- |
| Browser calls `localhost:8000` | Vercel variable missing or deployment predates the change | Set `VITE_API_BASE_URL` for Production and redeploy Vercel |
| Request URL contains `/api/v1/api/v1` | API path was appended to `VITE_API_BASE_URL` | Use only the Railway origin |
| Browser reports a CORS failure | `ALLOWED_ORIGINS` does not exactly match the Vercel origin | Correct the origin, remove trailing slash, deploy Railway changes |
| Railway service starts but health check fails | Incorrect path or application not listening on Railway `PORT` | Use `/api/v1/health`; retain the repository start command |
| Gemini mode returns configuration unavailable | Key not bound to backend service or variable name is incorrect | Confirm exact `GEMINI_API_KEY` service binding without exposing its value |
| Variable edit appears to do nothing | Railway/Vercel change was not deployed | Deploy Railway staged changes or redeploy Vercel |
| Live provider fails | Quota, model access, timeout, network, or provider issue | Roll back to `synthetic`; retain evidence; diagnose before reactivation |

## 10. Official platform references

- [Railway variables](https://docs.railway.com/variables)
- [Railway variable reference](https://docs.railway.com/variables/reference)
- [Railway health checks](https://docs.railway.com/deployments/healthchecks)
- [Railway environment isolation](https://docs.railway.com/guides/isolate-staging-production)
- [Railway deployment actions](https://docs.railway.com/deployments/deployment-actions)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Vercel Vite deployment](https://vercel.com/docs/frameworks/frontend/vite)

## 11. Handoff message for the production-configuration operator

```text
Follow PHASE3_PRODUCTION_CONFIGURATION.md exactly.

Start with Phase 3A only. Verify Railway service-variable binding, seal the
Gemini key, configure /api/v1/health, and prove the Vercel-to-Railway flow
with AI_PROVIDER=synthetic. Record URLs, deployment commit SHAs, timestamps,
and Pass/Fail results, but never record secret values or real user evidence.

Do not set AI_PROVIDER=gemini until VALIDATION_DAY4_V5.md has an overall Pass
with no unresolved Critical or High findings. Once that gate passes, deploy
the exact validated commit, perform Phase 3B's single text-only synthetic-data
smoke test, inspect sanitized logs, and roll back immediately to synthetic if
any safety, privacy, provider, or integration check fails.
```
