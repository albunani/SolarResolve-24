import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundScreen: React.FC = () => {
  return (
    <div className="container" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center' }}>
      <h1>Page Not Found</h1>
      <p style={{ margin: 'var(--space-4) 0' }}>We couldn't find the page you're looking for.</p>
      <Link to="/" className="primary-cta">Back to Home</Link>
    </div>
  );
};

export default NotFoundScreen;
