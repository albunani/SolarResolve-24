import { scanTextForHazards } from './hazardPolicy';
import { describe, it, expect } from 'vitest';

describe('Hazard Policy', () => {
  it('detects affirmative hazards', () => {
    const hazards = scanTextForHazards('I saw smoke coming from the battery');
    expect(hazards).toContain('smoke_or_fire');
  });

  it('ignores clear negative statements', () => {
    const hazards = scanTextForHazards('There is no smoke or exposed wiring');
    expect(hazards).toHaveLength(0);
  });

  it('triggers on ambiguous safety statements', () => {
    const hazards = scanTextForHazards('I may have noticed a burning smell.');
    expect(hazards).toContain('burning_smell');
  });

  it('does not ignore hazards when negation is overridden (e.g. except)', () => {
    const hazards = scanTextForHazards('I did not notice anything except smoke.');
    expect(hazards).toContain('smoke_or_fire');
  });
});
