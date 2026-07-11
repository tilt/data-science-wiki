---
title: Constrained Optimization
slug: mathematical-foundations/constrained-optimization
description: Concise guide to Constrained Optimization in Mathematical Foundations.
area: mathematical-foundations
topics:
  - constrained-optimization
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Constrained optimization minimizes or maximizes an objective while satisfying restrictions. It appears in regularized learning, resource allocation, fairness constraints, portfolio choice, and hyperparameter tuning under latency or cost limits.

## Core idea

A constrained problem has the form

$$
\min_x f(x) \quad \text{subject to} \quad g_i(x) \le 0,\ h_j(x)=0.
$$

The constraints define the feasible set. The best unconstrained point may be invalid, so the optimizer must trade objective value against feasibility.

## Example

A ranking model might maximize expected engagement while requiring latency below 50 ms and limiting repeated exposure of the same item category. The best pure engagement ranker may violate diversity or latency constraints, so the production solution must optimize within allowed boundaries.

## Lagrange intuition

For equality constraints, Lagrange multipliers convert a constrained problem into a condition involving the objective and constraints:

$$
\nabla f(x) + \lambda \nabla h(x)=0.
$$

At the optimum, improving the objective locally would require moving outside the constraint surface.

## Caveats

Constrained optimization fails when constraints are infeasible, poorly scaled, or only loosely connected to the real policy. In ML systems, soft penalties are often easier to optimize than hard constraints, but they do not guarantee compliance.
