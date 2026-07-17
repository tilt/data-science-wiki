---
title: Reliability
slug: ml-engineering-and-mlops/reliability
description: "The ability of model-backed systems to keep acceptable behavior under failure."
area: ml-engineering-and-mlops
topics:
  - reliability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - service-level-objectives.md
  - monitoring.md
  - observability.md
  - production-incident-response.md
  - ../15-cloud-and-distributed-systems/reliability.md
historical_context: false
last_reviewed: 2026-07-17
---

# Reliability

Reliability is the ability of a model-backed system to keep delivering acceptable behavior despite code bugs, data delays, dependency failures, traffic spikes, and model drift. It extends cloud reliability with data and decision correctness: a service can return `200 OK` while serving stale or harmful predictions.

## Mechanism

Reliability is specified through [service-level objectives](service-level-objectives.md), tested through failure drills, and operated through [monitoring](monitoring.md), [observability](observability.md), runbooks, and [production incident response](production-incident-response.md). For ML, the contract must include prediction availability, feature freshness, fallback quality, and delayed outcome quality, not only uptime.

## Graceful degradation

ML reliability is usually a ladder of acceptable degradations rather than a binary up or down. From best to worst:

1. **Full service** — fresh features, current model, live scoring.
2. **Degraded** — stale-but-valid features or a smaller fallback model, flagged in the response.
3. **Cached** — the last good batch score served with its age attached.
4. **Fail-safe default** — a conservative rule (for example, route to manual review) when nothing else is trustworthy.

Each rung must be defined, tested, and observable so the system chooses the highest safe rung instead of returning a confident wrong answer. A response that quietly fell back should say so, which is why the fallback path belongs in [observability](observability.md).

## Artifact: Reliability Control Matrix

```yaml
failure_mode_controls:
  feature_store_timeout:
    detect: "feature_fetch_error_rate > 0.5% for 10m"
    mitigate: "serve last known safe batch score for low-risk accounts"
    test: "monthly dependency-failure game day"
  stale_training_data:
    detect: "training_snapshot_age_hours > 30"
    mitigate: "block model registration"
    test: "pipeline fixture with late upstream partition"
  bad_model_release:
    detect: "canary guardrail or delayed-label degradation"
    mitigate: "rollback to registry://fraud-scorer/41"
    test: "staging rollback exercise before launch"
```

The parallel cloud page on [reliability](../15-cloud-and-distributed-systems/reliability.md) covers general distributed-systems patterns. This page's ML-specific addition is that the correctness target depends on data semantics and model versions.

## Failure Modes

Reliability efforts fail when fallbacks exist only on paper, when retraining jobs are treated as reliable because they finish, or when teams page on every noisy drift metric. Reliable systems practice the recovery path before a real incident.

## References

- [Google SRE Book: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)
- [Google SRE Book: Managing Incidents](https://sre.google/sre-book/managing-incidents/)

> [!nav]
> **Section** — [ML Engineering and MLOps](index.md)
>
> [← Service Level Objectives](service-level-objectives.md) [Data Drift →](data-drift.md)
