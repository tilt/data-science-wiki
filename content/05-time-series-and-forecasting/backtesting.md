---
title: Backtesting
slug: time-series-and-forecasting/backtesting
description: Explains rolling-origin evaluation, expanding and sliding windows, fold design, ensemble splits, aggregation levels, and backtesting tradeoffs.
area: time-series-and-forecasting
topics:
  - backtesting
  - rolling-origin-validation
  - evaluation
level: foundational
status: draft
page_type: algorithm
aliases:
  - Forecast Backtesting
  - Rolling Origin Evaluation
prerequisites:
  - forecasting-problem-formulation.md
related:
  - rolling-origin-validation.md
  - forecast-error-metrics.md
  - forecast-evaluation.md
  - forecast-ensembling.md
  - forecasting-pitfalls-and-worked-examples.md
  - ../17-experimentation-and-evaluation/offline-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Backtesting

## Summary

Backtesting evaluates forecasts by simulating historical prediction times. It answers the question: if the model had been run at past forecast origins using only information available then, how accurate would it have been?

## Rolling-origin evaluation

For forecast origins $c_1,\ldots,c_K$:

1. Train only on observations available up to $c_k$.
2. Forecast the next $H$ periods.
3. Compare predictions with realized targets.
4. Move the forecast origin forward.

Conceptual timeline:

```text
Fold 1: [ training data        ][ forecast horizon ]
Fold 2:      [ training data        ][ forecast horizon ]
Fold 3:           [ training data        ][ forecast horizon ]
```

This protocol respects time and exposes horizon-specific behavior.

## Backtesting choices

| Choice           | Alternatives                    | Effect                             | Main tradeoff                        |
| ---------------- | ------------------------------- | ---------------------------------- | ------------------------------------ |
| Window type      | Expanding or sliding            | Determines training history        | Stability versus drift adaptation    |
| Number of folds  | Few or many                     | Controls evaluation sample size    | Confidence versus compute            |
| Horizon          | Short or long                   | Defines operational forecast range | Easier accuracy versus planning need |
| Stride           | Every period or spaced origins  | Controls overlap                   | Detail versus runtime                |
| Retraining       | Per fold or fixed model         | Simulates deployment policy        | Realism versus cost                  |
| Validation split | Inner window or separate period | Supports tuning and early stopping | Data use versus unbiased evaluation  |

An expanding window uses all history up to each origin. A sliding window uses a fixed recent span. Retraining per fold is realistic when production retrains frequently, but it can be expensive. Fixed parameters across folds are cheaper but may understate retraining effects.

## Data partitions

Forecasting evaluation can involve several distinct datasets:

- Model training data.
- Validation data for early stopping or hyperparameter tuning.
- Backtest test data for model comparison.
- Ensemble fitting data for model weights or selection maps.
- Final untouched ensemble evaluation data.

An ensemble should not be optimized and evaluated on the same forecasts. A safer split is:

```text
Backtest forecasts
        |
        +-- ensemble-training portion
        |
        +-- ensemble-evaluation portion
```

## Aggregation levels

Metrics should be inspected per timestamp, per horizon, per item, across all items, per category or partition, and across backtest folds. Global averages are useful, but they can hide failures for long horizons, low-volume series, new entities, or high-value categories.

## Practical guidance

- Prefer rolling-origin evaluation over random splits.
- Match backtest retraining frequency to the intended production cadence.
- Use the same forecast horizons, feature availability, and fallback rules as production.
- Keep tuning, ensemble fitting, and final evaluation periods separate.
- Report results by horizon and series group.

## Common failure modes

- Comparing models evaluated on different forecast origins.
- Letting validation windows overlap with final test windows.
- Computing preprocessing on the full dataset before fold creation.
- Reporting only aggregate metrics.
- Ignoring the computational cost of realistic retraining.

## Connections

Backtesting operationalizes [forecast evaluation](forecast-evaluation.md): folds define the evidence, while [forecast error metrics](forecast-error-metrics.md) define the score. [Rolling-origin validation](rolling-origin-validation.md) is the usual fold design, and [forecast ensembling](forecast-ensembling.md) must keep ensemble-fitting data separate from final evaluation.

## References

- [Hyndman & Athanasopoulos, FPP3: Time series cross-validation](https://otexts.com/fpp3/tscv.html)
- [scikit-learn TimeSeriesSplit](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html)
