/**
 * Shared hazard policy — single source of truth for hazard detection.
 * Used by SafetyCheckScreen, late-stage text scanning, and result output filtering.
 */

export interface HazardFlag {
  id: string;
  label: string;
}

export const HAZARD_FLAGS: HazardFlag[] = [
  { id: 'smoke_or_fire', label: 'Smoke or fire' },
  { id: 'burning_smell', label: 'Burning smell' },
  { id: 'battery_damage', label: 'Battery swelling, leaking, hissing, cracking, or physical damage' },
  { id: 'exposed_conductors', label: 'Exposed or sparking conductors' },
  { id: 'electric_shock', label: 'Electric shock' },
  { id: 'severe_heat', label: 'Severe or unusual heat' },
  { id: 'water_ingress', label: 'Water entering electrical equipment' },
];

export const ESCALATION_MESSAGE =
  'Keep a safe distance. Do not touch, open, disconnect, probe, or attempt ' +
  'to repair the equipment. Contact a qualified solar/electrical professional ' +
  'or emergency service as appropriate.';

// Late-stage text scanning — deterministic keyword rules
const HAZARD_SYNONYMS: Record<string, string[]> = {
  smoke_or_fire: ['smoke', 'fire', 'flames', 'burning', 'on fire', 'smouldering', 'smoldering'],
  burning_smell: ['burning smell', 'acrid', 'smell of burning', 'chemical smell', 'melting smell'],
  battery_damage: [
    'swelling', 'swollen', 'leaking', 'hissing', 'cracking', 'bulging',
    'battery damage', 'battery leak', 'expanding', 'puffed up',
  ],
  exposed_conductors: ['exposed wire', 'sparking', 'bare wire', 'arcing', 'spark', 'exposed conductor'],
  electric_shock: ['electric shock', 'got shocked', 'electrocuted', 'tingling', 'zapped'],
  severe_heat: ['extremely hot', 'severe heat', 'too hot to touch', 'overheating', 'melting'],
  water_ingress: ['water inside', 'water ingress', 'flooded', 'water damage', 'water entering', 'wet inside'],
};

const compiledPatterns: Map<string, RegExp> = new Map();
for (const [hid, terms] of Object.entries(HAZARD_SYNONYMS)) {
  const pattern = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  compiledPatterns.set(hid, new RegExp(pattern, 'i'));
}

const negationPattern = /\b(?:no|not|without|never)\b(?:(?!except|but|however|only)[^\.,;!\?]){0,40}\s*$/i;

export function scanTextForHazards(text: string): string[] {
  if (!text) return [];
  const found: string[] = [];
  const textLower = text.toLowerCase();
  
  for (const [hid, pattern] of compiledPatterns) {
    // using matchAll requires global flag, so we use exec in a loop, or string.search isn't enough
    // since we created patterns without 'g', let's just create a new RegExp with 'g'
    const globalPattern = new RegExp(pattern.source, 'gi');
    let match;
    while ((match = globalPattern.exec(textLower)) !== null) {
      const prefix = textLower.slice(Math.max(0, match.index - 40), match.index);
      if (negationPattern.test(prefix)) {
        continue;
      }
      found.push(hid);
      break;
    }
  }
  return found;
}

// Prohibited action detection
const PROHIBITED_VERBS = [
  'open', 'unscrew', 'remove cover', 'disassemble',
  'touch terminal', 'touch conductor', 'handle wire',
  'disconnect', 'reconnect', 'detach', 'unplug battery',
  'bypass', 'bridge', 'short', 'jumper', 'probe',
  'measure voltage', 'use multimeter', 'use voltmeter',
  'alter setting', 'change firmware', 'update firmware',
  'change charging voltage', 'modify configuration',
];

const prohibitedPattern = new RegExp(
  PROHIBITED_VERBS.map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'i',
);

export function containsProhibitedAction(text: string): boolean {
  if (!text) return false;
  return prohibitedPattern.test(text);
}
