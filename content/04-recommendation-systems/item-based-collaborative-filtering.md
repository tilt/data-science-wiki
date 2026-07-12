---
title: Item-Based Collaborative Filtering
slug: recommendation-systems/item-based-collaborative-filtering
description: "Recommendation from item-item similarity computed over user behavior."
area: recommendation-systems
topics:
  - item-based-collaborative-filtering
level: intermediate
status: review
page_type: algorithm
aliases: []
prerequisites:
  - collaborative-filtering.md
related:
  - collaborative-filtering.md
  - user-based-collaborative-filtering.md
  - candidate-generation.md
  - matrix-factorization.md
  - ranking.md
historical_context: false
last_reviewed: 2026-07-11
---
# Item-Based Collaborative Filtering

Item-based collaborative filtering computes similarity between item columns, then recommends items similar to those a user already consumed. Compared with [user-based collaborative filtering](user-based-collaborative-filtering.md), item similarities can be more stable because item catalogs often change slower than user histories.

## Defining math

For item vectors $x_i$ and $x_j$ over users,

$$
w_{ij}=\frac{x_i^\top x_j}{\lVert x_i\rVert\lVert x_j\rVert}.
$$

A user score for unseen item $j$ is

$$
s(u,j)=\sum_{i\in I_u}w_{ij}.
$$

This is often a fast [candidate generation](candidate-generation.md) source before richer [ranking](ranking.md).

## Worked example

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
X = np.array([[1,1,0,0], [1,1,1,0], [0,0,1,1], [1,0,0,1]])
item_sim = cosine_similarity(X.T)
user = np.array([1,0,0,1])
scores = item_sim @ user
scores[user > 0] = -1
print("item0_similarities", np.round(item_sim[0], 3).tolist())
print("recommend_item", int(np.argmax(scores)), "score", round(float(scores.max()), 3))
```

Observed output:

```text
item0_similarities [1.0, 0.816, 0.408, 0.408]
recommend_item 2 score 0.908
```

The user has items 0 and 3; item 2 receives similarity from item 3 and becomes the top unseen recommendation. [Matrix factorization](matrix-factorization.md) can compress a similar item-item structure into latent factors.

## Caveats

Popular items are similar to many items unless similarities are normalized or shrinkage is used. Item-item tables can be large for huge catalogs, so approximate nearest-neighbor indexes and pruning are common. Pure item similarity still has [cold-start](cold-start-problem.md) problems for brand-new inventory.

## References

- [Linden, Smith, and York, 2003, Amazon.com Recommendations: Item-to-Item Collaborative Filtering](https://doi.org/10.1109/MIC.2003.1167344)
- [Sarwar et al., 2001, Item-based Collaborative Filtering Recommendation Algorithms](https://doi.org/10.1145/371920.372071)
