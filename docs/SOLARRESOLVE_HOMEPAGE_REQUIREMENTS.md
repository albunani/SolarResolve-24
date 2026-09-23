# SolarResolve Homepage and Landing Page Requirements

**Status:** Implementation-ready product, content, UX, accessibility, and measurement specification  
**Priority:** Submission-critical  
**Last reviewed:** 23 September 2026  
**Product scope:** Safety-aware decision support for declining solar-battery runtime in Nigeria

## 1. Executive recommendation

The SolarResolve homepage should behave like the first useful step of the product, not like a brochure.

Within the first screen, a visitor must understand:

1. SolarResolve helps people organize evidence about a battery that no longer lasts as long as it used to.
2. It provides decision support, not a confirmed electrical diagnosis.
3. Urgent hazards require distance and professional help, not online troubleshooting.
4. The next step is a guided, safety-first assessment.

The page should then earn trust and invite participation through a small **Runtime Change Check**. This check may calculate the percentage drop between previous and current runtime and help the user identify whether appliance use changed. It must not name a failed component or claim to diagnose the system. Its result should lead into the existing safety screen and assessment flow.

The recommended homepage sequence is:

```text
Header
  -> Hero and primary action
  -> Supported-scenario strip
  -> Runtime Change Check
  -> Product output preview
  -> Three-step process
  -> Trust and evidence standards
  -> Safety boundary
  -> Who it helps
  -> Frequently asked questions
  -> Final action
  -> Footer, policies, and contact
```

This order gives visitors value early, proves what the product produces, and repeats the primary action only after answering the questions that may prevent them from starting.

## 2. Research basis

This specification combines the current SolarResolve requirements and implementation with current guidance from accessibility, web performance, search, consumer protection, trustworthy AI, credibility, content design, and solar-safety sources.

### 2.1 Local product evidence reviewed

- `README.md`
- `PROJECT_CONCEPT.md`
- `requirement.md`
- `docs/SAFETY_POLICY.md`
- `docs/TECHNICAL_DESIGN.md`
- `docs/SOLARRESOLVE_UI_UX_IMPROVEMENT_PLAN.md`
- `frontend/src/App.tsx`
- `frontend/src/screens/LandingScreen.tsx`
- `frontend/src/screens/HelpScreen.tsx`
- `frontend/src/components/Navigation.tsx`
- `frontend/src/App.test.tsx`

### 2.2 External research findings

