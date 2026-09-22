# New Venture Pre-Launch Waitlist Landing Page

## Document status

- **Page title:** Service Pre-launch
- **Page type:** Single-page venture waitlist landing page
- **Brand:** `[Brand Name]` pending confirmation
- **Version:** 1.0
- **Last updated:** 2026-09-21
- **Status:** Ready for design and implementation

## 1. Purpose

Create a focused landing page that introduces a new venture, explains its value quickly, and converts interested visitors into early-access waitlist signups.

The page must answer three questions in order:

1. What is launching?
2. Why should the visitor care?
3. How can the visitor get early access?

The primary conversion goal is a valid waitlist submission. The experience must remain credible, concise, responsive, accessible, and clear about what happens after a visitor submits their information.

## 2. Target audience

The page is intended for:

- prospective early users;
- people experiencing the problem the venture addresses;
- pilot customers or testers;
- partners and community members; and
- visitors arriving from a pitch, demo, social post, or direct referral.

Final audience language should be refined when the brand, service, and initial customer segment are confirmed.

## 3. Page structure

Use a single-page layout with three primary content regions:

```text
Top
├── Brand logo
├── Pre-launch label
├── Compelling headline
├── Supporting copy
└── Three value-proposition cards

Middle
└── Early-access waitlist form
    ├── Name
    ├── Email address
    └── Submit CTA

Bottom
└── FAQ accordion
    ├── FAQ item 1
    ├── FAQ item 2
    └── FAQ item 3
```

Optional navigation and footer content must not compete with the waitlist conversion goal.

## 4. Browser and page title

Use:

> **Service Pre-launch**

as the browser title and visible page title or pre-launch label.

When the final brand name is supplied, the browser title may become:

> `Service Pre-launch | [Brand Name]`

## 5. Top section — Venture introduction

### 5.1 Brand logo

Display the brand logo near the top of the page.

Until final brand assets are available:

- use an intentional logo placeholder or simple typographic wordmark;
- label the placeholder clearly in source or configuration;
- reserve stable dimensions to prevent layout shift;
- avoid inventing a permanent brand mark; and
- ensure a real logo receives appropriate alternative text.

### 5.2 Headline

Display one clear, benefit-oriented headline.

Working placeholder:

> **Be first to experience a smarter way to solve `[core user problem]`.**

The final headline must:

- name or strongly imply the user benefit;
- avoid vague claims such as “the future is here”;
- avoid unsupported superlatives such as “best,” “revolutionary,” or “world-changing”;
- remain understandable without additional context; and
- fit comfortably within two to three lines on a typical mobile viewport.

### 5.3 Supporting copy

Use one short paragraph to explain what the service does and who it helps.

Working placeholder:

> `[Brand Name]` is preparing a practical service that helps `[target user]` achieve `[specific outcome]` with less `[time, cost, uncertainty, or friction]`. Join the waitlist for launch updates and early-access opportunities.

The copy must be replaced with service-specific language before public deployment.

### 5.4 Key value propositions

Display exactly **three** value-proposition cards.

Each card must contain:

- short title;
- one- or two-sentence explanation; and
- optional restrained decorative icon.

Working content structure:

#### Card 1 — Clearer Decisions

> Turn confusing information into a clear next step.

#### Card 2 — Less Friction

> Complete important tasks with fewer delays and unnecessary steps.

#### Card 3 — Built for Real Needs

> Use a service shaped around practical user problems and feedback.

These are structural placeholders. Replace them with three service-specific benefits before public launch. Do not present generic benefits that the service cannot demonstrate.

### 5.5 Card presentation

- Stack cards vertically on narrow mobile screens.
- Use two columns only when the intermediate layout remains visually balanced.
- Use three equal-weight columns on wider desktop screens.
- Maintain consistent padding, radius, borders, headings, and icon sizing.
- Never clip content to force matching heights.
- Ensure cards remain understandable without hover.
- Use hover and focus effects only as enhancement.

## 6. Middle section — Early-access waitlist

The waitlist form is the page's primary interactive element.

### 6.1 Required fields

#### Name

- **Visible label:** Name
- **Input type:** `text`
- **Autocomplete:** `name`
- **Required:** Yes
- Trim leading and trailing whitespace.
- Reject an empty or whitespace-only value.
- Do not impose culturally narrow name-format rules.

#### Email address

- **Visible label:** Email address
- **Input type:** `email`
- **Autocomplete:** `email`
- **Input mode:** `email`
- **Required:** Yes
- Trim leading and trailing whitespace.
- Use native email validation plus server-side validation when connected to a backend.
- Do not claim that a simple browser pattern proves an address exists.

### 6.2 Submit CTA

- **Default label:** Join the Waitlist
- **Loading label:** Joining…
- **Element:** Real form submit button
- **Minimum touch target:** 44 by 44 CSS pixels where practical

