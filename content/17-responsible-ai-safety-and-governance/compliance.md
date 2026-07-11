---
title: Compliance
slug: responsible-ai-safety-and-governance/compliance
description: Concise guide to Compliance in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - compliance
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

Compliance maps an AI system to applicable laws, standards, contracts, and internal policies. It is a workflow for identifying obligations, producing evidence, and keeping releases within approved boundaries.

## Core idea

A compliance process starts by classifying the use case: domain, affected users, decision impact, geography, data categories, autonomy level, and human review. The team then maps the system to requirements such as privacy controls, documentation, risk assessment, security review, accessibility, retention, and user notice.

## Practical workflow

1. Describe the system and its intended use.
2. Identify regulated data, high-impact decisions, and affected jurisdictions.
3. Record required controls and evidence owners.
4. Review changes before release, not only after incidents.
5. Reassess when the model, data source, policy, or user population changes.

## Example

A resume-screening model needs stronger compliance evidence than an internal meeting summarizer because it affects employment opportunities. The team should document training data, evaluation by relevant groups, human review, appeals process, data retention, and monitoring for drift or bias.

## Failure modes

Compliance fails when treated as a final approval checkbox, when teams cannot produce evidence, or when a model is reused for a higher-risk purpose than the one originally reviewed.
