---
title: Autoregressive Models
slug: time-series-and-forecasting/autoregressive-models
description: Concise guide to Autoregressive Models in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - autoregressive-models
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
# Autoregressive Models

## Summary

Autoregressive models predict the next value from previous values of the same series. They are simple baselines and building blocks for ARIMA, state-space, and neural forecasting models.

## Step-by-step example

A daily demand model might predict tomorrow from demand over the last seven days, with coefficients showing how much each lag contributes.

## Common failure modes

- Evaluating Autoregressive Models with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
