/**
 * Route guard — redirects to the earliest valid screen when
 * the user tries to access a step they haven't unlocked yet.
 */

import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAssessment } from './AssessmentContext';

interface RouteGuardProps {
  requiredStep: 'hazard_complete' | 'intake_complete' | 'image_complete' | 'clarification_complete' | 'result_ready';
  children: ReactNode;
}

const STEP_ORDER = ['idle', 'hazard_complete', 'intake_complete', 'image_complete', 'clarification_complete', 'result_ready'] as const;

const REDIRECT_MAP: Record<string, string> = {
  idle: '/',
  hazard_complete: '/safety-check',
  intake_complete: '/intake',
  image_complete: '/image-evidence',
  clarification_complete: '/clarification',
  result_ready: '/assessment',
};

export function RouteGuard({ requiredStep, children }: RouteGuardProps) {
  const { state } = useAssessment();

  // Allow escalated state through to any screen so the escalation UI can render
  if (state.step === 'escalated') {
    return <Navigate to="/safety-check" replace />;
  }

  // Error state — allow retry on the current step
  if (state.step === 'error') {
    return <>{children}</>;
  }

  const currentIndex = STEP_ORDER.indexOf(state.step as typeof STEP_ORDER[number]);
  const requiredIndex = STEP_ORDER.indexOf(requiredStep);

  if (currentIndex < requiredIndex) {
    // Redirect to the earliest valid step
    const redirectTo = REDIRECT_MAP[state.step] ?? '/';
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
