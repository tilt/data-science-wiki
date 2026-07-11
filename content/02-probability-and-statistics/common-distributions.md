---
title: Common Distributions
slug: probability-and-statistics/common-distributions
description: Concise guide to Common Distributions in Probability and Statistics.
area: probability-and-statistics
topics:
  - common-distributions
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

Common probability distributions are reusable models for uncertainty. Knowing their assumptions makes it easier to choose likelihoods, simulate data, interpret model outputs, and detect mismatches.

## Discrete distributions

Bernoulli models one yes/no trial. Binomial models the number of successes in a fixed number of independent Bernoulli trials. Categorical models one choice among multiple classes. Poisson models counts over time or space when events occur independently at a constant average rate.

## Continuous distributions

Normal distributions model symmetric noise around a mean. Exponential distributions model waiting times under a constant event rate. Uniform distributions assign equal density across an interval. Beta distributions model probabilities between 0 and 1. Gamma distributions model positive continuous quantities.

## Example

If 100 users each independently click with probability 0.05, the click count is binomial. If support tickets arrive at an average rate of 12 per hour and independence is plausible, ticket counts can be approximated with a Poisson model. If prediction error is roughly symmetric with many small causes, a normal model may be reasonable.

## Failure modes

A distribution is an assumption, not a label. Heavy tails, dependence, truncation, zero inflation, and changing rates can make a convenient distribution misleading.
