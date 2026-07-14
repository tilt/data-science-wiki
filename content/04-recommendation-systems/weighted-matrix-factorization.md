---
title: Weighted Matrix Factorization
slug: recommendation-systems/weighted-matrix-factorization
description: "Implicit-feedback factorization with separate preference and confidence."
area: recommendation-systems
topics:
  - weighted-matrix-factorization
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - implicit-feedback.md
  - matrix-factorization.md
related:
  - implicit-feedback.md
  - alternating-least-squares.md
  - matrix-factorization.md
  - explicit-versus-implicit-feedback.md
  - bayesian-personalized-ranking.md
historical_context: false
last_reviewed: 2026-07-11
---

# Weighted Matrix Factorization

Weighted matrix factorization is the standard [implicit feedback](implicit-feedback.md) adaptation of factor models: an interaction says "some preference evidence exists," while its count or strength says how confident the system should be. It avoids treating every missing pair as a strong negative.

## Defining math

Hu, Koren, and Volinsky separate binary preference $p_{ui}$ from confidence $c_{ui}$:

$$
p_{ui}=\mathbf 1\{r_{ui}>0\},\qquad c_{ui}=1+\alpha r_{ui}.
$$

Here $r_{ui}$ is the observed implicit interaction count or strength for user $u$ and item $i$. The binary preference $p_{ui}$ records whether any positive evidence exists, while confidence $c_{ui}$ increases with interaction strength; $\alpha$ controls how fast confidence grows.

The objective is

$$
\min_{X,Y}\sum_{u,i}c_{ui}(p_{ui}-x_u^\top y_i)^2+\lambda(\lVert x_u\rVert^2+\lVert y_i\rVert^2).
$$

The user factor $x_u$ and item factor $y_i$ produce a preference score by dot product. The confidence term makes errors on observed, repeated interactions count more than errors on missing entries, and $\lambda$ regularizes factor sizes.

For fixed item factors, each user update is a weighted ridge solve, closely related to [ALS](alternating-least-squares.md).

## Worked example

This snippet solves a confidence-weighted user-factor update and scores all items against the learned user vector.

```python
import numpy as np
r = np.array([3., 0., 1.])
C = np.diag(1 + 4 * r)
Y = np.array([[.8, .1], [.2, .7], [.6, .3]])
p = (r > 0).astype(float)
x = np.linalg.solve(Y.T @ C @ Y + 0.1*np.eye(2), Y.T @ C @ p)
print("user_factor", np.round(x, 3).tolist())
print("scores", np.round(Y @ x, 3).tolist())
```

Observed output:

```text
user_factor [1.283, 0.111]
scores [1.038, 0.335, 0.804]
```

The item with three interactions has higher confidence and pulls the user factor most strongly. [Bayesian personalized ranking](bayesian-personalized-ranking.md) instead trains pairwise orderings from positive and sampled negative items.

| Item | Interaction count $r$ | Preference $p$ | Confidence $c=1+4r$ | Effect                                  |
| ---- | --------------------: | -------------: | ------------------: | --------------------------------------- |
| 0    |                     3 |              1 |                  13 | Strong pull toward item 0's factor.     |
| 1    |                     0 |              0 |                   1 | Weak evidence; not a confident dislike. |
| 2    |                     1 |              1 |                   5 | Positive pull, but less than item 0.    |

## Caveats

The confidence formula is a modeling choice, not a fact about preference. Counts can reflect exposure, autoplay, bots, or interface placement. Tune $\alpha$, regularization, and negative treatment against top-k [evaluation](evaluation-of-recommenders.md), and inspect long-tail coverage so popularity does not dominate every factor.

## References

- [Hu, Koren, and Volinsky, 2008, Collaborative Filtering for Implicit Feedback Datasets](https://doi.org/10.1109/ICDM.2008.22)
- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
