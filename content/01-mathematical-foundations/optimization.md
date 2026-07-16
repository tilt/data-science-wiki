---
title: Optimization
slug: mathematical-foundations/optimization
description: "Choosing variables to minimize or maximize an objective under possible constraints."
area: mathematical-foundations
topics:
  - optimization
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - gradients.md
related:
  - gradient-descent.md
  - convex-optimization.md
  - constrained-optimization.md
  - numerical-stability.md
  - ../06-deep-learning/optimizers.md
historical_context: false
last_reviewed: 2026-07-16
---

# Optimization

Optimization is the task of choosing variables that make an objective small or large. In machine learning the variables are often parameters, the objective is a loss plus regularization, and the algorithm may be a deterministic solver, [gradient descent](gradient-descent.md), or a stochastic optimizer.

## Defining math

A standard minimization problem is

$$
\min_{x\in\mathcal X} f(x).
$$

With equality and inequality constraints it becomes

$$
\min_x f(x)\quad\text{subject to}\quad h_i(x)=0,\; g_j(x)\le 0.
$$

Unconstrained differentiable optima satisfy the first-order stationarity condition $\nabla f(x^\star)=0$, but that is only a candidate condition unless curvature or global structure is known. [Convex optimization](convex-optimization.md) is special because local minima are global minima.

## Worked example

Minimize $f(z)=(z_1-2)^2+(z_2+1)^2$. Applying the stationarity condition $\nabla f(z)=0$,

$$
\nabla f(z)=\begin{bmatrix}2(z_1-2)\\2(z_2+1)\end{bmatrix}=0
\quad\Longrightarrow\quad
z^\star=(2,-1),
$$

with objective $f(z^\star)=0$. The two coordinates decouple, so each squared term is minimized independently at its own center. For nonconvex losses such as deep-network training, an optimizer may instead find only a useful stationary point, which is why [optimizers](../06-deep-learning/optimizers.md) are judged empirically as well as mathematically.

## Caveats

The objective defines the behavior. A perfectly optimized proxy can still be misaligned with the real task, and poor scaling can make a mathematically simple problem numerically hard. Constraints, regularization, and [numerical stability](numerical-stability.md) are part of the optimization problem, not afterthoughts.

## References

- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Jacobians and Hessians](jacobians-and-hessians.md) [Convex Optimization →](convex-optimization.md)
