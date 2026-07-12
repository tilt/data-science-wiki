---
title: Monitoring
slug: ml-engineering-and-mlops/monitoring
description: "Known production signals that detect service, data, and model health problems."
area: ml-engineering-and-mlops
topics:
  - monitoring
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - observability.md
  - data-drift.md
  - concept-drift.md
  - model-degradation.md
  - service-level-objectives.md
  - ../05-time-series-and-forecasting/forecast-monitoring.md
historical_context: false
last_reviewed: 2026-07-11
---
# Monitoring

Monitoring watches known signals and alerts when they violate a defined expectation. ML monitoring must cover service health, data health, model behavior, and delayed outcomes. A model API can be up while stale features or shifted populations make its decisions wrong.

## Mechanism

Good monitors name the metric, owner, aggregation window, threshold, labels, and action. Infrastructure metrics include traffic, latency, error rate, saturation, and dependency failures. ML metrics add feature freshness, missingness, score distributions, prediction mix, [data drift](data-drift.md), [concept drift](concept-drift.md) proxies, and later [model degradation](model-degradation.md).

## Artifact: Prometheus Alert

```yaml
groups:
  - name: fraud-model
    rules:
      - alert: FraudScorerHighFallbackRate
        expr: |
          sum(rate(fraud_predictions_total{fallback="true"}[10m]))
          /
          sum(rate(fraud_predictions_total[10m])) > 0.01
        for: 15m
        labels:
          severity: page
          service: fraud-scorer
        annotations:
          summary: "Fallback rate above 1% for fraud scorer"
          runbook: "https://runbooks.example.com/fraud-scorer/fallback-rate"
```

The alert is useful because it points to a specific owner and runbook. A dashboard without an action path belongs more to [observability](observability.md) than paging. For forecasts, monitoring has extra temporal concerns such as horizon-specific error and freshness, covered in [forecast monitoring](../05-time-series-and-forecasting/forecast-monitoring.md).

## Failure Modes

Monitoring fails when thresholds are copied across models, labels are missing from metrics, or alerts fire on symptoms nobody can mitigate. It also fails when it excludes model version and feature version, making [production incident response](production-incident-response.md) reconstruct state from logs after the fact.

## References

- [Prometheus alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)
- [OpenTelemetry Signals](https://opentelemetry.io/docs/concepts/signals/)
- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)

> **Learning path — Production ML:** ← [Model Serving](model-serving.md) · [path overview](../00-home-and-navigation/learning-paths.md#production-ml) · [Production Incident Response](production-incident-response.md) →
