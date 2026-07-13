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

## Worked budget calculation

A 30-day window has $30\times24\times60=43{,}200$ minutes. For a 99.9% availability SLO, the allowed bad fraction is $1-0.999=0.001$, so the monthly error budget is

$$
43{,}200\times0.001=43.2\text{ minutes}.
$$

A 9.5-minute incident burns

$$
\frac{9.5}{43.2}\times100\approx22.0\%
$$

of that budget. That is the operational reason to stop a rollout even if a candidate model looks promising offline.

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
