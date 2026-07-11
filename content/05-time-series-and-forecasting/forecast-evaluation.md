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
status: draft
page_type: concept
aliases:
  - Forecast Model Evaluation
prerequisites:
  - backtesting.md
related:
  - forecast-error-metrics.md
  - prediction-intervals.md
  - probabilistic-forecasting.md
  - forecast-calibration.md
  - business-cost-aware-forecasting-losses.md
historical_context: false
last_reviewed: 2026-07-11
---

# Forecast Evaluation

## Summary

Forecast evaluation measures how predictions perform under a time-respecting validation protocol. It combines [backtesting](backtesting.md), forecast error metrics, bias analysis, aggregation choices, uncertainty checks, and business interpretation.

## Core ideas

Evaluation starts from the forecast origin. A valid forecast can use only target history, historical covariates, and future-known covariates available at that origin. Random train-test splits usually leak future information.

Point forecasts are evaluated with metrics such as MAE, RMSE, WAPE, MASE, and bias. Probabilistic forecasts add interval coverage, interval width, quantile loss, or calibration checks. Sparse series, cold-start entities, and high-value partitions should be evaluated separately.

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
