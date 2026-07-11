---
title: Agent Loops
slug: generative-ai/agent-loops
description: Concise guide to Agent Loops in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - agent-loops
level: advanced
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
# Agent Loops

## Summary

An agent loop is the repeated observe-reason-act cycle that turns a one-shot model call into an iterative workflow. It tracks the user goal, intermediate observations, tool outputs, errors, budget, and stopping condition.

## Step-by-step example

A code assistant may inspect files, run tests, read failures, patch code, rerun tests, and summarize remaining risk. The loop should stop when tests pass or when the same blocker repeats.

## Common failure modes

- Changing Agent Loops without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Agent Loops.
- Shipping Agent Loops without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
