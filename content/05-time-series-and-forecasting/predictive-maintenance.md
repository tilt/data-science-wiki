---
title: Predictive Maintenance
slug: time-series-and-forecasting/predictive-maintenance
description: Forecasting failure risk, degradation, or remaining useful life from equipment time series.
area: time-series-and-forecasting
topics:
  - predictive-maintenance
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - forecast-monitoring.md
  - concept-drift-in-forecasting.md
  - energy-consumption-forecasting.md
  - prediction-intervals.md
  - ../19-domain-applications/predictive-maintenance.md
historical_context: false
last_reviewed: 2026-07-11
---

# Predictive Maintenance

Predictive maintenance uses time-series signals to forecast failure risk, degradation state, or remaining useful life. The forecast is valuable only if it creates enough lead time for an action: inspection, part replacement, load reduction, or planned shutdown.

There are several target formulations. A binary risk model estimates whether failure will occur within a future window. A remaining-useful-life model estimates time until failure. A degradation model forecasts a continuous health indicator such as vibration, temperature, pressure, or error rate. These targets have different censoring problems. If a machine is repaired preventively, the true failure time is not observed; if an alarm policy already controls maintenance, labels partly reflect the old policy.

The time-series design must align sensor history, operating context, maintenance events, and failure definitions. Rolling windows can summarize vibration spectra or temperature trends. [Kalman filters](kalman-filters.md) and [state-space models](state-space-models.md) can track latent health states when measurements are noisy. [Prediction intervals](prediction-intervals.md) help separate normal variation from unusual degradation.

Cost asymmetry is severe. False positives waste technician time and parts; false negatives cause downtime or safety risk. Lead-time constraints mean a model with excellent same-hour failure detection may be operationally useless. Evaluation should measure alarm precision, recall, lead time, downtime avoided, and segment performance by asset type and operating regime.

Production maintenance models need drift checks because sensors are recalibrated, parts are replaced, operating loads change, and failure modes evolve. Those concerns tie predictive maintenance directly to [forecast monitoring](forecast-monitoring.md) and [concept drift in forecasting](concept-drift-in-forecasting.md).

## Connections

Predictive maintenance turns sensor histories into forecasts of failure risk or remaining useful life. The broader domain workflow is covered in [predictive maintenance](../19-domain-applications/predictive-maintenance.md), while forecast uncertainty and monitoring connect back to [prediction intervals](prediction-intervals.md) and [forecast monitoring](forecast-monitoring.md).

## References

- [NASA Prognostics Center of Excellence Data Repository](https://www.nasa.gov/content/prognostics-center-of-excellence-data-set-repository)
- [Saxena et al., On Applying the Prognostic Performance Metrics](https://papers.phmsociety.org/index.php/phmconf/article/view/1621)

> **Section — [Time-Series Forecasting](index.md):** ← [Energy Consumption Forecasting](energy-consumption-forecasting.md)
