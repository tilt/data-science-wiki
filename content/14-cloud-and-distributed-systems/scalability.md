---
title: Scalability
slug: cloud-and-distributed-systems/scalability
description: "Throughput, latency, partitioning, autoscaling, and bottleneck analysis for growing systems."
area: cloud-and-distributed-systems
topics:
  - scalability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - reliability.md
  - managed-compute.md
  - distributed-data-processing.md
  - distributed-model-training.md
  - cost-management.md
  - storage-and-decoding-bottlenecks.md
  - ../13-ml-engineering-and-mlops/batch-and-online-inference.md
historical_context: false
last_reviewed: 2026-07-11
---
# Scalability

Scalability is the ability to handle more load by adding resources, partitioning state, reducing work, or changing the workload contract. It is not the same as speed: a service can be fast at low traffic and fail to scale because a single queue, database partition, model endpoint, or object prefix saturates. In ML systems, [batch and online inference](../13-ml-engineering-and-mlops/batch-and-online-inference.md) often scale through different mechanisms.

## Mechanism

A useful first approximation is Little's Law:

$$
L = \lambda W,
$$

where $L$ is average concurrency, $\lambda$ is arrival rate, and $W$ is average time in system. Horizontal scaling then needs a per-replica capacity model:

```text
required replicas = ceil((arrival_rate * service_time) / safe_concurrency_per_replica)
```

That formula is only the start. [Managed compute](managed-compute.md) can add replicas, but [distributed data processing](distributed-data-processing.md) still needs partitioning and [distributed model training](distributed-model-training.md) still needs communication bandwidth. [Reliability](reliability.md) also constrains scaling because retries and failover traffic can become the largest load source during incidents.

## Worked capacity check

Estimate pods from request rate, p95 service time, per-pod concurrency, and target utilization:

$$
\text{pods}=\left\lceil\frac{\text{rps}\times\text{p95 seconds}}{\text{per-pod concurrency}\times\text{target utilization}}\right\rceil.
$$

| Workload | In-flight requests | Capacity denominator | Required pods |
| --- | ---: | ---: | ---: |
| 240 rps, 0.12 s p95, cap 20, util 0.70 | 28.8 | 14.0 | 3 |
| 1000 rps, 0.08 s p95, cap 50, util 0.65 | 80.0 | 32.5 | 3 |

The second workload has more traffic but shorter service time and larger safe concurrency, so it still needs three pods. Real autoscalers add stabilization windows, metric lag, startup time, and min/max bounds; the calculation is the baseline to compare against observed HPA or Cloud Run behavior.

## Caveats

Scaling the API layer cannot fix a single-writer database, hot key, slow decoder, or saturated GPU KV cache. Average latency hides p99 queueing. Caches improve read scalability but add invalidation and cold-start behavior. Over-scaling can increase [cost management](cost-management.md) risk and make downstream dependencies fail sooner.

## References

- [Kubernetes Horizontal Pod Autoscaling](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/)
- [Amazon EC2 Auto Scaling target tracking](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html)
- [Cloud Run concurrency](https://docs.cloud.google.com/run/docs/about-concurrency)
