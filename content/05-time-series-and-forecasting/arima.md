---
title: ARIMA
slug: time-series-and-forecasting/arima
description: Autoregressive integrated moving-average models for nonseasonal univariate forecasting.
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
related:
  - arma.md
  - autoregressive-models.md
  - moving-average-models.md
  - stationarity.md
  - autocorrelation-and-partial-autocorrelation.md
  - sarima.md
  - backtesting.md
historical_context: false
last_reviewed: 2026-07-10
references:
  - "box-jenkins-reinsel-ljung-2015-time-series"
---
# ARIMA

ARIMA means autoregressive integrated moving average. It takes a nonseasonal univariate series, differences it until the remaining process is approximately stationary, then models that differenced process with [autoregressive models](autoregressive-models.md) and [moving-average models](moving-average-models.md). That is the main distinction from [ARMA](arma.md): ARMA assumes the modeled series is already stationary, while ARIMA includes the differencing operator that turns a drifting level series into changes.

For an ARIMA$(p,d,q)$ model, define the backshift operator $B y_t = y_{t-1}$. After $d$ differences, $w_t = (1-B)^d y_t$ is modeled as

$$
w_t = c + \phi_1 w_{t-1} + \cdots + \phi_p w_{t-p} + \varepsilon_t + \theta_1 \varepsilon_{t-1} + \cdots + \theta_q \varepsilon_{t-q}.
$$

Equivalently, using lag polynomials,

$$
\phi(B)(1-B)^d y_t = c + \theta(B)\varepsilon_t.
$$

The $p$ terms describe persistence in the differenced series, the $q$ terms describe short-run correction after shocks, and $d$ controls the transformation from level to stationary increments. ARIMA is useful when autocorrelation is the dominant structure and external regressors are absent or secondary. It is less natural for strong multiple seasonalities, changing calendars, or causal drivers such as price and promotions, where [forecasting data and covariates](forecasting-data-and-covariates.md) or global models may matter more.

Order selection is not a mechanical ACF/PACF ritual. Differencing should be minimal: too little differencing leaves trend in residuals, while too much can create negative autocorrelation and unstable long-horizon behavior. Candidate $p$ and $q$ values are usually narrowed with [autocorrelation and partial autocorrelation](autocorrelation-and-partial-autocorrelation.md), then judged with information criteria, residual diagnostics, and [backtesting](backtesting.md). A fitted ARIMA model should leave residuals that look close to white noise; otherwise the model has not captured the temporal dependence it was built to model.

ARIMA forecasts are recursive. A one-step forecast uses the latest observed values and estimated residuals. Multi-step forecasts then roll the dynamics forward, with uncertainty widening because future shocks are unknown. If the same pattern repeats at a known seasonal period, [SARIMA](sarima.md) extends the same lag-polynomial idea with seasonal AR, differencing, and MA terms.

## Connections

[Stationarity](stationarity.md) explains why differencing exists, [ARMA](arma.md) explains the stationary core, and [SARIMA](sarima.md) adds seasonal lag structure. ARIMA is usually compared with [exponential smoothing](exponential-smoothing.md) inside [statistical forecasting](statistical-forecasting.md), then evaluated with [forecast error metrics](forecast-error-metrics.md) over realistic historical cutoffs.

## References

- [Hyndman & Athanasopoulos, FPP3: ARIMA models](https://otexts.com/fpp3/arima.html)
- [statsmodels ARIMA API](https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html)

> **Learning path — Forecasting:** ← [Time-Series Forecasting](index.md) · [path overview](../00-home-and-navigation/learning-paths.md#forecasting) · [Forecast Evaluation](forecast-evaluation.md) →
