---
title: Lstm and GRU
slug: deep-learning/lstm-and-gru
description: Concise guide to Lstm and GRU in Deep Learning.
area: deep-learning
topics:
  - lstm-and-gru
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Lstm and GRU

## Summary

LSTMs and GRUs are recurrent neural networks with gating mechanisms that help preserve or forget sequence information. They were designed to reduce vanishing-gradient problems in long sequences.

## Step-by-step example

In demand forecasting, an LSTM can update hidden state each week while gates decide how much past seasonal information to keep.

## Common failure modes

- Changing Lstm and GRU before checking data quality, baseline performance, and whether the added capacity or constraint is needed.
- Reading only aggregate validation scores instead of inspecting learning curves, slices, and representative errors.
- Ignoring how Lstm and GRU affects memory, numerical stability, reproducibility, or inference latency.

- Reading aggregate metrics without inspecting slice-level and example-level failures.
- Ignoring compute, memory, latency, and reproducibility constraints.
