---
title: Classical SVD
slug: recommendation-systems/classical-svd
description: "The exact dense-matrix decomposition behind low-rank recommender intuition."
area: recommendation-systems
topics:
  - classical-svd
  - singular-value-decomposition
level: foundational
status: complete
page_type: algorithm
aliases: []
prerequisites:
  - ../01-mathematical-foundations/singular-value-decomposition.md
related:
  - truncated-svd.md
  - svd-versus-matrix-factorization.md
  - sparse-utility-matrices-and-svd.md
  - matrix-factorization.md
  - ../01-mathematical-foundations/low-rank-approximation.md
historical_context: false
last_reviewed: 2026-07-22
---

# Classical SVD

Classical singular value decomposition factorizes a complete numeric matrix. In recommender systems it supplies the low-rank vocabulary used by [matrix factorization](matrix-factorization.md), but it is not by itself a correct treatment of missing ratings.

## The SVD factorization

For a dense matrix $A\in\mathbb R^{m\times n}$,

$$
A=U\Sigma V^\top,
$$

where columns of $U$ and $V$ are orthonormal and $\Sigma$ contains nonnegative singular values. The rank-$k$ approximation keeps the largest $k$ singular values:

$$
A_k=U_k\Sigma_kV_k^\top.
$$

This connects to [low-rank approximation](../01-mathematical-foundations/low-rank-approximation.md). The recommender-specific problem is that [utility matrices](utility-and-interaction-matrices.md) are usually sparse and missing entries mean unknown exposure, not zero dislike.

## Worked example

This snippet computes the SVD of a dense rating matrix and forms a rank-2 reconstruction, reporting singular values, error, and one reconstructed row.

```python
import numpy as np
A = np.array([[5., 4., 1.], [4., 4., 1.], [1., 1., 5.], [1., 0., 4.]])
U, s, Vt = np.linalg.svd(A, full_matrices=False)
A2 = (U[:, :2] * s[:2]) @ Vt[:2]
print("singular_values", np.round(s, 3).tolist())
print("rank2_error", round(float(np.linalg.norm(A - A2)), 3))
print("rank2_row0", np.round(A2[0], 2).tolist())
```

Observed output:

```text
singular_values [9.304, 5.647, 0.739]
rank2_error 0.739
rank2_row0 [4.78, 4.24, 1.02]
```

The top two components almost reconstruct the dense matrix. [Truncated SVD](truncated-svd.md) computes this approximation directly when only the leading components are needed.

## Caveats

Do not turn sparse recommender data into a dense matrix by filling unknown cells with zeros unless that is the deliberate data-generating assumption. [SVD versus matrix factorization](svd-versus-matrix-factorization.md) is mainly about this distinction: SVD decomposes a given matrix, while recommender factorization learns from observed or weighted interactions.

## References

- [scikit-learn documentation: TruncatedSVD](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.TruncatedSVD.html)
- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Latent Factor Models](latent-factor-models.md) [Truncated SVD →](truncated-svd.md)
