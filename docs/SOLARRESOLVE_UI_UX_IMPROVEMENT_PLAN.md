# SolarResolve UI/UX Improvement and Submission Plan

## Document purpose

This document combines the current SolarResolve UI/UX audit, the useful ideas identified in the Solar Quote Check reference, and the recommended implementation direction for the submission build.

It is the working specification for improving the existing product without changing its approved MVP scope:

> Help a solar-system owner safely organize evidence about declining battery runtime, receive limited decision support, and produce a technician-ready brief.

The goal is not to turn SolarResolve into a full quote-verification or solar-sizing product. The goal is to improve clarity, credibility, responsiveness, evidence collection, and presentation while preserving the current safety-first assessment flow.

---

## 1. Executive summary

SolarResolve is live and its core journey is understandable. The forest-green and amber palette fits the solar domain, the primary call to action is visible, the safety positioning is responsible, and the existing assessment architecture already supports structured evidence.

The submission build still needs a focused polish pass. The most urgent problems are:

1. The live site has serious mobile overflow and navigation problems.
2. SolarPeer branding and placeholder content remain in the SolarResolve experience.
3. Typography is declared but not loaded.
4. Several CSS variables used by assessment screens are undefined.
5. The safety and intake screens do not yet match the visual quality of the landing page.
6. Appliance entry is manual and does not help users provide consistent load information.
7. Assessment results need a stronger visual summary and clearer separation between facts, uncertainty, safe actions, and technician escalation.

The recommended submission strategy is to fix these issues in order of user impact, then verify the complete flow on desktop and mobile.

---

## 2. Current-state audit

### 2.1 What already works

- The live site loads and the inspected pages produced no browser console warnings or errors.
- The deep forest and amber palette gives the product a recognizable solar identity.
- The landing-page headline communicates the product outcome.
- The primary “Assess my battery” action is prominent.
- The product explicitly limits itself to declining battery runtime.
- The safety gate appears before evidence intake.
- The assessment flow separates evidence collection, image review, clarification, results, and technician escalation.
- The application already distinguishes user evidence, confirmed image evidence, and deterministic calculations.
- The result schema already supports known facts, missing information, possible causes, safe checks, prohibited actions, next actions, and a technician brief.

### 2.2 Critical problems

#### Mobile layout failure

At a 390 px viewport, the audited live page expanded to approximately 625 px.

Observed effects:

- Navigation links overlap the SolarResolve logo.
- The primary navigation call to action extends beyond the viewport.
- Content cards overflow horizontally.
- A horizontal scrollbar appears.
- Hero actions become awkwardly narrow and tall.
- The layout does not provide a compact mobile navigation pattern.

This is the highest-priority presentation defect because the likely user base will frequently access SolarResolve from a phone.

#### Brand contamination and placeholder content

SolarPeer language remains in the SolarResolve experience. Known examples include:

- `pilot@solarpeer360.com`
- “Reliable power from the solar system next door.”
- Previously deployed SolarPeer phone and WhatsApp placeholders
- An About route that currently renders the Help screen as a placeholder

All visible SolarPeer references must be removed or replaced with verified SolarResolve information before submission.

#### Fonts are not loaded

The stylesheet declares:

- Source Sans 3 for interface copy
- General Sans for headings

The HTML entry point does not load either font. Browsers therefore use fallback fonts, weakening visual consistency and making the implemented design differ from the intended design.

#### Undefined design tokens

Assessment screens refer to tokens that are not defined in the active root token set, including examples such as:

- `--space-lg`
- `--space-sm`
- `--radius-md`
- `--text-primary`
- `--text-secondary`
- `--text-muted`
- `--border-color`
- `--accent-primary`

Undefined values create inconsistent or silently missing styling. The submission build must use one documented token vocabulary.

#### Inconsistent interaction styling

- Form cards lift on hover even though they are not navigational or clickable cards.
- The safety fieldset uses a visually raw border and legend.
- Form layouts rely heavily on inline styles.
- Assessment results mix hard-coded colors with unresolved CSS variables.
- Controls use inconsistent corner radii, border colors, and spacing.

#### Manual appliance input

Users currently type appliance names manually. This produces inconsistent spelling and incomplete load information, limiting the quality of the assessment and the technician brief.

---

## 3. Product and scope guardrails

