---
title: Optimization
slug: mathematical-foundations/optimization
description: Concise guide to Optimization in Mathematical Foundations.
area: mathematical-foundations
topics:
  - optimization
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

Optimization chooses variables that minimize a loss, maximize a reward, or satisfy a tradeoff. It is the mathematical engine behind fitting models, tuning systems, allocating resources, and selecting policies.

## Problem form

A typical optimization problem is

$$
\min_x f(x),
$$

where $x$ is the decision variable and $f$ is the objective. Constraints, regularizers, penalties, and stochastic estimates make real problems richer than this simple form.

## ML examples

Training linear regression minimizes squared error. Training logistic regression minimizes cross-entropy. Tuning a recommender may optimize engagement subject to latency and diversity constraints. Reinforcement learning optimizes expected return under uncertainty.

## Step-by-step framing

To formulate an optimization problem:

1. choose the decision variables;
2. define the objective;
3. add constraints or penalties;
4. decide what data estimates the objective;
5. choose an algorithm appropriate for smoothness, scale, and convexity.

## Caveats

The optimizer solves the objective you give it, not the intent you had. Poor objectives can reward shortcuts, unfair outcomes, overfitting, or operationally impossible solutions. Debug the objective and data before blaming the algorithm.
