import React from 'react';
import { Link } from 'react-router-dom';

const urgentHazards = [
  'Smoke, flame, sparks, or a burning smell',
  'Severe or unusual heat from a battery, inverter, cable, plug, or breaker',
  'Battery swelling, leaking, hissing, cracking, or a damaged case',
  'Exposed wires, wet electrical equipment, or water entering the installation area',
  'Signs of electric shock, tingling, arcing sounds, or repeated tripping',
];

const prohibitedActions = [
  'Do not touch, open, disconnect, reconnect, probe, or attempt to repair the equipment.',
  'Do not remove covers, expose terminals, bridge contacts, bypass protection devices, or change protected settings.',
  'Do not pour water on electrical equipment, move a damaged battery, or keep using a system that shows urgent warning signs.',
  'Do not use SolarResolve as permission to continue operating unsafe equipment.',
];

const safeObservations = [
  'The runtime you used to get compared with the runtime you get now',
  'Whether your night-time appliance use changed recently',
  'A model label, display reading, or indicator light only if it is already visible from a safe distance',
  'What happened before the problem started, such as a long outage, storm, new load, or recent service visit',
];

const SafetyGuidanceScreen: React.FC = () => {
  return (
    <main className="safety-guidance-page" id="main-content">
      <section className="safety-guidance-hero" aria-labelledby="safety-guidance-title">
        <div className="container safety-guidance-hero-grid">
          <div>
            <p className="sr-eyebrow">
              <span className="sr-dot-pulse" aria-hidden="true" /> Safety guidance
            </p>
            <h1 id="safety-guidance-title">Stop first. Assess only when it is safe.</h1>
            <p>
              SolarResolve can help organize battery-runtime observations, but it cannot inspect equipment,
              make the area safe, or replace a qualified solar or electrical professional.
            </p>
          </div>
          <aside className="safety-guidance-alert" aria-label="Immediate hazard warning">
            <span className="sr-stop-icon" aria-hidden="true">!</span>
            <div>
              <h2>Immediate hazard?</h2>
              <p>
                Keep a safe distance, keep others away, and contact qualified help. Only use a clearly labelled
                external isolator if you already know how to do so safely.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="safety-guidance-content" aria-labelledby="urgent-hazards-title">
        <div className="container safety-guidance-layout">
          <div className="safety-guidance-main">
            <section className="safety-guidance-panel safety-guidance-panel-danger">
              <p className="landing-kicker">Stop normal assessment</p>
              <h2 id="urgent-hazards-title">Get qualified help if you notice any of these.</h2>
              <ul className="safety-guidance-list">
                {urgentHazards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="safety-guidance-panel">
              <p className="landing-kicker">Never do this yourself</p>
              <h2>Actions SolarResolve will not ask you to take.</h2>
              <ul className="safety-guidance-list">
                {prohibitedActions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="safety-guidance-panel">
              <p className="landing-kicker">Safe evidence only</p>
              <h2>What you can prepare when there is no urgent hazard.</h2>
              <ul className="safety-guidance-list">
                {safeObservations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="safety-guidance-side">
            <div className="sr-card">
              <h2>When to continue</h2>
              <p>
                Continue only if none of the urgent hazard signs are present and the information you provide is
                already safe to observe. The first step in the assessment will still ask you to confirm this.
              </p>
              <Link to="/safety-check" className="primary-cta safety-guidance-cta">
                Start mandatory safety check
              </Link>
            </div>
            <div className="safety-guidance-note">
              <h2>Decision support only</h2>
              <p>
                A SolarResolve result can summarize reported facts, missing details, possible explanations, and
                safer next steps. It cannot certify that a battery, inverter, wiring, or protection device is safe.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default SafetyGuidanceScreen;
