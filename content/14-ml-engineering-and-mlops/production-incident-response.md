---
title: Production Incident Response
slug: ml-engineering-and-mlops/production-incident-response
description: "Coordinated mitigation and learning when a live ML system causes harm or risk."
area: ml-engineering-and-mlops
topics:
  - production-incident-response
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - monitoring.md
  - observability.md
  - rollbacks.md
  - reliability.md
  - human-in-the-loop-systems.md
historical_context: false
last_reviewed: 2026-07-11
---

# Production Incident Response

Production incident response coordinates detection, triage, mitigation, communication, and learning when a live ML system behaves unsafely or unreliably. ML incidents include ordinary outages, but also wrong model behavior with green infrastructure metrics.

## Mechanism

The response loop is declare, assign roles, stabilize, preserve evidence, communicate, mitigate, and run a blameless review after recovery. During the incident, restoring acceptable behavior matters more than proving the root cause. Mitigation may mean [rollbacks](rollbacks.md), disabling automation, routing to [human-in-the-loop systems](human-in-the-loop-systems.md), freezing retraining, or lowering traffic.

## Artifact: Incident Runbook Contract

```yaml
incident_type: model_behavior_degradation
severity: SEV2
declare_when:
  - "primary decision SLO violated for 15m"
  - "manual review queue exceeds 2x normal volume"
roles:
  incident_lead: ml-platform-oncall
  comms: product-ops
  data_owner: risk-data-eng
first_15_minutes:
  - freeze canary ramps
  - snapshot model, feature, and threshold versions
  - compare affected traffic by model_version and segment
  - choose rollback or manual-review fallback
evidence_to_preserve:
  - prediction events
  - feature freshness metrics
  - model registry entry
  - deployment revision
```

This contract depends on [monitoring](monitoring.md) for detection and [observability](observability.md) for diagnosis. If those signals were not emitted before launch, responders will spend the incident reconstructing state.

## Failure Modes

Common failures are unclear authority, delayed customer communication, overwritten logs, and postmortems that stop at "bad model" instead of tracing data, code, review, and rollout controls. Reliability work is complete only when follow-up actions are owned and tracked.

## References

- [Google SRE Book: Managing Incidents](https://sre.google/sre-book/managing-incidents/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

> **Section — [ML Engineering and MLOps](index.md):** ← [Model Degradation](model-degradation.md) · [Human-in-the-Loop Systems](human-in-the-loop-systems.md) →

> **Learning path — [Production ML](../00-home-and-navigation/learning-paths.md#production-ml):** ← [Monitoring](monitoring.md)
