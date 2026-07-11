---
title: N Beats and Nhits
slug: time-series-and-forecasting/n-beats-and-nhits
description: Concise guide to N Beats and Nhits in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - n-beats-and-nhits
level: advanced
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
# N Beats and Nhits

## Summary

N-BEATS and N-HiTS are neural forecasting architectures designed for univariate or panel time series. They use stacked blocks to learn forecast components directly from windows of history.

## Step-by-step example

For a set of related retail series, N-HiTS can learn multi-resolution patterns from recent demand windows and produce direct multi-step forecasts.

## Common failure modes

- Evaluating N Beats and Nhits with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
