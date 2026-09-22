# WORK_REPORT_REMEDIATION_V2.md

## 1. Modified Files and Reasons
- `frontend/src/services/api.ts`: Fixed the assessment request contract. Removed spread syntax (`...evidence`) to ensure `evidence` is nested under a top-level key as expected by FastAPI.
- `frontend/src/services/api.test.ts` (NEW): Added frontend contract regression test for the exact request payload shape.
- `backend/tests/test_assessments.py`: 
  - Updated `test_negative_runtime_rejected` to send a valid wrapped payload and assert that 422 is caused specifically by the negative runtime value.
  - Added `test_missing_evidence_wrapper_rejected` contract regression test.
  - Added negative and ambiguous keyword tests (`test_late_hazard_clear_negative_ignored`, `test_late_hazard_ambiguous_triggers_escalation`).
- `backend/src/safety/hazard_policy.py`: Implemented a negative-lookbehind-like regex pattern to ignore hazards immediately preceded by clear negative statements (e.g., "no", "not", "without", "never").
- `frontend/src/safety/hazardPolicy.ts`: Synchronized the exact negation logic implemented in the backend, supporting native RegExp capabilities in Javascript.
- `frontend/src/safety/hazardPolicy.test.ts` (NEW): Added frontend unit tests for affirmative, negative, and ambiguous hazard statements.
- `frontend/src/screens/AssessmentScreen.test.tsx` (NEW): Integration tests for rendering the assessment, copying the technician brief to the clipboard, and resetting the flow.
- `frontend/src/screens/ClarificationScreen.test.tsx` (NEW): Integration test for recoverable generation failure, preserving user state, and re-submitting.

## 2. Root Cause of Repaired Issues
1. **Assessment service error (422) / `body.evidence` Field required**: Root cause was the frontend destructuring (`...evidence`) in `JSON.stringify`, effectively flattening the evidence object into the root payload. The FastAPI backend correctly expected `{ "evidence": {...} }`.
2. **Clear negative text treated as affirmative hazard**: Root cause was naive regex substring matching (`pattern.search`). "There is no smoke" matched "smoke". Replaced with regex pattern checking for negation prefixes like "no ", "not ", "without " directly preceding the matched hazard, while respecting boundary breakers like "except".

## 3. Exact Frontend Request Shape After Contract Fix
```json
{
  "evidence": {
    "original_description": "Battery dies early",
    "previous_runtime_value": 7,
    "previous_runtime_unit": "hours",
    "current_runtime_value": 3,
    "current_runtime_unit": "hours",
    "change_pattern": "gradual",
    "reaches_full_charge": "no",
    "loads": []
  },
  "clarifications": [],
  "image_observations": []
}
```

## 4. Commands Used to Start Local Services
- **Backend**: `cd backend && .\venv\Scripts\activate && uvicorn src.app.main:app --reload --port 8001`
- **Frontend**: `cd frontend && npm run dev` (Runs on port 5173). Configuration was updated via local `.env` pointing to port 8001.

## 5. Build and Test Totals
- `npm run lint`: 0 warnings, 0 errors.
- `npm exec -- vitest run`: 5 test files passed, 8 tests passed.
- `npm run build`: built in ~300ms.
- `python -m pytest -q`: 48 passed, 1 warning (deprecation).

## 6. Browser Evidence for Required Scenarios
The full browser text-only flow (`Home -> Safety -> Intake -> Continue Without Image -> Clarification -> Assessment -> Technician Brief`) was run successfully, confirmed by screenshots and manual tests provided in context.

## 7. Must-Have Acceptance Criteria Matrix (from PROJECT.md)
| Feature | Criteria Met | Evidence / Tests |
| --- | --- | --- |
| 1. Guided Intake | Yes | Empty description and negative values rejected via 422. Unknown fields ignored. Fields preserved on error. Tested via backend and frontend rendering tests. |
| 2. Deterministic Safety | Yes | "Smoke" triggers Urgent Escalation. "No smoke" ignores it. Ambiguous ("may have noticed burning smell") triggers escalation. Tested via `test_assessments.py` and `hazardPolicy.test.ts`. |
| 3. Assessment Generation | Yes | Correctly renders Known Facts, Missing/Uncertain, Causes (with specific labels), Safe Checks, Prohibited Actions, and Next Actions. Tested via `AssessmentScreen.test.tsx` and manual browser flow. |
| 4. Technician Brief | Yes | Fully visible, copyable to clipboard, provides accessible success feedback. Tested via `AssessmentScreen.test.tsx` mimicking Clipboard API. |

## 8. Separate Evidence for Technician-Brief
Rendered fully at the bottom of the Assessment Screen. Clicking "Copy Brief" triggers `navigator.clipboard.writeText`, verified by unit tests (vitest mock) and manual clipboard pasting.

## 9. Separate Evidence for Optional Image Path
Completed in Phase 1 / Iteration 1. The Image Evidence screen is fully implemented using the synthetic demo fixture, requiring explicit Confirm/Reject actions for "Clear", "Uncertain", and "Unreadable" observations before allowing the user to proceed.

## 10. Accessibility and Viewport Results
Tested manually in previous iterations. Semantic HTML elements (`<main>`, `<header>`, `<section>`, `<dl>`) used. Focus rings active for Tab navigation. Fluid flexbox/grid layout supports responsive wrapping down to 320px with no horizontal scrolling or clipped primary actions.

## 11. Remaining Limitations and Open Questions
- AI provider integration is pending (Day 4/5).
- Current "no smoke" negation logic uses conservative regex look-arounds. Extremely complex compound sentences (e.g. "I did not think it was anything, but my neighbour said he did not see any smoke") might still trigger false positives, which is acceptable under the conservative safety policy.

## 12. Explicit Statement
This report is implementation evidence and still requires independent revalidation as per the project requirements. The remediation pass is complete.
