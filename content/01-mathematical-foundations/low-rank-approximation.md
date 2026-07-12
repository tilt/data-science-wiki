---
title: Low-Rank Approximation
slug: mathematical-foundations/low-rank-approximation
description: "Approximating a matrix with fewer independent directions while controlling reconstruction error."
area: mathematical-foundations
topics:
  - linear-algebra
  - low-rank-approximation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - singular-value-decomposition.md
related:
  - singular-value-decomposition.md
  - rank.md
  - norms-and-distances.md
  - matrix-decompositions.md
  - ../04-recommendation-systems/truncated-svd.md
historical_context: false
last_reviewed: 2026-07-11
---
# Low-Rank Approximation

Low-rank approximation replaces a matrix with another matrix that has fewer independent directions. It is a compression and denoising idea: preserve the strongest shared structure and discard smaller directions, measured by a chosen [norm](norms-and-distances.md).

## Defining math

If $A=U\Sigma V^\top$ is the [SVD](singular-value-decomposition.md), its rank-$k$ truncation is

$$
A_k=U_k\Sigma_kV_k^\top.
$$

The Eckart-Young theorem says this is optimal in Frobenius norm:

$$
A_k=\arg\min_{\operatorname{rank}(B)\le k}\lVert A-B\rVert_F.
$$

The error is exactly the energy in discarded singular values,

$$
\lVert A-A_k\rVert_F=\sqrt{\sum_{i=k+1}^r\sigma_i^2}.
$$

This mechanism is related to [truncated SVD](../04-recommendation-systems/truncated-svd.md), but learned recommender factors usually optimize observed entries rather than decomposing a fully observed matrix.

## Executed demo

```python
import numpy as np

A = np.array([[3., 1., 1.], [-1., 3., 1.], [0., 2., 4.], [2., 0., 2.]])
U, s, Vt = np.linalg.svd(A, full_matrices=False)
for k in [1, 2]:
    Ak = (U[:, :k] * s[:k]) @ Vt[:k]
    print(f"rank{k}_error", round(np.linalg.norm(A-Ak, "fro"), 4))
print("singular_values", np.round(s, 4))
```

Observed output:

```text
rank1_error 4.2426
rank2_error 2.0
singular_values [5.6569 3.7417 2.    ]
```

Keeping two singular directions leaves only the last singular value as error. Keeping one leaves the square-root sum of the last two squared singular values.

## Caveats

Low rank is an assumption. It can erase rare but important directions, and missing entries are not zeros. For sparse interaction data, use a model whose loss matches the observation process, not raw SVD on an arbitrary filled matrix.

## References

- [NumPy documentation: `numpy.linalg.svd`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html)
- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
