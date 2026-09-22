import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/safety-check');
  };

  return (
    <div className="screen-container">
      <main className="container home-main">
        <header className="home-header">
          <h1 className="brand-title">SolarResolve</h1>
          <p className="value-prop">
            Turn your fragmented solar observations into a clear, safety-aware assessment 
            and technician-ready brief.
          </p>
        </header>

        <section className="scope-section">
          <h2>Supported Scenario</h2>
          <p>
            This tool is currently designed for <strong>declining battery runtime</strong> 
            (e.g., your battery used to last until morning, but now shuts down early).
          </p>
        </section>

        <section className="disclaimer-section" aria-label="Important limitations">
          <h3>Decision Support Only</h3>
          <p>
            SolarResolve provides <em>decision support</em> to help you organize evidence 
            before spending money. It does <strong>not</strong> provide a confirmed professional 
            diagnosis or replace a qualified solar technician.
          </p>
        </section>

        <section className="urgent-safety-reminder">
          <h3>Urgent Safety Reminder</h3>
          <p>
            If you see smoke, fire, severe heat, battery swelling, or exposed wiring, 
            <strong> stop immediately</strong>. Do not use this tool. Keep a safe distance 
            and contact emergency help or a qualified professional.
          </p>
        </section>

        <div className="cta-container">
          <button 
            className="primary-cta" 
            onClick={handleStart}
          >
            Assess my battery-runtime problem
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
