---
title: State Space Models
slug: time-series-and-forecasting/state-space-models
description: Concise guide to State Space Models in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - state-space-models
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
# State Space Models

## Summary

State-space models represent a time series through hidden states that evolve over time and emit observations. They unify trend, seasonality, regression, and filtering ideas.

## Step-by-step example

A local linear trend model keeps hidden level and slope states, predicts them forward, and updates them when a new observation arrives.

## Common failure modes

- Evaluating State Space Models with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
