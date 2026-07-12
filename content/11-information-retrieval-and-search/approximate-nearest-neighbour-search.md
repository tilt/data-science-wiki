---
title: Approximate Nearest Neighbour Search
slug: information-retrieval-and-search/approximate-nearest-neighbour-search
description: "Nearest-neighbor retrieval that trades exact recall for lower latency and memory cost."
area: information-retrieval-and-search
topics:
  - approximate-nearest-neighbour-search
level: intermediate
status: review
page_type: algorithm
aliases:
  - ANN search
  - approximate nearest neighbor search
prerequisites:
  - index.md
related:
  - vector-indexes.md
  - dense-retrieval.md
  - hybrid-search.md
  - ranking-and-retrieval-metrics.md
  - ../10-generative-ai/vector-databases.md
historical_context: false
last_reviewed: 2026-07-11
---
# Approximate Nearest Neighbour Search

Approximate nearest-neighbour search returns vectors that are close to a query without proving they are the exact nearest vectors. It is what lets [vector indexes](vector-indexes.md) serve [dense retrieval](dense-retrieval.md) over millions or billions of embeddings under interactive latency.

## Defining mechanism

Exact search solves

$$
\operatorname{NN}_k(q)=\operatorname{arg\,topk}_{x_i\in X} \operatorname{sim}(q,x_i).
$$

ANN searches a smaller candidate set $C(q)\subset X$ and measures quality with recall:

$$
\operatorname{recall@k}=\frac{|\operatorname{ANN}_k(q)\cap\operatorname{Exact}_k(q)|}{k}.
$$

HNSW does this with greedy routing over a layered proximity graph; partitioning methods do it by searching only promising cells; quantized indexes trade vector precision for smaller memory footprints.

## Worked example

```python
import numpy as np

rng = np.random.default_rng(21)
X = np.vstack([
    rng.normal(loc=[0, 0], scale=.25, size=(30, 2)),
    rng.normal(loc=[2, 2], scale=.25, size=(30, 2)),
    rng.normal(loc=[0, 2], scale=.25, size=(30, 2)),
])
q = np.array([1.72, 1.83])
dist_all = np.linalg.norm(X - q, axis=1)
exact = np.argsort(dist_all)[:5]
candidates = np.where((X[:, 0] > 1) & (X[:, 1] > 1))[0]
dist = np.linalg.norm(X[candidates] - q, axis=1)
ann = candidates[np.argsort(dist)[:5]]
print("exact_top5", [int(i) for i in exact])
print("cell_candidates", int(len(candidates)), "ann_top5", [int(i) for i in ann],
      "recall_at5", round(len(set(exact) & set(ann)) / 5, 2))
```

Observed output:

```text
exact_top5 [31, 59, 48, 35, 46]
cell_candidates 30 ann_top5 [31, 59, 48, 35, 46] recall_at5 1.0
```

The coarse cell reduced the scan from 90 vectors to 30 without losing top-5 neighbors for this query. On harder queries near cell boundaries, recall can fall.

## Caveats

ANN benchmarks must report both latency and recall@k. A faster index that drops the only relevant passage hurts [search evaluation](search-evaluation.md) even if average vector distance looks close. Filtering, deletions, and frequent updates can degrade graph structure or candidate coverage, so production systems often keep a rerank or exact-rescore stage after ANN retrieval.

## References

- [Malkov and Yashunin, Efficient and robust approximate nearest neighbor search using HNSW](https://arxiv.org/abs/1603.09320)
- [Elasticsearch Reference: dense_vector field type](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/dense-vector)
- [scikit-learn User Guide: Nearest Neighbors](https://scikit-learn.org/stable/modules/neighbors.html)
