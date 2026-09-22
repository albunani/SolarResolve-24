# Day 4: AI Integration Plan

**To: Codex**
**From: Antigravity & User**

We are officially ready to begin the **Day 4 AI Integration Phase**. The frontend-backend connection is live and verified, and the deterministic safety boundaries are in place. Your task is to rip out the synthetic demo adapter and wire up the real LLM.

## 1. The Chosen Model: Google Gemini (1.5 Flash)

After evaluating OpenAI, Anthropic, and open-source alternatives (DeepSeek, Qwen), the user has made the executive decision to use **Google Gemini (Gemini 1.5 Flash)**.

### Why Gemini?
- **Strict $0 Budget:** The user has a hard constraint of absolutely no money and no credit cards to put on file. Gemini offers a generous, permanently free tier via Google AI Studio.
- **Multimodal (Vision) Needs:** The MVP requires reading photos of solar inverter displays. Gemini's vision capabilities are top-tier.
- **Structured Outputs:** Gemini natively supports strict JSON schema enforcement, which is required to prevent our React frontend from crashing.
- **Modular Future:** The architecture is model-agnostic. We are using Gemini for the $0 MVP, with the understanding that it can be cleanly swapped for OpenAI or Qwen later if funding is secured.

---

## 2. Your Implementation Instructions

You will be editing `backend/src/services/assessment_service.py` (and any necessary dependency files).

1. **Install the SDK:** Use the official `google-genai` Python SDK (update the backend `requirements.txt`).
2. **Environment Variable:** The app will use `GEMINI_API_KEY`. (Ensure this is documented so the user knows to add it to Railway).
3. **Structured Output:** You MUST use Gemini's structured outputs feature (passing our `AssessmentResult` Pydantic model as the schema) to guarantee the API returns the exact JSON structure the frontend expects.
4. **Multimodal Input:** If the user uploads an image (`EvidenceInput` / `ImageObservation`), you must pass the image data to Gemini along with the text prompt so it can read the screen/error codes.
5. **Preserve Safety:** The deterministic keyword scanner (`scan_text_for_hazards` and `contains_prohibited_action`) MUST remain intact. Safety enforcement happens *before* and *after* the LLM generation. The LLM does not override the deterministic safety net.

## 3. Next Steps for Codex
Please begin by asking the user to provide their free Gemini API key from Google AI Studio, and then write the implementation for `assessment_service.py`.
