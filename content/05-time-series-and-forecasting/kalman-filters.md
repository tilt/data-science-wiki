---
title: Kalman Filters
slug: time-series-and-forecasting/kalman-filters
description: Recursive prediction and update for linear Gaussian state-space models.
area: time-series-and-forecasting
topics:
  - kalman-filters
level: advanced
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - state-space-models.md
  - exponential-smoothing.md
  - forecast-monitoring.md
  - online-learning-for-forecasting.md
  - prediction-intervals.md
historical_context: false
last_reviewed: 2026-07-11
---

# Kalman Filters

A Kalman filter estimates a hidden state over time by alternating prediction and correction. It is the recursive inference engine for many [state-space models](state-space-models.md): the model predicts how the latent state should evolve, observes a noisy measurement, then updates the state according to the relative uncertainty of the prediction and the measurement.

For a linear Gaussian model,

$$
x_t = F x_{t-1} + w_t,\qquad z_t = H x_t + v_t,
$$

where $w_t$ has covariance $Q$ and $v_t$ has covariance $R$. The filter predicts

$$
\hat{x}_{t|t-1}=F\hat{x}_{t-1|t-1},\qquad
P_{t|t-1}=FP_{t-1|t-1}F^\top+Q.
$$

After observing $z_t$, it computes the innovation $z_t-H\hat{x}_{t|t-1}$ and Kalman gain

$$
K_t=P_{t|t-1}H^\top(HP_{t|t-1}H^\top+R)^{-1},
$$

then updates the state:

$$
\hat{x}_{t|t}=\hat{x}_{t|t-1}+K_t(z_t-H\hat{x}_{t|t-1}).
$$

The gain is the core intuition. If measurement noise is high, the filter trusts the model prediction more. If state uncertainty is high, it moves more aggressively toward the new observation. That makes Kalman filtering useful for online forecasting, tracking, sensor smoothing, and models where [prediction intervals](prediction-intervals.md) should reflect state uncertainty.

For forecasting, the filter gives a one-step predictive distribution before the observation arrives and a filtered state after the observation arrives. Smoothing is a different pass that uses later observations to estimate earlier states, so it is useful for analysis but not for live forecast generation.

The filter is only as good as its transition, observation, and noise assumptions. Mis-specified $Q$ or $R$ can make the state either sluggish or noisy. Innovation residuals should be monitored like other [forecast monitoring](forecast-monitoring.md) signals, especially after sensor changes or operating-regime shifts. Online retraining or adaptive noise estimates may be needed when the operating regime changes.

## References

- [Kalman, 1960, A New Approach to Linear Filtering and Prediction Problems](https://www.cs.unc.edu/~welch/kalman/kalmanPaper.html)
- [statsmodels state-space documentation](https://www.statsmodels.org/stable/statespace.html)
