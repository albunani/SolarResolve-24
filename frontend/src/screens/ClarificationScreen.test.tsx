import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ClarificationScreen from './ClarificationScreen';
import * as ContextModule from '../context/AssessmentContext';
import * as ApiModule from '../services/api';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('ClarificationScreen', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('handles recoverable generation failure (timeout/500)', async () => {
    const mockDispatch = vi.fn();
    vi.spyOn(ContextModule, 'useAssessment').mockReturnValue({
      state: {
        step: 'image_complete',
        hazardSafe: true,
        triggeredHazards: [],
        evidence: { originalDescription: 'Test', loads: [] } as any,
        imageObservations: [],
        clarificationAnswers: [{ question: 'Q1', answer: '' }],
        processing: false,
        lateHazardIds: [],
        result: null,
        error: null
      },
      dispatch: mockDispatch
    });

    vi.spyOn(ApiModule, 'generateAssessment').mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <ClarificationScreen />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    const select = screen.getAllByRole('combobox')[0];
    await user.selectOptions(select, 'Yes');

    const generateBtn = screen.getByRole('button', { name: /Generate Assessment/i });
    await user.click(generateBtn);

    // Wait for the error to display
    // @ts-expect-error test
    expect(await screen.findByText(/Network error/i)).toBeInTheDocument();
    
    // Verify input is preserved
    expect((select as HTMLSelectElement).value).toBe('Yes');

    // Verify retry works
    const retryBtn = screen.getByRole('button', { name: /Retry/i });
    
    vi.spyOn(ApiModule, 'generateAssessment').mockResolvedValueOnce({ assessment_id: '123' } as any);
    await user.click(retryBtn);
    
    expect(ApiModule.generateAssessment).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_RESULT', result: { assessment_id: '123' } });
  });
});
