---
title: Forecast Evaluation
slug: time-series-and-forecasting/forecast-evaluation
description: Overview of time-respecting forecast evaluation, metric families, aggregation levels, uncertainty, and model-selection cautions.
area: time-series-and-forecasting
topics:
  - forecast-evaluation
  - backtesting
  - metrics
level: intermediate
status: complete
page_type: concept
aliases:
  - Forecast Model Evaluation
prerequisites:
  - backtesting.md
related:
  - forecast-error-metrics.md
  - backtesting.md
  - rolling-origin-validation.md
  - forecast-calibration.md
  - forecasting-pitfalls-and-worked-examples.md
  - ../17-experimentation-and-evaluation/offline-evaluation.md
historical_context: false
last_reviewed: 2026-07-20
---

# Forecast Evaluation

Forecast evaluation measures how predictions perform under a time-respecting validation protocol. It combines [backtesting](backtesting.md), forecast error metrics, bias analysis, aggregation choices, uncertainty checks, and business interpretation.

## Core ideas

Evaluation starts from the forecast origin. A valid forecast can use only target history, historical covariates, and future-known covariates available at that origin. Random train-test splits usually leak future information.

Point forecasts are evaluated with metrics such as MAE, RMSE, WAPE, MASE, and bias. Probabilistic forecasts add interval coverage, interval width, quantile loss, or calibration checks. Sparse series, cold-start entities, and high-value partitions should be evaluated separately.

Evaluation is not a single number but several dimensions, each answering a different question:

| Dimension      | Question it answers                             | Example check                                          |
| -------------- | ----------------------------------------------- | ------------------------------------------------------ |
| Point accuracy | how close are the point forecasts?              | MAE, RMSE, or WAPE against a seasonal-naive baseline   |
| Bias           | does it systematically over- or under-forecast? | mean signed error by series and horizon                |
| Probabilistic  | are the intervals honest?                       | interval coverage and width, pinball loss              |
| Calibration    | do stated quantiles match frequencies?          | reliability by quantile                                |
| Slices         | who is served worst?                            | metrics by horizon, category, cold-start, intermittent |

A model that wins on aggregate point accuracy can still lose on bias direction or on a high-cost slice, so a release decision reads the whole row, not one cell.

## Model comparison

A fair comparison requires identical forecast origins, horizons, target definitions, masks, and evaluation metrics. If one model is evaluated on easier folds or a shorter horizon, its score is not comparable.

Model selection should consider absolute accuracy, relative accuracy, bias, tail risk, business cost, service-level impact, inference complexity, and fallback behavior.

## Practical guidance

- Evaluate under rolling-origin backtesting.
- Always include naive and seasonal-naive baselines.
- Inspect metrics by horizon, series, fold, and category.
- Document metric sign conventions, especially for bias.
- Evaluate cold-start and intermittent-demand populations separately.
- Use [business-cost-aware losses](business-cost-aware-forecasting-losses.md) only when the cost model is explicit.
- Do not optimize ensembles or hyperparameters on the final evaluation period.

## Common failure modes

- Reporting only one global metric.
- Using MAPE when zeros are common.
- Ignoring overforecasting or underforecasting direction.
- Comparing models across different backtest folds.
- Evaluating forecasts before inverse-transforming them to original units.

## Connections

Forecast evaluation joins [backtesting](backtesting.md), [rolling-origin validation](rolling-origin-validation.md), [forecast error metrics](forecast-error-metrics.md), and [forecast calibration](forecast-calibration.md). It also overlaps with general [offline evaluation](../17-experimentation-and-evaluation/offline-evaluation.md) when comparing deployed model candidates.

## References

- [Hyndman & Athanasopoulos, FPP3: Evaluating point forecast accuracy](https://otexts.com/fpp3/accuracy.html)
- [Hyndman & Athanasopoulos, FPP3: Time series cross-validation](https://otexts.com/fpp3/tscv.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← N-BEATS and N-HiTS](n-beats-and-nhits.md) [Backtesting →](backtesting.md)
>
> **Learning path** — [Forecasting](../00-home-and-navigation/learning-paths.md#forecasting)
>
> [← Backtesting](backtesting.md)
