---
title: Ranking and Retrieval Metrics
slug: information-retrieval-and-search/ranking-and-retrieval-metrics
description: "Precision@k, recall@k, MAP, MRR, NDCG, and related measures for ranked retrieval."
area: information-retrieval-and-search
topics:
  - search-evaluation
  - retrieval-metrics
  - ranking-metrics
level: intermediate
status: review
page_type: reference
aliases:
  - Retrieval metrics
  - Ranking metrics
  - Precision recall MAP MRR NDCG
prerequisites:
  - search-evaluation.md
related:
  - precision-recall-map-mrr-ndcg.md
  - search-evaluation.md
  - reranking.md
  - hybrid-search.md
  - ../10-generative-ai/rag-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Ranking and Retrieval Metrics

Ranking metrics measure whether useful results appear early enough. They are the feedback loop for [BM25](bm25.md), [hybrid search](hybrid-search.md), [reranking](reranking.md), and RAG retrieval. The right metric depends on the task: one good result, many relevant results, or graded evidence quality.

## Defining math

For binary relevance in the top $k$:

$$
\operatorname{Precision@k}=\frac{\#\text{ relevant in top }k}{k},
\qquad
\operatorname{Recall@k}=\frac{\#\text{ relevant in top }k}{\#\text{ relevant in corpus}}.
$$

Average precision for one query averages precision at ranks where a relevant item appears:

$$
\operatorname{AP}=\frac{1}{R}\sum_{i=1}^n \operatorname{Precision@i}\,\mathbf 1\{\operatorname{rel}_i=1\}.
$$

MRR uses the first relevant rank. NDCG handles graded labels:

$$
\operatorname{DCG@k}=\sum_{i=1}^k\frac{\operatorname{rel}_i}{\log_2(i+1)},
\qquad
\operatorname{NDCG@k}=\frac{\operatorname{DCG@k}}{\operatorname{IDCG@k}}.
$$

## Worked example

```python
import numpy as np
from sklearn.metrics import ndcg_score

rel = np.array([3, 0, 2, 1, 0])
binary = rel > 0
k = 3
precision = binary[:k].sum() / k
recall = binary[:k].sum() / binary.sum()
ap = np.mean([binary[:i + 1].sum() / (i + 1) for i, b in enumerate(binary) if b])
rr = 1 / (np.argmax(binary) + 1)
ndcg = ndcg_score([rel], [np.arange(len(rel), 0, -1)], k=5)
print("p3", round(float(precision), 3), "r3", round(float(recall), 3),
      "AP", round(float(ap), 3), "RR", round(float(rr), 3), "NDCG5", round(float(ndcg), 3))
```

Observed output:

```text
p3 0.667 r3 0.667 AP 0.806 RR 1.0 NDCG5 0.93
```

The first result is relevant, so reciprocal rank is perfect. Recall@3 is not perfect because one relevant item is still below rank 3.

## Choosing metrics

Use MRR when one answer is enough, precision@k when the visible page must be clean, recall@k when missing evidence is costly, MAP when many relevant documents should be found, and NDCG when labels are graded. For RAG, pair these with source coverage and answer-level [RAG evaluation](../10-generative-ai/rag-evaluation.md).

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Evaluation](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html)
- [scikit-learn API: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)
