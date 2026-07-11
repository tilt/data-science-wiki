---
title: Agent Evaluation
slug: generative-ai/agent-evaluation
description: Concise guide to Agent Evaluation in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - agent-evaluation
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
# Agent Evaluation

## Summary

Agent evaluation measures whether an iterative AI workflow completes tasks reliably, safely, and within operational limits. It must evaluate the loop, tool calls, state transitions, and final outcome.

## Step-by-step example

For a support agent, test password reset, refund request, ambiguous policy question, and hostile prompt injection. Grade the trace: expected tool calls, forbidden actions, final answer, and escalation behavior.

## Common failure modes

- Changing Agent Evaluation without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Agent Evaluation.
- Shipping Agent Evaluation without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
