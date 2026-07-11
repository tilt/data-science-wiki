---
title: Stationarity
slug: time-series-and-forecasting/stationarity
description: Concise guide to Stationarity in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - stationarity
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
# Stationarity

## Summary

Stationarity means the statistical behavior of a series is stable over time, often in mean, variance, and autocorrelation. Many classical time-series models assume stationarity after transformation.

## Step-by-step example

A trending sales series is not stationary in level. Differencing can convert it into changes, which may be closer to stationary.

## Common failure modes

- Evaluating Stationarity with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
