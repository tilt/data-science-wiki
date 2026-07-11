---
title: Time Series Forecasting
slug: interview-preparation/time-series-forecasting
description: Concise guide to Time Series Forecasting in Interview Preparation.
area: interview-preparation
topics:
  - time-series-forecasting
level: intermediate
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
## Summary

Time-series forecasting interview questions test whether you respect temporal ordering, build baselines, handle seasonality, and evaluate by horizon. The goal is to explain a forecasting workflow, not just name ARIMA or transformers.

## Prototype answer

Start with the forecast target, horizon, granularity, update cadence, and decision supported. Then describe naive and seasonal baselines, feature construction, validation with time-aware splits, model choice, uncertainty, and monitoring.

## Example prompt

"Forecast daily demand for a retailer." A strong answer mentions holiday effects, stockouts, promotions, weather or calendar features, rolling-origin validation, prediction intervals, and separate evaluation for peak periods.

## Common pitfalls

Do not use random train-test splits, leak future aggregates into features, or optimize a one-step metric when the business needs multi-week planning. Always compare against simple baselines.

## Canonical wiki links

Study [time-series fundamentals](../05-time-series-and-forecasting/time-series-fundamentals.md), [rolling-origin validation](../05-time-series-and-forecasting/rolling-origin-validation.md), and [prediction intervals](../05-time-series-and-forecasting/prediction-intervals.md).
