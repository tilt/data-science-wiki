---
title: Retrieval and Ranking Architectures
slug: recommendation-systems/retrieval-and-ranking-architectures
description: "Two-stage recommender systems that separate fast recall from precise ordering."
area: recommendation-systems
topics:
  - retrieval-and-ranking-architectures
level: advanced
status: review
page_type: system-design
aliases: []
prerequisites:
  - candidate-generation.md
  - ranking.md
related:
  - candidate-generation.md
  - ranking.md
  - hybrid-recommenders.md
  - ../12-information-retrieval-and-search/vector-indexes.md
  - ../12-information-retrieval-and-search/reranking.md
historical_context: false
last_reviewed: 2026-07-11
---

# Retrieval and Ranking Architectures

Retrieval-and-ranking architectures split recommendation into fast broad recall and slower precise ordering. This is the recommender analogue of [dense retrieval](../12-information-retrieval-and-search/dense-retrieval.md) followed by [reranking](../12-information-retrieval-and-search/reranking.md): retrieve thousands, rank hundreds, display a few.

## Defining mechanism

A two-stage system can be written as

$$
C_u=\operatorname{topK}_{i\in\mathcal I} g(u,i),\qquad
L_u=\operatorname{sort}_{i\in C_u} h(u,i,x_{ui}),
$$

where $g$ is a cheap retrieval score and $h$ is a richer [ranking](ranking.md) model. [Candidate generation](candidate-generation.md) may combine multiple retrieval sources before ranking.

## Worked example

A cheap retrieval score can select candidates before the ranker adds richer features:

| Item | Retrieval score | Retrieved? | Ranker margin | Final rank score |
| ---- | --------------: | ---------- | ------------: | ---------------: |
| 0    |            0.74 | yes        |          0.00 |             0.74 |
| 1    |            0.24 | no         |          0.20 |       not ranked |
| 2    |            0.60 | yes        |          0.10 |             0.70 |
| 3    |            0.44 | yes        |          0.30 |             0.74 |

The retrieval stage recalls items 0, 2, and 3; item 1 is never seen by the ranker. The ranker then promotes item 3 above item 2 using the margin feature. [Hybrid recommenders](hybrid-recommenders.md) often feed several such scores into the ranker.

## Caveats

Retrieval and ranking must be evaluated separately. A ranker with excellent [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) cannot fix low candidate recall, and a high-recall generator can still overload serving latency. Keep eligibility, freshness, deduplication, and exploration decisions visible in logs.

## References

- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)
- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Ranking](ranking.md) [Evaluation of Recommenders →](evaluation-of-recommenders.md)
