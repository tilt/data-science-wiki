---
title: Loss Functions
slug: deep-learning/loss-functions
description: Concise guide to Loss Functions in Deep Learning.
area: deep-learning
topics:
  - loss-functions
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
# Loss Functions

## Summary

A loss function defines what errors training penalizes. It converts model outputs and targets into the scalar objective optimized by gradient descent.

## Step-by-step example

Cross-entropy penalizes confident wrong class probabilities; mean squared error penalizes large numeric residuals. The right loss depends on the prediction target and decision cost.

## Common failure modes

- Changing Loss Functions before checking data quality, baseline performance, and whether the added capacity or constraint is needed.
- Reading only aggregate validation scores instead of inspecting learning curves, slices, and representative errors.
- Ignoring how Loss Functions affects memory, numerical stability, reproducibility, or inference latency.

- Reading aggregate metrics without inspecting slice-level and example-level failures.
- Ignoring compute, memory, latency, and reproducibility constraints.
