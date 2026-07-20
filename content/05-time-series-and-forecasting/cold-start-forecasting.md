---
title: Cold-Start Forecasting
slug: time-series-and-forecasting/cold-start-forecasting
description: Describes forecasting strategies for new, short-history, unseen, and production-only series.
area: time-series-and-forecasting
topics:
  - cold-start-forecasting
  - forecasting
  - model-selection
level: intermediate
status: review
page_type: concept
aliases:
  - New Series Forecasting
  - Short History Forecasting
prerequisites:
  - forecasting-data-and-covariates.md
related:
  - forecasting-data-and-covariates.md
  - machine-learning-forecasting.md
  - intermittent-demand.md
  - demand-forecasting.md
  - forecast-ensembling.md
  - ../19-domain-applications/demand-prediction-in-logistics.md
historical_context: false
last_reviewed: 2026-07-18
---

# Cold-Start Forecasting

## Summary

Cold-start forecasting covers entities with little or no usable history. Examples include new products, newly instrumented machines, new regions, new categories, and series that were absent from backtesting but appear in production.

Cold starts are not rare edge cases in operational systems. They should be represented explicitly in training, validation, fallback logic, and monitoring.

## Cold-start cases

A **new series with no observations** has metadata and future covariates but no target history. A **short-history series** has fewer observations than the required lag or rolling-window context. A **new category** contains levels not seen during training. A **production-only series** appears in live inference but was absent from backtesting or ensemble fitting.

These cases differ. A product with no sales because it has not launched is not the same as a mature product with zero demand.

## Strategies

| Strategy                 | Assumption                            | When appropriate                  | Main risk                                               |
| ------------------------ | ------------------------------------- | --------------------------------- | ------------------------------------------------------- |
| Drop                     | the series can be ignored             | offline model comparison          | unusable in production if every entity needs a forecast |
| Zero padding             | no history means no prior activity    | genuine pre-launch entities       | treats "not measured" as observed zero demand           |
| Missing-value padding    | absence of history is informative     | when zero and unknown must differ | needs models that consume missing indicators            |
| Partial-history training | variable context length is learnable  | many short series                 | requires masking or flexible architectures              |
| Global-model transfer    | related series share structure        | large panels with metadata        | negative transfer if series are heterogeneous           |
| Metadata analogues       | similar entities behave similarly     | rich static attributes            | wrong analogue class misleads the forecast              |
| Baseline fallback        | a deterministic policy is good enough | last resort for any entity        | too coarse if used where real signal exists             |

**Drop** excludes series lacking sufficient context. This is defensible for offline model comparison but can be unacceptable in production if forecasts are required for every active entity.

**Zero padding** fills missing history with zeros. It assumes no prior activity, which may be appropriate for some launch processes but misleading when the series existed before measurement began.

**Missing-value padding** preserves the distinction between no history and zero demand. Models can use missing indicators to learn how short context differs from true low demand.

**Partial-history training** trains models to work with variable-length context using masks, shorter lag sets, or architectures that tolerate missing context.

**Global-model transfer** uses patterns learned from related series. Static metadata and future-known covariates become especially important when target history is unavailable.

**Metadata-based analogues** infer from similar entities such as category, region, brand, lifecycle stage, capacity class, or historical launch cohort.

**Baseline fallback** uses deterministic policies such as global mean, category mean, seasonal baseline, partition-level best model, or a globally selected model.

## Fallback policy

A fallback policy should be part of the model definition, not an ad hoc production patch. It should specify eligibility rules, priority order, deterministic tie-breaking, output units, clipping behavior, and monitoring counters.

For example, a new retail item might use category-level average demand per active store, multiplied by planned store exposure. A short-history item might use a global gradient-boosted model if enough metadata is available, otherwise a category baseline.

## Evaluation

Cold-start entities should be evaluated as a separate population. A global average can hide severe cold-start errors because mature series dominate the metric. Backtesting can simulate cold starts by hiding early history, holding out recently launched entities, or evaluating series absent from the ensemble-fitting period.

## Practical guidance

- Decide whether missing pre-launch history means unknown, zero, or not applicable.
- Train and evaluate at least one fallback that does not require target history.
- Use static metadata, exposure, and planned covariates for no-history entities.
- Monitor fallback frequency and forecast quality separately from regular forecasts.
- Keep fallback behavior deterministic and auditable.

## Common failure modes

- Padding with zeros and then treating those zeros as observed demand.
- Evaluating only mature series and discovering cold-start failures in production.
- Letting unseen categories map silently to arbitrary encodings.
- Using per-series model selection when a series has too few validation points.
- Hiding fallback usage in logs instead of surfacing it as a metric.

## Connections

Cold starts tie [forecasting data and covariates](forecasting-data-and-covariates.md) to production fallback rules. [Machine learning forecasting](machine-learning-forecasting.md) can borrow strength from related series, while [intermittent demand](intermittent-demand.md) and [demand forecasting](demand-forecasting.md) define common operational cases.

## References

- [Hyndman & Athanasopoulos, FPP3: New product forecasting](https://otexts.com/fpp3/new-products.html)
- [Hyndman & Athanasopoulos, FPP3: Forecasting by analogy](https://otexts.com/fpp3/analogies.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Intermittent Demand](intermittent-demand.md) [Forecast Ensembling →](forecast-ensembling.md)
