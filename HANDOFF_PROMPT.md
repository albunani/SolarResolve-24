# Antigravity Day 3 Implementation Handoff

Copy the prompt below into Antigravity from the project root.

---

## Implementation prompt

You are implementing Day 3 of the SolarResolve MVP in this repository.

### [Reference Doc]

Read `PROJECT.md` completely before editing or creating files. Treat it as the single source of truth for product scope, user behavior, acceptance criteria, safety boundaries, and out-of-scope features.

Then read these supporting documents only to clarify implementation details:

1. `docs/TECHNICAL_DESIGN.md` — selected stack and architectural direction
2. `docs/SAFETY_POLICY.md` — safety behavior and prohibited guidance
3. `docs/API.md` — preliminary service boundaries
4. `CORE_FLOW.md` — detailed states and logical data contracts
5. `SCENARIOS.md` — happy path, missing-input, and failure-recovery behavior

These files have been verified at the project root `C:\Users\USER\Documents\ChatGPT\MIT OL`. If `CORE_FLOW.md` or `SCENARIOS.md` is not visible, Antigravity is operating in the wrong or stale folder. Do not create stubs. Re-open or refresh the verified project root before continuing.

When documents disagree, follow this precedence:

1. `PROJECT.md`
2. `SCENARIOS.md` for explicit edge-case clarification
3. `CORE_FLOW.md`
4. files under `docs/`
5. `README.md`

Do not silently resolve a conflict by inventing product behavior. Record the conflict in the work report and choose the smallest reversible implementation that remains consistent with `PROJECT.md`.

### [Current Scope]

Implement the base project scaffolding and the first working slice of the core user flow.

Day 3 includes only:

1. Scaffold the React + TypeScript + Vite frontend defined in `docs/TECHNICAL_DESIGN.md`.
2. Scaffold the Python + FastAPI backend defined in `docs/TECHNICAL_DESIGN.md`.
3. Keep the frontend and backend separated by clear service boundaries.
4. Add a minimal backend health endpoint so the service can be run and verified locally.
5. Implement Screen 1, **Home and scope**, from `PROJECT.md`.
6. Implement the primary **Assess my battery-runtime problem** CTA.
7. Make the CTA navigate to Screen 2, **Safety check**, or to a clearly identified Safety-check route/state shell.
8. Add the smallest automated checks needed to prove that the start screen renders and the primary CTA reaches the expected destination.
9. Verify the start screen manually in a browser at one mobile and one desktop viewport.

Confirmed implementation choices:

- Routing: React Router in Declarative mode with browser-history URLs; do not use TanStack Router, hash routing, or a custom state-only router.
- Frontend tests: Vitest + React Testing Library + `@testing-library/user-event` + `@testing-library/jest-dom` in a jsdom environment.
- Backend tests: pytest with FastAPI `TestClient` backed by HTTPX.
- Styling: accessible semantic structure first, with the shared dark cyan/blue visual tokens applied from Day 3. Use plain component CSS and CSS custom properties; do not add a styling framework.
- Deployment direction: Vercel for the Vite frontend and Render for the FastAPI backend. Do not add Docker on Day 3.

Use `frontend/` and `backend/` directories unless an equivalent scaffold already exists. Do not overwrite or repurpose the existing root-level `index.html`, `launch.html`, or `portfolio.html`; those are separate static artifacts.

The first slice should establish a clean foundation for later Must-Have work. Do not attempt to finish the full assessment journey during this handoff.

### [Priority]

Implement Must-Have foundations first.

For this Day 3 slice, prioritize in this order:

1. A locally runnable frontend and backend
2. Screen 1 content and accessible structure
3. Primary CTA navigation to the Safety-check destination
4. Basic responsive behavior
5. A minimal verification test for rendering and CTA navigation

The full Must-Have sequence in `PROJECT.md` remains the backlog:

1. Hazard screening and safety escalation
2. Guided problem and evidence intake
3. Structured, safety-aware assessment
4. Technician-ready brief

Optional image extraction and user confirmation are formally classified as **Should-Have**, not Must-Have. Do not implement image upload or image extraction on Day 3.

Do **not** implement any Out-of-Scope item from Section 12 of `PROJECT.md`.

### [Constraints]

