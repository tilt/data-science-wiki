---
title: State Space Models
slug: time-series-and-forecasting/state-space-models
description: Forecasting models with latent states that evolve and emit observations over time.
area: time-series-and-forecasting
topics:
  - state-space-models
level: advanced
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - kalman-filters.md
  - exponential-smoothing.md
  - arima.md
  - forecast-monitoring.md
  - prediction-intervals.md
historical_context: false
last_reviewed: 2026-07-11
---
# State Space Models

A state-space model separates the hidden process from the noisy measurements. Instead of modeling only $y_t$, it introduces a latent state vector $\alpha_t$ that evolves over time and emits observations. The linear Gaussian form is

$$
\alpha_{t+1} = T_t \alpha_t + R_t \eta_t,\qquad
y_t = Z_t \alpha_t + \varepsilon_t,
$$

with process noise $\eta_t$ and observation noise $\varepsilon_t$. The state can contain a level, slope, seasonal positions, regression coefficients, or other quantities that should evolve more smoothly than raw observations.

This representation is useful because forecasting, filtering, and uncertainty all become operations on the latent state. The prediction step propagates $\alpha_t$ forward through the transition equation. The update step adjusts the predicted state after seeing $y_t$. [Kalman filters](kalman-filters.md) are the standard recursive algorithm for that update in linear Gaussian models.

Many familiar methods can be viewed through this lens. [Exponential smoothing](exponential-smoothing.md) has innovations state-space forms where forecast errors update level, trend, and seasonality. Some [ARIMA](arima.md) implementations are estimated in state-space form. Structural time-series models add interpretable components such as local linear trend, seasonal states, and regressors.

The main risk is plausible latent-state storytelling. A smooth estimated level does not prove the model is correct. Check one-step-ahead innovations, state jumps after outliers, interval coverage, and segment-level errors. If the observation process changes, the latent state can adapt in a way that looks reasonable while masking a failure that should trigger [forecast monitoring](forecast-monitoring.md).

## Connections

State-space models are the framework behind [kalman filters](kalman-filters.md), many ETS models in [exponential smoothing](exponential-smoothing.md), and some ARIMA estimators. Their uncertainty estimates connect directly to [prediction intervals](prediction-intervals.md) and production monitoring.

## References

- [statsmodels state-space documentation](https://www.statsmodels.org/stable/statespace.html)
- [statsmodels local linear trend example](https://www.statsmodels.org/stable/examples/notebooks/generated/statespace_local_linear_trend.html)
