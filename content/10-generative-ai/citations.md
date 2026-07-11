---
title: Citations
slug: generative-ai/citations
description: Concise guide to Citations in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - citations
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
# Citations

## Summary

Citations connect generated claims to source evidence. They are useful only when the cited passage supports the specific claim being made.

## Step-by-step example

A policy answer about manager approval should cite the exact policy section stating that condition, not only the general HR handbook.

## Common failure modes

- Changing Citations without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Citations.
- Shipping Citations without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
