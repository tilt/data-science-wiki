---
title: Quantile Loss
slug: time-series-and-forecasting/quantile-loss
description: Defines pinball loss for quantile forecasting and explains asymmetric error costs, quantile evaluation, and crossing quantiles.
area: time-series-and-forecasting
topics:
  - quantile-loss
  - probabilistic-forecasting
  - loss-functions
level: intermediate
status: draft
page_type: reference
aliases:
  - Pinball Loss
  - Quantile Regression Loss
prerequisites:
  - probabilistic-forecasting.md
related:
  - forecast-error-metrics.md
  - prediction-intervals.md
  - business-cost-aware-forecasting-losses.md
historical_context: false
last_reviewed: 2026-07-11
---

# Quantile Loss

## Summary

Quantile loss, also called pinball loss, trains or evaluates a forecast for a chosen quantile. It is useful when underforecasting and overforecasting have different costs.

For quantile level $\tau \in (0,1)$, observation $y_i$, and quantile forecast $\hat{q}_{\tau,i}$, the loss is:

$$
L_\tau(y_i,\hat{q}_{\tau,i})
=
\max\left(
\tau(y_i-\hat{q}_{\tau,i}),
(\tau-1)(y_i-\hat{q}_{\tau,i})
\right)
$$

Underforecasting is penalized more when $\tau$ is high. Overforecasting is penalized more when $\tau$ is low.

## Interpretation

For $\tau=0.9$, the forecast should be high enough that about 90 percent of observations fall below it. If the model predicts too low and $y_i>\hat{q}_{0.9,i}$, the error receives weight $0.9$. If it predicts too high, the error receives weight $0.1$.

The median forecast minimizes expected absolute error and corresponds to $\tau=0.5$.

## Crossing quantiles

When models estimate several quantiles independently, they can produce invalid ordering such as $\hat{q}_{0.9}<\hat{q}_{0.5}$. This is called quantile crossing. It can be reduced with monotonic constraints, joint models, post-processing, or careful calibration.
