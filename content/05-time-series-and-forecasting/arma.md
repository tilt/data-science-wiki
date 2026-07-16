---
title: ARMA
slug: time-series-and-forecasting/arma
description: Autoregressive moving-average models for stationary time series.
area: time-series-and-forecasting
topics:
  - arma
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - autoregressive-models.md
  - moving-average-models.md
  - arima.md
  - stationarity.md
  - autocorrelation-and-partial-autocorrelation.md
historical_context: false
last_reviewed: 2026-07-11
---

# ARMA

An ARMA model describes a stationary time series using two sources of short-memory dependence: previous values of the series and previous innovations. It is the stationary core inside [ARIMA](arima.md), but without differencing. If a level, trend, or seasonal pattern remains, the series is not ready for ARMA; first revisit [stationarity](stationarity.md), decomposition, or a seasonal model.

An ARMA$(p,q)$ process is usually written as

$$
y_t = c + \phi_1 y_{t-1} + \cdots + \phi_p y_{t-p}
      + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \cdots + \theta_q \varepsilon_{t-q}.
$$

The AR side says the current value partly persists from its own past. The MA side says recent shocks still echo through the series because earlier forecast errors were not fully absorbed at the moment they arrived. In lag-polynomial notation,

$$
\phi(B)y_t = c + \theta(B)\varepsilon_t.
$$

The assumptions behind that compact equation matter. The AR polynomial must imply a stable process rather than an exploding one; the MA polynomial should be invertible so the same autocorrelation pattern does not have multiple equivalent parameterizations. Under those conditions, ARMA captures autocorrelation that fades with lag rather than trend that permanently moves the level.

The diagnostic shape is the reason ARMA is often taught alongside [autocorrelation and partial autocorrelation](autocorrelation-and-partial-autocorrelation.md). A pure [autoregressive model](autoregressive-models.md) tends to have a PACF cutoff and a gradually decaying ACF. A pure [moving-average model](moving-average-models.md) tends to have the opposite. Mixed ARMA models usually show less tidy patterns, so order choice is confirmed through residual checks and out-of-sample validation, not just plot reading.

ARMA is most useful for residual processes: sensor deviations after removing a daily cycle, financial returns after demeaning, or one-step forecast errors from a simpler structural model. If the original level series needs differencing, use [ARIMA](arima.md); if the dependence appears at seasonal lags, use [SARIMA](sarima.md).

## Connections

ARMA combines [autoregressive models](autoregressive-models.md) and [moving-average models](moving-average-models.md) under a [stationarity](stationarity.md) assumption. Its residuals and candidate orders are read through [autocorrelation and partial autocorrelation](autocorrelation-and-partial-autocorrelation.md), while its nonstationary extension is [ARIMA](arima.md).

## References

- [Hyndman & Athanasopoulos, FPP3: ARIMA models](https://otexts.com/fpp3/arima.html)
- [statsmodels ARIMA API](https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html)

> **Section — [Time-Series Forecasting](index.md):** ← [Moving Average Models](moving-average-models.md) · [ARIMA](arima.md) →
