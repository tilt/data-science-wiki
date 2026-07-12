---
title: Constrained Optimization
slug: mathematical-foundations/constrained-optimization
description: "Optimization with equality or inequality restrictions on feasible solutions."
area: mathematical-foundations
topics:
  - optimization
  - constraints
level: intermediate
status: review
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
last_reviewed: 2026-07-11
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

## Executed demo

```python
import numpy as np
from scipy import optimize

cons = {"type": "eq", "fun": lambda z: z[0] + z[1] - 1}
res = optimize.minimize(lambda z: z[0]**2 + z[1]**2,
                        x0=np.array([2., -1.]), constraints=cons)
print("x_star", np.round(res.x, 6))
print("objective", round(res.fun, 6))
print("constraint", round(res.x.sum(), 6))
```

Observed output:

```text
x_star [0.5 0.5]
objective 0.5
constraint 1.0
```

The unconstrained minimum of $x^2+y^2$ is $(0,0)$, but the line $x+y=1$ forces the closest feasible point to be $(0.5,0.5)$.

## Caveats

Constraints can make easy-looking objectives hard. Infeasible constraints, badly scaled constraints, and active-set changes often create more [numerical stability](numerical-stability.md) trouble than the objective itself, so monitor feasibility alongside objective value.

## References

- [SciPy documentation: `scipy.optimize.minimize`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize.html)
- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
