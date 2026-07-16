---
title: Vector Databases
slug: generative-ai/vector-databases
description: "Embedding indexes with metadata, filtering, and nearest-neighbor search for retrieval systems."
area: generative-ai
topics:
  - vector-databases
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - embeddings.md
  - retrieval-pipelines.md
  - hybrid-retrieval.md
  - reranking.md
  - rag.md
historical_context: false
last_reviewed: 2026-07-11
---

# Vector Databases

Vector databases store [embeddings](embeddings.md) together with document metadata so a query embedding can retrieve semantically nearby records. In [RAG](rag.md), the vector store is not the whole retrieval system; it is one stage between ingestion, filtering, [hybrid retrieval](hybrid-retrieval.md), [reranking](reranking.md), and context packing.

## Defining mechanism

Given normalized corpus vectors $x_i \in \mathbb{R}^d$ and a normalized query vector $q$, cosine search is equivalent to maximizing the dot product:

$$
\operatorname{score}(q,x_i)=q^\top x_i.
$$

Exact search computes that score for every vector. Production systems usually use approximate nearest-neighbor indexes such as HNSW or IVF-style partitioning to trade recall for latency and memory. The query path should apply authorization and freshness filters before unsafe chunks can reach [context construction](context-construction.md); filtering after retrieval can silently drop all useful evidence or expose records before policy checks.

## Concrete artifact

```json
{
  "id": "policy:refunds:chunk-007",
  "embedding_model": "text-embedding-3-large",
  "embedding_version": "2026-07-10",
  "text_sha256": "7b6f1f...",
  "metadata": {
    "document": "refund_policy",
    "policy_version": "2026-07",
    "acl": ["support", "billing"],
    "valid_from": "2026-07-01"
  }
}
```

This record is useful because it ties the vector to the chunk text, model version, permissions, and policy version. When the corpus is re-embedded, thresholds, cached neighbors, and evaluation baselines should be treated as index-version-specific.

## Caveats

Nearest neighbor is not the same as answer relevance. Dense retrieval can miss exact identifiers, dates, and rare terms; lexical retrieval can miss paraphrases. Approximate indexes can miss true neighbors, and metadata filters can dominate quality. Evaluate recall before [reranking](reranking.md), after reranking, and after final context packing.

## References

- [Faiss documentation](https://faiss.ai/)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)

> **Section — [Generative AI and Agentic Systems](index.md):** ← [Chunking](chunking.md) · [Retrieval Pipelines](retrieval-pipelines.md) →
