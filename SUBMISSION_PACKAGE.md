# Submission Package: SolarResolve

**One-sentence pitch:** SolarResolve safely diagnoses residential solar battery declines using Gemini AI before a technician rolls a truck.

**Problem statement:** When a home solar battery begins failing, determining whether the issue is natural aging, an environmental hazard, or a configuration error is nearly impossible for non-experts. Technicians waste hours on misdiagnosed service calls, while hazardous failures can cause severe property damage if mishandled by homeowners.

**Target user:** Residential solar and battery owners experiencing sudden or gradual runtime loss.

**Solution overview:** A progressive web app that safely intakes the symptoms and guides users through an AI-powered diagnostic. It deterministically blocks dangerous actions (e.g., "open the inverter") and outputs a copyable brief containing probable causes and safe next steps.

**How Gemini is used:** Gemini 3.8 Flash powers the diagnosis generation. It accepts a strict JSON schema mapping user evidence (runtimes, load changes, age) to output a structured assessment. It separates confirmed facts from unknowns and hypothesizes causes while maintaining safe boundary constraints.

**Responsible-AI and safety approach:** We place a deterministic hazard-policy layer in front of and behind the AI. Any mention of fire, sparks, or swelling immediately halts the AI and issues a hardware-emergency escalation. After AI generation, the output is scanned for definitive causal claims and prohibited DIY electrical instructions, converting failures to a generic safe fallback or an HTTP 502 with no leakage.

**Key differentiator:** Safety-first architecture. It refuses to confidently diagnose hardware over the internet and blocks the user from probing live equipment.

**Current scope and honest limitations:**
- Currently supports declining-runtime scenarios only.
- Live multimodal image interpretation is explicitly deferred for this submission; the public demo uses a mock synthetic extraction flow to demonstrate the UX.
- No historical data persistence or account login.

**Technology stack:** React + Vite (Frontend deployed to Vercel), FastAPI + Python (Backend deployed to Railway), Google Gemini 3.8 Flash (AI Provider).

**Public demo URL:** https://solar-resolve-24.vercel.app

**GitHub URL:** <Insert Repository URL>

**60-second demo narration:** 
"Meet SolarResolve. When your battery runtime drops, you shouldn't open the electrical panel. Instead, you enter what you know: previous runtime, current runtime, and any new appliances. Our system immediately checks for electrical hazards. If it's safe, Gemini Flash evaluates the evidence and isolates what is known versus what is missing. It provides a structured, uncertain diagnosis and a technician-ready brief. No jargon, no dangerous advice, just a clean path to repair."

**2-3 minute demo narration:** 
"Welcome to SolarResolve. Let's run through a common scenario: your battery used to last 7 hours, but over the past two weeks, it's dropped to 3 hours. You run a fridge, TV, lights, and fans. 
First, we land on our Neo-brutalist, high-contrast interface. We start the assessment. The app immediately asks about urgent safety hazards—smoke, swelling, or sparks. Since we have none, we proceed. We input our 7-hour and 3-hour runtimes, our loads, and submit.
Behind the scenes, our FastAPI backend wraps a strict safety layer around Google Gemini 3.8 Flash. Gemini processes the evidence and returns a structured JSON payload. But before you see it, our deterministic hazard policy scans the output to ensure Gemini didn't confidently blame a specific component or tell you to grab a multimeter.
The result is this clean Assessment Screen. It separates confirmed facts from missing information, lists probable causes with appropriate uncertainty, and generates a copyable brief you can hand straight to a solar technician. This saves the technician an initial diagnostic trip and keeps the homeowner safe."

**Judging-criteria mapping:**
- **Impact:** Reduces expensive, unnecessary diagnostic truck rolls for solar installers.
- **Innovation:** Adapts generative AI to a high-risk physical domain using deterministic safety wrappers.
- **Execution:** Crisp Neo-brutalist accessible UI with robust 500-level error recovery, robust CORS protection, and zero API keys exposed to the client.
