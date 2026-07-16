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
last_reviewed: 2026-07-16
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

## Worked example

Take $A=\begin{bmatrix}1&2&3\\2&4&6\\1&1&1\end{bmatrix}$. The second row is exactly twice the first, $R_2=2R_1$, so the rows span only two independent directions and $\operatorname{rank}(A)=2$. The same dependence shows up in the top-left $2\times2$ block, whose determinant vanishes:

$$
\det\begin{bmatrix}1&2\\2&4\end{bmatrix}=1\cdot4-2\cdot2=0.
$$

Computed numerically, the singular values are $\sigma\approx(8.52,\ 0.64,\ 0)$. The single zero exposes the lost dimension even though the matrix has three rows and three columns.

## Caveats

Numerical rank is thresholded. Floating-point noise can turn exact zeros into tiny nonzero singular values, and nearly collinear features can be full-rank but still unstable. Always interpret rank with the scale of the singular values and downstream sensitivity.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Matrix Multiplication](matrix-multiplication.md) [Orthogonality →](orthogonality.md)
