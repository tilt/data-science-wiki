---
title: Hybrid Retrieval
slug: generative-ai/hybrid-retrieval
description: Concise guide to Hybrid Retrieval in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - hybrid-retrieval
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
# Hybrid Retrieval

## Summary

Hybrid retrieval combines lexical search and dense vector retrieval. It is common in RAG because exact terms and semantic similarity catch different relevant documents.

## Step-by-step example

For "pause billing," dense retrieval may find subscription-suspension pages while lexical search finds the exact FAQ phrase. Hybrid retrieval can include both.

## Common failure modes

- Changing Hybrid Retrieval without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Hybrid Retrieval.
- Shipping Hybrid Retrieval without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.
