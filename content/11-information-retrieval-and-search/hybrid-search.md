---
title: Hybrid Search
slug: information-retrieval-and-search/hybrid-search
description: Concise guide to Hybrid Search in Information Retrieval and Search.
area: information-retrieval-and-search
topics:
  - hybrid-search
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Hybrid Search

## Summary

Hybrid search combines lexical, dense, metadata, or graph retrieval signals. It is used because different query types need different matching behavior.

## Step-by-step example

A support search system may combine BM25 for product codes, dense retrieval for paraphrases, and filters for product version.

## Common failure modes

- Optimizing Hybrid Search on aggregate relevance while missing important query classes and hard negatives.
- Evaluating retrieval components separately when the user sees the combined retrieval, reranking, filtering, and presentation pipeline.
- Ignoring index freshness, permissions, latency, and failure behavior under empty or ambiguous queries.

- Confusing retrieval quality with downstream answer quality.
- Ignoring freshness, permissions, metadata filters, and operational latency.
