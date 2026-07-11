---
title: Exponential Smoothing
slug: time-series-and-forecasting/exponential-smoothing
description: Concise guide to Exponential Smoothing in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - exponential-smoothing
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
# Exponential Smoothing

## Summary

Exponential smoothing forecasts by recursively updating level, trend, and optionally seasonality with more weight on recent observations. It is a strong classical baseline for many business series.

## Step-by-step example

For monthly sales, Holt-Winters smoothing maintains a level, slope, and month-specific seasonal component, then extrapolates them into the forecast horizon.

## Common failure modes

- Evaluating Exponential Smoothing with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
