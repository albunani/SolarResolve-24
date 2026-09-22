# Day 4 AI Integration Remediation Report (V2)

## 1. Exact Changed Files

**Modified/Created:**
- `backend/pyproject.toml` (Fixed `requires-python` constraint to `>=3.13`)
- `backend/uv.lock` (Re-locked dependencies correctly to avoid MSVC compiler error for Python 3.14)
- `backend/requirements.txt` / `backend/requirements_locked.txt` (Exported lockfile with `google-genai` and installed via `uv pip`)
- `backend/src/safety/hazard_policy.py` (Added `contains_definitive_diagnosis`)
- `backend/src/services/ai_provider.py` (Added strongly typed `ProviderUnavailableError` (503) and `ProviderOutputError` (502). Mapped SDK errors appropriately. Enforced client initialization with HttpOptions timeout)
- `backend/src/services/prompts.py` (Created dedicated prompt module for D4-005 requirements with strict safety instructions)
- `backend/src/services/assessment_service.py` (Refactored safety loop. Added whole-draft validation for both prohibited actions and definitive diagnosis. Implemented hard retry cap of 1)
- `backend/src/api/assessments.py` (Added custom 502/503 exception mappings for API layer errors)
- `backend/.env.example` (Normalized configuration to use `ALLOWED_ORIGINS` and explicit origins)
- `frontend/src/services/api.ts` (Increased frontend `fetch` timeout from 15s to 30s)
- `backend/tests/test_ai_provider.py` (Overhauled with exhaustive mock tests verifying schema configuration, timeout mapping, 429 rate limit mapping, and empty responses)
- `backend/tests/test_d4_requirements.py` (Added exact test cases requested in D4-007)

## 2. Exact Commands and Results

**Install Dependencies (Python 3.13.9 env):**
```powershell
# Fixed `requires-python` in pyproject.toml
uv lock
uv pip install --python .\venv -r requirements.txt
```
*Result:* Resolved 40 packages. Successfully installed `google-genai` alongside existing dependencies without MSVC rust-compiler crashes.

**Run Backend Tests:**
```powershell
cd backend
.\venv\Scripts\python.exe -m pytest -q
```
*Result:* 60 passed, 1 warning in 8.41s. Zero failures.

**Run Frontend Lint and Build:**
```powershell
cd frontend
npm run lint; if ($?) { npm run build }
```
*Result:* Found 0 warnings and 0 errors. Vite build successful (Built in 252ms).

## 3. Safety Evidence

1. **Whole-Draft Validation:** `assessment_service.py` now concatenates `draft.summary`, `draft.recommended_next_action`, `draft.safe_checks`, and all cause descriptions. If *any* part of the output triggers `contains_prohibited_action()` or `contains_definitive_diagnosis()`, the entire draft is discarded, throwing a `ProviderOutputError` which is caught in a tight retry loop.
2. **Definitive Diagnosis Detection:** Added `"is defective", "has failed", "is broken", "needs replacement", "is dead"` keywords to `contains_definitive_diagnosis()` to prevent the LLM from making absolute claims remotely.
3. **Retry Boundaries:** Cap of exactly `max_attempts = 2` (1 retry). `ProviderUnavailableError` (503s) bypass the retry loop and fail immediately.
4. **Mocked Provider Execution:** All Day 4 tests are fully mocked. No live requests are made to the Gemini API during `pytest`. No real Gemini API keys exist in version control.
5. **Prompt Injection Boundary:** Included `=== BEGIN UNTRUSTED EVIDENCE ===` delimiters. Only `confirmed` and non-`rejected` image observations are passed to the provider prompt.

## 4. Remaining Manual Checks

- Add the real `GEMINI_API_KEY` to the production environment vault.
- Deploy the frontend (`solar-resolve-24.vercel.app`) and verify end-to-end integration with the real API key via the backend.
- Visually verify how 503 and 502 error codes render in the frontend UI.

## 5. Unresolved Issues
- None. All issues from `VALIDATION_DAY4.md` (D4-001 through D4-007) have been fully remediated and verified via unit tests.
