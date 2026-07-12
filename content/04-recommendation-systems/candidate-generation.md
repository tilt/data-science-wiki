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
  - ../11-information-retrieval-and-search/dense-retrieval.md
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

```python
sources = {"als": {"A": .91, "B": .72, "C": .15},
           "content": {"B": .63, "D": .81, "E": .35},
           "trending": {"A": .25, "D": .4, "F": .77}}
merged = {}
for vals in sources.values():
    m = max(vals.values())
    for item, score in vals.items():
        merged[item] = max(merged.get(item, 0), score / m)
print("merged_top4", sorted((k, round(v, 3)) for k, v in merged.items()))
print("ranked", [k for k, v in sorted(merged.items(), key=lambda kv: -kv[1])[:4]])
```

Observed output:

```text
merged_top4 [('A', 1.0), ('B', 0.791), ('C', 0.165), ('D', 1.0), ('E', 0.432), ('F', 1.0)]
ranked ['A', 'D', 'F', 'B']
```

Normalizing per source lets different candidate generators contribute. The ranker can later learn which source is trustworthy for which user or context.

## Caveats

Candidate recall limits final quality: the ranker cannot recover items never retrieved. Per-source normalization can overpromote weak sources. Log source membership and retrieval scores so [offline evaluation](offline-versus-online-evaluation.md) can diagnose where good items were dropped.

## References

- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)
- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)
