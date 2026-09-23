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
      case 'urgent_safety_escalation': return 'var(--sr-danger)';
      case 'professional_inspection_recommended': return 'var(--sr-warning)';
      case 'more_information_needed': return 'var(--sr-information)';
      default: return 'var(--sr-earth)';
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
    <div className="screen-container" style={{ padding: '40px 20px', minHeight: 'calc(100vh - 120px)' }}>
      <main className="container form-main" style={{ maxWidth: '820px', margin: '0 auto' }}>
        <header className="form-header" style={{ marginBottom: '24px' }}>
          <span className="sr-eyebrow" style={{ color: 'var(--sr-earth)' }}>
            <span className="sr-dot-pulse" aria-hidden="true"></span> Step 4 of 4 · Decision Support
          </span>
          <h1 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '28px', color: 'var(--sr-earth)', marginBottom: '12px' }}>
            Assessment Result
          </h1>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '100px',
              backgroundColor: getStatusColor(result.status),
              color: '#FFF',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
            }}
            role="status"
          >
            {getStatusLabel(result.status)}
          </div>
          <p style={{ fontSize: '18px', color: 'var(--sr-energy-ink)', lineHeight: 1.5, fontWeight: 600 }}>
            {result.summary}
          </p>
        </header>

        {result.status === 'more_information_needed' && (
          <section className="sr-card" style={{ borderLeft: '4px solid var(--sr-information)', marginBottom: '24px' }}>
            <h2 style={{ color: 'var(--sr-information)', fontSize: '18px', marginBottom: '8px' }}>More Information Needed</h2>
            <p style={{ color: 'var(--sr-muted)', fontSize: '14px', marginBottom: '12px' }}>
              The evidence provided is not sufficient for a definitive assessment. Please provide the following:
            </p>
            <ul style={{ listStylePosition: 'inside', color: 'var(--sr-energy-ink)', fontSize: '14px' }}>
              {result.missing_or_uncertain.map((gap, i) => (
                <li key={i}>{gap.label}</li>
              ))}
            </ul>
            <button className="primary-cta" onClick={() => navigate('/intake')} style={{ marginTop: '16px', background: 'var(--sr-saffron)', color: 'var(--sr-energy-ink)', fontWeight: 700, borderRadius: 'var(--sr-radius-control)' }}>
              Add More Evidence
            </button>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          <section className="sr-card">
            <h2 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '18px', color: 'var(--sr-earth)', marginBottom: '14px', borderBottom: '1px solid var(--sr-soft-line)', paddingBottom: '8px' }}>
              Known Facts
            </h2>
            <dl style={{ color: 'var(--sr-muted)', fontSize: '14px' }}>
              {result.known_facts.map((fact, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <dt style={{ fontWeight: 700, color: 'var(--sr-energy-ink)', display: 'inline' }}>{fact.label}: </dt>
                  <dd style={{ display: 'inline', marginLeft: 0, color: 'var(--sr-energy-ink)' }}>
                    {fact.display_value}
                    <span style={{ fontSize: '11px', color: 'var(--sr-muted)', marginLeft: '6px', background: 'var(--sr-surface-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                      [{fact.source}]{!fact.confirmed && ' (unconfirmed)'}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {result.missing_or_uncertain.length > 0 && (
            <section className="sr-card">
              <h2 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '18px', color: 'var(--sr-earth)', marginBottom: '14px', borderBottom: '1px solid var(--sr-soft-line)', paddingBottom: '8px' }}>
                Missing / Uncertain
              </h2>
              <ul style={{ listStylePosition: 'inside', color: 'var(--sr-muted)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {result.missing_or_uncertain.map((gap, i) => (
                  <li key={i}>{gap.label}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {result.possible_causes.length > 0 && (
          <section className="sr-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '18px', color: 'var(--sr-earth)', marginBottom: '16px' }}>
              Plausible Causes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {result.possible_causes.map((cause, i) => (
                <div key={i} style={{ paddingLeft: '14px', borderLeft: '3px solid var(--sr-earth)', background: 'var(--sr-warm-ground)', padding: '12px 14px', borderRadius: '0 8px 8px 0' }}>
                  <h3 style={{ color: 'var(--sr-earth)', fontSize: '16px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    <span>{cause.category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--sr-earth)', background: 'var(--sr-surface-subtle)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {cause.confidence}
                    </span>
                  </h3>
                  <p style={{ color: 'var(--sr-muted)', fontSize: '14px', margin: 0 }}>{cause.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="sr-card" style={{ border: '1.5px solid var(--sr-danger)', background: 'var(--sr-danger-tint)', marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--sr-danger)', fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span aria-hidden="true">⚠️</span> Safety & Prohibited Actions
          </h2>
          <ul style={{ listStylePosition: 'inside', color: 'var(--sr-energy-ink)', paddingLeft: 0, fontSize: '14px' }}>
            {result.prohibited_actions.map((action, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'var(--sr-danger)' }}>{action.action}</strong>: <span style={{ color: 'var(--sr-energy-ink)' }}>{action.hazard}</span>
              </li>
            ))}
          </ul>
          {result.safe_checks.length > 0 && (
            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(179,58,58,0.2)' }}>
              <h3 style={{ fontSize: '15px', color: 'var(--sr-earth)', marginBottom: '8px', fontWeight: 700 }}>Safe Observations You Can Make</h3>
              <ul style={{ listStylePosition: 'inside', color: 'var(--sr-energy-ink)', paddingLeft: 0, fontSize: '14px' }}>
                {result.safe_checks.map((check, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>
                    <strong style={{ color: 'var(--sr-earth)' }}>{check.action}</strong>: <span style={{ color: 'var(--sr-muted)' }}>{check.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="sr-card" style={{ background: 'var(--sr-surface-subtle)', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '18px', color: 'var(--sr-earth)', marginBottom: '8px' }}>Recommended Next Action</h2>
          <p style={{ color: 'var(--sr-energy-ink)', fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>
            {result.recommended_next_action.action}
          </p>
          <p style={{ color: 'var(--sr-muted)', fontSize: '13px', margin: 0 }}>
            Timeline: {result.recommended_next_action.timeline}
            {result.recommended_next_action.requires_technician && ' — Requires qualified technician'}
          </p>
        </section>

        {result.technician_brief && (
          <section className="sr-card" style={{ background: 'var(--sr-earth-dark)', color: '#FFF', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{ margin: 0, border: 'none', padding: 0, color: '#FFF', fontSize: '18px' }}>Technician Brief</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={handleCopy}
                  className="primary-cta"
                  style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    background: 'var(--sr-saffron)',
                    color: 'var(--sr-energy-ink)',
                    fontWeight: 700,
                    borderRadius: 'var(--sr-radius-control)'
                  }}
                >
                  Copy Brief
                </button>
                {copyStatus === 'success' && <span role="status" style={{ color: 'var(--sr-saffron)', fontSize: '13px', fontWeight: 600 }}>Copied!</span>}
                {copyStatus === 'error' && (
                  <span role="alert" style={{ color: '#FCA5A5', fontSize: '13px' }}>
                    Copy failed. Select text manually.
                  </span>
                )}
              </div>
            </div>
            <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', color: '#E8E2DD', fontFamily: 'var(--sr-font-data)', fontSize: '13px', lineHeight: 1.55 }}>
              {result.technician_brief.generated_text}
            </pre>
          </section>
        )}

        <section style={{ textAlign: 'center', padding: '1rem 0' }}>
          <p style={{ color: 'var(--sr-muted)', fontSize: '13px' }}>{result.disclaimer}</p>
        </section>

        <div className="form-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            className="primary-cta"
            onClick={handleNewAssessment}
            style={{
              background: 'var(--sr-saffron)',
              color: 'var(--sr-energy-ink)',
              fontWeight: 700,
              borderRadius: 'var(--sr-radius-control)',
              padding: '12px 28px',
              minHeight: '44px'
            }}
          >
            Start New Assessment
          </button>
        </div>
      </main>
    </div>
  );
}
