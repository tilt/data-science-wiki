---
title: Multi Agent Systems
slug: generative-ai/multi-agent-systems
description: Concise guide to Multi Agent Systems in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - multi-agent-systems
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
# Multi Agent Systems

## Summary

A multi-agent system uses multiple model-driven roles or workflows that communicate or coordinate. It is useful only when roles have distinct information, tools, or review responsibilities.

## Step-by-step example

For a report, one role gathers sources, another drafts, another checks claims against citations, and a policy checker rejects unsupported statements.

## Common failure modes

- Changing Multi Agent Systems without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Multi Agent Systems.
- Shipping Multi Agent Systems without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
