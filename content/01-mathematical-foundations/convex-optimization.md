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
last_reviewed: 2026-07-16
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

## Worked example

Take $f(x)=x^2$ with points $x=(-2,1,4)$ and weights $\theta=(0.2,0.5,0.3)$. The weighted mean and the function evaluated there are

$$
\bar x=0.2(-2)+0.5(1)+0.3(4)=1.3,\qquad f(\bar x)=1.3^2=1.69,
$$

while the weighted mean of the function values is

$$
0.2(-2)^2+0.5(1)^2+0.3(4)^2=0.8+0.5+4.8=6.1.
$$

Jensen's inequality holds with a positive gap of $6.1-1.69=4.41$ — the visible cost of spread under a curved convex function.

## Caveats

Convexity is a property of the chosen variables and formulation. Reparameterizing can destroy it, constraints can make the feasible set nonconvex, and stochastic training noise can still slow [gradient descent](gradient-descent.md) even when the objective is convex.

## References

- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
- [Stanford EE364a: Convex Optimization I](https://web.stanford.edu/class/ee364a/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Optimization](optimization.md) [Constrained Optimization →](constrained-optimization.md)
