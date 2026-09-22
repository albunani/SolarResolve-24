# SolarResolve Remediation V2 — Independent Revalidation Checklist

## Purpose

Use this checklist only after Antigravity finishes `ANTIGRAVITY_REMEDIATION_PROMPT_V2.md` and creates `WORK_REPORT_REMEDIATION_V2.md`.

The audit must be performed from a stable workspace with Antigravity no longer editing files. Do not modify application source during revalidation.

The final output will be `VALIDATION_REMEDIATION_V2.md`.

## Status labels

- **Pass:** independently reproduced and meets the acceptance criterion.
- **Fail:** independently reproduced behavior contradicts the criterion.
- **Manual Check:** requires a human/device/environment check that cannot be automated reliably.
- **Not Implemented:** the required behavior is absent.
- **Blocked:** another verified failure prevents this check from running.

## 1. Stable-environment proof

- [ ] Record the revision or working-tree snapshot being tested.
- [ ] Confirm Antigravity has stopped editing.
- [ ] Stop stale frontend/backend processes.
- [ ] Start one clean frontend process.
- [ ] Start one clean backend process.
- [ ] Record commands, ports, and process start times.
- [ ] Confirm the frontend calls the freshly started backend.
- [ ] Confirm `GET /api/v1/health` returns HTTP 200.

## 2. Automated quality gate

Run and record exit code, pass/fail totals, warnings, and failures:

```powershell
cd frontend
npm run lint
npm exec -- vitest run --reporter=verbose
npm run build

cd ..
backend\venv\Scripts\python.exe -m pytest -q
```

Required outcome:

- [ ] Lint passes.
- [ ] Production build passes.
- [ ] All frontend tests pass.
- [ ] All backend tests pass.
- [ ] Tests include the frontend/backend assessment request contract.
- [ ] Tests include successful assessment rendering and technician-brief copying.
- [ ] Tests include meaningful validation assertions rather than passing for an unrelated schema error.

## 3. Browser scenario matrix

### Scenario A — Text-only happy path

1. Open Home.
2. Select the primary CTA.
3. Select none observed on the Safety screen.
4. Enter a valid declining-runtime case and at least one load.
5. Continue without an image.
6. Review/answer clarification questions.
7. Generate the assessment.

Expected:

- [ ] Every transition succeeds.
- [ ] No HTTP 422 or `Failed to fetch` error appears.
- [ ] The Assessment screen renders.
- [ ] No uncaught console error occurs.

### Scenario B — Assessment completeness

Verify the result contains:

- [ ] assessment status;
- [ ] summary;
- [ ] known facts with source labels;
- [ ] missing or uncertain information;
- [ ] possible causes using only approved confidence labels;
- [ ] safe checks;
- [ ] prohibited actions;
- [ ] recommended next action;
- [ ] disclaimer; and
- [ ] technician brief.

### Scenario C — Technician brief

- [ ] Brief includes every item required by `PROJECT.md`.
- [ ] Facts and professional investigation areas are visibly distinct.
- [ ] Possibilities are not converted into diagnoses.
- [ ] Copy action copies the complete brief.
- [ ] Copied text remains readable as plain text.
- [ ] Copy success is announced accessibly.
- [ ] Copy failure provides a usable fallback.

### Scenario D — Initial hazards

Test each hazard separately:

- [ ] Smoke or fire.
- [ ] Burning smell.
- [ ] Battery damage signs.
- [ ] Exposed or sparking conductors.
- [ ] Electric shock.
- [ ] Severe or unusual heat.
- [ ] Water ingress.

For each:

- [ ] Normal troubleshooting stops.
- [ ] No cause ranking appears.
- [ ] Warning forbids touch, opening, disconnecting, probing, and repair.

### Scenario E — Late hazard and language context

- [ ] Affirmative hazard text escalates.
- [ ] Clear negative text such as “There is no smoke or exposed wiring” follows the documented negative-phrase behavior.
- [ ] Ambiguous hazard text cannot silently continue as safe.
- [ ] Hazard text in a clarification answer is caught.
- [ ] Confirmed hazardous image evidence is caught.

