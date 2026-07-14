---
title: Gradients
slug: mathematical-foundations/gradients
description: "Vectors of partial derivatives that point toward steepest local increase."
area: mathematical-foundations
topics:
  - calculus
  - gradients
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - calculus.md
related:
  - calculus.md
  - jacobians-and-hessians.md
  - gradient-descent.md
  - stochastic-gradient-descent.md
  - ../06-deep-learning/backpropagation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Gradients

The gradient of a scalar function is the vector of partial derivatives. It gives the local direction of steepest increase under the Euclidean norm, so its negative is the basic descent direction used by [gradient descent](gradient-descent.md) and neural-network [backpropagation](../06-deep-learning/backpropagation.md).

## Defining math

For $f:\mathbb R^d\to\mathbb R$,

$$
\nabla f(x)=
\begin{bmatrix}
\frac{\partial f}{\partial x_1}\\
\vdots\\
\frac{\partial f}{\partial x_d}
\end{bmatrix}.
$$

The first-order approximation is

$$
f(x+\Delta)\approx f(x)+\nabla f(x)^\top\Delta.
$$

For squared error on one linear prediction, $L(w)=(x^\top w-y)^2$, the gradient is

$$
\nabla_w L=2(x^\top w-y)x.
$$

This formula is the small local object that becomes batched matrix expressions in [matrix multiplication](matrix-multiplication.md) and stochastic estimates in [stochastic gradient descent](stochastic-gradient-descent.md).

## Executed demo

This snippet computes the gradient of a squared-error loss analytically and checks it against a centered finite-difference approximation.

```python
import numpy as np

w = np.array([1.5, -0.5])
x = np.array([2., -1.])
y = 4.0
pred = x @ w
loss = (pred-y)**2
grad = 2*(pred-y)*x
eps = 1e-6
fd = []
for j in range(2):
    e = np.zeros(2); e[j] = eps
    fd.append((((x@(w+e)-y)**2) - ((x@(w-e)-y)**2))/(2*eps))
print("loss", round(loss, 4))
print("analytic_grad", np.round(grad, 4))
print("finite_diff_grad", np.round(fd, 4))
```

Observed output:

```text
loss 0.25
analytic_grad [-2.  1.]
finite_diff_grad [-2.  1.]
```

The prediction is off by $-0.5$, so the squared loss is $0.25$ and the analytic gradient is $2(-0.5)[2,-1]=[-2,1]$. The finite-difference gradient prints the same vector, which is the same sanity test used when implementing custom derivatives.

## Caveats

Gradients are local. A small gradient can mean a minimum, a saddle point, saturation, or bad scaling. For curvature and second-order checks, use [Jacobians and Hessians](jacobians-and-hessians.md) rather than gradient magnitude alone.

## References

- [MIT OpenCourseWare: 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
