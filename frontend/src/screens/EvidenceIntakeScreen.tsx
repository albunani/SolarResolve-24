import { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import type { EvidenceFormData, LoadObservation } from '../types/assessment';
import { scanTextForHazards } from '../safety/hazardPolicy';
import './FormStyles.css';

interface AppliancePreset {
  name: string;
  watts: number;
  category: string;
}

const APPLIANCE_PRESETS: AppliancePreset[] = [
  { name: 'Standing Fan', watts: 55, category: 'Cooling' },
  { name: 'Ceiling Fan', watts: 70, category: 'Cooling' },
  { name: 'LED Lighting (4-6 Bulbs)', watts: 40, category: 'Lighting' },
  { name: 'Television (32-43" LED)', watts: 80, category: 'Entertainment' },
  { name: 'Decoder / Satellite Box', watts: 20, category: 'Entertainment' },
  { name: 'Inverter Refrigerator', watts: 120, category: 'Refrigeration' },
  { name: 'Standard Refrigerator', watts: 200, category: 'Refrigeration' },
  { name: 'Deep Freezer', watts: 250, category: 'Refrigeration' },
  { name: 'Laptop Charger', watts: 65, category: 'Electronics' },
  { name: 'WiFi Router', watts: 15, category: 'Electronics' },
  { name: 'Water Pumping Machine', watts: 750, category: 'Heavy Motors' },
  { name: 'Other Custom Appliance', watts: 100, category: 'General' },
];

const EMPTY_LOAD: LoadObservation = {
  name: '',
  quantity: 1,
  recently_added_or_changed: undefined,
};

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
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Energy summation calculations
  const energySummary = useMemo(() => {
    let totalWatts = 0;
    form.loads.forEach(load => {
      if (load.name.trim()) {
        const qty = load.quantity && load.quantity > 0 ? load.quantity : 1;
        // Find matching preset or default estimate
        const match = APPLIANCE_PRESETS.find(p => p.name.toLowerCase() === load.name.toLowerCase());
        const unitWatts = match ? match.watts : 75;
        totalWatts += unitWatts * qty;
      }
    });
    const estNightHours = form.currentRuntimeValue ? Math.min(12, Math.max(1, Number(form.currentRuntimeValue) || 4)) : 6;
    const dailyKwh = (totalWatts * estNightHours) / 1000;
    return {
      totalWatts,
      dailyKwh: dailyKwh.toFixed(2),
      nightHours: estNightHours,
    };
  }, [form.loads, form.currentRuntimeValue]);

  const update = (field: keyof EvidenceFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const updateLoad = (idx: number, field: keyof LoadObservation, value: string | number | boolean | undefined) => {
    setForm(prev => {
      const loads = [...prev.loads];
      loads[idx] = { ...loads[idx], [field]: value };
      return { ...prev, loads };
    });
    if (errors[`load_${idx}`]) setErrors(prev => { const n = { ...prev }; delete n[`load_${idx}`]; return n; });
  };

  const addLoad = () => setForm(prev => ({ ...prev, loads: [...prev.loads, { ...EMPTY_LOAD }] }));

  const addPresetLoad = (preset: AppliancePreset) => {
    setForm(prev => {
      const existingFirst = prev.loads[0];
      if (prev.loads.length === 1 && !existingFirst.name.trim()) {
        return { ...prev, loads: [{ name: preset.name, quantity: 1, recently_added_or_changed: false }] };
      }
      return { ...prev, loads: [...prev.loads, { name: preset.name, quantity: 1, recently_added_or_changed: false }] };
    });
    setComboboxOpen(false);
    setSearchFilter('');
  };

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
    <div className="form-group" style={{ marginBottom: '16px' }}>
      <label htmlFor={id} style={{ display: 'block', marginBottom: '6px', fontWeight: 600, color: 'var(--sr-energy-ink)' }}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          value={(form as unknown as Record<string, unknown>)[id] as string ?? ''}
          onChange={e => update(id as keyof EvidenceFormData, e.target.value)}
          className={errors[id] ? 'input-error' : ''}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', fontFamily: 'inherit', fontSize: '15px' }}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={id}
          value={(form as unknown as Record<string, unknown>)[id] as string ?? ''}
          onChange={e => update(id as keyof EvidenceFormData, e.target.value)}
          className={errors[id] ? 'input-error' : ''}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', fontFamily: 'inherit', fontSize: '15px', background: '#FFF' }}
        >
          <option value="">{opts?.placeholder ?? 'Select...'}</option>
          {opts?.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input
          type="text"
          id={id}
          name={id}
          value={(form as unknown as Record<string, unknown>)[id] as string ?? ''}
          onChange={e => update(id as keyof EvidenceFormData, e.target.value)}
          className={errors[id] ? 'input-error' : ''}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
          placeholder={opts?.placeholder}
          style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', fontFamily: 'inherit', fontSize: '15px' }}
        />
      )}
      {errors[id] && <p id={`${id}-error`} className="field-error" role="alert" style={{ color: 'var(--sr-danger)', fontSize: '13px', marginTop: '4px' }}>{errors[id]}</p>}
    </div>
  );

  const filteredPresets = APPLIANCE_PRESETS.filter(p =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="screen-container" style={{ padding: '40px 20px', minHeight: 'calc(100vh - 120px)' }}>
      <main className="container form-main" style={{ maxWidth: '780px', margin: '0 auto' }}>
        <header className="form-header" style={{ marginBottom: '24px' }}>
          <span className="sr-eyebrow" style={{ color: 'var(--sr-earth)' }}>
            <span className="sr-dot-pulse" aria-hidden="true"></span> Step 2 of 4 · Evidence Intake
          </span>
          <h1 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '28px', color: 'var(--sr-earth)', marginBottom: '8px' }}>
            Evidence Intake
          </h1>
          <p style={{ color: 'var(--sr-muted)', fontSize: '15px' }}>
            Describe what you noticed. Fields marked with an asterisk (*) are required.
          </p>
        </header>

        <form ref={formRef} onSubmit={handleSubmit} noValidate className="intake-form">
          <section className="sr-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '20px', color: 'var(--sr-earth)', marginBottom: '16px' }}>The Problem *</h2>
            {renderField('originalDescription', 'Describe the issue in your own words *', 'textarea')}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="previousRuntimeValue" style={{ fontWeight: 600, color: 'var(--sr-energy-ink)', marginBottom: '6px' }}>Previous Runtime</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    id="previousRuntimeValue"
                    value={form.previousRuntimeValue}
                    onChange={e => update('previousRuntimeValue', e.target.value)}
                    className={errors.previousRuntimeValue ? 'input-error' : ''}
                    aria-describedby={errors.previousRuntimeValue ? 'previousRuntimeValue-error' : undefined}
                    placeholder="e.g. 10"
                    style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', fontFamily: 'var(--sr-font-data)' }}
                  />
                  <select
                    value={form.previousRuntimeUnit}
                    onChange={e => update('previousRuntimeUnit', e.target.value)}
                    style={{ width: '100px', padding: '10px 8px', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', background: '#FFF' }}
                  >
                    <option value="hours">hours</option>
                    <option value="minutes">minutes</option>
                  </select>
                </div>
                {errors.previousRuntimeValue && <p id="previousRuntimeValue-error" className="field-error" role="alert" style={{ color: 'var(--sr-danger)', fontSize: '13px' }}>{errors.previousRuntimeValue}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="currentRuntimeValue" style={{ fontWeight: 600, color: 'var(--sr-energy-ink)', marginBottom: '6px' }}>Current Runtime</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    id="currentRuntimeValue"
                    value={form.currentRuntimeValue}
                    onChange={e => update('currentRuntimeValue', e.target.value)}
                    className={errors.currentRuntimeValue ? 'input-error' : ''}
                    aria-describedby={errors.currentRuntimeValue ? 'currentRuntimeValue-error' : undefined}
                    placeholder="e.g. 4"
                    style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', fontFamily: 'var(--sr-font-data)' }}
                  />
                  <select
                    value={form.currentRuntimeUnit}
                    onChange={e => update('currentRuntimeUnit', e.target.value)}
                    style={{ width: '100px', padding: '10px 8px', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', background: '#FFF' }}
                  >
                    <option value="hours">hours</option>
                    <option value="minutes">minutes</option>
                  </select>
                </div>
                {errors.currentRuntimeValue && <p id="currentRuntimeValue-error" className="field-error" role="alert" style={{ color: 'var(--sr-danger)', fontSize: '13px' }}>{errors.currentRuntimeValue}</p>}
              </div>
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '14px' }}>
              {renderField('changePattern', 'How did the change occur?', 'select', { options: [{ value: 'sudden', label: 'Sudden drop' }, { value: 'gradual', label: 'Gradual decline' }, { value: 'unknown', label: "I don't know" }] })}
              {renderField('changeBegan', 'When did it start?', 'text', { placeholder: 'e.g. 2 weeks ago' })}
            </div>
            {renderField('warningOrError', 'Any warning lights or error codes?', 'text', { placeholder: 'e.g. Red fault light, E04 code' })}
          </section>

          <section className="sr-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '20px', color: 'var(--sr-earth)', marginBottom: '16px' }}>Charging & System Details</h2>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {renderField('reachesFullCharge', 'Does battery reach full charge before evening?', 'select', { options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'sometimes', label: 'Sometimes' }, { value: 'unknown', label: "I don't know" }] })}
              {renderField('approximateAge', 'Approximate system age', 'text', { placeholder: 'e.g. 2 years (leave blank if unknown)' })}
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {renderField('inverterBrand', 'Inverter brand', 'text', { placeholder: 'Leave blank if unknown' })}
              {renderField('inverterModel', 'Inverter model', 'text', { placeholder: 'Leave blank if unknown' })}
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {renderField('batteryBrand', 'Battery brand', 'text', { placeholder: 'Leave blank if unknown' })}
              {renderField('batteryModel', 'Battery model', 'text', { placeholder: 'Leave blank if unknown' })}
            </div>
            {renderField('panelCapacity', 'Panel capacity', 'text', { placeholder: 'Leave blank if unknown' })}
            {renderField('recentMaintenance', 'Recent changes or maintenance', 'text', { placeholder: 'e.g. Serviced last month, added new panels' })}
          </section>

          {/* APPLIANCES & COMBOBOX SECTION */}
          <section className="sr-card" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '20px', color: 'var(--sr-earth)', marginBottom: '4px' }}>Appliances & Loads *</h2>
                <p style={{ fontSize: '14px', color: 'var(--sr-muted)' }}>Select presets with typical wattage or enter your own appliances.</p>
              </div>
            </div>

            {/* Accessible Searchable Combobox Trigger */}
            <div className="combobox-container" style={{ position: 'relative', marginBottom: '16px' }}>
              <button
                type="button"
                className="combobox-btn"
                onClick={() => setComboboxOpen(open => !open)}
                aria-haspopup="listbox"
                aria-expanded={comboboxOpen}
                style={{ width: '100%', background: '#FFF', border: '1.5px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', minHeight: '48px', fontSize: '15px' }}
              >
                <span style={{ color: 'var(--sr-muted)' }}>+ Add preset appliance (Standing fan, Fridge, TV...)</span>
                <span aria-hidden="true" style={{ color: 'var(--sr-earth)' }}>▼</span>
              </button>

              {comboboxOpen && (
                <div className="combobox-dropdown" style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, background: '#FFF', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', boxShadow: 'var(--sr-shadow-lift)', zIndex: 100, maxHeight: '280px', overflowY: 'auto' }}>
                  <div className="combobox-search" style={{ padding: '10px 14px', borderBottom: '1px solid var(--sr-soft-line)', position: 'sticky', top: 0, background: '#FFF' }}>
                    <input
                      type="text"
                      placeholder="Search appliances..."
                      value={searchFilter}
                      onChange={e => setSearchFilter(e.target.value)}
                      autoFocus
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--sr-soft-line)', borderRadius: '6px', fontSize: '14px' }}
                    />
                  </div>
                  {filteredPresets.map(preset => (
                    <div
                      key={preset.name}
                      className="combobox-option"
                      onClick={() => addPresetLoad(preset)}
                      style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #f3f0eb' }}
                    >
                      <div>
                        <strong style={{ color: 'var(--sr-earth)', fontSize: '14px' }}>{preset.name}</strong>
                        <span style={{ fontSize: '12px', color: 'var(--sr-muted)', marginLeft: '8px' }}>({preset.category})</span>
                      </div>
                      <span className="combobox-option-watts" style={{ fontFamily: 'var(--sr-font-data)', fontSize: '12px', color: 'var(--sr-muted)', background: 'var(--sr-surface-subtle)', padding: '3px 8px', borderRadius: '4px' }}>
                        ~{preset.watts}W
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* List of active load rows */}
            {form.loads.map((load, idx) => (
              <div
                key={idx}
                className="load-entry"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  alignItems: 'flex-end',
                  padding: '14px 16px',
                  background: 'var(--sr-warm-ground)',
                  borderRadius: 'var(--sr-radius-control)',
                  border: '1px solid var(--sr-soft-line)',
                  marginBottom: '10px'
                }}
              >
                <div className="form-group" style={{ flex: '2 1 200px' }}>
                  <label htmlFor={`load_${idx}`} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sr-energy-ink)', marginBottom: '4px' }}>Appliance name</label>
                  <input
                    type="text"
                    id={`load_${idx}`}
                    value={load.name}
                    onChange={e => updateLoad(idx, 'name', e.target.value)}
                    className={errors[`load_${idx}`] ? 'input-error' : ''}
                    aria-describedby={errors[`load_${idx}`] ? `load_${idx}-error` : undefined}
                    placeholder="e.g. Standing Fan"
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--sr-soft-line)', borderRadius: '6px', background: '#FFF', fontSize: '14px' }}
                  />
                  {errors[`load_${idx}`] && <p id={`load_${idx}-error`} className="field-error" role="alert" style={{ color: 'var(--sr-danger)', fontSize: '12px', marginTop: '2px' }}>{errors[`load_${idx}`]}</p>}
                </div>

                <div className="form-group" style={{ flex: '1 1 80px', maxWidth: '100px' }}>
                  <label htmlFor={`load_qty_${idx}`} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sr-energy-ink)', marginBottom: '4px' }}>Qty</label>
                  <input
                    type="number"
                    id={`load_qty_${idx}`}
                    min="1"
                    max="50"
                    value={load.quantity || 1}
                    onChange={e => updateLoad(idx, 'quantity', parseInt(e.target.value, 10) || 1)}
                    style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--sr-soft-line)', borderRadius: '6px', background: '#FFF', fontSize: '14px', fontFamily: 'var(--sr-font-data)' }}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--sr-energy-ink)', fontSize: '13px', paddingBottom: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={!!load.recently_added_or_changed}
                    onChange={e => updateLoad(idx, 'recently_added_or_changed', e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--sr-earth)' }}
                  />
                  Recently changed
                </label>

                {form.loads.length > 1 && (
                  <button
                    type="button"
                    className="appliance-remove"
                    onClick={() => removeLoad(idx)}
                    aria-label={`Remove ${load.name || 'load'}`}
                    style={{ background: 'transparent', border: 'none', color: 'var(--sr-danger)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, paddingBottom: '10px' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="sr-btn-outline"
              onClick={addLoad}
              style={{ marginTop: '10px', fontSize: '14px', padding: '8px 16px' }}
            >
              + Add Custom Appliance
            </button>

            {/* Live Load Energy Summary Card */}
            <div className="energy-summary-card" style={{ background: 'var(--sr-surface-subtle)', border: '1px solid var(--sr-soft-line)', borderRadius: 'var(--sr-radius-control)', padding: '16px 20px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sr-muted)', fontWeight: 700 }}>Total Estimated Draw</span>
                <div style={{ fontFamily: 'var(--sr-font-data)', fontSize: '22px', fontWeight: 700, color: 'var(--sr-earth)', marginTop: '2px' }}>
                  ~{energySummary.totalWatts} W
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sr-muted)', fontWeight: 700 }}>Overnight Energy (~{energySummary.nightHours}h)</span>
                <div style={{ fontFamily: 'var(--sr-font-data)', fontSize: '22px', fontWeight: 700, color: 'var(--sr-earth)', marginTop: '2px' }}>
                  ~{energySummary.dailyKwh} kWh
                </div>
              </div>
              <p style={{ width: '100%', fontSize: '12px', color: 'var(--sr-muted)', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '8px', margin: 0 }}>
                * Typical wattage estimates for decision support. Adjust to match your appliance rating plate.
              </p>
            </div>
          </section>

          <section className="sr-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'var(--sr-font-heading)', fontSize: '20px', color: 'var(--sr-earth)', marginBottom: '8px' }}>Display Reading (Optional)</h2>
            <p style={{ fontSize: '14px', color: 'var(--sr-muted)', marginBottom: '14px' }}>
              If you can safely see a display value on your equipment, enter it here. Do not enter an unsafe position to read it.
            </p>
            {renderField('manualDisplayReading', 'Visible display value or code', 'text', { placeholder: 'e.g. 52.4V or E04' })}
          </section>

          <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px' }}>
            <button type="button" className="sr-btn-outline" onClick={() => navigate('/safety-check')}>
              Back
            </button>
            <button
              type="submit"
              className="primary-cta"
              style={{
                background: 'var(--sr-saffron)',
                color: 'var(--sr-energy-ink)',
                fontWeight: 700,
                borderRadius: 'var(--sr-radius-control)',
                padding: '10px 24px',
                minHeight: '44px'
              }}
            >
              Continue
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
