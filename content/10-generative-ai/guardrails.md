---
title: Guardrails
slug: generative-ai/guardrails
description: Concise guide to Guardrails in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - guardrails
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
# Guardrails

## Summary

Guardrails constrain, validate, or route model behavior. They can be prompts, schemas, classifiers, retrieval filters, policy engines, human review queues, or deterministic checks.

## Step-by-step example

For invoice processing, use a schema, validate totals, check source spans, enforce vendor permissions, and route mismatches to human review.

## Common failure modes

- Changing Guardrails without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Guardrails.
- Shipping Guardrails without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
