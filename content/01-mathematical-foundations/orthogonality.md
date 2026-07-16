---
title: Orthogonality
slug: mathematical-foundations/orthogonality
description: "Perpendicular vector directions that separate variation, projections, and basis coordinates."
area: mathematical-foundations
topics:
  - linear-algebra
  - orthogonality
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - vectors-and-matrices.md
related:
  - vectors-and-matrices.md
  - norms-and-distances.md
  - matrix-decompositions.md
  - singular-value-decomposition.md
  - ../03-classical-machine-learning/pca.md
historical_context: false
last_reviewed: 2026-07-11
---

# Orthogonality

Orthogonality means two directions have zero dot product. It is the algebraic version of perpendicularity and is what lets projections, [SVD](singular-value-decomposition.md), QR decomposition, and [PCA](../03-classical-machine-learning/pca.md) separate variation into non-overlapping directions.

## Defining math

Vectors $x,y\in\mathbb R^d$ are orthogonal when

$$
x^\top y=0.
$$

Here $x^\top y$ is the dot product. A zero dot product means the signed component of $x$ in the direction of $y$ cancels out, so neither vector carries length along the other direction.

A matrix $Q$ has orthonormal columns when

$$
Q^\top Q=I.
$$

The columns of $Q$ are the basis vectors, and $I$ is the identity matrix. Diagonal ones mean each column has unit length; off-diagonal zeros mean different columns are mutually orthogonal.

Then multiplication by $Q$ preserves Euclidean lengths inside its column space:

$$
\lVert Qz\rVert_2^2=z^\top Q^\top Qz=\lVert z\rVert_2^2.
$$

That length preservation is why orthogonal bases are numerically convenient in [matrix decompositions](matrix-decompositions.md) and why residuals in least squares are orthogonal to fitted directions.

## Executed demo

This snippet builds an orthonormal basis with QR decomposition and verifies orthogonality through $Q^TQ$ and a column dot product.

```python
import numpy as np

Q, _ = np.linalg.qr(np.array([[1., 1.], [1., 0.], [0., 1.]]))
print("Q")
print(np.round(Q, 4))
print("QtQ")
print(np.round(Q.T @ Q, 4))
print("dot_columns", round(Q[:, 0] @ Q[:, 1], 12))
```

Observed output:

```text
Q
[[-0.7071  0.4082]
 [-0.7071 -0.4082]
 [-0.      0.8165]]
QtQ
[[1. 0.]
 [0. 1.]]
dot_columns 0.0
```

The QR factorization turned two independent columns into an orthonormal basis. The off-diagonal zero in $Q^\top Q$ shows that the two learned basis directions do not overlap under the dot product.

## Caveats

Orthogonality depends on the inner product. Standard Euclidean orthogonality may be the wrong geometry when features have different units or correlated noise; then [norms and distances](norms-and-distances.md) or whitening need to define the metric first.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [NumPy documentation: `numpy.linalg.qr`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.qr.html)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Rank](rank.md) [Norms and Distances →](norms-and-distances.md)
