import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { uploadImageEvidence } from '../services/imageService';
import type { ImageObservation } from '../types/assessment';
import './FormStyles.css';

export default function ImageEvidenceScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [observations, setObservations] = useState<ImageObservation[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the existing observations from state if present, for returning to the screen
  useState(() => {
    if (state.imageObservations && state.imageObservations.length > 0) {
      setObservations(state.imageObservations);
    }
  });

  const handleSkip = () => {
    dispatch({ type: 'SET_IMAGE_OBSERVATIONS', observations: [] });
    navigate('/clarification');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      setError('Invalid file type. Please upload an image.');
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.');
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await uploadImageEvidence(file);
      setObservations(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Image extraction failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const updateObservation = (idx: number, field: 'confirmed' | 'rejected' | 'corrected_value', value: unknown) => {
    setObservations(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      
      // If confirming, ensure rejection is false. If rejecting, ensure confirmation is false.
      if (field === 'confirmed' && value === true) next[idx].rejected = false;
      if (field === 'rejected' && value === true) next[idx].confirmed = false;
      
      return next;
    });
  };

  const handleContinue = () => {
    // Only pass confirmed or corrected observations (with non-empty corrected_value)
    // Actually, backend expects list[ImageObservation], so we pass the whole array
    // and let backend filter, or we filter here. The instructions say "Only confirmed or corrected observations may enter known facts"
    // We'll pass the updated observations to the backend.
    
    // Ensure all observations have been addressed (either confirmed, rejected, or corrected)
    const unaddressed = observations.some(obs => !obs.confirmed && !obs.rejected && !obs.corrected_value?.trim());
    if (unaddressed) {
      setError('Please review (confirm, correct, or reject) all extracted observations before continuing.');
      return;
    }

    dispatch({ type: 'SET_IMAGE_OBSERVATIONS', observations });
    navigate('/clarification');
  };

  const renderUploadState = () => (
    <>
      <section className="form-section">
        <h2>Upload Image (Coming Soon)</h2>
        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #f59e0b', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#b45309', fontSize: '1rem', marginBottom: '0.5rem' }}>Demo / Deferred Feature</h3>
          <p style={{ fontSize: '0.85rem', color: '#92400e' }}>
            The AI image processing capability is currently disabled in this environment. 
            Please use "Continue Without Image" to proceed with a text-based assessment.
          </p>
        </div>

        <div className="form-group" style={{ opacity: 0.5, pointerEvents: 'none' }}>
          <label htmlFor="image-upload" className="sr-only">Choose image</label>
          <input 
            type="file" 
            id="image-upload" 
            accept="image/*" 
            onChange={handleFileChange}
            ref={fileInputRef}
            className="file-input"
            disabled
          />
        </div>
        
        {error && <p className="field-error" role="alert" style={{ marginTop: '0.5rem' }}>{error}</p>}
      </section>

      <div className="form-actions">
        <button type="button" className="secondary-btn" onClick={() => navigate('/intake')}>Back</button>
        {file ? (
          <button type="button" className="primary-cta" onClick={handleUpload} disabled>
            {loading ? 'Processing...' : 'Process Image (Disabled)'}
          </button>
        ) : (
          <button type="button" className="primary-cta" onClick={handleSkip}>
            Continue Without Image
          </button>
        )}
      </div>
    </>
  );

  const renderReviewState = () => (
    <>
      <section className="form-section">
        <h2>Review Extracted Information</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Please verify the information extracted from your image. You must confirm, correct, or reject each item.
        </p>
        
        {error && <p className="field-error" role="alert" style={{ marginBottom: '1rem' }}>{error}</p>}

        <div className="observations-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {observations.map((obs, idx) => (
            <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{obs.label}</h3>
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  backgroundColor: obs.readability === 'clear' ? 'rgba(34,197,94,0.1)' : obs.readability === 'uncertain' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                  color: obs.readability === 'clear' ? '#22c55e' : obs.readability === 'uncertain' ? '#f59e0b' : '#ef4444'
                }}>
                  {obs.readability.toUpperCase()}
                </span>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Extracted value: </span>
                <strong style={{ fontSize: '1.1rem' }}>{obs.extracted_value}</strong>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                  <input 
                    type="radio" 
                    name={`review_${idx}`} 
                    checked={obs.confirmed}
                    onChange={() => updateObservation(idx, 'confirmed', true)}
                  /> Confirm
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                  <input 
                    type="radio" 
                    name={`review_${idx}`} 
                    checked={obs.rejected}
                    onChange={() => updateObservation(idx, 'rejected', true)}
                  /> Reject
                </label>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <label htmlFor={`correct_${idx}`} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Correct:</label>
                  <input 
                    id={`correct_${idx}`}
                    type="text" 
                    value={obs.corrected_value || ''} 
                    onChange={(e) => {
                      updateObservation(idx, 'corrected_value', e.target.value);
                      if (e.target.value) {
                        updateObservation(idx, 'confirmed', false);
                        updateObservation(idx, 'rejected', false);
                      }
                    }}
                    placeholder="Enter correct value"
                    style={{ flex: 1, padding: '4px 8px' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="form-actions">
        <button type="button" className="secondary-btn" onClick={() => setObservations([])}>Upload Different Image</button>
        <button type="button" className="primary-cta" onClick={handleContinue}>Continue to Review</button>
      </div>
    </>
  );

  const renderErrorState = () => (
    <>
      <section className="form-section">
        <h2>Image Extraction Failed</h2>
        <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>
        <p style={{ color: 'var(--text-secondary)' }}>We were unable to process your image. You can try another image, or simply continue without one.</p>
      </section>
      
      <div className="form-actions" style={{ flexDirection: 'column', gap: '0.75rem', alignItems: 'stretch' }}>
        <button type="button" className="primary-cta" onClick={() => { setError(null); setFile(null); }}>Replace Image</button>
        <button type="button" className="secondary-btn" onClick={() => navigate('/intake')}>Enter Reading Manually (Back to Intake)</button>
        <button type="button" className="secondary-btn" onClick={handleSkip}>Continue Without Image</button>
      </div>
    </>
  );

  return (
    <div className="screen-container">
      <main className="container form-main">
        <header className="form-header">
          <h1>Image Evidence</h1>
        </header>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div className="spinner" aria-label="Processing"></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Analyzing image...</p>
          </div>
        ) : observations.length > 0 ? (
          renderReviewState()
        ) : error && !file ? (
          // This state occurs when extraction fails and we reset observations
          renderErrorState()
        ) : (
          renderUploadState()
        )}
      </main>
    </div>
  );
}
