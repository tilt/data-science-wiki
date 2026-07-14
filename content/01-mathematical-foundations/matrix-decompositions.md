---
title: Matrix Decompositions
slug: mathematical-foundations/matrix-decompositions
description: "Factorizations that reveal structure or make matrix computations easier."
area: mathematical-foundations
topics:
  - linear-algebra
  - matrix-decompositions
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - linear-algebra.md
related:
  - singular-value-decomposition.md
  - eigenvalues-and-eigenvectors.md
  - orthogonality.md
  - numerical-stability.md
  - ../03-classical-machine-learning/pca.md
historical_context: false
last_reviewed: 2026-07-11
---

# Matrix Decompositions

A matrix decomposition rewrites a matrix as a product of simpler matrices. The point is not cosmetic: the factors can expose [rank](rank.md), [orthogonality](orthogonality.md), curvature, covariance axes, or a computational path that is more stable than operating on the original matrix directly.

## Defining math

Common decompositions emphasize different structure:

$$
A=QR,\qquad A=LL^\top,\qquad A=Q\Lambda Q^\top,\qquad A=U\Sigma V^\top.
$$

QR uses orthonormal columns for least squares; Cholesky $A=LL^\top$ applies to symmetric positive definite matrices; eigendecomposition describes square maps with eigenvectors; [singular value decomposition](singular-value-decomposition.md) applies broadly and drives [PCA](../03-classical-machine-learning/pca.md) and [low-rank approximation](low-rank-approximation.md).

## Executed demo

This snippet performs Cholesky and QR decompositions, then checks reconstruction error for Cholesky and orthonormality for the QR basis.

```python
import numpy as np

A = np.array([[4., 2.], [2., 3.]])
L = np.linalg.cholesky(A)
Q, R = np.linalg.qr(np.array([[1., 1.], [1., 0.], [0., 1.]]))
print("cholesky_L")
print(np.round(L, 4))
print("cholesky_recon_error", round(np.linalg.norm(A - L @ L.T), 12))
print("qr_QtQ")
print(np.round(Q.T @ Q, 4))
```

Observed output:

```text
cholesky_L
[[2.     0.    ]
 [1.     1.4142]]
cholesky_recon_error 0.0
qr_QtQ
[[1. 0.]
 [0. 1.]]
```

The Cholesky factor has positive diagonal entries $2.0$ and $1.4142$, and its reconstruction error is $0.0$ to displayed precision. The QR check prints $Q^\top Q$ as the identity, so both decompositions replace a matrix with factors whose properties are easier to reason about.

## Caveats

Each decomposition has preconditions. Cholesky fails outside positive definite matrices; eigendecomposition can be ill-conditioned for non-normal matrices; forming $A^\top A$ may square the condition number, which is a [numerical stability](numerical-stability.md) issue.

## References

- [NumPy documentation: `numpy.linalg.cholesky`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.cholesky.html)
- [NumPy documentation: `numpy.linalg.qr`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.qr.html)
