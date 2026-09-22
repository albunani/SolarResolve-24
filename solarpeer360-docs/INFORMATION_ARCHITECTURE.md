# Information Architecture

## Goals

The site structure must help visitors understand an unfamiliar energy model, locate role-specific information, judge trust, and take one safe next step.

## Proposed sitemap

```text
/
├── /pilot
├── /about
├── /help
├── /app
├── /policies/privacy
└── /policies/website-terms
```

Future public pages should be added only when content cannot remain clear within this structure. Candidate pages are `/safety`, `/installers`, and `/pilot-status`.

## Homepage structure

Recommended order:

1. Header and primary navigation
2. Hero proposition and CTAs
3. Pilot status and dated evidence
4. How it works in three or four steps
5. Audience selector
6. Pricing and appliance examples
7. Trust, safety, and field evidence
8. Short FAQ
9. Final waitlist and WhatsApp CTA
10. Footer

The current problem-story and partner sections can be shortened or merged into audience and trust content.

## Navigation model

### Primary navigation

- How it works: homepage anchor
- Who it is for: homepage anchor
- Pricing: homepage anchor
- About: separate page
- Help: separate page
- Join the pilot waitlist: primary action

### Footer navigation

- About SolarPeer 360
- Help and contact
- Privacy notice
- Website terms
- The SolarPeer app
- Phone, WhatsApp, and email

### Contextual navigation

- Audience cards link to `/pilot` with a role or context query parameter.
- Pricing links to the buyer flow.
- Trust and evidence link to About or future Safety content.
- App page links to the waitlist and Help while download is unavailable.

## Content ownership

| Content | Owner | Review trigger |
|---|---|---|
| Pilot locations and status | Pilot operations | Deployment or eligibility change |
| Pricing and commission | Commercial owner | Any assumption or term change |
| Safety process | Technical/safety owner | Equipment, installer, or policy change |
| Privacy and consent | Privacy owner | Data-flow or vendor change |
| Field evidence | Evidence owner | New evidence or claim expiry |
| SEO metadata | Growth/content owner | Page proposition change |

Names for these owners are `TBD`.

## Findability requirements

- Pricing must be reachable from primary navigation.
- Safety and provider verification must be reachable within one click from the homepage once published.
- Privacy must be reachable from the form before consent.
- Every page must offer a path to waitlist, Help, and home.
- No document in this directory should be more than two links away from [README](README.md).

## Related documents

See [UX guidelines](UX_GUIDELINES.md), [SEO and discovery](SEO_AND_DISCOVERY.md), and [Content guide](CONTENT_GUIDE.md).
