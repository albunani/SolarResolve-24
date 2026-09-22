# Antigravity Remediation Prompt: Complete `PROJECT.md` Acceptance-Criteria Repair

## Mission

Repair the current SolarResolve implementation so that every acceptance criterion in `PROJECT.md` is implemented and verifiably satisfied.

This is a correction pass, not a redesign. Preserve the approved product scope, safety posture, dark cyan/blue visual direction, and the existing `frontend/` and `backend/` separation. Do not modify the unrelated root landing pages: `index.html`, `launch.html`, or `portfolio.html`.

Do not report completion while any required build, test, browser, accessibility, safety, or acceptance check is failing.

## Reference documents and precedence

Read these files before changing code:

1. `PROJECT.md` — single source of truth for product scope and acceptance criteria.
2. `docs/SAFETY_POLICY.md` — deterministic hazard and prohibited-action policy.
3. `CORE_FLOW.md` — user flow, state, and result contracts.
4. `SCENARIOS.md` — happy path, missing-input, and failure-recovery behavior.
5. `docs/TECHNICAL_DESIGN.md` — approved architecture and toolchain.
6. `docs/API.md` — intended service endpoints and payload direction.
7. `HANDOFF_PROMPT.md` — implementation constraints and prior decisions.

If documents conflict, follow `PROJECT.md`, then `docs/SAFETY_POLICY.md`, and record the conflict in the final work report. Do not silently invent a new requirement.

## Current audit result

The last review found:

- 0 acceptance criteria proven as Pass in a real browser;
- 13 Fail;
- 9 Manual Check because supporting code could not be executed reliably; and
- 12 Not Implemented.

The immediate release blocker is that the frontend does not render in a real browser. Vite reports that `AssessmentResult` is imported as a runtime value even though it is a TypeScript-only type. The page is blank.

`npm run build` also fails because:

- `AssessmentResult` is not imported with `import type` in `src/services/api.ts` and `src/screens/AssessmentScreen.tsx`;
- `React` is imported but unused where the automatic JSX runtime does not require it;
- Vitest globals such as `describe`, `it`, and `expect` are unavailable to TypeScript;
- the Vite configuration does not type its `test` property correctly; and
- `package.json` has no explicit test scripts.

The existing single frontend test passes in Vitest, but it does not catch the real Vite browser failure and covers only Home to Safety Check navigation.

## Non-negotiable implementation rules

- Implement all four Must-Have features in `PROJECT.md`.
- Implement the Should-Have image flow sufficiently to pass its listed acceptance criteria for the supported synthetic demo image.
- Keep hazard enforcement deterministic and outside free-form model output.
- Never turn an API/model failure into a successful-looking assessment.
- Never invent facts or silently substitute default evidence for missing user input.
- Never state that a battery, inverter, controller, panel, cable, or other component is defective based only on remote evidence.
- Never give instructions to open equipment, touch conductors, disconnect components, bypass protection, probe contacts, take live measurements, or change protected settings.
- Keep real payments, authentication, saved history, technician marketplace behavior, and other Out-of-Scope items absent.
- Use synthetic or deliberately anonymized data in all fixtures and demonstrations.
- Do not expose secrets in frontend code.
- Do not change requirements merely to match the current implementation.

## Required execution order

Complete the work in the following order. After each phase, run its stated tests before continuing.

### Phase 1: Restore a runnable, buildable foundation

1. Correct all type-only imports.
2. Remove unused React imports or otherwise make imports consistent with the automatic JSX runtime.
3. Configure Vitest types correctly for TypeScript.
4. Use the correct typed Vite/Vitest configuration approach.
5. Add explicit scripts for at least:
   - `test`;
   - `test:run`;
   - `build`;
   - `lint`.
6. Confirm the frontend renders instead of showing a blank page.
7. Confirm BrowserRouter routes work when entered directly and refreshed.
8. Preserve the existing dark theme and responsive CSS foundation.

Phase 1 verification:

```powershell
cd frontend
npm run lint
npm run test:run
npm run build
npm run dev -- --host 127.0.0.1
```

