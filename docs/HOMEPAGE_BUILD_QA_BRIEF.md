# Homepage Build and QA Brief

## Working implementation reference

The approved functional demo is already implemented in:

- [`frontend/src/screens/LandingScreen.tsx`](../frontend/src/screens/LandingScreen.tsx)
- [`frontend/src/index.css`](../frontend/src/index.css)
- [`frontend/src/components/Navigation.tsx`](../frontend/src/components/Navigation.tsx)

It is a React 19 + Vite application. The homepage is route `/`; the assessment safety gate is `/safety-check`. The homepage must not create a new backend dependency for the current release.

## What is frontend-only

The following designer-led work is frontend-only:

- Figma screens, component styles, icons, gradients, and illustration choices.
- Layout, typography, responsive behavior, button treatments, FAQ visuals, and transitions.
- Runtime Change Check presentation and client-side calculation.
- Copy layout and content hierarchy.
- Accessible navigation and interaction styling.

No Railway, API, database, or AI-service work is required to reproduce the approved homepage demo.

## Do not break these existing behaviors

- All homepage start buttons navigate to `/safety-check`.
- `/intake`, `/image-evidence`, `/clarification`, and `/assessment/results` remain protected assessment steps.
- Runtime fields accept a previous value above zero and a current value of zero or greater.
- Current runtime greater than previous is handled as a different explanatory state.
- The user can continue without a photo in the later flow.
- Hazard guidance remains deterministic and precedes ordinary intake.

## Accessibility requirements

- One descriptive H1 and a logical heading hierarchy.
- Visible focus state on all links, buttons, inputs, details summaries, and menu items.
- At least 44 × 44 CSS px targets for interactive controls.
- Visible labels, not placeholder-only labels, for both runtime fields.
- Related selection chips sit in a labelled fieldset/legend.
- Selected chips expose state with `aria-pressed` as well as color.
- Dynamic calculator text uses `aria-live="polite"`.
- Native buttons for menus and chips; native links for navigation.
- Full FAQ summary row is keyboard operable.
- Respect `prefers-reduced-motion: reduce`.
- Do not rely on color, position, or animation alone for meaning.

## Responsive test matrix

The designer should annotate all of these, and the developer should test them before release.

| Width × height | Required checks |
| --- | --- |
| 320 × 568 | No overflow; CTA readable; menu works; fields stack. |
| 375 × 812 | Mobile hero, CTA, proof card, runtime fields, chips, FAQ. |
| 390 × 844 | Same behavior with no clipped copy or actions. |
| 768 × 1024 | Comfortable tablet spacing and sensible header behavior. |
| 1024 × 768 | Two-column areas only if cards have adequate readable width. |
| 1440 × 900 | Full desktop hero and runtime composition. |

At every viewport verify:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

## Interaction test cases

1. Change `10 hours` to `4 hours`; the demo shows `60%` and the limitation sentence.
2. Change `8 hours` to `2 hours`; the demo shows `75%`.
3. Enter previous runtime `0`; the neutral validation message appears and values remain visible.
4. Enter current runtime larger than previous; the longer-runtime message appears.
5. Toggle each appliance-use chip by mouse, touch, and keyboard.
6. Open mobile navigation, visit a link, and confirm it closes.
7. Open several FAQs; confirm more than one can remain open.
8. Trigger every CTA and confirm the destination is `/safety-check`.
9. Tab through the page. Every focus indicator must be visible and never hidden under the sticky header.
10. Enable reduced motion and verify decorative movement is removed or nearly imperceptible.

## Frontend validation commands

Run these from `frontend/` after implementation:

```powershell
npm run test:run
npm run build
```

The approved prototype passed 9 frontend tests and a production build before this handoff. Repeat both checks after any official design implementation.

## Figma handoff checklist

- [ ] Desktop, tablet, and mobile frames include the full page, not hero-only designs.
- [ ] Component library includes default, hover, focus, pressed, selected, disabled, error, and open states.
- [ ] Measurements are annotated in CSS pixels.
- [ ] Logo variants are named and linked to the official identity folder.
- [ ] Color styles include semantic labels, not only hex codes.
- [ ] Text styles show font, size, weight, line-height, and letter spacing.
- [ ] Section behavior at each breakpoint is documented.
- [ ] Every action is labelled with its route or anchor target.
- [ ] The calculator result is marked as explanatory evidence, not diagnosis.
- [ ] The safety content is visible without a click.

## Release acceptance

The official homepage is ready only when the visual design matches the approved direction, all existing tests and production build pass, no console errors appear, mobile has no horizontal overflow, keyboard behavior works, and the safety route remains the only assessment entry point.

