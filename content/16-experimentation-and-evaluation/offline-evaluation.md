---
title: Offline Evaluation
slug: experimentation-and-evaluation/offline-evaluation
description: "Fixed-data evaluation before live exposure, with metrics matched to the deployment decision."
area: experimentation-and-evaluation
topics:
  - offline-evaluation
  - ranking-metrics
  - evaluation
level: foundational
status: review
page_type: concept
aliases:
  - "Offline model evaluation"
prerequisites:
  - golden-datasets.md
related:
  - golden-datasets.md
  - coverage.md
  - repeated-sampling.md
  - online-experiments.md
  - ../13-ml-engineering-and-mlops/evaluation-datasets.md
historical_context: false
last_reviewed: 2026-07-11
---
# Offline Evaluation

Offline evaluation measures a system on fixed historical or curated data before it reaches live users. It is a deployment gate, not a product-impact estimate. A recommender, classifier, RAG system, and extraction model can all pass offline checks and still need [online experiments](online-experiments.md) because real users change exposure, feedback, and cost.

## Defining metric

For ranked retrieval or recommendation, [NDCG](../11-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) rewards placing highly relevant items near the top:

$$
DCG@k=\sum_{i=1}^k \frac{2^{rel_i}-1}{\log_2(i+1)}, \qquad
NDCG@k=\frac{DCG@k}{IDCG@k}.
$$

The metric is only meaningful if relevance labels, candidate generation, and time splits match the intended decision. That is why [golden datasets](golden-datasets.md) and [coverage](coverage.md) sit upstream of the metric.

## Worked calculation

```python
import numpy as np

gains_A = np.array([3,0,2,1,0])
gains_B = np.array([2,3,1,0,0])
def dcg(g, k):
    g = np.asarray(g)[:k]
    return np.sum((2**g - 1) / np.log2(np.arange(2, k + 2)))
def ndcg(g, k):
    ideal = np.sort(g)[::-1]
    return dcg(g, k) / dcg(ideal, k)
print(f"ndcg3_A {ndcg(gains_A,3):.3f}")
print(f"ndcg3_B {ndcg(gains_B,3):.3f}")
print(f"precision3_A {(gains_A[:3] > 0).mean():.3f}")
print(f"precision3_B {(gains_B[:3] > 0).mean():.3f}")
```

Observed output:

```text
ndcg3_A 0.905
ndcg3_B 0.843
precision3_A 0.667
precision3_B 1.000
```

System B retrieves more relevant items in the first three slots, but system A puts the highest-gain item first and therefore wins [NDCG](../11-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md)@3. The decision depends on whether the product values the first slot, any relevant result, or a downstream action.

## Caveats

Offline logs can encode the old system's exposure bias. Random splits can leak future information when examples are time-dependent. Reusing the same public evaluation set for every prompt or model iteration overfits the gate, so pair it with [repeated sampling](repeated-sampling.md), blind holdouts, and incident-derived examples.

## References

- [scikit-learn documentation: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)
- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
