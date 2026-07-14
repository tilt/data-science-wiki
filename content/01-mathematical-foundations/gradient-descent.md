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
last_reviewed: 2026-07-11
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

## Executed demo

The snippet applies the update to a one-dimensional quadratic so the step-size effect is visible without optimizer boilerplate.

```python
x = 6.0
eta = 0.2
for _ in range(12):
    x -= eta * 2*(x-1)
print("x_after_12", round(x, 6))
print("f_after_12", round((x-1)**2, 8))
```

Observed output:

```text
x_after_12 1.010884
f_after_12 0.00011846
```

Starting from $6$, the iterates nearly reach the minimizer $x=1$ after twelve steps. The remaining error follows the contraction factor $1-2\eta=0.6$.

The path on the loss curve shows the same contraction geometrically: each step moves left toward the minimum and the vertical loss value shrinks rapidly.

![Gradient descent iterates move down a quadratic objective toward the minimizer.](../assets/diagrams/gradient-descent-quadratic-path.svg)

## Caveats

Learning rate dominates behavior. Too small wastes iterations; too large oscillates or diverges. Ill-conditioned curvature makes progress fast in steep directions and slow in flat ones, which is why scaling, momentum, and second-order information matter.

## References

- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
- [MIT OpenCourseWare: 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)
