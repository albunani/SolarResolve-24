# UX Guidelines

## Experience principles

1. **Explain before asking.** Visitors should understand the exchange, its limits, and the pilot stage before providing personal information.
2. **Earn trust with evidence.** Use dates, locations, people, process details, and clear uncertainty instead of promotional claims.
3. **Design for low attention and mobile data.** Essential pages must remain understandable on a small screen, over a slow connection, and during interruptions.
4. **Use familiar choices.** Cash, transfer, WhatsApp, mobile numbers, and community names are more useful than account-heavy workflows during the pilot.
5. **Never hide material conditions.** Price status, assessment requirements, supply limitations, and consent must sit beside the relevant decision.

## Navigation

- Keep the primary navigation to five information choices plus one CTA.
- Recommended order: How it works, Who it is for, Pricing, About, Help, Join the pilot.
- Preserve a skip link as the first keyboard-focusable item.
- On mobile, keep the menu button visible and expose its expanded state.
- Do not open same-site navigation in a new tab.

## Homepage journey

The homepage should answer five questions in order:

1. What is SolarPeer?
2. Is it for someone like me?
3. How does energy and payment move?
4. What might it cost, and what are the limits?
5. Why should I trust this pilot enough to join?

The current site answers these questions but takes too long to do so. Target a 25–35% reduction in homepage length by combining repeated pilot disclaimers, shortening audience cards, and moving extended FAQs to Help.

## Calls to action

- Primary: `Join the pilot waitlist`
- Secondary: `Chat with the pilot team on WhatsApp`
- Informational: `See how it works`

Use one primary CTA per content region. Keep wording consistent from entry point to form completion. Replace the final form label `Submit interest` with `Join the waitlist` unless testing shows a clearer alternative.

## Forms

- Ask the participant role first and reveal only relevant questions.
- Put high-effort or sensitive questions after the visitor understands why they are needed.
- Preserve entered values when validation fails.
- Validate on blur for formatting problems and on submit for missing required fields.
- Place an error summary above the form and inline messages beside fields.
- Never make location permission a condition of joining.
- Provide a success reference that users can copy or screenshot.

## Feedback

- A button must visibly acknowledge activation within 100ms.
- Network actions show a loading label and prevent duplicate submissions.
- Success messages state what happened and when contact may occur.
- Error messages explain recovery in plain language. Avoid “Something went wrong” without a next step.

## Mobile behaviour

- Maintain 20px minimum page gutters at narrow widths.
- Use 44px minimum interaction targets.
- Avoid fixed elements that cover form fields or browser controls.
- Keep the primary CTA visible without forcing the entire hero into one screen.
- Support interrupted sessions if data retention is approved in [Privacy and data](PRIVACY_AND_DATA.md).

## Related documents

See [User flows](USER_FLOWS.md), [Information architecture](INFORMATION_ARCHITECTURE.md), [Form specification](FORM_SPECIFICATION.md), and [Accessibility](ACCESSIBILITY.md).