- A homepage must communicate where users are, what the organization does, and what users can do there at a glance. It should also make its most important navigation choices obvious. [Nielsen Norman Group homepage guidance](https://www.nngroup.com/articles/113-design-guidelines-homepage-usability/)
- Credibility improves when claims can be verified, real people or organizations are visible, contact details are easy to find, the design is appropriate and consistent, and errors are absent. [Stanford Web Credibility Project](https://credibility.stanford.edu/guidelines/)
- WCAG 2.2 Level AA requires, among other criteria, meaningful structure, visible focus, 4.5:1 minimum contrast for normal text, reflow without two-dimensional scrolling at 320 CSS pixels, and minimum pointer targets of 24 by 24 CSS pixels, with exceptions. SolarResolve should use 44 by 44 CSS pixels as its product target for primary controls. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- Accessible forms should be short, request only necessary information, use labels, group related controls, provide instructions and correction paths, and show progress across multiple steps. [W3C Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/)
- A good real-world performance target at the 75th percentile is LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1. [web.dev Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)
- Search visibility begins with helpful, reliable, people-first content, descriptive titles and headings, crawlable links, useful link text, and understandable image alternatives. [Google Search Essentials](https://developers.google.com/search/docs/essentials) and [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- Trustworthy AI should be valid and reliable, safe, accountable and transparent, explainable, privacy-enhanced, and subject to risk management and human oversight. [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- Interfaces should not hide material limitations, use false urgency, trick people into sharing data, or impair user choice. [FTC dark-pattern guidance](https://www.ftc.gov/reports/bringing-dark-patterns-light)
- Solar tools can support an initial estimate, but a qualified installer or technician remains necessary for system-specific evaluation and physical work. [US Department of Energy Homeowner's Guide to Solar](https://www.energy.gov/cmei/systems/homeowners-guide-solar)
- In Nigeria, NEMSA enforces technical standards, inspection, testing, and certification for electrical installations. This supports SolarResolve's boundary between online decision support and qualified physical inspection. [NEMSA](https://nemsa.gov.ng/)
- Nigerian consumers have formal rights and complaint channels. The homepage should be honest about the service, its limitations, its operator, and how to contact support. [FCCPC consumer information](https://fccpc.gov.ng/consumers/)

## 3. The homepage's job

The homepage has five jobs, in this order:

1. **Orient:** Identify the supported problem and the intended user.
2. **Protect:** Surface urgent stop conditions before any interactive diagnosis-like experience.
3. **Demonstrate:** Show what evidence is collected and what the user receives.
4. **Build trust:** Explain limitations, evidence handling, AI use, and professional escalation.
5. **Convert:** Move an appropriate user into the safety check and assessment.

The homepage is successful when the right user starts with correct expectations and the wrong or unsafe use case is redirected clearly.

## 4. Users and their homepage questions

### 4.1 Primary user: system owner

Typical thought: "My battery used to last until morning, but now it shuts down early. What should I do before paying for a replacement?"

Questions the homepage must answer:

- Is this tool for my problem?
- Is it safe to continue?
- What information will I need?
- What will I receive?
- Will it tell me the truth when it is uncertain?
- Is this a diagnosis or a replacement for a technician?
- What happens to my text and photo?
- How long will the assessment take?

### 4.2 Secondary user: technician

Typical thought: "Will this help my customer give me useful information before a visit?"

Questions the homepage should answer:

- What is included in the technician brief?
- Are facts separated from possibilities?
- Are unsafe instructions excluded?
- Can the customer correct the evidence before generation?

### 4.3 Out-of-scope visitors

The page must redirect or set expectations for visitors seeking:

- a purchase-quote comparison;
- system sizing or installation design;
- a confirmed remote diagnosis;
- instructions to open, disconnect, probe, or repair equipment;
- a marketplace, installer recommendation, or dispute decision; or
- support for every solar fault or battery chemistry.

## 5. Requirements by priority

### 5.1 Must have before submission

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| M01 | Clear value proposition | The hero names declining battery runtime and the useful outcome without jargon. |
| M02 | Scope boundary | The first screen states "decision support, not a confirmed diagnosis." |
| M03 | Primary action | "Assess my battery-runtime problem" or a meaning-equivalent label is visible without scrolling on common mobile and desktop sizes. |
| M04 | Safety warning | Smoke, fire, severe heat, swelling, leaking, hissing, sparks, exposed wiring, shock, and water ingress are represented in a concise stop message. |
| M05 | Supported scenario | Visitors can tell that version 0.1 supports declining battery runtime. |
| M06 | What the user receives | The page previews a structured assessment and technician-ready brief. |
| M07 | How it works | Three steps explain describe, organize evidence, and receive an assessment. |
| M08 | Product transparency | The page explains what AI does, what deterministic safety rules do, and what the tool cannot determine remotely. |
| M09 | Privacy preview | The page links to privacy information and explains whether photos are optional and how data is handled. |
| M10 | Real operator/contact | About and contact routes contain real project information. No placeholder contact information remains. |
| M11 | Mobile reflow | No horizontal page scrolling at 320, 375, 390, 768, 1024, or 1440 CSS pixels. |
| M12 | Accessible operation | Keyboard navigation, visible focus, semantic headings and landmarks, labelled controls, adequate contrast, and understandable link text pass manual checks. |
| M13 | Fast rendering | The page targets good Core Web Vitals and does not make the hero image the only carrier of meaning. |
| M14 | Honest proof | No invented deployment count, testimonial, success rate, partner logo, certification, or usage counter. |
| M15 | Working routes | Every visible header, footer, CTA, About, Help, and policy link resolves to the intended page. |
| M16 | Resilient start | The primary CTA always enters the safety check before evidence intake. |

### 5.2 Should have immediately after the submission baseline

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| S01 | Runtime Change Check | Users can enter previous and current runtime and receive a transparent percentage-change calculation with no diagnosis. |
| S02 | Appliance change prompt | Users can select common appliances or state that load did not change, then carry the choices into intake if feasible. |
| S03 | Sample result | A synthetic, clearly labelled example shows facts, possibilities, missing evidence, safe next steps, and the technician brief. |
| S04 | FAQ accordions | Six to eight high-value questions use semantic disclosure controls and remain usable by keyboard. |
| S05 | Time and effort preview | The page tells users the approximate number of steps and that a photo is optional. |
| S06 | Resume protection | If assessment state exists locally, the homepage offers "Continue assessment" and "Start again" without hiding either choice. |
| S07 | Feedback channel | Users can report a problem or say whether the explanation was useful without creating an account. |
| S08 | Privacy-conscious analytics | Key events are measured without recording problem descriptions, photo contents, or electrical readings as analytics properties. |
| S09 | Search and sharing metadata | Unique title, description, canonical URL, Open Graph image, favicon, and `WebSite` or `Organization` structured data are present where truthful. |

### 5.3 Could have later

| ID | Enhancement | Guardrail |
| --- | --- | --- |
| C01 | Guided sample case | Use synthetic data and label it prominently as an example. |
| C02 | Local-language support | Translate reviewed safety and product content with human validation. Do not machine-translate emergency instructions without review. |
| C03 | Educational library | Publish only source-backed content that supports the product's narrow problem domain. |
| C04 | Anonymous outcome follow-up | Ask whether the eventual technician finding was helpful only with explicit consent and minimal data collection. |
| C05 | Installation-record checklist | Help users gather warranty, model, age, and installer details without implying certification or validation. |

## 6. Recommended information architecture and copy

### 6.1 Sticky header

**Required content**

- SolarResolve logo linked to `/`
- How it works
- Safety
- About
- Help
- Primary action: **Assess my battery**

**Behavior**

- The header may use a dark translucent surface with a restrained blur.
- Desktop navigation remains visible.
- Mobile navigation collapses into an accessible menu button with an accurate expanded state, focus management, Escape support, and no overlap with the logo.
- Do not display more than five top-level destinations before the primary action.
- Add a skip link to the main content.

### 6.2 Hero

**Eyebrow**

> Safety-aware battery-runtime assessment

**Recommended headline**

> Your solar battery does not last like it used to. Turn what changed into a clearer next step.

**Recommended support copy**

> SolarResolve helps you organize runtime, appliance, system, and optional display evidence into a structured assessment and technician-ready brief. It provides decision support, not a confirmed electrical diagnosis.

**Primary action**

> Assess my battery-runtime problem

**Secondary action**

> See a sample assessment

**Micro-assurance near the action**

> Starts with a safety check. No account required. Photo optional.

Only use "no account required" and any time estimate after confirming those statements against the released flow.

**Visual**

Use a real product-result preview or a restrained technical illustration. A large logo is not sufficient proof of product value. The visual must remain secondary to the message and must not delay the primary content.

### 6.3 Supported-scenario strip

> **Currently supported:** declining battery runtime, such as a battery that used to last until morning but now shuts down much earlier.

Include a secondary link: **See what SolarResolve does not cover**.

### 6.4 Runtime Change Check

This is the recommended engagement feature because it creates useful activity without pretending to diagnose equipment.

**Inputs**

- Previous typical runtime in hours
- Current typical runtime in hours
- Optional quick choices: "My night-time appliances changed", "My night-time appliances did not change", or "I am not sure"

**Calculation**

```text
runtime drop % = ((previous runtime - current runtime) / previous runtime) * 100
```

Only calculate when previous runtime is greater than zero and current runtime is not greater than previous runtime. If runtime improved or values are incomplete, explain that no decline can be calculated and let the user continue.

**Result example**

> Your reported runtime changed from 10 hours to 4 hours, a 60% decrease. That change is useful evidence, but it does not identify the cause by itself.

**Next action**

> Continue with these details

The action must enter the safety check first. If pre-filling the full intake would create risk or implementation delay, keep this widget as a local preview and ask the user to confirm the values again during intake.

**Do not**

- assign battery health percentages;
- state that the battery is bad;
- estimate repair or replacement cost;
- recommend opening or measuring equipment;
- use a red danger result for a runtime percentage alone; or
- block the main assessment if the user does not know the numbers.

### 6.5 Product output preview

Show a static, synthetic preview of the actual result structure:

- **What we know:** "Runtime changed from about 10 hours to 4 hours."
- **What is missing:** "Battery age and charging indication were not provided."
- **What may be happening:** "Load, charging, battery condition, or configuration could contribute."
- **Safe next step:** "Collect the model label and recent display reading if safely visible."
- **Technician brief:** A concise copyable summary.

Label the preview **Example only**. Do not present fake confidence percentages.

### 6.6 How it works

Use three visible steps:

1. **Describe what changed**  
   Tell SolarResolve how runtime used to compare with now.
2. **Organize safe evidence**  
   Add known system details, appliance changes, and an optional photo of a safely visible display.
3. **Receive an informed next step**  
   Review facts, missing information, plausible cause categories, safe actions, and a technician-ready brief.

Each card must be visually stable. If the cards are not links, they must not use hover styling that implies clickability.

### 6.7 Trust and evidence standards

Use a heading such as **Built to clarify uncertainty, not hide it**.

Show four verifiable commitments:

- **Facts stay separate from possibilities.** User-provided observations are not rewritten as confirmed faults.
- **You confirm the evidence.** Users can review and correct collected information before generation.
- **Safety rules do not depend on AI.** Urgent hazards stop the normal assessment through deterministic rules.
- **A technician remains the authority for physical diagnosis and repair.**

Add two disclosure panels:

**What AI helps with**

- structuring a natural-language description;
- identifying missing information;
- choosing relevant follow-up questions; and
- drafting a clear evidence-based assessment and brief.

**What AI does not do**

- inspect the physical system;
- confirm a failed component;
- replace electrical measurements or professional judgement;
- override urgent safety rules; or
- guarantee a repair outcome.

### 6.8 Safety boundary

This section must be visible without opening an accordion.

**Recommended heading**

> Stop if there is an immediate hazard

**Recommended copy**

> If you see smoke, fire, severe or unusual heat, battery swelling or leaking, hissing, sparks, exposed wires, signs of electric shock, or water entering electrical equipment, keep a safe distance and contact qualified help. Do not touch, open, disconnect, or attempt to repair the equipment.

**Action**

> Read the safety guidance

Never place the stop conditions only in a footer, tooltip, modal, or collapsed disclosure.

### 6.9 Audience section

Keep this section brief and factual.

**For solar owners**

> Turn scattered observations into a clearer record before you approve a repair or replacement.

**For technicians**

> Receive a customer-prepared brief that separates reported facts, changes, missing evidence, and questions for physical inspection.

Do not promise load calculations unless the released result contains them.

### 6.10 FAQ

Include these questions:

1. Is SolarResolve a replacement for a technician?
2. What kinds of solar problems does it currently support?
3. What should I do if I see smoke, swelling, sparks, or severe heat?
4. Do I need to know my battery or inverter model?
5. Is a photo required?
6. What does SolarResolve do with my information?
7. How does SolarResolve use AI?
8. What will the technician brief contain?

Use native `<details>` and `<summary>` where practical. The entire question row must be clickable, the open state must be visible, and the interface must not automatically close a different answer.

### 6.11 Final action

**Heading**

> Give your technician a clearer starting point.

**Copy**

> Start with a safety check, then organize the observations you already have.

**Action**

> Assess my battery-runtime problem

### 6.12 Footer

The footer must contain:

- one-sentence product description;
- About;
- Help and contact;
- Safety policy;
- Privacy notice;
- Terms or service limitations if used;
- accessibility statement when available;
- project or operator identity;
- copyright and review year; and
- a statement that SolarResolve does not replace a qualified solar or electrical professional.

Do not publish a fabricated support email or social account.

## 7. Content standards

### 7.1 Voice

SolarResolve should sound calm, direct, locally understandable, and technically honest.

Use:

- "what may be happening";
- "based on the information you provided";
- "if safely visible";
- "qualified solar or electrical professional";
- concrete examples of the supported scenario; and
- short sentences with the important information first.

Avoid:

- "AI-powered diagnosis";
- "know exactly what is wrong";
- "save money guaranteed";
- "your battery is bad";
- unexplained terms such as SoC, DoD, BMS, PV, or kWh;
- fear-heavy copy; and
- generic claims such as "revolutionary," "smart," or "best-in-class."

### 7.2 Claim policy

Every numerical or authority claim needs a source or internal measurement. Until evidence exists, do not publish:

- customers helped;
- deployments completed;
- diagnostic accuracy;
- money saved;
- assessment success rate;
- partner or regulator endorsement; or
- certification claims.

Replace unsupported social proof with product proof: a real screen, transparent process, limitations, source links, and a sample result.

### 7.3 Reading and hierarchy

- Use one descriptive `<h1>`.
- Use sentence-case headings.
- Keep paragraphs short and front-load key information.
- Prefer lists for conditions or evidence types.
- Keep the main body measure near 60 to 75 characters per line.
- Do not hide essential scope, privacy, or safety information in tooltips.

## 8. Engagement and activity strategy

### 8.1 Definition of healthy engagement

Healthy engagement means the user does one or more useful actions that improve understanding or evidence quality. It does not mean maximizing time on page.

Good engagement events include:

- completing the Runtime Change Check;
- opening the sample assessment;
- reading the AI-use disclosure;
- expanding a relevant FAQ;
- starting the safety check;
- returning to a saved assessment; and
- copying a completed technician brief.

### 8.2 Recommended interactive elements

1. Runtime Change Check
2. Appliance/load-change quick choices
3. Sample result tabs or sections
4. AI-use disclosures
5. FAQ disclosures
6. Continue-existing-assessment prompt

### 8.3 Engagement patterns to reject

- autoplay video or audio;
- auto-advancing carousels;
- fake live-user counters;
- countdown timers or false scarcity;
- forced email capture before showing value;
- a chatbot that competes with the guided flow;
- celebration animation on safety screens;
- motion that cannot be reduced;
- preselected consent; and
- notifications or pop-ups before the user has taken an action.

These patterns can distract from the supported task, increase cognitive load, or impair informed choice.

## 9. Visual and interaction system

Use the approved SolarResolve direction:

| Token | Role |
| --- | --- |
| `#07372b` | Hero, header, dark result surfaces |
| `#0b4d3b` | Primary green and active states |
| `#f4b43a` | CTA accent and limited data emphasis |
| `#fbf8f3` | Warm page background |
| `#ffffff` | Cards and form surfaces |
| `#13231d` | Primary body text |
| `#627069` | Muted text after contrast verification |
| `#d9e2dc` | Borders and separators |

Rules:

- Use amber for emphasis, not for long body text on cream or white.
- Use green plus text or icons for positive states; never color alone.
- Keep card radius and shadows consistent.
- Reserve lift motion for genuinely clickable cards.
- Keep hover movement to 4 pixels or less.
- Respect `prefers-reduced-motion` and remove nonessential transitions.
- Use a monospaced font only for data values, identifiers, and technical readings.
- Do not use decorative energy-flow animation above the main action.

## 10. Accessibility requirements

Target WCAG 2.2 Level AA across the complete homepage and assessment-start process.

### 10.1 Structure and navigation

- Include `header`, `nav`, `main`, sections with meaningful headings, and `footer` landmarks.
- Provide a visible-on-focus skip link.
- Keep one `<h1>` and a logical heading hierarchy.
- Use meaningful link labels. Avoid repeated "Learn more" links without context.
- Ensure keyboard focus follows the visual order.
- Ensure the sticky header never hides focused content.

### 10.2 Color and focus

- Normal text contrast: at least 4.5:1.
- Large text and essential graphical objects: at least 3:1 where WCAG permits.
- Controls and focus indicators must remain visible on both dark and light surfaces.
- Do not remove browser focus outlines without a stronger replacement.

### 10.3 Controls and forms

- Use 44 by 44 CSS pixels as the SolarResolve target size for primary controls.
- Associate every input with a visible label.
- Do not use placeholder text as the only label.
- Use `<fieldset>` and `<legend>` for related radio or checkbox choices.
- Connect instructions and errors with `aria-describedby` where needed.
- Announce dynamic calculation results through a polite live region.
- Never require drag gestures; provide buttons or fields for equivalent operation.
- Preserve user input after validation errors.

### 10.4 Motion and media

- No flashing content.
- Pause controls are required for any moving content that starts automatically, though autoplay should be avoided.
- Reduced-motion preferences must disable pulsing, parallax, animated counters, and nonessential transforms.
- Images need useful alternatives; decorative images use empty alternative text.

### 10.5 Reflow and zoom

- No loss of content or function at a 320 CSS pixel width.
- No horizontal page scrolling at the target viewport sizes.
- Text must remain usable at 200% zoom and with user text-spacing overrides.
- CTA words must not be forced into broken vertical stacks.

## 11. Performance requirements

### 11.1 Field targets

At the 75th percentile:

- LCP: 2.5 seconds or faster
- INP: 200 milliseconds or faster
- CLS: 0.1 or lower

### 11.2 Implementation budget

- Initial compressed JavaScript target: 170 KB or less where practical.
- Initial compressed CSS target: 35 KB or less where practical.
- Hero media: AVIF or WebP with explicit dimensions and responsive `srcset`.
- No homepage video in the initial release.
- Self-host or efficiently load only the font weights used.
- Preload only the single critical font or hero resource that measurement proves necessary.
- Lazy-load below-the-fold media.
- Avoid third-party scripts before the first interaction.
- Prevent layout shift by reserving media and disclosure space appropriately.

Budgets are engineering targets, not standards. Core Web Vitals field data determines actual performance.

## 12. Search, sharing, and information architecture

### 12.1 Recommended metadata

**Title**

> SolarResolve | Understand Declining Solar Battery Runtime

**Description**

> Organize battery-runtime changes, appliance use, system details, and optional display evidence into a safety-aware solar assessment and technician-ready brief.

**Main heading**

> Your solar battery does not last like it used to. Turn what changed into a clearer next step.

### 12.2 Technical requirements

- Set a canonical production URL.
- Add Open Graph and social-sharing metadata.
- Use a meaningful share image that represents the product, not only the logo.
- Keep navigation links as crawlable anchors.
- Include a sitemap and valid robots policy for production.
- Add truthful `Organization` and `WebSite` JSON-LD. Do not invent address, founders, ratings, or social profiles.
- Give About, Help, Safety, and Privacy unique titles and descriptions.
- Use the words users actually use, such as "solar battery drains quickly" and "battery no longer lasts overnight," while keeping the content natural.

### 12.3 Content opportunities after launch

Create source-backed pages for real user questions, not keyword volume alone:

- What information to gather when solar battery runtime drops
- What a technician needs to know before a battery inspection
- Difference between an online assessment and an electrical diagnosis
- Urgent solar-battery warning signs
- How appliance changes affect reported runtime

Each page must link into the appropriate SolarResolve flow and cite authoritative sources.

## 13. Trust, safety, privacy, and AI transparency

### 13.1 Trust proof hierarchy

Use proof in this order:

1. Product output preview
2. Clear process
3. Safety and scope boundaries
4. Evidence and correction controls
5. Real organization and contact details
6. Source citations and review dates
7. Verified pilot feedback, only when permission and evidence exist

### 13.2 Privacy promise

Before requesting any data, state:

- which information is required;
- that a photo is optional if that remains true;
- whether data or images are stored;
- the retention period or deletion rule;
- whether an external AI provider processes the information;
- that users should not upload personal documents or unrelated identifying information; and
- how to request deletion or contact the operator.

Do not compress these facts into unreadable legal text or require consent through a preselected box.

### 13.3 AI transparency promise

The homepage should link to a plain-language explanation covering:

- what parts of the assessment use AI;
- what rules are deterministic;
- what evidence the model receives;
- known limitations;
- why outputs may contain uncertainty;
- how users correct evidence;
- why a technician remains necessary; and
- how feedback and errors are handled.

### 13.4 Safety routing

Every start action must lead to deterministic hazard screening before ordinary intake. A runtime calculator result must never bypass this route.

## 14. Analytics and success measurement

### 14.1 North-star behavior

The homepage should increase **qualified assessment starts**, not raw clicks or time on page.

### 14.2 Funnel events

| Event | Meaning | Allowed properties |
| --- | --- | --- |
| `homepage_view` | Homepage rendered | viewport group, referrer category, campaign ID |
| `runtime_check_started` | User focused or changed the first runtime field | viewport group |
| `runtime_check_completed` | Valid comparison was produced | decline bucket only, not exact values |
| `sample_assessment_opened` | Product proof was viewed | source section |
| `ai_disclosure_opened` | AI transparency was requested | panel name |
| `faq_opened` | A question was expanded | stable FAQ ID |
| `assessment_cta_clicked` | User selected a start action | CTA location |
| `safety_check_viewed` | Safety route loaded | source CTA location |
| `assessment_started` | A valid safety state permitted intake | no hazard details in analytics |

Never place free-text problem descriptions, exact battery readings, photo names, image contents, contact details, or hazard selections into general analytics tools.

### 14.3 Initial indicators

- Percentage of homepage visitors who reach the safety check
- Percentage of Runtime Change Check users who continue
- Percentage of safety-check visitors who begin eligible intake
- Assessment completion rate
- Return rate for saved assessments
- Help, privacy, and safety content usage
- Error rate by step
- Core Web Vitals by device class

Do not optimize away safety or disclosures merely because they reduce the headline conversion rate.

## 15. Responsive behavior

### 15.1 Mobile first

- Stack the hero into one column.
- Put the message and primary action before the visual.
- Make primary actions full-width when space is constrained.
- Collapse navigation without hiding the primary action.
- Render all interactive checks in a single column.
- Keep result values readable without horizontal scrolling.
- Avoid two-column audience cards below the tablet breakpoint.

### 15.2 Required viewport checks

Test at:

- 320 x 568
- 375 x 812
- 390 x 844
- 768 x 1024
- 1024 x 768
- 1440 x 900

At every size:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

must be true, excluding intentional, independently scrollable data regions that have an accessible alternative.

## 16. Error, empty, loading, and offline states

The homepage and interactive preview must define:

- empty input state;
- invalid or impossible runtime values;
- current runtime greater than previous runtime;
- unavailable JavaScript calculation;
- failed route navigation;
- slow connection;
- offline state; and
- existing incomplete assessment.

Error messages must state what happened and how to correct it. Do not clear entered values. The core product promise, safety warning, and assessment-start link should remain understandable even if the interactive preview fails.

## 17. Anti-patterns specific to SolarResolve

Do not:

- turn the homepage into a generic solar marketplace;
- import quote-check language into the current MVP;
- imply that a percentage calculation measures battery health;
- make the page look like a monitoring dashboard before user evidence exists;
- mix technician and owner calls to action until the primary owner action becomes unclear;
- publish placeholder About, contact, privacy, or policy content;
- use testimonials from synthetic sample users;
- repeat the same CTA after every section;
- hide limitations beneath the final footer;
- ask for email before the assessment provides value;
- let the homepage bypass the safety screen; or
- weaken the existing working assessment flow to add decorative features.

## 18. Submission-safe implementation order

### Phase 1: Protect the working journey

1. Record current passing frontend tests and production build.
2. Fix navigation collision and horizontal overflow.
3. Replace `/about` and contact placeholders with truthful project content.
4. Consolidate homepage tokens and responsive styles.
5. Re-run the existing assessment journey tests.

### Phase 2: Strengthen the homepage message

1. Rewrite the hero and scope strip.
2. Add product output preview.
3. Refine how-it-works and trust sections.
4. Move the full safety boundary into a dedicated visible surface.
5. Add FAQ and final CTA.

### Phase 3: Add healthy activity

1. Build the Runtime Change Check as an isolated component.
2. Add input validation and accessible result announcements.
3. Route its continue action through the safety check.
4. Add unit tests for calculations and routing.
5. Add appliance-change quick choices only after the core check is stable.

### Phase 4: Discoverability and measurement

1. Add verified metadata and structured data.
2. Add privacy-conscious events.
3. Measure Core Web Vitals.
4. Run keyboard, screen-reader smoke, mobile, and reduced-motion checks.
5. Recheck the complete live deployment.

## 19. Acceptance checklist

### Product and content

- [ ] A new visitor can state the supported problem after five seconds.
- [ ] The hero states the outcome and the diagnostic limitation.
- [ ] The primary action enters the safety check.
- [ ] The output preview matches the real assessment structure.
- [ ] No unsupported metric, testimonial, partner, or certification claim appears.
- [ ] About and contact information are real.
- [ ] Privacy and AI-use explanations are reachable.

### Safety

- [ ] Immediate stop conditions are visible without interaction.
- [ ] The homepage offers no physical troubleshooting instructions.
- [ ] Calculator output cannot be mistaken for battery health or diagnosis.
- [ ] Every assessment entry point preserves deterministic hazard screening.

### Interaction

- [ ] Interactive elements look interactive; static cards do not.
- [ ] Runtime results explain both the calculation and its limitation.
- [ ] Validation preserves entered data.
- [ ] All dynamic status changes are announced accessibly.
- [ ] Existing assessment state has clear continue and reset choices.

### Accessibility and responsive design

- [ ] Keyboard-only use reaches every control in a logical order.
- [ ] Focus is visible and not hidden by the sticky header.
- [ ] Text and non-text contrast pass automated and manual review.
- [ ] All inputs have visible labels.
- [ ] Reduced motion is respected.
- [ ] No horizontal page scrolling occurs at required widths.
- [ ] Zoom and text-spacing tests do not hide content or actions.

### Quality and performance

- [ ] Existing frontend tests still pass.
- [ ] New homepage component tests pass.
- [ ] Production build succeeds.
- [ ] No console errors occur on load or interaction.
- [ ] No broken public links remain.
- [ ] LCP, INP, and CLS meet or are moving toward the field targets.
- [ ] Hero media has explicit dimensions and efficient formats.

### Search and sharing

- [ ] Title and description are unique and accurate.
- [ ] One descriptive main heading exists.
- [ ] Canonical, Open Graph, favicon, sitemap, and robots behavior are verified.
- [ ] Structured data contains only truthful, public facts.

## 20. Definition of done

The homepage is done for submission when:

1. It clearly communicates the supported problem, value, safety boundary, product output, and limitation.
2. It provides useful activity through evidence preparation without making a diagnosis.
3. It is fully usable at mobile and desktop sizes without overflow.
4. It meets the critical accessibility, performance, privacy, and trust requirements above.
5. It routes every assessment start through the existing safety gate.
6. The full assessment flow, tests, and production build continue to work.
7. The deployed homepage has been checked on a real mobile-sized viewport and desktop viewport with no console errors or broken routes.

## 21. Short implementation brief

If the team has limited time, build these seven things in order:

1. Fix mobile navigation and horizontal overflow.
2. Replace the hero with the precise supported problem, outcome, limitation, and primary action.
3. Add a truthful sample assessment preview.
4. Add visible trust, AI-use, privacy, and safety boundaries.
5. Replace placeholder About and contact content.
6. Add the Runtime Change Check and route it through safety screening.
7. Test the complete journey, production build, live mobile page, links, and console.

That combination will make SolarResolve more engaging because the visitor can understand, try, and trust the product before committing to the full assessment.
