---
title: Software Architecture
slug: software-engineering/software-architecture
description: Core architectural concerns for maintainable data, ML, and AI systems.
area: software-engineering
topics:
  - "software-architecture"
  - "system-design"
  - "production-integration"
level: intermediate
status: review
page_type: concept
aliases:
  - "Architecture"
prerequisites:
  - "api-design.md"
related:
  - "../13-ml-engineering-and-mlops/index.md"
  - "../14-cloud-and-distributed-systems/index.md"
historical_context: false
last_reviewed: 2026-07-11
references:
  - "martin-2017-clean-architecture"
  - "iso-25010-2011"
---
# Software Architecture

## Summary

Software architecture is the set of structural decisions that shape how a system changes, fails, scales, and integrates. In ML and AI systems, architecture must account for data contracts, model versioning, evaluation, observability, privacy, and rollback paths.

## Why it matters

Model quality is rarely enough. Production systems fail at boundaries: data ingestion, schema drift, service contracts, hidden coupling, operational ownership, cost, and unclear failure handling.

## Architectural views

- Data view: sources, transformations, contracts, lineage, retention, and access control.
- Model view: training, evaluation, registry, serving, rollback, and monitoring.
- Runtime view: APIs, queues, batch jobs, caches, dependencies, and failure isolation.
- Governance view: ownership, audit trails, privacy boundaries, and approval paths.

## Useful questions

- What are the system boundaries?
- Which decisions are hard to reverse?
- How does data flow through training, evaluation, and serving?
- Where can the system fail safely?
- What must be observable for incident response?
- Which interfaces must remain stable?

## Step-by-step example

For a document-understanding product, separate ingestion, OCR, retrieval, model inference, validation, and review queues. Define contracts between each stage. Store model version, prompt version, source document version, and output schema version with every prediction. Add rollback paths for both service code and model behavior.

## Related topics

- [API Design](api-design.md)
- [Production Integration](production-integration.md)
- [ML System Lifecycle](../13-ml-engineering-and-mlops/ml-system-lifecycle.md)
