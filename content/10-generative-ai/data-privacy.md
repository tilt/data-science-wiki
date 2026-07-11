---
title: Data Privacy
slug: generative-ai/data-privacy
description: Concise guide to Data Privacy in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - data-privacy
level: intermediate
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
# Data Privacy

## Summary

Data privacy controls what information is collected, sent to models, stored in logs, retrieved into context, and shown in outputs. Privacy failures often happen at system boundaries.

## Step-by-step example

For an HR assistant, restrict retrieval by employee permissions, avoid logging raw sensitive messages, and fetch salary records only through audited tools when necessary.

## Common failure modes

- Changing Data Privacy without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Data Privacy.
- Shipping Data Privacy without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
