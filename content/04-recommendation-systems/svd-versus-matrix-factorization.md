---
title: SVD versus Matrix Factorization
slug: recommendation-systems/svd-versus-matrix-factorization
description: "A comparison of dense algebraic SVD and sparse recommender factorization."
area: recommendation-systems
topics:
  - matrix-factorization
  - collaborative-filtering
  - singular-value-decomposition
level: intermediate
status: review
page_type: comparison
aliases:
  - "SVD versus MF"
prerequisites:
  - ../01-mathematical-foundations/singular-value-decomposition.md
  - matrix-factorization.md
related:
  - classical-svd.md
  - truncated-svd.md
  - sparse-utility-matrices-and-svd.md
  - matrix-factorization.md
  - funk-svd.md
historical_context: true
last_reviewed: 2026-07-11
---

# SVD versus Matrix Factorization

[Classical SVD](classical-svd.md) decomposes a complete matrix. Recommender [matrix factorization](matrix-factorization.md) learns a predictive model from sparse observed or weighted interactions. They share low-rank geometry, but their objectives encode different assumptions about missing values.

## Defining contrast

SVD solves

$$
A_k=\arg\min_{\operatorname{rank}(B)\le k}\lVert A-B\rVert_F^2.
$$

Recommender factorization usually solves

$$
\min_{P,Q}\sum_{(u,i)\in\Omega}(r_{ui}-p_u^\top q_i)^2+\lambda(\lVert p_u\rVert^2+\lVert q_i\rVert^2).
$$

The first formula requires a dense $A$; the second names the observed set $\Omega$. That single difference is why [sparse utility matrices](sparse-utility-matrices-and-svd.md) need special care.

## Worked example

This snippet compares a rank-2 approximation after dense imputation with a rank-2 approximation after zero filling for the same missing rating.

```python
import numpy as np
dense = np.array([[5., 4., 1.], [4., 4., 1.], [1., 1., 5.]])
U, s, Vt = np.linalg.svd(dense, full_matrices=False)
svd_rank2 = (U[:, :2] * s[:2]) @ Vt[:2]
mask = np.array([[1, 1, 0], [1, 1, 1], [0, 1, 1]], dtype=bool)
zero = dense * mask
U0, s0, Vt0 = np.linalg.svd(zero, full_matrices=False)
zero_rank2 = (U0[:, :2] * s0[:2]) @ Vt0[:2]
print("dense_missing_0_2_rank2", round(float(svd_rank2[0, 2]), 3))
print("zero_fill_missing_0_2_rank2", round(float(zero_rank2[0, 2]), 3))
```

Observed output:

```text
dense_missing_0_2_rank2 0.994
zero_fill_missing_0_2_rank2 -0.036
```

The same held-out cell is near 1 in the dense matrix but near zero after pretending it was missing-and-zero. [Funk SVD](funk-svd.md) and [ALS](alternating-least-squares.md) avoid this by optimizing over observed entries.

## Caveats

SVD is excellent linear algebra; the mistake is applying it to a matrix whose entries do not mean what the algorithm assumes. If zeros are true negatives after complete exposure, a dense objective may be defensible. If zeros are mostly non-exposure, use observed-entry or confidence-weighted models and judge them with recommender [evaluation](evaluation-of-recommenders.md).

## References

- [scikit-learn documentation: TruncatedSVD](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.TruncatedSVD.html)
- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)

> **Section — [Recommendation Systems and Personalization](index.md):** ← [Sparse Utility Matrices and Ordinary SVD](sparse-utility-matrices-and-svd.md) · [Funk SVD](funk-svd.md) →

> **Learning path — [Recommender systems](../00-home-and-navigation/learning-paths.md#recommender-systems):** ← [Matrix Factorization for Recommender Systems](matrix-factorization.md) · [Evaluation of Recommenders](evaluation-of-recommenders.md) →
