---
title: Rolling Origin Validation
slug: time-series-and-forecasting/rolling-origin-validation
description: Time-ordered validation that repeatedly advances the forecast cutoff.
area: time-series-and-forecasting
topics:
  - rolling-origin-validation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - backtesting.md
  - forecast-error-metrics.md
  - forecast-evaluation.md
  - hyperparameter-optimization-for-forecasting.md
  - forecasting-pitfalls-and-worked-examples.md
  - ../17-experimentation-and-evaluation/offline-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Rolling Origin Validation

Rolling-origin validation evaluates a forecaster by moving the training cutoff forward through history. At cutoff $t_i$, the model is trained only on observations up to $t_i$ and evaluated on one or more future horizons:

$$
\hat{y}_{t_i+h|t_i},\qquad h=1,\ldots,H.
$$

This mirrors the production forecasting contract: each forecast can use the past and any covariates genuinely known at forecast creation time, but not outcomes or derived statistics from the future.

There are two common variants. Expanding-window validation keeps the first training date fixed and adds more history at each cutoff. Sliding-window validation keeps a fixed lookback length and drops older observations, which can help when [concept drift in forecasting](concept-drift-in-forecasting.md) is expected. Multi-horizon validation records errors separately by horizon because a model that is strong at $h=1$ may be weak at $h=14$.

Leakage usually enters outside the split object. Lag features, rolling means, scalers, target encoders, hyperparameter search, and imputation must be fitted inside each fold whenever they depend on observed targets. That is why rolling origin is the fold design behind [backtesting](backtesting.md), not a complete evaluation system by itself.

Rolling validation produces the error table consumed by [forecast error metrics](forecast-error-metrics.md), [forecast evaluation](forecast-evaluation.md), and [hyperparameter optimization for forecasting](hyperparameter-optimization-for-forecasting.md). The useful output is not a single score but a matrix by cutoff, horizon, segment, and model, so failures around holidays, cold-start series, or long horizons are visible.

The cutoffs should also match the production retraining policy. A model retrained every night can use denser origins than a model retrained monthly. When labels arrive late, evaluation must delay scoring until outcomes are genuinely available.

## References

- [Hyndman & Athanasopoulos, FPP3: Time series cross-validation](https://otexts.com/fpp3/tscv.html)
- [scikit-learn TimeSeriesSplit](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Backtesting](backtesting.md) [Forecast Error Metrics →](forecast-error-metrics.md)
