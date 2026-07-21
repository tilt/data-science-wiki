---
title: Intermittent Demand
slug: time-series-and-forecasting/intermittent-demand
description: Explains sparse many-zero demand series, Croston-style methods, aggregate-disaggregate approaches, suitable metrics, and cold-start fallbacks.
area: time-series-and-forecasting
topics:
  - intermittent-demand
  - sparse-demand
  - statistical-forecasting
level: foundational
status: complete
page_type: concept
aliases:
  - Sparse Demand Forecasting
  - Slow-Moving Inventory Forecasting
prerequisites:
  - statistical-forecasting.md
related:
  - demand-forecasting.md
  - cold-start-forecasting.md
  - forecast-error-metrics.md
  - statistical-forecasting.md
  - business-cost-aware-forecasting-losses.md
historical_context: false
last_reviewed: 2026-07-20
---

# Intermittent Demand

Intermittent demand series contain many zero observations and occasional positive demand. They are common in spare parts, slow-moving inventory, maintenance events, and low-frequency service requests. Ordinary forecasting methods struggle because the timing of nonzero events and their sizes are both uncertain.

## Why ordinary methods struggle

Moving averages and smooth regression models often predict small positive values in every period. This can look reasonable under squared error but fail operationally if decisions require stock availability for rare bursts. Percentage errors such as MAPE are unstable or undefined when actual demand is zero.

Zeros can mean no demand, no exposure, stockout, missing measurement, or not-yet-launched status. These meanings must be separated before modeling.

## Croston-style methods

Croston's method decomposes intermittent demand into two processes:

- The size of nonzero demand.
- The interval between nonzero demand events.

The forecast is based on estimated nonzero size divided by estimated interval. Bias-adjusted variants modify the original estimator because it can overforecast under some demand processes.

Croston-style methods are useful baselines for slow-moving items, but they usually do not use rich covariates or metadata.

### Worked example

Take a 10-period series with demand in only three periods:

$$
0,\;0,\;4,\;0,\;0,\;6,\;0,\;0,\;0,\;2
$$

The nonzero sizes are $z=\{4,6,2\}$ and the intervals between successive demand events (counting from the series start) are $p=\{3,3,4\}$. Croston smooths each stream separately; using simple means for illustration,

$$
\hat{z}=\frac{4+6+2}{3}=4,\qquad
\hat{p}=\frac{3+3+4}{3}=\frac{10}{3},\qquad
\hat{y}=\frac{\hat{z}}{\hat{p}}=\frac{4}{10/3}=1.2 \text{ per period.}
$$

The per-period rate $1.2$ matches the long-run average ($12$ units over $10$ periods), but the decomposition is the point: Croston represents demand as "about 4 units every 3.3 periods," so it updates correctly when either the typical size or the arrival frequency changes. A moving average would instead predict a small positive value in every period, including the many periods where the true demand is zero. The Syntetos-Boylan variant multiplies by $(1-\alpha/2)$ to remove the known upward bias, giving $0.95\times1.2=1.14$ at smoothing constant $\alpha=0.1$.

## Aggregate-disaggregate methods

Aggregate-disaggregate approaches such as ADIDA aggregate demand to a coarser frequency, forecast the aggregated series, and disaggregate the forecast back to the required frequency. Aggregation reduces sparsity and can make patterns more stable, but disaggregation introduces assumptions about within-period allocation.

## Evaluation

Intermittent demand often requires WAPE, MASE, aggregated errors, range-normalized errors, or business-weighted metrics. Metric denominator behavior must be explicit. Bias should be monitored because systematic overforecasting can inflate inventory, while underforecasting can reduce service levels.

## Practical guidance

- Diagnose whether zeros are true demand zeros, missing observations, no exposure, or stockouts.
- Use seasonal naive, Croston-style, and aggregate-disaggregate baselines.
- Avoid MAPE when zeros are common.
- Evaluate over meaningful aggregation windows as well as point timestamps.
- Use category-level or metadata-based fallback for cold-start sparse items.

## Common failure modes

- Treating all zeros as equivalent.
- Optimizing RMSE and producing small positive forecasts every period.
- Using pointwise percentage metrics with zero actuals.
- Ignoring stockout censoring.
- Evaluating only high-volume items and missing sparse-series behavior.

## Connections

Intermittent demand is a special case of [demand forecasting](demand-forecasting.md) where zeros are structural. It often needs [statistical forecasting](statistical-forecasting.md) methods designed for sparse counts, [cold-start forecasting](cold-start-forecasting.md) fallbacks, and metrics from [forecast-error metrics](forecast-error-metrics.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Time series of counts](https://otexts.com/fpp3/counts.html)
- [Nixtla StatsForecast intermittent-demand model index](https://nixtla.github.io/statsforecast/)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Temporal Reconciliation](temporal-reconciliation.md) [Cold-Start Forecasting →](cold-start-forecasting.md)
