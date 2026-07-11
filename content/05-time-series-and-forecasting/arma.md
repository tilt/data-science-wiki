---
title: Arma
slug: time-series-and-forecasting/arma
description: Concise guide to Arma in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - arma
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
# Arma

## Summary

ARMA models combine autoregressive terms with moving-average error terms for stationary time series. They model dependence in the series without differencing or explicit trend components.

## Step-by-step example

For hourly sensor residuals after removing a daily pattern, an ARMA model can use recent residual values and recent shock terms to forecast the next residual.

## Common failure modes

- Evaluating Arma with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
