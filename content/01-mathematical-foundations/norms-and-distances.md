---
title: Norms and Distances
slug: mathematical-foundations/norms-and-distances
description: "Ways to measure vector size, matrix error, and separation between points."
area: mathematical-foundations
topics:
  - linear-algebra
  - norms
  - distances
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - vectors-and-matrices.md
related:
  - vectors-and-matrices.md
  - orthogonality.md
  - low-rank-approximation.md
  - gradient-descent.md
  - ../03-classical-machine-learning/clustering.md
historical_context: false
last_reviewed: 2026-07-17
---

# Norms and Distances

A norm measures the size of a vector or matrix; a distance measures separation between two objects. These choices decide what "near", "small error", and "best approximation" mean in optimization, [clustering](../03-classical-machine-learning/clustering.md), and [low-rank approximation](low-rank-approximation.md).

## Defining math

A norm $\lVert x\rVert$ is nonnegative, homogeneous, and obeys the triangle inequality:

$$
\lVert x+y\rVert \le \lVert x\rVert+\lVert y\rVert.
$$

Common vector norms are

$$
\lVert x\rVert_1=\sum_i |x_i|,\qquad
\lVert x\rVert_2=\sqrt{\sum_i x_i^2},\qquad
\lVert x\rVert_\infty=\max_i |x_i|.
$$

A distance is often induced by a norm, $d(x,y)=\lVert x-y\rVert$. The Euclidean norm is tied to [orthogonality](orthogonality.md); $L_1$ often encourages sparse errors or coefficients; matrix Frobenius norm is the squared-entry analogue used in [singular value decomposition](singular-value-decomposition.md).

## Worked example

The same vector has different sizes under different norms. For $x=(3,4)$,

$$
\lVert x\rVert_1=|3|+|4|=7,\qquad
\lVert x\rVert_2=\sqrt{3^2+4^2}=5,\qquad
\lVert x\rVert_\infty=\max(3,4)=4.
$$

The Euclidean distance to $y=(1,1)$ is $\lVert x-y\rVert_2=\lVert(2,3)\rVert_2=\sqrt{13}\approx3.606$. The triangle inequality holds with a little room to spare:

$$
\lVert x\rVert_2+\lVert y\rVert_2=5+\sqrt2\approx6.414
\quad\ge\quad
\lVert x+y\rVert_2=\lVert(4,5)\rVert_2=\sqrt{41}\approx6.403,
$$

a gap of about $0.011$.

## Caveats

Distances can be dominated by scale, irrelevant dimensions, or sparse high-dimensional effects. A model optimized with one norm may behave poorly under the metric users care about, so connect the norm to the task before tuning [gradient descent](gradient-descent.md).

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Orthogonality](orthogonality.md) [Eigenvalues and Eigenvectors →](eigenvalues-and-eigenvectors.md)