### 3.1 In scope for the submission build

- Responsive navigation and page layouts
- SolarResolve branding cleanup
- A consistent design-token system
- Correct typography loading
- Refined landing, safety, intake, clarification, and result presentation
- Structured appliance presets with editable values
- Quantity, estimated power, night-use hours, and recent-change capture
- A compact estimated-night-load calculation
- Clear known-fact, uncertainty, safety, and escalation presentation
- Accessible focus, validation, labels, and keyboard operation
- Desktop and mobile verification

### 3.2 Out of scope for the submission build

- Full installer quote parsing
- Installer price benchmarking
- Automatic quotation OCR as a new product flow
- A general-purpose solar sizing calculator
- Animated energy-flow diagrams that do not improve the assessment journey
- Claims that SolarResolve can confirm a diagnosis remotely
- Claims that preset appliance wattages are exact manufacturer specifications
- Unverified business statistics, deployment numbers, or performance claims

The Solar Quote Check reference is an interaction and information-design reference. It is not a request to copy its entire product scope.

---

## 4. Recommended visual direction

### 4.1 Design character

Use a **premium editorial-utility** direction:

- Editorial hierarchy for the landing page and major explanations
- Utility-focused, predictable layouts for safety and evidence forms
- High-contrast data presentation for runtimes, wattage, status, and evidence completeness
- Warm, credible surfaces instead of generic blue SaaS styling
- Restrained motion that supports comprehension

The product should feel calm, careful, technically credible, and locally relevant.

### 4.2 Core palette

| Token | Value | Use |
| --- | --- | --- |
| Deep forest | `#07372b` | Header, hero, dark result surfaces |
| Grid green | `#0b4d3b` | Primary brand green, secondary actions |
| Solar amber | `#f4b43a` | Primary calls to action, highlighted readings |
| Solar bronze | `#b8895d` | Optional decorative or secondary accent |
| Warm cream | `#fbf8f3` | Page background |
| Surface white | `#ffffff` | Cards and form surfaces |
| Energy ink | `#13231d` | Primary body text |
| Market grey | `#627069` | Secondary text |
| Soft line | `#d9e2dc` | Borders and dividers |
| Success tint | `#e8f5ee` | Safe or confirmed states |
| Information tint | `#eaf1fa` | Missing-information guidance |
| Error tint | `#fbeded` | Hazard and prohibited-action surfaces |
| On-dark muted | `#b9c8c1` | Secondary copy on dark surfaces |

### 4.3 Typography

| Role | Typeface | Notes |
| --- | --- | --- |
| Display and headings | General Sans | Strong, modern headings without feeling clinical |
| Body and controls | Source Sans 3 | Highly readable at form and mobile sizes |
| Measurements and data | Geist Mono | Runtimes, watts, percentages, codes, and status metadata |

Implementation requirements:

- Load the selected fonts explicitly in `frontend/index.html` or through a local/self-hosted strategy.
- Use tabular numerals for metrics when available.
- Preserve system-font fallbacks for resilience.
- Do not rely on a declared font family that is never loaded.

### 4.4 Shape, borders, and elevation

- Control radius: `8px`
- Card radius: `12px`
- Pill radius: `999px`
- Default card border: `1px solid #d9e2dc`
- Default card shadow: `0 1px 2px #13231d0f, 0 8px 24px #13231d0f`
- Lift shadow: `0 2px 6px #13231d14, 0 18px 40px #13231d24`

Lift effects should apply only to elements that behave like selectable or navigational cards. Safety forms and evidence sections should remain visually stable on hover.

### 4.5 Motion

Use intentional but restrained motion:

- Header underline transitions
- Accordion-chevron rotation
- Short card lift on clickable cards
- Status and progress transitions
- Respect `prefers-reduced-motion`

Avoid decorative animation in safety-critical screens.

---

## 5. Canonical design-token requirements

Replace the mixed token vocabulary with one canonical set.

Recommended root tokens:

