---
title: Temporal Reconciliation
slug: time-series-and-forecasting/temporal-reconciliation
description: Explains coherent forecasts across time aggregation levels such as daily, weekly, monthly, and quarterly forecasts.
area: time-series-and-forecasting
topics:
  - temporal-reconciliation
  - forecast-reconciliation
  - time-aggregation
level: advanced
status: review
page_type: algorithm
aliases:
  - Time Aggregation Reconciliation
  - Cross-Temporal Forecasting
prerequisites:
  - hierarchical-forecasting.md
related:
  - hierarchical-forecasting.md
  - hierarchical-reconciliation.md
  - forecast-error-metrics.md
  - backtesting.md
  - demand-forecasting.md
historical_context: false
last_reviewed: 2026-07-17
---

# Temporal Reconciliation

## Summary

Temporal reconciliation makes forecasts coherent across time aggregation levels. For example, seven daily forecasts should sum to the corresponding weekly forecast, and monthly forecasts should be consistent with quarterly forecasts.

If $\hat{y}_{d,t}$ are daily forecasts in a week and $\hat{y}_{w}$ is the weekly forecast, coherence requires:

$$
\hat{y}_{w}
=
\sum_{t=1}^{7}
\hat{y}_{d,t}
$$

Independent daily and weekly models will not generally satisfy this.

## Why it matters

Different decisions use different time scales. Staffing may use daily forecasts, procurement may use weekly forecasts, and financial planning may use monthly forecasts. If the numbers disagree, teams must manually choose which forecast to trust.

Temporal reconciliation is especially useful when high-frequency data is noisy but lower-frequency totals are stable.

## Approaches

A high-frequency bottom-up approach forecasts the most granular frequency and aggregates upward. A low-frequency top-down approach forecasts the aggregate and allocates downward using historical or modelled profiles. Combination approaches use forecasts from multiple temporal resolutions and adjust them to be coherent.

The same caution as hierarchical reconciliation applies: coherence is not the same as accuracy. A coherent set can still be wrong.

## Example

A model forecasts daily demand for a week as 10, 12, 9, 11, 15, 18, and 20 units. The daily total is 95. A separate weekly model forecasts 105. Temporal reconciliation adjusts the daily values, weekly value, or both so the weekly total and daily sum agree.

## Practical guidance

- Use temporal reconciliation when different planning processes consume different frequencies.
- Evaluate accuracy at every consumed frequency.
- Check calendar alignment before aggregating weeks, months, and quarters.
- Avoid reconciling across periods with incompatible business definitions.
- Keep the evaluation horizon consistent after aggregation.

## Common failure modes

- Mixing calendar weeks with business weeks.
- Comparing reconciled daily forecasts with unreconciled weekly forecasts.
- Assuming high-frequency noise disappears without checking aggregate bias.
- Allocating monthly forecasts to days using stale seasonal profiles.
- Ignoring holidays and variable month lengths.

## Connections

Temporal reconciliation is the time-aggregation analogue of [hierarchical reconciliation](hierarchical-reconciliation.md). It is useful in [demand forecasting](demand-forecasting.md) when daily, weekly, and monthly decisions coexist, and it must be evaluated with [forecast error metrics](forecast-error-metrics.md) at every consumed frequency.

## References

- [Hyndman & Athanasopoulos, FPP3: Forecast reconciliation](https://otexts.com/fpp3/reconciliation.html)
- [Nixtla HierarchicalForecast documentation](https://nixtlaverse.nixtla.io/hierarchicalforecast/index.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Hierarchical Reconciliation](hierarchical-reconciliation.md) [Intermittent Demand →](intermittent-demand.md)
