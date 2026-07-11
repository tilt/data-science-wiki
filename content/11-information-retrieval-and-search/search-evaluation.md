---
title: Search Evaluation
slug: information-retrieval-and-search/search-evaluation
description: Concise guide to Search Evaluation in Information Retrieval and Search.
area: information-retrieval-and-search
topics:
  - search-evaluation
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
# Search Evaluation

## Summary

Search evaluation measures whether a retrieval system returns relevant results for real information needs. It requires queries, relevance labels, metrics, and failure inspection.

## Step-by-step example

For FAQ search, create labelled queries, run the search system, compute recall and ranking metrics, then inspect queries where known answers are missing.

## Common failure modes

- Optimizing Search Evaluation on aggregate relevance while missing important query classes and hard negatives.
- Evaluating retrieval components separately when the user sees the combined retrieval, reranking, filtering, and presentation pipeline.
- Ignoring index freshness, permissions, latency, and failure behavior under empty or ambiguous queries.

- Confusing retrieval quality with downstream answer quality.
- Ignoring freshness, permissions, metadata filters, and operational latency.