```css
:root {
  --grid-green: #0b4d3b;
  --deep-grid: #07372b;
  --solar-amber: #f4b43a;
  --solar-bronze: #b8895d;
  --warm-cream: #fbf8f3;
  --surface: #ffffff;
  --energy-ink: #13231d;
  --market-grey: #627069;
  --soft-line: #d9e2dc;

  --tint-success: #e8f5ee;
  --tint-info: #eaf1fa;
  --tint-error: #fbeded;
  --on-dark-muted: #b9c8c1;

  --font-body: "Source Sans 3", "Segoe UI", sans-serif;
  --font-heading: "General Sans", "Source Sans 3", sans-serif;
  --font-data: "Geist Mono", "Cascadia Mono", monospace;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  --radius-control: 8px;
  --radius-card: 12px;
  --radius-pill: 999px;

  --shadow-card: 0 1px 2px #13231d0f, 0 8px 24px #13231d0f;
  --shadow-lift: 0 2px 6px #13231d14, 0 18px 40px #13231d24;
}
```

Every existing reference to undefined legacy tokens must either be migrated to these tokens or supported through an intentional compatibility alias. New UI work must not introduce a third token vocabulary.

---

## 6. Responsive layout requirements

### 6.1 Header and navigation

#### Desktop

- Use a sticky dark header.
- Apply a subtle translucent surface and `backdrop-filter: blur(8px)` where supported.
- Keep the logo, navigation, and primary action on one aligned row.
- Use an amber underline animation for standard navigation links.
- Keep the primary action visually distinct from text links.

#### Mobile

- Never allow desktop navigation links to wrap beside the logo.
- Use a compact menu button or a deliberately reduced mobile navigation layout.
- Ensure the expanded menu remains keyboard accessible.
- Keep the primary assessment action visible in the expanded menu.
- Prevent body-level horizontal scrolling.

### 6.2 General breakpoints

- Mobile: up to `639px`
- Tablet: `640px` to `1023px`
- Desktop: `1024px` and above

### 6.3 Layout rules

- Two-column hero layouts must collapse to one column on smaller screens.
- Two-column audience cards must collapse to one column.
- Form rows must stack when the available width cannot support readable labels and inputs.
- Buttons must wrap or become full-width without forcing overflow.
- Card content must use `min-width: 0` inside grid and flex containers.
- Images must use `max-width: 100%` and responsive sizing.
- The page must remain usable at 320 px width.

### 6.4 Responsive acceptance criteria

- `document.documentElement.scrollWidth` must not exceed the viewport width at 320, 375, 390, 768, 1024, and 1440 px.
- Navigation must not overlap the logo.
- No primary form field or card may be clipped.
- The main call to action must remain readable without forced multi-line words.

---

## 7. Landing-page requirements

### 7.1 Hero

Keep the current product promise but strengthen the visual presentation.

Recommended structure:

1. A small status pill such as “Safety-aware battery assessment.”
2. A direct headline focused on turning observations into informed action.
3. A short explanation of the declining-runtime use case.
4. A primary “Assess my battery” action.
5. A secondary help action.
6. A restrained solar glow, grid, or technical illustration.

Do not use unverifiable status claims such as deployment counts or success rates.

### 7.2 Supported-scenario notice

Keep the scope notice, but present it as a refined information band or compact callout rather than a visually dominant warning strip.

### 7.3 How-it-works cards

Use three steps:

1. Describe what changed.
2. Organize safe evidence.
3. Receive an assessment and technician brief.

Cards may use a restrained lift effect because they explain progression, but they should not appear clickable unless they actually navigate.

### 7.4 Audience section

Retain the owner and technician perspectives, but remove duplicated calls to action and ensure the technician copy does not promise calculations that the result does not actually produce.

### 7.5 Safety section

Use a clearly labelled safety surface with:

- Immediate stop conditions
- A concise “decision support, not diagnosis” statement
- A route into the assessment only when it is safe to continue

---

## 8. Safety-check requirements

### 8.1 Visual treatment

- Remove lift-on-hover movement from the safety card.
- Replace the raw fieldset appearance with a clean group container.
- Preserve semantic `<fieldset>` and `<legend>` elements.
- Use a compact vertical rhythm while keeping touch targets at least 44 px.
- Separate the “None of these observed” option visually from active hazards.

### 8.2 Interaction rules

- Selecting “None of these observed” must clear active hazard selections.
- Selecting any hazard must clear the “None” option.
- Continue must remain blocked until the user selects a valid state.
- Any hazard must route to the urgent escalation experience.
- Error messages must be announced with `role="alert"` and associated with the group.

