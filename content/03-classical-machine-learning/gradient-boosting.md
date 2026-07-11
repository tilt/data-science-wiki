---
title: Gradient Boosting
slug: classical-machine-learning/gradient-boosting
description: Concise guide to Gradient Boosting in Classical Machine Learning.
area: classical-machine-learning
topics:
  - gradient-boosting
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
  - ../05-time-series-and-forecasting/machine-learning-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---
# Gradient Boosting

## Summary

Gradient boosting builds an additive model by fitting each new weak learner to the current model's errors. In tabular machine learning, boosted decision trees are often strong baselines because they capture nonlinear interactions with limited preprocessing.

## Core idea

- Start with a simple prediction, such as the mean target or class log-odds.
- Compute residuals or gradients of the loss with respect to current predictions.
- Fit a small tree to those gradients.
- Add the tree to the ensemble with a learning-rate shrinkage factor.
- Repeat until validation performance stops improving.

## Worked example

For credit-risk classification, begin with a logistic-regression baseline. Train a gradient-boosted tree model with shallow trees, tune learning rate and number of estimators, and use early stopping on a validation set. Inspect false positives and false negatives by customer segment before choosing a threshold.

## Important parameters

- Number of trees controls ensemble capacity.
- Learning rate controls how much each tree changes the model.
- Tree depth controls interaction complexity.
- Subsampling and column sampling reduce overfitting.
- Regularization and early stopping are critical on noisy tabular data.

## Practical checklist

- Define exactly what Gradient Boosting predicts or estimates and what baseline it must beat.
- Choose splits and metrics that match the deployment decision, including leakage and imbalance checks.
- Inspect representative errors before tuning model complexity, thresholds, or explanations.

- Check leakage, class imbalance, calibration, and threshold choice.
- Compare train, validation, and test behavior to diagnose underfitting or overfitting.
- Inspect errors by segment and by example.
- Choose metrics that match the deployment decision.

## Common failure modes

- Overfitting through too many trees or deep trees.
- Leakage from target-derived features, especially in time-dependent data.
- Treating feature importance as causal explanation.
- Ignoring calibration when probabilities drive decisions.
