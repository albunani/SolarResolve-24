import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { generateAssessment } from '../services/api';
import type { ClarificationAnswer } from '../types/assessment';
import { scanTextForHazards } from '../safety/hazardPolicy';
import './FormStyles.css';

const TARGETED_QUESTIONS = [
  'Does the battery usually reach full charge before sunset?',
  'Has any appliance been added or used for longer recently?',
  'Did this issue begin after any maintenance or settings change?',
  'Does the same behavior occur after charging from the grid or generator?',
];

export default function ClarificationScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const evidence = state.evidence;

  const [answers, setAnswers] = useState<ClarificationAnswer[]>(() => {
    const existing = new Map(state.clarificationAnswers.map(a => [a.question, a.answer]));
    return TARGETED_QUESTIONS.map(q => ({ question: q, answer: existing.get(q) || '' }));
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAnswer = (idx: number, value: string) => {
    setAnswers(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], answer: value };
      return next;
    });
  };

  const handleGenerate = async () => {
    // Late-stage hazard scan on clarification answers
    const answerText = answers.map(a => a.answer).join(' ');
    const lateHazards = scanTextForHazards(answerText);
    if (lateHazards.length) {
      dispatch({ type: 'LATE_HAZARD', hazardIds: lateHazards });
      navigate('/safety-check');
      return;
    }

    dispatch({ type: 'SET_CLARIFICATION_ANSWERS', answers: answers.filter(a => a.answer.trim()) });
    setLoading(true);
    setError(null);
    dispatch({ type: 'SET_PROCESSING', processing: true });

    try {
      const prevVal = evidence.previousRuntimeValue ? Number(evidence.previousRuntimeValue) : undefined;
      const currVal = evidence.currentRuntimeValue ? Number(evidence.currentRuntimeValue) : undefined;

      const payload: Record<string, unknown> = {
        original_description: evidence.originalDescription,
        previous_runtime_value: (prevVal !== undefined && !isNaN(prevVal)) ? prevVal : null,
        previous_runtime_unit: evidence.previousRuntimeUnit || null,
        current_runtime_value: (currVal !== undefined && !isNaN(currVal)) ? currVal : null,
        current_runtime_unit: evidence.currentRuntimeUnit || null,
        change_pattern: evidence.changePattern || 'unknown',
        change_began: evidence.changeBegan || null,
        warning_or_error: evidence.warningOrError || null,
        reaches_full_charge: evidence.reachesFullCharge || 'unknown',
        approximate_age: evidence.approximateAge || null,
        inverter_brand: evidence.inverterBrand || null,
        inverter_model: evidence.inverterModel || null,
        battery_brand: evidence.batteryBrand || null,
        battery_model: evidence.batteryModel || null,
        battery_chemistry: evidence.batteryChemistry || null,
        panel_capacity: evidence.panelCapacity || null,
        recent_maintenance: evidence.recentMaintenance || null,
        manual_display_reading: evidence.manualDisplayReading || null,
        loads: evidence.loads.filter(l => l.name.trim()).map(l => ({
          name: l.name,
          quantity: l.quantity ?? null,
          recently_added_or_changed: l.recently_added_or_changed ?? null,
        })),
      };

      const clarifs = answers.filter(a => a.answer.trim());
      const imageObs = state.imageObservations.length > 0 ? state.imageObservations : undefined;
      const result = await generateAssessment(payload, clarifs.length ? clarifs : undefined, imageObs);
      dispatch({ type: 'SET_RESULT', result });
      navigate('/assessment');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(msg);
      dispatch({ type: 'SET_ERROR', error: msg });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="screen-container" aria-live="assertive">
        <main className="container form-main" style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <div className="spinner" aria-label="Processing"></div>
          <h2 style={{ marginTop: '1rem', color: 'var(--accent-primary)' }}>Analyzing Evidence...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Comparing your observations against known solar behaviors.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="screen-container">
      <main className="container form-main">
        <header className="form-header">
          <h1>Clarification & Evidence Review</h1>
          <p>Review your reported facts and answer any relevant follow-up questions.</p>
        </header>

        {error && (
          <div className="escalation-container" role="alert" style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>{error}</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="primary-cta" onClick={handleGenerate}>Retry</button>
              <button className="secondary-btn" onClick={() => { setError(null); dispatch({ type: 'CLEAR_ERROR' }); navigate('/image-evidence'); }}>Edit Evidence</button>
            </div>
          </div>
        )}

        <section className="form-section">
          <h2>Your Reported Facts</h2>
          <dl style={{ color: 'var(--text-secondary)' }}>
            <dt style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Problem Description</dt>
            <dd style={{ marginBottom: '0.5rem', marginLeft: 0 }}>[user] {evidence.originalDescription || 'Not provided'}</dd>
            {evidence.previousRuntimeValue && <><dt style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Previous Runtime</dt><dd style={{ marginBottom: '0.5rem', marginLeft: 0 }}>[user] {evidence.previousRuntimeValue} {evidence.previousRuntimeUnit}</dd></>}
            {evidence.currentRuntimeValue && <><dt style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Current Runtime</dt><dd style={{ marginBottom: '0.5rem', marginLeft: 0 }}>[user] {evidence.currentRuntimeValue} {evidence.currentRuntimeUnit}</dd></>}
            {evidence.changePattern && <><dt style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Change Pattern</dt><dd style={{ marginBottom: '0.5rem', marginLeft: 0 }}>[user] {evidence.changePattern}</dd></>}
            {evidence.approximateAge && <><dt style={{ fontWeight: 600, color: 'var(--text-primary)' }}>System Age</dt><dd style={{ marginBottom: '0.5rem', marginLeft: 0 }}>[user] {evidence.approximateAge}</dd></>}
            {evidence.loads.filter(l => l.name.trim()).map((l, i) => <dd key={i} style={{ marginBottom: '0.25rem', marginLeft: 0 }}>[user] Appliance: {l.name}{l.recently_added_or_changed ? ' (recently changed)' : ''}</dd>)}
            {evidence.manualDisplayReading && <><dt style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Display Reading</dt><dd style={{ marginBottom: '0.5rem', marginLeft: 0 }}>[user] {evidence.manualDisplayReading} (unconfirmed)</dd></>}
            
            {state.imageObservations.filter(obs => obs.confirmed || obs.corrected_value).length > 0 && (
              <>
                <dt style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.5rem' }}>Confirmed Image Observations</dt>
                {state.imageObservations
                  .filter(obs => obs.confirmed || obs.corrected_value)
                  .map((obs, i) => (
                    <dd key={i} style={{ marginBottom: '0.25rem', marginLeft: 0 }}>
                      [image] {obs.label}: {obs.corrected_value || obs.extracted_value}
                    </dd>
                ))}
              </>
            )}
          </dl>
        </section>

        <section className="form-section">
          <h2>Targeted Follow-Up Questions</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Answer only those that apply. Unanswered questions will not be used.</p>
          {answers.map((a, idx) => (
            <div key={idx} className="form-group">
              <label htmlFor={`q_${idx}`}>{a.question}</label>
              <select id={`q_${idx}`} value={a.answer} onChange={e => updateAnswer(idx, e.target.value)}>
                <option value="">Skip (I don't know)</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Sometimes">Sometimes</option>
                <option value="Not sure">Not sure</option>
              </select>
            </div>
          ))}
        </section>

        <div className="form-actions">
          <button className="secondary-btn" onClick={() => navigate('/image-evidence')}>Back / Edit Evidence</button>
          <button className="primary-cta" onClick={handleGenerate} disabled={loading}>Generate Assessment</button>
        </div>
      </main>
    </div>
  );
}
