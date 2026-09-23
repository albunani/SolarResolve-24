# Homepage Wireframe and Component Specification

## Page order

```text
Sticky header
└─ Hero: promise + actions + output preview
Scope strip
Runtime Change Check
How SolarResolve works
Sample assessment result
Trust commitments
Safety stop panel
FAQ and scope limits
Final CTA
Footer
```

This order is intentional: understand the product, try a low-risk useful action, see the output, understand limits, then start safely.

## 1. Sticky header

**Desktop:** logo left; `How it works`, `Safety First`, `Help`; amber `Assess my battery` CTA right.

**Mobile:** logo left; 40 px outlined menu button right. On open, links stack vertically and the CTA becomes full-width. The button label must change between `Open navigation` and `Close navigation` for assistive technology.

## 2. Hero

Two columns at 1024 px and above. Copy comes first. At smaller widths, stack the output preview after the primary action and assurances.

Required elements:

- Eyebrow: `Safety-aware battery-runtime assessment` with amber status dot.
- One H1, using the exact copy deck.
- Main supporting paragraph.
- Primary amber CTA to `/safety-check`.
- Secondary outlined link to `#sample-result`.
- Three assurance points: safety check first, optional photo, decision support not diagnosis.
- Product-output proof card. It shows an example, not live customer data.

## 3. Scope strip

Full-width amber bar immediately under the hero. State exactly what the first release supports: declining battery runtime. Include an anchor link to the scope/FAQ section. It is a boundary, not a banner advertisement.

## 4. Runtime Change Check

This is the useful, lightweight engagement component. It should look like a calculator but never claim a diagnosis.

### Structure

- Section introduction on desktop left / above card on mobile.
- White elevated card.
- Two numeric fields: previous typical runtime and current typical runtime, with visible `hours` unit.
- A clear right-arrow between the fields on desktop; it can disappear on mobile.
- A `fieldset` asking whether night-time appliance use changed.
- Three selectable chips: `Yes, it changed`, `No change`, `I am not sure`.
- Dark result area with a runtime-change percentage and limitation sentence.
- Text link: `Continue with a safety check` to `/safety-check`.

### States

| State | Required behavior |
| --- | --- |
| Initial | Suggested values may appear in the demo; production should not imply these are user data. |
| Valid decline | Display rounded percentage and the reported hours. |
| Current runtime exceeds previous | Say the runtime is longer and ask what changed in the assessment. Do not show a negative percentage. |
| Invalid / missing | Ask for previous runtime above zero and current runtime. Preserve the user's input. |
| Selected appliance answer | Dark-green chip with white label, plus `aria-pressed="true"`. |
| Keyboard focus | Clearly visible blue focus ring. |

The live calculation must be announced through a polite live region. The percentage is evidence of reported change only; it is not battery health, diagnosis, or predicted lifespan.

## 5. Process section

Three steps, horizontally separated at desktop and vertically stacked on mobile:

1. Describe what changed.
2. Organize safe evidence.
3. Take an informed next step.

Use monospaced step numerals and thin dividers. Do not add icons unless they improve understanding.

## 6. Sample assessment

Cream section with explanatory copy and a dark result preview. The preview always separates:

1. What we know.
2. What is missing.
3. What may be happening.
4. Safe next step.

This four-part structure is core product proof. The card must be visually readable as a sample with `Example only` label.

## 7. Trust commitments

Four equally weighted text commitments. They are informational, not clickable cards. Number them `01–04` and use dividers. They must state that facts are separate from possibilities, users can correct evidence, deterministic safety rules come first, and technicians remain the authority.

## 8. Safety panel

The stop condition needs clear visual priority but must not look alarming or decorative. It lists urgent warning signs and includes the existing safety route. The text must remain visible without opening a disclosure.

## 9. FAQ

Use native `details` / `summary` behavior where practical. The full summary row is a tap target. The chevron rotates or changes symbol on open, but the text remains the true state indicator. Multiple FAQ answers may remain open at once.

## 10. Final CTA and footer

End with the same safe primary action, not a different conversion goal. Footer must include truthful support and policy links only. Do not retain placeholders or invented support channels.

## Breakpoints

| Viewport | Expected layout |
| --- | --- |
| 320–639 px | One column; full-width primary buttons; mobile menu; inputs stacked; preview cards full width. |
| 640–979 px | Spacious single-column flow; process may remain stacked; header menu may still collapse if link space is tight. |
| 980–1199 px | Hero and runtime areas may become two columns when copy and cards retain readable widths. |
| 1200 px and above | Full desktop composition with 1280 px content container. |

At every viewport, `document.documentElement.scrollWidth <= window.innerWidth` must be true.

