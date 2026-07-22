---
title: Diversity, Novelty, Coverage, and Serendipity
slug: recommendation-systems/diversity-novelty-coverage-serendipity
description: "List-quality metrics beyond predicted relevance in recommender systems."
area: recommendation-systems
topics:
  - diversity
  - novelty
  - coverage
  - serendipity
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - evaluation-of-recommenders.md
related:
  - evaluation-of-recommenders.md
  - ranking.md
  - candidate-generation.md
  - feedback-loops.md
  - cold-start-problem.md
historical_context: false
last_reviewed: 2026-07-22
---

# Diversity, Novelty, Coverage, and Serendipity

These metrics measure qualities that relevance alone misses in [evaluation of recommenders](evaluation-of-recommenders.md). Diversity asks whether a list contains varied items; novelty asks whether items are not already obvious; coverage asks how much catalog or user space the system reaches; serendipity asks whether recommendations are both unexpected and useful.

## Beyond-accuracy measures

One intra-list diversity score is

$$
\operatorname{ILD}(L)=1-\frac{2}{k(k-1)}\sum_{i<j,\,i,j\in L}\operatorname{sim}(i,j).
$$

A simple novelty score uses item popularity $p(i)$:

$$
\operatorname{Novelty}(L)=\frac{1}{k}\sum_{i\in L}-\log_2 p(i).
$$

Catalog coverage over many recommendation lists $\mathcal L$ is

$$
\operatorname{Coverage}(\mathcal L)=
\frac{|\bigcup_{L\in\mathcal L}L|}{|\mathcal I|},
$$

where $\mathcal I$ is the eligible item catalog. A simple serendipity score averages relevance times unexpectedness:

$$
\operatorname{Serendipity}(L)=\frac{1}{k}\sum_{i\in L}\operatorname{rel}(i)\operatorname{unexpected}(i).
$$

These complement [ranking](ranking.md) metrics such as [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md).

## Worked example

This snippet computes intra-list diversity, mean novelty, and catalog coverage for a recommended item list from item features and popularity.

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
features = np.array([[1,0], [.8,.2], [0,1], [.2,.9]])
rec = [0, 2, 3]
catalog_pop = np.array([100, 80, 10, 5])
sim = cosine_similarity(features[rec])
div = 1 - sim[np.triu_indices(len(rec), 1)].mean()
novelty = np.mean(-np.log2(catalog_pop[rec] / catalog_pop.sum()))
print("intra_list_diversity", round(float(div), 3))
print("mean_novelty_bits", round(float(novelty), 3))
print("coverage", f"{len(set(rec))}/{len(features)}")
```

Observed output:

```text
intra_list_diversity 0.602
mean_novelty_bits 3.511
coverage 3/4
```

The list covers three of four items and mixes two feature regions. A pure relevance ranker might reduce these values by showing near-duplicates, while narrow [candidate generation](candidate-generation.md) can cap coverage before the ranker even runs.

## Caveats

Diversity is not randomization; irrelevant variety is bad. Novelty can overpromote obscure items unless relevance is preserved. Coverage metrics should be segmented by item type and user group, because aggregate coverage can hide [cold-start](cold-start-problem.md) failures.

## References

- [Herlocker et al., 2004, Evaluating Collaborative Filtering Recommender Systems](https://doi.org/10.1145/963770.963772)
- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Offline Versus Online Evaluation](offline-versus-online-evaluation.md) [Feedback Loops →](feedback-loops.md)
