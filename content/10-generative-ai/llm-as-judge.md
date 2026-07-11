---
title: LLM-as-Judge
slug: generative-ai/llm-as-judge
description: Concise guide to LLM-as-Judge in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - llm-as-judge
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
# LLM-as-Judge

## Summary

LLM-as-judge uses a model to grade, compare, or label outputs from another system. It helps with scalable review of open-ended outputs, but it must be checked against human judgement.

## Step-by-step example

For a RAG assistant, a judge can classify an answer as supported, partially supported, unsupported, or appropriately refused using the retrieved passages and a rubric.

## Common failure modes

- Changing LLM-as-Judge without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by LLM-as-Judge.
- Shipping LLM-as-Judge without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