Expected result: lint, tests, and build exit successfully; `http://127.0.0.1:5173/` renders SolarResolve without console errors.

### Phase 2: Introduce explicit assessment state and route guards

The present router exposes `/intake`, `/clarification`, and `/assessment` directly. A user can bypass the required hazard screen. Correct this with an explicit flow state owned by a React context, reducer, or equivalent typed application state.

The state must distinguish at least:

- whether the initial hazard screen is complete;
- whether the case is safe to continue;
- the complete user input;
- late-stage hazard status and triggered rule identifiers;
- evidence facts, sources, and confirmation state;
- clarification questions and answers;
- processing/error state; and
- the final validated result.

Required route behavior:

- `/safety-check` is reachable from Home.
- `/intake` redirects to `/safety-check` until a no-hazard decision is recorded.
- `/clarification` redirects to the earliest incomplete required step.
- `/assessment` redirects unless a complete validated result exists.
- Starting a new assessment clears the prior case safely.
- Going backward does not silently lose entered evidence.
- A browser refresh must have defined behavior. Session-only persistence is acceptable; if state is absent, redirect to the earliest valid screen instead of crashing.

Add route-guard integration tests for every protected route.

### Phase 3: Complete deterministic hazard enforcement

Create one reusable hazard policy shared by input validation and result processing. Do not duplicate loosely matching strings across components.

The policy must cover:

- smoke or fire;
- burning smell;
- battery swelling, leaking, hissing, cracking, or physical damage;
- exposed or sparking conductors;
- electric shock;
- severe or unusual heat; and
- water entering electrical equipment.

Initial screen behavior:

- The user must select at least one hazard or an exclusive “None observed” choice.
- Selecting “None observed” clears hazards.
- Selecting a hazard clears “None observed.”
- Every hazard stops the ordinary assessment flow.
- The escalation screen must not show a cause ranking.

Late-stage behavior:

- Scan the free-text description, warning/error text, manual reading notes, image observations, and clarification answers using deterministic rules.
- If a late hazard is found, discard or suppress any ordinary assessment draft and switch to `urgent_safety_escalation`.
- Run the hazard policy again on structured model output before display.

The urgent message must explicitly say:

> Keep a safe distance. Do not touch, open, disconnect, probe, or attempt to repair the equipment. Contact a qualified solar/electrical professional or emergency service as appropriate.

Do not advise switching anything off unless the narrow exception in `docs/SAFETY_POLICY.md` is implemented exactly.

Automated tests must cover every hazard flag, representative text synonyms, mixed-case input, false-positive boundaries, the no-hazard path, and late-stage override behavior.

### Phase 4: Complete guided evidence intake

Implement a typed input model matching `PROJECT.md` and `CORE_FLOW.md`.

Required user inputs:

- original problem description;
- previous runtime;
- current runtime;
- when the change began;
- change pattern;
- warnings or error codes;
- charging observations;
- known inverter, battery, panel, age, and recent-change details;
- at least one appliance/load observation; and
- an optional manually entered display reading.

Unknown handling:

- Provide an explicit “I don’t know” or “Unknown” state for every technical field where the user may not know the answer.
- Preserve unknown as `null` or a typed `unknown` state. Do not convert it into invented text or a synthetic measurement.
- The user must be able to continue without knowing equipment specifications.

Load observations:

- Add a repeatable, typed load entry with an appliance name and an optional use/change note.
- Require at least one load observation for ordinary assessment, unless the approved requirements are amended later.
- Provide add and remove actions that remain keyboard accessible.

Manual display reading:

- Provide a field for a visible display value or code.
- Label its source as user-entered display evidence.
- Do not parse it into a confirmed electrical measurement without validation and user confirmation.

Validation:

- Reject an empty or whitespace-only problem description.
- Use numeric runtime values with an explicit unit, or use a validated duration representation.
- Reject negative numbers and invalid numeric formats.
- Associate each error message with its input using semantic HTML and ARIA attributes.
- Display meaningful text, not an icon-only error.
- Move focus to the first invalid field after submission.
- Preserve every valid and invalid value while errors are shown.

Add unit and browser tests for valid input, missing input, unknown values, negative values, malformed numbers, load entry, manual reading, focus management, and retained values.

