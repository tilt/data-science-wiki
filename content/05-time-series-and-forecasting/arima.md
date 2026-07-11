---
title: ARIMA
slug: time-series-and-forecasting/arima
description: ARIMA overview and practical notes.
area: time-series-and-forecasting
topics:
  - "arima"
  - "statistical-forecasting"
level: intermediate
status: review
page_type: model
aliases:
  - "ARIVA"
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "box-jenkins-reinsel-ljung-2015-time-series"
---
# ARIMA

## Summary

ARIMA stands for autoregressive integrated moving average. It is a classical univariate forecasting model that combines differencing for non-stationarity with autoregressive and moving-average components. The corrected term is ARIMA, not ARIVA.

## Notation

An ARIMA$(p,d,q)$ model applies $d$ differences and then models the differenced series with $p$ autoregressive lags and $q$ moving-average error lags.

- $p$: how many previous values of the transformed series are used.
- $d$: how many times the series is differenced to reduce trend or non-stationarity.
- $q$: how many previous forecast errors are used.

## Modelling workflow

1. Plot the series and compare against a naive or seasonal naive baseline.
2. Check trend, seasonality, missing periods, outliers, and regime changes.
3. Difference the series only as much as needed for approximate stationarity.
4. Use autocorrelation diagnostics and validation performance to choose candidate orders.
5. Backtest with rolling cutoffs so every forecast uses only information available at the time.
6. Inspect residuals for remaining autocorrelation, heteroskedasticity, and calendar effects.

## Worked example

For monthly demand with a gradual upward trend, first fit a seasonal naive baseline. Difference once to remove the trend, inspect autocorrelation, and try a small grid of ARIMA orders. At each historical cutoff, train on months up to $t$ and forecast month $t+1$. If errors spike around holidays or promotions, ARIMA alone is probably missing external drivers.

## Related topics

- [Stationarity](stationarity.md)
- [Autocorrelation and Partial Autocorrelation](autocorrelation-and-partial-autocorrelation.md)
- [SARIMA](sarima.md)
- [Backtesting](backtesting.md)
