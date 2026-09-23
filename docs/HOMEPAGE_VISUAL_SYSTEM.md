# Homepage Visual System

## Design intent

SolarResolve should feel calm, careful, premium, and practical. It should feel more like a well-made service record than a sales page or power-monitoring dashboard. Use generous breathing room, short direct copy, and one strong amber action per decision point.

## Color tokens

| Token | Hex | Role |
| --- | --- | --- |
| `--sr-deep-grid` | `#07372B` | Header, hero, dark panels, safety result surfaces. |
| `--sr-grid-green` | `#0B4D3B` | Active states, section labels, links on light surfaces. |
| `--sr-solar-amber` | `#F4B43A` | Primary CTA, key runtime values, restrained emphasis. |
| `--sr-warm-cream` | `#FBF8F3` | Main page background. |
| `--sr-surface` | `#FFFFFF` | Cards, inputs, report surfaces. |
| `--sr-energy-ink` | `#13231D` | Primary text and text on amber. |
| `--sr-market-grey` | `#627069` | Supporting text after contrast check. |
| `--sr-soft-line` | `#D9E2DC` | Borders, dividers, inactive controls. |
| `--sr-dark-muted` | `#B9C8C1` | Supporting text on dark surfaces. |
| `--sr-success-tint` | `#E8F5EE` | Gentle confirmation surface only. |
| `--sr-focus` | `#2867B2` | Keyboard focus ring, used on all backgrounds. |

Use amber sparingly. It carries the user's next action and key data, so it must not become the page background or body-text color. All amber buttons use dark ink text, never white text.

## Typography

| Role | Family | Weight | Notes |
| --- | --- | --- | --- |
| Display headings | `General Sans`, `Source Sans 3`, sans-serif | 600–700 | Tight tracking, sentence case. |
| Body and controls | `Source Sans 3`, system sans-serif | 400–700 | Clear, human, legible. |
| Runtime values and small technical readings | `Geist Mono`, `ui-monospace`, monospace | 500–700 | Data only, never long paragraphs. |
| Hero emphasis | Georgia or approved expressive serif | 400 italic | Only the highlighted phrase in the hero. |

Recommended desktop sizing:

- Hero H1: `clamp(43px, 5.1vw, 74px)`, line-height `0.99`, tracking `-0.055em`.
- Section H2: `clamp(34px, 4vw, 52px)`, line-height `1.02`, tracking `-0.045em`.
- Card H3: `20–23px`, line-height `1.14–1.2`.
- Body: `17–18px`, line-height `1.55–1.6`.
- Eyebrows: `10–12px`, uppercase, 700 weight, `0.1em` tracking.

## Spacing and geometry

Use a 4 px base unit. Main rhythm: `4, 8, 12, 16, 24, 32, 48, 64, 96, 108, 110` px.

- Content max-width: `1280px` with `16px` side padding on mobile and `24px` from tablet upward.
- Section vertical padding: roughly `96–110px` desktop, `64–72px` mobile.
- Button and input minimum height: `44px`; primary action target: `52px`.
- Button/control radius: `8px`.
- Main card radius: `15–16px`.
- Choice-chip radius: `999px`.
- Borders: 1 px `--sr-soft-line` or an intentionally translucent equivalent on dark surfaces.
- Shadows: subtle only. Example card: `0 18px 45px rgba(19,35,29,.08)`.

## Surface recipes

### Header and hero

Dark forest green, warm amber radial glow in the upper-right, thin 40 px grid, and two quiet circular orbit lines. The atmosphere must remain subtle enough that the headline is the first thing users notice.

The header is dark and sticky. At desktop it contains logo, three text links, and amber primary CTA. At mobile it shows logo plus a 40 px menu button. The menu opens as a dark vertical panel below the header.

### Cards

Use white cards on cream pages. The interactive Runtime Change Check has a refined elevated card. The output proof card in the hero uses a translucent dark glass surface. Avoid applying "lift" shadow/movement to informational cards; lift is only for a genuinely selectable or navigational card.

### Safety section

Use a dedicated dark green surface, a clear exclamation symbol, amber eyebrow, white heading, and muted supporting text. This is a stop condition, not a marketing feature. Avoid cheerful illustration or animated elements there.

## Motion

- Hover lift: maximum `translateY(-2px)` for buttons and `-4px` for intentionally interactive cards.
- Duration: `160–200ms`, standard ease.
- No autoplay carousel, auto-counting statistic, video, or major parallax effect.
- When `prefers-reduced-motion: reduce` is enabled, remove nonessential transitions and animation.

## Image and asset direction

No hero photograph is needed for this version. The product-output preview is the primary visual proof. If the designer introduces an illustration, it must be decorative, low contrast, and never compete with the CTA or represent a real diagnosis.

Use the existing official vector logo variants. The designer must choose the correct reversed mark for dark backgrounds and retain accessible `alt="SolarResolve"` text in the implementation.

