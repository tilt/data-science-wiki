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
last_reviewed: 2026-07-11
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

## Executed demo

This snippet uses SciPy to minimize a convex quadratic and prints the recovered minimizer, final objective value, and iteration count.

```python
import numpy as np
from scipy import optimize

res = optimize.minimize(lambda z: (z[0]-2)**2 + (z[1]+1)**2, x0=np.array([0., 0.]))
print("x_star", np.round(res.x, 6))
print("objective", round(res.fun, 12))
print("iterations", res.nit)
```

Observed output:

```text
x_star [ 2. -1.]
objective 0.0
iterations 2
```

The solver finds the bottom of a shifted quadratic. For nonconvex losses such as deep-network training, an optimizer may instead find a useful stationary point, which is why [optimizers](../06-deep-learning/optimizers.md) are judged empirically as well as mathematically.

## Caveats

The objective defines the behavior. A perfectly optimized proxy can still be misaligned with the real task, and poor scaling can make a mathematically simple problem numerically hard. Constraints, regularization, and [numerical stability](numerical-stability.md) are part of the optimization problem, not afterthoughts.

## References

- [SciPy documentation: `scipy.optimize.minimize`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize.html)
- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)

> **Section — [Mathematical Foundations](index.md):** ← [Jacobians and Hessians](jacobians-and-hessians.md) · [Convex Optimization](convex-optimization.md) →
