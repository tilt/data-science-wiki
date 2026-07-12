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

A simple user-based score aggregates neighbor interactions:

$$
s(u,i)=\sum_{v\ne u}\operatorname{sim}(u,v)x_{vi}.
$$

This operates on a [utility matrix](utility-and-interaction-matrices.md); factor models replace explicit neighbors with learned latent coordinates.

## Worked example

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
