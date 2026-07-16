---
title: Vector Indexes
slug: information-retrieval-and-search/vector-indexes
description: "Data structures for storing embeddings and retrieving nearest vectors under latency constraints."
area: information-retrieval-and-search
topics:
  - vector-indexes
level: intermediate
status: review
page_type: implementation
aliases:
  - vector index
prerequisites:
  - index.md
related:
  - dense-retrieval.md
  - approximate-nearest-neighbour-search.md
  - hybrid-search.md
  - ../11-generative-ai/vector-databases.md
  - ../08-natural-language-processing/embeddings.md
historical_context: false
last_reviewed: 2026-07-11
---

# Vector Indexes

A vector index stores embeddings so [dense retrieval](dense-retrieval.md) can find nearest neighbors quickly. Small corpora can use exact matrix multiplication; large corpora usually need [approximate nearest-neighbour search](approximate-nearest-neighbour-search.md), quantization, sharding, or hardware-aware batching.

## Mechanism

For normalized vectors, exact top-$k$ search computes

$$
\operatorname{topk}_d\; q^\top x_d.
$$

An index changes how candidates are found, not the meaning of the similarity function. HNSW builds a navigable proximity graph; IVF partitions vectors into coarse cells; product or scalar quantization stores compressed approximations. Elasticsearch's `dense_vector` field exposes exact `flat` and HNSW-backed approximate index options.

## Worked example

This snippet compares exact cosine similarities with similarities after coarse vector quantization to show how indexing approximations can change neighbours.

```python
import numpy as np

rng = np.random.default_rng(4)
X = rng.normal(size=(8, 4))
X = X / np.linalg.norm(X, axis=1, keepdims=True)
q = np.array([0.4, -0.1, 0.8, 0.2])
q = q / np.linalg.norm(q)
exact = X @ q
Xq = np.round(X * 32).astype(int) / 32
approx = Xq @ q
print("exact_top3", [(int(i), round(float(exact[i]), 3)) for i in np.argsort(exact)[::-1][:3]])
print("quantized_top3", [(int(i), round(float(approx[i]), 3)) for i in np.argsort(approx)[::-1][:3]])
```

Observed output:

```text
exact_top3 [(0, 0.692), (6, 0.256), (7, 0.137)]
quantized_top3 [(0, 0.695), (6, 0.261), (7, 0.136)]
```

This toy quantization preserves the top three, but real compression can reorder close neighbors. That is why vector-index changes should be evaluated with recall@k before they are judged by latency alone.

## Caveats

Index parameters are product decisions: higher recall usually costs memory, build time, or query latency. Filtering can also break assumptions; applying metadata filters after ANN retrieval may drop good candidates, while filtering before search can fragment the graph. [Hybrid search](hybrid-search.md) reduces some risk by keeping lexical candidates alongside vector candidates.

## References

- [Malkov and Yashunin, Efficient and robust approximate nearest neighbor search using HNSW](https://arxiv.org/abs/1603.09320)
- [Elasticsearch Reference: dense_vector field type](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/dense-vector)
- [scikit-learn User Guide: Nearest Neighbors](https://scikit-learn.org/stable/modules/neighbors.html)

> [!nav]
> **Section** — [Information Retrieval and Search](index.md)
>
> [← Reranking](reranking.md) [Approximate Nearest Neighbour Search →](approximate-nearest-neighbour-search.md)
