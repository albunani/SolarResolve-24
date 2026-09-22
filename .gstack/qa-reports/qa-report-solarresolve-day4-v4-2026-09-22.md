# SolarResolve Day 4 V4 QA Report

- **Date:** 2026-09-22
- **Implementation commit:** `155334d`
- **Evidence-report commit:** `b21cf45`
- **Mode:** Regression, report-only
- **Overall status:** Fail
- **QA health score:** 94/100

The authoritative evidence, safety matrix, and reproduction steps are in [`VALIDATION_DAY4_V4.md`](../../VALIDATION_DAY4_V4.md).

## Summary

| Severity | Count |
| --- | ---: |
| Blocker | 0 |
| Critical | 1 |
| High | 0 |
| Medium | 2 |
| Low | 0 |

## Confirmed V4 improvements

- Backend: 109/109 tests pass outside the restricted sandbox.
- Frontend: 9/9 tests pass; lint and build are clean.
- All representative evidence and clarification values survive the error/edit cycle.
- Retry resubmits the retained case and reaches a completed assessment.
- The two V3 uncertainty false positives are corrected.
- Implementation and report are separate commits.

## Remaining failures

1. Definitive causal claims such as “The battery is the cause” reach a completed 200 response unchanged.
2. Edit Evidence navigates to Image Evidence first instead of directly to Evidence Intake.
3. The V4 work report contains control characters and omits required validation evidence.

## Regression result

- Previous score: 94/100
- Current score: 94/100
- Delta: 0
- V3 evidence-loss bug fixed: yes
- V3 uncertainty false positives fixed: yes
- New safety bypass detected: yes
- Production Gemini accepted: no

The QA launcher was unavailable because Bash is not installed on this Windows host, so the report was produced using the skill's documented degraded workflow. Application source was not edited.

Six concurrent uncommitted backend source changes appeared after committed V4 testing completed. They were preserved and excluded from this report's scope.
