---
title: Forecast Monitoring
slug: time-series-and-forecasting/forecast-monitoring
description: Describes production monitoring for forecast quality, data freshness, bias, calibration, drift, fallbacks, and operational alerting.
area: time-series-and-forecasting
topics:
  - forecast-monitoring
  - mlops
  - model-monitoring
level: advanced
status: draft
page_type: system-design
aliases:
  - Forecast Model Monitoring
  - Forecast Observability
prerequisites:
  - forecasting-system-design.md
related:
  - concept-drift-in-forecasting.md
  - online-learning-for-forecasting.md
  - forecast-error-metrics.md
  - forecast-calibration.md
  - ../14-ml-engineering-and-mlops/monitoring.md
historical_context: false
last_reviewed: 2026-07-11
---

# Forecast Monitoring

## Summary

Forecast monitoring checks whether a forecasting system remains healthy after deployment. It covers service reliability, data freshness, feature availability, forecast distributions, realized error, bias, calibration, drift, fallback usage, and operational impact.

Forecasts are unusual because outcomes arrive later. Monitoring must preserve the forecast origin so each prediction can be joined to the eventual realized target.

## What to monitor

Data monitors include missing timestamps, duplicate keys, freshness, schema changes, inactive entities, exposure shifts, and future-known covariate availability.

Forecast monitors include prediction counts, missing predictions, distribution shifts, negative or clipped forecasts, fallback rates, ensemble weight usage, and horizon coverage.

Outcome monitors include MAE, WAPE, bias, interval coverage, quantile calibration, error by horizon, error by entity group, and business-specific service metrics.

## Delayed outcome join

A practical monitoring table should contain:

| forecast_origin | target_timestamp | series_id | forecast | model_version |
| --------------- | ---------------- | --------- | -------: | ------------- |
| 2026-01-01      | 2026-01-08       | A         |      120 | v12           |

When the actual value arrives, it can be joined by `series_id` and `target_timestamp`, while retaining the original forecast origin and model version.

## Alert design

Alerts should be actionable. A missing future holiday calendar may require immediate intervention. A small global MAE increase may not. Thresholds should account for seasonality, traffic volume, label delay, and known events.

Dashboards can be broad. Alerts should be reserved for conditions with a clear owner and runbook.

## Practical guidance

- Monitor feature availability before forecast generation and realized error after labels arrive.
- Track bias separately from absolute error.
- Segment monitoring by horizon, entity group, lifecycle stage, and volume.
- Include fallback frequency and missing-prediction counts as first-class metrics.
- Store forecast artifacts long enough to evaluate delayed outcomes.

## Common failure modes

- Monitoring only infrastructure and ignoring forecast quality.
- Joining actuals to forecasts without preserving forecast origin.
- Alerting on noisy low-volume slices without aggregation rules.
- Missing calibration degradation because only point metrics are tracked.
- Treating fallback predictions as normal model predictions in dashboards.

## Connections

Monitoring turns [forecast evaluation](forecast-evaluation.md) into an ongoing process. Track [forecast error metrics](forecast-error-metrics.md), [forecast calibration](forecast-calibration.md), and [concept drift in forecasting](concept-drift-in-forecasting.md), then decide whether [online learning for forecasting](online-learning-for-forecasting.md) or retraining is needed.

## References

- [Hyndman & Athanasopoulos, FPP3: Residual diagnostics](https://otexts.com/fpp3/toolbox.html)
- [Gibbs and Candes, Adaptive Conformal Inference Under Distribution Shift](https://arxiv.org/abs/2106.00170)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Online Learning for Forecasting](online-learning-for-forecasting.md) [Demand Forecasting →](demand-forecasting.md)
