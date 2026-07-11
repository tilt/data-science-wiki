---
title: Top-k and Top-p Sampling
slug: generative-ai/top-k-and-top-p-sampling
description: Concise guide to Top-k and Top-p Sampling in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - top-k-and-top-p-sampling
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
# Top-k and Top-p Sampling

## Summary

Top-k and top-p sampling restrict which next tokens may be sampled. They balance diversity, coherence, and the risk of unlikely token choices.

## Step-by-step example

Top-k keeps a fixed number of likely tokens. Top-p keeps the smallest token set whose cumulative probability reaches a threshold, so it adapts to distribution shape.

## Common failure modes

- Changing Top-k and Top-p Sampling without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Top-k and Top-p Sampling.
- Shipping Top-k and Top-p Sampling without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