### Scenario F — Input validation

- [ ] Empty description is rejected.
- [ ] Negative previous runtime is rejected.
- [ ] Negative current runtime is rejected.
- [ ] Error is field-specific and associated with its control.
- [ ] Focus moves to the first invalid field.
- [ ] Entered values remain available after correction.
- [ ] Unknown technical details are accepted.

### Scenario G — Failure recovery

- [ ] Backend unavailable produces an honest recoverable error.
- [ ] HTTP 4xx is not shown as success.
- [ ] HTTP 5xx is not shown as success.
- [ ] Timeout is recoverable.
- [ ] Malformed success payload is rejected.
- [ ] Retry preserves and resubmits the same evidence.
- [ ] Edit Evidence returns without losing the case.
- [ ] Repeated clicks do not create duplicate generation requests.

### Scenario H — Route and state guards

- [ ] Direct `/intake` entry redirects to the earliest valid screen.
- [ ] Direct `/image-evidence` entry redirects safely.
- [ ] Direct `/clarification` entry redirects safely.
- [ ] Direct `/assessment` entry redirects safely.
- [ ] Refresh behavior matches the documented ephemeral-state limitation.
- [ ] Start New Assessment clears the old case.

### Scenario I — Optional image flow

- [ ] Continue without image works.
- [ ] Unsupported file type is rejected.
- [ ] Oversized file is rejected.
- [ ] Synthetic fixture returns clear, uncertain, and unreadable items.
- [ ] Each observation can be confirmed, corrected, or rejected.
- [ ] Only confirmed/corrected values become facts.
- [ ] Extraction failure offers replace, manual entry, or continue without image.
- [ ] Image text cannot override safety or output rules.

### Scenario J — Accessibility and responsive layout

Complete the full text-only path with keyboard only at 320 px and 1280 px.

Verify all screens at 320, 390, 768, 1024, 1280, and 1440 px:

- [ ] No horizontal overflow.
- [ ] Primary actions remain visible and operable.
- [ ] Focus indicator is visible.
- [ ] Focus order is logical.
- [ ] Labels and errors are programmatically associated.
- [ ] Alerts/status messages are announced.
- [ ] Heading order is logical.
- [ ] Functionality survives 200% zoom.
- [ ] Reduced-motion preference is respected.

## 4. Must-Have acceptance matrix

Create one evidence row for every acceptance criterion under:

1. Hazard screening and safety escalation.
2. Guided problem and evidence intake.
3. Structured, safety-aware assessment.
4. Technician-ready brief.

Each row must include:

| Field | Required content |
| --- | --- |
| Requirement | Exact criterion from `PROJECT.md` |
| Status | Pass, Fail, Manual Check, Not Implemented, or Blocked |
| Evidence | Test name, browser observation, console/network result, or screenshot |
| Reproduction | Short deterministic steps |
| Impact | User-visible consequence |

## 5. Evidence requirements

- Capture screenshots for the happy-path result, technician brief, each distinct failure class, hazard escalation, mobile layout, and desktop layout.
- Record the browser URL and viewport for every screenshot.
- Record browser console errors after each main interaction.
- Record assessment endpoint status and response shape.
- Do not use source-code presence as proof that a user-facing feature works.
- Do not use `WORK_REPORT_REMEDIATION_V2.md` as proof without reproducing its claims.

## 6. Final decision

The MVP may be marked **Green for the next milestone** only if:

- [ ] Every Must-Have acceptance criterion is Pass.
- [ ] No P0 or P1 defect remains.
- [ ] All required automated checks pass.
- [ ] The complete browser flow passes on mobile and desktop.
- [ ] No uncaught application error appears.
- [ ] Safety checks pass.
- [ ] Technician-brief copy behavior passes.
- [ ] Known limitations are accurate and do not break a Must-Have criterion.

If any condition fails:

1. Mark the validation **Fail** or **Incomplete**.
2. List only the remaining defects in priority order.
3. Create `ANTIGRAVITY_REMEDIATION_PROMPT_V3.md` from those defects.
4. Repeat implementation, work report, and independent revalidation.

