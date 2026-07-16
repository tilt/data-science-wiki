---
title: Hierarchical Forecasting
slug: time-series-and-forecasting/hierarchical-forecasting
description: Explains hierarchical forecasting, aggregation constraints, bottom-up and top-down approaches, and links to forecast reconciliation.
area: time-series-and-forecasting
topics:
  - hierarchical-forecasting
  - forecast-reconciliation
level: advanced
status: draft
page_type: concept
aliases:
  - Grouped Forecasting
  - Hierarchical Time Series
prerequisites:
  - forecasting-problem-formulation.md
related:
  - hierarchical-reconciliation.md
  - temporal-reconciliation.md
  - demand-forecasting.md
  - forecast-error-metrics.md
  - forecasting-system-design.md
historical_context: false
last_reviewed: 2026-07-11
---

# Hierarchical Forecasting

## Summary

Hierarchical forecasting predicts related series at multiple aggregation levels. Examples include SKU-store, SKU-region, category-region, total category, and total business demand. A hierarchy is coherent when lower-level forecasts add up to higher-level forecasts.

If product forecasts are $\hat{y}_{A,t}$ and $\hat{y}_{B,t}$, the category forecast should satisfy:

$$
\hat{y}_{\text{category},t}
=
\hat{y}_{A,t}
+
\hat{y}_{B,t}
$$

Independent models do not guarantee this constraint.

## Hierarchies and grouped structures

A strict hierarchy has one path from each bottom-level series to the total. A grouped structure has overlapping dimensions, such as product, region, and channel. Grouped structures are common in retail and operations because planners need totals by several views at once.

The hierarchy should represent real decision levels. A mathematically valid aggregation that no team uses for planning is rarely worth optimizing.

## Forecasting approaches

**Bottom-up** forecasts the most granular series and sums upward. It preserves low-level detail but can be noisy when bottom-level data is sparse.

**Top-down** forecasts the total and distributes it downward using historical proportions or modelled shares. It is stable at the aggregate level but can miss local variation.

**Middle-out** forecasts an intermediate level and allocates both up and down. It can be useful when the middle level is the most reliable planning unit.

**Reconciliation** starts from base forecasts at multiple levels and adjusts them to satisfy aggregation constraints. See [hierarchical reconciliation](hierarchical-reconciliation.md).

## Example

Suppose three store forecasts for a product are 20, 35, and 45 units. The region total implied by bottom-up aggregation is 100 units. If an independently trained regional model forecasts 112 units, the forecast set is incoherent. Reconciliation changes one or more forecasts so the store forecasts and regional forecast agree.

## Evaluation

Evaluate at every level that matters: bottom-level items, categories, regions, and total. A model can improve SKU-level MAE while making aggregate planning worse. Conversely, a model can look excellent at total level while hiding large offsetting errors below it.

## Practical guidance

- Define the hierarchy from planning and accountability needs, not only data availability.
- Report metrics at multiple aggregation levels.
- Check whether forecast users require strict coherence or can tolerate small inconsistencies.
- Use bottom-up forecasts when granular series are reliable.
- Use reconciliation when forecasts are produced at multiple levels.

## Common failure modes

- Optimizing only bottom-level accuracy when aggregate decisions matter.
- Producing independent forecasts that cannot be reconciled in planning systems.
- Using unstable historical proportions for top-down allocation.
- Ignoring sparse or cold-start bottom-level series.
- Comparing reconciled and unreconciled forecasts on different folds.

## Connections

Hierarchical forecasting defines the aggregation structure; [hierarchical reconciliation](hierarchical-reconciliation.md) makes forecasts coherent across it. [Temporal reconciliation](temporal-reconciliation.md) applies a related idea across time buckets, and [demand forecasting](demand-forecasting.md) is a common use case.

## References

- [Hyndman & Athanasopoulos, FPP3: Hierarchical and grouped time series](https://otexts.com/fpp3/hierarchical.html)
- [Nixtla HierarchicalForecast documentation](https://nixtlaverse.nixtla.io/hierarchicalforecast/index.html)

> **Section — [Time-Series Forecasting](index.md):** ← [Conformal Prediction for Forecasting](conformal-prediction-for-forecasting.md) · [Hierarchical Reconciliation](hierarchical-reconciliation.md) →
