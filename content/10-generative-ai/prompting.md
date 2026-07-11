---
title: Prompting
slug: generative-ai/prompting
description: Concise guide to Prompting in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - prompting
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
# Prompting

## Summary

Prompting specifies a model task through instructions, context, examples, constraints, and desired output format. A good prompt narrows ambiguity; it does not replace system design.

## Step-by-step example

A better summarization prompt states audience, maximum length, required sections, facts to preserve, and what to do if the source is incomplete.

## Common failure modes

- Changing Prompting without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Prompting.
- Shipping Prompting without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.

## Mechanism

A prompt defines task framing, constraints, examples, available evidence, output format, and refusal conditions. In production, prompt changes should be treated like code changes: versioned, tested on regression examples, and reviewed for side effects on safety, formatting, and latency.
