# SolarResolve MVP Scenarios

## Document status

- **Source:** `PROJECT.md`
- **Primary loop:** Report declining runtime → provide evidence → receive a safe assessment → create a technician brief
- **Version:** 1.0
- **Last updated:** 2026-09-21
- **Purpose:** Define expected behavior for normal, incomplete, and failed journeys without inventing unresolved product decisions

## Screen reference

| ID | Screen | Purpose |
| --- | --- | --- |
| S1 | Home and scope | Explain the supported problem, limits, and entry action |
| S2 | Safety check | Detect urgent hazards before ordinary assessment |
| S3 | Problem and evidence input | Collect runtime change, system context, loads, and optional image |
| S4 | Clarification and evidence review | Confirm evidence, correct extraction, and answer material follow-ups |
| S5 | Assessment and technician brief | Present status, evidence, actions, and professional handoff |

Processing, loading, validation, and error states may be rendered within these five screens rather than becoming additional routes.

## 1. Happy Path Scenario

### Scenario goal

A user with declining overnight battery runtime provides enough safe evidence to receive a structured assessment and copy a technician-ready brief.

### Example case

- Previous runtime: approximately 7 hours
- Current runtime: approximately 3 hours
- Change: gradual over 2 weeks
- System age: approximately 30 months
- Loads: refrigerator, television, four LED lights, two fans
- Recent change: an additional freezer is sometimes used
- Charging observation: battery does not always display full charge before sunset
- Error code: none visible
- Image: synthetic or deliberately anonymized display image

### Happy-path mapping

| Step | Required screen | Required feature | Required data | Expected result |
| --- | --- | --- | --- | --- |
| 1. Enter product | S1 — Home and scope | Product scope and start action | No case data | User understands that the service supports declining battery runtime and is not a professional diagnosis. |
| 2. Start assessment | S1 → S2 | Guided navigation | New client assessment identifier | A new in-memory assessment begins and the Safety check is shown. |
| 3. Complete safety check | S2 — Safety check | Hazard screening and safety escalation | All defined hazards marked false; `noneObserved` true | User is allowed to continue. Safety status becomes `clear`. |
| 4. Describe the change | S3 — Problem and evidence input | Guided problem intake | Original description, previous runtime, current runtime, change timing, gradual pattern | Required values pass validation and original wording is preserved. |
| 5. Add system and load context | S3 | Guided evidence intake | Approximate age, known equipment details, usual loads, new freezer, charging observation | Known values are normalized; unknown specifications remain explicitly unknown. |
| 6. Add optional image | S3 | Optional image evidence | Supported synthetic/anonymized image plus evidence type | Upload passes file validation and image processing begins. Text-only continuation would remain available. |
| 7. Extract visible evidence | S3 → S4 processing state | AI evidence extraction | Uploaded image | Structured observations are returned with `clear`, `uncertain`, or `unreadable` readability states. No extraction is treated as fact yet. |
| 8. Confirm evidence | S4 — Clarification and evidence review | User confirmation and source attribution | Extracted observations plus user corrections | Confirmed values become facts with `user_confirmed_image` source. Rejected values are excluded from known facts. |
| 9. Answer targeted questions | S4 | Clarification | Answers about full charge, added freezer, weather or charging pattern, and pre-shutdown warning | Material gaps are reduced. Only relevant questions are asked; the flow does not exceed the defined three-to-five target when clarification is needed. |
| 10. Review case summary | S4 | Evidence review | User-reported facts, confirmed image facts, missing fields, conflicts | User sees what is known, what came from which source, and what remains unknown before generation. |
| 11. Generate assessment | S4 → S5 processing state | Structured, safety-aware assessment | Confirmed evidence, reviewed domain guidance, safety rules | Schema-valid result is produced. Safety filters run before output is shown. |
| 12. Read result | S5 — Assessment and technician brief | Assessment result | Status, facts, gaps, cause categories, safe checks, prohibited actions, next action | Increased load and incomplete charging may appear as evidence-supported possibilities. Battery ageing may remain possible but unconfirmed. No component failure is declared. |
| 13. Review safe action | S5 | Safe checks and escalation | Recommended next action and prohibited actions | User receives a practical observation or professional-inspection step and is explicitly told not to open, disconnect, probe, or reconfigure equipment. |
| 14. Generate brief | S5 | Technician-ready brief | Confirmed case facts and labelled investigation areas | A concise brief is rendered without converting hypotheses into diagnosis. |
| 15. Copy brief | S5 | Copy action | Plain-text technician brief | Clipboard receives readable text suitable for a messaging application and the UI confirms the copy action. |

### Happy-path completion condition

