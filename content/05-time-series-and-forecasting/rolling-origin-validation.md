---
title: Rolling Origin Validation
slug: time-series-and-forecasting/rolling-origin-validation
description: Concise guide to Rolling Origin Validation in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - rolling-origin-validation
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
# Rolling Origin Validation

## Summary

Rolling-origin validation evaluates forecasts by moving the training cutoff forward through time. It simulates repeated historical forecast decisions.

## Step-by-step example

Train through January and forecast February, then train through February and forecast March, continuing across historical cutoffs.

## Common failure modes

- Evaluating Rolling Origin Validation with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
