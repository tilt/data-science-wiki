---
title: Reranking
slug: information-retrieval-and-search/reranking
description: Concise guide to Reranking in Information Retrieval and Search.
area: information-retrieval-and-search
topics:
  - reranking
level: foundational
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
## Summary

Reranking reorders a smaller candidate set after an initial retrieval step. It lets a system use richer and more expensive signals only where they matter most.

## Core idea

Retrieval optimizes for broad candidate coverage under latency constraints. Reranking optimizes final ordering using features such as semantic similarity, freshness, authority, personalization, diversity, business rules, or cross-encoder scores.

## Scoring formulation

A reranker computes a score for each query-document pair after candidate generation:

$$
s_i = f(q, d_i, x_i),
$$

where $q$ is the query, $d_i$ is a candidate document, and $x_i$ contains optional features such as freshness, source quality, or user context. The final ranking sorts candidates by $s_i$, often after filters or diversity constraints.

Cross-encoder rerankers jointly encode query and document text, which improves interaction modelling but costs more than comparing precomputed embeddings.

## Step-by-step example

A search system retrieves 1,000 documents with BM25 and dense retrieval. A reranker scores the top 100 using the full query-document text, document freshness, source quality, and user context. The final page shows the top 10 after applying policy filters and diversity constraints.

## Model choices

Lightweight rerankers can use gradient-boosted trees or linear models over engineered features. Neural rerankers, especially cross-encoders, can be more accurate but are slower because they jointly encode the query and each candidate.

## Failure modes

Rerankers fail when first-stage retrieval misses the right candidates, when training labels reflect position bias, or when expensive reranking causes unacceptable latency. Evaluate the full retrieval-and-reranking pipeline, not only the reranker in isolation.
