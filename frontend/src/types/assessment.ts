/**
 * Assessment types — mirrors the backend Pydantic models.
 * All imports from this file must use `import type` due to verbatimModuleSyntax.
 */

export type EvidenceSource = 'user' | 'confirmed_image' | 'deterministic_calculation';
export type CauseConfidenceLabel = 'more consistent' | 'possible but insufficient evidence' | 'cannot assess';
export type AssessmentStatus =
  | 'more_information_needed'
  | 'safe_observations_recommended'
  | 'professional_inspection_recommended'
  | 'urgent_safety_escalation';
export type ReadabilityState = 'clear' | 'uncertain' | 'unreadable';

export interface ResultFact {
  label: string;
  display_value: string;
  source: EvidenceSource;
  confirmed: boolean;
}

export interface ResultGap {
  label: string;
}

export interface CauseAssessment {
  category: string;
  description: string;
  is_safety_concern: boolean;
  confidence: CauseConfidenceLabel;
}

export interface SafeAction {
  action: string;
  reason: string;
}

export interface ProhibitedAction {
  action: string;
  hazard: string;
}

export interface RecommendedAction {
  action: string;
  timeline: string;
  requires_technician: boolean;
}

export interface TechnicianBrief {
  generated_text: string;
}

export interface AssessmentResult {
  assessment_id: string;
  schema_version: string;
  generated_at: string;
  status: AssessmentStatus;
  summary: string;
  known_facts: ResultFact[];
  missing_or_uncertain: ResultGap[];
  possible_causes: CauseAssessment[];
  safe_checks: SafeAction[];
  prohibited_actions: ProhibitedAction[];
  recommended_next_action: RecommendedAction;
  technician_brief: TechnicianBrief | null;
  disclaimer: string;
}

export interface LoadObservation {
  name: string;
  quantity?: number;
  stated_power?: string;
  recently_added_or_changed?: boolean;
}

export interface ImageObservation {
  label: string;
  extracted_value: string;
  readability: ReadabilityState;
  confirmed: boolean;
  corrected_value: string | null;
  rejected: boolean;
}

export interface EvidenceFormData {
  originalDescription: string;
  previousRuntimeValue: string;
  previousRuntimeUnit: string;
  currentRuntimeValue: string;
  currentRuntimeUnit: string;
  changePattern: string;
  changeBegan: string;
  warningOrError: string;
  reachesFullCharge: string;
  daytimeChargingChange: string;
  approximateAge: string;
  inverterBrand: string;
  inverterModel: string;
  batteryBrand: string;
  batteryModel: string;
  batteryChemistry: string;
  panelCapacity: string;
  recentMaintenance: string;
  manualDisplayReading: string;
  loads: LoadObservation[];
}

export interface ClarificationAnswer {
  question: string;
  answer: string;
}
