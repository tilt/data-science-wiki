---
title: Linear Algebra
slug: mathematical-foundations/linear-algebra
description: "The language of vectors, matrices, subspaces, projections, and linear transformations."
area: mathematical-foundations
topics:
  - linear-algebra
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - vectors-and-matrices.md
related:
  - vectors-and-matrices.md
  - matrix-multiplication.md
  - rank.md
  - singular-value-decomposition.md
  - ../03-classical-machine-learning/linear-models.md
historical_context: false
last_reviewed: 2026-07-11
---

# Linear Algebra

Linear algebra studies vector spaces and linear maps between them. In data science, it is the shared language for feature matrices, least-squares projections, embeddings, covariance geometry, neural layers, [PCA](../03-classical-machine-learning/pca.md), and recommendation factors.

## Defining math

A linear map $T$ satisfies

$$
T(\alpha x+\beta y)=\alpha T(x)+\beta T(y).
$$

After choosing bases, every finite-dimensional linear map is represented by a matrix $A$, and applying it is [matrix multiplication](matrix-multiplication.md):

$$
y=Ax.
$$

The fundamental questions are geometric: what directions are stretched, which directions collapse to zero, what subspace is reachable, and how far a vector is from a subspace. These questions become [rank](rank.md), [orthogonality](orthogonality.md), projections, [eigenvalues](eigenvalues-and-eigenvectors.md), and the [singular value decomposition](singular-value-decomposition.md).

## Executed demo

This snippet multiplies a rectangular matrix by a vector and computes the matrix rank, illustrating shape compatibility and independent columns.

```python
import numpy as np

A = np.array([[1., 2.], [3., 4.], [5., 6.]])
x = np.array([0.5, -1.])
print("A_shape", A.shape)
print("A_x", A @ x)
print("column_rank", np.linalg.matrix_rank(A))
```

Observed output:

```text
A_shape (3, 2)
A_x [-1.5 -2.5 -3.5]
column_rank 2
```

The matrix maps a two-coordinate input into three coordinates, and its two columns are independent. That is why it can represent a two-dimensional plane inside $\mathbb R^3$, a useful picture for [linear models](../03-classical-machine-learning/linear-models.md) and projections.

## Caveats

Linear algebra gives exact identities over exact numbers, while machine computation uses floating point. Nearly dependent columns can make a matrix look full-rank algebraically but unstable numerically; check singular values or conditioning when estimates are sensitive.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [NumPy documentation: `numpy.linalg.matrix_rank`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.matrix_rank.html)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [Vectors and Matrices →](vectors-and-matrices.md)
