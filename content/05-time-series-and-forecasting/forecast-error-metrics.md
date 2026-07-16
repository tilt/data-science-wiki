---
title: Forecast Error Metrics
slug: time-series-and-forecasting/forecast-error-metrics
description: Defines MAE, RMSE, MAPE, WAPE, MASE, bias, sparse-demand metrics, and practical metric selection for forecasting.
area: time-series-and-forecasting
topics:
  - forecast-error-metrics
  - evaluation
  - backtesting
level: foundational
status: draft
page_type: reference
aliases:
  - Forecast Metrics
  - Forecast Accuracy Metrics
  - Forecast Bias
prerequisites:
  - backtesting.md
related:
  - forecast-evaluation.md
  - backtesting.md
  - rolling-origin-validation.md
  - quantile-loss.md
  - business-cost-aware-forecasting-losses.md
  - intermittent-demand.md
historical_context: false
last_reviewed: 2026-07-11
---

# Forecast Error Metrics

## Summary

Forecast metrics quantify different aspects of error. No single metric captures absolute accuracy, relative accuracy, bias, tail risk, and business cost. A robust evaluation reports several metrics by horizon, series group, and aggregation level.

## Core metrics

Mean Absolute Error is:

$$
MAE =
\frac{1}{n}\sum_{i=1}^{n}|y_i-\hat{y}_i|
$$

where $y_i$ is an observed value, $\hat{y}_i$ is its forecast, and $n$ is the number of evaluated predictions. MAE is interpretable in the target unit, but scale-dependent.

Root Mean Squared Error is:

$$
RMSE =
\sqrt{
\frac{1}{n}
\sum_{i=1}^{n}
(y_i-\hat{y}_i)^2
}
$$

RMSE penalizes large errors more strongly than MAE, which is useful when large misses are especially costly. It is sensitive to outliers.

Mean Absolute Percentage Error is:

$$
MAPE =
\frac{100}{n}
\sum_{i=1}^{n}
\left|
\frac{y_i-\hat{y}_i}{y_i}
\right|
$$

MAPE is easy to explain as a percentage, but fails or becomes unstable when $y_i$ is zero or close to zero. It is usually unsuitable for sparse demand.

Weighted Absolute Percentage Error is:

$$
WAPE =
\frac{
\sum_i |y_i-\hat{y}_i|
}{
\sum_i |y_i|
}
$$

WAPE is an aggregate ratio, not simply a weighted mean of individual percentage errors. It behaves sensibly for many sparse observations if the aggregate denominator is positive. If $\sum_i |y_i|=0$, WAPE is undefined and the reporting rule must be explicit.

Mean Absolute Scaled Error is:

$$
MASE =
\frac{
\frac{1}{n}\sum_i|y_i-\hat{y}_i|
}{
\frac{1}{T-s}
\sum_{t=s+1}^{T}
|y_t-y_{t-s}|
}
$$

Here $T$ is the length of the training series, and $s$ is the seasonal period. The denominator is the in-sample error of a naive or seasonal-naive forecast. MASE supports comparison across scales when the denominator is well defined.

Bias under this convention is:

$$
Bias =
\frac{1}{n}
\sum_i
(\hat{y}_i-y_i)
$$

Positive bias means overforecasting. Negative bias means underforecasting. Some libraries reverse the sign, so the convention must always be documented.

## Metrics comparison

| Metric | Scale-dependent | Handles zeros                       | Sensitivity to outliers | Interpretability     | Recommended use                      |
| ------ | --------------- | ----------------------------------- | ----------------------- | -------------------- | ------------------------------------ |
| MAE    | Yes             | Yes                                 | Medium                  | Target units         | Operational absolute error           |
| RMSE   | Yes             | Yes                                 | High                    | Target units         | Penalizing large misses              |
| MAPE   | No              | No                                  | High near zero          | Percentage           | Nonzero stable targets               |
| WAPE   | Partly          | If aggregate denominator is nonzero | Medium                  | Aggregate percentage | Portfolio-level demand               |
| MASE   | No              | Usually                             | Depends on denominator  | Relative to baseline | Cross-series comparison              |
| Bias   | Yes             | Yes                                 | Medium                  | Directional error    | Overforecasting and underforecasting |

## Sparse and intermittent demand

Sparse series may have many zeros, low exposure, and irregular demand intervals. Relative pointwise percentage metrics can become misleading. Suitable alternatives include aggregated metrics, scaled metrics, range-normalized metrics, business-weighted metrics, and evaluation over longer intervals.

Nonstandard metrics should be defined with a precise formula before use. A dashboard label such as "relative error" is not enough.

## Probabilistic and cost-aware metrics

Point metrics do not evaluate uncertainty quality. Quantile forecasts should be evaluated with [quantile loss](quantile-loss.md), empirical coverage, and calibration diagnostics. Prediction intervals should report both coverage and width.

When forecast errors have asymmetric business costs, use documented cost-aware metrics rather than silently changing model targets. See [business-cost-aware forecasting losses](business-cost-aware-forecasting-losses.md).

## Metric selection

Model selection should rarely rely on one metric alone. Inventory decisions may care about bias and service-level impact. Capacity planning may care about peak underforecasting. Financial planning may care about aggregate WAPE. Operational staffing may care about horizon-specific MAE.

Use metrics to answer concrete questions: How wrong are forecasts in target units? Are they systematically high or low? Are errors worse at longer horizons? Are sparse entities handled differently from high-volume entities?

## Executed example

This snippet computes MAE, RMSE, WAPE, and signed bias for the same forecast errors so their scale and sensitivity can be compared.

```python
import numpy as np

y = np.array([100, 120, 0, 80, 60], dtype=float)
yhat = np.array([90, 135, 5, 70, 75], dtype=float)
err = y - yhat
mae = np.mean(np.abs(err))
rmse = np.sqrt(np.mean(err ** 2))
wape = np.sum(np.abs(err)) / np.sum(np.abs(y))
bias = np.mean(yhat - y)
print("MAE", round(float(mae), 3))
print("RMSE", round(float(rmse), 3))
print("WAPE", round(float(wape), 3))
print("bias_forecast_minus_actual", round(float(bias), 3))
```

Observed output:

```text
MAE 11.0
RMSE 11.619
WAPE 0.153
bias_forecast_minus_actual 3.0
```

The zero actual value makes MAPE unusable here, but MAE, RMSE, WAPE, and signed bias remain defined. MAE is 11 units on average, RMSE is slightly larger at 11.619 because it weights the 15-unit misses more heavily, WAPE says total absolute error is 15.3 percent of total actual volume, and positive bias of 3.0 means the forecasts are high on average.

## Connections

Forecast metrics are the scoring layer for [forecast evaluation](forecast-evaluation.md), [backtesting](backtesting.md), and [rolling-origin validation](rolling-origin-validation.md). Point metrics should be paired with [quantile loss](quantile-loss.md) or [business-cost-aware forecasting losses](business-cost-aware-forecasting-losses.md) when uncertainty or asymmetric decisions matter.

## References

- [Hyndman & Athanasopoulos, FPP3: Evaluating point forecast accuracy](https://otexts.com/fpp3/accuracy.html)
- [Hyndman & Athanasopoulos, FPP3: Evaluating distributional forecast accuracy](https://otexts.com/fpp3/prediction-intervals.html)

> **Section — [Time-Series Forecasting](index.md):** ← [Rolling Origin Validation](rolling-origin-validation.md) · [Business-Cost-Aware Forecasting Losses](business-cost-aware-forecasting-losses.md) →
