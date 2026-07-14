---
title: Conformal Prediction for Forecasting
slug: time-series-and-forecasting/conformal-prediction-for-forecasting
description: Explains split conformal prediction for forecasting intervals, residual calibration, time-series caveats, and practical validation.
area: time-series-and-forecasting
topics:
  - conformal-prediction
  - prediction-intervals
  - probabilistic-forecasting
level: advanced
status: draft
page_type: algorithm
aliases:
  - Conformal Forecasting
  - Split Conformal Forecasting
prerequisites:
  - prediction-intervals.md
  - backtesting.md
related:
  - prediction-intervals.md
  - quantile-loss.md
  - probabilistic-forecasting.md
  - forecast-calibration.md
  - backtesting.md
  - ../17-experimentation-and-evaluation/coverage.md
historical_context: false
last_reviewed: 2026-07-11
---

# Conformal Prediction for Forecasting

## Summary

Conformal prediction constructs prediction sets with finite-sample coverage guarantees under exchangeability assumptions. In forecasting, it is commonly used to calibrate prediction intervals from residuals on a validation window.

The core idea is simple: measure recent forecast errors, choose a high quantile of those errors, and widen future predictions by that amount.

## Split conformal intervals

For point forecasts $\hat{y}_i$ and validation observations $y_i$, define absolute residual scores:

$$
s_i = |y_i-\hat{y}_i|
$$

Let $q_{1-\alpha}$ be an appropriate empirical quantile of the scores. A conformal interval for a new point forecast $\hat{y}_{new}$ is:

$$
[\hat{y}_{new}-q_{1-\alpha},\ \hat{y}_{new}+q_{1-\alpha}]
$$

This symmetric form is easy to understand. Variants use asymmetric residuals, quantile models, horizon-specific scores, or locally weighted scores.

## Time-series caveats

Standard conformal guarantees rely on exchangeability. Time series observations are ordered and often autocorrelated, so the assumption is not automatic. Practical forecasting variants use rolling calibration windows, horizon-specific residual pools, blocked calibration, or weighted residuals that emphasize recent errors.

The calibration period must follow the same feature availability rules as the final forecast. It should not include future outcomes relative to the forecast origin being simulated.

## Calibration workflow

Run rolling-origin backtests and store point forecasts. On a calibration portion, compute absolute residuals by horizon. For each horizon, take the residual quantile matching the desired miscoverage level, then add and subtract that quantile from future point forecasts. Empirical coverage must be checked on later untouched origins.

If horizon 1 has residual quantile 8 and horizon 14 has residual quantile 31, the interval should usually be wider at horizon 14.

## Practical guidance

- Use separate calibration and evaluation periods.
- Calibrate by horizon when error grows with horizon.
- Consider segment-specific calibration when uncertainty differs by volume, season, or lifecycle stage.
- Track both coverage and interval width.
- Recalibrate when drift changes residual behavior.

## Common failure modes

- Assuming conformal coverage holds unchanged under strong temporal dependence or drift.
- Calibrating on the final evaluation period.
- Pooling residuals across horizons with very different error scales.
- Building symmetric intervals for targets with strong lower bounds or skew.
- Ignoring feature leakage in the backtests used for calibration.

## Worked example

For six calibration forecasts, the absolute residuals are:

| Observation | Forecast | Absolute residual |
| ----------: | -------: | ----------------: |
|          10 |        9 |                 1 |
|          12 |       11 |                 1 |
|          13 |       14 |                 1 |
|          15 |       14 |                 1 |
|          18 |       16 |                 2 |
|          21 |       22 |                 1 |

With $\alpha=0.2$, the conformal rank is $\lceil(6+1)(1-0.2)\rceil=\lceil5.6\rceil=6$, so the selected residual radius is the largest calibration score, $q=2$. Future point forecasts of 20 and 25 become intervals $[18,22]$ and $[23,27]$. Time-series use needs calibration windows that respect temporal ordering.

## Connections

Conformal forecasting wraps [prediction intervals](prediction-intervals.md) around residual or quantile scores. It pairs naturally with [quantile loss](quantile-loss.md), but its guarantees must be checked through [forecast calibration](forecast-calibration.md) and time-aware [backtesting](backtesting.md).

## References

- [Shafer and Vovk, A Tutorial on Conformal Prediction](https://www.jmlr.org/papers/v9/shafer08a.html)
- [Romano, Patterson, and Candes, Conformalized Quantile Regression](https://arxiv.org/abs/1905.03222)
- [Gibbs and Candes, Adaptive Conformal Inference Under Distribution Shift](https://arxiv.org/abs/2106.00170)
