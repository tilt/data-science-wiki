---
title: Auditability
slug: responsible-ai-safety-and-governance/auditability
description: "Evidence trails that reconstruct AI decisions, releases, and controls."
area: responsible-ai-safety-and-governance
topics:
  - auditability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - compliance.md
  - governance-of-model-and-knowledge-base-changes.md
  - policy-enforcement.md
  - risk-classification.md
  - human-oversight.md
  - ../14-ml-engineering-and-mlops/observability.md
historical_context: false
last_reviewed: 2026-07-21
---

# Auditability

Auditability is the ability to reconstruct what an AI system did, which artifacts were in force, why the action was allowed, and who approved the relevant controls. It connects operational [observability](../14-ml-engineering-and-mlops/observability.md) with [compliance](compliance.md): logs are useful only if they answer a later accountability question.

## A logged decision event

For high-risk systems, the EU AI Act includes record-keeping and logging obligations; NIST AI RMF also treats systematic documentation as part of managing risk. A minimal decision event should identify both the model path and the governance path:

```json
{
  "event_id": "evt_2026_07_11_00042",
  "decision_type": "loan_review_recommendation",
  "model_version": "credit_triage_v3.2.1",
  "feature_snapshot_id": "fs_8b7c",
  "policy_version": "lending_policy_2026_05",
  "threshold_id": "thr_high_risk_0.72",
  "input_hash": "sha256:9ef...",
  "output_hash": "sha256:a41...",
  "reason_codes": ["recent_delinquency_count", "utilization_ratio"],
  "human_review": { "required": true, "reviewer_id": "risk_ops_17", "outcome": "approved" },
  "retention_class": "regulated_decision_7y"
}
```

The important design choice is indirection: store immutable IDs and hashes, not unlimited raw personal data. If the incident involves [PII leakage](pii-leakage.md), the audit trail should still let investigators locate the evidence without spreading sensitive content through every log sink.

## What auditors ask

An audit usually asks: which model and [knowledge base change](governance-of-model-and-knowledge-base-changes.md) introduced the behavior, which [policy enforcement](policy-enforcement.md) rule allowed it, whether [human oversight](human-oversight.md) occurred, and whether the same issue appears in similar decisions. That requires joining release records, decision logs, evaluation results, approvals, and appeal outcomes.

## Caveats

Audit logs fail when they are either too thin or too invasive. A final score without input, version, threshold, and policy IDs cannot explain a decision. Raw prompts, documents, and user identifiers copied into every trace create privacy risk. Define retention, access control, and redaction at the same time as the audit schema.

## References

- [EUR-Lex: Regulation (EU) 2024/1689, Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)

> [!nav]
> **Section** — [Responsible AI, Safety, and Governance](index.md)
>
> [← Explainability](explainability.md) [Risk Classification →](risk-classification.md)