### Phase 5: Build clarification and evidence review correctly

The clarification screen must display a complete source-labelled evidence summary before assessment generation.

Requirements:

- Facts must show their source: `user`, `confirmed_image`, or `deterministic_calculation`.
- Facts must show their confirmation status.
- Missing or uncertain evidence must remain visibly separate from known facts.
- Ask three to five targeted questions only when material evidence is missing.
- Do not insert hidden default answers when the user leaves a question unanswered.
- Define and test the minimum evidence threshold.
- If evidence is insufficient, produce `more_information_needed` instead of forcing a ranked assessment.
- Contradictory answers must be surfaced for review, not silently resolved.

### Phase 6: Replace the fake-success API fallback

The current `generateAssessment` implementation catches every network or backend failure and returns a finished mock result with invented defaults. Remove this behavior.

Required behavior:

- A network error, timeout, invalid response, schema failure, or 5xx response produces a recoverable error state.
- Keep user input and answers intact.
- Show a clear Retry action and a Back/Edit Evidence action.
- Never display a partial response as a completed assessment.
- Never convert missing evidence into defaults such as “7 hours,” “3 hours,” or “No, it struggles.”
- A synthetic demo must be explicitly selected or configured as demo mode. It must never activate silently after a real request fails.
- Keep the backend base URL in typed configuration, not hard-coded throughout the application.
- Validate every success payload against a structured schema before navigation to the result screen.

Implement the assessment endpoint described by the approved backend design, or provide a clearly separated deterministic demo adapter plus the endpoint contract. The normal application error path must remain honest.

Add tests for timeout, offline backend, non-2xx response, malformed JSON, invalid schema, unsafe output, retry success, and retained input.

### Phase 7: Enforce the approved assessment result contract

Every completed result must include:

- assessment status;
- summary;
- known facts;
- missing or uncertain information;
- possible causes;
- safe checks;
- prohibited actions;
- recommended next action;
- technician brief; and
- disclaimer.

Known facts:

- Add a source field with only `user`, `confirmed_image`, or `deterministic_calculation`.
- Add confirmation metadata where appropriate.
- Never store or display an AI inference as a confirmed fact.

Cause classifications:

Use only these labels unless `PROJECT.md` is formally changed:

- `more consistent`;
- `possible but insufficient evidence`; or
- `cannot assess`.

Remove `high`, `medium`, and `low` confidence as the user-facing cause classification.

Safety validation:

- Validate safe checks and recommended actions against the prohibited-action policy before display.
- Reject or replace unsafe output.
- Run hazard detection after model processing.
- No output may declare a component defective from remote evidence.
- Any action requiring inspection, repair, replacement, configuration change, enclosure access, or measurement must be assigned to a qualified professional.

Insufficient evidence:

- Return `more_information_needed` when the evidence threshold is not met.
- Do not rank causes when the available evidence does not support ranking.
- Clearly list the highest-value missing observations.

### Phase 8: Complete the technician-ready brief

Generate one complete plain-text brief containing:

1. user-stated problem;
2. previous runtime;
3. current runtime;
4. when and how the change began;
5. system summary;
6. relevant appliances and loads;
7. confirmed display readings;
8. warnings or error codes;
9. completed safe observations;
10. confirmed facts;
11. professional investigation areas;
12. unresolved questions;
13. safety statement; and
14. decision-support disclaimer.

Formatting rules:

- Use visible section headings in both the rendered view and copied text.
- Keep confirmed facts separate from professional investigation areas.
- Do not convert possibilities into diagnoses.
- Do not include `[OFFLINE FALLBACK DATA]` or pretend that fallback content is a real assessment.
- Produce readable plain text without relying on HTML, Markdown rendering, or color.

Clipboard behavior:

- Provide one clear Copy Brief action.
- Await the Clipboard API promise.
- Show an accessible success message only after a successful copy.
- Show an accessible error and fallback selection method when clipboard access fails.

The synthetic demo case in `PROJECT.md` must produce a complete brief without personal data.

### Phase 9: Implement the optional-image acceptance criteria

