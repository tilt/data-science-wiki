---
title: Convex Optimization
slug: mathematical-foundations/convex-optimization
description: Concise guide to Convex Optimization in Mathematical Foundations.
area: mathematical-foundations
topics:
  - convex-optimization
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

Convex optimization studies problems where every local optimum is also globally optimal. This property makes optimization more reliable and gives strong guarantees for many classical ML methods.

## Core idea

A function is convex when the line segment between any two points on its graph lies above the function. Formally,

$$
f(\theta x + (1-\theta)y) \le \theta f(x) + (1-\theta)f(y)
$$

for $0 \le \theta \le 1$. A convex optimization problem minimizes a convex objective over a convex feasible set.

## ML examples

Linear regression with squared error is convex in the weights. Logistic regression with standard regularization is also convex. Training a deep neural network is usually non-convex, so optimization can depend more heavily on initialization, architecture, and training dynamics.

## Step-by-step intuition

Imagine a bowl-shaped loss surface. Gradient descent can move downhill without getting trapped in a bad local valley because no such valley exists. It may still be slow if the bowl is narrow or badly scaled, but the target is well-defined.

## Caveats

Convexity can be lost by changing the parameterization, adding non-convex constraints, or optimizing a surrogate that differs from the real business objective. Always check what variable the problem is convex in.
