import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import brandLogo from '../assets/brand/solarresolve-official-horizontal-reversed.svg';

export const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="app-header" style={{ background: 'var(--sr-earth)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={brandLogo} alt="SolarResolve Logo" style={{ height: '38px', width: 'auto', display: 'block' }} />
        </Link>
        <button className="navigation-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span className="sr-only">{menuOpen ? 'Close' : 'Open'} navigation</span>
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'is-open' : ''}>
          <a onClick={closeMenu} href="/#how-it-works" style={{ color: '#FFF', fontWeight: 600 }}>How it works</a>
          <Link onClick={closeMenu} to="/safety-guidance" style={{ color: '#FFF', fontWeight: 600 }}>Safety First</Link>
          <Link onClick={closeMenu} to="/help" style={{ color: '#FFF', fontWeight: 600 }}>Help</Link>
          <Link onClick={closeMenu} to="/safety-check" className="primary-cta" style={{ background: 'var(--sr-saffron)', color: 'var(--sr-energy-ink)', fontWeight: 700, borderRadius: 'var(--sr-radius-control)' }}>
            Assess my battery
          </Link>
        </nav>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer" style={{ background: 'var(--sr-earth-dark)', color: 'var(--sr-on-earth)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src={brandLogo} alt="SolarResolve" style={{ height: '32px', width: 'auto' }} />
            </div>
            <p style={{ color: 'var(--sr-on-earth-muted)', fontSize: '14px', lineHeight: 1.6, maxWidth: '340px' }}>
              Safety-aware solar decision support. Designed to help owners describe declining runtime and prepare a clear brief for a qualified technician.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#FFF', fontSize: '15px', marginBottom: '12px', fontFamily: 'var(--sr-font-heading)' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <li><Link to="/" style={{ color: 'var(--sr-on-earth-muted)' }}>Home</Link></li>
              <li><Link to="/help" style={{ color: 'var(--sr-on-earth-muted)' }}>Help & contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#FFF', fontSize: '15px', marginBottom: '12px', fontFamily: 'var(--sr-font-heading)' }}>Contact & Policies</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <li style={{ color: 'var(--sr-on-earth-muted)' }}>Email: support@solarresolve.com</li>
              <li><Link to="/safety-guidance" style={{ color: 'var(--sr-on-earth-muted)' }}>Safety guidance</Link></li>
              <li><Link to="/policies/privacy" style={{ color: 'var(--sr-on-earth-muted)' }}>Privacy notice</Link></li>
              <li><Link to="/policies/terms" style={{ color: 'var(--sr-on-earth-muted)' }}>Website terms</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: 'var(--sr-on-earth-muted)' }}>
          <span>© 2026 SolarResolve. All rights reserved. Decision support only.</span>
          <span>Does not replace physical electrical inspection.</span>
        </div>
      </div>
    </footer>
  );
};
