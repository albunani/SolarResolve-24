import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SafetyCheckScreen from './screens/SafetyCheckScreen';
import EvidenceIntakeScreen from './screens/EvidenceIntakeScreen';
import ImageEvidenceScreen from './screens/ImageEvidenceScreen';
import ClarificationScreen from './screens/ClarificationScreen';
import AssessmentScreen from './screens/AssessmentScreen';
import { AssessmentProvider } from './context/AssessmentContext';
import { RouteGuard } from './context/RouteGuard';

function App() {
  return (
    <AssessmentProvider>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        
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
        
        <Route path="/assessment" element={
          <RouteGuard requiredStep="result_ready">
            <AssessmentScreen />
          </RouteGuard>
        } />
      </Routes>
    </AssessmentProvider>
  );
}

export default App;
