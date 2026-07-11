---
title: Distributed Training
slug: deep-learning/distributed-training
description: Concise guide to Distributed Training in Deep Learning.
area: deep-learning
topics:
  - distributed-training
level: advanced
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Distributed Training

## Summary

Distributed training splits model training across multiple devices or machines to handle larger models, larger batches, or faster iteration.

## Step-by-step example

Data parallel training gives each GPU a batch shard, computes gradients, synchronizes them, and applies one shared update.

## Common failure modes

- Changing Distributed Training before checking data quality, baseline performance, and whether the added capacity or constraint is needed.
- Reading only aggregate validation scores instead of inspecting learning curves, slices, and representative errors.
- Ignoring how Distributed Training affects memory, numerical stability, reproducibility, or inference latency.

- Reading aggregate metrics without inspecting slice-level and example-level failures.
- Ignoring compute, memory, latency, and reproducibility constraints.
