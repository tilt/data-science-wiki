---
title: Funk SVD
slug: recommendation-systems/funk-svd
description: "Stochastic-gradient matrix factorization for observed recommender ratings."
area: recommendation-systems
topics:
  - funk-svd
  - matrix-factorization
level: intermediate
status: review
page_type: algorithm
aliases:
  - FunkSVD
prerequisites:
  - matrix-factorization.md
  - latent-factor-models.md
related:
  - matrix-factorization.md
  - alternating-least-squares.md
  - svd-versus-matrix-factorization.md
  - latent-factor-models.md
historical_context: true
last_reviewed: 2026-07-11
---
# Funk SVD

Funk SVD is the informal name for SGD-trained recommender [matrix factorization](matrix-factorization.md) popularized during the Netflix Prize. Despite the name, it is not [classical SVD](classical-svd.md): it does not decompose a complete matrix with orthogonal singular vectors. It learns user and item factors directly from observed ratings.

## Defining math

For one observed pair $(u,i)$, the prediction and squared-error update are

$$
\hat r_{ui}=p_u^\top q_i,\qquad e_{ui}=r_{ui}-\hat r_{ui},
$$

$$
p_u\leftarrow p_u+\eta(e_{ui}q_i-\lambda p_u),\qquad
q_i\leftarrow q_i+\eta(e_{ui}p_u-\lambda q_i).
$$

Bias terms can be added, but the mechanism is the same: move factors so observed pairs have higher dot products. [Alternating least squares](alternating-least-squares.md) optimizes a similar objective with block solves instead of small stochastic steps.

## Worked example

This snippet applies one gradient update to a Funk-SVD user and item vector, then compares squared error and the resulting dot-product prediction.

```python
import numpy as np
rng = np.random.default_rng(9)
p = 0.1 * rng.normal(size=2); q = 0.1 * rng.normal(size=2)
r, lr, lam = 5., 0.05, 0.02
def se(): return (r - p @ q) ** 2
print("squared_error_before", round(float(se()), 3))
for _ in range(60):
    e = r - p @ q
    p0 = p.copy()
    p += lr * (e * q - lam * p)
    q += lr * (e * p0 - lam * q)
print("squared_error_after", round(float(se()), 3))
print("prediction", round(float(p @ q), 3))
```

Observed output:

```text
squared_error_before 24.851
squared_error_after 0.0
prediction 4.98
```

The single observed rating pulls the factors until their dot product is near 5. Real systems update many pairs and hold out interactions for [offline evaluation](offline-versus-online-evaluation.md).

## Caveats

The step size matters; too large can diverge, too small trains slowly. Popular items receive many more updates than rare items, so regularization and sampling shape the learned geometry. Funk SVD targets explicit ratings; [Bayesian personalized ranking](bayesian-personalized-ranking.md) is usually a better fit when only positive implicit events are available.

## References

- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
