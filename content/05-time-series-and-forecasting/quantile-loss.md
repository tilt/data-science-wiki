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
  - probabilistic-forecasting.md
  - prediction-intervals.md
  - forecast-calibration.md
  - business-cost-aware-forecasting-losses.md
  - conformal-prediction-for-forecasting.md
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

## Executed example

```python
import numpy as np

y = np.array([2.0, 5.0, 8.0, 10.0])
q50 = np.array([3.0, 4.0, 7.0, 12.0])
q90 = np.array([4.0, 6.0, 9.0, 13.0])

def pinball(y, q, tau):
    e = y - q
    return np.maximum(tau * e, (tau - 1) * e)

print("mean_pinball_tau_0.5", round(float(pinball(y, q50, 0.5).mean()), 3))
print("mean_pinball_tau_0.9", round(float(pinball(y, q90, 0.9).mean()), 3))
print("losses_tau_0.9", np.round(pinball(y, q90, 0.9), 3).tolist())
```

Observed output:

```text
mean_pinball_tau_0.5 0.625
mean_pinball_tau_0.9 0.175
losses_tau_0.9 [0.2, 0.1, 0.1, 0.3]
```

At $\tau=0.9$, underpredicting is penalized nine times as much as overpredicting by the same amount, which is why high quantiles are useful for service-level decisions.

## Connections

Quantile loss trains and evaluates conditional quantiles for [probabilistic forecasting](probabilistic-forecasting.md). It underlies [prediction intervals](prediction-intervals.md), [business-cost-aware forecasting losses](business-cost-aware-forecasting-losses.md), and conformalized interval methods in [conformal prediction for forecasting](conformal-prediction-for-forecasting.md).

## References

- [Romano, Patterson, and Candes, Conformalized Quantile Regression](https://arxiv.org/abs/1905.03222)
- [Hyndman & Athanasopoulos, FPP3: Evaluating distributional forecast accuracy](https://otexts.com/fpp3/prediction-intervals.html)
