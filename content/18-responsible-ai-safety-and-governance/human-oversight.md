---
title: Human Oversight
slug: responsible-ai-safety-and-governance/human-oversight
description: "Human review patterns that can detect, stop, or reverse AI system failures."
area: responsible-ai-safety-and-governance
topics:
  - human-oversight
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - risk-classification.md
  - compliance.md
  - auditability.md
  - policy-enforcement.md
  - fairness.md
  - ../14-ml-engineering-and-mlops/human-in-the-loop-systems.md
historical_context: false
last_reviewed: 2026-07-11
---

# Human Oversight

Human oversight defines when people review, approve, override, stop, or appeal AI-assisted outcomes. It is only meaningful if the human has authority, time, evidence, and a clear decision boundary. Otherwise it becomes a rubber stamp attached to [risk classification](risk-classification.md) rather than a real control.

## Control mechanism

The EU AI Act's high-risk system requirements include human oversight, and OWASP's agent guidance also recommends human approval for high-impact actions. A practical oversight matrix looks like this:

| Risk/action                      | Automation         | Human role                      | Evidence shown                                              |
| -------------------------------- | ------------------ | ------------------------------- | ----------------------------------------------------------- |
| Low-risk routing                 | Automatic          | Retrospective sampling          | Input, route, confidence, error label                       |
| Benefit denial recommendation    | Human-in-the-loop  | Must approve before user impact | Policy text, source data, reason codes, model confidence    |
| Tool action with external effect | Human approval     | Confirm before send/delete/pay  | Requested tool, arguments, recipient, policy decision       |
| Incident or appeal               | Human review board | Override and corrective action  | Audit trail, similar cases, [fairness](fairness.md) metrics |

The page for [human-in-the-loop systems](../14-ml-engineering-and-mlops/human-in-the-loop-systems.md) covers operational design; here the governance focus is whether the review changes outcomes and leaves evidence in [auditability](auditability.md).

## Sourced artifact

```yaml
oversight_gate: high_impact_denial_recommendation
legal_mapping: EU_AI_Act_Article_14_human_oversight
reviewer_requirements:
  - domain_training_completed
  - can_view_relevant_evidence
  - can_override_model_recommendation
  - must_record_override_reason
automation_limits:
  - no_final_denial_without_review
  - no_batch_approval_above_daily_quota
  - escalate_low_confidence_or_policy_conflict
```

This control also supports [compliance](compliance.md): it turns a legal or policy expectation into a concrete release gate.

## Caveats

Humans are poor safety controls when they see too many alerts, lack context, or face productivity pressure. Measure override rate, time per review, error catch rate, appeal outcomes, and reviewer disagreement. If reviewers cannot detect the targeted failure, improve the model, interface, or [policy enforcement](policy-enforcement.md) rather than adding more nominal review.

## References

- [EUR-Lex: Regulation (EU) 2024/1689, Artificial Intelligence Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [OWASP LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
