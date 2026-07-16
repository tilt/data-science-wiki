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
last_reviewed: 2026-07-16
---

# Matrix Decompositions

A matrix decomposition rewrites a matrix as a product of simpler matrices. The point is not cosmetic: the factors can expose [rank](rank.md), [orthogonality](orthogonality.md), curvature, covariance axes, or a computational path that is more stable than operating on the original matrix directly.

## Defining math

Common decompositions emphasize different structure:

$$
A=QR,\qquad A=LL^\top,\qquad A=Q\Lambda Q^\top,\qquad A=U\Sigma V^\top.
$$

QR uses orthonormal columns for least squares; Cholesky $A=LL^\top$ applies to symmetric positive definite matrices; eigendecomposition describes square maps with eigenvectors; [singular value decomposition](singular-value-decomposition.md) applies broadly and drives [PCA](../03-classical-machine-learning/pca.md) and [low-rank approximation](low-rank-approximation.md).

## Worked example

Cholesky factors a symmetric positive definite matrix as $A=LL^\top$ with $L$ lower-triangular. For $A=\begin{bmatrix}4&2\\2&3\end{bmatrix}$, write $L=\begin{bmatrix}\ell_{11}&0\\\ell_{21}&\ell_{22}\end{bmatrix}$ and match the entries of $LL^\top$ to $A$ one at a time:

$$
\ell_{11}^2=4\Rightarrow\ell_{11}=2,\qquad
\ell_{21}\ell_{11}=2\Rightarrow\ell_{21}=1,\qquad
\ell_{21}^2+\ell_{22}^2=3\Rightarrow\ell_{22}=\sqrt2.
$$

So $L=\begin{bmatrix}2&0\\1&\sqrt2\end{bmatrix}$, and indeed $LL^\top=\begin{bmatrix}4&2\\2&3\end{bmatrix}=A$. The positive diagonal $(2,\sqrt2)$ certifies that $A$ is positive definite — the kind of property a decomposition makes easy to read off.

## Caveats

Each decomposition has preconditions. Cholesky fails outside positive definite matrices; eigendecomposition can be ill-conditioned for non-normal matrices; forming $A^\top A$ may square the condition number, which is a [numerical stability](numerical-stability.md) issue.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Eigenvalues and Eigenvectors](eigenvalues-and-eigenvectors.md) [Singular Value Decomposition →](singular-value-decomposition.md)
