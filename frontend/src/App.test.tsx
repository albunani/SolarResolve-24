import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('SolarResolve MVP - Day 3', () => {
  it('renders Home and scope screen and navigates to Safety check on CTA click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // 1. Verify Home & Scope screen renders
    // @ts-expect-error test
    expect(screen.getByText('SolarResolve')).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getByText(/declining battery runtime/i)).toBeInTheDocument();
    
    // 2. Verify the decision-support limitation is present
    // @ts-expect-error test
    expect(screen.getByText(/not/i, { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getAllByText(/decision support/i).length).toBeGreaterThan(0);

    // 3. Verify primary CTA is labeled correctly and is present
    const cta = screen.getByRole('button', { name: /Assess my battery-runtime problem/i });
    // @ts-expect-error test
    expect(cta).toBeInTheDocument();

    // 4. Simulate user click on CTA
    const user = userEvent.setup();
    await user.click(cta);

    // 5. Verify navigation to Safety-check destination
    // @ts-expect-error test
    expect(screen.getByText('Safety Check')).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getByText(/Before we continue, please confirm whether any of the following urgent hazards are present/i)).toBeInTheDocument();
  });
});
