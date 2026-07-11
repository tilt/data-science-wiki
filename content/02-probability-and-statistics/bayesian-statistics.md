---
title: Bayesian Statistics
slug: probability-and-statistics/bayesian-statistics
description: Concise guide to Bayesian Statistics in Probability and Statistics.
area: probability-and-statistics
topics:
  - bayesian-statistics
level: advanced
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

Bayesian statistics represents uncertainty with probability distributions and updates those beliefs when data arrives. It is useful when prior information, uncertainty intervals, and sequential learning matter.

## Core idea

Bayes' rule combines a prior belief with observed evidence:

$$
p(\theta \mid D) = \frac{p(D \mid \theta)p(\theta)}{p(D)}.
$$

The prior $p(\theta)$ encodes what is believed before the data. The likelihood $p(D \mid \theta)$ measures how compatible the data is with each parameter value. The posterior $p(\theta \mid D)$ is the updated belief.

## Example

Suppose a defect rate is believed to be around 1 percent but uncertain. After observing 3 defects in 100 items, a Bayesian model combines the prior and data to produce a posterior distribution over the defect rate, not just one estimate. A decision-maker can ask for the probability that the defect rate exceeds 2 percent.

## Practical use

Bayesian methods are common in A/B testing, hierarchical modelling, probabilistic forecasting, calibration, and small-data problems. Approximate inference is often needed because exact posteriors can be hard to compute.

## Failure modes

Results can be sensitive to priors when data is scarce, and computational approximations can mislead if diagnostics are ignored. Priors should be explicit, justified, and tested with sensitivity analysis.
