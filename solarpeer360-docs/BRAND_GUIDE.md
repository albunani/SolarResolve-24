# SolarPeer 360 Brand and Colour Guide

**Status:** Approved and locked on 9 September 2026  
**Brand concept:** **Market Sun + Grid Green**  
**Applies to:** Android mobile app, SolarPeer staff/admin PWA, public landing page, smart-meter labels, installation materials, receipts, presentations, and field uniforms.

## 1. Brand Position

SolarPeer 360 should feel like a **trusted energy-payment utility**, not a solar-equipment catalogue or an open marketplace.

The product connects a known solar seller (an **Energy CEO**) to nearby buyers through unique smart-meter IDs. Buyers purchase metered energy without buying a complete solar system. Sellers monitor connected buyers, sellable energy, commission credits, energy sold, and earnings. The brand therefore has to communicate four things quickly:

1. Electricity is available and controlled.
2. Every kilowatt-hour and naira is visible.
3. The local seller and linked meter are trustworthy.
4. The experience is simple for people who may prefer cash, assisted onboarding, or familiar mobile-payment patterns.

### Core expression

> **Dependable neighbourhood infrastructure with the warmth of the Nigerian market.**

### Recommended customer-facing promise

> **Reliable power from the solar system next door.**

Supporting line:

> Buy metered electricity without purchasing an entire solar system.

## 2. Reference Review

