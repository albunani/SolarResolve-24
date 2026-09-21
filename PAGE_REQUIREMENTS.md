# Aspiring Founder Profile & Venture Introduction Page

## Document status

- **Page title:** My Startup Pitch
- **Page type:** Single-page founder profile and venture introduction
- **Working venture name:** SolarResolve
- **Version:** 1.0
- **Last updated:** 2026-09-21
- **Status:** Ready for implementation

## 1. Purpose

Create a concise, polished landing page that introduces the aspiring founder and presents the venture's problem and solution clearly. The page should give a visitor enough context to understand the founder's focus, recognize the customer problem, understand the proposed solution, and contact the founder by email.

## 2. Audience

The page is intended for:

- challenge judges;
- potential users and early adopters;
- mentors and programme facilitators;
- potential collaborators; and
- clean-energy or AI ecosystem stakeholders.

## 3. Page structure

The page must contain one main content column with three vertical sections: top, middle, and bottom.

### 3.1 Top — Founder introduction

Display the following content above the fold where practical:

1. Page title: **My Startup Pitch**
2. Founder name
3. One-line founder bio
4. Three core domain tags

#### Required content

- **Founder name:** `[Founder Name]`
- **One-line bio:** `A Mechatronics Engineering student building responsible AI solutions for practical clean-energy challenges in Nigeria.`
- **Domain tags:**
  - `Mechatronics`
  - `AI / Machine Learning`
  - `Clean Energy`

The founder name remains a content placeholder until the actual name is supplied. It must be easy to replace from one clearly identified location in the implementation.

#### Presentation requirements

- The title must be the page's primary heading (`h1`).
- The founder name must be visually prominent but subordinate to the page title.
- The bio must remain easy to scan and should not exceed two lines on a typical desktop viewport.
- Tags must look interactive or badge-like without misleading users into thinking they are clickable.
- Tags may wrap cleanly on narrow screens.

### 3.2 Middle — Venture introduction

Display exactly two primary content cards:

#### Card 1 — Problem

**Heading:** `The Problem`

**Required message:**

> Many Nigerian solar owners cannot independently understand why battery performance declines or whether a proposed diagnosis is credible. Fragmented technical information and conflicting advice can lead to unsafe actions, unnecessary repairs, avoidable replacements, and wasted money.

#### Card 2 — Solution

**Heading:** `The Solution`

**Required message:**

> SolarResolve turns user descriptions and solar-system evidence into a structured assessment. It identifies plausible cause categories, communicates uncertainty, recommends safe next steps, and creates a technician-ready brief—without pretending to replace a qualified professional.

#### Card layout

- On desktop, display the two cards side by side with equal visual weight.
- On mobile, stack the cards vertically in the order **Problem → Solution**.
- Cards must use consistent padding, border radius, border treatment, and heading alignment.
- Card height may match on desktop when content allows, but content must never be clipped to force equal height.
- Each card must remain readable without hover interaction.
- Optional restrained icons may distinguish the cards, but the cards must not depend on icons for meaning.

### 3.3 Bottom — Contact call to action

Display a clear closing prompt and an interactive email button.

#### Required content

- **CTA heading:** `Interested in the venture?`
- **Supporting text:** `Let's discuss the idea, potential collaboration, or early feedback.`
- **Button label:** `Contact Me by Email`
- **Button behavior:** Open the visitor's default email application using a `mailto:` link.
- **Suggested subject:** `SolarResolve Venture Introduction`

The destination email address remains `[founder-email@example.com]` until the actual contact address is supplied. The placeholder must not be used in a public production deployment.

#### Interaction requirements

- The entire visible button surface must be clickable.
- The button must provide visible hover, keyboard-focus, and pressed states.
- The button must be reachable and operable using a keyboard.
- The focus indicator must have strong contrast and must not be removed.
- The link must use a real `mailto:` target rather than a non-functional button.

## 4. Visual design requirements

### 4.1 Theme

Use a modern dark-mode visual system.

Recommended design characteristics:

- deep charcoal or near-black page background rather than pure black;
- slightly lighter elevated card surfaces;
- high-contrast off-white primary text;
- muted cool-grey secondary text;
- one restrained accent color associated with energy, trust, or technology;
- subtle borders instead of heavy drop shadows;
- generous negative space;
- minimal ornamentation; and
- no gradients unless they are subtle and improve hierarchy rather than decoration.

The design should feel credible, technically confident, and founder-led. Avoid excessive glow effects, animated backgrounds, generic AI imagery, neon overload, and crowded dashboard styling.

### 4.2 Typography

