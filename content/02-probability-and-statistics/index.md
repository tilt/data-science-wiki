---
title: Probability and Statistics
slug: 02-probability-and-statistics
description: "Learning map for probability foundations, limit theorems, estimation, inference, and stochastic processes."
area: probability-and-statistics
topics:
  - probability-spaces
  - random-variables
  - common-distributions
  - conditional-probability
  - bayes-theorem
  - expectation-and-variance
  - covariance-and-correlation
  - law-of-large-numbers
  - central-limit-theorem
  - statistical-estimation
  - maximum-likelihood
  - maximum-a-posteriori-estimation
level: foundational
status: review
page_type: area-index
aliases:
  - Probability and Statistics
prerequisites:
  - ../01-mathematical-foundations/index.md
related:
  - ../17-experimentation-and-evaluation/index.md
  - ../05-time-series-and-forecasting/index.md
  - ../03-classical-machine-learning/index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Probability and Statistics

This section links the mathematical language of uncertainty to statistical inference and modelling. Start with the probability foundations, then use the limit theorems to understand estimation error, intervals, tests, and process models.

## Foundations

- [Probability Spaces](probability-spaces.md) defines outcomes, events, and probability measures.
- [Random Variables](random-variables.md) turns outcomes into measurable quantities with distributions.
- [Common Distributions](common-distributions.md) gives reusable probability laws for counts, waiting times, errors, and positive quantities.
- [Conditional Probability](conditional-probability.md) changes the reference population after evidence is known.
- [Bayes Theorem](bayes-theorem.md) turns priors and likelihoods into posterior probabilities.
- [Expectation and Variance](expectation-and-variance.md) defines averages, spread, and standard errors.
- [Covariance and Correlation](covariance-and-correlation.md) describes linear co-movement between variables.

## Limits and Processes

- [Law of Large Numbers](law-of-large-numbers.md) explains convergence of averages.
- [Central Limit Theorem](central-limit-theorem.md) explains normal approximations for standardized sample means.
- [Markov Chains](markov-chains.md) models memory-one state transitions.
- [Random Walks](random-walks.md) accumulates random increments into paths.
- [Renewal Theory](renewal-theory.md) models repeated events separated by iid waiting times.
- [Markov Renewal Processes](markov-renewal-processes.md) combines state transitions with transition-specific holding times.

## Inference and Modelling

- [Statistical Estimation](statistical-estimation.md) separates estimands, estimators, estimates, and uncertainty.
- [Maximum Likelihood](maximum-likelihood.md) fits parameters by maximizing the observed-data likelihood.
- [Maximum A Posteriori Estimation](maximum-a-posteriori-estimation.md) adds a prior and takes the posterior mode.
- [Bayesian Statistics](bayesian-statistics.md) keeps the full posterior distribution for inference and decisions.
- [Confidence Intervals](confidence-intervals.md) reports uncertainty through repeated-sampling coverage.
- [Hypothesis Testing](hypothesis-testing.md) compares observed statistics with a null model.
- [Statistical Modelling](statistical-modelling.md) specifies stochastic structure, parameters, and assumptions.
- [Experimental Design](experimental-design.md) plans assignment and measurement so inference targets the intended question.

> **Learning path — Foundations:** ← [Mathematical Foundations](../01-mathematical-foundations/index.md) · [path overview](../00-home-and-navigation/learning-paths.md#foundations) · [Classical Machine Learning](../03-classical-machine-learning/index.md) →
