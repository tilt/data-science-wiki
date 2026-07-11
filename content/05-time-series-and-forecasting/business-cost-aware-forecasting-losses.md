---
title: Business-Cost-Aware Forecasting Losses
slug: time-series-and-forecasting/business-cost-aware-forecasting-losses
description: Explains cost-aware forecast objectives, asymmetric underforecasting and overforecasting costs, service levels, newsvendor intuition, and evaluation cautions.
area: time-series-and-forecasting
topics:
  - business-cost-aware-loss
  - forecast-evaluation
  - decision-making
level: advanced
status: draft
page_type: concept
aliases:
  - Cost-Aware Forecasting
  - Asymmetric Forecast Loss
  - Business-Weighted Forecasting
prerequisites:
  - forecast-error-metrics.md
related:
  - quantile-loss.md
  - probabilistic-forecasting.md
  - forecast-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Business-Cost-Aware Forecasting Losses

## Summary

Business-cost-aware losses evaluate forecasts by the decision cost they create. MAE and RMSE treat errors symmetrically, but many forecasting decisions do not. Underforecasting demand may cause stockouts; overforecasting may create holding cost or waste.

## Asymmetric cost

A simple asymmetric loss is:

$$
L(y,\hat{y})
=
c_u \max(y-\hat{y},0)
+
c_o \max(\hat{y}-y,0)
$$

where $c_u$ is the unit cost of underforecasting and $c_o$ is the unit cost of overforecasting. If $c_u>c_o$, the loss favors higher forecasts.

This connects to quantile forecasting. The optimal quantile level for a simple newsvendor-style decision is:

$$
\tau = \frac{c_u}{c_u+c_o}
$$

where $\tau$ is the target service quantile.

## Step-by-step example

Suppose underforecasting one unit costs 4 and overforecasting one unit costs 1. Then:

$$
\tau = \frac{4}{4+1}=0.8
$$

A forecast near the 80th percentile is more aligned with the decision than the median, because shortages are four times as costly as excess.

## Business-weighted metrics

Weights can emphasize high-value items, critical regions, peak periods, or service-level-sensitive horizons. A weighted MAE can be written as:

$$
\text{weighted MAE}
=
\frac{\sum_i w_i |y_i-\hat{y}_i|}{\sum_i w_i}
$$

where $w_i$ is a nonnegative business weight. Weights should be documented because they define which errors matter most.

## Practical guidance

- Start from the operational decision, then choose the loss or quantile.
- Document underforecasting and overforecasting cost assumptions.
- Evaluate standard accuracy metrics alongside cost-aware metrics.
- Use cost-aware metrics for model selection only when the cost model is credible.
- Revisit costs when business constraints, margins, or service targets change.

## Common failure modes

- Encoding business priorities with undocumented weights.
- Optimizing a cost metric that no operational decision actually uses.
- Treating cost parameters as precise when they are rough estimates.
- Ignoring bias after switching to an asymmetric objective.
- Comparing cost-aware scores across datasets with different weight definitions.
