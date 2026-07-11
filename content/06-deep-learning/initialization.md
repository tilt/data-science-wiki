---
title: Initialization
slug: deep-learning/initialization
description: Concise guide to Initialization in Deep Learning.
area: deep-learning
topics:
  - initialization
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
# Initialization

## Summary

Initialization sets neural-network parameters before training. Good initialization keeps activations and gradients in a useful range during early optimization.

## Step-by-step example

If weights are too small, signals can vanish; if too large, activations and gradients can explode. Xavier and He initialization scale weights to layer size and activation choice.

## Common failure modes

- Changing Initialization before checking data quality, baseline performance, and whether the added capacity or constraint is needed.
- Reading only aggregate validation scores instead of inspecting learning curves, slices, and representative errors.
- Ignoring how Initialization affects memory, numerical stability, reproducibility, or inference latency.

- Reading aggregate metrics without inspecting slice-level and example-level failures.
- Ignoring compute, memory, latency, and reproducibility constraints.
