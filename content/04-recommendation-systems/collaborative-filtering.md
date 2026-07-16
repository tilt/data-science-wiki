---
title: Collaborative Filtering
slug: recommendation-systems/collaborative-filtering
description: "Recommendation from similarities and latent structure in user-item behavior."
area: recommendation-systems
topics:
  - collaborative-filtering
  - personalization
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - utility-and-interaction-matrices.md
related:
  - user-based-collaborative-filtering.md
  - item-based-collaborative-filtering.md
  - matrix-factorization.md
  - hybrid-recommenders.md
  - cold-start-problem.md
historical_context: false
last_reviewed: 2026-07-11
---

# Collaborative Filtering

Collaborative filtering recommends from collective behavior rather than item content alone. It assumes that users with similar histories, or items consumed by similar users, carry useful preference signal. The main families are [user-based collaborative filtering](user-based-collaborative-filtering.md), [item-based collaborative filtering](item-based-collaborative-filtering.md), and model-based methods such as [matrix factorization](matrix-factorization.md).

## Defining math

For memory-based collaborative filtering, cosine similarity is common:

$$
\operatorname{sim}(a,b)=\frac{x_a^\top x_b}{\lVert x_a\rVert_2\lVert x_b\rVert_2}.
$$

Here $x_a$ and $x_b$ are interaction vectors for two users or two items, depending on the method. The numerator counts aligned behavior, while the denominator normalizes for activity level so a heavy user is not similar to everyone merely because they interacted with many items.

A simple user-based score aggregates neighbor interactions:

$$
s(u,i)=\sum_{v\ne u}\operatorname{sim}(u,v)x_{vi}.
$$

The score $s(u,i)$ estimates how strongly user $u$ may like item $i$. Each neighbor $v$ contributes only if $v$ interacted with item $i$, and the contribution is weighted by similarity to $u$.

This operates on a [utility matrix](utility-and-interaction-matrices.md); factor models replace explicit neighbors with learned latent coordinates.

## Worked example

The code below constructs four user interaction vectors, computes user 0's cosine similarity to the others, and scores unseen items by similarity-weighted neighbor interactions. It is useful here because the recommended item comes from neighbor geometry, not from item content.

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
X = np.array([[1,1,0,0,0], [1,1,1,0,0], [0,0,1,1,1], [0,1,0,1,0]])
sim = cosine_similarity(X)[0]
scores = sim @ X
scores[X[0] > 0] = -1
print("user0_similarities", np.round(sim, 3).tolist())
print("recommend_item", int(np.argmax(scores)), "score", round(float(scores.max()), 3))
```

Observed output:

```text
user0_similarities [1.0, 0.816, 0.0, 0.5]
recommend_item 2 score 0.816
```

User 1 is the closest neighbor and contributes the top unseen item. [Hybrid recommenders](hybrid-recommenders.md) add content features when behavior is too sparse.

## Caveats

Collaborative filtering fails for new users and items without interactions, so [cold-start](cold-start-problem.md) strategies are mandatory. Similarity can reflect exposure and popularity, not preference. Neighborhood methods also become expensive without approximate retrieval or candidate pruning.

## References

- [Sarwar et al., 2001, Item-based Collaborative Filtering Recommendation Algorithms](https://doi.org/10.1145/371920.372071)
- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)

> **Section — [Recommendation Systems and Personalization](index.md):** ← [Content-Based Recommendation](content-based-recommendation.md) · [User-Based Collaborative Filtering](user-based-collaborative-filtering.md) →

> **Learning path — [Recommender systems](../00-home-and-navigation/learning-paths.md#recommender-systems):** ← [Recommendation Systems and Personalization](index.md) · [Matrix Factorization for Recommender Systems](matrix-factorization.md) →
