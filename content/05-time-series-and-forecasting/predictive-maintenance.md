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
last_reviewed: 2026-07-18
---

# Predictive Maintenance

Predictive maintenance uses time-series signals to forecast failure risk, degradation state, or remaining useful life. The forecast is valuable only if it creates enough lead time for an action: inspection, part replacement, load reduction, or planned shutdown.

There are several target formulations, and they differ in what they predict, how labels are censored, and how they are scored.

| Target                     | Predicts                                                           | Censoring problem                                        | Typical metric                                 |
| -------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------- |
| Binary failure risk        | failure within a future window                                     | preventive repair hides the true failure time            | precision, recall, lead time                   |
| Remaining useful life      | time until failure                                                 | rarely run to failure, so most series are right-censored | mean absolute error on RUL, prognostic horizon |
| Degradation / health index | a continuous health indicator (vibration, temperature, error rate) | no ground-truth health label; only proxies               | tracking error, alarm precision at threshold   |

If a machine is repaired preventively, the true failure time is not observed; if an alarm policy already controls maintenance, labels partly reflect the old policy. Every formulation above therefore learns partly from a censored, policy-shaped history rather than from clean failure outcomes.

The time-series design must align sensor history, operating context, maintenance events, and failure definitions. Rolling windows can summarize vibration spectra or temperature trends. [Kalman filters](kalman-filters.md) and [state-space models](state-space-models.md) can track latent health states when measurements are noisy. [Prediction intervals](prediction-intervals.md) help separate normal variation from unusual degradation.

Cost asymmetry is severe. False positives waste technician time and parts; false negatives cause downtime or safety risk. Lead-time constraints mean a model with excellent same-hour failure detection may be operationally useless. Evaluation should measure alarm precision, recall, lead time, downtime avoided, and segment performance by asset type and operating regime.

Production maintenance models need drift checks because sensors are recalibrated, parts are replaced, operating loads change, and failure modes evolve. Those concerns tie predictive maintenance directly to [forecast monitoring](forecast-monitoring.md) and [concept drift in forecasting](concept-drift-in-forecasting.md).

## Connections

Predictive maintenance turns sensor histories into forecasts of failure risk or remaining useful life. The broader domain workflow is covered in [predictive maintenance](../19-domain-applications/predictive-maintenance.md), while forecast uncertainty and monitoring connect back to [prediction intervals](prediction-intervals.md) and [forecast monitoring](forecast-monitoring.md).

## References

- [NASA Prognostics Center of Excellence Data Repository](https://www.nasa.gov/content/prognostics-center-of-excellence-data-set-repository)
- [Saxena et al., On Applying the Prognostic Performance Metrics](https://papers.phmsociety.org/index.php/phmconf/article/view/1621)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Energy Consumption Forecasting](energy-consumption-forecasting.md)
