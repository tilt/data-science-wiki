---
title: Risk Classification
slug: responsible-ai-safety-and-governance/risk-classification
description: "Sorting AI use cases by impact, autonomy, data sensitivity, and required controls."
area: responsible-ai-safety-and-governance
topics:
  - risk-classification
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - compliance.md
  - human-oversight.md
  - auditability.md
  - policy-enforcement.md
  - security.md
  - ../17-experimentation-and-evaluation/risk-weighted-error-taxonomies.md
historical_context: false
last_reviewed: 2026-07-21
---

# Risk Classification

Risk classification sorts an AI use case by potential harm, autonomy, domain, data sensitivity, reversibility, and exposure. It determines the required evidence for [compliance](compliance.md), [human oversight](human-oversight.md), security review, monitoring, and [auditability](auditability.md). The unit is the use case, not the model architecture.

## A classification record

A classification record should be short enough to complete but specific enough to trigger controls:

```yaml
system: hiring_screening_ranker
decision_impact: employment_opportunity
autonomy: recommendation_to_human_reviewer
personal_data: resumes, work_history, inferred_skills
affected_users: applicants
reversibility: limited_after_rejection_notice
jurisdictions: ["EU", "US"]
classification:
  eu_ai_act: high_risk_candidate_employment_context
  internal: tier_3_high_impact
required_controls:
  - fairness_evaluation
  - data_governance_review
  - human_oversight
  - audit_logging
  - appeal_process
```

For contrast, an internal product-title generator may still need [policy enforcement](policy-enforcement.md) and [security](security.md) controls, but it usually does not require the same fairness, appeal, and regulated-decision evidence as employment screening.

## Sourced artifact

The EU AI Act uses a risk-based structure that includes prohibited practices, high-risk systems, and other transparency or general obligations. NIST AI RMF is not a law, but it gives a complementary operating model: map context, measure risks, manage responses, and govern the process. A practical classifier can combine both:

| Question                                                                                            | If yes, likely control               |
| --------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Is the use prohibited by law or internal policy?                                                    | Do not launch                        |
| Is it in a high-impact domain such as employment, education, credit, health, or essential services? | High-risk review                     |
| Does it use sensitive or personal data?                                                             | [Privacy](privacy.md) and PII review |
| Can it act externally through tools?                                                                | Agency and authorization review      |
| Can users appeal or reverse the outcome?                                                            | Oversight and dispute process        |

## Caveats

Classification can go stale. A low-risk prototype becomes high-risk when connected to customer records, tools, or regulated workflows. Reclassify on major [model and knowledge base changes](governance-of-model-and-knowledge-base-changes.md), geography expansion, new data categories, or a shift from advice to automated action.

## References

- [EUR-Lex: Regulation (EU) 2024/1689, Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)

> [!nav]
> **Section** — [Responsible AI, Safety, and Governance](index.md)
>
> [← Auditability](auditability.md) [Human Oversight →](human-oversight.md)
