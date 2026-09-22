import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../services/config';

type Role = 'buyer' | 'solar_owner' | 'installer' | 'cluster_partner' | '';

export const WaitlistScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialInt = new URLSearchParams(location.search).get('interest');
  const validRoles = ['buyer', 'solar_owner', 'installer', 'cluster_partner'];
  const [role, setRole] = useState<Role | ''>(
    validRoles.includes(initialInt || '') ? (initialInt as Role) : ''
  );
  const [buyerContext, setBuyerContext] = useState('');
  const [knowsOwner, setKnowsOwner] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [community, setCommunity] = useState('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessages([]);

    const errors = [];
    if (!role) errors.push('Please select your interest.');
    if (role === 'buyer' && !buyerContext) errors.push('Please select your buyer context.');
    if (role === 'buyer' && !knowsOwner) errors.push('Please tell us if you know a solar owner.');
    if (!name.trim()) errors.push('Name is required.');
    if (!phone.trim()) errors.push('Mobile number is required.');
    if (!state) errors.push('State is required.');
    if (!community.trim()) errors.push('Community or area is required.');
    if (!consent) errors.push('You must consent to pilot contact.');

    if (errors.length > 0) {
      setErrorMessages(errors);
      setStatus('error');
      // Accessibility: focus the error summary
      document.getElementById('error-summary')?.focus();
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role, buyerContext, knowsOwner, name, phone, state, community, notes, consent
        })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      navigate(`/pilot/result?reference=${data.reference}`);
    } catch (err) {
      console.error(err);
      setErrorMessages(['A network or server error occurred. Please try again.']);
      setStatus('error');
    }
  };

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', maxWidth: '800px' }}>
      <h1>Join the Pilot Waitlist</h1>
      <p style={{ marginBottom: 'var(--space-6)' }}>
        Submit your interest to join the SolarResolve pilot. Joining creates no payment obligation, 
        and final terms precede any installation.
      </p>

      {status === 'error' && errorMessages.length > 0 && (
        <div 
          id="error-summary" 
          tabIndex={-1} 
          style={{ backgroundColor: '#ffebee', padding: 'var(--space-4)', borderLeft: '4px solid #d32f2f', marginBottom: 'var(--space-6)' }}
        >
          <h3 style={{ color: '#d32f2f', marginTop: 0 }}>There is a problem</h3>
          <ul style={{ color: '#d32f2f', paddingLeft: 'var(--space-4)' }}>
            {errorMessages.map((msg, i) => <li key={i}>{msg}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>1. What is your interest?</label>
          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" name="role" checked={role === 'buyer'} onChange={() => setRole('buyer')} />
              I need reliable power
            </label>
            <label className="radio-option">
              <input type="radio" name="role" checked={role === 'solar_owner'} onChange={() => setRole('solar_owner')} />
              I own a solar system
            </label>
            <label className="radio-option">
              <input type="radio" name="role" checked={role === 'installer'} onChange={() => setRole('installer')} />
              I install solar or electrical systems
            </label>
            <label className="radio-option">
              <input type="radio" name="role" checked={role === 'cluster_partner'} onChange={() => setRole('cluster_partner')} />
              I represent a community, campus, or estate
            </label>
          </div>
        </div>

        {role === 'buyer' && (
          <>
            <div className="form-group">
              <label>Buyer Context</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" checked={buyerContext === 'shop'} onChange={() => setBuyerContext('shop')} />
                  Shop or small business
                </label>
                <label className="radio-option">
                  <input type="radio" checked={buyerContext === 'campus'} onChange={() => setBuyerContext('campus')} />
                  Campus or student residence
                </label>
                <label className="radio-option">
                  <input type="radio" checked={buyerContext === 'home'} onChange={() => setBuyerContext('home')} />
                  Home or residential street
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Do you know a solar owner nearby?</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" checked={knowsOwner === 'yes'} onChange={() => setKnowsOwner('yes')} /> Yes
                </label>
                <label className="radio-option">
                  <input type="radio" checked={knowsOwner === 'no'} onChange={() => setKnowsOwner('no')} /> No
                </label>
                <label className="radio-option">
                  <input type="radio" checked={knowsOwner === 'not_sure'} onChange={() => setKnowsOwner('not_sure')} /> Not sure
                </label>
              </div>
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Mobile Number (e.g., 0803 123 4567)</label>
          <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>

        <div className="form-group">
          <label>State</label>
          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" checked={state === 'lagos'} onChange={() => setState('lagos')} /> Lagos
            </label>
            <label className="radio-option">
              <input type="radio" checked={state === 'niger'} onChange={() => setState('niger')} /> Niger
            </label>
            <label className="radio-option">
              <input type="radio" checked={state === 'fct_abuja'} onChange={() => setState('fct_abuja')} /> FCT Abuja
            </label>
            <label className="radio-option">
              <input type="radio" checked={state === 'other'} onChange={() => setState('other')} /> Another state
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="community">Community or Area</label>
          <input id="community" type="text" value={community} onChange={e => setCommunity(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (Appliance needs, timing, or context)</label>
          <textarea id="notes" rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="radio-option" style={{ alignItems: 'flex-start' }}>
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: '5px' }} />
            <span>
              I consent to being contacted regarding the SolarResolve pilot. 
              <br/><a href="/policies/privacy" target="_blank" rel="noreferrer">Read Privacy Notice</a>
            </span>
          </label>
        </div>

        <button type="submit" className="primary-cta" disabled={status === 'submitting'} style={{ width: '100%' }}>
          {status === 'submitting' ? 'Submitting...' : 'Submit interest'}
        </button>
      </form>
    </div>
  );
};

export default WaitlistScreen;
