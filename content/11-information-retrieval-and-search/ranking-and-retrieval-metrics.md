---
title: Ranking and Retrieval Metrics
slug: information-retrieval-and-search/ranking-and-retrieval-metrics
description: Concise explanations of precision@k, recall@k, MRR, NDCG, MAP, and source coverage.
area: information-retrieval-and-search
topics:
  - "search-evaluation"
  - "retrieval-metrics"
  - "ranking-metrics"
level: intermediate
status: draft
page_type: reference
aliases:
  - "Retrieval metrics"
  - "Ranking metrics"
  - "Precision recall MAP MRR NDCG"
prerequisites:
  - "search-evaluation.md"
related:
  - "../10-generative-ai/rag-evaluation.md"
  - "precision-recall-map-mrr-ndcg.md"
historical_context: false
last_reviewed: 2026-07-11
references: []
---
# Ranking and Retrieval Metrics

## Summary

Ranking and retrieval metrics measure whether a search or retrieval system returns useful items near the top of the result list. They are central for search, recommender candidate generation, and RAG pipelines.

## Precision at k

Precision at k measures the fraction of the top $k$ results that are relevant:

$$
\mathrm{Precision@k} = \frac{\text{relevant results in top } k}{k}
$$

Use it when top-result quality matters and each false positive has a cost.

## Recall at k

Recall at k measures the fraction of all relevant items that appear in the top $k$:

$$
\mathrm{Recall@k} = \frac{\text{relevant results in top } k}{\text{all relevant results}}
$$

Use it when missing relevant evidence is costly, as in RAG retrieval or legal/document search.

## Mean reciprocal rank

MRR focuses on the rank of the first relevant result:

$$
\mathrm{RR} = \frac{1}{\text{rank of first relevant result}}
$$

MRR averages reciprocal rank across queries. It is useful when one good result is enough.

## Normalized discounted cumulative gain

NDCG supports graded relevance. It rewards relevant results near the top and discounts lower ranks:

$$
\mathrm{DCG@k} = \sum_{i=1}^{k} \frac{rel_i}{\log_2(i+1)}
$$

NDCG divides DCG by the ideal DCG for the same query, producing a normalized score.

## Mean average precision

MAP averages precision at each rank where a relevant item appears, then averages across queries. It rewards systems that retrieve many relevant items and rank them early.

## Source coverage

Source coverage measures whether retrieval spans the sources needed to answer a query. In RAG, this may mean retrieving all required documents, all required sections, or at least one source from each required evidence category.

## Choosing a metric

- Use precision@k when users inspect only a few results.
- Use recall@k when missing evidence is the main risk.
- Use MRR when the first relevant hit matters.
- Use NDCG when relevance is graded.
- Use MAP when many relevant documents should be found and ranked well.
- Use source coverage when answers require evidence from multiple sources.
