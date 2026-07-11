---
title: Reranking
slug: generative-ai/reranking
description: Concise guide to Reranking in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - reranking
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
# Reranking

## Summary

Reranking applies a stronger or more task-specific scoring step after initial retrieval. In RAG, it improves the order of candidate chunks before context construction.

## Mechanism

A retriever first returns candidates $c_{1:n}$. A reranker computes a query-specific score,

$$
s_i=f(q,c_i),
$$

and keeps the best chunks under the context budget. In RAG, this is valuable because the generator often sees only a small number of chunks; moving the right evidence from rank 30 to rank 3 can change the answer.

## Step-by-step example

A hybrid retriever returns 100 policy chunks; a reranker scores them against the exact question and promotes the passages that answer it directly.

## Common failure modes

- Improving average relevance while demoting rare but critical evidence.
- Adding a cross-encoder reranker without measuring tail latency and context-budget impact.
- Training on click or judgment data that reflects old ranking position bias.
