---
title: Tool Routing
slug: generative-ai/tool-routing
description: Concise guide to Tool Routing in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - tool-routing
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
# Tool Routing

## Summary

Tool routing decides whether a model should answer directly or request a specific external tool. Correct routing combines model judgement with application policy.

## Step-by-step example

A travel assistant routes weather questions to a weather API, itinerary edits to a calendar tool, and payments to a confirmation workflow.

## Common failure modes

- Changing Tool Routing without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Tool Routing.
- Shipping Tool Routing without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
