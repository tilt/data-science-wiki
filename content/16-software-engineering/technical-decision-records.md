---
title: Technical Decision Records
slug: software-engineering/technical-decision-records
description: Short records of important engineering choices and accepted consequences.
area: software-engineering
topics:
  - technical-decision-records
level: foundational
status: review
page_type: concept
aliases:
  - ADR
  - Architecture decision records
prerequisites:
  - software-architecture.md
related:
  - "software-architecture.md"
  - "requirements-engineering.md"
  - "documentation.md"
  - "api-design.md"
  - "production-integration.md"
historical_context: false
last_reviewed: 2026-07-11
---

# Technical Decision Records

Technical decision records preserve why a choice was made, not just what the code now does. They are most valuable when the decision is expensive to reverse, changes operational risk, affects multiple teams, or sets a precedent for future [software architecture](software-architecture.md).

## Record Mechanism

A small ADR usually has status, context, decision, alternatives, consequences, and links to evidence. The status is part of the contract: proposed, accepted, deprecated, or superseded. Keep the record near the code or docs it governs so [documentation](documentation.md) and implementation drift are visible.

## Authentic Artifact

```markdown
# ADR-004: Use Hosted Embeddings For First Release

Status: Accepted, 2026-07-11

Context:

- Expected launch traffic: 20 requests/minute, p95 retrieval budget 350 ms.
- Privacy review allows provider processing for support-ticket text with PII masking.
- The team has no GPU serving owner before launch.

Decision:

- Use the hosted embedding API behind the retrieval service interface.
- Store embedding_model, embedding_version, document_version, and trace_id with each indexed chunk.

Alternatives:

- Self-host small embedding model: lower provider dependency, higher operations burden.
- Delay semantic retrieval: lower risk, worse answer quality for paraphrased questions.

Consequences:

- Add provider timeout and fallback to keyword search in production integration.
- Reconsider self-hosting when traffic exceeds 200 requests/minute for four consecutive weeks.
```

This artifact is not runnable because an ADR is a governance object, but it is concrete enough for [requirements engineering](requirements-engineering.md), [api design](api-design.md), and [production integration](production-integration.md) to inspect. It names traffic, latency, privacy, owner, fallback, and a reconsideration trigger.

## Failure Modes

Decision records fail when they are written only for approvals, omit alternatives, or never get superseded after reality changes. A vague note saying "hosted is simpler" is not an ADR; it does not tell a future engineer which constraint mattered or when to revisit the choice.

## References

- [Architectural Decision Records](https://adr.github.io/)
- [MADR: Markdown Architectural Decision Records](https://adr.github.io/madr/)
- [arc42 Template Overview](https://arc42.org/overview)

> [!nav]
> **Section** — [Software Engineering](index.md)
>
> [← Behaviour Driven Development](behaviour-driven-development.md) [Documentation →](documentation.md)
