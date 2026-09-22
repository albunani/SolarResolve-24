# QA Test Plan

## Scope

Test the public homepage, pilot waitlist, About, Help, App, Privacy, and Website Terms pages across supported browsers, viewports, input methods, network conditions, and failure states.

## Release environments

- Local or preview environment with test data
- Production-like staging environment
- Production smoke test using non-mutating checks and an approved test-submission process

Do not send test leads into operational systems without clear tagging and cleanup procedures.

## Functional tests

### Navigation

- Every internal link reaches the correct page or anchor.
- Mobile menu opens, closes, reports state, and retains visible focus.
- Skip link moves focus to main content.
- Phone, WhatsApp, and email links use correct destinations.
- Unknown routes return an accessible 404 page.

### Homepage

- Primary and audience CTAs reach the correct waitlist context.
- Pricing presets and range input update the amount and kWh consistently.
- FAQ controls reveal the matching answers.
- Carousel boundaries, captions, touch scrolling, and keyboard controls work.
- Time-sensitive evidence and pricing show the approved dates and caveats.

### Waitlist

- Each role selects correctly.
- Buyer-only fields appear and disappear correctly.
- Query parameters preselect only allowed values.
- Required, invalid, duplicate, offline, timeout, and server-error states preserve entered values.
- Location permission accepted, denied, unavailable, and inaccurate paths remain usable.
- One activation produces at most one accepted submission.
- Success displays the implemented reference and next steps.

## Responsive matrix

Test at 320×568, 375×812, 390×844, 768×1024, 1280×720, and 1440×900. Check zoom at 200% and 400%. No essential content may be clipped or require horizontal page scrolling.

## Browser matrix

- Current and previous major Chrome
- Current and previous Edge
- Current and previous Firefox
- Current and previous Safari
- Current Chrome on Android
- Current Safari on iOS

## Accessibility

Execute the manual and assistive-technology matrix in [Accessibility](ACCESSIBILITY.md). Automated checks may supplement but not replace manual testing.

## Performance

- Measure Core Web Vitals on representative mobile hardware and Nigerian network conditions.
- Confirm the hero image is correctly sized and prioritised.
- Confirm below-fold field images remain lazy-loaded.
- Set budgets for JavaScript, CSS, fonts, image weight, and request count after collecting a baseline.

## Security and privacy

- Validate and encode all inputs server-side.
- Confirm rate limiting and duplicate protection.
- Verify that personal data never appears in URLs, client logs, analytics, or error reports.
- Check security headers, dependency findings, secret scanning, and production source maps.
- Verify consent version and timestamp storage.

## Content tests

- Prices, locations, dates, counts, app status, contact details, and legal links match approved sources.
- No AI illustration is presented as field evidence.
- No field photograph implies a customer result without supporting evidence.
- Nigerian English, currency, phone numbers, and geographic terminology are consistent.

## Release blockers

- Failed or duplicate waitlist submissions
- Missing consent or privacy link
- Broken primary CTA
- Keyboard trap or inaccessible required field
- Incorrect price or service-availability claim
- Personal data exposed to analytics or logs
- Critical electrical-safety misinformation

## Related documents

See [Components](COMPONENTS.md), [Form specification](FORM_SPECIFICATION.md), and [Privacy and data](PRIVACY_AND_DATA.md).
