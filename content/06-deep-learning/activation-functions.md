---
title: Activation Functions
slug: deep-learning/activation-functions
description: Concise guide to Activation Functions in Deep Learning.
area: deep-learning
topics:
  - activation-functions
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
# Activation Functions

## Summary

Activation functions introduce nonlinearity into neural networks. Without them, stacked linear layers collapse into one linear transformation.

## Step-by-step example

A ReLU layer keeps positive values and clips negative values to zero, allowing a network to build piecewise-linear decision boundaries.

## Common failure modes

- Changing Activation Functions before checking data quality, baseline performance, and whether the added capacity or constraint is needed.
- Reading only aggregate validation scores instead of inspecting learning curves, slices, and representative errors.
- Ignoring how Activation Functions affects memory, numerical stability, reproducibility, or inference latency.

- Reading aggregate metrics without inspecting slice-level and example-level failures.
- Ignoring compute, memory, latency, and reproducibility constraints.