### 8.3 Tone

Use direct, non-alarming language. Do not encourage inspection, opening equipment, touching cables, measuring live conductors, or approaching a hazardous system.

---

## 9. Appliance and load selector specification

The appliance selector is the most valuable idea to adapt from Solar Quote Check.

### 9.1 User experience

The section should begin with a labelled dropdown:

> Choose an appliance…

Selecting a preset adds an editable load row. Each row must contain:

- Appliance name
- Quantity
- Estimated watts per appliance
- Hours used at night
- “Recently added or changed” checkbox
- Remove action

Include an “Other appliance” option for manual entry.

### 9.2 Preset catalogue

| Appliance | Typical estimate |
| --- | ---: |
| LED bulb | 10 W |
| Ceiling fan | 70 W |
| TV | 100 W |
| Laptop | 60 W |
| Wi-Fi router | 15 W |
| Refrigerator | 150 W |
| Chest freezer | 200 W |
| Air conditioner, 1 HP | 900 W |
| Water pump, 0.75 HP | 750 W |
| Washing machine | 500 W |
| Electric iron | 1,000 W |
| Microwave | 1,200 W |
| Electric kettle | 1,500 W |
| POS and phone charging | 20 W |

### 9.3 Accuracy language

Preset values must be labelled as typical estimates. Users must be able to edit them because actual consumption varies by model, efficiency, operating mode, compressor duty cycle, and appliance condition.

Suggested helper text:

> We filled a typical estimate. Replace it with the appliance label or manual value if you know it.

### 9.4 Data model

The existing `LoadObservation` model already includes:

- `name`
- `quantity`
- `stated_power`
- `recently_added_or_changed`

Extend it with an optional night-use field, for example:

```ts
export interface LoadObservation {
  name: string;
  quantity?: number;
  stated_power?: string;
  night_use_hours?: number;
  recently_added_or_changed?: boolean;
}
```

If deterministic energy estimation is implemented, normalize the wattage to a numeric value before calculation while preserving the user-facing stated value.

### 9.5 Calculated summary

Show a compact summary below the selected loads:

- Estimated connected load in watts
- Estimated night energy in kWh, when hours and wattage are available
- Number of recently added or changed loads

Example:

> Estimated night load: 1.8 kWh · 1 recently changed appliance

The calculation must be deterministic and described as an estimate.

### 9.6 Calculation

For rows with usable numeric values:

```text
night energy per appliance (kWh)
= quantity × watts × night-use hours ÷ 1000
```

Total estimated night energy is the sum of valid appliance rows.

Do not use this estimate as a confirmed diagnosis. Treat it as structured context for the assessment and technician brief.

### 9.7 Validation

- Require at least one named appliance.
- Quantity must be greater than zero when provided.
- Wattage must be greater than zero when provided.
- Night-use hours must be between 0 and 24.
- Allow an incomplete row to remain editable, but identify what information is missing before submission.
- Do not silently replace a user-edited wattage when a preset changes.

### 9.8 Reference bug not to copy

The reference renders `Choose one\u2026` literally. SolarResolve must use a real ellipsis or three periods:

> Choose an appliance…

---

## 10. Evidence-intake requirements

### 10.1 Structure

Organize the screen into clearly numbered sections:

1. What changed
2. Runtime before and now
3. Charging and system information
4. Appliances and night loads
5. Visible display reading

### 10.2 Progressive disclosure

Use accordions only for secondary assumptions or details. Do not hide required fields, safety instructions, or validation errors.

### 10.3 Form behavior

- Stack form rows on narrow screens.
- Keep labels above controls.
- Use clear optional markers.
- Keep error text adjacent to the relevant field.
- Move focus to the first invalid field on submission.
- Preserve entered data when navigating backward.
- Avoid placeholder-only instructions.

### 10.4 “Assumptions you can change” pattern

This pattern may be used for editable estimates such as appliance wattage explanations. It should explain defaults without overwhelming the primary intake flow.

---

## 11. Assessment-result requirements

### 11.1 Assessment snapshot

Adapt the dark calculator concept into a dark **Assessment snapshot** card.

Suggested metrics:

| Metric | Example |
| --- | --- |
| Previous runtime | `7 h` |
| Current runtime | `3 h` |
| Runtime decline | `57%` |
| Observed connected load | `620 W` |
| Estimated night energy | `1.8 kWh` |
| Evidence completeness | `4 of 6` |