- Use **Pretendard** as the primary font family.
- Provide a sensible system sans-serif fallback.
- Use no more than four clearly differentiated text styles: display/title, section or card heading, body, and metadata/tag.
- Body text must maintain a comfortable line height and readable line length.
- Font loading must not block access to the page content.

Suggested stack:

```css
font-family: "Pretendard", "Inter", system-ui, -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### 4.3 Responsive layout

- Design mobile first.
- Use a centered content container with a comfortable maximum width on desktop.
- Do not allow horizontal page scrolling at supported widths.
- Page gutters must shrink appropriately on small screens.
- Cards must switch from one column on mobile to two columns on wider screens.
- Text and spacing may scale fluidly, but they must remain within readable limits.
- The email CTA should be full width on narrow mobile screens and content width on larger screens.

### 4.4 Motion

Motion is optional. If used:

- keep it subtle and brief;
- never delay access to content;
- use motion primarily for interaction feedback; and
- respect the user's `prefers-reduced-motion` setting.

## 5. Content hierarchy

The recommended semantic outline is:

```text
main
├── header / founder introduction
│   ├── h1: My Startup Pitch
│   ├── founder name
│   ├── one-line bio
│   └── domain tag list
├── section / venture introduction
│   ├── article / The Problem
│   └── article / The Solution
└── section / contact CTA
    ├── CTA heading
    ├── supporting text
    └── email link styled as a button
```

Use semantic HTML elements rather than generic containers wherever practical.

## 6. Accessibility requirements

- Use one clear `h1` and a logical heading hierarchy.
- Maintain at least WCAG AA color contrast for text and essential controls.
- Do not communicate meaning through color alone.
- Ensure all interactive states are visible in dark mode.
- Provide a descriptive accessible name for the email link.
- Ensure the page is navigable at 200% browser zoom without loss of content or functionality.
- Use real text rather than text embedded in images.
- Decorative icons must be hidden from assistive technology.
- Interactive elements must have an adequate touch target, preferably at least 44 by 44 CSS pixels.

## 7. Performance requirements

- The page should contain no unnecessary JavaScript.
- Optimize font delivery and avoid loading unused font weights.
- Do not include large background images or videos.
- Avoid layout shifts during font loading.
- The page should remain usable if the custom font fails to load.

## 8. Content configuration

The following values must be straightforward to update without restructuring the page:

- founder name;
- founder bio;
- three domain tags;
- venture name;
- problem statement;
- solution statement;
- contact email address; and
- email subject line.

If a component framework is used, store these values in a small content object or equivalent single source of truth.

## 9. Out of scope

The base page does not require:

- authentication;
- a contact form or backend email service;
- project dashboards;
- AI assessment functionality;
- database integration;
- founder photograph;
- social-media feeds;
- testimonials;
- pricing;
- multiple routes; or
- a light-mode theme.

These may be introduced later only if project scope changes.

## 10. Viewport expectations

The implementation must be checked at minimum at:

- **Mobile:** 320 px and 390 px wide
- **Tablet:** 768 px wide
- **Desktop:** 1280 px and 1440 px wide

At each width:

- all content must remain visible;
- no horizontal scrollbar may appear;
- tags must wrap without overlap;
- cards must not collide or clip content;
- the CTA must remain prominent and operable; and
- typography must remain readable.

## 11. Definition of Done

The page is complete when:

- [ ] The browser/page title and visible `h1` identify the experience as **My Startup Pitch**.
- [ ] The top section displays the founder name, one-line bio, and exactly three core domain tags.
- [ ] The middle section displays exactly two primary cards: **The Problem** and **The Solution**.
- [ ] Both cards render cleanly with consistent styling and no clipped or overflowing content.
- [ ] The cards stack on mobile and display side by side on desktop.
- [ ] The bottom section includes a working `mailto:` CTA labelled **Contact Me by Email**.
- [ ] The CTA has visible default, hover, keyboard-focus, and pressed states.
- [ ] The page uses a modern dark-mode theme.
- [ ] Pretendard is the primary font, with a working fallback stack.
- [ ] The page has no horizontal overflow at 320, 390, 768, 1280, or 1440 px widths.
- [ ] All content and controls remain usable at 200% zoom.
- [ ] Text and interactive controls meet WCAG AA contrast requirements.
- [ ] Keyboard navigation reaches and activates the email CTA.
- [ ] Reduced-motion preferences are respected if motion is present.
- [ ] The implementation introduces no unnecessary backend, database, or authentication dependency.
- [ ] The actual founder name and email replace their placeholders before public deployment.

