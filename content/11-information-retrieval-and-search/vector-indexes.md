---
title: Vector Indexes
slug: information-retrieval-and-search/vector-indexes
description: Concise guide to Vector Indexes in Information Retrieval and Search.
area: information-retrieval-and-search
topics:
  - vector-indexes
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Vector Indexes

## Summary

Vector indexes organize embeddings so nearest-neighbour search is fast enough for large collections. They are the storage and retrieval layer behind many dense search systems.

## Step-by-step example

An HNSW index can retrieve candidate document embeddings for a query without scanning every vector in the corpus.

## Common failure modes

- Optimizing Vector Indexes on aggregate relevance while missing important query classes and hard negatives.
- Evaluating retrieval components separately when the user sees the combined retrieval, reranking, filtering, and presentation pipeline.
- Ignoring index freshness, permissions, latency, and failure behavior under empty or ambiguous queries.

- Confusing retrieval quality with downstream answer quality.
- Ignoring freshness, permissions, metadata filters, and operational latency.
