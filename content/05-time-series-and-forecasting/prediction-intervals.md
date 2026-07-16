---
title: Prediction Intervals
slug: time-series-and-forecasting/prediction-intervals
description: Defines prediction intervals, empirical coverage, interval width, construction methods, and horizon-specific validation for forecasting.
area: time-series-and-forecasting
topics:
  - prediction-intervals
  - probabilistic-forecasting
  - evaluation
level: foundational
status: draft
page_type: concept
aliases:
  - Forecast Intervals
  - Forecast Uncertainty Intervals
prerequisites:
  - probabilistic-forecasting.md
related:
  - probabilistic-forecasting.md
  - quantile-loss.md
  - conformal-prediction-for-forecasting.md
  - forecast-calibration.md
  - forecast-error-metrics.md
  - ../17-experimentation-and-evaluation/coverage.md
historical_context: false
last_reviewed: 2026-07-11
---

# Prediction Intervals

## Summary

A prediction interval describes a range of plausible future observations. It differs from a confidence interval, which describes uncertainty about an estimated parameter. Forecasting decisions usually need prediction intervals because the future observation itself is uncertain.

For lower bound $L_t$ and upper bound $U_t$, a nominal $(1-\alpha)$ interval aims for:

$$
P(L_t \le y_t \le U_t) \approx 1-\alpha
$$

where $y_t$ is the future observed value.

## Coverage and width

Empirical coverage is the fraction of observations that fall inside the predicted interval:

$$
\text{coverage}
=
\frac{1}{n}
\sum_{i=1}^{n}
\mathbf{1}\{L_i \le y_i \le U_i\}
$$

where $n$ is the number of evaluated forecasts. A 90 percent interval with 72 percent empirical coverage is under-covering. A 90 percent interval with 99 percent empirical coverage may be too wide.

Interval width is:

$$
\text{width}_i = U_i - L_i
$$

Coverage without width is incomplete. Width without coverage is also incomplete.

## Construction methods

Analytic intervals use assumptions about model errors, such as normal residuals. Residual bootstrap methods resample past errors and add them to point forecasts. Quantile regression directly estimates lower and upper quantiles. Bayesian models use posterior predictive distributions. Conformal prediction calibrates intervals from held-out residuals under exchangeability assumptions. Ensembles can estimate uncertainty from dispersion across component forecasts, but ensemble spread is not automatically calibrated.

## Coverage audit

Suppose a daily demand model produces a point forecast of 1,000 units and a 90 percent interval of 850 to 1,220. Record the forecast origin and horizon. After demand is observed, check whether actual demand lies between 850 and 1,220. Repeat across many comparable forecasts, then compute empirical coverage and average width by horizon.

If only 78 percent of observations fall inside nominal 90 percent intervals at horizon 14, the intervals are too narrow for that horizon even if horizon 1 is well calibrated.

## Practical guidance

- Evaluate interval coverage by horizon, series group, season, and volume segment.
- Compare interval width for models with similar coverage.
- Use conformal or validation-based calibration when analytic assumptions are weak.
- Decide whether central intervals or one-sided bounds match the decision.
- Keep interval construction separate from final untouched evaluation.

## Common failure modes

- Confusing confidence intervals with prediction intervals.
- Reporting average coverage while hiding severe under-coverage at long horizons.
- Assuming residual variance is constant when promotions, weather, or lifecycle stage change uncertainty.
- Using ensemble spread as an interval without calibration.
- Evaluating intervals on the data used to tune their width.

## Worked example

Suppose recent residuals from point forecasts are $1.0,0.5,-1.0,-0.5,1.0,1.0$. Their sample standard deviation is about $0.876$. A normal 95 percent interval around a next point forecast of 17 is

$$
17\pm1.96(0.876)=[15.284,18.716].
$$

The same interval rule covers all six in-sample observations in this toy set, giving in-sample coverage 1.0. That looks reassuring, but it is not an honest validation result because the residual scale was estimated on the same data; calibration should be checked out of sample.

## Connections

Prediction intervals are the interval form of [probabilistic forecasting](probabilistic-forecasting.md). They are trained or scored through [quantile loss](quantile-loss.md), checked with [forecast calibration](forecast-calibration.md), and can be adjusted with [conformal prediction for forecasting](conformal-prediction-for-forecasting.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Distributional forecasts and prediction intervals](https://otexts.com/fpp3/prediction-intervals.html)
- [Romano, Patterson, and Candes, Conformalized Quantile Regression](https://arxiv.org/abs/1905.03222)

> **Section — [Time-Series Forecasting](index.md):** ← [Probabilistic Forecasting](probabilistic-forecasting.md) · [Quantile Loss](quantile-loss.md) →
