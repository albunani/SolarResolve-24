# User Flows

## Shared acquisition flow

```text
Search, referral, field outreach, or WhatsApp
  -> Homepage or role-specific link
  -> Understand service and pilot status
  -> Choose role
  -> Complete waitlist or contact the team
  -> Receive reference or conversation handoff
  -> Internal qualification
  -> Site or cluster assessment
```

## Buyer flow

1. Visitor sees that they can buy measured solar energy without owning panels.
2. Visitor selects shop, student residence, or home.
3. Visitor reviews price assumptions, power limits, and availability constraints.
4. Visitor chooses `I need reliable power` on the waitlist.
5. The form asks buyer context and whether a nearby solar owner is known.
6. Visitor provides name, mobile number, state, community, optional location and notes, then consents to pilot contact.
7. System validates the entry and returns a reference.
8. Operations groups the entry with nearby demand and begins qualification.

Failure paths: invalid number, unsupported state, missing consent, duplicate submission, location denial, network failure, or no viable nearby cluster. Each path must preserve the submission and explain what happens next.

## Solar-owner flow

1. Visitor learns that household reserve and assessed spare capacity come first.
2. Visitor reviews the proposed buyer price and SolarPeer commission assumption.
3. Visitor selects `I own a solar system`.
4. Buyer-only questions disappear.
5. Visitor provides contact and location details, plus optional system information in notes.
6. Operations screens the system before arranging an assessment.

Future versions should collect system capacity, battery type, current load, installer history, and permission to inspect through a dedicated qualification form rather than expanding the public waitlist.

## Installer flow

1. Installer reads the expected role: assessment, meter installation, commissioning, and support.
2. Installer joins with the installer role.
3. Operations verifies identity, qualifications, service area, safety practices, and conflicts of interest.
4. Approved installers receive a separate onboarding process and signed terms.

## Cluster-partner flow

1. Community leader, campus association, or estate manager learns that clustered interest affects deployment priority.
2. Partner joins with the cluster-partner role and identifies the area represented.
3. Operations verifies authority to organise, expected participant count, and communication channels.
4. Partner receives approved outreach materials and a non-misleading explanation of pilot status.

## Support flow

```text
Question
  -> FAQ or Help
  -> Call, WhatsApp, or email
  -> Identity and issue classification
  -> Answer, escalation, or incident process
  -> Resolution record
```

Urgent electrical hazards must bypass ordinary support queues and follow [Trust and safety](TRUST_AND_SAFETY.md).

## Related documents

See [Form specification](FORM_SPECIFICATION.md), [Pilot operations](PILOT_OPERATIONS.md), and [Analytics plan](ANALYTICS_PLAN.md).
