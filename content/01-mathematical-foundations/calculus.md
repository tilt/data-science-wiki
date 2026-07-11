---
title: Calculus
slug: mathematical-foundations/calculus
description: Concise guide to Calculus in Mathematical Foundations.
area: mathematical-foundations
topics:
  - calculus
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

Calculus studies change and accumulation. In machine learning it explains slopes, gradients, optimization, loss minimization, backpropagation, and continuous probability densities.

## Core ideas

A derivative measures local rate of change. For a scalar function $f(x)$, the derivative $f'(x)$ tells how much $f$ changes for a small change in $x$. An integral accumulates quantities over an interval, such as probability density over a range.

For multivariable functions, partial derivatives measure change with respect to one input while holding others fixed. The gradient stacks those partial derivatives into the direction of steepest local increase.

## Step-by-step example

For squared error

$$
L(w) = (wx - y)^2,
$$

the derivative with respect to $w$ is

$$
\frac{dL}{dw} = 2(wx-y)x.
$$

If the prediction $wx$ is too high, the term $(wx-y)$ is positive, so gradient descent decreases $w$ when $x$ is positive. This is the basic mechanism behind many learning algorithms.

## Practical intuition

Calculus-based ML methods assume the objective is smooth enough locally for derivatives to be informative. When objectives are discontinuous, noisy, or flat, gradients may be unstable or unhelpful.