- Do not invent arbitrary product requirements, screens, copy, fields, workflows, user roles, or business rules.
- Do not add authentication, accounts, saved history, payments, subscriptions, technician marketplaces, appointment booking, monitoring, hardware integration, notifications, quote comparison, or any other Out-of-Scope feature.
- Do not integrate a live AI model on Day 3.
- Do not require an API key to run the Day 3 application.
- Use mock or static data wherever later services are not yet implemented.
- Use React Router Declarative mode for `/` and the Safety-check destination.
- Use Vitest with React Testing Library for the frontend verification test.
- Use pytest with FastAPI `TestClient` for the health-route test.
- Establish reusable dark cyan/blue CSS tokens, but defer glass effects, elaborate animation, and visual polish.
- Do not implement real transactions or payment behavior.
- Do not present mock behavior as a completed backend capability.
- Do not add a database unless `PROJECT.md` is explicitly updated to require one.
- Do not modify existing Markdown requirements except to correct a verified implementation-path reference that would otherwise be broken. Report any such correction.
- Preserve the existing root static pages and unrelated user files.
- Do not delete, rename, or overwrite existing files without a direct requirement.
- Keep dependencies minimal and explain every new runtime dependency in the work report.
- Keep secrets out of source control. If configuration is needed, document it in `.env.example` without real credentials.
- Use semantic HTML, visible keyboard focus, accessible names, and mobile-first CSS from the first screen onward.
- The start screen must make clear that the product currently supports declining battery runtime and provides decision support rather than a professional diagnosis.
- The primary CTA label must be **Assess my battery-runtime problem** unless `PROJECT.md` is updated.
- Loading the start screen must not call an AI service or submit personal information.
- Use synthetic content only.

If a necessary technical choice is not covered by the selected stack or the existing repository, choose the smallest conventional and reversible option. Record the choice and rationale in the work report. Do not turn an implementation choice into a new product requirement.

### [Implementation Sequence]

1. Inspect the existing repository and report any scaffold that already exists.
2. Confirm the selected architecture from `docs/TECHNICAL_DESIGN.md`.
3. Create the frontend and backend scaffolds without touching the existing root static pages.
4. Add local run scripts or documented commands.
5. Add the backend health route and one automated health check.
6. Implement the Home and scope screen with:
   - SolarResolve working name;
   - the core value proposition;
   - supported declining-battery-runtime scenario;
   - a concise decision-support limitation;
   - an urgent-safety reminder; and
   - the primary CTA.
7. Implement navigation from the primary CTA to the Safety-check route using React Router Declarative mode.
8. On the Safety-check destination, render only the minimum heading and scope needed to prove navigation. Full hazard behavior is the next backlog item unless it can be added without compromising the Day 3 DoD.
9. Add or update tests for start-screen rendering, accessible CTA naming, and navigation.
10. Run the frontend and backend locally.
11. Verify the UI at a mobile and desktop viewport.
12. Produce the required work report.

### [DoD]

Day 3 is complete only when all of the following are true:

- [ ] `PROJECT.md` was read before implementation.
- [ ] Existing root static HTML pages remain intact.
- [ ] The frontend scaffold installs and starts locally.
- [ ] The FastAPI backend starts locally.
- [ ] A backend health endpoint returns a successful response.
- [ ] The browser displays the Home and scope screen without a blank page or console error.
- [ ] The screen clearly identifies SolarResolve and the declining-battery-runtime scenario.
- [ ] The screen states that the product provides decision support rather than a professional diagnosis.
- [ ] The primary CTA is labelled **Assess my battery-runtime problem**.
- [ ] The CTA is keyboard reachable and has a visible focus state.
- [ ] Activating the CTA reaches the Safety-check screen or route/state.
- [ ] The start screen renders without horizontal overflow at one mobile viewport of 390 px or narrower.
- [ ] The start screen renders cleanly at one desktop viewport of at least 1280 px.
- [ ] A minimal automated test verifies start-screen rendering and CTA navigation.
- [ ] No live AI service, database, payment flow, authentication system, or Out-of-Scope feature was added.
- [ ] The exact local run commands were executed successfully and included in the work report.

Do not claim completion based only on files being generated. Run the application, exercise the CTA, and report the verification evidence.

### [Work Report]

End with a Markdown report using exactly this structure:

````markdown
## Day 3 Work Report

### Status
DONE | DONE_WITH_CONCERNS | BLOCKED

### Modified Files
- `path/to/file` — why it changed

### New Dependencies
- `dependency` — why it is required
- None, if no dependencies were added

### Run Commands
```text
<exact backend installation/start command>
<exact frontend installation/start command>
<exact test command>
```

### Implemented Features
- Base frontend scaffold
- Base backend scaffold
- Health endpoint
- Home and scope screen
- Primary CTA navigation

### Verification
- Backend health result:
- Automated test result:
- Mobile viewport checked:
- Desktop viewport checked:
- CTA destination verified:
- Browser console status:

### Decisions and Assumptions
- <small reversible technical choice and rationale>

### Unresolved Questions or Conflicts
- <requirement conflict or none>

### Next Backlog
1. Complete deterministic hazard screening and urgent escalation.
2. Implement guided problem and evidence intake.
3. Implement evidence review and targeted clarification.
4. Implement structured assessment and technician brief.
5. Add Should-Have image extraction only after the text-first loop is complete.
````

If blocked, state the exact blocker, what was attempted, and the smallest user decision or external change needed to continue.

---

## Expected Day 3 boundary

This handoff is intentionally limited to the foundation and first navigable slice. A successful result is a verified local application that starts at the SolarResolve Home screen and reaches the Safety-check destination through the primary CTA. It is not a partially mocked version of every future feature.
