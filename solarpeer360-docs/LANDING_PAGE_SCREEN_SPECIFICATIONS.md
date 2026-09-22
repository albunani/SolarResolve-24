# SolarPeer 360 — Independent Landing Website Screen Specification

**Status:** Reviewed specification; final public copy/contact destination/distribution links require owner verification.
**Product boundary:** Public company and pilot website. Independent of the Android app and operations interface.
**Source:** User correction, 10 September 2026; PROJECT.md, BRAND_GUIDE.md and the design review.
**Related:** [SCREEN_SPECIFICATIONS.md](SCREEN_SPECIFICATIONS.md) (index), [DESIGN_REVIEW.md](DESIGN_REVIEW.md) (findings).

## 1. Independent purpose and completion

The website explains SolarPeer, establishes credibility and collects buyer, solar-owner and installer interest. A visitor must complete these tasks without installing the app, signing in, owning a meter, or waiting for the mobile app to be released.

Its navigation, forms, state, acceptance tests and release checklist belong to this document. Reuse approved brand assets; do not reuse the mobile account shell or mobile payment journey. Sharing a framework or repository does not make the products one user experience.

Static content stays available if application authentication, wallet, payment or IoT services fail. Website submissions need a small durable submission boundary with acknowledgement and an assigned review owner. Select its storage/hosting during implementation; do not force the public site to load the app's user session or financial APIs. Operations may later consume website submissions through O13, but a functioning dashboard is not a prerequisite for receiving them. An approved operator export/inbox can cover launch; email delivery alone is not proof of durable submission.

**Success:** Visitor understands the known-neighbour energy model, selects the appropriate interest, submits once, gets a reference and next-step explanation, and can contact the team later. A lead is not an activated buyer or a confirmed installation booking.

## 2. Inventory and navigation

Seven view templates; the homepage contains sections rather than many unnecessary marketing routes.

| ID | View | Route | Main outcome |
|---|---|---|---|
| L01 | Homepage | / | Understand product and choose Join the pilot |
| L02 | Pilot interest form | /pilot | Submit buyer/seller/installer interest |
| L03 | Submission outcome | /pilot/result or /contact/result | Know received / not sent / uncertain and what next |
| L04 | Help and contact | /help | Find answer or submit/reach a contact |
| L05 | Policy/document reader | /policies/:document | Read the published website/privacy/service document |
| L06 | App availability | /app | Obtain approved Android access or understand it is not yet available |
| L07 | Not found / unavailable page | unknown route or server fallback | Return to a useful public destination |

```text
Header: SolarPeer 360 | How it works | For buyers | For solar owners | Help | Join the pilot
Homepage sections: Story -> How sharing works -> Buyer / seller fit -> Installer interest
                   -> Pilot pricing context -> Evidence/about -> FAQ -> Final CTA/footer
Join the pilot -> L02 -> L03
Help -> L04 -> L03 for a submitted contact request
Footer -> L05; app link if appropriate -> L06
Invalid public URL -> L07 -> L01/L04
```

About/company story, hardware explanation, pricing, buyer/seller paths and installer partnerships earn sections on L01, not separate duplicated pages for this pilot. A blog, careers page, investor portal, referral program and seller marketplace are not required.

## 3. Homepage section composition

| Section | First -> second -> third | Action / evidence requirement |
|---|---|---|
| Header/hero | SolarPeer identity -> “Reliable power from the solar system next door” -> explanation and Join the pilot | One primary CTA; no Sign up/Buy now labels that imply app account/payment |
| Problem/story | Merchant need -> real everyday situation -> how local shared access helps | Consent-cleared story/image; a named interview is not a testimonial of completed service |
| How it works | Existing solar owner -> hub and connected tenant meter -> prepaid energy and receipt | Label physical energy connection and payment as different paths |
| Buyer path | Who qualifies -> known nearby supply/site assessment -> cash/direct transfer support | L02 with buyer interest; no guarantee a seller exists everywhere |
| Solar-owner path | Protect own supply -> metering and approved limits -> prepaid commission model | L02 with seller interest; self-reported capacity is not verified surplus |
| Installer path | Partner role -> site assessment/commissioning responsibility -> interest CTA | L02 with installer interest, no installer/admin account provisioning |
| Pricing context | Pilot tariff assumption -> what kWh and watt limit mean -> final terms before activation | Current ₦250/kWh only with pilot context; no fixed unapproved deposit or tier prices |
| Evidence/about | What company does -> verified team/product evidence -> concrete stage of pilot | Publish only approved current claims; no automatic import of historical award/uptime/funding claims |
| FAQ/footer | Access/cash/installation/availability answers -> Help -> policy/contact | No hidden costs or 24/7 guarantee; show contact alternatives |

