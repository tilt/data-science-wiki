---
title: Query Rewriting
slug: generative-ai/query-rewriting
description: Concise guide to Query Rewriting in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - query-rewriting
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
# Query Rewriting

## Summary

Query rewriting transforms a user request into one or more search queries that retrieve better evidence. It is useful when user language differs from document language.

## Step-by-step example

"Can I expense a train to the Berlin office?" may become searches for rail travel policy, office visit expenses, and commuting versus business travel.

## Common failure modes

- Changing Query Rewriting without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Query Rewriting.
- Shipping Query Rewriting without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
