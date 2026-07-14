---
title: Demand Prediction in Logistics
slug: domain-applications/demand-prediction-in-logistics
description: "Forecasting SKU, lane, or depot demand so logistics capacity can be positioned before orders arrive."
area: domain-applications
topics:
  - application
  - demand-prediction-in-logistics
level: intermediate
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../05-time-series-and-forecasting/demand-forecasting.md
  - ../05-time-series-and-forecasting/hierarchical-forecasting.md
  - ../05-time-series-and-forecasting/intermittent-demand.md
  - ../05-time-series-and-forecasting/rolling-origin-validation.md
  - ../05-time-series-and-forecasting/business-cost-aware-forecasting-losses.md
  - ../14-ml-engineering-and-mlops/data-drift.md
historical_context: false
last_reviewed: 2026-07-11
---
# Demand Prediction in Logistics

Demand prediction in logistics forecasts future units, parcels, pallets, or trips so inventory, labor, vehicles, and warehouse slots are available at the right place and time. Inputs are usually historical shipments, orders, calendar features, price and promotion signals, stockouts, lead times, weather, and lane constraints. The target must be tied to a decision: item-store units for replenishment, depot volume for labor scheduling, or origin-destination demand for vehicle routing.

## Framing

This is a domain case of [demand forecasting](../05-time-series-and-forecasting/demand-forecasting.md), but the logistics version is strongly constrained by aggregation. A forecast may need to add up from SKU-store to warehouse, region, and network total, so [hierarchical forecasting](../05-time-series-and-forecasting/hierarchical-forecasting.md) and reconciliation matter. Slow-moving spare parts need [intermittent demand](../05-time-series-and-forecasting/intermittent-demand.md) metrics because many days are zero. Evaluation should use [rolling-origin validation](../05-time-series-and-forecasting/rolling-origin-validation.md), report WAPE or service-level loss by horizon, and slice errors during promotions, holidays, and stockout periods.

The M5 competition is a useful public benchmark because it used Walmart hierarchical unit sales: the open-access M5 uncertainty paper describes 42,840 time series representing Walmart unit sales and required quantile forecasts for future sales distributions.

## Executed Artifact

This executed toy example compared a same-weekday seasonal naive forecast with a calendar-plus-promotion ridge model over three SKU-like series.

```python
import numpy as np
from sklearn.linear_model import Ridge

rng = np.random.default_rng(18)
days = np.arange(56)
rows = []
for sku, base in enumerate([45, 18, 7]):
    promo = (days % 17 == sku * 3).astype(float)
    weekly = 1 + 0.18 * np.sin(2 * np.pi * days / 7 + sku)
    demand = np.maximum(0, base * weekly + 12 * promo + rng.normal(0, 2.5, len(days))).round()
    for d, p, y in zip(days, promo, demand):
        rows.append([sku, d, d % 7, p, y])

rows = np.array(rows)
train = rows[:, 1] < 49
test = ~train
pred_naive = []
for sku, _, dow, _, _ in rows[test]:
    hist = rows[train & (rows[:, 0] == sku) & (rows[:, 2] == dow)]
    pred_naive.append(hist[-1, 4])

X = np.c_[np.eye(3)[rows[:, 0].astype(int)], np.eye(7)[rows[:, 2].astype(int)], rows[:, 3]]
pred_ridge = Ridge(alpha=1.0).fit(X[train], rows[train, 4]).predict(X[test])

def wape(y, pred):
    return np.abs(y - pred).sum() / np.abs(y).sum()

print("seasonal_naive_wape", round(wape(rows[test, 4], pred_naive), 3))
print("ridge_calendar_promo_wape", round(wape(rows[test, 4], pred_ridge), 3))
print("test_units", int(rows[test, 4].sum()))
```

Observed output:

```text
seasonal_naive_wape 0.141
ridge_calendar_promo_wape 0.121
test_units 533
```

The feature model reduced WAPE from 14.1% to 12.1% on the final week. That is a useful direction, but logistics approval should translate it into missed picks, expedite cost, and capacity buffers using [business cost-aware forecasting losses](../05-time-series-and-forecasting/business-cost-aware-forecasting-losses.md), not just a lower average error.

## Failure Modes

Demand models often learn availability instead of demand when stockouts suppress sales. Promotions, assortment changes, and new shipping promises create [data drift](../14-ml-engineering-and-mlops/data-drift.md). A model that is good at weekly totals can still be unusable if it misses Monday morning depot peaks, so monitor horizon, location, SKU velocity, and cold-start segments separately.

## References

- [Makridakis et al., The M5 uncertainty competition: Results, findings and conclusions](https://doi.org/10.1016/j.ijforecast.2021.10.009)
- [Kaggle: M5 Forecasting - Accuracy](https://www.kaggle.com/competitions/m5-forecasting-accuracy)
