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

## Executed availability check

This calculation converts common availability targets into monthly error budgets and shows how three serial 99.9% dependencies degrade a request path.

```python
month_min = 30 * 24 * 60
for avail in [0.99, 0.999, 0.9995, 0.9999]:
    print(f"{avail*100:.2f}%_monthly_error_budget_min {(1-avail)*month_min:.1f}")
serial = 0.999 ** 3
parallel = 1 - (1 - 0.999) ** 2
print(f"three_serial_99.9_dependencies_availability_pct {serial*100:.4f}")
print(f"three_serial_monthly_downtime_min {(1-serial)*month_min:.1f}")
print(f"two_independent_99.9_active_active_pct {parallel*100:.4f}")
```

Observed output:

```text
99.00%_monthly_error_budget_min 432.0
99.90%_monthly_error_budget_min 43.2
99.95%_monthly_error_budget_min 21.6
99.99%_monthly_error_budget_min 4.3
three_serial_99.9_dependencies_availability_pct 99.7003
three_serial_monthly_downtime_min 129.5
two_independent_99.9_active_active_pct 99.9999
```

Serial dependencies spend error budget quickly. Active-active redundancy can improve availability only when failures are sufficiently independent and failover does not depend on the failed component. That is why [scalability](scalability.md) and reliability reviews both inspect shared databases, regional control planes, and retry storms.

## Caveats

Retries without budgets can amplify outages. Backups without restore tests are unproven. Multi-region systems can fail through shared identity, DNS, deployment, or data-corruption paths. Reliability also costs money; [cost management](cost-management.md) should show the price of redundancy instead of treating it as waste.

## References

- [AWS Well-Architected Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)
- [Google SRE Book: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/)
- [Elastic Load Balancing target health checks](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html)
