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
last_reviewed: 2026-07-16
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

## Worked example

The vectors $u=(1,1,0)$ and $v=(1,-1,0)$ are orthogonal because their dot product cancels:

$$
u^\top v=1\cdot1+1\cdot(-1)+0\cdot0=0.
$$

Each has length $\sqrt2$, so normalizing gives the orthonormal pair $\hat u=\tfrac1{\sqrt2}(1,1,0)$ and $\hat v=\tfrac1{\sqrt2}(1,-1,0)$. Stacking them as columns of $Q=[\hat u\ \hat v]$,

$$
Q^\top Q=
\begin{bmatrix}\hat u^\top\hat u&\hat u^\top\hat v\\\hat v^\top\hat u&\hat v^\top\hat v\end{bmatrix}
=\begin{bmatrix}1&0\\0&1\end{bmatrix}=I,
$$

where the unit diagonal comes from the normalization and the zero off-diagonal from orthogonality. A QR decomposition of any two independent columns produces exactly such an orthonormal basis automatically.

## Caveats

Orthogonality depends on the inner product. Standard Euclidean orthogonality may be the wrong geometry when features have different units or correlated noise; then [norms and distances](norms-and-distances.md) or whitening need to define the metric first.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Rank](rank.md) [Norms and Distances →](norms-and-distances.md)
