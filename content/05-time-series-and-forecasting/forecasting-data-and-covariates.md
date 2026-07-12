---
title: Forecasting Data and Covariates
slug: time-series-and-forecasting/forecasting-data-and-covariates
description: Explains target series, identifiers, timestamps, static metadata, historical covariates, future-known covariates, masks, and exposure variables.
area: time-series-and-forecasting
topics:
  - forecasting-data
  - covariates
  - exposure
level: foundational
status: draft
page_type: concept
aliases:
  - Time Series Covariates
  - Future Known Covariates
  - Exposure Variables
prerequisites:
  - forecasting-problem-formulation.md
related:
  - forecasting-problem-formulation.md
  - feature-engineering-for-forecasting.md
  - machine-learning-forecasting.md
  - forecasting-system-design.md
  - cold-start-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---
# Forecasting Data and Covariates

## Summary

A forecasting dataset should make the prediction unit, timestamp, target, and feature availability explicit. A generic long-format table contains an entity identifier, a timestamp, a target value, time-varying covariates, static metadata, and optional masks indicating which entities should be forecast.

| series_id | timestamp  | target | price | promotion | region | active_mask |
| --------- | ---------- | -----: | ----: | --------: | ------ | ----------: |
| A         | 2026-01-01 |    120 |  9.99 |         0 | north  |           1 |
| A         | 2026-01-02 |    131 |  8.99 |         1 | north  |           1 |

The table can represent retail demand, energy usage, website traffic, spare-parts demand, or capacity consumption. The important design question is whether each feature would have been available at prediction time.

## Data model

The **target time series** is the value to predict, such as demand, load, clicks, failures, or service requests. The **item or entity identifier** distinguishes products, stores, regions, machines, or accounts. The **timestamp** defines the time index and must be interpretable at a known frequency.

**Static metadata** describes a series and does not change at each timestamp, such as product category, region, capacity class, launch cohort, or customer segment. Global models can use static metadata to share patterns across related series.

**Historical covariates** are observed only up to the forecast origin. **Future-known covariates** are known for the forecast horizon before the prediction is made. **Global covariates** apply to many series, such as holidays or macro indicators. **Per-series covariates** vary by entity, such as local price, store inventory, or machine operating hours.

Event indicators, promotion features, and hierarchical metadata often carry strong signal. A mask can define which entities are eligible for forecasting, which should be excluded from training, or which observations are structurally unavailable.

## Historical covariates

Historical covariates are features known only through the forecast origin. Examples include observed weather, realized prices, historical stock availability, measured traffic, sensor readings, and past machine downtime.

Historical covariates are useful because they explain recent target behavior. They must be lagged or otherwise restricted so that the value at the predicted timestamp is not used unless it would truly be known.

## Future-known covariates

Future-known covariates are known for future timestamps when the forecast is produced. Examples include calendar features, planned promotions, scheduled prices, holidays, contracted capacity, school breaks, and planned maintenance windows.

The word "planned" matters. A scheduled price can be future-known if prices are fixed before the forecast run. A realized discount, final stock level, or actual weather measurement is not future-known unless the production process has access to a separate forecast of that variable.

Leakage occurs when a feature is treated as future-known during training but would not be available in production. This often produces excellent backtest scores and poor live performance.

## Regular and irregular time series

A **regular** time series has observations at a consistent frequency. Common frequencies include daily, weekly, monthly, and quarterly data. Regularity simplifies lag generation, seasonal baselines, and rolling windows.

An **irregular** time series has missing or uneven timestamps. The modeler must decide whether missing periods mean zero activity, missing measurement, closed operations, or an entity that did not yet exist. These cases require different imputation and masking rules.

## Exposure and opportunity variables

Exposure is the amount of opportunity for an event to occur. Examples include the number of stores carrying a product, machine uptime, active users, website impressions, population at risk, available inventory, and service coverage.

Forecasting the total outcome differs from forecasting the outcome per unit of exposure. If $e_t$ is exposure and $y_t$ is the observed outcome, the rate is:

$$
\text{rate}_t = \frac{y_t}{e_t}
$$

If a model forecasts the rate $\hat{r}_t$, the total forecast is:

$$
\hat{y}_t = \hat{r}_t e_t
$$

Exposure can be used as a covariate, as a sample weight, as part of a rate model, inside a custom loss function, or as a post-processing multiplier. Each choice encodes a different assumption about how opportunity scales the target.

Low exposure creates unstable rates, and zero exposure makes division undefined. Rate modeling should include explicit rules for $e_t=0$, small denominators, clipping, and evaluation in the original outcome units.

## Practical guidance

- Maintain a data dictionary that labels each variable as target, static metadata, historical covariate, future-known covariate, exposure, or mask.
- Build training tables from each forecast origin rather than from the full final dataset.
- Validate timestamp frequency before generating lags and seasonal features.
- Use static metadata to help global models transfer information to short-history or cold-start series.
- Evaluate exposure-aware models on total outcomes and rates when both matter operationally.

## Common failure modes

- Using actual future weather, realized stock, or final prices as if they were known in advance.
- Treating missing timestamps as zero demand without checking whether the entity was active.
- Dividing by very small exposure and creating extreme rate targets.
- Mixing global covariates with region-specific calendars incorrectly.
- Training on entities that should be excluded by the forecast mask.

## Connections

Data design starts from [forecasting problem formulation](forecasting-problem-formulation.md) and feeds [feature engineering for forecasting](feature-engineering-for-forecasting.md). Future-known covariates are central to [machine learning forecasting](machine-learning-forecasting.md), [cold-start forecasting](cold-start-forecasting.md), and [forecasting system design](forecasting-system-design.md).

## References

- [Hyndman & Athanasopoulos, FPP3: Forecasting with regression](https://otexts.com/fpp3/forecasting.html)
- [Hyndman & Athanasopoulos, FPP3: Dealing with outliers and missing values](https://otexts.com/fpp3/missing-outliers.html)
