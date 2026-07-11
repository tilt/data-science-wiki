---
title: Tool Schemas
slug: generative-ai/tool-schemas
description: Concise guide to Tool Schemas in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - tool-schemas
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
# Tool Schemas

## Summary

Tool schemas define the machine-readable contract for model-proposed tool calls: tool name, arguments, types, required fields, enums, and descriptions.

## Step-by-step example

A search tool may require a query, optional date range, and allowed source types. Invalid or missing arguments should be rejected before execution.

## Common failure modes

- Changing Tool Schemas without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Tool Schemas.
- Shipping Tool Schemas without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
