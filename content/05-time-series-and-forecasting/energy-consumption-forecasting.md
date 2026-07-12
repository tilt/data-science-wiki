---
title: Energy Consumption Forecasting
slug: time-series-and-forecasting/energy-consumption-forecasting
description: Forecasting electricity, gas, or heat load from calendar, weather, and operational drivers.
area: time-series-and-forecasting
topics:
  - energy-consumption-forecasting
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - demand-forecasting.md
  - forecasting-data-and-covariates.md
  - trend-seasonality-cycles-noise.md
  - sarima.md
  - transformer-based-forecasting.md
  - ../18-domain-applications/energy-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---
# Energy Consumption Forecasting

Energy consumption forecasting predicts future electricity, gas, heat, or cooling load. It is a demand-forecasting problem with unusually strong calendar and weather structure. Hour of day, weekday, holidays, temperature, humidity, daylight, occupancy, tariffs, and operational schedules can all change the load curve.

The target grain should match the decision. Grid operations may need sub-hourly short-term load. Building controls may need the next 24 hours. Procurement or capacity planning may need weekly or monthly aggregates. Each horizon changes which covariates are known: calendar features are known far ahead, weather observations are historical, and weather forecasts have their own uncertainty.

Energy series often have multiple seasonalities: intraday shape, weekday/weekend effects, and annual weather cycles. [SARIMA](sarima.md) can be a useful baseline when a single seasonal period dominates, but real load models often use regression or machine-learning features for temperature response, holidays, and nonlinear interactions. Neural models such as [transformer-based forecasting](transformer-based-forecasting.md) are most defensible when many meters, buildings, or regions provide enough related histories.

Evaluation should be segmented. Average error can hide failures during heat waves, cold snaps, holidays, outages, tariff changes, and occupancy shifts. For operational use, forecasts should be checked by horizon, temperature band, calendar type, and peak-load periods, because peak misses can matter more than ordinary-hour misses.

## Connections

Energy forecasting is a high-seasonality case of [demand forecasting](demand-forecasting.md). Weather and calendar fields belong in [forecasting data and covariates](forecasting-data-and-covariates.md), while repeated structure connects to [trend-seasonality-cycles-noise](trend-seasonality-cycles-noise.md) and the applied page on [energy forecasting](../18-domain-applications/energy-forecasting.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Forecasting electricity demand](https://otexts.com/fpp3/forecasting.html)
- [GEFCom2012 load forecasting paper](https://www.sciencedirect.com/science/article/pii/S0169207013000745)
