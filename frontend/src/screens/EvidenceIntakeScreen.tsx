import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import type { EvidenceFormData, LoadObservation } from '../types/assessment';
import { scanTextForHazards } from '../safety/hazardPolicy';
import './FormStyles.css';

const EMPTY_LOAD: LoadObservation = { name: '', quantity: undefined, recently_added_or_changed: undefined };

function parseNumeric(val: string): number | null {
  if (!val.trim()) return null;
  const n = Number(val);
  if (isNaN(n)) return null;
  return n;
}

export default function EvidenceIntakeScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<EvidenceFormData>({
    ...state.evidence,
    loads: state.evidence.loads.length > 0 ? state.evidence.loads : [{ ...EMPTY_LOAD }],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof EvidenceFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const updateLoad = (idx: number, field: keyof LoadObservation, value: string | boolean | undefined) => {
    setForm(prev => {
      const loads = [...prev.loads];
      loads[idx] = { ...loads[idx], [field]: value };
      return { ...prev, loads };
    });
    if (errors[`load_${idx}`]) setErrors(prev => { const n = { ...prev }; delete n[`load_${idx}`]; return n; });
  };

  const addLoad = () => setForm(prev => ({ ...prev, loads: [...prev.loads, { ...EMPTY_LOAD }] }));
  const removeLoad = (idx: number) => {
    if (form.loads.length <= 1) return;
    setForm(prev => ({ ...prev, loads: prev.loads.filter((_, i) => i !== idx) }));
  };

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!form.originalDescription.trim()) errs.originalDescription = 'Please describe the problem you are experiencing.';
    const prevNum = parseNumeric(form.previousRuntimeValue);
    if (form.previousRuntimeValue.trim() && prevNum === null) errs.previousRuntimeValue = 'Enter a valid number.';
    if (prevNum !== null && prevNum < 0) errs.previousRuntimeValue = 'Runtime cannot be negative.';
    const currNum = parseNumeric(form.currentRuntimeValue);
    if (form.currentRuntimeValue.trim() && currNum === null) errs.currentRuntimeValue = 'Enter a valid number.';
    if (currNum !== null && currNum < 0) errs.currentRuntimeValue = 'Runtime cannot be negative.';
    // At least one load must have a name
    const hasValidLoad = form.loads.some(l => l.name.trim());
    if (!hasValidLoad) errs.load_0 = 'Enter at least one appliance name.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      const el = document.getElementById(firstKey);
      el?.focus();
      return;
    }

    // Late-stage hazard scan on all text fields
    const allText = [
      form.originalDescription,
      form.warningOrError,
      form.manualDisplayReading,
      form.recentMaintenance,
    ].join(' ');
    const lateHazards = scanTextForHazards(allText);
    if (lateHazards.length) {
      dispatch({ type: 'LATE_HAZARD', hazardIds: lateHazards });
      navigate('/safety-check');
      return;
    }

    dispatch({ type: 'SET_EVIDENCE', evidence: form });
    navigate('/image-evidence');
  };

  const renderField = (id: string, label: string, type: 'text' | 'textarea' | 'select', opts?: { options?: { value: string; label: string }[]; placeholder?: string }) => (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea id={id} name={id} rows={3} value={(form as unknown as Record<string, unknown>)[id] as string ?? ''} onChange={e => update(id as keyof EvidenceFormData, e.target.value)} className={errors[id] ? 'input-error' : ''} aria-describedby={errors[id] ? `${id}-error` : undefined} />
      ) : type === 'select' ? (
        <select id={id} name={id} value={(form as unknown as Record<string, unknown>)[id] as string ?? ''} onChange={e => update(id as keyof EvidenceFormData, e.target.value)} className={errors[id] ? 'input-error' : ''}>
          <option value="">{opts?.placeholder ?? 'Select...'}</option>
          {opts?.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input type="text" id={id} name={id} value={(form as unknown as Record<string, unknown>)[id] as string ?? ''} onChange={e => update(id as keyof EvidenceFormData, e.target.value)} className={errors[id] ? 'input-error' : ''} aria-describedby={errors[id] ? `${id}-error` : undefined} placeholder={opts?.placeholder} />
      )}
      {errors[id] && <p id={`${id}-error`} className="field-error" role="alert">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="screen-container">
      <main className="container form-main">
        <header className="form-header">
          <h1>Evidence Intake</h1>
          <p>Describe the battery runtime issue. Fields marked with an asterisk (*) are required.</p>
        </header>

        <form ref={formRef} onSubmit={handleSubmit} noValidate className="intake-form">
          <section className="form-section">
            <h2>The Problem *</h2>
            {renderField('originalDescription', 'Describe the issue in your own words *', 'textarea')}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="previousRuntimeValue">Previous Runtime</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" id="previousRuntimeValue" value={form.previousRuntimeValue} onChange={e => update('previousRuntimeValue', e.target.value)} className={errors.previousRuntimeValue ? 'input-error' : ''} aria-describedby={errors.previousRuntimeValue ? 'previousRuntimeValue-error' : undefined} placeholder="e.g. 7" style={{ flex: 1 }} />
                  <select value={form.previousRuntimeUnit} onChange={e => update('previousRuntimeUnit', e.target.value)} style={{ width: '100px' }}>
                    <option value="hours">hours</option>
                    <option value="minutes">minutes</option>
                  </select>
                </div>
                {errors.previousRuntimeValue && <p id="previousRuntimeValue-error" className="field-error" role="alert">{errors.previousRuntimeValue}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="currentRuntimeValue">Current Runtime</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" id="currentRuntimeValue" value={form.currentRuntimeValue} onChange={e => update('currentRuntimeValue', e.target.value)} className={errors.currentRuntimeValue ? 'input-error' : ''} aria-describedby={errors.currentRuntimeValue ? 'currentRuntimeValue-error' : undefined} placeholder="e.g. 3" style={{ flex: 1 }} />
                  <select value={form.currentRuntimeUnit} onChange={e => update('currentRuntimeUnit', e.target.value)} style={{ width: '100px' }}>
                    <option value="hours">hours</option>
                    <option value="minutes">minutes</option>
                  </select>
                </div>
                {errors.currentRuntimeValue && <p id="currentRuntimeValue-error" className="field-error" role="alert">{errors.currentRuntimeValue}</p>}
              </div>
            </div>
            <div className="form-row">
              {renderField('changePattern', 'How did the change occur?', 'select', { options: [{ value: 'sudden', label: 'Sudden drop' }, { value: 'gradual', label: 'Gradual decline' }, { value: 'unknown', label: "I don't know" }] })}
              {renderField('changeBegan', 'When did it start?', 'text', { placeholder: 'e.g. 2 weeks ago' })}
            </div>
            {renderField('warningOrError', 'Any warning lights or error codes?', 'text')}
          </section>

          <section className="form-section">
            <h2>Charging & System</h2>
            <div className="form-row">
              {renderField('reachesFullCharge', 'Does battery reach full charge before evening?', 'select', { options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'unknown', label: "I don't know" }] })}
              {renderField('approximateAge', 'Approximate system age', 'text', { placeholder: 'e.g. 2 years (leave blank if unknown)' })}
            </div>
            <div className="form-row">
              {renderField('inverterBrand', 'Inverter brand', 'text', { placeholder: 'Leave blank if unknown' })}
              {renderField('inverterModel', 'Inverter model', 'text', { placeholder: 'Leave blank if unknown' })}
            </div>
            <div className="form-row">
              {renderField('batteryBrand', 'Battery brand', 'text', { placeholder: 'Leave blank if unknown' })}
              {renderField('batteryModel', 'Battery model', 'text', { placeholder: 'Leave blank if unknown' })}
            </div>
            {renderField('panelCapacity', 'Panel capacity', 'text', { placeholder: 'Leave blank if unknown' })}
            {renderField('recentMaintenance', 'Recent changes or maintenance', 'text')}
          </section>

          <section className="form-section">
            <h2>Appliances & Loads *</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>List at least one appliance connected to your system.</p>
            {form.loads.map((load, idx) => (
              <div key={idx} className="load-entry" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor={`load_${idx}`}>Appliance name</label>
                  <input type="text" id={`load_${idx}`} value={load.name} onChange={e => updateLoad(idx, 'name', e.target.value)} className={errors[`load_${idx}`] ? 'input-error' : ''} aria-describedby={errors[`load_${idx}`] ? `load_${idx}-error` : undefined} />
                  {errors[`load_${idx}`] && <p id={`load_${idx}-error`} className="field-error" role="alert">{errors[`load_${idx}`]}</p>}
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.85rem', paddingBottom: '0.25rem' }}>
                  <input type="checkbox" checked={!!load.recently_added_or_changed} onChange={e => updateLoad(idx, 'recently_added_or_changed', e.target.checked)} />
                  Recently changed
                </label>
                {form.loads.length > 1 && (
                  <button type="button" className="secondary-btn" style={{ padding: '0.5rem', fontSize: '0.85rem' }} onClick={() => removeLoad(idx)} aria-label={`Remove ${load.name || 'load'}`}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" className="secondary-btn" onClick={addLoad} style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>+ Add Appliance</button>
          </section>

          <section className="form-section">
            <h2>Display Reading (Optional)</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>If you can safely see a display value on your equipment, enter it here. Do not enter an unsafe position to read it.</p>
            {renderField('manualDisplayReading', 'Visible display value or code', 'text', { placeholder: 'e.g. 52.4V or E04' })}
          </section>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={() => navigate('/safety-check')}>Back</button>
            <button type="submit" className="primary-cta">Continue</button>
          </div>
        </form>
      </main>
    </div>
  );
}
