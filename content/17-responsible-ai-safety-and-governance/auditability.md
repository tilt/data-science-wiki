---
title: Auditability
slug: responsible-ai-safety-and-governance/auditability
description: Concise guide to Auditability in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - auditability
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

Auditability is the ability to reconstruct what an AI system did, why it was allowed to do it, and which version of data, code, model, policy, and configuration was involved. It turns accountability from a claim into evidence.

## What to capture

Auditable systems keep durable records of model versions, dataset versions, prompts or policies, retrieval indexes, thresholds, human approvals, deployment events, input metadata, output metadata, and user-visible actions. The record should be specific enough to answer a later question without requiring memory from the original engineer.

## Example

If a loan application is declined, an audit trail should identify the scoring model version, feature snapshot, decision threshold, rule overrides, explanation shown to the applicant, and any human review. If only the final score is stored, the organization cannot explain whether the result came from a model change, stale data, or a policy rule.

## Design principles

Log decisions at system boundaries, use immutable identifiers, protect sensitive fields, and define retention rules. Audit logs should be queryable by incident responders and governance reviewers, not only by infrastructure administrators.

## Failure modes

Auditability fails when logs are incomplete, overwritten, unstructured, inaccessible, or full of raw personal data that creates new privacy risk.
