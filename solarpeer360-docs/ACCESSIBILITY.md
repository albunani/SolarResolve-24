# Accessibility Requirements

## Target

Meet WCAG 2.2 Level AA for all public pages, waitlist flows, and support content. Accessibility testing must include keyboard use, screen readers, zoom, reflow, high contrast, reduced motion, and touch input.

## Current strengths observed

- The document language is `en-NG`.
- Reviewed pages have one H1 and logical heading order.
- A skip-to-content link is present.
- Keyboard focus rings are visible.
- Mobile navigation exposes expanded and collapsed state.
- Form controls have accessible names.
- Field photographs use descriptive alternative text.
- The 390px layout did not produce horizontal overflow.

These are observations, not a certification.

## Required standards

### Structure

- Use landmarks for header, navigation, main content, and footer.
- Keep heading levels sequential.
- Give each page a unique title and H1.
- Use lists for grouped steps, benefits, FAQs, and navigation.

### Keyboard

- Every interactive element must work without a pointer.
- Focus order follows the visual and reading order.
- Focus must never become trapped in the mobile menu, carousel, or form.
- Skip links become visible on focus.
- Sticky elements must not obscure the focused control.

### Controls

- Minimum target size: 44 by 44 CSS pixels where practical.
- Use radios for one-of-many choices and checkboxes for independent choices.
- Change the pricing presets from toggle-button semantics to a labelled radio group.
- Preserve native semantics instead of recreating inputs with generic containers.

### Forms

- Every field has a persistent label.
- Hints and errors use `aria-describedby` or equivalent relationships.
- Invalid fields expose `aria-invalid="true"` after validation.
- Submission errors receive focus through an error summary.
- Required status is expressed in text and programmatically.
- Consent remains unchecked by default.

### Images and media

- Decorative images use empty alternative text.
- Evidence photographs describe the activity, not unverifiable interpretation.
- The energy-flow diagram includes an accessible text description.
- Carousel position is announced without excessive live-region updates.

### Visual presentation

- Normal text contrast is at least 4.5:1.
- Large text and essential graphical objects meet applicable 3:1 thresholds.
- Content reflows at 400% zoom without two-dimensional scrolling, except necessary diagrams.
- Information does not depend on colour alone.
- Focus indicators remain visible against both forest-green and cream surfaces.

### Motion and timing

- Respect `prefers-reduced-motion`.
- Do not auto-advance field photographs.
- Do not impose a time limit on the waitlist form.

## Test matrix

- Keyboard-only in current Chrome, Edge, Firefox, and Safari
- NVDA with Firefox or Chrome on Windows
- VoiceOver with Safari on iOS and macOS
- TalkBack with Chrome on Android
- 320px viewport and 400% browser zoom
- Windows High Contrast Mode
- Reduced-motion preference

## Release gate

No release may ship with a keyboard trap, inaccessible required field, missing page title/H1, non-dismissible overlay, or critical contrast failure.

## Related documents

See [Components](COMPONENTS.md), [Form specification](FORM_SPECIFICATION.md), and [QA test plan](QA_TEST_PLAN.md).
