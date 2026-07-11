---
title: Evaluation Metrics
slug: classical-machine-learning/evaluation-metrics
description: Concise guide to Evaluation Metrics in Classical Machine Learning.
area: classical-machine-learning
topics:
  - evaluation-metrics
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
  - ../05-time-series-and-forecasting/forecast-error-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---
# Evaluation Metrics

## Summary

Evaluation metrics translate model outputs into measurements aligned with a prediction task and decision cost. The right metric depends on labels, class balance, thresholds, and operational consequences.

## Step-by-step example

For fraud detection, accuracy can look high while missing rare fraud. Precision, recall, PR-AUC, calibration, and cost-weighted thresholds are more informative.

## Common failure modes

- Using Evaluation Metrics with a split strategy that leaks labels, time, users, or target-derived features.
- Optimizing a convenient metric instead of the operational cost of false positives, false negatives, or ranking errors.
- Trusting Evaluation Metrics globally while important classes, cohorts, or edge cases fail.

- Averaging away severe failures, minority slices, or uncertainty.
- Treating a benchmark result as production readiness without reviewing examples.
