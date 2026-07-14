---
title: Governance of Model and Knowledge Base Changes
slug: responsible-ai-safety-and-governance/governance-of-model-and-knowledge-base-changes
description: "Release controls for model, prompt, policy, and retrieval-corpus changes."
area: responsible-ai-safety-and-governance
topics:
  - governance-of-model-and-knowledge-base-changes
level: advanced
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - auditability.md
  - policy-enforcement.md
  - compliance.md
  - risk-classification.md
  - adversarial-evaluation.md
  - ../14-ml-engineering-and-mlops/model-versioning.md
historical_context: false
last_reviewed: 2026-07-11
---

# Governance of Model and Knowledge Base Changes

Governance of model and knowledge base changes controls behavior changes that may bypass ordinary application-code review. A model swap, prompt edit, threshold move, retrieval-index refresh, tool schema change, or safety policy update can change user outcomes as much as a code deployment, so it needs the same level of evidence as [model versioning](../14-ml-engineering-and-mlops/model-versioning.md) and [auditability](auditability.md).

## Control mechanism

Change classes should determine evidence depth:

```yaml
change_id: ai_release_2026_07_11_004
class: medium_risk_behavior_change
artifact_changes:
  model: support_llm_v4.1 -> support_llm_v4.2
  retrieval_index: refund_policy_2026_06_01 -> refund_policy_2026_07_01
  prompt_policy: safety_policy_v18 -> safety_policy_v19
required_evidence:
  - golden_dataset_regression
  - adversarial_prompt_injection_suite
  - hallucination_and_grounding_review
  - privacy_and_pii_log_review
approvals:
  - product_owner
  - risk_owner
rollback:
  restore_model: support_llm_v4.1
  restore_index: refund_policy_2026_06_01
  restore_policy: safety_policy_v18
```

The rollback plan must include non-code artifacts. Restoring the old application container does not restore the old embedding model, retrieved corpus, or [policy enforcement](policy-enforcement.md) rule if those live in separate control planes.

## Sourced artifact

NIST AI RMF separates mapping, measuring, and managing risks across the AI lifecycle. A release record can mirror that:

| RMF function | Release evidence                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Map          | Intended use, affected users, data sources, deployment context                                                                        |
| Measure      | [Adversarial evaluation](adversarial-evaluation.md), [factual correctness](factual-correctness.md), fairness, privacy, security tests |
| Manage       | Go/no-go decision, risk treatment, monitoring owner, rollback plan                                                                    |
| Govern       | Approval policy, roles, versioned documentation, escalation path                                                                      |

## Caveats

Change governance fails when "content-only" updates are treated as harmless. A new benefits document can change eligibility answers; a new tool schema can expand agency; a prompt tweak can alter refusal behavior. Reclassify changes when the user population, jurisdiction, tool access, or decision impact changes.

## References

- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [NIST AI 600-1: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
