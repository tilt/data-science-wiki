---
title: Privacy
slug: responsible-ai-safety-and-governance/privacy
description: Concise guide to Privacy in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - privacy
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Privacy governs how personal data is collected, used, shared, retained, and protected. In AI systems, privacy must be designed into data pipelines, prompts, retrieval, training, evaluation, logging, and human review workflows.

## Core principles

Practical privacy work starts with purpose limitation, data minimization, access control, retention rules, transparency, and deletion or correction workflows where applicable. The system should use only the personal data needed for the task and expose it only to authorized components.

## Example

A customer-support assistant may need the current user's account status, but not every historical support message from the account. Retrieval should filter by authorization and task relevance, and logs should avoid storing raw sensitive content unless there is a justified retention policy.

## AI-specific concerns

Model training can memorize rare strings, retrieval can surface sensitive documents, and observability can copy personal data into secondary systems. Privacy review should include all derived artifacts, not only the original database.

## Failure modes

Privacy fails when teams collect data "just in case", mix production data into experiments, or cannot trace where personal data moved after ingestion.
