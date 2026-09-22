import React from 'react';
import { Link } from 'react-router-dom';

const AppAvailabilityScreen: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>The SolarPeer App</h1>
        <p style={{ margin: 'var(--space-4) 0' }}>
          The SolarPeer 360 Android app is currently in closed testing and is not available for general download.
        </p>
        <p>
          Access is tied to approved pilot participation and meter readiness. Please join the waitlist, and we will 
          provide access instructions when your community is selected.
        </p>
        <div style={{ marginTop: 'var(--space-8)' }}>
          <Link to="/pilot" className="primary-cta">Join the pilot waitlist</Link>
        </div>
      </div>
    </div>
  );
};

export default AppAvailabilityScreen;
