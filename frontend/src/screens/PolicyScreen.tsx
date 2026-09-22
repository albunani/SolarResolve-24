import React from 'react';
import { useParams } from 'react-router-dom';

const PolicyScreen: React.FC = () => {
  const { document } = useParams<{ document: string }>();

  return (
    <div className="container" style={{ padding: 'var(--space-8) var(--space-4)', maxWidth: '800px' }}>
      <div className="card">
        <h1>{document === 'privacy' ? 'Privacy Notice' : 'Website Terms'}</h1>
        <p><strong>Effective Date:</strong> September 2026</p>
        <hr style={{ margin: 'var(--space-4) 0' }} />
        <p>
          This is a placeholder for the official {document} document. A qualified Nigerian privacy professional 
          must review the final implementation and notice before production use.
        </p>
      </div>
    </div>
  );
};

export default PolicyScreen;