Use Geist Mono for values. Use amber for the primary reading and restrained semantic colors for status.

### 11.2 Information hierarchy

Display result content in this order:

1. Overall assessment status
2. Plain-language summary
3. Assessment snapshot
4. Known facts
5. Missing or uncertain information
6. Plausible cause categories with confidence labels
7. Safe observations
8. Prohibited actions
9. Recommended next action
10. Technician-ready brief
11. Decision-support disclaimer

### 11.3 Known facts and uncertainty

Use clearly different surfaces for:

- Confirmed user facts
- Confirmed image observations
- Deterministic calculations
- Unconfirmed or missing information

Never make uncertain data look confirmed merely because it appears in a metric card.

### 11.4 Technician communication

Use a clearly labelled section such as:

> What to tell your technician

Keep the existing copy action. Provide visible success and failure feedback. Ensure the brief includes appliance changes and estimated load information only when available.

### 11.5 Safety priority

Prohibited actions must be more visually prominent than optional safe observations. Urgent escalation must override the standard result presentation.

---

## 12. Brand and content cleanup

### 12.1 Required removals

Search the complete frontend and deployment output for:

- `SolarPeer`
- `solarpeer360`
- `0800 SOLARPEER`
- “Reliable power from the solar system next door.”
- Any placeholder phone, WhatsApp, or email address

Replace them only with verified SolarResolve content. If no verified contact channel exists, omit the contact item rather than publishing invented information.

### 12.2 About route

Replace the Help-screen placeholder with either:

- A small dedicated About screen explaining purpose, supported scenario, safety boundary, and limitations; or
- Removal of the About link until a real page exists.

For submission, a concise dedicated About screen is preferred.

### 12.3 Claims

Avoid claims about:

- Number of deployments
- Accuracy rates
- Savings achieved
- Guaranteed diagnoses
- Installer honesty
- Exact battery health

Every factual product claim must be supported by current functionality or project evidence.

---

## 13. Accessibility requirements

- Maintain semantic heading order.
- Preserve fieldsets and legends for grouped safety controls.
- Provide visible labels for every form control.
- Ensure every control is keyboard accessible.
- Use `:focus-visible` with a high-contrast focus ring.
- Keep touch targets at least 44 × 44 px.
- Associate errors using `aria-describedby`.
- Announce dynamic validation and copy status through suitable live regions.
- Do not communicate assessment status through color alone.
- Verify text contrast against cream, white, amber, and forest surfaces.
- Respect reduced-motion preferences.
- Provide meaningful image alternative text.
- Ensure the mobile menu exposes its expanded state through `aria-expanded`.

---

## 14. Recommended file-level implementation map

| File | Recommended change |
| --- | --- |
| `frontend/index.html` | Load approved fonts and retain viewport metadata |
| `frontend/src/index.css` | Consolidate tokens, global typography, header, buttons, cards, responsive rules, and focus states |
| `frontend/src/components/Navigation.tsx` | Add responsive navigation and replace SolarPeer footer content |
| `frontend/src/App.tsx` | Replace the About placeholder route |
| `frontend/src/screens/LandingScreen.tsx` | Refine hero, status pill, responsive layout, steps, and safety callout |
| `frontend/src/screens/FormStyles.css` | Remove undefined tokens, stabilize form cards, add responsive form layouts |
| `frontend/src/screens/SafetyCheckScreen.tsx` | Refine hazard grouping and exclusive “None” behavior |
| `frontend/src/screens/EvidenceIntakeScreen.tsx` | Add appliance presets, editable load rows, validation, and calculated summary |
| `frontend/src/types/assessment.ts` | Extend `LoadObservation` for optional night-use hours if used |
| `frontend/src/context/AssessmentContext.tsx` | Update empty/default evidence structures if the load model changes |
| `frontend/src/screens/ClarificationScreen.tsx` | Present structured evidence and uncertainty consistently |
| `frontend/src/screens/AssessmentScreen.tsx` | Add assessment snapshot and remove unresolved/hard-coded presentation tokens |
| Frontend tests | Cover navigation, appliance rows, calculations, validation, safety exclusivity, and results |

