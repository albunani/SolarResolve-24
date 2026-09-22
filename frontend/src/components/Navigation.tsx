import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-1.png';

export const Navigation: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo-container">
          <img src={logo} alt="SolarPeer 360 Logo" />
          SolarPeer 360
        </Link>
        <nav>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/#pricing">Pricing</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/pilot" className="primary-cta">Join the pilot</Link>
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
            <h3>SolarPeer 360</h3>
            <p>Reliable power from the solar system next door.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/about">About SolarPeer 360</Link></li>
              <li><Link to="/help">Help and contact</Link></li>
              <li><Link to="/policies/privacy">Privacy notice</Link></li>
              <li><Link to="/policies/terms">Website terms</Link></li>
              <li><Link to="/app">The SolarPeer app</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>Phone: 0800 SOLARPEER</li>
              <li>WhatsApp: +234 800 123 4567</li>
              <li>Email: pilot@solarpeer360.com</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
