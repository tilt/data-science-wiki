---
title: Constrained Optimization
slug: mathematical-foundations/constrained-optimization
description: "Optimization with equality or inequality restrictions on feasible solutions."
area: mathematical-foundations
topics:
  - optimization
  - constraints
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - optimization.md
related:
  - optimization.md
  - convex-optimization.md
  - gradients.md
  - numerical-stability.md
  - ../03-classical-machine-learning/support-vector-machines.md
historical_context: false
last_reviewed: 2026-07-17
---

# Constrained Optimization

Constrained optimization minimizes an [optimization](optimization.md) objective only over allowed solutions. The constraint may encode physics, budgets, fairness rules, simplex probabilities, or margins as in [support vector machines](../03-classical-machine-learning/support-vector-machines.md).

## Defining math

A constrained problem has the form

$$
\min_x f(x)\quad\text{subject to}\quad h_i(x)=0,\; g_j(x)\le 0.
$$

For equality constraints, the Lagrangian is

$$
\mathcal L(x,\lambda)=f(x)+\sum_i \lambda_i h_i(x).
$$

At a regular equality-constrained optimum, stationarity requires

$$
\nabla_x\mathcal L(x^\star,\lambda^\star)=0,\qquad h_i(x^\star)=0.
$$

The multiplier says how much the optimum would change if the constraint moved. In [convex optimization](convex-optimization.md), additional KKT conditions can certify global optimality, while the stationarity equation is still written in terms of [gradients](gradients.md).

## Worked example

Minimize $f(x,y)=x^2+y^2$ subject to $x+y=1$. The Lagrangian is $\mathcal L=x^2+y^2+\lambda(x+y-1)$, and stationarity in $x$ and $y$ gives

$$
\frac{\partial\mathcal L}{\partial x}=2x+\lambda=0,\qquad
\frac{\partial\mathcal L}{\partial y}=2y+\lambda=0,
$$

so $x=y=-\lambda/2$. The constraint $x+y=1$ then forces $x=y=\tfrac12$ (with $\lambda=-1$). The unconstrained minimum of $x^2+y^2$ is $(0,0)$, but the line $x+y=1$ pushes the closest feasible point to $(0.5,0.5)$, where the objective is $0.5^2+0.5^2=0.5$.

## Caveats

Constraints can make easy-looking objectives hard. Infeasible constraints, badly scaled constraints, and active-set changes often create more [numerical stability](numerical-stability.md) trouble than the objective itself, so monitor feasibility alongside objective value.

## References

- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Convex Optimization](convex-optimization.md) [Gradient Descent →](gradient-descent.md)