The CTA must have visible:

- default state;
- hover state;
- keyboard-focus state;
- pressed state;
- loading state; and
- disabled state while submission is in progress.

### 6.3 Form labels and help

- Use persistent visible labels rather than placeholders as the only labels.
- Placeholder text may provide an example but must not repeat all label content unnecessarily.
- Associate error messages programmatically with their fields.
- Mark required fields in a way that does not depend on color alone.
- Include a short privacy statement near the CTA.

Suggested privacy copy:

> We’ll use your details only for early-access and launch updates. You can unsubscribe at any time.

Do not make that promise unless the implemented data flow and communication process actually support it.

## 7. Form behavior

### 7.1 Initial state

- Both fields are empty.
- The submit CTA is enabled or predictably disabled until required fields are present.
- No validation errors are displayed before interaction.

### 7.2 Invalid submission

If the user submits missing or invalid data:

- do not open the success modal;
- keep all valid input intact;
- move focus to the first invalid field or its error summary;
- show a specific, readable inline error;
- expose the invalid state through accessibility attributes; and
- allow correction and resubmission.

Recommended messages:

- Empty name: `Enter your name.`
- Empty email: `Enter your email address.`
- Invalid email: `Enter a valid email address, such as name@example.com.`

### 7.3 Valid submission

On a valid submission:

1. Disable repeat submission.
2. Show the loading state.
3. Submit the sanitized name and email to the configured waitlist service.
4. Wait for a confirmed successful response.
5. Open the polished success modal.
6. Reset or preserve the form according to the confirmed product decision.

The success modal must not appear merely because client-side validation passed when a production backend request failed.

### 7.4 Failure state

If the submission service fails:

- do not show success;
- restore the submit button;
- preserve the visitor's entries;
- show a calm, actionable error message; and
- provide a retry path.

Recommended message:

> We couldn’t add you to the waitlist just now. Please try again.

Do not expose stack traces, API responses, provider names, or internal error details to visitors.

### 7.5 Duplicate email state

If the waitlist service reports that the address is already registered, respond positively without leaking account information.

Recommended message:

> You’re already on the list. We’ll keep you updated.

This state may reuse the confirmation modal with adjusted copy.

### 7.6 Prototype mode

If no backend exists yet, the prototype may simulate success only when all of the following are true:

- simulation mode is explicitly identified in source or configuration;
- no claim is made that information was stored remotely;
- no real personal data is silently discarded while implying registration; and
- production deployment cannot accidentally retain the simulation setting.

## 8. Success modal

Submitting a valid email and receiving a successful waitlist response must trigger a polished modal confirmation popup.

### 8.1 Required content

- **Success icon:** restrained checkmark or equivalent
- **Heading:** You’re on the waitlist!
- **Supporting copy:** Thanks, `[First name]`. We’ll let you know when early access is ready.
- **Primary action:** Done
- **Optional secondary action:** Return to page

Do not display the visitor's full email address unnecessarily. If an email must be shown for confirmation, mask part of it or obtain an explicit product decision.

### 8.2 Visual behavior

- Center the modal in the viewport.
- Use a dark elevated surface consistent with the page theme.
- Use restrained cyan/blue confirmation accents.
- Add a backdrop that clearly separates the modal from the page.
- Prevent the modal from overflowing small screens.
- Keep transitions short and smooth.
- Respect reduced-motion preferences.

### 8.3 Accessibility behavior

- Use a native `<dialog>` where appropriate or an accessible modal-dialog pattern.
- Expose `role="dialog"` and `aria-modal="true"` when not using equivalent native semantics.
- Give the modal an accessible name through its heading.
- Move keyboard focus into the modal when it opens.
- Keep keyboard focus inside the modal while open.
- Close when the user activates **Done**.
- Support `Escape` to close unless doing so would cause data loss.
- Restore focus to the submit CTA after closing.
- Prevent background page content from being keyboard-interactive while the modal is open.

### 8.4 Repeated interaction

After closing the modal:

- the page must remain usable;
- the visitor must not become trapped without focus;
- duplicate submissions must remain controlled; and
- any cleared form state must be intentional.

## 9. Bottom section — FAQ accordion

Display exactly **three** FAQ items.

### 9.1 FAQ content

#### FAQ 1 — What is `[Brand Name]`?

> `[Brand Name]` is a new service designed to help `[target user]` achieve `[specific outcome]`. More product details will be shared as early access approaches.

#### FAQ 2 — When will early access begin?

> The launch date has not been announced yet. Waitlist members will receive updates when testing and early-access invitations become available.

#### FAQ 3 — What happens after I join?

> We’ll use the contact details you provide to send relevant launch updates and, where applicable, early-access invitations.

