---
title: Matrix Multiplication
slug: mathematical-foundations/matrix-multiplication
description: "The row-by-column operation that composes linear maps and computes batched scores."
area: mathematical-foundations
topics:
  - linear-algebra
  - matrix-multiplication
level: foundational
status: review
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
last_reviewed: 2026-07-11
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

## Executed demo

This snippet multiplies two small matrices and separately recomputes one output entry as a row-column dot product.

```python
import numpy as np

X = np.array([[1., 2., 0.], [0., 1., 1.]])
W = np.array([[2., -1.], [0., 1.], [3., 1.]])
print("XW")
print(X @ W)
print("manual_entry_0_1", X[0] @ W[:, 1])
```

Observed output:

```text
XW
[[2. 1.]
 [3. 2.]]
manual_entry_0_1 1.0
```

The first row, second column equals $1(-1)+2(1)+0(1)=1$. Reading $X$ as two examples and $W$ as two coefficient vectors, $XW$ produces two scores for each example.

## Caveats

The order of multiplication encodes meaning. $XW$ and $WX$ may both be valid in some dimensions but represent different maps. Large products can also be dominated by conditioning and scale; those issues connect to [numerical stability](numerical-stability.md), not to the algebraic definition alone.

## References

- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
- [NumPy documentation: `numpy.linalg.norm`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.norm.html)

> **Section — [Mathematical Foundations](index.md):** ← [Vectors and Matrices](vectors-and-matrices.md) · [Rank](rank.md) →
