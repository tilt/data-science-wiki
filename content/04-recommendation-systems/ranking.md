---
title: Ranking
slug: recommendation-systems/ranking
description: "Ordering retrieved candidates by relevance, constraints, and list-level objectives."
area: recommendation-systems
topics:
  - ranking
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - candidate-generation.md
related:
  - candidate-generation.md
  - retrieval-and-ranking-architectures.md
  - evaluation-of-recommenders.md
  - diversity-novelty-coverage-serendipity.md
  - ../12-information-retrieval-and-search/ranking-and-retrieval-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---
# Ranking

Ranking orders candidate items for a user or context. In a recommender, the ranker usually combines predicted relevance with freshness, diversity, eligibility, risk, and product constraints. It sits after [candidate generation](candidate-generation.md) in most [retrieval and ranking architectures](retrieval-and-ranking-architectures.md).

## Defining math

A pointwise ranker might score

$$
s(u,i)=f_\theta(x_{u,i})-\lambda\,\operatorname{age}(i),
$$

then sort by $s$. A list-level postprocessor can add constraints such as author diversity or inventory caps. [Evaluation of recommenders](evaluation-of-recommenders.md) then uses top-k metrics such as [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) or recall.

## Worked example

Apply a freshness penalty of $0.03$ per age unit, then enforce author diversity in the top two:

| Item | Relevance | Age | Author | Score $rel-0.03\,age$ |
| --- | ---: | ---: | ---: | ---: |
| 0 | 0.90 | 1 | 0 | 0.87 |
| 1 | 0.85 | 10 | 0 | 0.55 |
| 2 | 0.70 | 2 | 1 | 0.64 |
| 3 | 0.60 | 0 | 1 | 0.60 |

The raw score order is item 0, item 2, item 3, then item 1. Item 1 has high base relevance but is stale and from the same author as item 0, so item 2 enters the top list. This connects ranking directly to [diversity, novelty, coverage, and serendipity](diversity-novelty-coverage-serendipity.md).

## Caveats

Pointwise relevance can over-optimize short-term clicks. List constraints can hide relevance regressions if they are not logged and measured. Rankers trained on historical positions need bias correction or online validation because exposure shapes the labels.

## References

- [scikit-learn documentation: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)
- [Herlocker et al., 2004, Evaluating Collaborative Filtering Recommender Systems](https://doi.org/10.1145/963770.963772)
