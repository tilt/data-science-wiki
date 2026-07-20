---
title: Demand Forecasting
slug: time-series-and-forecasting/demand-forecasting
description: Forecasting customer demand for inventory, logistics, staffing, and capacity decisions.
area: time-series-and-forecasting
topics:
  - demand-forecasting
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - intermittent-demand.md
  - cold-start-forecasting.md
  - business-cost-aware-forecasting-losses.md
  - hierarchical-forecasting.md
  - forecasting-system-design.md
  - ../19-domain-applications/demand-prediction-in-logistics.md
historical_context: false
last_reviewed: 2026-07-18
---

# Demand Forecasting

Demand forecasting predicts future customer need so an organization can plan inventory, replenishment, staffing, logistics, or capacity. The hard part is often not the model family but the target definition. Sales are not always demand: stockouts, substitutions, throttling, store closures, and backorders can censor the demand signal.

A useful demand forecast specifies the decision unit: item-store-day, SKU-region-week, warehouse-lane-hour, or another grain. It also specifies the horizon and update cadence. A same-day staffing forecast needs recent observations and weather; a 12-week inventory forecast needs promotions, lead times, launch state, and replenishment constraints.

Demand data usually mixes mature, seasonal, intermittent, and cold-start series, and each segment needs a different method and a different metric guardrail.

| Series segment             | Typical method                                                                                                | Metric caution                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Mature, high-volume        | [statistical forecasting](statistical-forecasting.md), ML lag models, global neural models                    | aggregate WAPE can hide promo and stockout periods |
| Strongly seasonal          | seasonal models, calendar covariates                                                                          | validate per season, not just overall              |
| Intermittent / spare parts | [intermittent demand](intermittent-demand.md) methods (Croston-style)                                         | avoid MAPE; zeros make it unstable                 |
| New product / cold-start   | [cold-start forecasting](cold-start-forecasting.md): analogs, hierarchy priors, metadata-driven global models | evaluate cold starts as a separate population      |

Because sales censor demand and costs are asymmetric, the metric column matters as much as the method column: a forecast that looks accurate in aggregate can still fail on exactly the segment that drives operational cost.

Cost asymmetry is central. Under-forecasting can cause lost sales or service-level penalties; over-forecasting can cause waste, holding cost, or markdowns. That makes [business-cost-aware forecasting losses](business-cost-aware-forecasting-losses.md), quantiles, and service-level targets more relevant than a single point metric. Large catalogs also require [hierarchical forecasting](hierarchical-forecasting.md), because item-level forecasts must be coherent with category, warehouse, and total demand plans.

Good demand systems evaluate by segment: stockout periods, promotion periods, launch age, item velocity, region, and horizon. Aggregate WAPE can look acceptable while the system fails exactly where operational cost is highest.

## Connections

Demand forecasting combines [forecasting data and covariates](forecasting-data-and-covariates.md), [forecasting-system-design](forecasting-system-design.md), and domain constraints. The logistics application is expanded in [demand prediction in logistics](../19-domain-applications/demand-prediction-in-logistics.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Determining what to forecast](https://otexts.com/fpp3/intro.html)
- [Hyndman & Athanasopoulos, FPP3: Forecasting hierarchical and grouped time series](https://otexts.com/fpp3/hierarchical.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Forecast Monitoring](forecast-monitoring.md) [Energy Consumption Forecasting →](energy-consumption-forecasting.md)