Replace bracketed placeholders with final service information before public deployment.

### 9.2 Accordion behavior

- Render exactly three accordion triggers.
- Each trigger must be a real `<button>`.
- Each trigger must expose its expanded state with `aria-expanded`.
- Associate each trigger with its panel using `aria-controls` and matching IDs.
- Make all items keyboard operable.
- Allow an expanded item to be collapsed.
- Choose and apply one consistent policy: single-open or multiple-open.
- Recommended policy: only one item open at a time.
- Keep the answer visible and readable without requiring hover.
- Animate height or opacity subtly only when reduced motion is not requested.

## 10. Visual design requirements

### 10.1 Theme

Use a sleek cyan/blue dark theme.

Recommended direction:

- near-black or deep navy page background;
- dark blue-grey elevated surfaces;
- off-white primary text;
- cool grey-blue secondary text;
- cyan or clear blue primary accent;
- subtle cyan/blue border highlights;
- controlled shadows; and
- generous negative space.

Maintain WCAG AA contrast. Do not use low-contrast cyan text merely for decoration.

Avoid:

- excessive neon glow;
- large animated gradients;
- gaming-style UI;
- particle backgrounds;
- cluttered dashboards;
- illegible glass effects; and
- decorative elements that distract from the waitlist form.

### 10.2 Typography

- Use a modern sans-serif typeface consistent with the wider project design system.
- If no other choice is made, use Pretendard with system sans-serif fallbacks.
- Keep the headline bold and compact.
- Maintain comfortable body line height and readable line length.
- Keep form labels and error text legible at mobile sizes.

### 10.3 Layout

- Design mobile first.
- Use a centered content container with a deliberate maximum width.
- Keep the waitlist form visually prominent.
- Use consistent spacing tokens across sections, cards, fields, and accordion items.
- Avoid full-width text lines on large screens.
- Ensure background decoration never produces horizontal overflow.

## 11. Responsive requirements

Verify at minimum:

- 320 px mobile;
- 390 px mobile;
- 768 px tablet;
- 1024 px laptop/tablet landscape;
- 1280 px desktop; and
- 1440 px desktop.

At every viewport:

- no horizontal scrollbar may appear;
- headline and support copy must remain readable;
- all three value cards must retain clean spacing;
- name and email fields must not overflow their container;
- the CTA must remain fully visible and operable;
- the success modal must fit within the viewport with safe margins;
- FAQ triggers and answers must not clip or overlap; and
- touch targets must remain comfortably usable.

## 12. Accessibility requirements

- Use semantic landmarks and one logical `h1`.
- Use persistent form labels associated with inputs.
- Identify required and invalid fields programmatically.
- Announce submission errors and status changes appropriately.
- Make every interactive element keyboard operable.
- Provide visible `:focus-visible` styles.
- Ensure the modal follows the focus-management requirements in Section 8.
- Ensure accordion buttons expose their state.
- Meet WCAG AA contrast requirements.
- Do not communicate validation, expanded state, or success through color alone.
- Ensure touch targets are at least 44 by 44 CSS pixels where practical.
- Preserve content and functionality at 200% browser zoom.
- Respect `prefers-reduced-motion`.

## 13. Privacy and security requirements

- Collect only the name and email required for the waitlist.
- Explain how waitlist data will be used.
- Link to a privacy notice before production launch if data is stored or processed.
- Send submissions over HTTPS in production.
- Validate and sanitize input on the server as well as the client.
- Keep provider credentials and API keys out of client-side code.
- Apply reasonable duplicate, rate-limit, spam, and abuse controls.
- Do not log full email addresses in public analytics or browser-console output.
- Do not send marketing beyond the disclosed purpose without the required consent.
- Provide an unsubscribe mechanism for launch emails.
- Define retention and deletion behavior before collecting real personal data.

## 14. Performance requirements

- Avoid unnecessary JavaScript and dependencies.
- Reserve logo dimensions to prevent layout shift.
- Keep decorative assets small and optimized.
- Use CSS for simple hover and accordion transitions where appropriate.
- Lazy-load noncritical below-the-fold assets if introduced.
- Ensure the form remains usable if optional visual assets fail.
- Display a clear recoverable state when the submission request times out.

## 15. Content configuration

Keep these values easy to update from a single content source or configuration object where the framework permits:

- brand name;
- logo asset and alt text;
- headline;
- supporting copy;
- three value-proposition cards;
- form CTA copy;
- privacy copy;
- success-modal copy;
- three FAQ questions and answers;
- submission endpoint; and
- support or privacy links.

## 16. Analytics events

If analytics are included, record only privacy-appropriate events such as:

- `waitlist_form_viewed`;
- `waitlist_submit_attempted`;
- `waitlist_submit_succeeded`;
- `waitlist_submit_failed`; and
- `faq_item_toggled`.

