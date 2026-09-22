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
      <div className="screen-container">
        <main className="container form-main escalation-container">
          <h1>Urgent Safety Hazard Detected</h1>
          <p className="escalation-text" role="alert">{ESCALATION_MESSAGE}</p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
            Do not continue with the assessment. Ensure everyone is at a safe distance.
          </p>
          <button className="secondary-btn" onClick={() => { dispatch({ type: 'RESET' }); navigate('/'); }}>Return Home</button>
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
    <div className="screen-container">
      <main className="container form-main">
        <header className="form-header">
          <h1>Safety Check</h1>
          <p>Before we continue, please confirm whether any of the following urgent hazards are present.</p>
        </header>

        <section className="form-section">
          <fieldset className="checkbox-group">
            <legend className="sr-only">Hazard indicators</legend>
            {HAZARD_FLAGS.map(h => (
              <label key={h.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={!!selected[h.id]}
                  onChange={e => handleHazardChange(h.id, e.target.checked)}
                  aria-describedby={error ? 'hazard-error' : undefined}
                />
                <span className="checkbox-text">{h.label}</span>
              </label>
            ))}
            <hr className="divider" />
            <label className="checkbox-label none-label">
              <input
                type="checkbox"
                checked={noneObserved}
                onChange={e => handleNoneChange(e.target.checked)}
              />
              <span className="checkbox-text">None of these observed (safe to proceed)</span>
            </label>
          </fieldset>

          {error && (
            <p id="hazard-error" className="field-error" role="alert">{error}</p>
          )}
        </section>

        <div className="form-actions">
          <button className="secondary-btn" onClick={() => navigate('/')}>Back</button>
          <button className="primary-cta" onClick={handleContinue}>Continue</button>
        </div>
      </main>
    </div>
  );
}
