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
  - ../14-ml-engineering-and-mlops/evaluation-datasets.md
historical_context: false
last_reviewed: 2026-07-11
---

# Offline Evaluation

Offline evaluation measures a system on fixed historical or curated data before it reaches live users. It is a deployment gate, not a product-impact estimate. A recommender, classifier, RAG system, and extraction model can all pass offline checks and still need [online experiments](online-experiments.md) because real users change exposure, feedback, and cost.

## Defining metric

For ranked retrieval or recommendation, [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) rewards placing highly relevant items near the top:

$$
DCG@k=\sum_{i=1}^k \frac{2^{rel_i}-1}{\log_2(i+1)}, \qquad
NDCG@k=\frac{DCG@k}{IDCG@k}.
$$

The metric is only meaningful if relevance labels, candidate generation, and time splits match the intended decision. That is why [golden datasets](golden-datasets.md) and [coverage](coverage.md) sit upstream of the metric.

## Worked calculation

Compare two rankings with graded gains:

| system | top-five gains | [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md)@3 | relevant items in top 3 |
| ------ | -------------- | --------------------------------------------------------------------------------: | ----------------------: |
| A      | 3, 0, 2, 1, 0  |                                                                             0.905 |                  2 of 3 |
| B      | 2, 3, 1, 0, 0  |                                                                             0.843 |                  3 of 3 |

System B retrieves more relevant items in the first three slots, but system A puts the highest-gain item first and therefore wins [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md)@3. The decision depends on whether the product values the first slot, any relevant result, or a downstream action.

## Caveats

Offline logs can encode the old system's exposure bias. Random splits can leak future information when examples are time-dependent. Reusing the same public evaluation set for every prompt or model iteration overfits the gate, so pair it with [repeated sampling](repeated-sampling.md), blind holdouts, and incident-derived examples.

## References

- [scikit-learn documentation: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)
- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
