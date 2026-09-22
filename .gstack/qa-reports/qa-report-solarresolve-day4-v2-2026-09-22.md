# SolarResolve Day 4 V2 QA Report

- **Date:** 2026-09-22
- **Target:** Commit `7e8683126291beb5ed7fe29e7bc9895a60b75357`
- **Mode:** Diff-aware, report-only
- **Overall status:** Fail
- **QA health score:** 71/100

The authoritative acceptance audit, evidence, reproduction steps, and remediation order are in [`VALIDATION_DAY4_V2.md`](../../VALIDATION_DAY4_V2.md).

## Summary

| Severity | Count |
| --- | ---: |
| Blocker | 1 |
| Critical | 1 |
| High | 3 |
| Medium | 1 |
| Low | 1 |

## Confirmed improvements

- Backend suite: 60/60 passed outside the restricted sandbox.
- Frontend suite: 8/8 passed.
- Frontend lint and build pass.
- Synthetic happy path and recoverable 503 state work without console errors.
- Schema-constrained draft output, typed route errors, whole-draft checking, and a bounded validation retry are present.

## Release blockers

1. The configured 20-second SDK timeout is applied as 20 milliseconds.
2. Actual HTTP timeouts become a retried 502 instead of a one-attempt 503.
3. Common definitive-diagnosis wording bypasses the safety guard.
4. The prompt trust boundary is injectable and omits decision-relevant evidence.
5. Production dependency and Python declarations do not match the tested environment.

## Browser evidence

- Synthetic end-to-end assessment completed and rendered a technician brief.
- Gemini-mode missing-key flow rendered recovery controls and preserved input.
- Console warnings and errors were empty in both flows.
- The 503 UI exposes raw JSON response text and needs presentation cleanup.

The gstack launcher was unavailable because Bash is not installed on this Windows host, so this report was generated using the skill's documented degraded workflow. Application source was not edited.
