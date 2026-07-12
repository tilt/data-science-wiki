---
title: Managed Compute
slug: cloud-and-distributed-systems/managed-compute
description: "Choosing managed VMs, containers, functions, jobs, and endpoints by workload shape."
area: cloud-and-distributed-systems
topics:
  - managed-compute
level: foundational
status: review
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
  - ../13-ml-engineering-and-mlops/model-serving.md
historical_context: false
last_reviewed: 2026-07-11
---
# Managed Compute

Managed compute is the set of cloud services that run code while the provider operates part of the underlying fleet. The useful distinction is not "serverless versus servers"; it is startup latency, concurrency model, runtime limit, state, accelerator access, network control, and operational ownership. A [model serving](../13-ml-engineering-and-mlops/model-serving.md) API, a nightly batch job, and a GPU trainer have different compute shapes even if all run containers.

## Selection mechanism

Use the workload contract:

```mermaid
flowchart LR
  Shape[Request or job shape] --> Runtime[Runtime, state, and hardware]
  Runtime --> Scaling[Scaling signal]
  Scaling --> Deployment[Deployment unit]
  Deployment --> Failure[Failure behavior]
```

Functions fit short event handlers. Cloud Run-style containers fit stateless HTTP services with configurable concurrency. Kubernetes fits teams that need custom scheduling, sidecars, or portability. Batch services fit finite jobs. GPU instances or managed ML jobs fit [GPU systems](gpu-systems.md). The choice feeds [cost management](cost-management.md): high concurrency can reduce instances, but only if application code is actually safe and efficient under parallel requests.

## Executed concurrency check

For a stateless HTTP service handling 300 requests/s with 180 ms service time and a 70% target utilization, the required instance count changes sharply with per-instance concurrency.

```python
import math
rps = 300
latency = 0.18
util = 0.70
for conc in [1, 8, 80]:
    need = math.ceil((rps * latency) / (conc * util))
    print(f"cloud_run_concurrency_{conc}_instances {need}")
```

Observed output:

```text
cloud_run_concurrency_1_instances 78
cloud_run_concurrency_8_instances 10
cloud_run_concurrency_80_instances 1
```

Cloud Run documentation explicitly treats concurrency as a scaling and cost control. The output is not a recommendation to set concurrency to 80 blindly; CPU-bound Python code or shared mutable state can require a lower setting. That is a [scalability](scalability.md) test, not a console default.

## Caveats

Managed compute still needs IAM, quotas, logs, rollbacks, and health checks. Cold starts matter for bursty APIs. Hidden retries can duplicate side effects unless the handler is idempotent. Regional outages still require [reliability](reliability.md) design, and managed GPU endpoints can be capacity-constrained in ways a generic autoscaler cannot fix.

## References

- [Cloud Run maximum concurrent requests](https://docs.cloud.google.com/run/docs/about-concurrency)
- [Amazon EC2 concepts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
- [Kubernetes Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