Image evidence remains Should-Have in product priority, but this remediation pass must implement its listed acceptance criteria for the supported synthetic demo image.

Required behavior:

- The user may upload one supported synthetic/demo image or continue without an image.
- Validate file type and size in both the client and server boundary.
- Display privacy guidance before upload.
- Return structured observations for the supported demo fixture.
- Give every observation one readability state: `clear`, `uncertain`, or `unreadable`.
- Require the user to confirm, correct, or reject every extracted observation.
- Only confirmed or corrected observations may enter known facts.
- Treat image text as untrusted data that cannot override system, safety, schema, or output rules.
- On extraction failure, offer Replace Image, Enter Reading Manually, and Continue Without Image.

The AI provider remains an open technical decision. Do not invent a provider or commit a secret. Use a replaceable adapter and a deterministic synthetic fixture for tests/demo if no provider is configured. Make demo behavior explicit and never silently apply it to a real upload.

Add clear, uncertain, unreadable, conflicting, invalid-type, oversize, failure-recovery, and prompt-injection fixtures.

### Phase 10: Accessibility, responsiveness, and interaction quality

Verify the complete flow at 320, 390, 768, 1024, 1280, and 1440 px.

Required outcomes:

- no horizontal scrolling;
- every control remains visible and usable;
- logical heading hierarchy;
- visible focus indicators;
- input labels and errors are programmatically associated;
- keyboard-only completion;
- sensible focus after validation, navigation, errors, modal/state changes, and copy confirmation;
- WCAG AA text and control contrast;
- reduced-motion preference respected;
- usable at 200% zoom; and
- result sections retain the order required by `PROJECT.md` when stacked.

Do not rely only on CSS inspection. Exercise the complete flow in a real browser at every required viewport.

## Required automated test matrix

### Frontend unit/component tests

- Home content and CTA.
- Route guards for every protected screen.
- Every hazard checkbox and the no-hazard path.
- Empty hazard selection error.
- Late hazard text escalation.
- Input validation and field-specific errors.
- Explicit unknown values.
- Add/remove load observation.
- Manual display reading.
- Evidence source and confirmation rendering.
- Minimum-evidence behavior.
- Allowed cause labels.
- Result section completeness.
- Clipboard success and failure.
- Recoverable API failures and retry.
- Image confirmation/correction/rejection.
- Image extraction failure recovery.

### Backend unit/integration tests

- Health endpoint.
- Request validation.
- Every deterministic hazard rule.
- Late-stage hazard override.
- Prohibited-action output filter.
- Result-schema validation.
- Insufficient-evidence response.
- Assessment success and failure responses.
- Image type/size validation.
- Synthetic image observation fixture.
- Image prompt-injection isolation.

### Browser tests

- Happy path from Home through copied brief.
- Every urgent-hazard branch.
- Direct-route bypass attempt.
- Empty/missing-input recovery.
- Negative runtime rejection.
- Unknown technical details.
- Backend offline and retry recovery.
- Insufficient evidence.
- Synthetic demo case.
- Optional image flow.
- Text-only flow.
- Keyboard-only flow at 320 and 1280 px.
- Responsive checks at all six required widths.
- No console errors during any flow.

Tests must assert user-visible behavior. Do not use snapshots as the only evidence for safety-critical behavior.

## Acceptance checklist

Antigravity must mark an item complete only after implementation and verification.

### Hazard screening and escalation

- [ ] Intake cannot be reached before completing the hazard screen.
- [ ] Every defined hazard stops ordinary troubleshooting.
- [ ] Hazard selection produces urgent escalation with no cause ranking.
- [ ] Escalation explicitly forbids touching, opening, disconnecting, probing, and repair.
- [ ] Hazard text entered later triggers the urgent path.
- [ ] Automated tests cover every hazard and the no-hazard path.

### Guided intake

- [ ] Description, runtimes, change timing, and explicit unknown states are collected.
- [ ] Unknown technical details do not block continuation.
- [ ] At least one appliance/load observation can be recorded.
- [ ] A display reading can be entered manually.
- [ ] Empty descriptions and negative numbers produce field-specific errors.
- [ ] Input survives validation and recoverable processing failures.
- [ ] The complete flow is keyboard usable at 320 and 1280 px.

