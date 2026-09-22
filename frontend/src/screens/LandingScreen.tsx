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
            <h1 style={{ color: 'var(--color-solar-500)' }}>Turn your solar observations into a clear assessment.</h1>
            <p style={{ fontSize: '20px', marginBottom: 'var(--space-6)' }}>
              SolarResolve provides safety-aware decision support for declining battery runtimes. Organize your evidence before you spend money.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <Link to="/safety-check" className="primary-cta">Assess my battery</Link>
              <Link to="/help" className="secondary-cta" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}>Help & Contact</Link>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src={logoStacked} alt="SolarResolve logo" style={{ maxWidth: '80%', height: 'auto' }} />
          </div>
        </div>
      </section>

      {/* Scope Status */}
      <section style={{ padding: 'var(--space-4) 0', backgroundColor: 'var(--color-solar-500)', color: 'var(--color-forest-900)' }}>
        <div className="container">
          <strong>Supported Scenario:</strong> This tool is currently designed exclusively for <strong>declining battery runtime</strong> 
          (e.g., your battery used to last until morning, but now shuts down early).
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container" style={{ marginTop: 'var(--space-12)' }}>
        <h2>How the assessment works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
          <div className="card">
            <h3>1. The Observation</h3>
            <p>You notice your battery is shutting down early, not charging fully, or acting strangely compared to when it was new.</p>
          </div>
          <div className="card">
            <h3>2. The Intake</h3>
            <p>Answer a few safe questions about your setup and optionally provide a photo of your inverter display.</p>
          </div>
          <div className="card">
            <h3>3. The Assessment</h3>
            <p>Get a clear, technician-ready brief and recommended safety checks without doing any dangerous physical probing.</p>
          </div>
        </div>
      </section>

      {/* Audience Selector */}
      <section id="who-it-is-for" className="container" style={{ marginTop: 'var(--space-16)' }}>
        <h2>Who is SolarResolve for?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          <div className="card" style={{ borderTop: '4px solid var(--color-grid-green)' }}>
            <h3>For System Owners</h3>
            <p>Understand why your battery is dying early without getting shocked or paying for unnecessary replacements.</p>
            <Link to="/safety-check" className="primary-cta" style={{ marginTop: 'var(--space-4)' }}>Start an assessment</Link>
          </div>
          <div className="card" style={{ borderTop: '4px solid var(--color-solar-500)' }}>
            <h3>For Technicians</h3>
            <p>Get a structured, formatted brief with load calculations and change patterns from your clients before you arrive on site.</p>
            <Link to="/about" className="primary-cta" style={{ marginTop: 'var(--space-4)' }}>Learn more</Link>
          </div>
        </div>
      </section>

      {/* Safety Context */}
      <section id="safety" className="container" style={{ marginTop: 'var(--space-16)' }}>
        <h2>Urgent Safety Reminder</h2>
        <div className="card">
          <p>
            If you see smoke, fire, severe heat, battery swelling, or exposed wiring, 
            <strong> stop immediately</strong>. Do not use this tool. Keep a safe distance 
            and contact emergency help or a qualified professional.
          </p>
          <p style={{ marginTop: 'var(--space-2)' }}>
            <strong>Decision Support Only</strong><br />
            SolarResolve provides <em>decision support</em>. It does <strong>not</strong> provide a confirmed professional 
            diagnosis or replace a qualified solar technician.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingScreen;
