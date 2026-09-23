# SolarResolve Homepage: Official Designer Handoff

## Purpose

This is the handoff package for the approved SolarResolve homepage direction. It is for the designer who will turn the working React demo into final Figma screens, component states, assets, and production-ready specifications.

The homepage serves solar owners whose battery runtime has become shorter. It must help them organize observations and reach the existing safety check. It is **not** a remote diagnosis, a quote-comparison marketplace, or a repair guide.

## What has been approved

The local working demo at `http://127.0.0.1:5174/` is the visual reference. Its direction is:

- Deep forest-green surfaces, warm cream pages, and solar-amber actions.
- Calm, evidence-first editorial typography.
- A practical interaction near the top: Runtime Change Check.
- Product proof in place of invented customer counts, testimonials, or accuracy claims.
- Visible safety limits and a clear technician handoff.

Every primary action must continue to the existing `/safety-check` route. Do not redesign or bypass that gate.

## Important brand note

The existing folder [`SolarResolve-Official-Identity-V2-P6-2026-09-23`](../SolarResolve-Official-Identity-V2-P6-2026-09-23/) contains the approved logo construction files and production-export requirements. Its older brown `Earth & Saffron` web palette conflicts with this later, approved green homepage demo.

For this homepage work, this handoff's forest-green palette is controlling. Preserve the existing logo's geometry, clear space, and export rules. Do not redraw the mark or choose a replacement logo direction. Flag the palette discrepancy to the project owner before applying the green palette to non-homepage materials such as print, social, or trademark masters.

## Package contents

| File | Use it for |
| --- | --- |
| [HOMEPAGE_VISUAL_SYSTEM.md](./HOMEPAGE_VISUAL_SYSTEM.md) | Colors, type, spacing, surfaces, motion, and asset direction. |
| [HOMEPAGE_WIREFRAME_AND_COMPONENTS.md](./HOMEPAGE_WIREFRAME_AND_COMPONENTS.md) | Page order, component anatomy, interactions, and desktop/mobile behavior. |
| [HOMEPAGE_COPY_DECK.md](./HOMEPAGE_COPY_DECK.md) | Approved homepage copy and required safety language. |
| [HOMEPAGE_BUILD_QA_BRIEF.md](./HOMEPAGE_BUILD_QA_BRIEF.md) | Figma delivery checklist, implementation constraints, accessibility, and QA. |
| [SOLARRESOLVE_HOMEPAGE_REQUIREMENTS.md](./SOLARRESOLVE_HOMEPAGE_REQUIREMENTS.md) | The fuller product, content, research, and launch rationale. |

## Source files the designer may inspect

| File | What it represents |
| --- | --- |
| [`frontend/src/screens/LandingScreen.tsx`](../frontend/src/screens/LandingScreen.tsx) | The working page structure, copy, routes, and runtime-check behavior. |
| [`frontend/src/index.css`](../frontend/src/index.css) | The working visual prototype and responsive rules. |
| [`frontend/src/components/Navigation.tsx`](../frontend/src/components/Navigation.tsx) | Header, mobile menu, footer, and primary action destination. |
| [`frontend/src/assets/`](../frontend/src/assets/) | Current in-product raster assets. Do not use these as a logo master. |
| [`SolarResolve-Official-Identity-V2-P6-2026-09-23`](../SolarResolve-Official-Identity-V2-P6-2026-09-23/) | Editable logo SVGs and logo production handoff. |

## Designer deliverables

1. A Figma file with desktop (1440 px), tablet (768 px), and mobile (375 px) homepage frames.
2. Named color, text, spacing, radius, shadow, and component styles.
3. All interaction states: default, hover, focus-visible, pressed, selected, disabled, error, and expanded/collapsed where applicable.
4. A component page for header, buttons, runtime fields, choice chips, result cards, safety panel, FAQ, and footer.
5. Export-ready imagery or a clear brief for any photo/illustration required. No decorative hero video is required.
6. A short developer annotation layer: CSS values, breakpoint behavior, semantic labels, and asset export names.

## Non-negotiables

- Keep one clear primary audience action: **Assess my battery-runtime problem**.
- Maintain the safety-first route and exact boundaries in the copy deck.
- Do not add fake numbers, fake reviews, countdowns, pricing, technician claims, or certification badges.
- Do not make the runtime percentage look like a battery-health score.
- Keep all controls usable by keyboard and at a 320 px viewport.
- Treat photos as optional and only of safely visible equipment displays.

## Delivery sequence for the designer

1. Recreate the desktop reference using the visual system and copy deck.
2. Build the mobile frame independently; do not merely shrink the desktop design.
3. Add interaction states and annotate responsive reflow.
4. Review the build/QA brief with the developer before visual sign-off.
5. Hand over the Figma link, exports, component page, and any unresolved decisions.

