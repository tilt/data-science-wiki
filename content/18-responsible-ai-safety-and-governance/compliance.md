---
title: Compliance
slug: responsible-ai-safety-and-governance/compliance
description: "Mapping AI systems to legal, standard, contract, and internal control obligations."
area: responsible-ai-safety-and-governance
topics:
  - compliance
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - risk-classification.md
  - auditability.md
  - policy-enforcement.md
  - privacy.md
  - fairness.md
  - human-oversight.md
historical_context: false
last_reviewed: 2026-07-23
---

# Compliance

Compliance is the workflow that maps an AI system to obligations and evidence. It is not a launch checkbox: it starts with [risk classification](risk-classification.md), then turns law, standards, contracts, and internal policy into controls that can be tested, approved, monitored, and audited.

## The compliance register

A compliance register should be concrete enough that an engineer can produce the evidence:

| Obligation source       | Trigger                                                                         | Required evidence                                                       | Linked control                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| EU AI Act               | Use case falls in high-risk area or prohibited practice review                  | Risk classification, data governance, testing, logging, human oversight | [auditability](auditability.md), [human oversight](human-oversight.md)                              |
| GDPR                    | Personal data processed in prompts, retrieval, training, logs, or review queues | Purpose, lawful basis, minimization, retention, DPIA where high risk    | [privacy](privacy.md), [PII leakage](pii-leakage.md)                                                |
| NIST AI RMF             | Organization adopts AI risk management controls                                 | Map/measure/manage artifacts, risk treatment owners                     | [policy enforcement](policy-enforcement.md)                                                         |
| Internal release policy | Model, threshold, prompt, or KB behavior changes                                | Change ticket, evaluation evidence, approval, rollback plan             | [governance of model and knowledge base changes](governance-of-model-and-knowledge-base-changes.md) |

The register should include jurisdiction, product owner, evidence owner, review cadence, and residual risk. For example, a hiring recommender needs [fairness](fairness.md) evidence, reviewer instructions, appeal handling, and records of any automated ranking effect on applicants.

## Sourced artifact

For an EU-facing high-impact assistant, a release checklist can be mapped to named legal text:

```yaml
release_gate: employment_screening_assistant
risk_basis: EU_AI_Act_Annex_III_employment
required_before_launch:
  - risk_management_file
  - data_governance_review
  - test_report_with_prior_metrics
  - logging_and_record_retention_plan
  - human_oversight_instructions
  - post_market_monitoring_owner
privacy_gate:
  source: GDPR_Articles_5_25_35
  evidence: purpose_minimization_retention_dpia
```

This is sourced from the actual EU AI Act and GDPR structure, not from a generic ethics checklist.

## Caveats

Compliance fails when teams classify the model type instead of the use case. A text classifier used for spam triage and the same classifier used for employment screening have different obligations. Reuse, new geographies, new data categories, and tool access should trigger re-review.

## References

- [EUR-Lex: Regulation (EU) 2024/1689, Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [EUR-Lex: Regulation (EU) 2016/679, General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)

> [!nav]
> **Section** — [Responsible AI, Safety, and Governance](index.md)
>
> [← Human Oversight](human-oversight.md) [Governance of Model and Knowledge Base Changes →](governance-of-model-and-knowledge-base-changes.md)
