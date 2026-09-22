import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-1.png';

export const Navigation: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="SolarResolve Logo" />
          SolarResolve
        </Link>
        <nav>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/#safety">Safety First</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/safety-check" className="primary-cta">Assess my battery</Link>
        </nav>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h3>SolarResolve</h3>
            <p>Reliable power from the solar system next door.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/about">About SolarResolve</Link></li>
              <li><Link to="/help">Help and contact</Link></li>
              <li><Link to="/policies/privacy">Privacy notice</Link></li>
              <li><Link to="/policies/terms">Website terms</Link></li>
              <li><Link to="/app">The SolarResolve app</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Email: pilot@solarpeer360.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
