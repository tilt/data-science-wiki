---
title: Sarima
slug: time-series-and-forecasting/sarima
description: Concise guide to Sarima in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - sarima
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
# Sarima

## Summary

SARIMA extends ARIMA with seasonal autoregressive, differencing, and moving-average terms. It models repeated seasonal dependence such as weekly or yearly patterns.

## Step-by-step example

Monthly sales with annual seasonality may use nonseasonal differencing for trend and seasonal terms at lag 12 for yearly repetition.

## Common failure modes

- Evaluating Sarima with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
