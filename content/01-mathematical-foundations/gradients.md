---
title: Gradients
slug: mathematical-foundations/gradients
description: "Vectors of partial derivatives that point toward steepest local increase."
area: mathematical-foundations
topics:
  - calculus
  - gradients
level: foundational
status: complete
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
last_reviewed: 2026-07-17
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

## Worked example

Take weights $w=(1.5,-0.5)$, input $x=(2,-1)$, and target $y=4$. The prediction is $x^\top w=2(1.5)+(-1)(-0.5)=3.5$, so the residual is $x^\top w-y=-0.5$ and the loss is $(-0.5)^2=0.25$. Substituting into $\nabla_w L=2(x^\top w-y)x$,

$$
\nabla_w L=2(-0.5)\begin{bmatrix}2\\-1\end{bmatrix}=\begin{bmatrix}-2\\1\end{bmatrix}.
$$

A centered finite-difference check, $\big(L(w+\epsilon e_j)-L(w-\epsilon e_j)\big)/2\epsilon$ for each coordinate $j$, reproduces the same vector — the standard sanity test when implementing custom derivatives.

## Caveats

Gradients are local. A small gradient can mean a minimum, a saddle point, saturation, or bad scaling. For curvature and second-order checks, use [Jacobians and Hessians](jacobians-and-hessians.md) rather than gradient magnitude alone.

## References

- [MIT OpenCourseWare: 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Calculus](calculus.md) [Jacobians and Hessians →](jacobians-and-hessians.md)
