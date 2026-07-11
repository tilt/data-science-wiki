---
title: Gradient Descent
slug: mathematical-foundations/gradient-descent
description: Concise guide to Gradient Descent in Mathematical Foundations.
area: mathematical-foundations
topics:
  - gradient-descent
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
## Summary

Gradient descent is an iterative method for minimizing differentiable objectives. It updates parameters in the direction that most quickly decreases the loss locally.

## Algorithm

For parameters $\theta$ and learning rate $\eta$:

$$
\theta_{t+1} = \theta_t - \eta \nabla L(\theta_t).
$$

The gradient gives the direction of steepest increase, so subtracting it moves downhill. Batch gradient descent uses all training examples; stochastic and mini-batch variants estimate the gradient from subsets.

## Step-by-step example

For $L(w)=(w-3)^2$, the gradient is $2(w-3)$. Starting at $w=0$ with $\eta=0.1$:

1. gradient is $-6$;
2. update gives $w=0-0.1(-6)=0.6$;
3. the next gradient is $2(0.6-3)=-4.8$;
4. update gives $w=1.08$.

The parameter moves toward 3.

## Practical choices

The learning rate controls stability and speed. Too large can diverge; too small can stall. Feature scaling, normalization, momentum, adaptive optimizers, and learning-rate schedules often matter more than the exact base algorithm.

## Caveats

Gradient descent can struggle with noisy gradients, saddle points, exploding gradients, vanishing gradients, and badly scaled parameters.
