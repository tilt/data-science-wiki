---
title: Gradient Descent
slug: mathematical-foundations/gradient-descent
description: "An iterative first-order method that moves parameters opposite the gradient."
area: mathematical-foundations
topics:
  - optimization
  - gradient-descent
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - gradients.md
related:
  - gradients.md
  - stochastic-gradient-descent.md
  - optimization.md
  - convex-optimization.md
  - ../06-deep-learning/optimizers.md
historical_context: false
last_reviewed: 2026-07-16
---

# Gradient Descent

Gradient descent minimizes a differentiable objective by repeatedly moving opposite the [gradient](gradients.md). It is the simplest first-order optimizer and the conceptual base for stochastic and adaptive deep-learning [optimizers](../06-deep-learning/optimizers.md).

## Defining math

For objective $f(\theta)$, the update is

$$
\theta_{t+1}=\theta_t-\eta\nabla f(\theta_t),
$$

where $\eta>0$ is the learning rate. On a quadratic $f(x)=(x-a)^2$, the gradient is $2(x-a)$, so the update contracts the distance to $a$ when $0<\eta<1$:

$$
x_{t+1}-a=(1-2\eta)(x_t-a).
$$

In [convex optimization](convex-optimization.md), suitable step sizes can provide convergence guarantees. In nonconvex learning, the same update is useful but no longer guarantees a global optimum.

## Worked example

Minimize $f(x)=(x-1)^2$ from $x_0=6$ with $\eta=0.2$. The update $x_{t+1}=x_t-\eta\cdot2(x_t-1)$ turns, after subtracting the minimizer, into a geometric contraction with factor $1-2\eta=0.6$:

$$
x_t-1=(1-2\eta)^t(x_0-1)=0.6^t\cdot5.
$$

After twelve steps, $x_{12}-1=0.6^{12}\cdot5\approx0.0109$, so $x_{12}\approx1.0109$ and $f(x_{12})=(0.0109)^2\approx1.2\times10^{-4}$: the iterates nearly reach the minimizer, and the error shrinks by a factor of $0.6$ each step.

The path on the loss curve shows the same contraction geometrically: each step moves left toward the minimum and the vertical loss value shrinks rapidly.

![Gradient descent iterates move down a quadratic objective toward the minimizer.](../assets/diagrams/gradient-descent-quadratic-path.svg)

## Caveats

Learning rate dominates behavior. Too small wastes iterations; too large oscillates or diverges. Ill-conditioned curvature makes progress fast in steep directions and slow in flat ones, which is why scaling, momentum, and second-order information matter.

## References

- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
- [MIT OpenCourseWare: 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Constrained Optimization](constrained-optimization.md) [Stochastic Gradient Descent →](stochastic-gradient-descent.md)
