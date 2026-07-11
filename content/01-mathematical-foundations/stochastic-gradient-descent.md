---
title: Stochastic Gradient Descent
slug: mathematical-foundations/stochastic-gradient-descent
description: Concise guide to Stochastic Gradient Descent in Mathematical Foundations.
area: mathematical-foundations
topics:
  - stochastic-gradient-descent
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Stochastic Gradient Descent

## Summary

Optimization chooses parameters that minimize or maximize an objective. In ML, optimization quality affects both model performance and reproducibility.

## Core idea

- Gradients point in the direction of steepest local increase; gradient descent moves against them.
- Convex objectives have no bad local minima, but many ML objectives are non-convex.
- Numerical stability prevents overflow, underflow, and ill-conditioned updates.

## Worked example

For linear regression, derive the loss, compute gradients, choose a learning rate, monitor validation loss, and stop when improvement stalls or overfitting begins.

## Caveats

- The learning rate controls stability: too large can diverge, too small can stall.
- Mini-batch gradients are noisy estimates of the full gradient, so loss curves should be interpreted with smoothing or validation checks.
- Feature scaling, initialization, and conditioning can dominate convergence speed.
- Momentum, adaptive optimizers, and schedules change the update rule; compare them under the same data order and stopping criteria.
