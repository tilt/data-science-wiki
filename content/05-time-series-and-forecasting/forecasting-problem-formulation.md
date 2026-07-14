---
title: Forecasting Problem Formulation
slug: time-series-and-forecasting/forecasting-problem-formulation
description: Defines forecast origins, horizons, data availability, local and global forecasting, and multi-step forecasting strategies.
area: time-series-and-forecasting
topics:
  - forecasting-problem-formulation
  - time-series-forecasting
  - supervised-learning
level: foundational
status: draft
page_type: concept
aliases:
  - Time Series Forecasting Formulation
  - Forecast Horizon
  - Forecast Origin
prerequisites:
  - index.md
related:
  - forecasting-data-and-covariates.md
  - forecasting-system-design.md
  - time-series-fundamentals.md
  - forecast-evaluation.md
  - backtesting.md
historical_context: false
last_reviewed: 2026-07-11
---

# Forecasting Problem Formulation

## Summary

Time series forecasting estimates future values of an ordered quantity from information available at a prediction time. The central difficulty is not only fitting a function, but defining exactly what was known at the forecast origin, what horizon is required, and how predictions will be evaluated.

For target values $y_1,\ldots,y_t$ observed up to time $t$, a generic forecasting problem can be written as:

$$
\hat{y}_{t+h}
=
f(y_{1:t}, x_{1:t}, x_{t+1:t+h})
$$

where $\hat{y}_{t+h}$ is the forecast for horizon $h$, $y_{1:t}$ is the observed target history, $x_{1:t}$ contains historical covariates, and $x_{t+1:t+h}$ contains covariates legitimately known for future timestamps. This notation makes feature availability part of the problem statement, which is essential for avoiding leakage.

## Core definitions

The **forecast origin** is the latest timestamp whose target value is available when the prediction is made. The **prediction horizon** is the distance from the forecast origin to the timestamp being forecast. A one-day-ahead forecast from 2026-01-07 predicts 2026-01-08; a seven-day-ahead forecast predicts 2026-01-14.

The **sampling frequency** defines the time step of the series, such as hourly website traffic, daily retail demand, weekly spare-parts usage, monthly revenue, or quarterly capacity requirements. The same calendar span can imply very different modeling problems depending on frequency.

Forecasting can be **univariate** when only one target history is used, or **multivariate** when several time-varying signals are modeled together. It can also be **single-series** when one model is fit for one entity, or **global** when one model is shared across many related series such as stores, products, regions, or machines.

## Forecast types

A **point forecast** predicts a single value, such as expected demand tomorrow. A **probabilistic forecast** estimates a distribution, quantiles, or prediction interval. Point forecasts are usually easier to use operationally, but they hide uncertainty that matters for inventory, staffing, and risk-sensitive planning.

A **one-step forecast** predicts one future time step. A **multi-step forecast** predicts several horizons. Multi-step forecasting is harder because errors, uncertainty, and feature availability differ by horizon.

## Multi-step strategies

In a **direct** strategy, a separate model is trained for each horizon:

$$
\hat{y}_{t+h}=f_h(\mathbf{x}_t)
$$

where $\mathbf{x}_t$ is the feature vector available at origin $t$. Direct models avoid feeding predictions back into later predictions, but can require many models.

In a **recursive** strategy, a one-step model is repeatedly applied:

$$
\hat{y}_{t+2}=f(\hat{y}_{t+1}, y_t, y_{t-1}, \ldots)
$$

Recursive models are compact, but early errors can accumulate across the horizon.

In a **multi-output** strategy, one model predicts a vector:

$$
(\hat{y}_{t+1},\ldots,\hat{y}_{t+H}) = f(\mathbf{x}_t)
$$

This can learn dependencies across horizons, but may be less flexible when the horizon length changes.

In a **multi-horizon** strategy, the horizon is included as an input feature. A shared model learns:

$$
\hat{y}_{t+h}=f(\mathbf{x}_t, h)
$$

This is common in global machine learning and neural forecasting because it shares information across horizons while allowing horizon-specific behavior.

## Local and global models

A **local model** is fit separately for each series. Local models are simple to reason about and can work well for long, stable histories, but they cannot borrow strength from related series.

A **global model** is trained on many series at once. It can learn cross-series effects from metadata and repeated seasonal patterns, and it is often more robust for short histories. Global models need careful validation because strong aggregate performance can hide weak performance for important subgroups.

## Training windows

An **expanding window** trains on all observations up to each forecast origin. It uses as much history as possible and is appropriate when old data remains relevant.

A **sliding window** trains on only the most recent observations. It can adapt to drift or regime changes, but it discards potentially useful historical seasonal cycles.

Both choices should be evaluated under [backtesting](backtesting.md), not selected by convenience alone.

## Why random splits are invalid

Random train-test splits usually violate the chronology of a forecasting problem. If February observations are used to train a model that is evaluated on January observations, the model has learned from the future. Leakage can also occur indirectly through target encodings, rolling statistics, scalers, imputers, and feature selection performed before the split.

Time-respecting splits simulate production: train on what would have been known, forecast the future, and evaluate after outcomes are observed.

## Practical guidance

- Define the forecast origin, horizon, frequency, and prediction population before choosing a model.
- Separate historical covariates from future-known covariates in the data contract.
- Compare direct, recursive, multi-output, and multi-horizon strategies when long horizons matter.
- Prefer global models when many related short series share structure, but inspect subgroup performance.
- Use expanding windows for stable processes and sliding windows when old observations become misleading.
- Treat random splits as invalid unless the task is not actually temporal.

## Common failure modes

- Training on observations that occur after the forecast origin.
- Calling a variable "future-known" when it is only known after the event.
- Comparing models that forecast different horizons or use different cutoffs.
- Optimizing one global metric while ignoring poor performance for sparse or high-value series.
- Using a recursive strategy without measuring horizon-specific error accumulation.

## Connections

Problem formulation defines the target, horizon, cadence, and availability contract for [forecasting data and covariates](forecasting-data-and-covariates.md). Those choices constrain [forecasting system design](forecasting-system-design.md), [backtesting](backtesting.md), and [forecast evaluation](forecast-evaluation.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Determining what to forecast](https://otexts.com/fpp3/intro.html)
- [sktime forecasting tutorial](https://www.sktime.net/docs/examples/forecasting/)