**Hero sketch (design intent, not approved visual mockup):**

```text
Full-width Deep Grid surface
[Brand]                  [How it works] [Help] [Join the pilot]
[One clear headline]          [One contextual merchant + meter image]
[One supporting sentence]    [Useful caption if needed]
[Join the pilot]
```

On narrow screens: logo + labelled Menu; headline, short support sentence, CTA, then image. Keep text on a calm surface, never over a busy photograph. Use asymmetry and section-specific rhythm instead of a repeated three-card feature grid. The flow diagram earns its space because it explains the product. No decorative dashboard cards or animated fake balances.

## 4. Detailed views

### L01 — Homepage

- **Entry/purpose:** Public search, shared link, word of mouth. First three priorities are product identity, benefit, action.
- **Components:** Section composition above, labelled navigation, one primary CTA, responsive image, FAQ disclosures and footer.
- **Input -> processing -> result:** Anchor selection moves to section; buyer/seller/installer interest goes to L02 with that value selected. App link goes to L06, never a broken store badge.
- **Data:** Approved content and publication status, pilot availability/locality, image permission, policy versions, approved contact and app-link configuration. No meter/account/financial reads.
- **States:** Missing image preserves explanation; limited/closed pilot changes CTA copy consistently; static page remains usable without client JavaScript; service issue affecting contact forms does not blank the whole site.
- **Acceptance:** Visitor can explain how to participate by scanning headings; every CTA has a working public destination; unavailable app does not block Join the pilot.

### L02 — Pilot interest form

- **Entry/purpose:** Any L01 audience CTA. First show intended interest, then essential fields, then submit.
- **Components:** Interest (buyer/solar owner/installer), name, phone, locality, privacy notice, optional contextual notes, Submit interest, Help. Do not require email or account password.
- **Input -> processing -> result:** Validate and normalize -> durable deduplicated submission -> L03 with result reference. Do not remove data on a validation/network error.
- **Data:** Submission ID/type, interest, name/contact/locality, optional notes, consent/version, submission time, owner-review status. No sensitive documents or appliance inventory needed to express interest.
- **States:** Empty field, invalid number, changed role, unsupported area, duplicate request, no network, response lost after save, storage failure. Unsupported area allows clearly labelled interest/waitlist submission if team accepts it; otherwise explain unavailability before collecting details.
- **Acceptance:** One logical request is stored once; acknowledgement does not reveal someone else's existing record. Buying/selling/installing interest never provisions an app role. No deposit or payment is collected.

### L03 — Submission outcome

- **Entry/purpose:** Successful or interrupted L02/L04 submission. First show actual outcome, then reference, then next action.
- **Components:** Received / not sent / checking submission heading, non-sensitive reference, plain next-step description, Back home, Contact team; retained draft on confirmed failure.
- **Input -> processing -> result:** Reference/result token -> bounded server status lookup -> confirmed acknowledgement or retry existing request. A reference alone must not expose personal contact details publicly.
- **Data:** Submission state, non-sensitive reference, permitted confirmation text; private lookup needs an unguessable scoped capability or verified contact, finalized by engineering.
- **States:** Response unknown, expired result link, refresh/direct URL without reference, duplicate submit, storage accepted but notification failed, rejected form.
- **Acceptance:** Shows Received only after durable acceptance; notification failure does not request duplicate submission; public visitor never needs to open the app to find what happened. No guaranteed appointment or response SLA unless operations has approved it.

### L04 — Help and contact

