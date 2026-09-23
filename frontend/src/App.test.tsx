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
    expect(screen.getAllByText(/SolarResolve/i)[0]).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getAllByText(/declining battery runtime/i)[0]).toBeInTheDocument();
    
    // 2. Verify the decision-support limitation is present
    // @ts-expect-error test
    expect(screen.getByText(/not/i, { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getAllByText(/decision support/i).length).toBeGreaterThan(0);

    // 3. Verify primary CTA is labeled correctly and is present
    const cta = screen.getAllByRole('link', { name: /Assess my battery/i })[0];
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

  it('opens public safety guidance from the landing page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: /Read the safety guidance/i }));

    // @ts-expect-error test
    expect(screen.getByRole('heading', { name: /Stop first. Assess only when it is safe./i })).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getByText(/Do not touch, open, disconnect, reconnect, probe, or attempt to repair/i)).toBeInTheDocument();
    // @ts-expect-error test
    expect(screen.getByRole('link', { name: /Start mandatory safety check/i })).toBeInTheDocument();
  });

  it('opens safety guidance from the header on another route', async () => {
    render(
      <MemoryRouter initialEntries={['/help']}>
        <App />
      </MemoryRouter>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Safety First' }));

    // @ts-expect-error test
    expect(screen.getByRole('heading', { name: /Stop first. Assess only when it is safe./i })).toBeInTheDocument();
  });

  it('gives every header action a real destination from the help page', () => {
    render(
      <MemoryRouter initialEntries={['/help']}>
        <App />
      </MemoryRouter>
    );

    // @ts-expect-error test
    expect(screen.getByRole('link', { name: 'How it works' })).toHaveAttribute('href', '/#how-it-works');
    // @ts-expect-error test
    expect(screen.getByRole('link', { name: 'Safety First' })).toHaveAttribute('href', '/safety-guidance');
    // @ts-expect-error test
    expect(screen.getByRole('link', { name: 'Help' })).toHaveAttribute('href', '/help');
    // @ts-expect-error test
    expect(screen.getByRole('link', { name: 'Assess my battery' })).toHaveAttribute('href', '/safety-check');
  });
});
