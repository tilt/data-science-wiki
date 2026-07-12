---
title: Service Level Objectives
slug: ml-engineering-and-mlops/service-level-objectives
description: "Measurable reliability targets and error budgets for model-backed services."
area: ml-engineering-and-mlops
topics:
  - service-level-objectives
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - reliability.md
  - monitoring.md
  - canary-deployment.md
  - model-serving.md
  - production-incident-response.md
historical_context: false
last_reviewed: 2026-07-11
---
# Service Level Objectives

A service level objective is a measurable target for user-visible reliability. In ML systems, SLOs should cover both service delivery and decision usefulness: latency, availability, feature freshness, prediction coverage, fallback rate, and delayed label quality where labels exist.

## Mechanism

An SLO is defined over a service level indicator and a window. The error budget is the allowed badness: for a 99.9% monthly availability SLO, 0.1% of the window may be bad. The budget should govern [canary deployment](canary-deployment.md), release freezes, and [production incident response](production-incident-response.md).

## Executed Budget Calculation

```python
window_minutes = 30 * 24 * 60
slo = 0.999
budget_minutes = window_minutes * (1 - slo)
incident_minutes = 9.5
print("slo_budget_minutes_30d", round(budget_minutes, 2))
print("slo_incident_burn_pct", round(incident_minutes / budget_minutes * 100, 1))
```

Observed output:

```text
slo_budget_minutes_30d 43.2
slo_incident_burn_pct 22.0
```

A 9.5-minute incident consumes 22.0% of the 30-day budget. That is the operational reason to stop a rollout even if a candidate model looks promising offline.

## Artifact: ML SLO Definition

```yaml
slo:
  service: fraud-scorer
  window: 30d
  objectives:
    availability: "99.9% valid 2xx score responses"
    latency: "99% under 120ms"
    feature_freshness: "99% account_state features under 60s old"
    fallback_rate: "99.5% non-fallback predictions"
  burn_alerts:
    page: "2% budget consumed in 1h"
    ticket: "10% budget consumed in 3d"
```

These indicators connect [model-serving](model-serving.md) behavior to [monitoring](monitoring.md). Accuracy can be an SLO only when labels arrive fast and reliably enough to act within the window.

## Failure Modes

SLOs fail when they measure what is easy rather than what users experience. A 99.99% HTTP availability SLO is misleading if stale features produce bad decisions. Too many objectives also dilute action; choose the few that decide release and incident behavior.

## References

- [Google SRE Workbook: Implementing SLOs](https://sre.google/workbook/implementing-slos/)
- [Google SRE Workbook: Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/)
