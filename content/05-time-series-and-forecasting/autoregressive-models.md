---
title: Autoregressive Models
slug: time-series-and-forecasting/autoregressive-models
description: Models that forecast a stationary series from its own lagged values.
area: time-series-and-forecasting
topics:
  - autoregressive-models
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - autocorrelation-and-partial-autocorrelation.md
  - arma.md
  - arima.md
  - feature-engineering-for-forecasting.md
  - rnn-and-lstm-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---

# Autoregressive Models

An autoregressive model predicts a value from earlier values of the same series. It is the simplest mathematical expression of temporal persistence: if the recent past is above its long-run mean, the near future is likely to remain above the mean, but the strength and decay of that persistence are learned from data.

An AR$(p)$ model has the form

$$
y_t = c + \phi_1 y_{t-1} + \phi_2 y_{t-2} + \cdots + \phi_p y_{t-p} + \varepsilon_t.
$$

The lag coefficients are not generic feature importances. They define the dynamics of the process. In an AR(1), $|\phi_1| < 1$ gives mean reversion: shocks decay geometrically instead of persisting forever. Positive coefficients create smooth persistence; negative coefficients create alternating overshoot. Higher-order AR models can represent damped oscillations and dependence at multiple short lags, but they also become easier to overfit.

The model assumes the target process is stationary or has already been transformed into one. That is why AR models sit close to [stationarity](stationarity.md) and [ARMA](arma.md). In an [ARIMA](arima.md) model, the AR component is applied after differencing. In a machine-learning forecaster, the same idea appears as lag [feature engineering for forecasting](feature-engineering-for-forecasting.md), except the regression model may be nonlinear and may pool many related series.

AR order is often screened with the PACF: a pure AR process tends to show a partial-autocorrelation cutoff after the true order, while the ACF decays. Real data rarely follows the textbook pattern exactly, so order choice should be checked by residual autocorrelation and [rolling-origin validation](rolling-origin-validation.md). Strong one-step fit is not enough, because recursive multi-step AR forecasts feed on their own previous predictions.

## Connections

Autoregression is the AR component of [ARMA](arma.md), [ARIMA](arima.md), and [SARIMA](sarima.md). It also explains why lag features matter in [machine-learning forecasting](machine-learning-forecasting.md) and why sequence models such as [RNN and LSTM forecasting](rnn-and-lstm-forecasting.md) can be viewed as learned nonlinear autoregressions.

## References

- [Hyndman & Athanasopoulos, FPP3: Autoregressive models](https://otexts.com/fpp3/arima.html)
- [statsmodels AutoReg API](https://www.statsmodels.org/stable/generated/statsmodels.tsa.ar_model.AutoReg.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Feature Engineering for Forecasting](feature-engineering-for-forecasting.md) [Moving Average Models →](moving-average-models.md)
