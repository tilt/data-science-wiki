---
title: Time-Series Forecasting
slug: 05-time-series-and-forecasting
description: Index and learning map for Time-Series Forecasting.
area: time-series-and-forecasting
topics:
  - "time-series-fundamentals"
  - "trend-seasonality-cycles-noise"
  - "stationarity"
  - "autocorrelation-and-partial-autocorrelation"
  - "forecasting-problem-formulation"
  - "forecasting-data"
  - "statistical-forecasting"
  - "machine-learning-forecasting"
  - "deep-learning-forecasting"
  - "feature-engineering"
  - "forecast-error-metrics"
  - "forecast-ensembling"
  - "probabilistic-forecasting"
  - "prediction-intervals"
  - "forecast-calibration"
  - "forecast-monitoring"
  - "forecast-reconciliation"
  - "concept-drift"
  - "hyperparameter-optimization"
  - "forecasting-system-design"
  - "autoregressive-models"
  - "moving-average-models"
  - "arma"
  - "arima"
  - "sarima"
  - "exponential-smoothing"
  - "state-space-models"
level: foundational
status: draft
page_type: area-index
aliases:
  - "Time-Series Forecasting"
prerequisites:
  - "02-probability-and-statistics/index.md"
related:
  - "03-classical-machine-learning/index.md"
  - "06-deep-learning/index.md"
  - "14-ml-engineering-and-mlops/index.md"
  - "17-experimentation-and-evaluation/index.md"
  - "19-domain-applications/index.md"
historical_context: false
last_reviewed: 2026-07-10
---

# Time-Series Forecasting

## Summary

Time-series forecasting predicts future values from observations ordered in time. The modeling problem is inseparable from the decision: what is known at the forecast origin, which horizon matters, how uncertainty is represented, and how errors translate into cost. Validation must respect temporal order, otherwise future information leaks into training.

This section moves from basic time-series structure to statistical models, machine-learning models, evaluation, probabilistic forecasts, reconciliation, monitoring, and domain examples.

## Forecasting Route

| Question                         | Start with                                                                                                                     | Then read                                                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| What is the target and horizon?  | [Time Series Fundamentals](time-series-fundamentals.md), [Forecasting Problem Formulation](forecasting-problem-formulation.md) | [Forecasting Data and Covariates](forecasting-data-and-covariates.md)                                                                    |
| What structure is in the series? | [Trend Seasonality Cycles Noise](trend-seasonality-cycles-noise.md), [Stationarity](stationarity.md)                           | [Autocorrelation and Partial Autocorrelation](autocorrelation-and-partial-autocorrelation.md)                                            |
| Which model family fits?         | [Statistical Forecasting](statistical-forecasting.md), [Machine Learning Forecasting](machine-learning-forecasting.md)         | [Deep Learning Forecasting](deep-learning-forecasting.md), [Transformer Based Forecasting](transformer-based-forecasting.md)             |
| How should forecasts be judged?  | [Forecast Evaluation](forecast-evaluation.md), [Rolling Origin Validation](rolling-origin-validation.md)                       | [Forecast Error Metrics](forecast-error-metrics.md), [Business-Cost-Aware Forecasting Losses](business-cost-aware-forecasting-losses.md) |
| How is uncertainty handled?      | [Probabilistic Forecasting](probabilistic-forecasting.md), [Prediction Intervals](prediction-intervals.md)                     | [Quantile Loss](quantile-loss.md), [Conformal Prediction for Forecasting](conformal-prediction-for-forecasting.md)                       |

## Subtopics

- [Time Series Fundamentals](time-series-fundamentals.md)
- [Trend Seasonality Cycles Noise](trend-seasonality-cycles-noise.md)
- [Stationarity](stationarity.md)
- [Autocorrelation and Partial Autocorrelation](autocorrelation-and-partial-autocorrelation.md)
- [Forecasting Problem Formulation](forecasting-problem-formulation.md)
- [Forecasting Data and Covariates](forecasting-data-and-covariates.md)
- [Statistical Forecasting](statistical-forecasting.md)
- [Machine Learning Forecasting](machine-learning-forecasting.md)
- [Deep Learning Forecasting](deep-learning-forecasting.md)
- [Feature Engineering for Forecasting](feature-engineering-for-forecasting.md)
- [Cold-Start Forecasting](cold-start-forecasting.md)
- [Autoregressive Models](autoregressive-models.md)
- [Moving Average Models](moving-average-models.md)
- [Arma](arma.md)
- [Arima](arima.md)
- [Sarima](sarima.md)
- [Exponential Smoothing](exponential-smoothing.md)
- [State Space Models](state-space-models.md)
- [Kalman Filters](kalman-filters.md)
- [Forecast Evaluation](forecast-evaluation.md)
- [Forecast Error Metrics](forecast-error-metrics.md)
- [Backtesting](backtesting.md)
- [Rolling Origin Validation](rolling-origin-validation.md)
- [Forecast Ensembling](forecast-ensembling.md)
- [Hyperparameter Optimization for Forecasting](hyperparameter-optimization-for-forecasting.md)
- [Forecasting System Design](forecasting-system-design.md)
- [Forecasting Pitfalls and Worked Examples](forecasting-pitfalls-and-worked-examples.md)
- [Hierarchical Forecasting](hierarchical-forecasting.md)
- [Hierarchical Reconciliation](hierarchical-reconciliation.md)
- [Temporal Reconciliation](temporal-reconciliation.md)
- [Intermittent Demand](intermittent-demand.md)
- [Probabilistic Forecasting](probabilistic-forecasting.md)
- [Prediction Intervals](prediction-intervals.md)
- [Quantile Loss](quantile-loss.md)
- [Forecast Calibration](forecast-calibration.md)
- [Conformal Prediction for Forecasting](conformal-prediction-for-forecasting.md)
- [Concept Drift in Forecasting](concept-drift-in-forecasting.md)
- [Online Learning for Forecasting](online-learning-for-forecasting.md)
- [Forecast Monitoring](forecast-monitoring.md)
- [Business-Cost-Aware Forecasting Losses](business-cost-aware-forecasting-losses.md)
- [RNN and LSTM Forecasting](rnn-and-lstm-forecasting.md)
- [Temporal Convolutional Networks](temporal-convolutional-networks.md)
- [Transformer Based Forecasting](transformer-based-forecasting.md)
- [N Beats and Nhits](n-beats-and-nhits.md)
- [Demand Forecasting](demand-forecasting.md)
- [Energy Consumption Forecasting](energy-consumption-forecasting.md)
- [Predictive Maintenance](predictive-maintenance.md)

> **Learning path — Forecasting:** [path overview](../00-home-and-navigation/learning-paths.md#forecasting) · [Time Series Fundamentals](time-series-fundamentals.md) →
