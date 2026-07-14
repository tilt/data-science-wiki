---
title: Exponential Smoothing
slug: time-series-and-forecasting/exponential-smoothing
description: Recursive level, trend, and seasonal smoothing for statistical forecasting.
area: time-series-and-forecasting
topics:
  - exponential-smoothing
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - statistical-forecasting.md
  - trend-seasonality-cycles-noise.md
  - state-space-models.md
  - arima.md
  - forecast-error-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---

# Exponential Smoothing

Exponential smoothing forecasts by maintaining a small set of states - usually level, optionally trend and seasonality - and updating them recursively when each new observation arrives. It is not just a smoothing trick for plots. ETS models turn those recursions into a statistical forecasting family with error, trend, and seasonal components.

Simple exponential smoothing keeps only a level state:

$$
\ell_t = \alpha y_t + (1-\alpha)\ell_{t-1}, \qquad \hat{y}_{t+1|t} = \ell_t.
$$

The smoothing parameter $\alpha$ controls adaptation. A high $\alpha$ tracks new observations quickly but follows noise; a low $\alpha$ is stable but slow after level shifts. Holt's linear method adds a trend state, and Holt-Winters methods add seasonal states. Damped-trend variants reduce the risk of extrapolating a trend forever.

The intuition is state updating. Each observation is partly signal and partly noise. Exponential smoothing moves the latent state toward the observation by an amount determined by the estimated smoothing parameter, then forecasts from that state. This is why the family connects naturally to [state-space models](state-space-models.md): many ETS methods can be written as innovations state-space models with observation error feeding the state update.

## Worked example

With observations $20,21,19,22,24,23,25,26$ and $\alpha=0.4$, the level update is $\ell_t=0.4y_t+0.6\ell_{t-1}$:

| Time | Observation | Smoothed level |
| ---: | ----------: | -------------: |
|    1 |          20 |          20.00 |
|    2 |          21 |          20.40 |
|    3 |          19 |          19.84 |
|    4 |          22 |          20.70 |
|    5 |          24 |          22.02 |
|    6 |          23 |          22.41 |
|    7 |          25 |          23.45 |
|    8 |          26 |          24.47 |

The level moves toward new observations without jumping all the way to them. The one-step forecast from simple exponential smoothing is the latest level, so the next forecast is 24.47.

Exponential smoothing is often a strong baseline for business series with stable [trend, seasonality, cycles, and noise](trend-seasonality-cycles-noise.md). It can lag abrupt regime shifts, so compare it against [ARIMA](arima.md), seasonal naive baselines, and machine-learning models using [forecast error metrics](forecast-error-metrics.md) over realistic cutoffs.

## References

- [Hyndman & Athanasopoulos, FPP3: Exponential smoothing](https://otexts.com/fpp3/expsmooth.html)
- [statsmodels ExponentialSmoothing API](https://www.statsmodels.org/stable/generated/statsmodels.tsa.holtwinters.ExponentialSmoothing.html)
