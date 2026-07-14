---
title: Documentation
slug: software-engineering/documentation
description: Durable engineering records for contracts, operations, and decisions.
area: software-engineering
topics:
  - documentation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - "api-design.md"
  - "technical-decision-records.md"
  - "requirements-engineering.md"
  - "testing.md"
  - "code-review.md"
historical_context: false
last_reviewed: 2026-07-11
---

# Documentation

Documentation is a product interface for future maintainers. It should preserve contracts, operating knowledge, and decisions that code alone cannot explain. The best format depends on the job: tutorials teach a path, how-to guides solve a task, reference docs define complete contracts, and explanations preserve the model behind a system.

## Contract Mechanism

Useful engineering documentation has an owner, a source of truth, and a freshness rule. API docs should live near [API design](api-design.md) schemas. Runbooks should name alerts, dashboards, rollback commands, and escalation paths for [production integration](production-integration.md). Decision records should link to [technical decision records](technical-decision-records.md), not duplicate their reasoning. Requirements docs should carry acceptance criteria from [requirements engineering](requirements-engineering.md).

## Worked Contract

For a feature document, a reviewer can check a small contract instead of reading free-form prose:

| required field | example value                                    |
| -------------- | ------------------------------------------------ |
| owner          | `search-platform`                                |
| source table   | `events.ticket_views`                            |
| refresh        | hourly at minute 10                              |
| null semantics | missing `user_id` means no personalized features |
| backfill       | recompute by `event_date`, maximum 31 days       |
| consumers      | `ticket-triage-v2`, `agent-assist-v1`            |

No required fields are missing, and two consumers are named. This is a documentation contract, not just prose. The same idea supports [testing](testing.md): a fixture can assert that a contract file contains required fields.

## Failure Modes

Documentation fails when it copies code, lacks an owner, or mixes current behavior with future intent. Stale docs should be fixed or deleted; preserving misleading prose is worse than having no doc. Repeated [code review](code-review.md) questions are strong candidates for a short checklist or reference page.

## References

- [Diataxis documentation framework](https://diataxis.fr/)
- [Google developer documentation style guide](https://developers.google.com/style)
