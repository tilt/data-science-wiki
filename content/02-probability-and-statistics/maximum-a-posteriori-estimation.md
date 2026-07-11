---
title: Maximum A Posteriori Estimation
slug: probability-and-statistics/maximum-a-posteriori-estimation
description: Concise guide to Maximum A Posteriori Estimation in Probability and Statistics.
area: probability-and-statistics
topics:
  - maximum-a-posteriori-estimation
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

Maximum a posteriori estimation chooses the parameter value with the highest posterior probability. It combines likelihood from the data with a prior over parameters.

## Core idea

MAP estimates

$$
\hat{\theta}_{MAP}=\arg\max_\theta p(\theta \mid D).
$$

Using Bayes' rule, this is equivalent to maximizing

$$
p(D \mid \theta)p(\theta).
$$

The prior can act like regularization by preferring some parameter values before seeing the data.

## Example

In linear regression, a Gaussian prior centered at zero on weights leads to a MAP estimate similar to ridge regression. The likelihood rewards fit to data, while the prior discourages large weights.

## Comparison with MLE

Maximum likelihood uses only $p(D \mid \theta)$. MAP adds $p(\theta)$. With lots of data and weak priors, the estimates may be similar. With little data or strong priors, they can differ substantially.

## Failure modes

MAP returns a single point estimate and can hide posterior uncertainty. It can also be sensitive to poorly chosen priors.
