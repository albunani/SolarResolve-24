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
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(
      `Assessment service error (${response.status}): ${detail || 'Unknown error'}`,
    );
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
