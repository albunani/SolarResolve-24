import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation, Footer } from './components/Navigation';
import LandingScreen from './screens/LandingScreen';
import WaitlistScreen from './screens/WaitlistScreen';
import OutcomeScreen from './screens/OutcomeScreen';
import HelpScreen from './screens/HelpScreen';
import PolicyScreen from './screens/PolicyScreen';
import AppAvailabilityScreen from './screens/AppAvailabilityScreen';
import NotFoundScreen from './screens/NotFoundScreen';

// Keeping the old assessment screens available under a separate path
import HomeScreen from './screens/HomeScreen';
import SafetyCheckScreen from './screens/SafetyCheckScreen';
import EvidenceIntakeScreen from './screens/EvidenceIntakeScreen';
import ClarificationScreen from './screens/ClarificationScreen';
import AssessmentScreen from './screens/AssessmentScreen';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* SolarPeer 360 Public Routes */}
        <Route path="/" element={<LandingScreen />} />
        <Route path="/pilot" element={<WaitlistScreen />} />
        <Route path="/pilot/result" element={<OutcomeScreen />} />
        <Route path="/help" element={<HelpScreen />} />
        <Route path="/about" element={<HelpScreen />} /> {/* Placeholder for about */}
        <Route path="/policies/:document" element={<PolicyScreen />} />
        <Route path="/app" element={<AppAvailabilityScreen />} />

        {/* Legacy Battery Assessment Routes */}
        <Route path="/assessment" element={<HomeScreen />} />
        <Route path="/assessment/safety-check" element={<SafetyCheckScreen />} />
        <Route path="/assessment/evidence" element={<EvidenceIntakeScreen />} />
        <Route path="/assessment/clarification" element={<ClarificationScreen />} />
        <Route path="/assessment/results" element={<AssessmentScreen />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
