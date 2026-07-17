---
title: Forecasting Pitfalls and Worked Examples
slug: time-series-and-forecasting/forecasting-pitfalls-and-worked-examples
description: Lists common forecasting mistakes and gives compact worked examples for seasonal demand, intermittent demand, and multi-model ensembling.
area: time-series-and-forecasting
topics:
  - forecasting-pitfalls
  - worked-examples
  - forecasting
level: foundational
status: review
page_type: concept
aliases:
  - Forecasting Failure Modes
  - Forecasting Worked Examples
prerequisites:
  - forecasting-problem-formulation.md
related:
  - forecast-evaluation.md
  - backtesting.md
  - rolling-origin-validation.md
  - forecast-error-metrics.md
  - concept-drift-in-forecasting.md
historical_context: false
last_reviewed: 2026-07-17
---

# Forecasting Pitfalls and Worked Examples

## Summary

Forecasting errors often come from problem formulation and validation mistakes rather than model choice. This page collects common failure modes and compact examples that connect data, features, baselines, metrics, and model selection.

## Common forecasting mistakes

- Random train-test splits that train on future observations.
- Leakage through rolling features that include the prediction timestamp.
- Leakage through future covariates that would not be known at prediction time.
- Tuning on the final test period.
- Incorrect season length.
- Ignoring naive and seasonal-naive baselines.
- Excessive lag dimensionality.
- Evaluating only aggregate metrics.
- Ignoring bias.
- Using MAPE with zero demand.
- Selecting a separate best model for noisy short series.
- Optimizing ensemble weights on too little data.
- Failing to evaluate cold-start entities.
- Treating padded zeros as real observations.
- Forgetting to inverse-transform forecasts.
- Comparing models across different backtest folds.
- Uncontrolled fallback behavior.
- Over-parallelization.
- Assuming attention weights are causal explanations.
- Mixing prediction-time-known and prediction-time-unknown features.
- Reporting prediction intervals without empirical coverage.
- Using cost-aware losses without documenting cost assumptions.
- Reconciling forecasts across an incorrect hierarchy or calendar.

## Example 1: daily demand with weekly seasonality

A retailer forecasts daily product demand. Useful features include lag 1, lag 7, rolling mean over the previous 7 days, day-of-week encoding, and a promotion indicator.

| date       | lag_1 | lag_7 | rolling_mean_7 | day_of_week | promotion | target |
| ---------- | ----: | ----: | -------------: | ----------- | --------: | -----: |
| 2026-01-08 |   120 |   105 |          112.4 | Thursday    |         1 |    128 |

The seasonal-naive baseline for daily data with weekly seasonality uses:

$$
\hat{y}_{t+h}=y_{t+h-7}
$$

A tree-based model can improve on the baseline when promotions, calendar effects, and product metadata explain deviations from regular weekly seasonality. Evaluation should report error by horizon and promotion status because promotional days may dominate operational value.

## Example 2: intermittent spare-parts demand

A spare part has many zero-demand days and occasional positive demand:

| day | demand |
| --- | -----: |
| 1   |      0 |
| 2   |      0 |
| 3   |      2 |
| 4   |      0 |
| 5   |      0 |
| 6   |      1 |

MAPE fails because many denominators are zero. Croston-style methods estimate nonzero demand size separately from the interval between demand events. Aggregate-disaggregate methods forecast over a coarser interval and distribute predictions back to the required frequency.

MASE or WAPE is usually more defensible than MAPE when denominators are handled explicitly. For cold-start parts, a category-level fallback can use similar parts, lifecycle stage, and installed base as metadata.

## Example 3: multi-model ensemble

Suppose three models predict the same timestamp:

| model             | forecast | weight |
| ----------------- | -------: | -----: |
| seasonal naive    |      100 |    0.2 |
| gradient boosting |      112 |    0.5 |
| neural model      |      108 |    0.3 |

The ensemble forecast is:

$$
\hat{y}
=
0.2\cdot100
+
0.5\cdot112
+
0.3\cdot108
=
108.4
$$

The result is a weighted average. The seasonal baseline contributes stability, the tree model contributes covariate response, and the neural model contributes shared temporal representation. The weights should be fitted on validation forecasts and evaluated on untouched forecasts.

## Practical guidance

- Use examples to test whether the data contract is understandable.
- Compute every feature in the example as it would be computed in production.
- Include a baseline in every worked example.
- Show metric denominator behavior when sparse or zero demand is present.
- Treat examples as validation cases for documentation and implementation.

## Connections

Most forecasting pitfalls are failures of [backtesting](backtesting.md), [rolling-origin validation](rolling-origin-validation.md), or [forecast error metrics](forecast-error-metrics.md). Drift-related examples connect directly to [concept drift in forecasting](concept-drift-in-forecasting.md) and [forecast monitoring](forecast-monitoring.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Evaluating point forecast accuracy](https://otexts.com/fpp3/accuracy.html)
- [Hyndman & Athanasopoulos, FPP3: Time series cross-validation](https://otexts.com/fpp3/tscv.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Business-Cost-Aware Forecasting Losses](business-cost-aware-forecasting-losses.md) [Probabilistic Forecasting →](probabilistic-forecasting.md)
