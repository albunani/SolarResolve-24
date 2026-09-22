import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import * as ApiModule from '../services/api';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('D4V3-001 Recovery Flow', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('preserves evidence when Edit Evidence is clicked after a failure', async () => {
    vi.spyOn(ApiModule, 'generateAssessment').mockRejectedValueOnce(new Error('Temporarily unavailable'));
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Home
    await user.click(screen.getAllByRole('link', { name: /Assess my battery/i })[0]);

    // Safety check
    await user.click(screen.getByLabelText(/None of these observed/i));
    await user.click(screen.getByRole('button', { name: /^Continue$/i }));

    // Intake Screen
    await user.type(screen.getByRole('textbox', { name: /Describe the issue in your own words/i }), 'Battery dies early');
    await user.type(screen.getByRole('textbox', { name: /^Previous Runtime$/i }), '10');
    await user.type(screen.getByRole('textbox', { name: /^Current Runtime$/i }), '4');

    // Fill loads
    await user.type(screen.getByRole('textbox', { name: /Appliance name/i }), 'Water Pump');
    await user.click(screen.getByRole('checkbox', { name: /Recently changed/i }));

    await user.click(screen.getByRole('button', { name: /^Continue$/i }));

    // Image Skip
    await user.click(screen.getByRole('button', { name: /Continue Without Image/i }));

    // Clarification Screen
    const select = screen.getAllByRole('combobox')[0];
    await user.selectOptions(select, 'Yes');

    // Generate Assessment
    await user.click(screen.getByRole('button', { name: /Generate Assessment/i }));

    // Wait for error
    // @ts-expect-error test
    expect(await screen.findByText(/Temporarily unavailable/i)).toBeInTheDocument();

    // Click Edit Evidence in the error panel
    const editBtns = screen.getAllByRole('button', { name: /Edit Evidence/i });
    await user.click(editBtns[0]);

    // Verify we navigated directly to the Intake screen
    // @ts-expect-error test
    expect(await screen.findByRole('heading', { name: /Evidence Intake/i })).toBeInTheDocument();

    // Verify Intake form is still populated
    // @ts-expect-error test
    expect(screen.getByRole('textbox', { name: /Describe the issue in your own words/i })).toHaveValue('Battery dies early');
    // @ts-expect-error test
    expect(screen.getByRole('textbox', { name: /^Previous Runtime$/i })).toHaveValue('10');
    // @ts-expect-error test
    expect(screen.getByRole('textbox', { name: /^Current Runtime$/i })).toHaveValue('4');
    // @ts-expect-error test
    expect(screen.getByRole('textbox', { name: /Appliance name/i })).toHaveValue('Water Pump');
    // @ts-expect-error test
    expect(screen.getByRole('checkbox', { name: /Recently changed/i })).toBeChecked();

    // Navigate forward again
    await user.click(screen.getByRole('button', { name: /Continue/i }));
    await user.click(screen.getByRole('button', { name: /Continue Without Image/i }));

    // Verify Clarification answer is preserved
    const selectAgain = screen.getAllByRole('combobox')[0];
    // @ts-expect-error test
    expect(selectAgain).toHaveValue('Yes');
  });
});
