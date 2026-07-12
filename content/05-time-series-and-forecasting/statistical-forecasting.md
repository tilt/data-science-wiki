---
title: Statistical Forecasting
slug: time-series-and-forecasting/statistical-forecasting
description: Covers naive baselines, seasonal naive, historical means, moving averages, exponential smoothing, ETS, ARIMA, seasonal ARIMA, and intermittent-demand methods.
area: time-series-and-forecasting
topics:
  - statistical-forecasting
  - arima
  - exponential-smoothing
level: intermediate
status: draft
page_type: concept
aliases:
  - Classical Forecasting
  - Statistical Time Series Forecasting
prerequisites:
  - forecasting-problem-formulation.md
related:
  - arima.md
  - sarima.md
  - exponential-smoothing.md
  - intermittent-demand.md
  - forecast-ensembling.md
  - machine-learning-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---
# Statistical Forecasting

## Summary

Statistical forecasting models future values through explicit assumptions about level, trend, seasonality, autocorrelation, and noise. These methods are essential even when more complex machine learning or neural models are available because they provide strong baselines, interpretable diagnostics, and robust fallbacks.

## Naive and seasonal baselines

The naive forecast repeats the most recent observed value:

$$
\hat{y}_{t+h}=y_t
$$

where $t$ is the forecast origin and $h$ is the horizon. It is an essential baseline because any complex model should justify itself against the simplest persistence assumption.

The seasonal naive forecast repeats the observation from the matching seasonal position:

$$
\hat{y}_{t+h}=y_{t+h-s}
$$

where $s$ is the seasonal period. For daily data with weekly seasonality, $s=7$. For monthly data with yearly seasonality, $s=12$. For weekly data with annual seasonality, $s=52$.

Seasonal naive baselines are hard to beat when stable seasonality dominates and covariates add little information.

## Historical mean and moving-window average

The historical mean forecast is:

$$
\hat{y}_{t+h}
=
\frac{1}{t}\sum_{i=1}^{t} y_i
$$

It can work for stationary series without strong trend or seasonality. It fails when the process drifts, has structural breaks, or contains seasonal cycles.

The moving-window average is:

$$
\hat{y}_{t+h}
=
\frac{1}{w}\sum_{i=t-w+1}^{t}y_i
$$

where $w$ is the window size. Short windows adapt quickly but have higher variance. Long windows reduce noise but lag behind changes.

## Exponential smoothing and ETS

Exponential smoothing updates latent states for level, trend, and seasonality. Recent observations receive more weight than older observations. A simple level update has the form:

$$
\ell_t = \alpha y_t + (1-\alpha)\ell_{t-1}
$$

where $\ell_t$ is the level at time $t$, and $\alpha$ is a smoothing parameter between 0 and 1.

ETS models describe the **error**, **trend**, and **seasonal** components. Components can be additive or multiplicative. Additive seasonality is appropriate when seasonal amplitude is roughly constant. Multiplicative seasonality is appropriate when seasonal amplitude scales with the level. Damped trends reduce long-horizon trend extrapolation by shrinking trend contribution over time.

State-space formulations make the update equations probabilistic and support likelihood-based estimation and prediction intervals. Full derivations are model-specific, but the intuition is that each new observation updates latent states that summarize the series.

## ARIMA

ARIMA models combine autoregression, differencing, and moving-average errors. An $ARIMA(p,d,q)$ model has:

- $p$ autoregressive terms, which regress on past values.
- $d$ differences, which transform the series toward stationarity.
- $q$ moving-average terms, which model autocorrelated forecast errors.

Stationarity means the statistical properties of the transformed series are stable over time. Differencing removes trend-like behavior by modeling changes instead of levels.

Seasonal ARIMA extends ARIMA with seasonal autoregressive, differencing, and moving-average terms. It is useful when autocorrelation appears at seasonal lags such as 7, 12, or 52.

ARIMA models are interpretable and effective for single series with stable autocorrelation. They are less convenient for large panels, many covariates, complex nonlinear effects, and cold-start entities.

## Intermittent demand

Many-zero series, such as spare-parts demand or slow-moving inventory, violate assumptions behind ordinary smooth forecasts. A model that predicts a small positive value every period may have good squared error but poor operational meaning.

Croston's method separately estimates nonzero demand size and the interval between nonzero demands. The forecast is roughly the estimated demand size divided by the estimated interval. Bias-adjusted variants modify this estimate because original Croston forecasts can be biased.

Aggregate-disaggregate approaches such as ADIDA aggregate the sparse series to a coarser frequency, forecast the aggregate demand, and distribute it back to the required frequency. This can reduce zero inflation but introduces allocation assumptions.

## Statistical versus ML versus neural forecasting

| Family      | Strengths                                                       | Weaknesses                                        | Data requirements                     | Covariate support   | Compute cost | Interpretability | Typical use cases                             |
| ----------- | --------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------- | ------------------- | ------------ | ---------------- | --------------------------------------------- |
| Statistical | Strong baselines, transparent assumptions, robust on small data | Limited nonlinear covariate handling, often local | One or more reasonably regular series | Limited to moderate | Low          | High             | Seasonal demand, simple operations, fallbacks |
| Tabular ML  | Handles metadata, nonlinear covariates, global panels           | Manual lag engineering, weak extrapolation        | Many rows and reliable features       | Strong              | Medium       | Medium           | Retail demand, traffic, capacity planning     |
| Neural      | Representation sharing, multi-horizon outputs, rich covariates  | More tuning, compute, diagnostics                 | Large related panels                  | Strong              | High         | Low to medium    | Large-scale related series, long horizons     |

## Practical guidance

- Always include naive and seasonal-naive baselines in model comparisons.
- Use ETS when level, trend, and seasonality are the dominant structure.
- Use ARIMA-style models when autocorrelation and stationarity diagnostics are central.
- Use intermittent-demand methods when zero periods are structural, not noise.
- Prefer simple statistical fallbacks for cold starts, failures, and auditability.

## Common failure modes

- Using the wrong seasonal period.
- Treating a structural break as ordinary noise.
- Applying MAPE to intermittent demand with many zeros.
- Assuming a trend should extrapolate indefinitely.
- Comparing complex models only against weak baselines.

## Connections

Statistical forecasting collects [ARIMA](arima.md), [SARIMA](sarima.md), [exponential smoothing](exponential-smoothing.md), and [intermittent demand](intermittent-demand.md) methods. It supplies baselines for [machine learning forecasting](machine-learning-forecasting.md) and candidates for [forecast ensembling](forecast-ensembling.md).

## References

- [Hyndman & Athanasopoulos, FPP3: The forecaster toolbox](https://otexts.com/fpp3/toolbox.html)
- [Nixtla StatsForecast documentation](https://nixtlaverse.nixtla.io/statsforecast/index.html)
