---
title: Convex Optimization
slug: mathematical-foundations/convex-optimization
description: "Optimization problems where convexity turns local optimality into global optimality."
area: mathematical-foundations
topics:
  - optimization
  - convexity
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - optimization.md
related:
  - optimization.md
  - constrained-optimization.md
  - gradient-descent.md
  - jacobians-and-hessians.md
  - ../03-classical-machine-learning/logistic-regression.md
historical_context: false
last_reviewed: 2026-07-11
---
# Convex Optimization

Convex optimization studies problems where the feasible set and objective have no hidden local traps. This is why least squares, regularized linear models, and [logistic regression](../03-classical-machine-learning/logistic-regression.md) are easier to reason about than general neural-network training.

## Defining math

A set $C$ is convex if

$$
\theta x+(1-\theta)y\in C\quad\text{for all }x,y\in C,\;\theta\in[0,1].
$$

A function $f$ is convex if

$$
f(\theta x+(1-\theta)y)\le \theta f(x)+(1-\theta)f(y).
$$

The problem

$$
\min_{x\in C} f(x)
$$

is convex when both conditions hold. For differentiable $f$, $f(y)\ge f(x)+\nabla f(x)^\top(y-x)$ gives the supporting-hyperplane view. For twice-differentiable $f$, $\nabla^2 f(x)\succeq 0$ connects convexity to [Jacobians and Hessians](jacobians-and-hessians.md).

## Executed demo

```python
import numpy as np

xs = np.array([-2., 1., 4.])
w = np.array([0.2, 0.5, 0.3])
lhs = (w @ xs)**2
rhs = w @ (xs**2)
print("f(weighted_mean)", round(lhs, 4))
print("weighted_f_mean", round(rhs, 4))
print("gap", round(rhs-lhs, 4))
```

Observed output:

```text
f(weighted_mean) 1.69
weighted_f_mean 6.1
gap 4.41
```

For $f(x)=x^2$, Jensen's inequality holds with a positive gap: evaluating after averaging is below averaging the evaluations.

## Caveats

Convexity is a property of the chosen variables and formulation. Reparameterizing can destroy it, constraints can make the feasible set nonconvex, and stochastic training noise can still slow [gradient descent](gradient-descent.md) even when the objective is convex.

## References

- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
- [Stanford EE364a: Convex Optimization I](https://web.stanford.edu/class/ee364a/)
