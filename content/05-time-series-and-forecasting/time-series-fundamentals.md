---
title: Time Series Fundamentals
slug: time-series-and-forecasting/time-series-fundamentals
description: The data assumptions and temporal constraints that make forecasting different from ordinary prediction.
area: time-series-and-forecasting
topics:
  - time-series-fundamentals
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - stationarity.md
  - trend-seasonality-cycles-noise.md
  - autocorrelation-and-partial-autocorrelation.md
  - forecasting-problem-formulation.md
  - backtesting.md
historical_context: false
last_reviewed: 2026-07-11
---

# Time Series Fundamentals

A time series is a sequence of observations indexed by time. Forecasting differs from ordinary supervised prediction because order is part of the data-generating process: nearby observations can be dependent, seasonal positions can repeat, and future information is unavailable when the forecast is made.

The basic object is usually written as $y_1,\ldots,y_T$, with forecasts $\hat{y}_{T+h|T}$ for horizon $h$ made using information available up to time $T$. That conditioning bar is the discipline behind the whole section. Any feature, split, scaling statistic, or target transformation that uses observations after $T$ has leaked future information.

Most forecasting problems combine several structures. [Trend, seasonality, cycles, and noise](trend-seasonality-cycles-noise.md) describe broad visible patterns. [Autocorrelation and partial autocorrelation](autocorrelation-and-partial-autocorrelation.md) describe lag dependence. [Stationarity](stationarity.md) asks whether those relationships are stable enough for classical models. [Forecasting problem formulation](forecasting-problem-formulation.md) fixes the target, horizon, granularity, update cadence, and decision that the forecast supports.

The simplest useful baselines are often naive: forecast the last observed value, the same seasonal position, or a moving average. These baselines are not throwaways. They reveal whether a complex model is learning temporal structure or merely matching an easy persistence pattern. More expressive methods - [ARIMA](arima.md), [exponential smoothing](exponential-smoothing.md), machine-learning regressors, and neural sequence models - should be compared to those baselines with [backtesting](backtesting.md).

A time-series workflow therefore starts by checking timestamp integrity, gaps, duplicates, aggregation level, calendar conventions, and known future covariates. Only then does model choice become meaningful. A daily sales forecast with censored stockouts, a temperature-driven load forecast, and an intermittent spare-parts forecast are all "time series," but they require different assumptions and validation cuts.

## References

- [Hyndman & Athanasopoulos, FPP3: Getting started](https://otexts.com/fpp3/intro.html)
- [Hyndman & Athanasopoulos, FPP3: Time series graphics](https://otexts.com/fpp3/graphics.html)
