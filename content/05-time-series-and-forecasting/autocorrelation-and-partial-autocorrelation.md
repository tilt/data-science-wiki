---
title: Autocorrelation and Partial Autocorrelation
slug: time-series-and-forecasting/autocorrelation-and-partial-autocorrelation
description: Concise guide to Autocorrelation and Partial Autocorrelation in
  Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - autocorrelation-and-partial-autocorrelation
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
## Summary

Autocorrelation measures how a time series relates to lagged versions of itself. Partial autocorrelation isolates the direct relationship at a lag after accounting for shorter lags.

## Autocorrelation

The autocorrelation at lag $k$ compares $y_t$ with $y_{t-k}$. High autocorrelation at lag 1 means adjacent observations tend to be similar. Seasonal autocorrelation appears when lags match a recurring period, such as 7 days or 12 months.

## Partial autocorrelation

Partial autocorrelation at lag $k$ estimates the remaining relationship between $y_t$ and $y_{t-k}$ after controlling for lags 1 through $k-1$. It helps distinguish direct lag effects from correlations inherited through intermediate lags.

## Example

Daily electricity demand often has strong lag-1 autocorrelation because today resembles yesterday, and strong lag-7 autocorrelation because weekdays resemble the same weekday last week. A PACF plot can help decide whether an autoregressive model needs only recent lags or an explicit weekly lag.

## Practical use

ACF and PACF plots are diagnostic tools for stationarity, seasonality, and ARIMA-style model selection. They should be interpreted with domain knowledge and validation, not as automatic model-order rules.

## Failure modes

Trends and seasonality can create misleading autocorrelation. Difference or detrend the series when appropriate, and use rolling-origin validation to confirm that lag choices improve forecasts.
