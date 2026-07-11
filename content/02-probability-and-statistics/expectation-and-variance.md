---
title: Expectation and Variance
slug: probability-and-statistics/expectation-and-variance
description: Concise guide to Expectation and Variance in Probability and Statistics.
area: probability-and-statistics
topics:
  - expectation-and-variance
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

Expectation describes the average value of a random variable under repeated sampling. Variance describes how much values tend to spread around that average.

## Definitions

For a discrete random variable,

$$
E[X]=\sum_x xP(X=x).
$$

Variance is

$$
\operatorname{Var}(X)=E[(X-E[X])^2].
$$

The standard deviation is the square root of variance and has the same unit as the original variable.

## Example

A support queue receives 0, 1, or 2 urgent tickets in an hour with probabilities 0.5, 0.3, and 0.2. The expected count is

$$
0\cdot0.5 + 1\cdot0.3 + 2\cdot0.2 = 0.7.
$$

This does not mean every hour has 0.7 tickets; it is the long-run average.

## Practical use

Expected loss is the target for many ML objectives. Variance explains uncertainty, noise, and estimator reliability. Bias-variance tradeoffs, confidence intervals, and risk-sensitive decisions all depend on these ideas.

## Failure modes

Averages can hide tail risk and segment differences. Variance may be infinite or unstable for heavy-tailed distributions, and empirical variance can be misleading with small samples.
