---
title: Agentic Systems
slug: generative-ai/agentic-systems
description: Concise guide to Agentic Systems in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - agentic-systems
level: advanced
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Agentic Systems

## Summary

An agentic system uses a language model inside a control loop that can inspect state, choose actions, call tools, evaluate intermediate results, and decide whether to continue. The design problem is deciding which choices belong to model judgement and which must be enforced by application code.

## Step-by-step example

A research assistant can search sources, inspect passages, draft an answer, verify citations, and stop only when evidence supports the response. Search and verification should be external services; the model should not be the only judge of success.

## Common failure modes

- Changing Agentic Systems without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Agentic Systems.
- Shipping Agentic Systems without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
