---
title: Reliability
slug: cloud-and-distributed-systems/reliability
description: "Failure-domain, SLO, dependency, retry, and recovery design for distributed cloud systems."
area: cloud-and-distributed-systems
topics:
  - reliability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - scalability.md
  - cost-management.md
  - managed-compute.md
  - managed-storage.md
  - distributed-data-processing.md
  - ../13-ml-engineering-and-mlops/reliability.md
  - ../13-ml-engineering-and-mlops/service-level-objectives.md
historical_context: false
last_reviewed: 2026-07-11
---
# Reliability

Cloud reliability is the ability of a workload to keep its promised behavior while components fail, slow down, or recover. In this section, reliability is infrastructure-facing: zones, dependencies, retries, backups, quotas, and failover. For model-specific production reliability, cross-reference the MLOps page on [reliability](../13-ml-engineering-and-mlops/reliability.md) and [service-level objectives](../13-ml-engineering-and-mlops/service-level-objectives.md).

## Mechanism

Reliability starts with an SLI and an SLO:

$$
\text{availability}=\frac{\text{successful requests}}{\text{valid requests}}, \qquad
\text{error budget}=1-\text{SLO}.
$$

The architecture then maps dependencies and failure domains. A user request might require a load balancer, API container, cache, database, object store, and model endpoint. If each dependency is required in series, total availability is approximately the product of dependency availabilities. [Managed compute](managed-compute.md) health checks and [managed storage](managed-storage.md) replication help, but only if clients use timeouts, bounded retries, circuit breakers, and tested recovery paths.

## Worked availability check

A 30-day month has 43,200 minutes, so common availability targets imply these monthly error budgets:

| Availability target | Monthly error budget |
| ---: | ---: |
| 99.00% | 432.0 minutes |
| 99.90% | 43.2 minutes |
| 99.95% | 21.6 minutes |
| 99.99% | 4.3 minutes |

Three required 99.9% dependencies in series have approximate availability

$$
0.999^3=0.997003,
$$

or 99.7003%. In a 30-day window, that corresponds to $(1-0.997003)\times43{,}200\approx129.5$ minutes of downtime. Two independent 99.9% active-active replicas have availability

$$
1-(1-0.999)^2=0.999999,
$$

or 99.9999%, but only if failures are sufficiently independent and failover does not depend on the failed component. That is why [scalability](scalability.md) and reliability reviews both inspect shared databases, regional control planes, and retry storms.

## Caveats

Retries without budgets can amplify outages. Backups without restore tests are unproven. Multi-region systems can fail through shared identity, DNS, deployment, or data-corruption paths. Reliability also costs money; [cost management](cost-management.md) should show the price of redundancy instead of treating it as waste.

## References

- [AWS Well-Architected Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [Google SRE Book: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)
- [Elastic Load Balancing target health checks](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html)
