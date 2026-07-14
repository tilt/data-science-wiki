---
title: Candidate Generation
slug: recommendation-systems/candidate-generation
description: "Fast retrieval of a manageable recommendation candidate set from a large catalog."
area: recommendation-systems
topics:
  - candidate-generation
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - recommendation-system-overview.md
related:
  - retrieval-and-ranking-architectures.md
  - ranking.md
  - item-based-collaborative-filtering.md
  - content-based-recommendation.md
  - ../12-information-retrieval-and-search/dense-retrieval.md
historical_context: false
last_reviewed: 2026-07-11
---
# Candidate Generation

Candidate generation retrieves a small set of plausible items from a large catalog so a slower [ranking](ranking.md) model does not score everything. Sources often include [item-based collaborative filtering](item-based-collaborative-filtering.md), [content-based recommendation](content-based-recommendation.md), trending items, subscriptions, and business rules.

## Defining mechanism

If sources $S_1,\ldots,S_m$ return scored item sets, a simple merge is

$$
s(i)=\max_j \frac{s_j(i)}{\max_{k\in S_j}s_j(k)}.
$$

The production contract is usually: retrieve many, deduplicate, enforce eligibility, then send candidates to the [retrieval and ranking architecture](retrieval-and-ranking-architectures.md).

## Worked example

Three candidate sources might emit scores on different scales:

| Source | Raw candidates | Source maximum | Normalized candidates |
| --- | --- | ---: | --- |
| ALS | A: 0.91, B: 0.72, C: 0.15 | 0.91 | A: 1.000, B: 0.791, C: 0.165 |
| Content | B: 0.63, D: 0.81, E: 0.35 | 0.81 | B: 0.778, D: 1.000, E: 0.432 |
| Trending | A: 0.25, D: 0.40, F: 0.77 | 0.77 | A: 0.325, D: 0.519, F: 1.000 |

Taking the maximum normalized score per item gives A: 1.000, B: 0.791, C: 0.165, D: 1.000, E: 0.432, and F: 1.000. The top four candidates are A, D, F, and B. Normalizing per source lets different candidate generators contribute, while the ranker can later learn which source is trustworthy for which user or context.

## Caveats

Candidate recall limits final quality: the ranker cannot recover items never retrieved. Per-source normalization can overpromote weak sources. Log source membership and retrieval scores so [offline evaluation](offline-versus-online-evaluation.md) can diagnose where good items were dropped.

## References

- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)
- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)
