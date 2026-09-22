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
import ImageEvidenceScreen from './screens/ImageEvidenceScreen';
import ClarificationScreen from './screens/ClarificationScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import { AssessmentProvider } from './context/AssessmentContext';
import { RouteGuard } from './context/RouteGuard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AssessmentProvider>
        <Navigation />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingScreen />} />
          <Route path="/pilot" element={<WaitlistScreen />} />
          <Route path="/pilot/result" element={<OutcomeScreen />} />
          <Route path="/help" element={<HelpScreen />} />
          <Route path="/about" element={<HelpScreen />} /> {/* Placeholder for about */}
          <Route path="/policies/:document" element={<PolicyScreen />} />
          <Route path="/app" element={<AppAvailabilityScreen />} />

          {/* Legacy Battery Assessment Routes */}
          <Route path="/assessment" element={<HomeScreen />} />
          <Route path="/safety-check" element={<SafetyCheckScreen />} />
          
          <Route path="/intake" element={
            <RouteGuard requiredStep="hazard_complete">
              <EvidenceIntakeScreen />
            </RouteGuard>
          } />

          <Route path="/image-evidence" element={
            <RouteGuard requiredStep="intake_complete">
              <ImageEvidenceScreen />
            </RouteGuard>
          } />
          
          <Route path="/clarification" element={
            <RouteGuard requiredStep="image_complete">
              <ClarificationScreen />
            </RouteGuard>
          } />
          
          <Route path="/assessment/results" element={
            <RouteGuard requiredStep="result_ready">
              <AssessmentScreen />
            </RouteGuard>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
        <Footer />
      </AssessmentProvider>
    </BrowserRouter>
  );
};

export default App;
