/**
 * API service — honest error handling, no fake-success fallback.
 *
 * - Network/timeout/5xx → recoverable error with Retry + Back
 * - Never displays partial response as completed assessment
 * - Backend URL from typed config
 * - Schema validation on success response
 */

import { API_BASE_URL } from './config';
import type { AssessmentResult, ImageObservation } from '../types/assessment';

const REQUIRED_RESULT_KEYS: (keyof AssessmentResult)[] = [
  'assessment_id', 'status', 'summary', 'known_facts',
  'missing_or_uncertain', 'possible_causes', 'safe_checks',
  'prohibited_actions', 'recommended_next_action', 'disclaimer',
];

function validateResultSchema(data: unknown): data is AssessmentResult {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return REQUIRED_RESULT_KEYS.every(key => key in obj);
}

/**
 * Parse a backend error response into a clean user-facing message.
 * Never exposes raw JSON or internal details.
 */
function parseErrorMessage(status: number, body: string): string {
  // Try to extract `detail` from a JSON error body
  try {
    const parsed = JSON.parse(body);
    if (typeof parsed?.detail === 'string') {
      return parsed.detail;
    }
  } catch {
    // Not JSON — fall through
  }

  // Fallback: clean status-based messages
  if (status === 503) {
    return 'The assessment service is temporarily unavailable. Please try again shortly.';
  }
  if (status === 502) {
    return 'The assessment could not be completed. Please try again.';
  }
  if (status === 422) {
    return 'Some evidence fields are invalid. Please review and correct your input.';
  }
  return 'An unexpected error occurred. Please try again.';
}

export async function generateAssessment(
  evidence: Record<string, unknown>,
  clarifications?: Array<{ question: string; answer: string }>,
  imageObservations?: Array<ImageObservation>,
): Promise<AssessmentResult> {
  const url = `${API_BASE_URL}/api/v1/assessments/inline/generate`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      evidence,
      clarifications,
      image_observations: imageObservations,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(parseErrorMessage(response.status, body));
  }

  const data: unknown = await response.json();

  if (!validateResultSchema(data)) {
    throw new Error('Invalid assessment response schema from server.');
  }

  return data;
}

export async function checkHazards(
  hazardsReported: string[],
  noneObserved: boolean,
): Promise<{ is_safe: boolean; escalation_message?: string; triggered_hazards?: string[] }> {
  const url = `${API_BASE_URL}/api/v1/assessments/check-hazards`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hazards_reported: hazardsReported, none_observed: noneObserved }),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Hazard check failed (${response.status})`);
  }
  return response.json();
}
