---
title: Foundation Models
slug: generative-ai/foundation-models
description: Concise guide to Foundation Models in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - foundation-models
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Foundation Models

## Summary

A foundation model is a large pretrained model intended to support many downstream tasks through prompting, retrieval, adaptation, or tool use. It is a reusable component, not a complete product.

## Step-by-step example

A contract-review assistant may start with a general language model, then add a contract corpus, citations, schemas, reviewer workflows, and tests for hallucinated clauses.

## Common failure modes

- Changing Foundation Models without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Foundation Models.
- Shipping Foundation Models without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
