---
title: Monitoring
slug: ml-engineering-and-mlops/monitoring
description: "Known production signals that detect service, data, and model health problems."
area: ml-engineering-and-mlops
topics:
  - monitoring
level: intermediate
status: complete
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
last_reviewed: 2026-07-21
---

# Monitoring

Monitoring watches known signals and alerts when they violate a defined expectation. ML monitoring must cover service health, data health, model behavior, and delayed outcomes. A model API can be up while stale features or shifted populations make its decisions wrong.

## Four layers of monitoring signals

Good monitors name the metric, owner, aggregation window, threshold, labels, and action. ML monitoring stacks four layers, from signals that fire before any harm (leading) to ones that confirm harm only after labels arrive (lagging):

| Layer   | Example signals                                                  | Detects                | Typical action              |
| ------- | ---------------------------------------------------------------- | ---------------------- | --------------------------- |
| Service | latency, error rate, saturation, dependency failures             | outages, overload      | page on-call                |
| Data    | feature freshness, missingness, schema drift, range checks       | broken inputs          | block or fall back          |
| Model   | score distribution, prediction mix, drift proxies, fallback rate | silent behavior change | investigate, compare canary |
| Outcome | delayed labels, business KPIs, complaint rate                    | real quality loss      | retrain or roll back        |

The gap between the fast leading layers and the slow outcome layer is the whole reason ML needs more than uptime dashboards: a model can be perfectly available while [data drift](data-drift.md) or [concept drift](concept-drift.md) quietly degrade decisions, and the confirming labels ([model degradation](model-degradation.md)) may arrive days later.

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

> [!nav]
> **Section** — [ML Engineering and MLOps](index.md)
>
> [← MLOps A-B Testing](a-b-testing.md) [Observability →](observability.md)
>
> **Learning path** — [Production ML](../00-home-and-navigation/learning-paths.md#production-ml)
>
> [← Model Serving](model-serving.md) [Production Incident Response →](production-incident-response.md)
