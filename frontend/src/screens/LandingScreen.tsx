import React from 'react';
import { Link } from 'react-router-dom';
import logoStacked from '../assets/logo-2.png';

const LandingScreen: React.FC = () => {
  return (
    <div style={{ paddingBottom: 'var(--space-16)' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--color-forest-900)', color: 'var(--color-white)', padding: 'var(--space-12) 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
          <div>
            <h1 style={{ color: 'var(--color-solar-500)' }}>Reliable power from the solar system next door</h1>
            <p style={{ fontSize: '20px', marginBottom: 'var(--space-6)' }}>
              Join the SolarPeer 360 pilot to buy measured, prepaid solar energy directly from your neighbors. No deposits. No hidden fees.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Link to="/pilot" className="primary-cta">Join the pilot</Link>
              <Link to="/help" className="secondary-cta" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}>Help & Contact</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src={logoStacked} alt="SolarPeer 360 logo" style={{ maxWidth: '80%', height: 'auto' }} />
          </div>
        </div>
      </section>

      {/* Pilot Status */}
      <section style={{ padding: 'var(--space-4) 0', backgroundColor: 'var(--color-solar-500)', color: 'var(--color-forest-900)' }}>
        <div className="container">
          <strong>Pilot Status (Sep 2026):</strong> Currently collecting waitlist interest in Lagos, Niger State, and FCT Abuja. 
          The public price assumption is ₦250 per kWh and is not presented as final.
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container" style={{ marginTop: 'var(--space-12)' }}>
        <h2>How sharing works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
          <div className="card">
            <h3>1. The Hub</h3>
            <p>An existing solar owner gets an approved hub installed, connected to their panels and battery.</p>
          </div>
          <div className="card">
            <h3>2. The Connection</h3>
            <p>A smart meter is installed at your shop or home, connected by cable to the nearby hub.</p>
          </div>
          <div className="card">
            <h3>3. The Power</h3>
            <p>You pay for electricity (kWh) upfront, just like standard prepaid meters. The solar owner's reserve is always protected.</p>
          </div>
        </div>
      </section>

      {/* Audience Selector */}
      <section id="who-it-is-for" className="container" style={{ marginTop: 'var(--space-16)' }}>
        <h2>Who is SolarPeer for?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <div className="card" style={{ borderTop: '4px solid var(--color-grid-green)' }}>
            <h3>For Buyers</h3>
            <p>Keep lights, refrigeration, and small equipment running without buying your own solar system. Pay for what you use.</p>
            <Link to="/pilot?interest=buyer" className="primary-cta" style={{ marginTop: 'var(--space-4)' }}>Join as a buyer</Link>
          </div>
          <div className="card" style={{ borderTop: '4px solid var(--color-solar-500)' }}>
            <h3>For Solar Owners</h3>
            <p>Earn from measured spare energy without risking your household supply. Become an Energy CEO in your community.</p>
            <Link to="/pilot?interest=solar_owner" className="primary-cta" style={{ marginTop: 'var(--space-4)' }}>Join as a solar owner</Link>
          </div>
        </div>
      </section>

      {/* Pricing Context */}
      <section id="pricing" className="container" style={{ marginTop: 'var(--space-16)' }}>
        <h2>Pilot Pricing Context</h2>
        <div className="card">
          <p><strong>Proposed Pilot Price:</strong> ₦250 per kWh (Assumption only, final terms provided before activation).</p>
          <p style={{ marginTop: 'var(--space-2)' }}>
            <strong>What is a Power Limit?</strong><br />
            You buy energy in kWh, but your connection has a maximum power limit in Watts (e.g., 500W, 1000W). 
            This determines how many appliances you can run at the same time safely.
          </p>
        </div>
      </section>

      {/* Trust & Evidence */}
      <section className="container" style={{ marginTop: 'var(--space-16)' }}>
        <h2>Trust & Verification</h2>
        <p>
          Every site undergoes a rigorous technical assessment before any connection is made. Only approved installers 
          may install, commission, or alter equipment. All transactions are securely metered.
        </p>
        <Link to="/about" style={{ display: 'inline-block', marginTop: 'var(--space-2)' }}>Read more about our operations</Link>
      </section>
    </div>
  );
};

export default LandingScreen;
