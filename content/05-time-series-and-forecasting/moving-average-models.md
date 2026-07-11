---
title: Moving Average Models
slug: time-series-and-forecasting/moving-average-models
description: Concise guide to Moving Average Models in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - moving-average-models
level: foundational
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
# Moving Average Models

## Summary

Moving-average models explain a stationary series using current and past shock terms rather than past observed values directly. In practice, simple rolling averages are also used as smoothing baselines.

## Step-by-step example

A seven-day moving average smooths noisy daily traffic. A formal MA(q) model captures dependence between current value and recent forecast errors.

## Common failure modes

- Evaluating Moving Average Models with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
