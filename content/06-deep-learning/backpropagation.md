---
title: Backpropagation
slug: deep-learning/backpropagation
description: Concise guide to Backpropagation in Deep Learning.
area: deep-learning
topics:
  - backpropagation
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
# Backpropagation

## Summary

Backpropagation computes gradients through a network by applying the chain rule from the loss back to earlier parameters. It is the core training algorithm for differentiable models.

## Step-by-step example

For a two-layer network, compute the loss at the output, differentiate it with respect to the final weights, then propagate the error signal through the hidden layer to update earlier weights.

## Common failure modes

- Changing Backpropagation before checking data quality, baseline performance, and whether the added capacity or constraint is needed.
- Reading only aggregate validation scores instead of inspecting learning curves, slices, and representative errors.
- Ignoring how Backpropagation affects memory, numerical stability, reproducibility, or inference latency.

- Reading aggregate metrics without inspecting slice-level and example-level failures.
- Ignoring compute, memory, latency, and reproducibility constraints.
