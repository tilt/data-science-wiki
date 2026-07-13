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
status: review
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
last_reviewed: 2026-07-11
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

## Executed demo

```python
import numpy as np

x = np.array([3., 4.])
y = np.array([1., 1.])
print("l1", np.linalg.norm(x, 1))
print("l2", np.linalg.norm(x, 2))
print("linf", np.linalg.norm(x, np.inf))
print("distance_to_y", round(np.linalg.norm(x-y), 4))
print("triangle_gap", round(np.linalg.norm(x)+np.linalg.norm(y)-np.linalg.norm(x+y), 4))
```

Observed output:

```text
l1 7.0
l2 5.0
linf 4.0
distance_to_y 3.6056
triangle_gap 0.0111
```

The same vector has different sizes under different norms: $7.0$ under $L_1$, $5.0$ under $L_2$, and $4.0$ under $L_\infty$. The positive triangle gap, $0.0111$, verifies that $\lVert x+y\rVert_2$ did not exceed $\lVert x\rVert_2+\lVert y\rVert_2$.

## Caveats

Distances can be dominated by scale, irrelevant dimensions, or sparse high-dimensional effects. A model optimized with one norm may behave poorly under the metric users care about, so connect the norm to the task before tuning [gradient descent](gradient-descent.md).

## References

- [NumPy documentation: `numpy.linalg.norm`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.norm.html)
- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
