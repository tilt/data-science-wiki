---
title: User-Based Collaborative Filtering
slug: recommendation-systems/user-based-collaborative-filtering
description: "Nearest-neighbor recommendation from users with similar interaction vectors."
area: recommendation-systems
topics:
  - user-based-collaborative-filtering
level: intermediate
status: review
page_type: algorithm
aliases: []
prerequisites:
  - collaborative-filtering.md
related:
  - collaborative-filtering.md
  - item-based-collaborative-filtering.md
  - matrix-factorization.md
  - utility-and-interaction-matrices.md
  - cold-start-problem.md
historical_context: false
last_reviewed: 2026-07-11
---
# User-Based Collaborative Filtering

User-based collaborative filtering finds users whose rows in the [utility matrix](utility-and-interaction-matrices.md) resemble the target user's row, then recommends what those neighbors liked. It is the most literal form of [collaborative filtering](collaborative-filtering.md): "people with histories like yours also liked this."

## Defining math

With similarity $w_{uv}$, a rating-style prediction is

$$
\hat r_{ui}=\bar r_u+\frac{\sum_{v\in N(u)}w_{uv}(r_{vi}-\bar r_v)}{\sum_{v\in N(u)}\lvert w_{uv}\rvert}.
$$

For binary interactions, the numerator is often just a weighted sum of neighbor item indicators. [Item-based collaborative filtering](item-based-collaborative-filtering.md) flips the similarity computation to columns.

## Worked example

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
X = np.array([[5,4,0,0], [4,5,1,0], [0,1,5,4], [0,0,4,5]], dtype=float)
sim = cosine_similarity(X)[0]
scores = sim @ X
scores[X[0] > 0] = -1
print("neighbors", np.round(sim, 3).tolist())
print("top_unseen_item", int(np.argmax(scores)))
```

Observed output:

```text
neighbors [1.0, 0.964, 0.096, 0.0]
top_unseen_item 2
```

The nearest user has rated item 2, so it becomes the top unseen candidate. [Matrix factorization](matrix-factorization.md) can be viewed as replacing this local neighbor lookup with a global low-rank model.

## Caveats

User neighborhoods are unstable when users have few interactions or rapidly changing tastes. Computing user-user similarities is expensive in systems with many users. New users need onboarding, [content-based recommendation](content-based-recommendation.md), or exploration before neighbor scores are meaningful.

## References

- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)
- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)
