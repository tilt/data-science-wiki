---
title: Alternating Least Squares
slug: recommendation-systems/alternating-least-squares
description: "Block-coordinate ridge solves for low-rank recommender factors."
area: recommendation-systems
topics:
  - matrix-factorization
  - als
level: intermediate
status: review
page_type: algorithm
aliases:
  - ALS
prerequisites:
  - matrix-factorization.md
related:
  - matrix-factorization.md
  - weighted-matrix-factorization.md
  - implicit-feedback.md
  - funk-svd.md
  - sparse-utility-matrices-and-svd.md
historical_context: false
last_reviewed: 2026-07-11
---
# Alternating Least Squares

Alternating least squares trains [matrix factorization](matrix-factorization.md) by freezing one side of the model and solving the other side exactly. With item factors fixed, each user factor is a small ridge regression; with user factors fixed, each item factor is the symmetric ridge problem. This is why ALS is a natural fit for sparse [utility matrices](utility-and-interaction-matrices.md) and distributed computation.

## Defining math

For explicit ratings, ALS minimizes the usual observed-entry objective

$$
\sum_{(u,i)\in\Omega}(r_{ui}-p_u^\top q_i)^2+\lambda(\lVert p_u\rVert_2^2+\lVert q_i\rVert_2^2).
$$

Holding $Q$ fixed, user $u$ solves

$$
p_u=(Q_{\Omega_u}^\top Q_{\Omega_u}+\lambda I)^{-1}Q_{\Omega_u}^\top r_u.
$$

[Weighted matrix factorization](weighted-matrix-factorization.md) inserts a confidence matrix into the same normal equation, which is the common ALS form for [implicit feedback](implicit-feedback.md).

## Worked example

This snippet alternates user and item least-squares updates on an observed rating matrix and reports how RMSE and user-0 predictions change.

```python
import numpy as np
rng = np.random.default_rng(4)
R = np.array([[5., 4., np.nan, 1.], [4., np.nan, 1., 1.],
              [1., 1., 5., 4.], [np.nan, 1., 4., 5.]])
obs, k, lam = ~np.isnan(R), 2, 0.1
P = 0.1 * rng.normal(size=(4, k)); Q = 0.1 * rng.normal(size=(4, k))
def rmse(): return np.sqrt(np.mean((R[obs] - (P @ Q.T)[obs]) ** 2))
print("initial_rmse", round(float(rmse()), 3))
for _ in range(8):
    for u in range(4):
        idx = np.where(obs[u])[0]
        P[u] = np.linalg.solve(Q[idx].T @ Q[idx] + lam*np.eye(k), Q[idx].T @ R[u, idx])
    for i in range(4):
        idx = np.where(obs[:, i])[0]
        Q[i] = np.linalg.solve(P[idx].T @ P[idx] + lam*np.eye(k), P[idx].T @ R[idx, i])
print("final_rmse", round(float(rmse()), 3))
print("pred_user0", np.round((P @ Q.T)[0], 2).tolist())
```

Observed output:

```text
initial_rmse 3.338
final_rmse 0.279
pred_user0 [5.01, 3.96, 0.97, 0.98]
```

The closed-form half-steps rapidly recover the two taste blocks. Compared with [Funk SVD](funk-svd.md), ALS is less sensitive to SGD step size but requires solving many small linear systems.

## Caveats

ALS is still optimizing logged observations, so it inherits exposure bias and cold-start gaps. It can overfit rare users unless regularization increases for small $\lvert\Omega_u\rvert$. For ranking-heavy products, validate ALS with top-k [evaluation](evaluation-of-recommenders.md), not only reconstruction RMSE.

## References

- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
- [Hu, Koren, and Volinsky, 2008, Collaborative Filtering for Implicit Feedback Datasets](https://doi.org/10.1109/ICDM.2008.22)
