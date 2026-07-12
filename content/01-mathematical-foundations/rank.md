---
title: Rank
slug: mathematical-foundations/rank
description: "The dimension of the independent information carried by a matrix."
area: mathematical-foundations
topics:
  - linear-algebra
  - rank
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - linear-algebra.md
related:
  - linear-algebra.md
  - matrix-multiplication.md
  - singular-value-decomposition.md
  - low-rank-approximation.md
  - ../04-recommendation-systems/latent-factor-models.md
historical_context: false
last_reviewed: 2026-07-11
---
# Rank

Rank is the number of independent directions in a matrix. It tells how many dimensions a linear map can preserve, how many independent columns a design matrix has, and how many factors a [low-rank approximation](low-rank-approximation.md) is allowed to use.

## Defining math

For $A\in\mathbb R^{m\times n}$,

$$
\operatorname{rank}(A)=\dim(\operatorname{col}(A))=\dim(\operatorname{row}(A)).
$$

Equivalently, rank is the number of nonzero singular values in the [SVD](singular-value-decomposition.md):

$$
\operatorname{rank}(A)=|\{i:\sigma_i(A)>0\}|.
$$

Rank controls solvability and identifiability. If a regression design matrix lacks full column rank, several coefficient vectors can produce the same fitted values. In recommender [latent-factor models](../04-recommendation-systems/latent-factor-models.md), choosing factor dimension is choosing an explicit rank bottleneck.

## Executed demo

```python
import numpy as np

A = np.array([[1., 2., 3.], [2., 4., 6.], [1., 1., 1.]])
print("rank", np.linalg.matrix_rank(A))
print("singular_values", np.round(np.linalg.svd(A, compute_uv=False), 6))
print("det_first_2x2", np.linalg.det(A[:2, :2]))
```

Observed output:

```text
rank 2
singular_values [8.5198 0.6429 0.    ]
det_first_2x2 0.0
```

The second row is twice the first, so the matrix has only two independent directions. The zero singular value exposes the lost dimension even though the matrix has three rows and three columns.

## Caveats

Numerical rank is thresholded. Floating-point noise can turn exact zeros into tiny nonzero singular values, and nearly collinear features can be full-rank but still unstable. Always interpret rank with the scale of the singular values and downstream sensitivity.

## References

- [NumPy documentation: `numpy.linalg.matrix_rank`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.matrix_rank.html)
- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
