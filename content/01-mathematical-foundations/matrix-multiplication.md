---
title: Matrix Multiplication
slug: mathematical-foundations/matrix-multiplication
description: "The row-by-column operation that composes linear maps and computes batched scores."
area: mathematical-foundations
topics:
  - linear-algebra
  - matrix-multiplication
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - vectors-and-matrices.md
related:
  - vectors-and-matrices.md
  - linear-algebra.md
  - gradients.md
  - jacobians-and-hessians.md
  - ../06-deep-learning/backpropagation.md
historical_context: false
last_reviewed: 2026-07-17
---

# Matrix Multiplication

Matrix multiplication is the operation that lets one linear map follow another. In data science it also computes many dot products at once: scores, projections, attention logits, and neural-network layer outputs are all variations on $XW$.

## Defining math

If $A\in\mathbb R^{m\times n}$ and $B\in\mathbb R^{n\times p}$, then

$$
(AB)_{ij}=\sum_{k=1}^n A_{ik}B_{kj}.
$$

The inner dimensions must match because each output entry is a dot product between one row of $A$ and one column of $B$. Multiplication is associative, $(AB)C=A(BC)$, but usually not commutative: $AB\ne BA$. As a composition rule, applying $B$ then $A$ gives $A(Bx)=(AB)x$.

This is why [gradients](gradients.md) in linear models contain terms like $X^\top(p-y)$ and why [backpropagation](../06-deep-learning/backpropagation.md) is full of matrix products and transposes. [Jacobians and Hessians](jacobians-and-hessians.md) generalize the same composition idea to derivatives.

## Worked example

Take

$$
X=\begin{bmatrix}1&2&0\\0&1&1\end{bmatrix},\qquad
W=\begin{bmatrix}2&-1\\0&1\\3&1\end{bmatrix}.
$$

Each entry of $XW$ is one row of $X$ dotted with one column of $W$. Writing every entry as its row-by-column sum,

$$
XW=\begin{bmatrix}
1\cdot2+2\cdot0+0\cdot3 & 1(-1)+2\cdot1+0\cdot1\\
0\cdot2+1\cdot0+1\cdot3 & 0(-1)+1\cdot1+1\cdot1
\end{bmatrix}
=\begin{bmatrix}2&1\\3&2\end{bmatrix}.
$$

The first row, second column is $1(-1)+2(1)+0(1)=1$. Reading $X$ as two examples and $W$ as two coefficient vectors, $XW$ produces two scores for each example.

## Caveats

The order of multiplication encodes meaning. $XW$ and $WX$ may both be valid in some dimensions but represent different maps. Large products can also be dominated by conditioning and scale; those issues connect to [numerical stability](numerical-stability.md), not to the algebraic definition alone.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Vectors and Matrices](vectors-and-matrices.md) [Determinants →](determinants.md)
