# Design System

## Design intent

SolarPeer 360 should feel local, practical, safe, and technically competent. The interface should avoid the visual language of speculative technology products. Real installations, straightforward language, strong contrast, and familiar controls should do most of the trust-building work.

## Foundations

### Colour roles

Observed values from the public website should be treated as the initial tokens:

| Token | Approximate value | Use |
|---|---:|---|
| `color-forest-900` | `#07372B` | Header, hero, footer, high-emphasis surfaces |
| `color-solar-500` | `#F4B43A` | Primary actions, highlights, energy cues |
| `color-ink-900` | `#13231D` | Body text on light surfaces |
| `color-cream-050` | `#FBF8F3` | Page background |
| `color-white` | `#FFFFFF` | Text on dark surfaces and card backgrounds |
| `color-focus-blue` | approximately `#2867B2` | Focus ring on light backgrounds |

Every new colour must define text contrast, interactive states, and dark/light usage. Yellow must not carry meaning without text or an icon.

### Typography

- Primary family: Source Sans 3 with Segoe UI, Roboto, Arial, and sans-serif fallbacks.
- Default body size: 17px with approximately 1.6 line height.
- Desktop H1 baseline: 60px/69px, bold.
- Use sentence case for headings and buttons.
- Keep paragraph width near 60–72 characters.
- Avoid light font weights for essential information.

### Spacing

Use an 8px base grid with 4px available for compact internal alignment.

| Token | Value | Typical use |
|---|---:|---|
| `space-1` | 4px | Icon adjustments |
| `space-2` | 8px | Tight label gaps |
| `space-3` | 12px | Compact component padding |
| `space-4` | 16px | Default gaps |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section subgroups |
| `space-12` | 48px | Mobile section separation |
| `space-16` | 64px | Desktop section separation |

## Layout

- Use one centered content container with consistent gutters.
- Keep primary reading content narrower than data or card grids.
- Desktop hero: two-column copy and image composition.
- Mobile hero: image first, then proposition and CTAs.
- Prefer two or three cards per desktop row and one card per mobile row.
- Prevent horizontal overflow at 320px and above.

## Components and states

All interactive components require default, hover, active, focus-visible, disabled, loading, success, and error states where relevant. Minimum target size is 44 by 44 CSS pixels. Buttons should use verbs and preserve one dominant action per region.

## Imagery

- Prefer dated, captioned field photography.
- Label AI illustrations explicitly and never use them as evidence.
- Use empty alternative text for purely decorative images.
- Use descriptive alternative text when an image communicates field activity or a process.
- Avoid stock imagery that implies a SolarPeer deployment or customer relationship.

## Motion

Motion should explain state changes, not decorate the page. Keep transitions below 250ms for menus, disclosure panels, calculator updates, and form feedback. Respect `prefers-reduced-motion`.

## Responsive breakpoints

Treat 375px, 768px, and 1280px as required test widths, not device assumptions. Components should respond to available space rather than device names.

## Related documents

See [Brand guidelines](BRAND_GUIDELINES.md), [Components](COMPONENTS.md), [UX guidelines](UX_GUIDELINES.md), and [Accessibility](ACCESSIBILITY.md).
