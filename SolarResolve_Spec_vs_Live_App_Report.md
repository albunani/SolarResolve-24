# SolarResolve — Spec vs. Live App Audit

**Live app tested:** https://solar-resolve-24.vercel.app/
**Spec documents reviewed:** `PROJECT_CONCEPT.md`, `PROBLEM_DEFINITION.md`, `CORE_FLOW.md`, `requirement.md`
**Method:** Static content review of spec docs, plus live-app inspection via automated browsing (TinyFish) through Homepage → Safety Check → Intake → Clarification. The "Generate Assessment" step could not be completed — the automation wallet ran out of balance partway through testing, so **that step is unverified, not confirmed broken.**
**Date:** September 22, 2026

---

## 1. Summary

The live app implements the front half of the intended flow — landing page, hazard screening, evidence intake, and follow-up clarification questions — reasonably faithfully to the spec. However, there are two categories of problems:

1. **A missing core feature:** no actual photo/image upload exists anywhere in the intake flow, despite this being described as a central, differentiating capability across all three spec documents.
2. **Cross-contamination from a different venture:** several pages (`/about`, `/help`, `/app`, plus the site footer) contain content for what appears to be a separate solar pay-as-you-go financing pilot ("Solarpeer 360"), not SolarResolve. This directly contradicts explicit non-goals in the spec (no payments, no installer/financing marketplace, no mobile app requirement for the MVP).

The most consequential open question — whether "Generate Assessment" actually produces the structured result and technician brief described in `CORE_FLOW.md` — remains **untested**.

---

## 2. What matches the spec well

| Area | Spec source | Live app behavior |
|---|---|---|
| Landing page messaging | `requirement.md` §7 Step 1, `PROJECT_CONCEPT.md` | Matches closely: "safety-aware decision support," decline-runtime framing, optional-photo mention, hazard-stop banner, "Decision Support Only" disclaimer all present. |
| Hazard/safety screening | `CORE_FLOW.md` Step 2, `requirement.md` §7 Step 2 | Hazard list matches almost verbatim: smoke/fire, burning smell, battery swelling/leaking/hissing/cracking, exposed/sparking conductors, electric shock, severe heat, water ingress. "None of these observed" bypass, Back/Continue buttons present. |
| Problem description & system details intake | `CORE_FLOW.md` Steps 3–4, `requirement.md` §7 Steps 3, 5 | Intake form covers: problem description, previous/current runtime, sudden-vs-gradual change, onset timing, error codes, charging-before-evening question, system age, inverter/battery/panel fields (all optional/"leave blank if unknown"), appliances, recent changes. |
| Targeted follow-up questions | `CORE_FLOW.md` Step 9, `requirement.md` §7 Step 7 | Clarification screen asks case-relevant follow-up questions (battery full charge before sunset, added appliances, recent maintenance, grid/generator charging) with a skip / "I don't know" option — matches the intent of 3–5 targeted questions. |

---

## 3. Gaps and mismatches

### 3.1 No image/photo upload (High priority)

- **Spec:** All three documents (`PROJECT_CONCEPT.md` "Add visual evidence," `requirement.md` §7 Step 4, `CORE_FLOW.md` Steps 5 & 7) describe photo upload of an inverter/battery/controller display as core evidence, with AI extraction of voltage, state of charge, error codes, etc., and this is called out as a primary way to "visibly demonstrate useful image and language AI capabilities" for competition judging.
- **Live app:** The intake form has only a plain **text field** ("Visible display value or code," e.g. "52.4V or E04") for the user to type a reading. There is no file/image upload control anywhere in the flow observed.
- **Downstream effect:** Because there's no image pipeline, the "Clarification & Evidence Review" screen also cannot show source-labeled facts ("Reported by you" / "Read from image" / "Not provided") as required by `CORE_FLOW.md` Step 8 — it just shows a flat list of user-reported facts.

### 3.2 Cross-contamination from a different product (High priority)

Several pages return content unrelated to SolarResolve's troubleshooting/decision-support purpose, and instead describe what appears to be a separate solar pay-as-you-go (PAYGo) financing pilot:

