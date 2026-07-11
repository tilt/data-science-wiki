---
title: Calibration
slug: classical-machine-learning/calibration
description: Concise guide to Calibration in Classical Machine Learning.
area: classical-machine-learning
topics:
  - calibration
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
# Calibration

## Summary

Calibration measures whether predicted probabilities match observed frequencies. If a model assigns 0.8 probability to many examples, about 80 percent of those examples should be positive for the model to be well calibrated.

## Canonical relationship

This is the canonical page for probability calibration in classical machine learning. The evaluation-area page [Calibration](../16-experimentation-and-evaluation/calibration.md) covers how calibration is reported and used in evaluation workflows.

## Core idea

- Accuracy asks whether the predicted class is correct.
- Calibration asks whether the predicted confidence is trustworthy.
- Threshold decisions, expected costs, and human review policies depend on calibrated probabilities.

## Worked example

Suppose a churn model gives 1,000 customers scores near 0.7. If about 700 of them actually churn, that score band is calibrated. If only 400 churn, the model is overconfident. A reliability curve groups predictions into bins and compares predicted probability with observed frequency.

## Common methods

- Platt scaling fits a logistic calibration layer on validation predictions.
- Isotonic regression fits a monotonic calibration curve with fewer shape assumptions.
- Temperature scaling is common for neural classifiers.
- Calibration should be learned on validation data, not on the final test set.

## Practical checklist

- Define exactly what Calibration predicts or estimates and what baseline it must beat.
- Choose splits and metrics that match the deployment decision, including leakage and imbalance checks.
- Inspect representative errors before tuning model complexity, thresholds, or explanations.

- Check leakage, class imbalance, calibration, and threshold choice.
- Compare train, validation, and test behavior to diagnose underfitting or overfitting.
- Inspect errors by segment and by example.
- Choose metrics that match the deployment decision.

## Common failure modes

- A model can be accurate but poorly calibrated.
- Calibration can differ by subgroup even when global calibration looks good.
- Recalibrating after data drift without checking labels can hide deeper model degradation.
