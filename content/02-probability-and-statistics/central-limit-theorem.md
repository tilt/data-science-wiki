---
title: Central Limit Theorem
slug: probability-and-statistics/central-limit-theorem
description: Concise guide to Central Limit Theorem in Probability and Statistics.
area: probability-and-statistics
topics:
  - central-limit-theorem
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

The central limit theorem explains why sums and averages of many independent, well-behaved random variables often look approximately normal. It is the reason normal approximations appear throughout statistics.

## Core idea

If $X_1,\ldots,X_n$ are independent with finite mean and variance, the standardized sample mean tends toward a normal distribution as $n$ grows:

$$
\frac{\bar{X}-\mu}{\sigma/\sqrt{n}} \Rightarrow N(0,1).
$$

The individual observations do not need to be normal.

## Example

Individual purchase amounts may be skewed, but the average purchase amount across many independent customers can be approximately normal. This supports approximate confidence intervals for the mean.

## Practical use

The theorem justifies many standard errors, confidence intervals, and hypothesis tests. It also explains why aggregation often looks more stable than individual observations.

## Failure modes

The approximation can be poor for small samples, heavy-tailed data, strong dependence, or highly skewed distributions. Time series and clustered data need special care because independence may fail.
