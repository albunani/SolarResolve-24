import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OutcomeScreen: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get('reference');

  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--color-grid-green)' }}>You have joined the pilot waitlist</h1>
        <p style={{ fontSize: '18px', margin: 'var(--space-4) 0' }}>
          Your reference is <strong>{reference || 'SR-XXXX'}</strong>.
        </p>
        <p>
          We will review sign-ups by community before contacting participants. 
          Joining creates no payment obligation, and final terms precede installation.
        </p>
        <div style={{ marginTop: 'var(--space-8)' }}>
          <Link to="/" className="primary-cta">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OutcomeScreen;
