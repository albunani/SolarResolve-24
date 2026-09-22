import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AssessmentScreen from './AssessmentScreen';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockResult = {
  assessment_id: 'test-123',
  status: 'safe_observations_recommended',
  summary: 'Test summary',
  known_facts: [
    { label: 'Fact 1', display_value: 'Value 1', source: 'user', confirmed: true }
  ],
  missing_or_uncertain: [
    { label: 'Gap 1' }
  ],
  possible_causes: [
    { category: 'Cause 1', description: 'Desc 1', confidence: 'more consistent' }
  ],
  safe_checks: [
    { action: 'Check 1', reason: 'Reason 1' }
  ],
  prohibited_actions: [],
  recommended_next_action: { action: 'Next Action', timeline: 'Now', requires_technician: false },
  disclaimer: 'Test disclaimer',
  technician_brief: { generated_text: 'Test Brief Text' }
};

const renderWithContext = (ui: React.ReactNode) => {
  // We need to initialize the context with some state to simulate having a result
  // The easiest way is to mock the context if we can't easily seed it, but AssessmentProvider uses useReducer.
  // We can just render a mock provider instead, or actually interact with the app.
  // Let's just create a mock provider.
  return render(
    <MemoryRouter>
      {ui}
    </MemoryRouter>
  );
};

// ... Wait, to inject state into AssessmentProvider, we might need a custom provider or dispatch an action first.
// Let's just use a custom mock wrapper for useAssessment instead.
import * as ContextModule from '../context/AssessmentContext';

const mockWriteText = vi.fn().mockResolvedValue(undefined);

describe('AssessmentScreen', () => {
  beforeEach(() => {
    mockWriteText.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      configurable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all sections and allows copying the brief', async () => {
    const mockDispatch = vi.fn();
    vi.spyOn(ContextModule, 'useAssessment').mockReturnValue({
      state: {
        step: 'result_ready',
        hazardSafe: true,
        triggeredHazards: [],
        evidence: {} as any,
        imageObservations: [],
        clarificationAnswers: [],
        processing: false,
        lateHazardIds: [],
        result: mockResult as any,
        error: null
      },
      dispatch: mockDispatch
    });

    renderWithContext(<AssessmentScreen />);

    // Verify sections render
    // @ts-expect-error test
    expect(screen.getByText('Test summary')).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getByText(/Fact 1/)).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getByText(/Value 1/)).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getByText('Gap 1')).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getByText('Cause 1')).toBeInTheDocument();

    // Verify copying brief
    const user = userEvent.setup();
    const copyBtn = screen.getByRole('button', { name: /Copy Brief/i });
    fireEvent.click(copyBtn);


    // @ts-expect-error test
    expect(await screen.findByText(/Copied!/i)).toBeInTheDocument();

    // Verify new assessment reset
    const newBtn = screen.getByRole('button', { name: /Start New Assessment/i });
    await user.click(newBtn);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'RESET' });
  });
});
