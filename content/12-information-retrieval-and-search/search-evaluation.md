---
title: Search Evaluation
slug: information-retrieval-and-search/search-evaluation
description: "Offline and online measurement of whether retrieval satisfies real information needs."
area: information-retrieval-and-search
topics:
  - search-evaluation
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - ranking-and-retrieval-metrics.md
  - precision-recall-map-mrr-ndcg.md
  - hybrid-search.md
  - reranking.md
  - ../17-experimentation-and-evaluation/offline-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Search Evaluation

Search evaluation checks whether retrieval satisfies real information needs, not whether a component looks elegant. A useful evaluation set has queries, candidate results, relevance labels, metrics, and slices for query classes such as exact identifiers, broad topics, paraphrases, and permission-filtered searches.

## Defining mechanism

For labelled queries $Q$, an offline evaluation computes a metric per query and averages:

$$
\operatorname{Metric}=\frac{1}{|Q|}\sum_{q\in Q}m(q,\pi_q,y_q).
$$

Here $\pi_q$ is the produced ranking and $y_q$ is the relevance judgment set. The same framework can compare [BM25](bm25.md), [dense retrieval](dense-retrieval.md), [hybrid search](hybrid-search.md), or [reranking](reranking.md).

## Worked example

This snippet computes per-query and mean recall@2 plus mean reciprocal rank for two toy ranked result lists.

```python
import numpy as np

y_true = [[1, 0, 1, 0], [0, 1, 0, 0], [1, 1, 0, 1]]
rankings = [[1, 0, 2, 3], [1, 2, 3, 0], [2, 0, 1, 3]]
recalls, mrr = [], []
for true, rank in zip(y_true, rankings):
    top2 = rank[:2]
    recalls.append(sum(true[i] for i in top2) / sum(true))
    mrr.append(next((1 / (j + 1) for j, i in enumerate(rank) if true[i]), 0))
print("recall_at2_by_query", [round(x, 3) for x in recalls], "mean", round(float(np.mean(recalls)), 3))
print("mrr_by_query", [round(x, 3) for x in mrr], "mean", round(float(np.mean(mrr)), 3))
```

Observed output:

```text
recall_at2_by_query [0.5, 1.0, 0.333] mean 0.611
mrr_by_query [0.5, 1.0, 0.5] mean 0.667
```

The second query is solved, but the first and third still miss relevant material near the top. The mean hides that variance, so inspect per-query failures before tuning.

## Caveats

Judgment pools are incomplete: an unjudged document may be relevant. Query logs are biased toward what the old system could answer. Offline improvements also may not improve user behavior, so mature systems connect offline tests to [online experiments](../17-experimentation-and-evaluation/online-experiments.md), human review, and risk-weighted slices.

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Evaluation](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html)
- [scikit-learn API: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)
