---
title: Alignment
slug: generative-ai/alignment
description: Concise guide to Alignment in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - alignment
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
# Alignment

## Summary

Alignment is the work of making model behavior fit human intent, domain policy, and context. In applications it includes training, instruction hierarchy, guardrails, evaluation, monitoring, and external controls.

## Step-by-step example

A medical information assistant should use approved sources, refuse diagnosis requests, cite evidence, route urgent cases to human help, and log high-risk interactions for review.

## Common failure modes

- Changing Alignment without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Alignment.
- Shipping Alignment without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
