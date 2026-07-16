---
title: Eigenvalues and Eigenvectors
slug: mathematical-foundations/eigenvalues-and-eigenvectors
description: "Directions that a square linear map only scales, with the corresponding scale factors."
area: mathematical-foundations
topics:
  - linear-algebra
  - eigenvalues
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - linear-algebra.md
related:
  - linear-algebra.md
  - matrix-decompositions.md
  - singular-value-decomposition.md
  - orthogonality.md
  - ../03-classical-machine-learning/pca.md
historical_context: false
last_reviewed: 2026-07-16
---

# Eigenvalues and Eigenvectors

An eigenvector is a direction that a square matrix stretches or shrinks without rotating away from itself. The eigenvalue is that stretch factor. They expose natural axes of transformations, covariance matrices, graph Laplacians, and stability dynamics.

## Defining math

For $A\in\mathbb R^{n\times n}$, a nonzero vector $v$ is an eigenvector when

$$
Av=\lambda v.
$$

Here $A$ is a square matrix, $v$ is a nonzero direction vector, and $\lambda$ is the scalar factor applied along that direction. The equation says that applying $A$ changes the length and possibly sign of $v$, but not its direction.

The scalar $\lambda$ is an eigenvalue, found from

$$
\det(A-\lambda I)=0.
$$

The determinant becomes zero exactly when $A-\lambda I$ loses an independent direction, which means there is a nonzero vector $v$ satisfying $Av=\lambda v$.

If $A$ is symmetric, its eigenvectors can be chosen [orthogonal](orthogonality.md), giving $A=Q\Lambda Q^\top$. This special structure is why covariance eigendecomposition and [PCA](../03-classical-machine-learning/pca.md) are stable for symmetric matrices. [SVD](singular-value-decomposition.md) extends related geometry to rectangular or non-normal matrices by using eigenvectors of $A^\top A$.

## Worked example

For $B=\begin{bmatrix}2&1\\1&2\end{bmatrix}$, solve $\det(B-\lambda I)=0$:

$$
\det\begin{bmatrix}2-\lambda&1\\1&2-\lambda\end{bmatrix}
=(2-\lambda)^2-1=\lambda^2-4\lambda+3=(\lambda-3)(\lambda-1)=0,
$$

so the eigenvalues are $\lambda=3$ and $\lambda=1$. Substituting each back into $(B-\lambda I)v=0$:

$$
\lambda=3:\ \begin{bmatrix}-1&1\\1&-1\end{bmatrix}v=0\Rightarrow v\propto(1,1);
\qquad
\lambda=1:\ \begin{bmatrix}1&1\\1&1\end{bmatrix}v=0\Rightarrow v\propto(1,-1).
$$

Both satisfy $Bv=\lambda v$ exactly. The larger eigenvalue $3$ corresponds to the direction $(1,1)$ where the matrix amplifies most strongly; along $(1,-1)$ it only scales by $1$.

## Caveats

Eigenvectors are scale-ambiguous: $v$ and $-v$ represent the same direction. Non-symmetric matrices may have complex eigenvalues or too few independent eigenvectors, so do not use eigendecomposition where [matrix decompositions](matrix-decompositions.md) such as SVD are the safer tool.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Norms and Distances](norms-and-distances.md) [Matrix Decompositions →](matrix-decompositions.md)
