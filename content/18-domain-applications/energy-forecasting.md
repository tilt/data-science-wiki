---
title: Energy Forecasting
slug: domain-applications/energy-forecasting
description: "Forecasting load, generation, and consumption under weather, calendar, and grid reliability constraints."
area: domain-applications
topics:
  - energy-forecasting
level: intermediate
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../05-time-series-and-forecasting/energy-consumption-forecasting.md
  - ../05-time-series-and-forecasting/probabilistic-forecasting.md
  - ../05-time-series-and-forecasting/forecast-calibration.md
  - ../05-time-series-and-forecasting/forecast-monitoring.md
  - ../05-time-series-and-forecasting/feature-engineering-for-forecasting.md
  - ../13-ml-engineering-and-mlops/concept-drift.md
historical_context: false
last_reviewed: 2026-07-11
---
# Energy Forecasting

Energy forecasting predicts load, consumption, generation, or price over horizons from minutes to years. Inputs include historical load, weather forecasts, calendar effects, tariffs, outages, distributed generation, and known industrial schedules. The target is decision-specific: hour-ahead balancing needs low-latency point forecasts, day-ahead operations need peak-aware load forecasts, and planning needs uncertainty bands around electrification or solar adoption.

## Framing

This page is the applied version of [energy consumption forecasting](../05-time-series-and-forecasting/energy-consumption-forecasting.md). Weather covariates and calendar encoding are usually as important as model choice, so [feature engineering for forecasting](../05-time-series-and-forecasting/feature-engineering-for-forecasting.md) should include temperature lags, heating and cooling degree terms, daylight, holidays, and local business schedules. Evaluation should be by horizon, feeder or region, season, and peak period. For reserve planning, [probabilistic forecasting](../05-time-series-and-forecasting/probabilistic-forecasting.md) and [forecast calibration](../05-time-series-and-forecasting/forecast-calibration.md) are more useful than a single MAE.

The UCI household power dataset is a concrete public artifact: it contains 2,075,259 one-minute measurements from a household near Paris between December 2006 and November 2010, with about 1.25% missing rows.

## Executed Artifact

This executed hourly load toy compared yesterday-same-hour against a weather-calendar gradient boosting regressor.

```python
import os
import numpy as np
from sklearn.ensemble import HistGradientBoostingRegressor

os.environ["LOKY_MAX_CPU_COUNT"] = "4"
rng = np.random.default_rng(18)
h = np.arange(24 * 21)
temp = 15 + 8 * np.sin(2 * np.pi * (h % 24 - 14) / 24) + 3 * np.sin(2 * np.pi * h / (24 * 7))
load = (
    100
    + 2.8 * np.maximum(temp - 18, 0)
    + 1.7 * np.maximum(10 - temp, 0)
    + 9 * ((h % 24 >= 17) & (h % 24 <= 21))
    + rng.normal(0, 1.2, len(h))
)
train = h < 24 * 18
test = ~train
X = np.c_[h % 24, h % 168, temp]
model = HistGradientBoostingRegressor(random_state=18, max_iter=80).fit(X[train], load[train])
pred = model.predict(X[test])
yesterday = load[h[test] - 24]
mae = lambda y, p: np.abs(y - p).mean()

print("yesterday_same_hour_mae_mw", round(mae(load[test], yesterday), 2))
print("weather_calendar_hgb_mae_mw", round(mae(load[test], pred), 2))
print("peak_hour_abs_error_mw", round(abs(load[test][np.argmax(load[test])] - pred[np.argmax(load[test])]), 2))
```

Observed output:

```text
yesterday_same_hour_mae_mw 2.62
weather_calendar_hgb_mae_mw 1.06
peak_hour_abs_error_mw 0.09
```

The weather-calendar model cut MAE by more than half and kept the peak-hour miss to 0.09 MW. In grid use, the peak slice would be reported separately because a model can look good on average while underestimating rare ramps.

## Failure Modes

Weather forecast error propagates directly into load forecasts. Demand response, new tariffs, electrification, rooftop solar, and economic changes create [concept drift](../13-ml-engineering-and-mlops/concept-drift.md). Production [forecast monitoring](../05-time-series-and-forecasting/forecast-monitoring.md) should track missing telemetry, calibration by quantile, ramp errors, and peak-period residuals.

## References

- [UCI Machine Learning Repository: Individual Household Electric Power Consumption](https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption)
- [Gasparin, Lukovic, and Alippi, Deep Learning for Time Series Forecasting: The Electric Load Case](https://arxiv.org/abs/1907.09207)
