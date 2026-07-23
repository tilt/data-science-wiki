---
title: Requirements Engineering
slug: software-engineering/requirements-engineering
description: Turning needs and constraints into testable software requirements.
area: software-engineering
topics:
  - requirements-engineering
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - "behaviour-driven-development.md"
  - "software-architecture.md"
  - "technical-decision-records.md"
  - "testing.md"
  - "documentation.md"
historical_context: false
last_reviewed: 2026-07-23
---

# Requirements Engineering

Requirements engineering turns stakeholder needs, constraints, and risks into a testable description of what should be built. A goal says why the work matters; a requirement says what behavior, quality, interface, or constraint the system must satisfy. For data products, requirements must include data availability, workflow fit, acceptable error, latency, privacy, and auditability before [software architecture](software-architecture.md) is chosen.

## Actors, conditions, and fit criteria

A useful requirement has an actor, condition, system response, fit criterion, owner, and non-goal. "Use AI to improve support" is a goal. "Auto-route German billing tickets only when precision is at least 0.94 on `golden_de_billing_v3`, with human override visible on every routed ticket" is testable. The examples can become [behaviour-driven development](behaviour-driven-development.md) scenarios or [testing](testing.md) fixtures.

## Reviewable requirements

Two requirements can be reviewed as requirements rather than aspirations:

| id    | statement                                  | fit criterion                                           | owner       | testable? |
| ----- | ------------------------------------------ | ------------------------------------------------------- | ----------- | --------- |
| REQ-1 | Route German billing tickets automatically | precision >= 0.94 on `golden_de_billing_v3`             | support-ops | yes       |
| REQ-2 | Human override is always available         | override button visible for 100% of auto-routed tickets | product     | yes       |

The artifact is intentionally small: it distinguishes requirements from aspirations. Once a requirement carries a fit criterion, [code review](code-review.md) can ask whether the implementation and [documentation](documentation.md) updated the same contract.

## Failure modes

Weak requirements overfit to a proposed solution, omit operational constraints, or hide disagreement behind words such as "accurate", "real-time", or "scalable." If a term cannot be tested, measured, or reviewed, clarify it before writing a [technical decision record](technical-decision-records.md).

## References

- [ISO/IEC/IEEE 29148:2018 Requirements Engineering](https://www.iso.org/standard/72089.html)
- [Scrum Guide: Product Backlog and Product Goal](https://scrumguides.org/scrum-guide.html)

> [!nav]
> **Section** — [Software Engineering](index.md)
>
> [← Production Integration](production-integration.md) [Behaviour Driven Development →](behaviour-driven-development.md)