The journey succeeds when the user understands the distinction between facts and possibilities, receives a safe next action, and can carry a useful brief into a technician conversation.

## 2. Empty or Missing Input Scenarios

### Scenario goal

Allow users with incomplete technical knowledge to proceed where safe, while blocking inputs that make the assessment meaningless or unsafe.

### Empty/missing-input mapping

| Step or condition | Required screen | Required feature | Available or missing data | Expected result |
| --- | --- | --- | --- | --- |
| Safety check unanswered | S2 — Safety check | Hazard screening | No hazard choice | Continue action remains unavailable or submission returns a visible safety-screen error. User cannot reach ordinary intake. |
| `noneObserved` selected with another hazard | S2 | Hazard validation | Contradictory selections | UI prevents the contradictory state, preferably by making `noneObserved` mutually exclusive. If received by the server, the request is rejected as invalid. |
| Empty problem description | S3 — Problem and evidence input | Required-field validation | Description missing or whitespace only | User remains on S3, sees a field-specific error, and focus moves to the description field. No AI request is made. |
| Previous runtime unknown | S3 | Unknown-value support | `previousRuntime = unknown` | User may continue. The evidence gap is recorded and may trigger a targeted question or **More information needed** result. |
| Current runtime unknown | S3 | Unknown-value support | `currentRuntime = unknown` | User may continue only if the description contains another concrete performance change. Otherwise the system requests one observable indicator before assessment. This exact sufficiency rule requires confirmation. |
| Change timing unknown | S3 | Unknown-value support | `changeBegan = unknown` | User may continue. The missing value appears in evidence review and may reduce assessment specificity. |
| All equipment specifications unknown | S3 | Unknown-value support | Inverter, battery, panel, and capacity fields unknown | User may continue. No equipment values are guessed. Result identifies the missing specifications when they matter. |
| No image supplied | S3 → S4 | Text-only fallback | `uploads = []` | User continues without image processing. Manual readings and text evidence remain available. Image-confirmation controls are omitted. |
| No appliance/load entered | S3 | Guided load intake | `loads = []` | Behavior is currently undefined. Recommended behavior: require one of **Add a load**, **No loads during the period**, or **I don't know**, rather than forcing a possibly invented appliance. |
| Optional field left blank | S3 | Input normalization | Optional value empty | Normalize to `null` or explicit `unknown`; do not generate an error or guess a value. |
| Image supplied but no reading is legible | S4 — Review | Extraction fallback | Observations marked unreadable | Explain that no reliable value was read. Offer replace image, enter reading manually, or continue without image evidence. |
| Follow-up answer unknown | S4 | Clarification | `unknown` response | Preserve unknown state. Do not repeatedly ask the same question. Generate **More information needed** when the gap prevents useful assessment. |
| Evidence insufficient after clarification | S5 — Result | Structured assessment | Too few confirmed facts for useful cause categories | Return **More information needed**, list the smallest useful missing observations, omit forced cause ranking, and allow return to S3/S4. |

### Missing-input completion condition

The flow should distinguish:

- **required to operate safely**;
- **required to produce any meaningful result**; and
- **useful but optional for a more specific assessment**.

Unknown technical knowledge alone must not exclude the target user.

## 3. Failure Recovery Scenarios

### Scenario goal

Preserve user effort, prevent false results, and provide a clear recovery path whenever uploads, AI services, networking, structured output, or browser actions fail.

### Failure-recovery mapping

