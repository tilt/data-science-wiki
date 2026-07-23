---
title: Rollbacks
slug: ml-engineering-and-mlops/rollbacks
description: "Restoring a known-good ML behavior after an unsafe release or drift response."
area: ml-engineering-and-mlops
topics:
  - rollbacks
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - canary-deployment.md
  - model-versioning.md
  - model-serving.md
  - production-incident-response.md
  - service-level-objectives.md
historical_context: false
last_reviewed: 2026-07-21
---

# Rollbacks

A rollback restores the last acceptable production behavior after a release, retrain, threshold change, or dependency update causes unacceptable risk. In ML systems, "behavior" includes [model-versioning](model-versioning.md), feature definitions, thresholds, prompts, retrieval indexes, and routing, not just application code.

## Rollback readiness

Rollback readiness is a pre-release contract. The team should know the trigger, owner, command, expected recovery time, validation query, and customer communication path before the [canary deployment](canary-deployment.md) begins. The previous artifact must remain compatible with current schemas and dependencies.

**Roll back by default.** Reverting to a known-good version is faster and lower-risk than diagnosing and hot-fixing a live system under pressure. Fix forward only when the previous version is also unsafe — for example when the incident is a data or upstream problem that both versions share. Decide which rule applies to a given failure class before the incident, not during it.

## Artifact: Rollback Runbook Step

```yaml
rollback:
  trigger: "p95_latency_ms > 180 for 10m OR fraud_false_positive_rate +0.7pp"
  owner: "ml-platform-oncall"
  action:
    kubernetes:
      deployment: fraud-scorer
      command: "kubectl rollout undo deployment/fraud-scorer --to-revision=41"
  restore:
    model_uri: "registry://fraud-scorer/41"
    threshold_config: "s3://ml-config/fraud/thresholds/v41.yaml"
  verify:
    - "stable model_version appears in 99% of responses"
    - "p95_latency_ms below 140 for 15m"
    - "fallback_rate below 0.5%"
```

This is tied to [model-serving](model-serving.md): clients should not change when routing returns to the old version. During [production incident response](production-incident-response.md), preserve the failed artifact and logs; deleting the bad version destroys evidence.

## Failure Modes

Rollbacks fail when database migrations are irreversible, features were renamed without compatibility shims, old containers were garbage-collected, or dashboards cannot distinguish versions. A rollback can also restore an older model that no longer satisfies current [service-level objectives](service-level-objectives.md), so verification must check business and model signals, not only pod health.

## References

- [Kubernetes Deployments: rolling back a deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Google SRE Book: Managing Incidents](https://sre.google/sre-book/managing-incidents/)

> [!nav]
> **Section** — [ML Engineering and MLOps](index.md)
>
> [← Canary Deployment](canary-deployment.md) [MLOps A-B Testing →](a-b-testing.md)
