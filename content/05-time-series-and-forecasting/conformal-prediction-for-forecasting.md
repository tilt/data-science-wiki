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
  - forecast-calibration.md
  - probabilistic-forecasting.md
  - forecast-error-metrics.md
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

## Step-by-step example

1. Run rolling-origin backtests and store point forecasts.
2. On a calibration portion, compute absolute residuals by horizon.
3. For each horizon, take the 90th percentile residual.
4. Add and subtract that residual quantile from future point forecasts.
5. Evaluate empirical coverage on untouched later origins.

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
