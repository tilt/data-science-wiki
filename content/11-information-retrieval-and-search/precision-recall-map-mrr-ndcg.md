---
title: Precision, Recall, MAP, MRR, and NDCG
slug: information-retrieval-and-search/precision-recall-map-mrr-ndcg
description: "Quick reference for the core ranked-retrieval metrics and when to use them."
area: information-retrieval-and-search
topics:
  - precision
  - recall
  - map
  - mrr
  - ndcg
level: foundational
status: review
page_type: reference
aliases: []
prerequisites:
  - search-evaluation.md
related:
  - ranking-and-retrieval-metrics.md
  - search-evaluation.md
  - reranking.md
  - hybrid-search.md
historical_context: false
last_reviewed: 2026-07-11
---
# Precision, Recall, MAP, MRR, and NDCG

These metrics summarize different user promises made by a ranked retrieval system. This page is the compact glossary; [Ranking and Retrieval Metrics](ranking-and-retrieval-metrics.md) is the more detailed reference.

## Metric definitions

Precision@k asks how clean the top $k$ results are:

$$
P@k=\frac{\text{relevant retrieved in top }k}{k}.
$$

Recall@k asks how much known relevant material was found:

$$
R@k=\frac{\text{relevant retrieved in top }k}{\text{known relevant}}.
$$

MAP averages precision at relevant ranks. MRR is $1/r$ for the rank $r$ of the first relevant result. NDCG discounts graded relevance by rank and normalizes by the best possible ordering.

## Worked example

```python
import numpy as np
from sklearn.metrics import ndcg_score

rel = np.array([3, 0, 2, 1, 0])
binary = rel > 0
precision3 = binary[:3].sum() / 3
recall3 = binary[:3].sum() / binary.sum()
ap = np.mean([binary[:i + 1].sum() / (i + 1) for i, b in enumerate(binary) if b])
rr = 1 / (np.argmax(binary) + 1)
ndcg5 = ndcg_score([rel], [np.arange(len(rel), 0, -1)], k=5)
print(round(float(precision3), 3), round(float(recall3), 3),
      round(float(ap), 3), round(float(rr), 3), round(float(ndcg5), 3))
```

Observed output:

```text
0.667 0.667 0.806 1.0 0.93
```

The same ranking can look strong or weak depending on the question. It has an excellent first hit, decent top-3 precision, and imperfect recall.

## Practical use

Use these metrics inside [search evaluation](search-evaluation.md) slices, not only as one global average. A [reranking](reranking.md) change may improve NDCG while reducing recall for exact-code queries. A [hybrid search](hybrid-search.md) change may improve recall while adding low-quality top results, which precision@k will reveal.

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Evaluation](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html)
- [scikit-learn API: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)
