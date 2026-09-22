import { generateAssessment } from './api';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('API Service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sends the exact JSON body shape with top-level evidence key', async () => {
    const mockEvidence = { original_description: 'Test issue' };
    
    // Mock successful fetch response matching the required schema
    const mockResponse = {
      assessment_id: '123',
      status: 'safe_observations_recommended',
      summary: 'Test summary',
      known_facts: [],
      missing_or_uncertain: [],
      possible_causes: [],
      safe_checks: [],
      prohibited_actions: [],
      recommended_next_action: { action: 'Test', timeline: 'Now', requires_technician: false },
      disclaimer: 'Test disclaimer'
    };
    
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 })
    );

    await generateAssessment(mockEvidence);

    expect(fetch).toHaveBeenCalledTimes(1);
    const callArgs = vi.mocked(fetch).mock.calls[0];
    
    const requestOptions = callArgs[1] as RequestInit;
    const requestBody = JSON.parse(requestOptions.body as string);

    // Verify the exact shape: no flattened evidence
    expect(requestBody).toHaveProperty('evidence');
    expect(requestBody.evidence).toEqual(mockEvidence);
    expect(requestBody).not.toHaveProperty('original_description');
  });
});
