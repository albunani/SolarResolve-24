import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type LoadChange = 'yes' | 'no' | 'unsure';

const LandingScreen: React.FC = () => {
  const [previousRuntime, setPreviousRuntime] = useState('10');
  const [currentRuntime, setCurrentRuntime] = useState('4');
  const [loadChange, setLoadChange] = useState<LoadChange>('unsure');

  const runtimeInsight = useMemo(() => {
    const previous = Number(previousRuntime);
    const current = Number(currentRuntime);

    if (!Number.isFinite(previous) || !Number.isFinite(current) || previous <= 0 || current < 0) return null;
    if (current > previous) return { type: 'improved' as const, change: 0 };
    return { type: 'declined' as const, change: Math.round(((previous - current) / previous) * 100) };
  }, [previousRuntime, currentRuntime]);

  return (
    <main className="landing-page" id="main-content">
      <section className="landing-hero" aria-labelledby="hero-heading">
        <div className="landing-hero-grid" aria-hidden="true" />
        <div className="landing-orbit landing-orbit-one" aria-hidden="true" />
        <div className="landing-orbit landing-orbit-two" aria-hidden="true" />
        <div className="container landing-hero-content">
          <div className="landing-hero-copy">
            <p className="landing-eyebrow"><span className="landing-pulse" aria-hidden="true" /> Safety-aware battery-runtime assessment</p>
            <h1 id="hero-heading">Your solar battery does not last like it used to. <em>Turn what changed into a clearer next step.</em></h1>
            <p className="landing-hero-lede">SolarResolve helps you organize what you have noticed into useful evidence, a structured assessment, and a technician-ready brief.</p>
            <div className="landing-hero-actions">
              <Link to="/safety-check" className="landing-button landing-button-primary">Assess my battery-runtime problem <span aria-hidden="true">→</span></Link>
              <a href="#sample-result" className="landing-button landing-button-quiet">See a sample assessment</a>
            </div>
            <ul className="landing-assurances" aria-label="Assessment assurances"><li>Starts with a safety check</li><li>Photo is optional</li><li>Decision support, not a diagnosis</li></ul>
          </div>
          <aside className="landing-hero-proof" aria-label="SolarResolve output preview">
            <div className="landing-proof-topline"><span>YOUR ASSESSMENT</span><span className="landing-proof-state">Evidence ready</span></div>
            <div className="landing-proof-status"><span className="landing-status-mark" aria-hidden="true">✓</span><div><strong>Clearer technician brief</strong><p>Built from observations you confirm.</p></div></div>
            <dl className="landing-proof-data"><div><dt>Reported runtime</dt><dd>10h <span>→</span> 4h</dd></div><div><dt>Evidence status</dt><dd>2 details missing</dd></div></dl>
            <div className="landing-proof-divider" />
            <p className="landing-proof-label">WHAT THE RESULT KEEPS SEPARATE</p>
            <div className="landing-proof-list"><p><span>01</span> What we know</p><p><span>02</span> What may be happening</p><p><span>03</span> Safe next action</p></div>
            <p className="landing-proof-foot">The result does not claim to diagnose a component remotely.</p>
          </aside>
        </div>
      </section>

      <section className="landing-scope-bar" aria-label="Current supported scenario"><div className="container landing-scope-content"><span className="landing-scope-icon" aria-hidden="true">◎</span><p><strong>Currently supported:</strong> declining battery runtime, such as a battery that used to last until morning but now shuts down much earlier.</p><a href="#scope">What this does not cover <span aria-hidden="true">↗</span></a></div></section>

      <section className="landing-runtime-section" aria-labelledby="runtime-heading"><div className="container landing-runtime-grid">
        <div className="landing-section-intro"><p className="landing-kicker">A useful first check</p><h2 id="runtime-heading">Put the change into words and numbers.</h2><p>Your runtime change is useful evidence for a technician. It is not, on its own, proof that any component has failed.</p><div className="landing-mini-rule" aria-hidden="true"><span /><span /><span /></div></div>
        <div className="landing-runtime-card">
          <div className="landing-card-heading"><div><p className="landing-card-overline">RUNTIME CHANGE CHECK</p><h3>How long did it last before and now?</h3></div><span className="landing-card-step">1 min</span></div>
          <div className="landing-runtime-fields">
            <label><span>Previous typical runtime</span><div className="landing-number-field"><input aria-label="Previous typical runtime in hours" inputMode="decimal" min="0" type="number" value={previousRuntime} onChange={(event) => setPreviousRuntime(event.target.value)} /><b>hours</b></div></label>
            <span className="landing-runtime-arrow" aria-hidden="true">→</span>
            <label><span>Current typical runtime</span><div className="landing-number-field"><input aria-label="Current typical runtime in hours" inputMode="decimal" min="0" type="number" value={currentRuntime} onChange={(event) => setCurrentRuntime(event.target.value)} /><b>hours</b></div></label>
          </div>
          <fieldset className="landing-load-choice"><legend>Did your night-time appliance use change?</legend><div className="landing-choice-row">{([['yes', 'Yes, it changed'], ['no', 'No change'], ['unsure', 'I am not sure']] as Array<[LoadChange, string]>).map(([value, label]) => <button key={value} type="button" className={loadChange === value ? 'is-selected' : ''} aria-pressed={loadChange === value} onClick={() => setLoadChange(value)}>{label}</button>)}</div></fieldset>
          <div className="landing-runtime-insight" aria-live="polite">{runtimeInsight?.type === 'declined' ? <><span className="landing-insight-value">{runtimeInsight.change}%</span><p>Your reported runtime changed from <strong>{previousRuntime || '—'} hours</strong> to <strong>{currentRuntime || '—'} hours</strong>. That is meaningful evidence, but it does not identify the cause by itself.</p></> : runtimeInsight?.type === 'improved' ? <p>These values show a longer current runtime. Tell us what changed during the full assessment.</p> : <p>Enter a previous runtime above zero and a current runtime to see a simple comparison.</p>}</div>
          <Link to="/safety-check" className="landing-runtime-link">Continue with a safety check <span aria-hidden="true">→</span></Link>
        </div>
      </div></section>

      <section className="landing-process" id="how-it-works" aria-labelledby="process-heading"><div className="container"><div className="landing-process-heading"><p className="landing-kicker">How SolarResolve works</p><h2 id="process-heading">A calmer path from uncertainty to action.</h2><p>We help you prepare a useful record before you decide what to do next.</p></div><ol className="landing-steps"><li><span className="landing-step-number">01</span><div><h3>Describe what changed</h3><p>Share how the runtime used to compare with now, in plain language.</p></div></li><li><span className="landing-step-number">02</span><div><h3>Organize safe evidence</h3><p>Add known details, appliance changes, and an optional photo of a safely visible display.</p></div></li><li><span className="landing-step-number">03</span><div><h3>Take an informed next step</h3><p>Review facts, uncertainty, safe actions, and a technician-ready brief.</p></div></li></ol></div></section>

      <section className="landing-sample" id="sample-result" aria-labelledby="sample-heading"><div className="container landing-sample-grid"><div className="landing-sample-copy"><p className="landing-kicker">Example only</p><h2 id="sample-heading">A result that helps you ask better questions.</h2><p>Instead of giving a confident-sounding guess, SolarResolve shows the difference between confirmed observations, missing details, and possible explanations.</p><a href="#trust" className="landing-text-link">See our evidence standards <span aria-hidden="true">→</span></a></div><article className="landing-result-preview" aria-label="Example assessment result"><div className="landing-result-head"><p>ASSESSMENT SNAPSHOT</p><span>Example only</span></div><div className="landing-result-body"><section><p className="landing-result-label landing-result-known">WHAT WE KNOW</p><p>Reported runtime changed from about 10 hours to 4 hours.</p></section><section><p className="landing-result-label landing-result-missing">WHAT IS MISSING</p><p>Battery age and a recent charging indication were not provided.</p></section><section><p className="landing-result-label landing-result-may">WHAT MAY BE HAPPENING</p><p>Load, charging, battery condition, or configuration could contribute.</p></section><section><p className="landing-result-label landing-result-safe">SAFE NEXT STEP</p><p>Collect the model label and display reading if they are safely visible.</p></section></div></article></div></section>

      <section className="landing-trust" id="trust" aria-labelledby="trust-heading"><div className="container"><div className="landing-trust-heading"><p className="landing-kicker">Built to clarify uncertainty</p><h2 id="trust-heading">Not to hide it behind a score.</h2></div><div className="landing-commitments"><article><span aria-hidden="true">01</span><h3>Facts stay separate from possibilities.</h3><p>Your reported observations are not rewritten as confirmed faults.</p></article><article><span aria-hidden="true">02</span><h3>You confirm the evidence.</h3><p>You can review and correct collected details before a result is generated.</p></article><article><span aria-hidden="true">03</span><h3>Safety rules do not depend on AI.</h3><p>Urgent hazards stop the normal assessment before evidence intake continues.</p></article><article><span aria-hidden="true">04</span><h3>A technician remains the authority.</h3><p>Physical inspection, measurements, repair, and safety decisions need a qualified professional.</p></article></div></div></section>

      <section className="landing-safety" id="safety" aria-labelledby="safety-heading"><div className="container landing-safety-grid"><div className="landing-safety-symbol" aria-hidden="true"><span>!</span></div><div><p className="landing-kicker">Safety comes first</p><h2 id="safety-heading">Stop if there is an immediate hazard.</h2></div><div className="landing-safety-copy"><p>If you see smoke, fire, severe or unusual heat, battery swelling or leaking, hissing, sparks, exposed wires, signs of electric shock, or water entering electrical equipment, keep a safe distance and contact qualified help.</p><p><strong>Do not touch, open, disconnect, or attempt to repair the equipment.</strong></p><Link to="/safety-check">Read the safety guidance <span aria-hidden="true">→</span></Link></div></div></section>

      <section className="landing-faq" id="scope" aria-labelledby="faq-heading"><div className="container landing-faq-grid"><div><p className="landing-kicker">Questions, answered</p><h2 id="faq-heading">Know what this tool is for before you start.</h2><p>SolarResolve is intentionally narrow in this first version.</p></div><div className="landing-faq-list"><details open><summary>Is SolarResolve a replacement for a technician?</summary><p>No. It helps organize your observations and prepare questions, but it cannot inspect equipment, make measurements, or confirm a physical fault.</p></details><details><summary>What does SolarResolve currently support?</summary><p>This version focuses on declining battery runtime. It does not compare purchase quotations, sell equipment, or diagnose every solar fault.</p></details><details><summary>Is a photo required?</summary><p>No. A clear photo of an inverter or battery display can help when it is safely visible, but you can continue without one.</p></details><details><summary>What happens if I see smoke, sparks, heat, or swelling?</summary><p>Do not continue with normal intake. Keep a safe distance and contact a qualified solar or electrical professional.</p></details></div></div></section>

      <section className="landing-final-cta" aria-labelledby="final-heading"><div className="container"><p className="landing-kicker">Ready when it is safe</p><h2 id="final-heading">Give your technician a clearer starting point.</h2><p>Start with a safety check, then organize the observations you already have.</p><Link to="/safety-check" className="landing-button landing-button-primary">Assess my battery-runtime problem <span aria-hidden="true">→</span></Link></div></section>
    </main>
  );
};

export default LandingScreen;
