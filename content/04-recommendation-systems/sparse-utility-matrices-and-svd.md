---
title: Sparse Utility Matrices and Ordinary SVD
slug: recommendation-systems/sparse-utility-matrices-and-svd
description: "Why zero-filled ordinary SVD changes the meaning of missing recommender data."
area: recommendation-systems
topics:
  - utility-matrices
  - matrix-factorization
  - sparse-data
level: intermediate
status: review
page_type: concept
aliases:
  - "Sparse utility matrix SVD"
  - "Why SVD fails for sparse recommender matrices"
prerequisites:
  - matrix-factorization.md
  - ../01-mathematical-foundations/singular-value-decomposition.md
related:
  - svd-versus-matrix-factorization.md
  - classical-svd.md
  - matrix-factorization.md
  - implicit-feedback.md
  - utility-and-interaction-matrices.md
historical_context: false
last_reviewed: 2026-07-11
---
# Sparse Utility Matrices and Ordinary SVD

Ordinary [classical SVD](classical-svd.md) requires a complete matrix. A recommender [utility matrix](utility-and-interaction-matrices.md) is sparse because most user-item pairs were never observed, not because the user assigned a numeric zero. This difference is why direct zero filling can dominate the signal.

## Defining math

Zero filling changes an observed-entry problem

$$
\sum_{(u,i)\in\Omega}(r_{ui}-\hat r_{ui})^2
$$

into a dense approximation problem

$$
\lVert Z-U_k\Sigma_kV_k^\top\rVert_F^2,
$$

where $Z_{ui}=0$ for every missing pair. That objective treats unobserved pairs as equally confident zeros, unlike [matrix factorization](matrix-factorization.md) or [implicit-feedback](implicit-feedback.md) weighting.

## Worked example

This snippet zero-fills a sparse utility matrix and applies rank-1 SVD reconstruction to show how missing entries can be distorted by ordinary SVD.

```python
import numpy as np
R = np.array([[5., 0., 0., 0.], [0., 0., 4., 0.], [0., 0., 5., 4.]])
U, s, Vt = np.linalg.svd(R, full_matrices=False)
R1 = (U[:, :1] * s[:1]) @ Vt[:1]
print("zero_filled_density", round(float((R > 0).mean()), 3))
print("rank1_reconstruction")
print(np.round(R1, 2))
```

Observed output:

```text
zero_filled_density 0.333
rank1_reconstruction
[[0.   0.   0.   0.  ]
 [0.   0.   3.06 1.7 ]
 [0.   0.   5.52 3.06]]
```

The first user's only positive rating disappears from the rank-1 reconstruction because the dense zero pattern overwhelms it. [SVD versus matrix factorization](svd-versus-matrix-factorization.md) is the canonical comparison page for this distinction.

| Modeling choice | Consequence |
| --- | --- |
| Treat missing entries as zero | The objective rewards reconstructing the many zeros. |
| Fit only observed entries | The model focuses on known ratings or interactions. |
| Weight implicit feedback by confidence | Missing pairs remain low-confidence rather than hard negatives. |

## Caveats

Zero-filled SVD can still be a deliberate baseline, especially when zeros truly mean non-consumption after exposure. But most logs lack full exposure data, so treating unknown as negative injects position, popularity, and catalogue-size bias. Prefer observed-entry objectives or confidence-weighted losses, then evaluate top-k [ranking](ranking.md) behavior.

## References

- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
- [Hu, Koren, and Volinsky, 2008, Collaborative Filtering for Implicit Feedback Datasets](https://doi.org/10.1109/ICDM.2008.22)