- **Entry/purpose:** Header/footer, failed form, return visitor or app-access issue.
- **Components:** Topic list, short FAQs, approved email/phone/messaging actions, optional contact form (name, contact method/value, topic, message), privacy notice, existing-reference field optional.
- **Input -> processing -> result:** Select topic -> answer; send enquiry -> website submission boundary -> L03. Copy/email/phone remains available if messaging app missing.
- **Data:** Published support contacts, help copy; contact submission and reply destination. App incident references may be supplied, but no private receipt is fetched publicly.
- **States:** Empty message, invalid contact, service failure, opening external channel fails, previous enquiry follow-up, no reference.
- **Acceptance:** A visitor can ask about an earlier enquiry using the reference without registering; staff response is routed to the chosen contact through the approved workflow. Do not collect PIN/OTP, card data or device credentials.

### L05 — Policy/document reader

- **Entry/purpose:** Footer, privacy notices or a shared public policy link.
- **Components:** Document title/version/date, readable body, contents for long documents, Back and Help.
- **Input -> processing -> result:** Choose public published policy -> read document -> return to originating form with draft intact.
- **Data:** Public document ID, version, effective date, content, publication status.
- **States:** Missing/retired version, offline cache, unavailable current policy. No implicit agreement merely from opening the page.
- **Acceptance:** Website privacy/submission terms are sufficient for public interest; joining a waitlist does not accept seller financial terms. Mobile users read commercial terms in the app's own reader, which may share approved content but not depend on website availability.

### L06 — App availability

- **Entry/purpose:** Optional Get the Android app link or approved public app link.
- **Components:** Android availability state, official distribution destination when released, device support guidance, pilot-access explanation, Help/Join the pilot fallback.
- **Input -> processing -> result:** Choose approved access -> official store/controlled distribution route; unavailable release -> public interest/help remains usable.
- **Data:** Release availability, official URL/version, supported platform text approved by CTO; no store rating/download claims without verification.
- **States:** Not released, invitation-only, non-Android device, expired distribution link, store unavailable, download interrupted.
- **Acceptance:** Website works with no downloadable app; no invented iOS link. No mandatory install prompt, automatic download or simulated phone screen passed off as released software.

### L07 — Not found / unavailable

- **Entry/purpose:** Broken URL or public page failure.
- **Components:** Brand, plain missing/unavailable message, Home and Help links; retry on temporary service failure.
- **Input -> processing -> result:** Choose recovery -> public page. Keep actual 404/appropriate error HTTP status for missing/unavailable pages.
- **Data:** Non-sensitive error category and known public routes.
- **States:** Invalid page, missing policy, expired result link, service unavailable. Do not expose stack traces or classify network outage as “application rejected.”
- **Acceptance:** Broken deep link never strands visitor or redirects them into mobile sign-in; navigation works via plain links.

## 5. Visible interaction-state matrix

| View | Loading | Empty | Error | Success | Partial |
|---|---|---|---|---|---|
| L01 | Text/CTA first, reserved image space | Missing optional proof section omitted | Page still offers Help | Product explanation and Join CTA | Image unavailable, readable caption/text |
| L02 | Submitting, button disabled | Labelled empty fields + what is required | Inline correction, values retained | Move to L03 after save | “Checking whether your request was received” |
| L03 | “Checking submission” | “No submission reference” + Contact | “Not sent” + retry saved request | “Interest received” + reference/next step | “Received; confirmation message delayed” |
| L04 | Sending message | “What do you need help with?” | Message preserved + direct contact | L03 acknowledgement | External app unavailable -> email/phone |
| L05 | Document title/loader | Document unpublished -> Help | Cannot load, retry | Versioned readable terms | Cached version explicitly labelled |
| L06 | Checking link availability | App not yet released -> pilot interest | Link unavailable -> Help | Open approved distribution | Unsupported device -> useful explanation |
| L07 | Short retry indication | Missing page -> Home | Temporary unavailable -> Retry | Return to public content | Help link still reachable |

## 6. Public journey and emotional arc

