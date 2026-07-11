---
title: Demand Forecasting
slug: time-series-and-forecasting/demand-forecasting
description: Concise guide to Demand Forecasting in Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - demand-forecasting
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Demand Forecasting

## Summary

Demand forecasting predicts future product, service, or resource demand so organizations can plan inventory, staffing, logistics, and capacity. It is as much an operational problem as a modelling problem.

## Step-by-step example

A retailer forecasts weekly item-store demand using sales history, price, promotions, holidays, stockouts, and local events, then reconciles forecasts by product hierarchy.

## Common failure modes

- Evaluating Demand Forecasting with random splits that leak future information into training.
- Reporting one average error while hiding horizon, season, segment, or peak-period failures.
- Ignoring calendar effects, data revisions, missing timestamps, or operational constraints on when forecasts are available.

- Ignoring horizon-specific error, calendar effects, missing periods, or regime changes.
- Reporting point accuracy without checking uncertainty, slices, and operational cost.
