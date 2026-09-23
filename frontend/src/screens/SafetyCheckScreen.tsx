import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { HAZARD_FLAGS, ESCALATION_MESSAGE } from '../safety/hazardPolicy';
import './FormStyles.css';

export default function SafetyCheckScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [noneObserved, setNoneObserved] = useState(false);
  const [error, setError] = useState('');

  // If already escalated via context, show escalation
  if (state.step === 'escalated') {
    return (
      <div className="screen-container" style={{ padding: '40px 20px', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <main className="container" style={{ maxWidth: '640px', width: '100%' }}>
          <div className="sr-card" style={{ background: 'var(--sr-danger-tint)', border: '2px solid var(--sr-danger)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div className="sr-stop-icon" aria-hidden="true">!</div>
              <h1 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '24px', color: 'var(--sr-danger)', margin: 0 }}>Urgent Safety Hazard Detected</h1>
            </div>
            <p className="escalation-text" role="alert" style={{ fontSize: '16px', fontWeight: 700, color: '#5A1A1A', marginBottom: '16px' }}>
              {ESCALATION_MESSAGE}
            </p>
            <div style={{ background: '#FFF', padding: '18px', borderRadius: '8px', borderLeft: '4px solid var(--sr-danger)', marginBottom: '20px', color: 'var(--sr-energy-ink)', fontSize: '15px', lineHeight: 1.6 }}>
              <p><strong>1. Keep a safe distance.</strong> Ensure all household members remain clear of the equipment room.</p>
              <p style={{ marginTop: '6px' }}><strong>2. Do not touch, open, disconnect, probe, or attempt to repair.</strong></p>
              <p style={{ marginTop: '6px' }}><strong>3. Switch off external isolator</strong> ONLY if safe and clearly labelled.</p>
              <p style={{ marginTop: '6px' }}><strong>4. Contact emergency services or a qualified solar electrician immediately.</strong></p>
            </div>
            <button className="sr-cta-btn" style={{ background: 'var(--sr-danger)', color: '#FFF' }} onClick={() => { dispatch({ type: 'RESET' }); navigate('/'); }}>
              Return Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  const handleHazardChange = (id: string, checked: boolean) => {
    setSelected(prev => ({ ...prev, [id]: checked }));
    if (checked) setNoneObserved(false);
    setError('');
  };

  const handleNoneChange = (checked: boolean) => {
    setNoneObserved(checked);
    if (checked) setSelected({});
    setError('');
  };

  const hasSelection = Object.values(selected).some(Boolean) || noneObserved;

  const handleContinue = () => {
    const activeHazards = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
    if (!activeHazards.length && !noneObserved) {
      setError('Please select at least one hazard or confirm none are observed.');
      return;
    }
    if (activeHazards.length) {
      dispatch({ type: 'HAZARD_ESCALATION', hazards: activeHazards });
    } else {
      dispatch({ type: 'HAZARD_SAFE' });
      navigate('/intake');
    }
  };

  return (
    <div className="screen-container" style={{ padding: '40px 20px', minHeight: 'calc(100vh - 120px)' }}>
      <main className="container" style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div className="sr-card">
          <span className="sr-eyebrow" style={{ color: 'var(--sr-earth)' }}>
            <span className="sr-dot-pulse" aria-hidden="true"></span> Step 1 of 4 · Mandatory Safety Check
          </span>
          <h1 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '28px', color: 'var(--sr-earth)', marginBottom: '8px' }}>
            Safety Check
          </h1>
          <p style={{ color: 'var(--sr-muted)', fontSize: '15px', marginBottom: '24px' }}>
            Before we continue, please confirm whether any of the following urgent hazards are present.
          </p>

          <fieldset className="checkbox-group" style={{ border: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <legend className="sr-only">Hazard indicators</legend>
            {HAZARD_FLAGS.map(h => (
              <label
                key={h.id}
                className="checkbox-label"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: 'var(--sr-radius-control)',
                  border: selected[h.id] ? '1.5px solid var(--sr-danger)' : '1px solid var(--sr-soft-line)',
                  background: selected[h.id] ? 'var(--sr-danger-tint)' : 'var(--sr-surface)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <input
                  type="checkbox"
                  checked={!!selected[h.id]}
                  onChange={e => handleHazardChange(h.id, e.target.checked)}
                  aria-describedby={error ? 'hazard-error' : undefined}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--sr-danger)' }}
                />
                <span className="checkbox-text" style={{ fontSize: '15px', color: 'var(--sr-energy-ink)', fontWeight: selected[h.id] ? 700 : 500 }}>
                  {h.label}
                </span>
              </label>
            ))}

            <hr style={{ border: 'none', borderTop: '1px solid var(--sr-soft-line)', margin: '8px 0' }} />

            <label
              className="checkbox-label none-label"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: 'var(--sr-radius-control)',
                border: noneObserved ? '1.5px solid var(--sr-success)' : '1px solid var(--sr-soft-line)',
                background: noneObserved ? 'var(--sr-success-tint)' : 'var(--sr-surface-subtle)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <input
                type="checkbox"
                checked={noneObserved}
                onChange={e => handleNoneChange(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--sr-success)' }}
              />
              <span className="checkbox-text" style={{ fontSize: '15px', color: 'var(--sr-energy-ink)', fontWeight: noneObserved ? 700 : 600 }}>
                None of these observed (safe to proceed)
              </span>
            </label>
          </fieldset>

          {error && (
            <p id="hazard-error" className="field-error" role="alert" style={{ color: 'var(--sr-danger)', marginTop: '14px', fontWeight: 600 }}>
              {error}
            </p>
          )}

          <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
            <button className="sr-btn-outline" onClick={() => navigate('/')}>
              Back
            </button>
            <button
              className="primary-cta"
              onClick={handleContinue}
              disabled={!hasSelection}
              aria-disabled={!hasSelection}
              style={{
                background: hasSelection ? 'var(--sr-saffron)' : 'var(--sr-soft-line)',
                color: hasSelection ? 'var(--sr-energy-ink)' : 'var(--sr-muted)',
                fontWeight: 700,
                borderRadius: 'var(--sr-radius-control)',
                padding: '10px 24px',
                minHeight: '44px',
                cursor: hasSelection ? 'pointer' : 'not-allowed',
                opacity: hasSelection ? 1 : 0.65,
                transition: 'all 0.2s ease',
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
