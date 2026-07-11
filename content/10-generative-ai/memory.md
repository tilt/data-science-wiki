---
title: Memory
slug: generative-ai/memory
description: Concise guide to Memory in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - memory
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
# Memory

## Summary

Memory is persisted information used across turns, sessions, or tasks. It can improve continuity, but it introduces privacy, staleness, and user-control problems.

## Step-by-step example

A tutor may remember that a learner prefers worked examples, but it should not silently retain sensitive personal details from a casual message.

## Common failure modes

- Changing Memory without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Memory.
- Shipping Memory without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
