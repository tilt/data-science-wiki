---
title: SARIMA
slug: time-series-and-forecasting/sarima
description: Seasonal ARIMA models with nonseasonal and seasonal lag operators.
area: time-series-and-forecasting
topics:
  - sarima
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - arima.md
  - trend-seasonality-cycles-noise.md
  - autocorrelation-and-partial-autocorrelation.md
  - statistical-forecasting.md
  - energy-consumption-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---

# SARIMA

SARIMA extends [ARIMA](arima.md) by adding seasonal autoregressive, differencing, and moving-average terms at a known period $m$. It is designed for series where dependence repeats at regular seasonal lags: month 12 resembles month 0, hour 24 resembles hour 0, or week 52 resembles week 0.

A SARIMA model is written as

$$
ARIMA(p,d,q)(P,D,Q)_m.
$$

The lowercase orders describe the nonseasonal dynamics. The uppercase orders describe seasonal dynamics at multiples of $m$. In lag-polynomial form, a typical model is

$$
\phi(B)\Phi(B^m)(1-B)^d(1-B^m)^D y_t
= c + \theta(B)\Theta(B^m)\varepsilon_t.
$$

The seasonal differencing term $(1-B^m)^D$ removes repeated seasonal level shifts, while seasonal AR and MA terms model dependence or shocks at the seasonal lag. For monthly data with yearly seasonality, $m=12$; for hourly data with daily seasonality, $m=24$.

The seasonal period is a modeling commitment, not a parameter to guess casually. SARIMA works best when the seasonal pattern is regular, stable, and visible in [autocorrelation and partial autocorrelation](autocorrelation-and-partial-autocorrelation.md). Seasonal AR terms tend to create decaying autocorrelation at seasonal lags; seasonal MA terms tend to create seasonal-lag ACF spikes. If the data has multiple overlapping seasonalities, moving holidays, weather interactions, or fast regime changes, [feature engineering for forecasting](feature-engineering-for-forecasting.md), dynamic regression, or neural/global models may be a better fit.

SARIMA remains a strong baseline for high-seasonality operational series such as [energy consumption forecasting](energy-consumption-forecasting.md), call volumes, and mature product demand. It should be judged against simpler seasonal naive forecasts and [exponential smoothing](exponential-smoothing.md), because seasonal ARIMA complexity is only useful when it improves out-of-sample forecasts.

## Connections

SARIMA is the seasonal extension of [ARIMA](arima.md). It uses the same stationarity logic as [stationarity](stationarity.md), but seasonal structure comes from [trend-seasonality-cycles-noise](trend-seasonality-cycles-noise.md) and is evaluated within [statistical forecasting](statistical-forecasting.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Seasonal ARIMA models](https://otexts.com/fpp3/seasonal-arima.html)
- [statsmodels SARIMAX API](https://www.statsmodels.org/stable/generated/statsmodels.tsa.statespace.sarimax.SARIMAX.html)

> **Section — [Time-Series Forecasting](index.md):** ← [ARIMA](arima.md) · [Exponential Smoothing](exponential-smoothing.md) →
