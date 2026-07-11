---
title: Hierarchical Reconciliation
slug: time-series-and-forecasting/hierarchical-reconciliation
description: Explains coherent forecast reconciliation across aggregation levels, summing matrices, bottom-up, top-down, middle-out, and MinT-style adjustments.
area: time-series-and-forecasting
topics:
  - hierarchical-reconciliation
  - hierarchical-forecasting
  - coherent-forecasts
level: advanced
status: draft
page_type: algorithm
aliases:
  - Forecast Reconciliation
  - Coherent Forecasting
prerequisites:
  - hierarchical-forecasting.md
related:
  - temporal-reconciliation.md
  - forecast-error-metrics.md
  - forecasting-system-design.md
historical_context: false
last_reviewed: 2026-07-11
---

# Hierarchical Reconciliation

## Summary

Hierarchical reconciliation adjusts forecasts so they satisfy aggregation constraints. It is needed when forecasts are produced independently at several levels, such as item, category, region, and total.

Let $\mathbf{b}_t$ be bottom-level series at time $t$ and $\mathbf{y}_t$ be all series in the hierarchy. A summing matrix $\mathbf{S}$ maps bottom-level values to all levels:

$$
\mathbf{y}_t = \mathbf{S}\mathbf{b}_t
$$

A reconciled forecast should also satisfy:

$$
\tilde{\mathbf{y}}_{t+h} = \mathbf{S}\tilde{\mathbf{b}}_{t+h}
$$

where tildes denote reconciled forecasts.

## Basic approaches

Bottom-up reconciliation uses bottom-level forecasts and sums them upward. It is simple and coherent, but noisy when bottom-level data is sparse.

Top-down reconciliation forecasts the top level and allocates downward using proportions. It is stable at the total level but may lose local signal.

Middle-out reconciliation starts at an intermediate level, sums upward, and allocates downward. It is useful when that level has the most reliable forecasts.

Optimal-combination methods start from base forecasts at all levels and adjust them jointly. MinT-style methods use an estimate of forecast error covariance to reduce reconciliation error, subject to coherence constraints.

## Step-by-step example

Suppose base forecasts are:

| level | forecast |
| ----- | -------: |
| total |      110 |
| A     |       40 |
| B     |       50 |

The bottom-level forecasts imply a total of 90, not 110. A bottom-up reconciled total would be 90. A top-down reconciliation could preserve the total 110 and allocate it across A and B using historical shares. An optimal-combination method would adjust all three forecasts based on estimated reliability.

## Evaluation

Evaluate base and reconciled forecasts at every planning level. Reconciliation can improve aggregate coherence while worsening bottom-level accuracy. The acceptable tradeoff depends on the decision: inventory placement may prioritize bottom-level accuracy, while financial planning may prioritize aggregate consistency.

## Practical guidance

- Reconcile only across aggregation relationships that are operationally meaningful.
- Estimate reconciliation parameters using validation data, not final evaluation data.
- Compare bottom-up, top-down, and optimal-combination baselines.
- Report both coherence and accuracy.
- Treat missing bottom-level series and cold starts explicitly before reconciliation.

## Common failure modes

- Reconciliation over an incorrect hierarchy.
- Using noisy historical proportions for top-down allocation.
- Ignoring covariance estimation error in small backtests.
- Reporting only total-level gains.
- Reconciling forecasts produced from inconsistent training cutoffs.
