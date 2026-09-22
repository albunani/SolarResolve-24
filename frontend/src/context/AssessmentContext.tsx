/**
 * Assessment flow context — owns the entire case lifecycle.
 *
 * State machine: idle → hazard_complete → intake_complete → clarification_complete → result_ready
 * Any state can transition to error. Hazard escalation is a terminal state.
 */

import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type {
  AssessmentResult,
  ClarificationAnswer,
  EvidenceFormData,
  ImageObservation,
} from '../types/assessment';

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------
export interface FlowState {
  step: 'idle' | 'hazard_complete' | 'intake_complete' | 'image_complete' | 'clarification_complete' | 'result_ready' | 'error' | 'escalated';
  hazardSafe: boolean;
  triggeredHazards: string[];
  evidence: EvidenceFormData;
  imageObservations: ImageObservation[];
  clarificationAnswers: ClarificationAnswer[];
  processing: boolean;
  result: AssessmentResult | null;
  error: string | null;
  lateHazardIds: string[];
}

const EMPTY_EVIDENCE: EvidenceFormData = {
  originalDescription: '',
  previousRuntimeValue: '',
  previousRuntimeUnit: 'hours',
  currentRuntimeValue: '',
  currentRuntimeUnit: 'hours',
  changePattern: '',
  changeBegan: '',
  warningOrError: '',
  reachesFullCharge: '',
  daytimeChargingChange: '',
  approximateAge: '',
  inverterBrand: '',
  inverterModel: '',
  batteryBrand: '',
  batteryModel: '',
  batteryChemistry: '',
  panelCapacity: '',
  recentMaintenance: '',
  manualDisplayReading: '',
  loads: [],
};

const initialState: FlowState = {
  step: 'idle',
  hazardSafe: false,
  triggeredHazards: [],
  evidence: { ...EMPTY_EVIDENCE },
  imageObservations: [],
  clarificationAnswers: [],
  processing: false,
  result: null,
  error: null,
  lateHazardIds: [],
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
type Action =
  | { type: 'HAZARD_SAFE' }
  | { type: 'HAZARD_ESCALATION'; hazards: string[] }
  | { type: 'SET_EVIDENCE'; evidence: EvidenceFormData }
  | { type: 'SET_IMAGE_OBSERVATIONS'; observations: ImageObservation[] }
  | { type: 'SET_CLARIFICATION_ANSWERS'; answers: ClarificationAnswer[] }
  | { type: 'SET_PROCESSING'; processing: boolean }
  | { type: 'SET_RESULT'; result: AssessmentResult }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LATE_HAZARD'; hazardIds: string[] }
  | { type: 'RESET' };

function reducer(state: FlowState, action: Action): FlowState {
  switch (action.type) {
    case 'HAZARD_SAFE':
      return { ...state, step: 'hazard_complete', hazardSafe: true, triggeredHazards: [] };
    case 'HAZARD_ESCALATION':
      return { ...state, step: 'escalated', hazardSafe: false, triggeredHazards: action.hazards };
    case 'SET_EVIDENCE':
      return { ...state, step: 'intake_complete', evidence: action.evidence };
    case 'SET_IMAGE_OBSERVATIONS':
      return { ...state, step: 'image_complete', imageObservations: action.observations };
    case 'SET_CLARIFICATION_ANSWERS':
      return { ...state, step: 'clarification_complete', clarificationAnswers: action.answers };
    case 'SET_PROCESSING':
      return { ...state, processing: action.processing };
    case 'SET_RESULT':
      return { ...state, step: 'result_ready', result: action.result, processing: false, error: null };
    case 'SET_ERROR':
      return { ...state, step: 'error', error: action.error, processing: false };
    case 'CLEAR_ERROR':
      // Return to the last valid step before error
      return {
        ...state,
        error: null,
        step: state.result ? 'result_ready'
          : state.clarificationAnswers.length ? 'clarification_complete'
          : state.evidence.originalDescription ? 'intake_complete'
          : state.hazardSafe ? 'hazard_complete'
          : 'idle',
      };
    case 'LATE_HAZARD':
      return { ...state, step: 'escalated', lateHazardIds: action.hazardIds };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
interface AssessmentContextValue {
  state: FlowState;
  dispatch: React.Dispatch<Action>;
}

const AssessmentContext = createContext<AssessmentContextValue | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAssessment(): AssessmentContextValue {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessment must be used within AssessmentProvider');
  return ctx;
}