- [Arnergy](https://www.arnergy.com/) communicates premium solar reliability effectively, but its experience is primarily equipment-led.
- [d.light](https://www.dlight.com/) uses warm solar orange, human imagery, and impact messaging well, although it can feel like a solar-product or development brand.
- [M-KOPA](https://www.m-kopa.com/) demonstrates bold visibility, simple steps, prominent numbers, and accessible communication for everyday earners.
- [OPay](https://www.opayweb.com/about-us/) demonstrates transactional clarity familiar to Nigerian users: balances, transfers, confirmations, security, and receipts.
- [Moniepoint](https://www.moniepoint.com/) is a useful reference for business-payment confidence and clear operational information.

### Design implication

SolarPeer should combine solar warmth with payment-grade clarity. It should not copy the bright green identity used by established fintech brands. A deeper green paired with solar amber and the existing SolarPeer bronze creates clearer differentiation.

## 3. Recommended Colour System

| Role | Token | Hex | Main use |
|---|---|---:|---|
| Primary | Grid Green | `#0B4D3B` | Primary navigation, buttons, links, and brand recognition |
| Primary dark | Deep Grid | `#07372B` | Hero backgrounds, major headers, and dark surfaces |
| Energy | Solar Amber | `#F4B43A` | Energy balance, live supply, active power, and highlights |
| Signature | Solar Bronze | `#B8895D` | Logo details, illustrations, and physical-brand accents |
| Emphasis | Market Rust | `#C4471C` | Important emphasis and urgent notices |
| Background | Warm Cream | `#FBF8F3` | Main application and website ground |
| Surface | Surface White | `#FFFFFF` | Cards, forms, receipts, and transaction panels |
| Text | Energy Ink | `#13231D` | Primary text and dark text on amber |
| Secondary text | Market Grey | `#627069` | Labels, captions, and supporting copy |
| Border | Soft Line | `#D9E2DC` | Dividers, fields, tables, and card borders |
| Success | Confirmed Green | `#16875A` | Successful payments and connected meters |
| Warning | Warning Amber | `#B96B00` | Low balance, capacity warnings, and delayed actions |
| Error | Fault Red | `#C23B3B` | Failed payments, meter faults, and overload events |
| Information | Utility Blue | `#2867B2` | Help, neutral system information, and pending review |

### Optional dark-mode tokens

| Role | Hex |
|---|---:|
| Background | `#071A14` |
| Surface | `#0E2A20` |
| Primary text | `#F5FBF7` |
| Secondary text | `#B9C8C1` |
| Interactive green | `#3DBF8B` |
| Energy amber | `#F4C15D` |

## 4. Colour Rules

- Use white text on Grid Green and Deep Grid.
- Use Energy Ink, not white, on Solar Amber.
- Reserve Solar Amber for electricity, energy balance, active supply, and high-value calls to action.
- Avoid covering every screen in green. Use cream and white surfaces to keep information readable and to prevent confusion with OPay or M-KOPA.
- Keep money state and energy state visually distinct: green for confirmed earnings or transactions; amber for energy and kWh.
- Never communicate payment, connection, or meter status using colour alone. Pair colour with a plain-language label and an icon.
- Keep Fault Red for real failure or safety conditions. Do not use it decoratively.
- Check all final text/background combinations against WCAG AA contrast requirements before release.

## 5. Product Application

### Buyer mobile app

Prioritize:

- Available energy balance in kWh and estimated naira value
- Connected seller name
- Unique tenant-meter ID
- Meter connection and power status
- Current power ceiling
- Latest purchase or receipt
- One primary **Buy energy** action

Use Warm Cream or white as the background, Grid Green for the primary action, Solar Amber for energy values, and semantic colours for transaction and meter states.

### Energy CEO seller app

Keep electricity, revenue, and commission visibly separate:

- Solar Amber: sellable energy and kWh transferred
- Grid/Confirmed Green: earnings and successful sales
- Market Rust or Warning Amber: low prepaid commission balance
- Utility Blue: reconciliation, pending links, and neutral meter information

Primary actions include **Record cash sale**, **Approve buyer**, **Top up commission wallet**, and **View connected meters**.

### Staff and installer PWA

Use a restrained operational interface: white surfaces, dark text, thin borders, compact tables, and semantic status colours. The admin experience should feel auditable rather than promotional.

### Public landing page

Use a Deep Grid hero with real photography of Nigerian merchants, refrigeration businesses, provision stores, local solar installations, and meter installation. Alternate Warm Cream and white content sections. Use Solar Amber for one primary CTA such as **Join the pilot**, with dark text.

### Physical and assisted channels

Apply the same hierarchy to:

- Smart-meter ID labels and QR stickers
- Installer identification and field uniforms
- Printed or WhatsApp receipts
- Agent onboarding cards
- Shop-window pilot signage
- Presentation and investor materials

Meter IDs must use high-contrast ink on a light surface and remain readable without relying on colour.

## 6. Typography

| Role | Typeface | Recommended weights |
|---|---|---|
| Brand and major headlines | General Sans | 600–700 |
| App interface and body | Source Sans 3 | 400–700 |
| Meter IDs and technical values | Geist Mono | 500–600 |

Source Sans 3 is recommended for small Android screens, naira values, transaction descriptions, and clear labels. Use tabular numerals for balances, kWh readings, tariff values, and transaction history.

Fallback stack:

```css
--font-display: "General Sans", "Segoe UI", sans-serif;
--font-ui: "Source Sans 3", "Segoe UI", sans-serif;
--font-data: "Geist Mono", "Cascadia Mono", monospace;
```

## 7. Layout and Interaction

- Use a base spacing unit of 8 px.
- Use minimum 48 px touch targets for primary mobile controls.
- Prefer one obvious primary action per screen.
- Use 8–12 px card radii; avoid excessive pill-shaped containers.
- Present balances and meter status above secondary analytics.
- Write short labels in plain language and pair unfamiliar icons with text.
- Design for long customer names, long meter IDs, zero balances, offline meters, failed payments, pending confirmation, and first-time users.
- Keep motion short and functional: payment confirmation, balance change, meter connection, and loading feedback.
- Respect reduced-motion settings.

## 8. Photography and Illustration

Prefer real, documentary-style images showing:

- Nigerian shop owners at work
- Cold-drink, fish, frozen-food, and provision businesses
- Solar installations within the same local cluster
- Meter installation and visible buyer/seller relationships
- Daylight trading and practical appliance use

Avoid generic rooftop-only solar imagery, futuristic energy grids, neon effects, and staged corporate handshakes. Illustrations should explain the seller-to-hub-to-tenant flow using the brand palette and clear labels.

## 9. Avoid

- Bright fintech green as the entire identity
- Green-to-purple or generic technology gradients
- Glassmorphism and glowing neon energy graphics
- Oversized rounded pills on every component
- Colour-only status indicators
- Dense dashboards for first-time buyers
- Generic solar-panel stock photographs without people or businesses
- Promotional language inside payment, meter, or safety alerts

## 10. Implementation Tokens

```css
:root {
  --sp-grid-green: #0B4D3B;
  --sp-deep-grid: #07372B;
  --sp-solar-amber: #F4B43A;
  --sp-solar-bronze: #B8895D;
  --sp-market-rust: #C4471C;
  --sp-warm-cream: #FBF8F3;
  --sp-surface: #FFFFFF;
  --sp-energy-ink: #13231D;
  --sp-market-grey: #627069;
  --sp-soft-line: #D9E2DC;
  --sp-success: #16875A;
  --sp-warning: #B96B00;
  --sp-error: #C23B3B;
  --sp-info: #2867B2;

  --sp-radius-control: 8px;
  --sp-radius-card: 12px;
  --sp-touch-target: 48px;
  --sp-space-unit: 8px;
}
```

## 11. Approved Direction

**Market Sun + Grid Green** is the approved SolarPeer identity. In the design-shotgun review, Market Sun received 5/5 and was selected over five alternatives. Use it consistently across the mobile product, admin PWA, public website, receipts, meter labels, and field operations. Any future replacement requires a documented design review; normal product work should extend these tokens rather than introduce a new palette.

## 12. Page-by-Page Design Specification

The screens below describe how the approved identity should appear in the pilot. They define presentation and interaction hierarchy, not new business rules. Product behavior remains governed by `PROJECT.md` and `CORE_FLOW.md`.

### 12.1 Start and role selection

**Purpose:** Help a user immediately choose the correct path without reading an explanation of the whole platform.

**Visual structure:**

1. Deep Grid header with the SolarPeer mark and short promise: **Reliable power from the solar system next door.**
2. Two large white role cards: **I buy energy** and **I sell energy**.
3. Each role uses a simple line icon, a one-sentence description, and a visible chevron.
4. A smaller **Installer or staff sign-in** text link sits below the two customer choices.

**Colour use:** Deep Grid for the header; Warm Cream page ground; Surface White role cards; Grid Green buyer selection; Solar Amber seller/Energy CEO marker; Energy Ink text.

**Required states:** normal, pressed, loading, offline warning, and returning-user sign-in.

### 12.2 Buyer onboarding and meter linking

**Purpose:** Create the buyer account and link the unique tenant-meter ID to a known seller.

**Visual structure:**

1. Short three-step progress indicator: **Your details → Meter → Seller approval**.
2. One form group per screen instead of one long registration form.
3. Meter ID shown in Geist Mono with a scan-QR option and an assisted-entry option.
4. Seller confirmation card shows seller name, business/location, tariff, and distance before the request is sent.
5. Pending state clearly says **Waiting for Mr. Adewale to approve this meter**.

**Colour use:** Grid Green for completed steps and the primary CTA; Solar Amber for the active step; Utility Blue for pending approval; Fault Red only for invalid or already-linked meter IDs.

**Required states:** empty field, invalid ID, already-linked ID, seller not found, pending approval, approved, offline submission, and retry.

### 12.3 Buyer home and energy dashboard

**Purpose:** Answer two questions in under three seconds: **Do I have power? How much energy remains?**

**Visual structure:**

1. Greeting, buyer name, and a plain-language meter status line.
2. Large Deep Grid balance panel containing remaining kWh and estimated naira value.
3. Full-width Solar Amber **Buy energy** button inside the balance panel.
4. Two small metrics: power ceiling and current load.
5. Known seller card with seller name, Energy CEO label, and meter relationship.
6. Simple daily-use chart and the latest transaction receipt.
7. Bottom navigation: Home, Energy, History, Profile.

**Colour use:** Warm Cream background; Deep Grid balance panel; Solar Amber purchase CTA; Confirmed Green connected status; Utility Blue pending state; Warning Amber low balance; Fault Red offline or authorization failure.

**Required states:** healthy supply, low balance, zero balance, meter offline, authorization pending, power-ceiling warning, and no recent usage.

### 12.4 Buy energy and payment confirmation

**Purpose:** Let a buyer understand exactly what they will pay and receive before confirming.

**Visual structure:**

1. Seller and meter identity remain visible at the top.
2. Large naira amount selector with familiar presets such as ₦250, ₦500, ₦1,000, and custom amount.
3. Calculated energy appears immediately: **₦500 gives you 2.0 kWh at ₦250/kWh**.
4. Payment choices use plain language: **Pay online**, **Bank transfer**, or **Pay seller with cash**.
5. Final review panel lists amount, kWh, tariff, seller, meter ID, and payment method.
6. Success receipt uses a strong confirmation mark, transaction ID, date, amount, kWh, and updated balance.

**Colour use:** Solar Amber for selected energy amount; Grid Green for the confirmation action and success; Utility Blue for pending gateway/manual confirmation; Fault Red for failed payments; Surface White for the review panel.

**Required states:** input, method selection, review, processing, awaiting seller confirmation, successful, failed, duplicate payment protected, and receipt.

### 12.5 Usage and receipts

**Purpose:** Give the buyer evidence of consumption, purchases, and balance changes.

**Visual structure:**

1. Current balance stays visible in a compact header.
2. Day/week toggle with a simple bar chart rather than technical energy analytics.
3. Transaction list separates **Energy bought** from **Energy used**.
4. Each receipt shows status, payment method, seller, kWh, naira amount, and transaction ID.
5. A clear **Report a problem** action is available from the receipt detail.

**Colour use:** Solar Bronze chart bars; Confirmed Green completed purchases; Utility Blue pending activity; Market Grey secondary metadata; Fault Red failed or reversed transactions.

**Required states:** empty history, loading, offline cached history, pending receipt, completed, failed, and reversed.

### 12.6 Energy CEO seller dashboard

**Purpose:** Show whether the seller can sell now, how much has been sold, and what requires attention.

**Visual structure:**

1. Hub-meter status and seller name in the header.
2. Two distinct headline balances: **Commission wallet** and **Sellable energy**.
3. Primary actions: **Record cash sale** and **Top up commission wallet**.
4. Connected-buyer list shows buyer name, tenant-meter ID, power ceiling, connection status, and today’s use.
5. Earnings summary separates today, this week, and total energy sold.
6. Pending buyer approvals and operational warnings appear before analytics.

**Colour use:** Grid Green for earnings and completed sales; Solar Amber for sellable energy; Market Rust for low commission credits; Confirmed Green connected buyers; Fault Red overload, offline, or authorization failure.

**Required states:** healthy operation, empty wallet, low wallet, no sellable energy, pending buyer approval, meter offline, buyer suspended, and reconciliation warning.

### 12.7 Record cash or transfer sale

**Purpose:** Support real pilot payment behavior without allowing the seller to edit kWh balances directly.

**Visual structure:**

1. Search or select an already-linked buyer by name or tenant-meter ID.
2. Show the selected buyer, meter status, tariff, and power ceiling before amount entry.
3. Choose **Cash** or **Direct transfer**.
4. Enter naira amount and show calculated kWh automatically.
5. Review panel shows the commission that will be consumed from the seller wallet.
6. Seller confirms with PIN or OTP.
7. Success page states that SolarPeer, not the seller’s phone, updated and authorized the meter.

**Colour use:** Surface White form groups; Solar Amber calculated kWh; Grid Green confirmation; Utility Blue transfer awaiting confirmation; Fault Red insufficient wallet, unsafe meter, or failed authorization.

**Required states:** no buyer selected, invalid meter ID, insufficient commission credit, insufficient sellable energy, invalid PIN/OTP, processing, success, failed meter authorization, reversal, and retry.

### 12.8 Buyer links and approvals

**Purpose:** Let a seller control which known buyer meters are connected to the hub.

**Visual structure:**

1. Tabs for **Pending**, **Active**, and **Suspended**.
2. Each request shows buyer identity, tenant-meter ID, requested power ceiling, and installer verification state.
3. Approval uses a review screen rather than a one-tap action from the list.
4. Suspend and restore actions require a reason and show the operational effect.

**Colour use:** Utility Blue pending badge; Confirmed Green active badge; Warning Amber suspended badge; Fault Red invalid/tampered meter state.

**Required states:** no requests, pending, approved, rejected, suspended, seller not authorized, meter already linked, and offline retry.

### 12.9 Commission wallet

**Purpose:** Make SolarPeer’s prepaid ₦25-per-kWh revenue mechanism understandable to the seller.

**Visual structure:**

1. Show both naira credits and the equivalent kWh authorized for sale.
2. Explain the conversion beside the balance: **₦2,500 commission credit authorizes 100 kWh at ₦25/kWh**.
3. Provide familiar top-up amounts and a custom amount.
4. History distinguishes top-ups, consumed commission, refunds, reversals, and pending entries.
5. Refund eligibility is displayed without promising rules that have not been confirmed.

**Colour use:** Grid Green wallet balance; Solar Amber authorized kWh; Market Rust low-balance warning; Utility Blue pending top-up; Confirmed Green completed top-up; Fault Red failed top-up.

**Required states:** zero balance, low balance, input, pending top-up, completed, failed, refund pending, refunded, and duplicate reference protected.

### 12.10 Admin and installer operations PWA

**Purpose:** Operate the pilot, find exceptions quickly, and preserve an audit trail.

**Visual structure:**

1. Deep Grid left navigation with Operations, Users, Meters, Transactions, Reconciliation, and Alerts.
2. White operational workspace with a restrained density and strong table headers.
3. Pilot-health strip shows active sellers, connected buyers, online meters, completed kWh, and unresolved exceptions.
4. Exceptions and actions appear above general analytics.
5. Search accepts user name, phone, seller ID, meter ID, payment reference, or transaction ID.
6. Detail drawers preserve context while reviewing users, meters, or transactions.

**Colour use:** Mostly white and neutral surfaces; Grid Green navigation and confirmed actions; Solar Amber energy KPIs; Utility Blue pending review; Warning Amber reconciliation mismatches; Fault Red tamper, offline, and authorization failures.

**Required states:** empty pilot, healthy operation, loading, partial data, search with no results, offline meters, reconciliation mismatch, failed authorization, reversal review, and role-based access denial.

### 12.11 Public landing page

**Purpose:** Explain the product in plain language and convert qualified sellers, buyers, and installers into pilot leads.

**Visual structure:**

1. Deep Grid hero with the customer promise, concise supporting text, and one Solar Amber **Join the pilot** CTA.
2. Real pilot story featuring a Nigerian merchant and the cost of unreliable power.
3. A labelled seller-to-hub-to-buyer diagram showing how energy and payments move.
4. Two audience paths: **I own a solar system** and **I need reliable power**.
5. Transparent pilot explanation covering the meter, tariff assumption, payment choices, and known-seller model.
6. Installer partnership section and a simple lead form.

**Colour use:** Deep Grid hero/footer; Warm Cream story sections; Surface White forms; Solar Amber CTA and energy flow; Solar Bronze physical-hardware illustrations; Grid Green trust statements.

**Required states:** default, form validation, submission success, submission failure, and low-bandwidth/mobile layout.

## 13. Cross-Screen Component Rules

### Balance panels

- The primary number must be the largest element on the screen.
- Always label the unit (`kWh`, `W`, or `₦`) beside the number.
- Do not combine wallet commission, seller earnings, and buyer energy into one balance.

### Status labels

- Use icon + label + colour.
- Preferred language: **Supplying power**, **Waiting for confirmation**, **Meter offline**, **Payment failed**, and **Action required**.
- Avoid vague labels such as **Active**, **Issue**, or **Error** without context.

### Buttons

- Grid Green: normal primary action.
- Solar Amber: energy-purchase action on a dark or neutral surface.
- White/outline: secondary action.
- Fault Red: destructive or safety action only.
- Keep one primary button visible per decision step.

### Forms

- Labels remain visible above fields after typing.
- Naira, kWh, meter ID, phone number, PIN, and OTP use the correct mobile keyboard/input type.
- Preserve entered data after recoverable validation or network failure.
- Show calculations before the final confirmation.

### Receipts and audit information

- Always show transaction ID, date/time, meter ID, seller/buyer identity, naira amount, kWh, payment method, and status.
- Never communicate success before the backend ledger confirms the transaction.
- Manual cash confirmation must identify the seller or authorized agent who recorded it.
