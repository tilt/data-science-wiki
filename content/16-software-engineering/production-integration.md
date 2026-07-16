---
title: Production Integration
slug: software-engineering/production-integration
description: Connecting a service or model to real users with contracts, telemetry, and rollback.
area: software-engineering
topics:
  - production-integration
level: foundational
status: review
page_type: system-design
aliases: []
prerequisites:
  - api-design.md
related:
  - "api-design.md"
  - "web-backends.md"
  - "software-architecture.md"
  - "testing.md"
  - "../14-ml-engineering-and-mlops/canary-deployment.md"
  - "../14-ml-engineering-and-mlops/rollbacks.md"
  - "../14-ml-engineering-and-mlops/monitoring.md"
historical_context: false
last_reviewed: 2026-07-11
---

# Production Integration

Production integration is the work of connecting a prototype to real product traffic. The mechanism is a launch contract: interface, authentication, data freshness, rollout path, telemetry, fallback, owner, and rollback. For ML systems this is where notebook assumptions meet [web backends](web-backends.md), latency budgets, authorization, and [monitoring](../14-ml-engineering-and-mlops/monitoring.md).

## Integration Contract

Before launch, name the upstream dependencies, downstream consumers, schema versions, timeout budget, retry policy, idempotency key, trace propagation, and user-visible fallback. Roll out behind shadow traffic, a feature flag, or [canary deployment](../14-ml-engineering-and-mlops/canary-deployment.md). The same checklist should link to [testing](testing.md) fixtures and the [API design](api-design.md) contract it exercises.

## Worked Launch Gate

Suppose a launch contract says to roll back when the canary error rate exceeds 5 percent or the overall p95 latency exceeds 250 ms. A five-request smoke sample contains:

| path    | ok? | latency ms |
| ------- | --- | ---------: |
| shadow  | yes |         83 |
| shadow  | yes |         91 |
| canary  | yes |        104 |
| canary  | no  |        260 |
| control | yes |         72 |

One of two canary requests failed, so the canary error rate is 0.50. The inclusive p95 latency over all five requests is 228.8 ms, below the latency threshold, but the error-rate guardrail alone triggers rollback. The numbers are intentionally small, but the contract is real: define thresholds before launch and automate the decision path. A [software architecture](software-architecture.md) that has no rollback path is not production-ready, even if the model looks good offline.

## Failure Modes

Integrations fail when batch data is assumed to exist online, retries are unsafe, provider errors become generic 500s, or trace IDs stop at the first service boundary. Use W3C trace context or equivalent propagation so incidents can cross service boundaries. Document [rollbacks](../14-ml-engineering-and-mlops/rollbacks.md) before the first full release.

## References

- [OpenTelemetry semantic conventions: HTTP spans](https://opentelemetry.io/docs/specs/semconv/http/http-spans/)
- [W3C Trace Context](https://www.w3.org/TR/trace-context/)
- [Google AIP-185: API Versioning](https://google.aip.dev/185)

> [!nav]
> **Section** — [Software Engineering](index.md)
>
> [← JavaScript Application Architecture](javascript-application-architecture.md) [Requirements Engineering →](requirements-engineering.md)
