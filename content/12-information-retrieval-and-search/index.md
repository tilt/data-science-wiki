---
title: Information Retrieval and Search
slug: 12-information-retrieval-and-search
description: "Learning map for lexical search, dense retrieval, hybrid retrieval, ranking metrics, and search systems."
area: information-retrieval-and-search
topics:
  - inverted-indexes
  - tf-idf
  - bm25
  - dense-retrieval
  - sparse-retrieval
  - hybrid-search
  - approximate-nearest-neighbour-search
  - vector-indexes
  - reranking
  - search-evaluation
  - precision-recall-map-mrr-ndcg
  - elasticsearch
level: foundational
status: review
page_type: area-index
aliases:
  - Information Retrieval and Search
prerequisites:
  - ../02-probability-and-statistics/index.md
  - ../08-natural-language-processing/index.md
related:
  - ../11-generative-ai/index.md
  - ../04-recommendation-systems/index.md
  - ../17-experimentation-and-evaluation/index.md
historical_context: false
last_reviewed: 2026-07-11
---

# Information Retrieval and Search

Information retrieval is the engineering and measurement discipline behind finding useful material in a collection. This section moves from lexical indexes and ranking formulas to vector retrieval, hybrid systems, graph retrieval, and evaluation.

## Lexical Core

- [Inverted Indexes](inverted-indexes.md): postings lists, positions, and candidate generation.
- [TF-IDF](tf-idf.md): sparse vector weighting with term frequency and inverse document frequency.
- [BM25](bm25.md): lexical ranking with term-frequency saturation and document-length normalization.
- [Sparse Retrieval](sparse-retrieval.md): the broader term-feature retrieval family.

## Dense And Hybrid Retrieval

- [Dense Retrieval](dense-retrieval.md): embedding-based semantic retrieval.
- [Vector Indexes](vector-indexes.md): exact, compressed, and approximate vector search structures.
- [Approximate Nearest Neighbour Search](approximate-nearest-neighbour-search.md): recall-latency trade-offs for vector retrieval.
- [Hybrid Search](hybrid-search.md): fusion of lexical, dense, graph, or metadata signals.
- [Reranking](reranking.md): second-stage ordering with richer features or cross-encoders.

## Evaluation

- [Ranking and Retrieval Metrics](ranking-and-retrieval-metrics.md): precision@k, recall@k, MAP, [MRR](precision-recall-map-mrr-ndcg.md), and [NDCG](precision-recall-map-mrr-ndcg.md).
- [Precision, Recall, MAP, MRR, and NDCG](precision-recall-map-mrr-ndcg.md): compact metric glossary.
- [Search Evaluation](search-evaluation.md): labelled query sets, slices, offline evaluation, and online checks.

## Systems And Structure

- [Elasticsearch](elasticsearch.md): Lucene-backed indexed search and vector fields.
- [ELK Stack](elk-stack.md): ingest, index, search, and visualize operational events.
- [Knowledge Graphs](knowledge-graphs.md): entity-relation retrieval and graph patterns.
- [Graph Based Retrieval](graph-based-retrieval.md): retrieval through links, citations, and typed neighborhoods.
- [Literature Management Search Systems](literature-management-search-systems.md): search over papers, metadata, notes, and citation graphs.

> **Learning path — Information retrieval and search:** [path overview](../00-home-and-navigation/learning-paths.md#information-retrieval-and-search) · [Inverted Indexes](inverted-indexes.md) →
