---
title: Gradients
slug: mathematical-foundations/gradients
description: Concise guide to Gradients in Mathematical Foundations.
area: mathematical-foundations
topics:
  - gradients
level: foundational
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

A gradient is the vector of partial derivatives of a scalar function. In ML, gradients tell training algorithms how changing each parameter would change the loss locally.

## Definition

For $f(x_1,\ldots,x_n)$,

$$
\nabla f = \left[\frac{\partial f}{\partial x_1}, \ldots, \frac{\partial f}{\partial x_n}\right].
$$

The gradient points in the direction of steepest local increase. Moving in the negative gradient direction decreases the function most quickly for a small step.

## Example

For

$$
f(x,y)=x^2+3y^2,
$$

the gradient is

$$
\nabla f = [2x, 6y].
$$

At $(1,2)$, the gradient is $[2,12]$, so the function is much more sensitive to changes in $y$ than $x$ at that point.

## ML intuition

Backpropagation computes gradients of a loss with respect to millions or billions of parameters using the chain rule. Optimizers then use those gradients to update the parameters.

## Caveats

Gradients are local. They can point toward a poor region when the loss surface is non-convex, be too small to make progress, or become numerically unstable. Gradient checks on small examples help catch implementation errors.
