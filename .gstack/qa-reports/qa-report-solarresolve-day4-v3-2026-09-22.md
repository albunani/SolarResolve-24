# SolarResolve Day 4 V3 QA Report

- **Date:** 2026-09-22
- **Implementation commit:** `65dc33096b61e4de9361f33dc81bf80cfd2fd028`
- **Evidence-report commit:** `4da0568bcaabba8e6c6403e4c6f06b02199b76af`
- **Mode:** Regression, report-only
- **Overall status:** Fail
- **QA health score:** 94/100

The authoritative evidence and acceptance matrix are in [`VALIDATION_DAY4_V3.md`](../../VALIDATION_DAY4_V3.md).

## Summary

| Severity | Count |
| --- | ---: |
| Blocker | 0 |
| Critical | 0 |
| High | 2 |
| Medium | 0 |
| Low | 1 |

## Confirmed V3 improvements

- Backend: 104/104 tests pass.
- Frontend: 8/8 tests pass; lint and build are clean.
- A 20-second timeout reaches the SDK as 20,000 ms.
- Actual HTTP timeouts return one-attempt 503 responses.
- V2 definitive-diagnosis bypass phrases are rejected without leakage.
- Prompt evidence and synthetic cause behavior are restored.
- Browser happy path and clean 503 presentation work without console errors.

## Remaining failures

1. Edit Evidence after a provider error clears every entered field. Reproduced twice.
2. The diagnosis detector rejects some explicitly uncertain or professional-verification statements, creating avoidable 502 responses.
3. The work report's exact file inventory does not match the implementation commit.

## Regression result

- Previous score: 71/100
- Current score: 94/100
- Delta: +23
- Original V2 blocker fixed: yes
- Production Gemini accepted: no

The QA launcher was unavailable because Bash is not installed on this Windows host, so the report was produced using the skill's documented degraded workflow. Application source was not edited.
