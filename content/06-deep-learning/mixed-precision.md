---
title: Mixed Precision
slug: deep-learning/mixed-precision
description: Concise guide to Mixed Precision in Deep Learning.
area: deep-learning
topics:
  - mixed-precision
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Mixed Precision

## Summary

Mixed precision trains or serves neural networks using lower-precision arithmetic where safe and higher precision where needed. It reduces memory use and can improve throughput.

## Step-by-step example

Training may use float16 matrix operations while keeping master weights or loss scaling in higher precision to avoid underflow.

## Common failure modes

- Changing Mixed Precision before checking data quality, baseline performance, and whether the added capacity or constraint is needed.
- Reading only aggregate validation scores instead of inspecting learning curves, slices, and representative errors.
- Ignoring how Mixed Precision affects memory, numerical stability, reproducibility, or inference latency.

- Reading aggregate metrics without inspecting slice-level and example-level failures.
- Ignoring compute, memory, latency, and reproducibility constraints.
