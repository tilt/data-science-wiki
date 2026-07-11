---
title: Structured Output
slug: generative-ai/structured-output
description: Concise guide to Structured Output in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - structured-output
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
# Structured Output

## Summary

Structured output constrains a model to return data in a machine-readable shape such as JSON matching a schema. It is essential when model output feeds software.

## Step-by-step example

For receipt extraction, define merchant, date, total, currency, and line items. Validate numeric totals, parse dates, and check each value against source text.

## Common failure modes

- Changing Structured Output without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Structured Output.
- Shipping Structured Output without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