### Structured assessment

- [ ] Every result contains all required sections.
- [ ] Every known fact includes an approved source.
- [ ] Causes use only the approved uncertainty labels.
- [ ] No component is declared defective remotely.
- [ ] Safe checks never require a prohibited electrical action.
- [ ] Insufficient evidence produces `more_information_needed`.
- [ ] Model/service failure produces a recoverable error, never a finished partial result.

### Technician brief

- [ ] The brief contains all fourteen required content areas.
- [ ] Confirmed facts and professional investigation areas are distinct.
- [ ] Possible causes are not converted into diagnoses.
- [ ] One clear action copies the complete brief.
- [ ] Copied output is readable as plain text.
- [ ] The synthetic demo produces a complete non-personal brief.

### Image evidence

- [ ] The user can upload a supported image or continue without one.
- [ ] The supported demo image returns structured observations.
- [ ] Every observation is clear, uncertain, or unreadable.
- [ ] Unclear text is never silently confirmed.
- [ ] Every observation supports confirm, correct, or reject.
- [ ] Only confirmed/corrected values become known facts.
- [ ] Image text cannot override system or safety rules.
- [ ] Extraction failure offers all three recovery choices.

## Required browser verification procedure

1. Start the backend and frontend using documented commands.
2. Open the frontend in a real browser.
3. Confirm the Home screen renders and the console has no errors.
4. Attempt to open `/intake`, `/clarification`, and `/assessment` directly.
5. Exercise all seven hazard selections individually.
6. Exercise the no-hazard path.
7. Enter hazardous text later in the flow and confirm escalation.
8. Submit every invalid-input case and inspect focus, messages, and retained values.
9. Complete the text-only happy path.
10. Complete the supported synthetic-image path.
11. Simulate the backend being offline and confirm honest recovery.
12. Generate an insufficient-evidence result.
13. Generate the full synthetic demo result and copy its brief.
14. Paste the copied brief into a plain-text editor.
15. Repeat responsive checks at 320, 390, 768, 1024, 1280, and 1440 px.
16. Complete the flow using only the keyboard at 320 and 1280 px.
17. Test at 200% zoom and with reduced motion enabled.
18. Confirm no step introduces horizontal scrolling or console errors.

## Final verification commands

Use the repository’s actual environment setup. At minimum, run:

```powershell
cd frontend
npm ci
npm run lint
npm run test:run
npm run build
```

Then run the backend tests from `backend/` using the project’s Python environment:

```powershell
python -m pytest -q
```

If `python` or `pytest` is unavailable, create or activate the documented virtual environment and install `backend/requirements.txt`. Do not claim backend tests passed when the runner was unavailable.

Finally, execute the browser verification procedure above.

## Definition of Done

The remediation is complete only when:

- the frontend renders without a blank page;
- `npm run lint`, the full frontend test suite, and `npm run build` pass;
- the backend test suite passes;
- every Must-Have acceptance criterion is proven Pass;
- every listed image acceptance criterion is proven Pass for the supported synthetic demo fixture;
- browser verification passes at all required viewport widths;
- the browser console contains no errors during the tested flows;
- no horizontal overflow occurs;
- no unsafe instruction or invented evidence is displayed;
- API/model failure never masquerades as success;
- the copied technician brief is complete and readable;
- no Out-of-Scope feature was introduced; and
- no root static landing page was modified.

## Required work report

When finished, create `WORK_REPORT_REMEDIATION.md` containing:

1. Summary of the repaired behavior.
2. Exact files added, modified, and removed.
3. Architecture or schema decisions made.
4. Every command executed and its result.
5. Frontend test totals.
6. Backend test totals.
7. Browser viewports and flows verified.
8. A table mapping all 34 acceptance criteria to Pass evidence.
9. Any remaining open question from the approved documents.
10. Confirmation that no Out-of-Scope feature or unrelated root HTML file was changed.

If anything remains unresolved, label the remediation incomplete and state the precise blocker. Do not convert a failure into a claimed pass.
