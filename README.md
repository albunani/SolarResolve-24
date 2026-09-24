# ?? SolarResolve

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success)](https://solar-resolve-24.vercel.app/)
[![MIT Open Learning](https://img.shields.io/badge/3MTT%20x%20MIT-Innovation%20Challenge-blue)](#)

> **AI-Powered Safety & Diagnostic Support for Home Solar Systems**

SolarResolve is a safety-first decision support tool built to bridge the communication gap between homeowners and solar technicians. It was built for the **3MTT x MIT Open Learning Universal AI Innovation Challenge**.

## ?? The Problem
Homeowners relying on solar battery systems frequently experience drops in performance. Lacking technical expertise, attempting a DIY diagnosis is incredibly dangerous (risk of electric shock, chemical leaks, or fire). Calling a professional for initial triage is expensive and slow.

## ?? The Solution
SolarResolve safely guides users through a non-technical symptom checklist. Using **Google Gemini 3.6 Flash** and strict backend guardrails, it translates messy human complaints into a highly structured, professional "Technician Brief" that can be handed straight to a professional—preventing users from taking dangerous physical actions.

## ?? Key Features
*   **Deterministic Safety Checks:** A hard-coded hazard scanner intercepts inputs before the AI is invoked, immediately halting the flow if extreme danger (e.g. smoke, sparks, swelling) is detected.
*   **Structured AI Output:** Leverages strict Pydantic schemas to force the LLM to cleanly categorize Known Facts, Missing Information, Plausible Causes, and Safety Constraints.
*   **Safe AI Guardrails:** The AI is specifically prompted *never* to recommend physical interventions (e.g., "open the inverter").
*   **Actionable Technician Brief:** Generates a ready-to-copy diagnostic brief to send to professionals, saving diagnostic time and money.

## ??? Tech Stack
*   **Frontend:** React, Vite, TypeScript, React Router
*   **Backend:** Python, FastAPI, Pydantic
*   **AI Integration:** Google GenAI SDK (`gemini-3.6-flash`)
*   **Deployment:** Vercel (Frontend), Railway (Backend)

## ?? Architecture & AI Integration
Unlike basic chatbots, SolarResolve uses a highly constrained, safety-first LLM architecture:
1. **Intake:** The user fills out a structured React form, providing qualitative and quantitative data.
2. **Validation:** The Python backend performs Regex/keyword checks for hazards (`src/safety/hazard_policy.py`).
3. **LLM Generation:** The `google-genai` SDK queries Gemini 3.6 Flash, strictly enforcing `response_schema=ModelAssessmentDraft`. We explicitly disable `thinking_config` to reduce latency and prevent hallucinated technical steps.
4. **Presentation:** The frontend renders the structured JSON into a beautiful, readable report.

## ?? Running Locally

### Prerequisites
* Python 3.10+
* Node.js 18+
* Google Gemini API Key

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set Environment Variables
export GEMINI_API_KEY="your_api_key_here"
export AI_PROVIDER="gemini"
export GEMINI_MODEL="gemini-3.6-flash"

# Start the FastAPI server
uvicorn src.app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## ?? License
This project is licensed under the MIT License.

