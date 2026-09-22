import React from 'react';

const HelpScreen: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', maxWidth: '800px' }}>
      <h1>Help & Contact</h1>
      <div className="card">
        <h2>Frequently Asked Questions</h2>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h3>Is there a deposit?</h3>
          <p>No, there are no hidden deposits. Final terms will be presented before any installation happens.</p>
        </div>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h3>How much does it cost?</h3>
          <p>The current pilot assumption is ₦250 per kWh. You only pay for what you use, upfront.</p>
        </div>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h3>Is this available nationwide?</h3>
          <p>No, this is a controlled pilot in Lagos, Niger State, and FCT Abuja. We are actively reviewing communities with clustered interest.</p>
        </div>
      </div>
      
      <div className="card" style={{ marginTop: 'var(--space-8)' }}>
        <h2>Contact the Pilot Team</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 'var(--space-2)' }}><strong>WhatsApp:</strong> +234 800 123 4567</li>
          <li style={{ marginBottom: 'var(--space-2)' }}><strong>Phone:</strong> 0800 SOLARPEER</li>
          <li style={{ marginBottom: 'var(--space-2)' }}><strong>Email:</strong> pilot@solarpeer360.com</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpScreen;
