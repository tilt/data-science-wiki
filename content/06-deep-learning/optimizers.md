---
title: Optimizers
slug: deep-learning/optimizers
description: Concise guide to Optimizers in Deep Learning.
area: deep-learning
topics:
  - optimizers
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Optimizers

## Summary

Optimizers update model parameters from gradients. They determine how step size, momentum, adaptivity, and regularization shape training.

## Step-by-step example

Adam adapts learning rates per parameter using moving averages of gradients, while SGD with momentum accumulates velocity in consistent descent directions.

## Common failure modes

- Changing Optimizers before checking data quality, baseline performance, and whether the added capacity or constraint is needed.
- Reading only aggregate validation scores instead of inspecting learning curves, slices, and representative errors.
- Ignoring how Optimizers affects memory, numerical stability, reproducibility, or inference latency.

- Reading aggregate metrics without inspecting slice-level and example-level failures.
- Ignoring compute, memory, latency, and reproducibility constraints.
