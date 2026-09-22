import { API_BASE_URL } from './config';
import type { ImageObservation } from '../types/assessment';

export async function uploadImageEvidence(file: File): Promise<ImageObservation[]> {
  const formData = new FormData();
  formData.append('image', file);

  const url = `${API_BASE_URL}/api/v1/assessments/upload-image`;
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    let msg = 'Failed to process image.';
    try {
      const data = await response.json();
      if (data.detail) msg = data.detail;
    } catch {}
    throw new Error(msg);
  }

  return response.json();
}
