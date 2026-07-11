---
title: Maximum Likelihood
slug: probability-and-statistics/maximum-likelihood
description: Concise guide to Maximum Likelihood in Probability and Statistics.
area: probability-and-statistics
topics:
  - maximum-likelihood
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

Maximum likelihood estimation chooses parameters that make the observed data most probable under a model. It is one of the central estimation principles in statistics and machine learning.

## Core idea

Given data $D$ and parameter $\theta$, the likelihood is $p(D \mid \theta)$ viewed as a function of $\theta$. The maximum likelihood estimate is

$$
\hat{\theta}_{MLE}=\arg\max_\theta p(D \mid \theta).
$$

In practice, log-likelihood is usually optimized because products of probabilities become sums.

## Example

For coin flips with 7 heads in 10 flips, the likelihood is maximized by a head probability of 0.7. That estimate fits the observed sample best, though it may still be uncertain with only 10 flips.

## ML connection

Many losses are negative log-likelihoods. Logistic regression, language modelling, and Gaussian regression can all be interpreted as likelihood-based training under different distributional assumptions.

## Failure modes

MLE can overfit small samples, be biased under misspecified models, and provide point estimates without full uncertainty unless standard errors or intervals are added.
