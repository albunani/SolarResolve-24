# Problem Definition — SolarResolve

## Document status

- **Topic:** My Startup Idea
- **Working venture name:** SolarResolve
- **Problem space:** Solar ownership and after-sales decision support in Nigeria
- **Initial use case:** Declining solar-battery runtime
- **Version:** 1.0
- **Last updated:** 2026-09-21
- **Evidence status:** Product assumptions requiring customer and technician validation

## Problem definition in one paragraph

Nigerian households and small businesses that own solar systems often lack the technical context needed to understand declining performance, collect useful evidence, or judge conflicting repair advice. When a battery stops lasting as long as it once did, the owner may not know whether the cause is changed electricity use, incomplete charging, reduced solar generation, configuration, battery ageing, or another issue requiring professional inspection. The result is a high-stakes decision made with fragmented information: wait, call a technician, accept a diagnosis, replace equipment, or attempt an unsafe check. SolarResolve is intended to close that decision gap without pretending to replace a qualified professional.

## 1. Target user

### Primary persona

**A non-technical Nigerian household or small-business solar owner who already has an installed inverter, battery, and solar-panel system.**

The initial user:

- depends on the system for lighting, refrigeration, communication, work, or household continuity;
- understands everyday operation but not detailed electrical diagnosis;
- may not know the inverter model, battery chemistry, usable capacity, system configuration, or original load assumptions;
- owns a smartphone and can usually provide a short description or photograph of a display;
- relies heavily on an installer, vendor, technician, friend, or online advice when something changes; and
- wants to avoid unnecessary cost, downtime, and unsafe action.

### Trigger situation

The initial trigger is:

> The user's battery previously lasted through the night but now becomes low or causes the inverter to shut down much earlier, such as around 11 p.m.

The owner notices a meaningful change but cannot explain it. Different parties may offer conflicting explanations, and the user lacks an independent way to organize the evidence before deciding what to do or pay for.

### Jobs the user is trying to complete

The user wants to:

1. describe what changed in plain language;
2. identify which observations and system details matter;
3. distinguish known facts from guesses;
4. understand the most plausible categories of explanation;
5. know what can be checked safely;
6. know when professional inspection is necessary;
7. communicate the issue clearly to a technician; and
8. avoid paying for an unsupported repair or replacement decision.

### Pain frequency

The pain has three frequencies:

| Frequency | User experience |
| --- | --- |
| Daily or weekly during a performance change | The user repeatedly experiences shorter runtime, incomplete charging, unexpected shutdown, or uncertainty about whether the system is behaving normally. |
| Episodic but urgent | An error, shutdown, sudden runtime decline, unusual display reading, or conflicting diagnosis creates an immediate need for a decision. |
| Infrequent but high-stakes | A technician visit, major repair, battery replacement, or system upgrade can require substantial money and may be difficult to reverse. |

No numeric frequency is asserted yet. User interviews and real cases must establish how often these events occur, how long uncertainty lasts, and how much cost or downtime results.

### Secondary participants

The initial product is designed for the solar owner, but its output may also help:

- qualified solar technicians receiving better initial information;
- installers handling support requests;
- equipment vendors separating product issues from system-level issues; and
- family or staff members responsible for operating a shared system.

These participants are not the initial paying-user assumption and should not dilute the primary persona.

## 2. Core problem

### Primary unsolved friction

> **When solar performance declines, a non-technical owner cannot easily turn fragmented observations into trustworthy, safe, and actionable evidence before making a technical or financial decision.**

The user may possess pieces of information—a display photograph, an error code, approximate runtime, connected appliances, system age, and technician messages—but not know how those pieces relate or what is missing.

### Why the problem remains unsolved

- Solar systems combine panels, charging conditions, batteries, inverters, settings, wiring, protection, and changing loads.
- Owners often receive system information in technical language or incomplete quotations.
- Installation records and baseline performance may be missing.
- Different installers, vendors, and technicians may focus on the component they know or sell.
- General internet information rarely matches the user's exact configuration and evidence.
- A user may describe the symptom imprecisely, causing a technician to start with poor information.
- Remote advice can become unsafe when it encourages opening, disconnecting, probing, or reconfiguring equipment.

### Why it matters

Poor decisions under this uncertainty can lead to:

- unnecessary technician callouts;
- avoidable component or battery replacement;
- repairs that do not address the cause;
- longer system downtime;
- increased generator-fuel or alternative-energy costs;
- lost work or business continuity;
- unsafe attempts at self-repair;
- disputes between customer, installer, and vendor; and
- reduced trust in solar technology.

### Problem boundaries

The initial problem is **not**:

- remotely proving that a battery or inverter is defective;
- replacing a qualified electrical or solar technician;
- teaching users to perform electrical repairs;
- monitoring every solar system continuously;
- solving every possible solar fault; or
- creating another general-purpose solar chatbot.

The initial problem is helping the owner move from uncertainty and fragmented evidence to a safer, better-informed next decision.

## 3. Current alternatives

### Alternative 1 — Contact the original installer

**Why users choose it:** The installer knows the original system and may provide warranty support.

**Limitations:**

- the installer may be slow, unavailable, or no longer operating;
- documentation may be incomplete;
- the owner may not know how to describe the problem clearly;
- the installer may rely on assumptions without current evidence; and
- the user may not have an independent way to evaluate the explanation.

### Alternative 2 — Call another technician

**Why users choose it:** A new technician can inspect the system physically and may offer a second opinion.

**Limitations:**

- the visit can cost time and money;
- the technician begins with limited context;
- repeated visits may occur when evidence was not collected beforehand;
- service quality and competence vary; and
- different technicians may provide conflicting diagnoses.

### Alternative 3 — Ask the battery or inverter vendor

