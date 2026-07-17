---
title: Observability
slug: ml-engineering-and-mlops/observability
description: "Diagnostic evidence for explaining model-backed system behavior."
area: ml-engineering-and-mlops
topics:
  - observability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - monitoring.md
  - microservices.md
  - model-serving.md
  - production-incident-response.md
  - reliability.md
historical_context: false
last_reviewed: 2026-07-17
---

# Observability

Observability is the ability to explain what happened inside a system from emitted evidence. [Monitoring](monitoring.md) asks whether known conditions are healthy; observability lets an engineer diagnose why a specific decision, latency spike, or data anomaly occurred.

## Mechanism

The core signals are metrics, logs, traces, and events. Each answers a different diagnostic question, and each gains an ML-specific payload:

| Pillar  | Answers                           | ML addition                                     |
| ------- | --------------------------------- | ----------------------------------------------- |
| Metrics | is the aggregate healthy?         | score, latency, and fallback-rate distributions |
| Logs    | what happened for this request?   | prediction metadata and input provenance        |
| Traces  | where did time or failure go?     | spans across feature → model → policy services  |
| Events  | did a notable state change occur? | model deploys, version promotions, drift alarms |

Beyond the generic signals, ML systems need prediction metadata: request ID, model version, feature version, dataset or prompt version, score, threshold, fallback path, latency, and policy decision. In a [microservices](microservices.md) path, trace context must cross the application, feature service, [model-serving](model-serving.md) service, and downstream workflow so one transaction can be reconstructed end to end.

## Artifact: Prediction Event

```json
{
  "event": "prediction_served",
  "request_id": "req-7f31",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "model_name": "fraud-scorer",
  "model_version": "42",
  "feature_version": "features:v19",
  "score": 0.873,
  "threshold": 0.82,
  "decision": "manual_review",
  "latency_ms": 87,
  "fallback_reason": null
}
```

This event supports [production incident response](production-incident-response.md): responders can filter all decisions made by version `42`, find high-latency traces, and compare decisions against later labels. Sensitive raw inputs should not be logged unless the governance and retention controls are explicit.

## Failure Modes

High-volume logs are not observability if they cannot answer operational questions. Missing correlation IDs, sampled-away rare failures, and free-text logs make diagnosis slow. Over-logging personal data creates reliability and governance risk even when debugging improves.

## References

- [OpenTelemetry Signals](https://opentelemetry.io/docs/concepts/signals/)
- [Google SRE Book: Managing Incidents](https://sre.google/sre-book/managing-incidents/)

> [!nav]
> **Section** — [ML Engineering and MLOps](index.md)
>
> [← Monitoring](monitoring.md) [Service Level Objectives →](service-level-objectives.md)
