---
title: Reflection and Reviewer Patterns
slug: generative-ai/reflection-and-reviewer-patterns
description: Concise guide to Reflection and Reviewer Patterns in Generative AI
  and Agentic Systems.
area: generative-ai
topics:
  - reflection-and-reviewer-patterns
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
# Reflection and Reviewer Patterns

## Summary

Reflection and reviewer patterns ask a model, another model, or a separate step to critique, verify, or improve an output. They help, but do not replace evidence or deterministic checks.

## Step-by-step example

For generated SQL, a reviewer prompt can inspect intent, but a stronger workflow also runs the query on test data and checks expected columns.

## Common failure modes

- Changing Reflection and Reviewer Patterns without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Reflection and Reviewer Patterns.
- Shipping Reflection and Reviewer Patterns without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
