---
title: Temporal Convolutional Networks
slug: time-series-and-forecasting/temporal-convolutional-networks
description: Concise guide to Temporal Convolutional Networks in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - temporal-convolutional-networks
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
# Temporal Convolutional Networks

## Summary

Temporal convolutional networks use causal convolutions over time to model sequence history in parallel. Dilated convolutions allow long receptive fields without recurrent state.

## Step-by-step example

For demand forecasting, a TCN can combine recent days, weekly lags, and longer history through stacked dilated filters.

## Common failure modes

- Evaluating Temporal Convolutional Networks with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
