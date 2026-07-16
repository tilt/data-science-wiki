---
title: Human-in-the-Loop Systems
slug: ml-engineering-and-mlops/human-in-the-loop-systems
description: "Operational workflows where humans review, correct, or override model decisions."
area: ml-engineering-and-mlops
topics:
  - human-in-the-loop-systems
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - active-learning.md
  - production-incident-response.md
  - golden-datasets.md
  - monitoring.md
  - ../18-responsible-ai-safety-and-governance/human-oversight.md
historical_context: false
last_reviewed: 2026-07-11
---

# Human-in-the-Loop Systems

Human-in-the-loop systems route selected model decisions to people for review, correction, escalation, or labeling. They are not a vague safety blanket; they are an operational queue with eligibility rules, reviewer instructions, latency targets, audit logs, and feedback paths.

## Mechanism

The model or policy layer decides when automation is allowed, when abstention is required, and when review is mandatory. Review outcomes should feed [golden datasets](golden-datasets.md), [active learning](active-learning.md), incident analysis, and future training data only after quality checks.

## Artifact: Review Queue Contract

```yaml
review_queue:
  name: fraud_manual_review
  enqueue_when:
    - "score >= 0.82 and amount_usd > 500"
    - "model_confidence < 0.55"
    - "policy_tag in [sanctions_possible, vulnerable_customer]"
  reviewer_sla:
    p90_minutes: 15
    max_backlog: 500
  actions: [approve, block, request_more_info, escalate]
  audit_fields:
    - model_version
    - score
    - reason_codes
    - reviewer_id
    - decision
    - decision_time
```

The queue must appear in [monitoring](monitoring.md): backlog and SLA violations can be production incidents even when the model service is healthy. Governance details connect to [human oversight](../18-responsible-ai-safety-and-governance/human-oversight.md).

## Failure Modes

Human review fails when reviewers see no context, when queues overload during drift, or when labels are treated as ground truth without inter-reviewer checks. Automation bias can make reviewers rubber-stamp high-confidence scores, so sample accepted decisions for audit.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)

> **Section — [ML Engineering and MLOps](index.md):** ← [Production Incident Response](production-incident-response.md) · [Active Learning](active-learning.md) →
