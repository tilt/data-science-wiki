---
title: Kalman Filters
slug: time-series-and-forecasting/kalman-filters
description: Concise guide to Kalman Filters in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - kalman-filters
level: advanced
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Kalman Filters

## Summary

Kalman filters estimate hidden state over time from noisy observations using a prediction step and an update step. They are central to linear Gaussian state-space forecasting.

## Step-by-step example

For tracking machine temperature, the filter predicts the latent temperature state, observes a noisy sensor reading, and updates the estimate according to uncertainty.

## Common failure modes

- Evaluating Kalman Filters with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
