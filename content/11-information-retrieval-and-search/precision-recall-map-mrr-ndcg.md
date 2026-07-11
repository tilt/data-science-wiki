---
title: Precision, Recall, MAP, MRR, and NDCG
slug: information-retrieval-and-search/precision-recall-map-mrr-ndcg
description: Navigation page for the core ranking and retrieval metrics.
area: information-retrieval-and-search
topics:
  - "precision"
  - "recall"
  - "map"
  - "mrr"
  - "ndcg"
level: foundational
status: review
page_type: reference
aliases: []
prerequisites:
  - "search-evaluation.md"
related:
  - "ranking-and-retrieval-metrics.md"
historical_context: false
last_reviewed: 2026-07-11
references: []
---
# Precision, Recall, MAP, MRR, and NDCG

## Summary

These are common metrics for evaluating ranked search and retrieval results. They answer different questions: how many returned items are relevant, how many known relevant items were found, how early the first relevant result appears, and whether highly relevant results are ranked above weakly relevant ones.

## Quick definitions

- [Precision at k](ranking-and-retrieval-metrics.md#precision-at-k): among the top $k$ results, the fraction that are relevant.
- [Recall at k](ranking-and-retrieval-metrics.md#recall-at-k): among all known relevant items, the fraction found in the top $k$.
- [Mean average precision](ranking-and-retrieval-metrics.md#mean-average-precision): averages precision after each relevant result and then averages across queries.
- [Mean reciprocal rank](ranking-and-retrieval-metrics.md#mean-reciprocal-rank): rewards placing the first relevant result early.
- [Normalized discounted cumulative gain](ranking-and-retrieval-metrics.md#normalized-discounted-cumulative-gain): rewards graded relevance near the top of the ranking.
- [Source coverage](ranking-and-retrieval-metrics.md#source-coverage): checks whether required evidence sources appear in retrieved context.

## Choosing a metric

Use precision-oriented metrics when user attention is scarce and bad top results are costly. Use recall-oriented metrics when missing evidence is dangerous, as in legal, medical, compliance, or RAG source retrieval. Use graded relevance metrics when some results are much better than others.

## When to use this page

Use this as the quick navigation page when another article mentions a metric. Use the canonical metric page for detailed formulas, examples, and metric-selection guidance: [Ranking and Retrieval Metrics](ranking-and-retrieval-metrics.md).
