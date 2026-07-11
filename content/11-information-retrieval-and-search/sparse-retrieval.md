---
title: Sparse Retrieval
slug: information-retrieval-and-search/sparse-retrieval
description: Concise guide to Sparse Retrieval in Information Retrieval and Search.
area: information-retrieval-and-search
topics:
  - sparse-retrieval
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
# Sparse Retrieval

## Summary

Sparse retrieval represents queries and documents with sparse term-based features such as words, subwords, or weighted lexical terms. It is the classic alternative to dense vector retrieval.

## Step-by-step example

TF-IDF and BM25 retrieve documents that share important terms with the query, making them strong for exact names and technical vocabulary.

## Common failure modes

- Optimizing Sparse Retrieval on aggregate relevance while missing important query classes and hard negatives.
- Evaluating retrieval components separately when the user sees the combined retrieval, reranking, filtering, and presentation pipeline.
- Ignoring index freshness, permissions, latency, and failure behavior under empty or ambiguous queries.

- Confusing retrieval quality with downstream answer quality.
- Ignoring freshness, permissions, metadata filters, and operational latency.
