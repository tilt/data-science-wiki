---
title: Vectors and Matrices
slug: mathematical-foundations/vectors-and-matrices
description: "Arrays that represent points, features, linear maps, and batches of data."
area: mathematical-foundations
topics:
  - linear-algebra
  - vectors
  - matrices
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - linear-algebra.md
  - matrix-multiplication.md
  - norms-and-distances.md
  - orthogonality.md
  - ../06-deep-learning/neural-network-fundamentals.md
historical_context: false
last_reviewed: 2026-07-11
---

# Vectors and Matrices

A vector is an ordered list of numbers used as a point, direction, feature row, coefficient set, or embedding. A matrix is a rectangular array that can store a dataset, a batch of vectors, or a linear map applied through [matrix multiplication](matrix-multiplication.md).

## Defining math

A vector $x\in\mathbb R^d$ has entries $x_1,\ldots,x_d$. A matrix $A\in\mathbb R^{m\times n}$ has entries $a_{ij}$ and maps $x\in\mathbb R^n$ to $Ax\in\mathbb R^m$:

$$
(Ax)_i=\sum_{j=1}^n a_{ij}x_j.
$$

The dot product

$$
x^\top y=\sum_{j=1}^d x_jy_j
$$

turns vectors into geometry: it defines angles, [orthogonality](orthogonality.md), projections, and many [norms and distances](norms-and-distances.md). In machine learning, the same object can be read as either data or parameters; a row of $X$ is a sample, while a column of $W$ in a neural layer is a learned direction.

## Executed demo

This snippet computes a vector self-dot product, a matrix-vector product, and the first row of an outer product to distinguish the common operations.

```python
import numpy as np

v = np.array([2., -1., 3.])
M = np.array([[1., 0., 2.], [0., -1., 1.]])
print("dot_vv", v @ v)
print("Mv", M @ v)
print("outer_first_row", np.outer(v, v)[0])
```

Observed output:

```text
dot_vv 14.0
Mv [8. 4.]
outer_first_row [ 4. -2.  6.]
```

The dot product gives $\lVert v\rVert_2^2=14$, while $Mv$ compresses a three-dimensional vector into two coordinates. That same linear-map view underlies [linear algebra](linear-algebra.md), dense layers in [neural network fundamentals](../06-deep-learning/neural-network-fundamentals.md), and low-dimensional embeddings.

## Caveats

Shape errors are semantic errors, not just syntax errors: a feature vector stored as shape $(d,)$ can behave differently from a row matrix $(1,d)$ or column matrix $(d,1)$. Units matter too; adding a price feature and an age feature before scaling can make distances meaningless.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [NumPy documentation: `numpy.linalg.norm`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.norm.html)
