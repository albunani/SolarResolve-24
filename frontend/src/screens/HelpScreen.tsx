import React from 'react';

const HelpScreen: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', maxWidth: '800px' }}>
      <h1>Help & Contact</h1>
      <div className="card">
        <h2>Frequently Asked Questions</h2>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h3>Is SolarResolve a replacement for a technician?</h3>
          <p>No, SolarResolve provides decision support to help you communicate effectively with a professional, but does not replace physical inspection.</p>
        </div>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h3>What should I do if I see smoke or sparks?</h3>
          <p>Keep a safe distance, do not touch the equipment, and immediately contact a qualified solar/electrical professional or emergency services.</p>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: 'var(--space-8)' }}>
        <h2>Contact Support</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 'var(--space-2)' }}><strong>Email:</strong> support@solarresolve.com</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpScreen;