| Failure point | Required screen | Required feature | State/data to preserve | Expected recovery result |
| --- | --- | --- | --- | --- |
| Unsupported file type or configured size exceeded | S3 — Input | Upload validation | All text and system inputs | Reject only the file, explain the accepted requirements, and allow replacement or text-only continuation. Exact limits remain an open question. |
| Upload connection interrupted | S3 | Upload retry | All completed fields and selected file metadata where safe | Show failed-upload state with Retry, Replace image, and Continue without image. Do not clear the form. |
| Image service returns no readable observations | S4 — Review | Image fallback | Original image reference according to retention policy; all text evidence | Mark image unreadable and offer manual entry, replacement, or text-only continuation. Do not invent readings. |
| Image service returns schema-invalid data | S3/S4 processing state | AI output validation | User input and upload reference | Reject the invalid output. Attempt a bounded internal repair only if defined; otherwise show recoverable processing error. Never display raw or partial model output. |
| Uploaded image contains prompt-injection text | S4 processing state | Trust-boundary protection | Image as case evidence only | Ignore instructions contained in the image, continue extracting only supported observations, and keep system/safety rules unchanged. |
| Late hazard detected in description, image, or answer | Any intake/review state → S5 | Safety override | Case evidence needed to explain escalation | Stop ordinary assessment, suppress cause ranking, and return **Urgent safety escalation**. |
| Follow-up generation fails | S4 | Clarification fallback | Confirmed evidence and missing-field list | Use a reviewed deterministic question set or allow generation of **More information needed**. Whether deterministic fallback is required remains undefined. |
| Assessment model times out | S4 processing state | Retry and input preservation | Entire confirmed case and clarification answers | Show a calm error with Retry and Return to review. Do not clear data or present success. |
| AI returns unsupported diagnosis or unsafe instruction | S4 processing state | Output safety enforcement | Confirmed case plus safety-rule result | Block the response. Regenerate through a bounded safe path or return a recoverable error. Never show the unsafe content to the user. Exact retry count is undefined. |
| Assessment response fails schema validation | S4 processing state | Structured-output validation | Entire confirmed case | Reject or repair internally according to a defined bounded policy. If still invalid, return recoverable error rather than partial result. |
| Network disconnects after submit | S4 processing state | Idempotent retry | Confirmed case and client assessment identifier | Show connection failure and Retry. Reuse an idempotency key so retry cannot create conflicting duplicate cases if persistence is later added. Persistence behavior is unconfirmed. |
| User navigates backward during processing | S4 | Navigation control | Submitted case and processing state | Behavior is undefined. Recommended behavior: allow safe cancellation or warn that generation will stop, without losing confirmed input. |
| Copy-to-clipboard fails | S5 — Result | Brief fallback | Rendered technician brief | Keep the brief visible, show copy failure, and provide selectable plain text for manual copy. |
| Page refreshes before completion | S2–S4 | Session recovery | Depends on storage decision | Behavior is undefined. For the no-persistence MVP, warn that refresh clears the case or use temporary same-device session state after privacy review. |
| Unexpected application error | Any screen | Global error handling | Minimum safe recoverable state | Display a nontechnical error, provide a safe return path, avoid exposing stack traces, and never lose more data than the documented storage policy allows. |

### Failure-recovery completion condition

A failure is handled correctly when:

- no unsafe or partial model output reaches the user;
- valid user input is preserved within the defined session boundary;
- the user receives a clear next action;
- retries do not create conflicting state; and
- the interface never claims success without a valid structured result.

## 4. Requirement coverage matrix

| Primary-loop capability | Happy path | Missing input | Failure recovery |
| --- | --- | --- | --- |
| Hazard screening | Clear safety state | Unanswered and contradictory state blocked | Late hazard overrides every other path |
| Guided intake | Complete case entered | Unknown optional fields allowed; core description required | Text input preserved across recoverable errors |
| Optional image evidence | Readable demo image confirmed | No image and unreadable image supported | Upload, extraction, schema, and injection failures contained |
| Clarification | Relevant questions answered | Unknown answers allowed | Deterministic fallback or More information needed recommended |
| Structured assessment | Complete safe result | Insufficient evidence returns More information needed | Timeout, invalid schema, and unsafe output never appear as completed result |
| Technician brief | Complete brief copied | Brief may be withheld when no meaningful assessment is possible | Clipboard failure falls back to selectable text |

## 5. Undefined behaviors and contradictions

### U1 — Optional image feature is classified as Must-Have

**Evidence:** `PROJECT.md` states that image upload is optional and users may continue without it, but **AI evidence extraction and user confirmation** is one of the five Must-Have features.

**Why it matters:** A capability cannot be strictly necessary to complete the primary loop if the defined loop succeeds without it.

**Suggested fix:**

- Reclassify image upload, extraction, and confirmation as **Should**.
- Keep a manual-reading path in the Must-Have guided intake.
- Retain image support for the competition demo if schedule permits.

### U2 — Load information is required but the “no load known” state is missing

**Evidence:** Acceptance criteria require the user to add at least one appliance/load observation, while the product explicitly targets users who may not know technical details.

**Why it matters:** Users may invent a load entry merely to proceed, reducing evidence quality.

**Suggested fix:** Replace the criterion with:

> The user must add at least one load observation or explicitly select **No loads during the affected period** or **I don't know**.

### U3 — Minimum evidence needed for assessment is undefined

**Evidence:** Runtime and timing can be recorded as unknown, but `PROJECT.md` does not define which combination is sufficient to generate a normal assessment instead of **More information needed**.

**Why it matters:** The same incomplete case may produce inconsistent results.

**Suggested fix:** Define a reviewed minimum-evidence rule. At minimum, require:

- nonempty problem description;
- one observable change, such as runtime reduction, shutdown behavior, or charging change; and
- completed safety screening.

Everything beyond that may affect specificity rather than basic eligibility.

