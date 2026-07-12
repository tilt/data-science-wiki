---
title: Canary Deployment
slug: ml-engineering-and-mlops/canary-deployment
description: "A progressive rollout that exposes a new model to limited live traffic first."
area: ml-engineering-and-mlops
topics:
  - canary-deployment
level: foundational
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - model-serving.md
  - shadow-deployment.md
  - rollbacks.md
  - service-level-objectives.md
  - monitoring.md
historical_context: false
last_reviewed: 2026-07-11
---
# Canary Deployment

A canary deployment routes a small, controlled share of production traffic to a new [model-serving](model-serving.md) version before full release. It reduces blast radius while exposing the candidate to real request shapes, dependencies, and latency pressure.

## Mechanism

Canaries need three contracts: traffic assignment, guardrail metrics, and rollback triggers. Traffic can be random, sticky by user, regional, or feature-flagged. Guardrails should include service health, score distribution, fallback rate, and delayed product or label outcomes. The first decision is usually "continue ramp or [roll back](rollbacks.md)," not "declare the model better."

## Executed Guardrail

```python
from scipy.stats import norm

base_err, canary_err = 37, 9
base_n, canary_n = 50000, 5000
pb, pc = base_err / base_n, canary_err / canary_n
se = (pb * (1 - pb) / base_n + pc * (1 - pc) / canary_n) ** 0.5
z = (pc - pb) / se
p = 1 - norm.cdf(z)
print("canary_error_rates", round(pb, 5), round(pc, 5))
print("canary_z", round(z, 3), "one_sided_p", round(p, 4))
```

Observed output:

```text
canary_error_rates 0.00074 0.0018
canary_z 1.733 one_sided_p 0.0416
```

At a 5% one-sided guardrail, this canary's error rate is high enough to stop the ramp. A real rollout would also check [service-level objectives](service-level-objectives.md), segment mix, and output drift in [monitoring](monitoring.md).

## Artifact: Progressive Rollout

```yaml
strategy:
  canary:
    steps:
      - setWeight: 5
      - pause: {duration: 30m}
      - analysis:
          templates: [fraud-error-rate, p95-latency]
      - setWeight: 25
      - pause: {duration: 2h}
```

## Failure Modes

A canary misses harm when the sample excludes the risky segment, assignment is not sticky, or delayed labels arrive after the ramp. Run a [shadow deployment](shadow-deployment.md) first when integration risk is higher than user-impact risk.

## References

- [Argo Rollouts: Canary](https://argo-rollouts.readthedocs.io/en/stable/features/canary/)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