Do not attach raw names or email addresses to analytics events.

Analytics are optional for the prototype and must not delay the primary experience.

## 17. Out of scope

The first version does not require:

- authentication;
- user accounts;
- a dashboard;
- payment processing;
- referrals or invite codes;
- a blog;
- more than three value cards;
- more than three FAQ items;
- complex animation;
- a full marketing website; or
- multiple routes beyond any necessary privacy page.

## 18. Acceptance scenarios

### Scenario A — Valid submission

1. Enter a nonempty name.
2. Enter a syntactically valid email.
3. Activate **Join the Waitlist**.
4. Observe the loading state and disabled repeat submission.
5. Receive a successful service response.
6. Verify that the success modal opens.
7. Verify the personalized confirmation copy.
8. Close the modal using **Done**.
9. Verify that focus returns to the submit CTA.

**Expected result:** A polished success confirmation appears exactly once and the page remains usable afterward.

### Scenario B — Invalid email

1. Enter a valid name.
2. Enter an invalid email.
3. Submit.

**Expected result:** The modal does not open, the email error is visible and announced, and focus reaches the invalid field.

### Scenario C — Empty fields

1. Leave both fields empty.
2. Submit.

**Expected result:** The modal does not open and both required-field states are communicated accessibly.

### Scenario D — Submission failure

1. Enter valid values.
2. Simulate a network or service failure.
3. Submit.

**Expected result:** No success modal appears, the values remain, a readable error appears, and retry is possible.

### Scenario E — Keyboard-only journey

1. Navigate from the top of the page using only the keyboard.
2. Complete and submit the form.
3. Operate and close the modal.
4. Expand and collapse all three FAQ items.

**Expected result:** Every action works with visible focus and no keyboard trap.

### Scenario F — Responsive modal

1. Complete a successful submission at 320 px width.
2. Open the success modal.

**Expected result:** The modal remains fully visible within safe viewport margins, its content does not clip, and its close action remains reachable.

## 19. Definition of Done

The page is complete when:

- [ ] The browser and visible page title identify the experience as **Service Pre-launch**.
- [ ] A brand logo or intentional replaceable logo placeholder is visible.
- [ ] The top section contains a specific, compelling, service-relevant headline.
- [ ] Supporting copy clearly explains the service, target user, and benefit.
- [ ] Exactly three service-specific value-proposition cards are displayed.
- [ ] The waitlist form contains visible Name and Email address labels.
- [ ] Both fields expose appropriate HTML types and autocomplete attributes.
- [ ] Empty and invalid values produce accessible, field-specific errors.
- [ ] A real submit CTA is clearly visible and keyboard operable.
- [ ] The CTA provides default, hover, pressed, focus, loading, and disabled states.
- [ ] Valid data is submitted to a configured waitlist service or an explicitly identified prototype simulator.
- [ ] A production success modal opens only after confirmed successful submission.
- [ ] The success modal is polished and consistent with the cyan/blue dark theme.
- [ ] The success modal has an accessible name and correct dialog semantics.
- [ ] Focus moves into the modal, remains contained, and returns to the submit CTA after close.
- [ ] Escape and the **Done** action close the modal appropriately.
- [ ] Submission failures preserve entries and provide a retry path without showing false success.
- [ ] Duplicate email responses are handled clearly and safely.
- [ ] Exactly three FAQ accordion items are displayed.
- [ ] Every FAQ trigger is a keyboard-operable button with accurate `aria-expanded` and `aria-controls` state.
- [ ] Accordion items can be expanded and collapsed without clipping content.
- [ ] The page uses a sleek cyan/blue dark theme without excessive neon effects.
- [ ] Text and controls meet WCAG AA contrast requirements.
- [ ] The complete page is responsive at 320, 390, 768, 1024, 1280, and 1440 px.
- [ ] No horizontal scrolling occurs at any required viewport.
- [ ] The success modal fits and remains operable at every required viewport.
- [ ] The page remains usable at 200% browser zoom.
- [ ] All interaction and motion respect reduced-motion preferences.
- [ ] No API key or provider secret is present in client-side code.
- [ ] The page explains waitlist data use before real personal data is collected.
- [ ] Brand, headline, value propositions, FAQ copy, and privacy language no longer contain bracketed placeholders before public deployment.

## 20. Implementation handoff

Confirm these items before production implementation:

1. final brand name and logo;
2. target user and core problem;
3. final headline and supporting copy;
4. three service-specific value propositions;
5. waitlist storage or email provider;
6. final success and duplicate-email behavior;
7. privacy notice and unsubscribe workflow;
8. final three FAQ answers; and
9. whether the prototype should reset or preserve the form after success.

Missing content may remain as clearly labelled placeholders in a private prototype, but must not appear as finished claims in a public launch page.

