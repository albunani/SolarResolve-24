import { useNavigate, Navigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { useState } from 'react';
import './FormStyles.css';

export default function AssessmentScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const result = state.result;
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!result) {
    return <Navigate to="/" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent_safety_escalation': return '#ef4444';
      case 'professional_inspection_recommended': return '#f59e0b';
      case 'more_information_needed': return '#3b82f6';
      default: return 'var(--accent-primary)';
    }
  };

  const getStatusLabel = (status: string) => status.replace(/_/g, ' ').toUpperCase();

  const handleCopy = async () => {
    if (!result.technician_brief) return;
    try {
      await navigator.clipboard.writeText(result.technician_brief.generated_text);
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 3000);
    } catch {
      setCopyStatus('error');
    }
  };

  const handleNewAssessment = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <div className="screen-container">
      <main className="container form-main" style={{ maxWidth: '800px' }}>
        <header className="form-header">
          <h1>Assessment Result</h1>
          <div
            style={{
              display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '4px',
              backgroundColor: getStatusColor(result.status), color: '#000', fontWeight: 'bold',
              marginBottom: '1rem',
            }}
            role="status"
          >
            {getStatusLabel(result.status)}
          </div>
          <p style={{ fontSize: '1.1rem' }}>{result.summary}</p>
        </header>

        {result.status === 'more_information_needed' && (
          <section className="form-section" style={{ borderColor: '#3b82f6' }}>
            <h2 style={{ color: '#3b82f6' }}>More Information Needed</h2>
            <p style={{ color: 'var(--text-secondary)' }}>The evidence provided is not sufficient for a meaningful assessment. Please provide the following:</p>
            <ul style={{ listStylePosition: 'inside', color: 'var(--text-primary)' }}>
              {result.missing_or_uncertain.map((gap, i) => (
                <li key={i}>{gap.label}</li>
              ))}
            </ul>
            <button className="primary-cta" onClick={() => navigate('/intake')} style={{ marginTop: '1rem' }}>
              Add More Evidence
            </button>
          </section>
        )}

        <div className="form-row">
          <section className="form-section">
            <h2>Known Facts</h2>
            <dl style={{ color: 'var(--text-secondary)' }}>
              {result.known_facts.map((fact, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <dt style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'inline' }}>{fact.label}: </dt>
                  <dd style={{ display: 'inline', marginLeft: 0 }}>
                    {fact.display_value}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                      [{fact.source}]{!fact.confirmed && ' (unconfirmed)'}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {result.missing_or_uncertain.length > 0 && (
            <section className="form-section">
              <h2>Missing / Uncertain</h2>
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)' }}>
                {result.missing_or_uncertain.map((gap, i) => (
                  <li key={i}>{gap.label}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {result.possible_causes.length > 0 && (
          <section className="form-section">
            <h2>Plausible Causes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {result.possible_causes.map((cause, i) => (
                <div key={i} style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--border-color)' }}>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {cause.category}
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.75rem', fontWeight: 400 }}>
                      ({cause.confidence})
                    </span>
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{cause.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="form-section" style={{ borderColor: '#ef4444' }}>
          <h2 style={{ color: '#ef4444', borderBottomColor: 'rgba(239, 68, 68, 0.2)' }}>Safety & Prohibited Actions</h2>
          <ul style={{ listStylePosition: 'inside', color: 'var(--text-primary)', paddingLeft: 0 }}>
            {result.prohibited_actions.map((action, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ef4444' }}>{action.action}</strong>: <span style={{ color: 'var(--text-secondary)' }}>{action.hazard}</span>
              </li>
            ))}
          </ul>
          {result.safe_checks.length > 0 && (
            <>
              <h3 style={{ marginTop: '1rem', color: 'var(--accent-primary)' }}>Safe Observations You Can Make</h3>
              <ul style={{ listStylePosition: 'inside', color: 'var(--text-primary)', paddingLeft: 0 }}>
                {result.safe_checks.map((check, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--accent-primary)' }}>{check.action}</strong>: <span style={{ color: 'var(--text-secondary)' }}>{check.reason}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className="form-section" style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)' }}>
          <h2>Recommended Next Action</h2>
          <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {result.recommended_next_action.action}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Timeline: {result.recommended_next_action.timeline}
            {result.recommended_next_action.requires_technician && ' — Requires qualified technician'}
          </p>
        </section>

        {result.technician_brief && (
          <section className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              <h2 style={{ margin: 0, border: 'none', padding: 0 }}>Technician Brief</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={handleCopy} className="secondary-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                  Copy Brief
                </button>
                {copyStatus === 'success' && <span role="status" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem' }}>Copied!</span>}
                {copyStatus === 'error' && (
                  <span role="alert" style={{ color: '#ef4444', fontSize: '0.85rem' }}>
                    Copy failed. Select text manually.
                  </span>
                )}
              </div>
            </div>
            <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.5 }}>
              {result.technician_brief.generated_text}
            </pre>
          </section>
        )}

        <section style={{ textAlign: 'center', padding: '1rem 0' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{result.disclaimer}</p>
        </section>

        <div className="form-actions" style={{ justifyContent: 'center', marginTop: '1rem' }}>
          <button className="primary-cta" onClick={handleNewAssessment}>
            Start New Assessment
          </button>
        </div>
      </main>
    </div>
  );
}
