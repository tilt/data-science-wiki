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
status: complete
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
last_reviewed: 2026-07-17
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

## Worked example

Let $v=(2,-1,3)$ and $M=\begin{bmatrix}1&0&2\\0&-1&1\end{bmatrix}$. The self-dot product is the squared Euclidean length,

$$
v^\top v=2^2+(-1)^2+3^2=14=\lVert v\rVert_2^2,
$$

the matrix-vector product compresses three coordinates into two,

$$
Mv=\begin{bmatrix}1(2)+0(-1)+2(3)\\0(2)+(-1)(-1)+1(3)\end{bmatrix}=\begin{bmatrix}8\\4\end{bmatrix},
$$

and the first row of the outer product $vv^\top$ is $2\,v=(4,-2,6)$. That same linear-map view underlies [linear algebra](linear-algebra.md), dense layers in [neural network fundamentals](../06-deep-learning/neural-network-fundamentals.md), and low-dimensional embeddings.

## Caveats

Shape errors are semantic errors, not just syntax errors: a feature vector stored as shape $(d,)$ can behave differently from a row matrix $(1,d)$ or column matrix $(d,1)$. Units matter too; adding a price feature and an age feature before scaling can make distances meaningless.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Linear Algebra](linear-algebra.md) [Matrix Multiplication →](matrix-multiplication.md)