**Why users choose it:** The vendor understands its own product and warranty process.

**Limitations:**

- the vendor may assess only one component of a system-level problem;
- responsibility may be redirected to another component or installer;
- the owner may lack readings, serial information, or usage evidence; and
- product support may not evaluate installation, configuration, or load changes.

### Alternative 4 — Search the web or watch videos

**Why users choose it:** Information is immediate, broad, and often free.

**Limitations:**

- advice may not match the equipment, battery chemistry, configuration, or local conditions;
- technical quality is difficult for a non-expert to judge;
- generic checklists do not structure the user's own evidence;
- unsafe repair instructions may appear authoritative; and
- the user must still translate the findings into a technician conversation.

### Alternative 5 — Ask a general AI assistant

**Why users choose it:** It can interpret ordinary language and respond quickly.

**Limitations:**

- it may produce confident but unsupported diagnoses;
- it may not enforce solar-specific safety boundaries;
- the conversation may remain unstructured;
- facts, assumptions, and possibilities may be mixed together;
- image readings may not be confirmed by the user; and
- output may not be formatted for a technician handoff.

### Alternative 6 — Ask friends, community groups, or social media

**Why users choose it:** Advice can be locally relevant and based on lived experience.

**Limitations:**

- recommendations can conflict;
- context about the exact system is often missing;
- anecdotal solutions may not transfer safely;
- public posts may expose unnecessary personal or equipment information; and
- no consistent evidence record is created.

### Alternative 7 — Replace or upgrade equipment immediately

**Why users choose it:** Replacement appears to offer a direct solution when the owner is tired of uncertainty.

**Limitations:**

- it is expensive and difficult to reverse;
- the replaced component may not be the underlying cause;
- changed load or incomplete charging may remain unresolved; and
- the owner may repeat the same problem with new equipment.

### Gap across the alternatives

Existing alternatives can provide information, inspection, or opinion, but they rarely give the owner one safe process to:

> collect evidence → identify missing information → understand plausible categories → choose the next action → communicate clearly with a professional.

## 4. Core value proposition

> **SolarResolve turns a solar owner's fragmented observations into a clear, safety-aware assessment and technician-ready brief so they can make a better next decision before spending more money.**

### What the value proposition promises

- structure, not a definitive remote diagnosis;
- clearer evidence, not generic solar education;
- safer next steps, not repair instructions;
- better technician communication, not technician replacement; and
- decision confidence, not guaranteed fault resolution.

## 5. Value hypothesis

> **If we provide a guided AI assessment that structures descriptions and display photos, identifies missing evidence, explains plausible cause categories, recommends safe next steps, and creates a technician-ready brief, then Nigerian household and small-business solar owners experiencing reduced battery runtime will make faster, safer, and better-informed support and repair decisions.**

### Hypothesis components

| Component | Definition |
| --- | --- |
| Solution | Guided intake, optional display-image interpretation, targeted questions, structured assessment, safety boundaries, action plan, and technician brief |
| User | Non-technical Nigerian household or small-business owner with an installed solar system and declining battery runtime |
| Outcome | Better-quality evidence, clearer technician communication, fewer unsupported actions, and greater confidence in the next decision |

### Observable signals that would support the hypothesis

- Users can complete the assessment without knowing every system specification.
- Users can correctly distinguish observed facts from suggested possibilities.
- Users report that the output makes the next action clearer.
- Technicians judge the generated brief more useful than an unstructured complaint.
- Users avoid at least some unnecessary or unsafe self-directed checks.
- Users use the brief when contacting an installer or technician.
- Users return when a new system-performance question occurs.

### Signals that would weaken the hypothesis

- Users cannot provide enough evidence for a useful assessment.
- The structured flow takes longer than simply contacting a technician.
- Users interpret plausible causes as confirmed diagnoses despite warnings.
- Technicians find the brief inaccurate, irrelevant, or burdensome.
- Users do not trust image interpretation or AI-supported guidance.
- Most target users already receive responsive, trusted, evidence-based support from installers.
- The pain occurs too rarely or creates too little cost to motivate use.

## 6. Critical assumptions to validate

1. Declining battery runtime is frequent and painful enough to be the first product wedge.
2. Owners can safely obtain the required display photos and observations.
3. Users want decision support before contacting or paying a technician.
4. A structured brief materially improves the technician interaction.
5. Users understand calibrated uncertainty when it is presented clearly.
6. Solar professionals accept the product as a preparation tool rather than a threat or remote-diagnosis substitute.
7. The expected reduction in wasted time, cost, or uncertainty is large enough to support repeated use or payment.

## 7. Initial validation questions

Ask solar owners:

- Tell me about the last time your solar system behaved differently from what you expected.
- What did you notice first?
- Who did you contact, and how long did it take to get useful help?
- What information did they ask you for?
- Did different people give you different explanations?
- What did you eventually pay for, replace, or change?
- What part of the process felt most uncertain or risky?
- What would have helped before the first technician conversation?

Ask technicians and installers:

- What information is usually missing when customers report poor battery runtime?
- Which customer descriptions lead to unnecessary visits or delayed diagnosis?
- What photographs or readings are useful before an inspection?
- Which observations are safe for an owner to collect?
- What remote advice should never be given?
- Would a structured pre-visit brief save time or improve service quality?

## 8. Problem-definition success criteria

This problem definition is sufficiently validated to guide product development when research can show that:

- the same decision gap appears across multiple independent solar owners;
- the problem produces meaningful cost, downtime, safety concern, or loss of trust;
- existing alternatives fail in consistent, explainable ways;
- technicians confirm that better pre-visit evidence would be useful;
- users can complete the proposed evidence-gathering steps safely; and
- the structured assessment and technician brief change a real next decision.

