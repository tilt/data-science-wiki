---
title: Probabilistic Forecasting
slug: time-series-and-forecasting/probabilistic-forecasting
description: Explains probabilistic forecasts, predictive distributions, quantiles, intervals, calibration, sharpness, and decision-oriented use cases.
area: time-series-and-forecasting
topics:
  - probabilistic-forecasting
  - prediction-intervals
  - forecast-calibration
level: advanced
status: draft
page_type: concept
aliases:
  - Distributional Forecasting
  - Forecast Uncertainty
prerequisites:
  - forecasting-problem-formulation.md
  - forecast-error-metrics.md
related:
  - prediction-intervals.md
  - quantile-loss.md
  - conformal-prediction-for-forecasting.md
  - forecast-calibration.md
  - deep-learning-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---

# Probabilistic Forecasting

## Summary

Probabilistic forecasting estimates uncertainty about future values, not only a single best forecast. The output may be a predictive distribution, a set of quantiles, samples from future trajectories, or prediction intervals.

A point forecast answers "what value is typical?" A probabilistic forecast answers "what range of values is plausible, and how likely are they?"

## Predictive distributions

For target $y_{t+h}$ at horizon $h$, a probabilistic forecast estimates:

$$
P(y_{t+h} \mid y_{1:t}, x_{1:t}, x_{t+1:t+h})
$$

where $y_{1:t}$ is target history, $x_{1:t}$ are historical covariates, and $x_{t+1:t+h}$ are future-known covariates. The distribution can be represented parametrically, such as a normal or negative binomial distribution, or nonparametrically through quantiles or samples.

## Quantiles and intervals

The $\tau$-quantile forecast $\hat{q}_\tau$ is a value such that the future observation should fall below it with probability approximately $\tau$:

$$
P(y \le \hat{q}_\tau) \approx \tau
$$

A central 90 percent prediction interval can be built from the 5th and 95th percentiles. The median forecast is the 50th percentile.

Quantiles are useful because many decisions are asymmetric. Inventory planners may care more about underforecasting than overforecasting. Capacity planners may require high quantiles rather than means.

## Calibration and sharpness

Calibration asks whether probabilities match observed frequencies. If a model predicts 90 percent intervals, about 90 percent of realized observations should fall inside those intervals over comparable forecast cases.

Sharpness asks whether the predictive distribution is concentrated. A very wide interval may be calibrated but not useful. A narrow interval may be useful only if it remains calibrated. Good probabilistic forecasts balance calibration and sharpness.

## Example

A website traffic forecast for tomorrow has:

| output          |   value |
| --------------- | ------: |
| 10th percentile |  82,000 |
| 50th percentile |  96,000 |
| 90th percentile | 121,000 |

The median is a typical forecast. The 90th percentile is more relevant if server capacity must handle high traffic days. The gap between the 10th and 90th percentiles communicates uncertainty.

## Practical guidance

- Use probabilistic forecasts when decisions depend on risk tolerance, safety stock, staffing reserves, capacity margins, or service levels.
- Evaluate calibration by horizon and segment, not only globally.
- Report interval width or quantile spread alongside coverage.
- Prefer quantile forecasts when costs differ for underforecasting and overforecasting.
- Keep prediction intervals tied to the same forecast origin and covariate availability rules as point forecasts.

## Common failure modes

- Treating a prediction interval as a confidence interval for a model parameter.
- Reporting calibrated but extremely wide intervals as useful.
- Evaluating only point accuracy and ignoring uncertainty quality.
- Assuming residual uncertainty is constant across horizons or series groups.
- Calibrating intervals on the final evaluation period.

## Connections

Probabilistic forecasting generalizes point forecasts into distributions. Its practical surface includes [prediction intervals](prediction-intervals.md), [quantile loss](quantile-loss.md), [forecast calibration](forecast-calibration.md), and [conformal prediction for forecasting](conformal-prediction-for-forecasting.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Distributional forecasts and prediction intervals](https://otexts.com/fpp3/prediction-intervals.html)
- [Salinas, Flunkert, and Gasthaus, DeepAR](https://arxiv.org/abs/1704.04110)

> **Section — [Time-Series Forecasting](index.md):** ← [Forecasting Pitfalls and Worked Examples](forecasting-pitfalls-and-worked-examples.md) · [Prediction Intervals](prediction-intervals.md) →
