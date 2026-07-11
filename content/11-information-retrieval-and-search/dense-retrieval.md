---
title: Dense Retrieval
slug: information-retrieval-and-search/dense-retrieval
description: Concise guide to Dense Retrieval in Information Retrieval and Search.
area: information-retrieval-and-search
topics:
  - dense-retrieval
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
# Dense Retrieval

## Summary

Dense retrieval represents queries and documents as vectors and retrieves by vector similarity. It captures semantic similarity beyond exact term overlap.

## Step-by-step example

A query for "cancel my subscription" may retrieve a document titled "terminate recurring billing" because the embedding model places them near each other.

## Common failure modes

- Optimizing Dense Retrieval on aggregate relevance while missing important query classes and hard negatives.
- Evaluating retrieval components separately when the user sees the combined retrieval, reranking, filtering, and presentation pipeline.
- Ignoring index freshness, permissions, latency, and failure behavior under empty or ambiguous queries.

- Confusing retrieval quality with downstream answer quality.
- Ignoring freshness, permissions, metadata filters, and operational latency.
