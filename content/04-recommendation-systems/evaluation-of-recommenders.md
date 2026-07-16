---
title: Evaluation of Recommenders
slug: recommendation-systems/evaluation-of-recommenders
description: "Ranking, coverage, and experimental checks for recommender quality."
area: recommendation-systems
topics:
  - evaluation-of-recommenders
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - ranking.md
related:
  - offline-versus-online-evaluation.md
  - ranking.md
  - diversity-novelty-coverage-serendipity.md
  - feedback-loops.md
  - ../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md
historical_context: false
last_reviewed: 2026-07-11
---

# Evaluation of Recommenders

Recommender evaluation asks whether ranked lists are useful, robust, and healthy for users and inventory. Accuracy metrics such as recall@k and [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) are necessary, but they miss novelty, diversity, coverage, calibration, and long-term [feedback loops](feedback-loops.md).

## Defining math

For a top-$k$ list $L_k$ and relevant set $G_u$,

$$
\operatorname{Precision@}k=\frac{\lvert L_k\cap G_u\rvert}{k},\qquad
\operatorname{Recall@}k=\frac{\lvert L_k\cap G_u\rvert}{\lvert G_u\rvert}.
$$

[NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) discounts hits by rank and normalizes by the ideal list. The same family appears in [ranking and retrieval metrics](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md).

## Worked example

This snippet ranks items by predicted score and computes top-3 precision, recall, and [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) against binary relevance labels.

```python
import numpy as np
from sklearn.metrics import ndcg_score
y_true = np.array([[0,0,1,1,0]])
y_score = np.array([[.9,.2,.8,.4,.1]])
top3 = np.argsort(-y_score[0])[:3]
hits = y_true[0, top3].sum()
print("top3", top3.tolist())
print("precision_at_3", round(float(hits / 3), 3))
print("recall_at_3", round(float(hits / y_true.sum()), 3))
print("ndcg_at_3", round(float(ndcg_score(y_true, y_score, k=3)), 3))
```

Observed output:

```text
top3 [0, 2, 3]
precision_at_3 0.667
recall_at_3 1.0
ndcg_at_3 0.693
```

Both relevant items appear in the top three, but one irrelevant item ranks first, so [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) penalizes the ordering. [Offline versus online evaluation](offline-versus-online-evaluation.md) decides whether this historical score predicts live behavior.

## Caveats

Random train-test splits leak future behavior; time-based splits are usually more realistic. Missing interactions are not guaranteed negatives. Report segment metrics, coverage, and list quality, not only a single average score.

## References

- [Herlocker et al., 2004, Evaluating Collaborative Filtering Recommender Systems](https://doi.org/10.1145/963770.963772)
- [scikit-learn documentation: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Retrieval and Ranking Architectures](retrieval-and-ranking-architectures.md) [Offline Versus Online Evaluation →](offline-versus-online-evaluation.md)
>
> **Learning path** — [Recommender systems](../00-home-and-navigation/learning-paths.md#recommender-systems)
>
> [← SVD versus Matrix Factorization](svd-versus-matrix-factorization.md)
