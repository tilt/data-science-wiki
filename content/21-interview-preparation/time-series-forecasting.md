---
title: Time Series Forecasting
slug: interview-preparation/time-series-forecasting
description: Interview map for forecasting problem formulation, validation, intervals, and leakage questions.
area: interview-preparation
topics:
  - time-series-forecasting
  - interview-question-map
level: intermediate
status: review
page_type: topic-index
aliases: []
prerequisites:
  - index.md
related:
  - "../05-time-series-and-forecasting/time-series-fundamentals.md"
  - "../05-time-series-and-forecasting/backtesting.md"
  - "../05-time-series-and-forecasting/rolling-origin-validation.md"
  - "../05-time-series-and-forecasting/prediction-intervals.md"
  - "../05-time-series-and-forecasting/forecast-error-metrics.md"
  - evaluation.md
  - answer-patterns.md
historical_context: false
last_reviewed: 2026-07-11
---
# Time Series Forecasting

## Map answer

Forecasting interviews test whether you respect time. Start with target, horizon, granularity, update cadence, decision, feature availability, and baselines; then discuss model choice, [backtesting](../05-time-series-and-forecasting/backtesting.md), uncertainty, and monitoring.

## Question map

| Prompt type | Strong answer should mention | Canonical page |
| --- | --- | --- |
| "Forecast daily demand." | Calendar effects, promotions, stockouts, aggregation level, naive and seasonal baselines, and horizon-specific metrics. | [Time Series Fundamentals](../05-time-series-and-forecasting/time-series-fundamentals.md) |
| "How do you validate it?" | Rolling forecast origins, expanding/sliding windows, no future leakage, and horizon-by-horizon error. | [Rolling Origin Validation](../05-time-series-and-forecasting/rolling-origin-validation.md) |
| "How do you express uncertainty?" | Prediction intervals, empirical coverage, width, calibration by horizon, and one-sided decision needs. | [Prediction Intervals](../05-time-series-and-forecasting/prediction-intervals.md) |
| "Which metric should you use?" | MAE/RMSE/MAPE tradeoffs, business cost, intermittent demand, and aggregate versus segment error. | [Forecast Error Metrics](../05-time-series-and-forecasting/forecast-error-metrics.md) |

## Interview artifact

For "Forecast daily retail demand four weeks ahead," say: "I would benchmark naive yesterday and same-day-last-week forecasts, train only on data available before each origin, run rolling-origin validation for horizons 1 through 28, report errors by horizon and category, and validate 80 or 90 percent prediction-interval coverage." That directly connects this page to [Evaluation](evaluation.md) and avoids the common random-split leakage mistake.

## Common follow-ups

- **"Why not random train-test split?"** It leaks future regimes, calendar patterns, and sometimes engineered aggregates into training.
- **"What if the series has stockouts?"** Treat observed sales as censored demand or add inventory-aware features; do not train as if missing demand was zero.
- **"What blocks launch?"** Bad peak-period performance, under-covering intervals, stale calendar features, or drift after promotions or policy changes.

## References

- [Hyndman and Athanasopoulos, Forecasting: Principles and Practice, time series cross-validation](https://otexts.com/fpp3/tscv.html)
- [scikit-learn User Guide: TimeSeriesSplit](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html)