| Page | Content found |
|---|---|
| `/about` and `/help` (identical content) | FAQ about deposits ("No, there are no hidden deposits"), pricing ("₦250 per kWh"), pilot geography ("Lagos, Niger State, and FCT Abuja"), contact info for a "Pilot Team" (WhatsApp, phone, `pilot@solarpeer360.com`) |
| `/app` | "The SolarResolve Android app is currently in closed testing… Access is tied to approved pilot participation and meter readiness… Join the pilot waitlist" |
| `/pilot` | "Join the Pilot Waitlist… Joining creates no payment obligation, and final terms precede any installation" |
| Footer (visible on clarification page) | Tagline: **"Reliable power from the solar system next door"** |

This content is inconsistent with the spec's explicit non-goals (`requirement.md` §6 and §20 "Will not have in version 0.1"): no payment system, no installer/technician marketplace, no direct hardware/meter integration, and no requirement for a native app in the MVP. It reads as leftover template/boilerplate from a different venture (a P2P/PAYGo solar energy product) that was never swapped out for SolarResolve-specific copy.

### 3.3 Minor copy drift (Low priority)

- Landing page CTA reads **"Start an assessment"**, while the spec (`requirement.md` §7 Step 1) specifies the exact primary CTA wording: **"Assess my battery-runtime problem."**
- The landing page includes a technician-facing pitch ("Get a structured, formatted brief with load calculations and change patterns from your clients before you arrive on site") that doesn't appear in the spec. `PROBLEM_DEFINITION.md` explicitly frames technicians as secondary participants who "should not dilute the primary persona" — this messaging risks doing exactly that on the primary landing page.

### 3.4 Evidence review screen structure (Low/Medium priority)

- **Spec:** `CORE_FLOW.md` describes evidence review (Step 8) and follow-up questions (Step 9) as sequential, distinct steps, with the review screen allowing inline correction before questions are asked.
- **Live app:** These are combined into a single "Clarification & Evidence Review" screen. Editing reported facts requires going back to the intake form ("Back / Edit Evidence") rather than inline editing. This is a reasonable simplification but is a structural deviation from the documented flow.

---

## 4. Unverified — testing incomplete

The following could **not** be confirmed due to running out of automation budget partway through, immediately before/at the "Generate Assessment" step:

- Whether "Generate Assessment" successfully produces a result at all.
- Whether the result follows the required 9-part structure from `CORE_FLOW.md` Step 11 (Assessment status → What we know → What is missing/uncertain → What may be happening → Safe checks → What not to do → Recommended next action → Technician brief → Decision-support disclaimer).
- Whether the technician brief matches the `TechnicianBrief` schema (system summary, relevant loads, display readings, warning/error codes, changes/events, safe observations completed, areas for professional investigation, unresolved questions, safety statement, disclaimer).
- Whether copy/download/share actions for the technician brief work as described in `CORE_FLOW.md` Step 12.
- Whether selecting a hazard on the Safety Check screen correctly triggers the "urgent safety escalation" branch and blocks normal troubleshooting (only the "no hazard" path was tested).
- Whether the demo/sample case described in `requirement.md` §17 exists anywhere in the live app (not observed in the flow tested).

---

## 5. Recommended next steps

1. **Verify "Generate Assessment" end-to-end manually** (in a real browser) before assuming the core feature works — this is the single most important unresolved question, since it's the entire point of the product.
2. **Remove or fix the Solarpeer 360 cross-contamination** on `/about`, `/help`, `/app`, `/pilot`, and the footer tagline. These pages currently misrepresent the product to anyone (including competition judges) who clicks past the homepage.
3. **Add real image upload** to the intake flow, or explicitly descope it from the current MVP and update `PROJECT_CONCEPT.md` / `requirement.md` to match — right now the specs and the build have diverged on a core differentiator.
4. **Test the hazard-branch path** (selecting a hazard on Safety Check) to confirm it stops normal troubleshooting and shows the urgent escalation result as required.
5. Align the landing CTA copy with the spec, or update the spec if "Start an assessment" is the intentional final wording.