Any corresponding backend schema must be updated if the frontend begins sending a new `night_use_hours` field.

---

## 15. Implementation priority

### P0: Must complete before submission

1. Fix mobile navigation and all horizontal overflow.
2. Remove SolarPeer branding and placeholder contact information.
3. Replace or remove the placeholder About route.
4. Load the intended fonts.
5. Consolidate undefined and conflicting CSS tokens.
6. Ensure landing, safety, intake, and result pages work at mobile widths.
7. Run the existing frontend tests and production build.

### P1: High-value submission improvements

1. Add the appliance preset selector.
2. Add quantity, editable wattage, night-use hours, and recent-change fields.
3. Add deterministic estimated-night-load output.
4. Add the assessment snapshot card.
5. Improve known-fact, uncertainty, safety, and next-action hierarchy.
6. Add focused automated tests for the new interactions.

### P2: Polish if time remains

1. Sticky glass header on desktop.
2. Refined animated link underlines.
3. Accordion polish and chevron transitions.
4. Small entrance transitions that respect reduced motion.
5. Further reduction of inline styles into reusable classes.

### Deferred

- Full quote analysis
- Installer price comparisons
- Quote OCR
- Animated energy-flow visualization
- General solar-system sizing

---

## 16. Verification plan

### 16.1 Automated checks

Run the frontend checks defined by the project:

```bash
cd frontend
npm run lint
npm run test:run
npm run build
```

All commands must exit successfully.

### 16.2 Responsive checks

Verify at minimum:

- 320 × 568
- 375 × 812
- 390 × 844
- 768 × 1024
- 1024 × 768
- 1440 × 900

For each viewport, verify:

- No horizontal scrollbar
- No clipped cards or controls
- No logo/navigation overlap
- Readable hero actions
- Correct form stacking
- Accessible mobile navigation

### 16.3 Assessment-flow checks

1. Open the landing page.
2. Start an assessment.
3. Confirm no urgent hazard.
4. Enter a declining-runtime scenario.
5. Add appliances from presets.
6. Edit quantity, watts, and hours.
7. Confirm the estimated load updates correctly.
8. Continue without an image.
9. Complete clarification.
10. Review the assessment snapshot and technician brief.
11. Copy the technician brief.
12. Start a new assessment and confirm state resets.

### 16.4 Safety checks

- Confirm each urgent hazard routes to escalation.
- Confirm “None observed” is mutually exclusive with hazards.
- Confirm late hazard text still triggers escalation.
- Confirm no screen recommends dangerous inspection or electrical probing.

### 16.5 Content checks

- No SolarPeer references remain in source or deployed output.
- No invented contact details are displayed.
- The About route has intentional content.
- No unsupported accuracy, savings, or deployment claims appear.
- All appliance wattages are labelled as estimates.

---

## 17. Definition of done

The UI/UX improvement pass is complete when all of the following are true:

- [ ] The site has no horizontal overflow at the required viewports.
- [ ] Mobile navigation is usable and keyboard accessible.
- [ ] All SolarPeer and placeholder branding has been removed.
- [ ] The About route is intentional.
- [ ] Source Sans 3, General Sans, and Geist Mono load as intended or use an approved local equivalent.
- [ ] One canonical design-token system is used across the frontend.
- [ ] Safety forms do not move on hover.
- [ ] Appliance presets add editable structured load rows.
- [ ] Preset wattages are presented as estimates.
- [ ] Estimated night load is deterministic and correctly labelled.
- [ ] Result metrics never present uncertain evidence as confirmed.
- [ ] Safety escalation remains deterministic and visually prominent.
- [ ] The technician brief remains copyable.
- [ ] Lint passes.
- [ ] Frontend tests pass.
- [ ] Production build passes.
- [ ] The deployed application is rechecked on desktop and mobile.

---

## 18. Final recommendation

Prioritize reliability and clarity over feature expansion.

The strongest submission is not a full copy of Solar Quote Check or SolarPeer 360. It is a coherent SolarResolve experience that:

- Works cleanly on the phones its users are likely to have
- Collects better appliance and runtime evidence
- Communicates uncertainty honestly
- Treats safety as product behavior
- Produces a clear technician-ready result
- Looks intentional and consistent from landing page to final assessment

Implement P0 first, then complete as much of P1 as the available submission time safely allows.