| Moment | Visitor does | Likely feeling | Design response |
|---|---|---|---|
| First 5 seconds | Scans headline | Curious, sceptical | Name product, local power promise, one action |
| Understands sharing | Checks suitability | “Is this available to me?” | Known seller/site assessment and limited pilot clearly explained |
| Before form | Checks costs/trust | Concern about a hidden deposit | Published pilot context; final terms before activation |
| Five-minute task | Enters interest | Wants quick completion | Few fields, cash-compatible language, no account or app demand |
| Submission | Waits for response | Uncertain if accepted | Durable acknowledgement, reference and realistic next step |
| Later return | Follows up | Wants accountability | Help/contact with reference; no forced reapplication |
| Long-term relationship | Visits again | Wants continuity | Stable help and accurate release/pilot status; no repeated forced onboarding |

## 7. Responsive, accessibility and content rules

- Design at 360/390 px mobile, 768 px tablet and 1280+ px desktop; also verify 320 px and 200% text zoom.
- Desktop header stays navigable; mobile menu uses an explicit labelled toggle, focus handling, Escape dismissal and return to trigger.
- Use General Sans headings and Source Sans 3 body with the brand's system fallbacks during loading. Body text at least 16 CSS px. Text contrast and focus must be verified in implementation.
- Grid Green/Deep Grid with Warm Cream surfaces; Solar Amber CTA with Energy Ink text. Tokens come from BRAND_GUIDE.md. No new gradients/palette required by this review.
- Form errors use text plus field associations; completion announces politely; page changes update document title and focus.
- Links are identifiable without hover; informational visited links may use Deep Grid versus Grid Green with underline, subject to contrast checks. Navigation uses current-page indication.
- No autoplay video, compulsory carousel or motion required to understand content. Brief optional entrance and disclosure transitions respect reduced motion and slow devices.
- Hero image has meaningful alt text or is explicitly decorative; energy-flow explanation has equivalent text.
- No analytics/cookie banner added solely as decoration. If nonessential tracking is later selected, specify its real consent requirements before enabling it.
- Proposed acceptance target: static content renders without app APIs or client JS; optimized responsive images have dimensions; no third-party tracking, unverified testimonials or decorative video blocks first-use tasks. Measure page performance on representative low-cost phones before claiming load times.

## 8. Website acceptance tests and publication gates

1. Disable app auth/financial/IoT endpoints: L01/L04/L05 still render and navigate.
2. App unreleased: lead submission and confirmation still complete.
3. Submit each of buyer, solar owner and installer interest; correct interest is retained.
4. Double click/reload after submission: one request, same non-sensitive reference.
5. Lose response after storage succeeds: resolve existing result; no instruction to blindly resubmit.
6. Notification delivery fails: acknowledgement remains correct and operator still has stored request.
7. Invalid phone/empty message: inline error retains values and focus is useful.
8. Invalid/expired result link: no contact data disclosure; useful follow-up path.
9. Non-Android visitor and broken download link: public help/interest still work.
10. Keyboard/mobile/large-text test: menu, form, errors, result and policy navigation work.
11. Staff processes an enquiry and records reply/outcome through approved inbox or O13 without app account creation.
12. Confirm homepage pricing, locality, evidence, real contact details, privacy copy and official download links before public release.

Unresolved publication choices: final approved content/contact recipient, durable form storage/owner handoff, accepted localities/waitlist wording, official app link if available, retention and privacy text. They do not justify adding mobile financial screens to the website.

## 9. What already exists / not in scope

Reuse Market Sun + Grid Green, current company promise, existing page preview as visual reference only, and approved assets. Logo concepts remain an exploration. Historical site reviews mention Jabi/Abuja, AI advice and ₦200 minimums; they are not current pilot promises.

Out of scope: customer login/dashboard, energy checkout, commission wallet, meter linking/control, public lead directory, live private receipt lookup, admin tools, seller marketplace and independent legal/commercial claims research. The site can link outward to approved products without incorporating their screen specifications.

## GSTACK REVIEW REPORT

| Review | Runs | Status | Findings |
|---|---:|---|---|
| Plan design review | 1 | Revised; publication choices open | Independent visitor journey, seven views, explicit confirmation/contact/download/error paths and responsive states |
| Visual/runtime QA | 0 | Not run | Document review only; no new approved mockup or deployed site |

VERDICT: Website specification separated and reviewed. Publication values must be verified; no dependency on mobile app readiness.

**UNRESOLVED DECISIONS:**
- Public content/contact, form persistence/handoff, supported locality wording, release link and privacy/retention need owner verification before publishing.

