---
title: Linear Models
slug: classical-machine-learning/linear-models
description: Concise guide to Linear Models in Classical Machine Learning.
area: classical-machine-learning
topics:
  - linear-models
level: foundational
status: draft
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Linear Models

## Summary

Linear models predict a target as a weighted sum of features. They are useful baselines because they are fast, interpretable, and expose whether feature engineering already explains much of the signal.

## Core idea

- For regression, the usual objective is squared error; for classification, linear scores are paired with a link function or margin loss.
- Regularization controls coefficient size and improves stability when features are correlated.
- Feature scaling and leakage checks matter more than model complexity.

## Worked example

For house-price prediction, fit a linear model with size, location indicators, and age. Compare residuals by segment to find missing nonlinear effects or data-quality problems.

## Practical checklist

- Define exactly what Linear Models predicts or estimates and what baseline it must beat.
- Choose splits and metrics that match the deployment decision, including leakage and imbalance checks.
- Inspect representative errors before tuning model complexity, thresholds, or explanations.

- Check leakage, class imbalance, calibration, and threshold choice.
- Compare train, validation, and test behavior to diagnose underfitting or overfitting.
- Inspect errors by segment and by example.
- Choose metrics that match the deployment decision.

## Common failure modes

- Using Linear Models with a split strategy that leaks labels, time, users, or target-derived features.
- Optimizing a convenient metric instead of the operational cost of false positives, false negatives, or ranking errors.
- Trusting Linear Models globally while important classes, cohorts, or edge cases fail.

- Optimizing a metric that does not match the operational decision.
- Trusting aggregate performance while important classes or slices fail.
