---
title: Elasticsearch
slug: information-retrieval-and-search/elasticsearch
description: "A Lucene-backed distributed search engine for indexed text, filters, aggregations, and vectors."
area: information-retrieval-and-search
topics:
  - elasticsearch
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - inverted-indexes.md
  - bm25.md
  - elk-stack.md
  - vector-indexes.md
  - hybrid-search.md
historical_context: false
last_reviewed: 2026-07-11
---
# Elasticsearch

Elasticsearch is a distributed search engine built on Lucene. It exposes [inverted indexes](inverted-indexes.md), [BM25](bm25.md)-style text scoring, filters, aggregations, and vector search through JSON APIs. It is a search platform, not just a ranking formula: mappings, analyzers, shards, refreshes, and operational limits shape relevance and latency.

## Mechanism

An index maps fields to types and analyzers. A text query is analyzed into terms, matched against postings, scored by the configured similarity, then combined with filters and aggregations. For vector fields, Elasticsearch can store `dense_vector` values and index them for kNN search using HNSW-backed options, which connects it to [vector indexes](vector-indexes.md).

## Concrete artifact

This minimal mapping and query are sourced from the current Elasticsearch API shape: `text` fields support lexical `match`, `dense_vector` supports kNN-style vector retrieval, and similarity can be configured per index.

```json
PUT docs
{
  "settings": {
    "index": {
      "similarity": {
        "default": {
          "type": "BM25",
          "k1": 1.2,
          "b": 0.75
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "body": { "type": "text" },
      "embedding": {
        "type": "dense_vector",
        "dims": 3,
        "index": true,
        "similarity": "cosine"
      }
    }
  }
}
```

```json
GET docs/_search
{
  "query": {
    "match": {
      "body": {
        "query": "hybrid search bm25 dense",
        "operator": "and"
      }
    }
  }
}
```

This artifact is intentionally not shown with output: no cluster was run in this workspace. It is a real minimal API-shaped example grounded in Elastic's mapping, match-query, and similarity documentation.

## Where it fits

Elasticsearch is often the lexical backbone in [hybrid search](hybrid-search.md) systems, with dense candidates added through vector fields or an external vector database. In the [ELK stack](elk-stack.md), the same indexing engine stores logs and events for operational search rather than user-facing document search.

## Caveats

The hard bugs are usually not in the query JSON. Analyzer drift, refresh latency, shard sizing, fielddata mistakes, relevance regressions, and security filters can change behavior without changing application code. Treat mapping changes like schema migrations and evaluate them with [search evaluation](search-evaluation.md) before rollout.

## References

- [Elasticsearch Reference: Match query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query)
- [Elasticsearch Reference: Similarity settings](https://www.elastic.co/docs/reference/elasticsearch/index-settings/similarity)
- [Elasticsearch Reference: dense_vector field type](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/dense-vector)
