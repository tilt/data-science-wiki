---
title: Moving Average Models
slug: time-series-and-forecasting/moving-average-models
description: Models that express a stationary series through current and lagged innovations.
area: time-series-and-forecasting
topics:
  - moving-average-models
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - arma.md
  - arima.md
  - autocorrelation-and-partial-autocorrelation.md
  - statistical-forecasting.md
  - forecast-error-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---
# Moving Average Models

A formal moving-average model is not the same thing as a rolling average smoother. A rolling average replaces an observation with an average of neighboring observations. An MA model describes the series as a weighted sum of current and past innovations, which are the unpredictable shocks left after forecasting.

An MA$(q)$ model is

$$
y_t = c + \varepsilon_t + \theta_1\varepsilon_{t-1} + \cdots + \theta_q\varepsilon_{t-q}.
$$

The current value is affected by a new shock $\varepsilon_t$ and by a finite number of older shocks. After $q$ lags, those shocks no longer directly enter the equation. That finite shock memory gives MA models their diagnostic signature: a pure MA$(q)$ process has an ACF that cuts off after lag $q$, while the PACF decays more gradually.

The intuition is easier if $y_t$ is a residual process. Suppose a demand baseline misses an unexpected promotion spike. A moving-average error term lets that surprise affect the next few residuals while the system settles back down. The model does not say past observed demand directly causes current demand; it says past forecast errors carry information about unobserved disturbances.

MA terms appear inside [ARMA](arma.md), [ARIMA](arima.md), and [SARIMA](sarima.md). They are estimated indirectly because the innovations are not observed before fitting. This makes invertibility important: without it, different MA parameter values can imply the same autocorrelation behavior. In practice, MA order should be judged by residual diagnostics and [forecast error metrics](forecast-error-metrics.md), not by smoothing appearance.

## Connections

Moving-average error terms are the MA side of [ARMA](arma.md) and [ARIMA](arima.md). Their diagnostic footprint appears in [autocorrelation and partial autocorrelation](autocorrelation-and-partial-autocorrelation.md), while simple rolling averages belong more naturally with [statistical forecasting](statistical-forecasting.md) baselines.

## References

- [Hyndman & Athanasopoulos, FPP3: Moving average models](https://otexts.com/fpp3/arima.html)
- [statsmodels ARIMA API](https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html)
