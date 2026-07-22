---
title: Managed Compute
slug: cloud-and-distributed-systems/managed-compute
description: "Choosing managed VMs, containers, functions, jobs, and endpoints by workload shape."
area: cloud-and-distributed-systems
topics:
  - managed-compute
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - aws-fundamentals.md
  - google-cloud-fundamentals.md
  - scalability.md
  - reliability.md
  - cost-management.md
  - gpu-systems.md
  - ../14-ml-engineering-and-mlops/model-serving.md
historical_context: false
last_reviewed: 2026-07-23
---

# Managed Compute

Managed compute is the set of cloud services that run code while the provider operates part of the underlying fleet. The useful distinction is not "serverless versus servers"; it is startup latency, concurrency model, runtime limit, state, accelerator access, network control, and operational ownership. A [model serving](../14-ml-engineering-and-mlops/model-serving.md) API, a nightly batch job, and a GPU trainer have different compute shapes even if all run containers.

## Matching workload to compute

Use the workload contract:

```mermaid
flowchart LR
  Shape[Request or job shape] --> Runtime[Runtime, state, and hardware]
  Runtime --> Scaling[Scaling signal]
  Scaling --> Deployment[Deployment unit]
  Deployment --> Failure[Failure behavior]
```

Functions fit short event handlers. Cloud Run-style containers fit stateless HTTP services with configurable concurrency. Kubernetes fits teams that need custom scheduling, sidecars, or portability. Batch services fit finite jobs. GPU instances or managed ML jobs fit [GPU systems](gpu-systems.md). The choice feeds [cost management](cost-management.md): high concurrency can reduce instances, but only if application code is actually safe and efficient under parallel requests.

## Worked concurrency check

For a stateless HTTP service handling 300 requests/s with 180 ms service time, Little's Law gives about $300\times0.18=54$ in-flight requests. With a 70% target utilization, the required instance count is

$$
\left\lceil\frac{54}{\text{concurrency}\times0.70}\right\rceil.
$$

| Per-instance concurrency | Required instances |
| -----------------------: | -----------------: |
|                        1 |                 78 |
|                        8 |                 10 |
|                       80 |                  1 |

Cloud Run documentation explicitly treats concurrency as a scaling and cost control. The table is not a recommendation to set concurrency to 80 blindly; CPU-bound Python code or shared mutable state can require a lower setting. That is a [scalability](scalability.md) test, not a console default.

## Caveats

Managed compute still needs IAM, quotas, logs, rollbacks, and health checks. Cold starts matter for bursty APIs. Hidden retries can duplicate side effects unless the handler is idempotent. Regional outages still require [reliability](reliability.md) design, and managed GPU endpoints can be capacity-constrained in ways a generic autoscaler cannot fix.

## References

- [Cloud Run maximum concurrent requests](https://docs.cloud.google.com/run/docs/about-concurrency)
- [Amazon EC2 concepts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

> [!nav]
> **Section** — [Cloud and Distributed Systems](index.md)
>
> [← Google Cloud Fundamentals](google-cloud-fundamentals.md) [Managed Storage →](managed-storage.md)
