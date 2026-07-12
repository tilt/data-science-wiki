---
title: Jacobians and Hessians
slug: mathematical-foundations/jacobians-and-hessians
description: "First- and second-derivative matrices for vector functions and scalar objectives."
area: mathematical-foundations
topics:
  - calculus
  - jacobians
  - hessians
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - gradients.md
related:
  - gradients.md
  - matrix-multiplication.md
  - convex-optimization.md
  - optimization.md
  - ../06-deep-learning/backpropagation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Jacobians and Hessians

Jacobians organize first derivatives of vector-valued functions. Hessians organize second derivatives of scalar functions. They are the matrix form of local change, so they connect [calculus](calculus.md) to optimization, curvature, and chain-rule computation.

## Defining math

For $f:\mathbb R^n\to\mathbb R^m$, the Jacobian is

$$
J_f(x)_{ij}=\frac{\partial f_i}{\partial x_j}.
$$

For $g:\mathbb R^n\to\mathbb R$, the Hessian is

$$
\nabla^2 g(x)_{ij}=\frac{\partial^2 g}{\partial x_i\partial x_j}.
$$

The Jacobian composes through [matrix multiplication](matrix-multiplication.md):

$$
J_{f\circ h}(x)=J_f(h(x))J_h(x).
$$

The Hessian describes local curvature. In unconstrained twice-differentiable [convex optimization](convex-optimization.md), $\nabla^2 g(x)\succeq 0$ everywhere is a curvature certificate.

## Executed demo

```python
import numpy as np

x = np.array([1., 2.])
J = np.array([[2*x[0], 1.], [x[1], x[0]]])
H = np.array([[6*x[0], 0.], [0., 2.]])
print("jacobian_at_[1,2]")
print(J)
print("hessian_at_[1,2]")
print(H)
print("hessian_eigvals", np.linalg.eigvalsh(H))
```

Observed output:

```text
jacobian_at_[1,2]
[[2. 1.]
 [2. 1.]]
hessian_at_[1,2]
[[6. 0.]
 [0. 2.]]
hessian_eigvals [2. 6.]
```

Here $f(x_1,x_2)=(x_1^2+x_2,x_1x_2)$ and $g(x_1,x_2)=x_1^3+x_2^2$. The positive Hessian eigenvalues at $(1,2)$ show locally positive curvature in both coordinate directions.

## Caveats

Full Jacobians and Hessians can be too large to materialize. Modern autodiff often computes Jacobian-vector or vector-Jacobian products instead, which is the practical form used by [backpropagation](../06-deep-learning/backpropagation.md).

## References

- [MIT OpenCourseWare: 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
