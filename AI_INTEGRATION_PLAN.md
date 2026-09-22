# Day 4 AI Integration Plan

## Decision

SolarResolve will use Google Gemini for the zero-budget synthetic MVP.

- **Provider:** Google Gemini behind a provider-neutral adapter
- **Initial model:** `gemini-3.8-flash`
- **SDK:** Official `google-genai` Python package
- **Budget:** Free tier only; no payment method
- **Public contract:** Existing `AssessmentResult`
- **Live image interpretation:** Deferred until the text path passes independent validation

This decision supersedes the earlier OpenAI default for Day 4. OpenAI, Anthropic, or another provider may be added later without changing the public API contract.

## Why Gemini

- The current Gemini free tier can support a zero-cost MVP, subject to model availability and quota limits.
- Gemini supports schema-constrained output and multimodal inputs.
- The provider-neutral boundary allows later migration without rewriting the assessment service or frontend.

Free access must not be described as permanent. Rate limits, available models, and provider terms may change.

## Privacy boundary

The free-tier MVP must use only synthetic or deliberately anonymized evidence. Do not send real customer records, faces, addresses, account identifiers, access codes, financial information, or other sensitive data until provider data use, consent, and retention have been reviewed.

## Implementation boundaries

1. Keep the deterministic synthetic adapter for automated tests and credential-free local development.
2. Do not silently fall back to synthetic output after a Gemini production failure.
3. Keep `scan_text_for_hazards` and `contains_prohibited_action` as application-controlled safety rules before and after model processing.
4. Keep urgent escalation and insufficient-evidence decisions outside the model.
5. Have Gemini return a schema-constrained internal `ModelAssessmentDraft`, not authoritative facts or metadata.
6. Assemble the public `AssessmentResult` in application code.
7. Keep known facts, evidence sources, missing evidence, prohibited actions, disclaimer, IDs, timestamps, and technician-brief formatting deterministic.
8. Treat structured output as a shape guarantee, not a guarantee of correct or safe electrical reasoning.
9. Permit at most one bounded retry for invalid or unsafe model output, then return a recoverable error.
10. Make all automated tests use a fake adapter or mocked Gemini response. Tests must make zero live API calls.

## Configuration

```text
AI_PROVIDER=synthetic|gemini
GEMINI_API_KEY=<server-side secret>
GEMINI_MODEL=gemini-3.8-flash
AI_TIMEOUT_SECONDS=20
AI_MAX_RETRIES=1
```

The user creates the key in Google AI Studio and enters it directly into an ignored local environment file and Railway secrets. Never request, paste, commit, log, or include the key in a work report.

## Image scope

Day 4 integrates the text assessment first. The current `ImageObservation` objects contain extracted text, not original image bytes, and the current upload endpoint returns synthetic observations. Confirmed, non-rejected observations may be supplied to the text model as evidence, but real Gemini vision integration is a later phase.

## Implementation handoff

Antigravity must follow `ANTIGRAVITY_DAY4_PROMPT.md` and `DAY4_AI_INTEGRATION.md`, then create `WORK_REPORT_DAY4.md`. Codex will perform independent revalidation afterward.
