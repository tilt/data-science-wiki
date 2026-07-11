---
title: Grounding
slug: generative-ai/grounding
description: Concise guide to Grounding in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - grounding
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
# Grounding

## Summary

Grounding ties a model answer to specified evidence, data, tools, or observations. A grounded answer is traceable to what the system was allowed to know for that request.

## Step-by-step example

For warranty coverage, retrieve the policy, answer only from the relevant clause, and refuse when evidence for the product is missing.

## Common failure modes

- Changing Grounding without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Grounding.
- Shipping Grounding without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