### U4 — “Three to five” follow-up questions conflicts with “when necessary” at the zero-question boundary

**Evidence:** The flow says three to five questions are asked when material evidence is missing, but does not explicitly say that zero questions are valid when evidence is already sufficient.

**Why it matters:** The system may ask unnecessary questions solely to meet a numeric target.

**Suggested fix:** State:

> Ask zero to five questions. Ask none when confirmed evidence is sufficient; otherwise ask the smallest useful set, normally no more than five.

### U5 — Model-output repair policy is undefined

**Evidence:** Technical requirements say invalid output should be rejected or repaired, but no retry count, repair method, or user-visible fallback is defined.

**Why it matters:** Unbounded retries increase latency and cost, while partial output could create safety risk.

**Suggested fix:** Define a bounded policy:

1. validate structured output;
2. perform at most one schema-repair attempt;
3. re-run deterministic safety checks;
4. otherwise return a recoverable error with Retry and Return to review.

The exact retry count should be approved during technical design.

### U6 — Session persistence boundary is undefined

**Evidence:** Input must survive recoverable failures, while persistent storage and saved history remain open questions.

**Why it matters:** “Preserve input” could mean component state, browser session storage, server storage, or full account history, each with different privacy consequences.

**Suggested fix:** For the MVP, define preservation as:

> Keep data in the current browser session across validation, upload, and model errors. Do not promise recovery after refresh or browser closure until a privacy-reviewed storage design exists.

### U7 — Image retention must be disclosed before real uploads, but no retention behavior is selected

**Evidence:** Privacy requirements demand disclosure, while the data section leaves image retention open.

**Why it matters:** Real users cannot make an informed upload decision without this information.

**Suggested fix:** Prefer ephemeral processing for the MVP unless evaluation requires retention. If retention is necessary, specify purpose, duration, deletion, and access before collecting real images.

### U8 — Late hazard detection source and authority are unclear

**Evidence:** Hazards may be detected in text, images, or answers, while deterministic safety rules are required outside model output.

**Why it matters:** Free text and images require interpretation, but a probabilistic model alone should not control a safety-critical transition.

**Suggested fix:** Define a two-layer policy:

- deterministic matching for explicit hazard terms and structured hazard flags;
- conservative model classification for ambiguous content, validated against an allowlisted hazard schema;
- any positive signal routes to escalation or explicit user confirmation, never ordinary troubleshooting.

### U9 — Back navigation and cancellation during processing are undefined

**Evidence:** The user may correct evidence, but processing-state navigation is not specified.

**Why it matters:** Users may accidentally trigger duplicate generations or lose work.

**Suggested fix:** Disable duplicate submission, expose **Cancel and return to review**, and use the client assessment identifier to ignore stale responses.

### U10 — Technician brief behavior for insufficient evidence is undefined

**Evidence:** Every completed result includes a technician brief, but **More information needed** may not contain enough evidence for a meaningful investigation summary.

**Why it matters:** An empty or speculative brief could undermine trust.

**Suggested fix:** For **More information needed**, either:

- generate an **Evidence Collection Brief** listing known facts and missing observations; or
- withhold the technician brief until minimum evidence is met.

Recommendation: use an Evidence Collection Brief so the user still leaves with an actionable artifact.

### U11 — Exact export behavior is open, but copy is already sufficient

**Evidence:** The flow says copy or export while the acceptance criteria require only copy.

**Why it matters:** PDF, print, native share, and file export could expand the MVP unnecessarily.

**Suggested fix:** Make plain-text copy **Must**. Classify print/download/native sharing as **Should/Could** until user research identifies a preferred channel.

### U12 — Payment behavior is correctly absent

**Evidence:** `PROJECT.md` explicitly excludes payments, subscriptions, billing, and refunds.

**Assessment:** No contradiction exists. Maintain this boundary and use synthetic demo cases. Do not add payment mocks unless a later business-model experiment specifically requires them.

## 6. Recommended scope correction

The strict primary loop can be completed with four Must-Have capabilities:

1. **Hazard screening and safety escalation**
2. **Guided text-based evidence intake and essential clarification**
3. **Structured, safety-aware assessment and next action**
4. **Copyable technician brief or Evidence Collection Brief**

Move the following out of Must:

- image upload, extraction, and confirmation → **Should**;
- generated dynamic follow-up questions → **Should**; a reviewed deterministic question set may serve the first version;
- download, print, and native sharing → **Should/Could**;
- synthetic preloaded demo case → **Could** as a product feature, while remaining a competition-delivery requirement;
- feedback collection → **Could**.

This scope preserves the entire user outcome while reducing model, upload, privacy, and failure-handling complexity.

