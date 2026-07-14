---
title: Forecast Calibration
slug: time-series-and-forecasting/forecast-calibration
description: Explains calibration for probabilistic forecasts, intervals, quantiles, reliability checks, recalibration, and horizon-specific diagnostics.
area: time-series-and-forecasting
topics:
  - forecast-calibration
  - probabilistic-forecasting
  - evaluation
level: advanced
status: draft
page_type: concept
aliases:
  - Probabilistic Forecast Calibration
  - Interval Calibration
prerequisites:
  - probabilistic-forecasting.md
related:
  - probabilistic-forecasting.md
  - prediction-intervals.md
  - quantile-loss.md
  - conformal-prediction-for-forecasting.md
  - forecast-evaluation.md
  - ../17-experimentation-and-evaluation/calibration.md
historical_context: false
last_reviewed: 2026-07-11
---

# Forecast Calibration

## Summary

Forecast calibration checks whether predicted probabilities match observed frequencies. In forecasting, calibration is usually assessed for quantiles, prediction intervals, or full predictive distributions.

If a model issues many 80 percent prediction intervals, about 80 percent of the corresponding future observations should fall inside those intervals for comparable cases.

## Quantile calibration

For a quantile forecast $\hat{q}_{\tau,i}$, empirical quantile coverage is:

$$
\hat{c}_{\tau}
=
\frac{1}{n}
\sum_{i=1}^{n}
\mathbf{1}\{y_i \le \hat{q}_{\tau,i}\}
$$

A calibrated $\tau$-quantile has $\hat{c}_{\tau}\approx\tau$. For example, if a 0.9 quantile is exceeded 25 percent of the time, it is too low.

## Interval calibration

For intervals $[L_i,U_i]$, empirical coverage measures how often observations fall inside the interval. Coverage should be reported with interval width. Wide intervals can be calibrated but uninformative.

Calibration should be checked by horizon, entity group, season, promotion state, and volume level. Aggregate calibration can hide under-coverage in the exact segments where uncertainty matters most.

## Recalibration

Recalibration adjusts predicted quantiles or intervals using validation data. Examples include multiplying interval widths by a horizon-specific factor, mapping nominal quantile levels to empirical levels, or applying conformal prediction.

Recalibration data must be separate from the final evaluation period. Otherwise the final coverage estimate is optimistic.

## Practical guidance

- Plot empirical coverage against nominal quantile or interval levels.
- Report calibration by horizon and important business segments.
- Track both coverage and sharpness.
- Recalibrate only on validation data that would have been available before final evaluation.
- Recheck calibration after major feature, model, or data pipeline changes.

## Common failure modes

- Reporting average coverage while ignoring long-horizon under-coverage.
- Making intervals wider until coverage looks good without tracking usefulness.
- Treating attention weights or feature importance as evidence of calibration.
- Recalibrating on the same period used for final reporting.
- Ignoring delayed labels when monitoring live calibration.

## Connections

Calibration is the reliability check for [probabilistic forecasting](probabilistic-forecasting.md). It complements [prediction intervals](prediction-intervals.md), [quantile loss](quantile-loss.md), [conformal prediction for forecasting](conformal-prediction-for-forecasting.md), and the broader evaluation notion of [calibration](../17-experimentation-and-evaluation/calibration.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Distributional forecasts and prediction intervals](https://otexts.com/fpp3/prediction-intervals.html)
- [Romano, Patterson, and Candes, Conformalized Quantile Regression](https://arxiv.org/abs/1905.03222)
