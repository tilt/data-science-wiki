---
title: Privacy
slug: responsible-ai-safety-and-governance/privacy
description: "Data minimization, purpose limitation, retention, and access controls for AI systems."
area: responsible-ai-safety-and-governance
topics:
  - privacy
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - pii-leakage.md
  - security.md
  - compliance.md
  - auditability.md
  - fairness.md
  - ../11-generative-ai/data-privacy.md
historical_context: false
last_reviewed: 2026-07-23
---

# Privacy

Privacy governs how personal data is collected, used, exposed, retained, and deleted. In AI systems, the privacy boundary includes prompts, retrieved documents, embeddings, fine-tuning data, evaluation sets, logs, traces, human review queues, and vendor calls. The operational failure often appears as [PII leakage](pii-leakage.md), but the root cause is usually poor data-flow governance.

## GDPR principles as release checks

GDPR principles such as purpose limitation, data minimization, storage limitation, integrity/confidentiality, and data protection by design translate into concrete AI release checks:

```yaml
privacy_review: customer_support_assistant
purpose: answer authenticated user's support questions
allowed_personal_data:
  - current_account_status
  - open_ticket_metadata
excluded_by_default:
  - full_historical_chat_logs
  - payment_card_data
  - other_users_documents
retention:
  raw_prompts: 7_days_redacted
audit_event_ids: 2_years
embeddings: delete_on_source_document_deletion
high_risk_trigger:
  dpia_required: true
  reason: automated profiling_with_sensitive_support_history
```

This artifact makes [compliance](compliance.md) review concrete: each data element has a purpose, retention period, and access path. It also gives [auditability](auditability.md) a privacy-preserving schema instead of unlimited raw logs.

## AI-specific privacy risks

Embeddings can preserve sensitive semantic content even when raw documents are deleted. Retrieval can expose documents the user cannot otherwise access. Human evaluation sets can quietly become secondary data stores. Model improvement loops can move production prompts into training data unless the system has opt-out, retention, and deletion controls.

## Caveats

Privacy controls can conflict with debugging, fairness analysis, and abuse monitoring. The right response is not to keep everything forever; it is to define access tiers, redaction, aggregation, and approved review workflows. When protected-attribute data is needed for [fairness](fairness.md), document the purpose and limit access rather than pretending the attribute does not exist.

## References

- [EUR-Lex: Regulation (EU) 2016/679, General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)
- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [NIST SP 800-122: Guide to Protecting the Confidentiality of PII](https://csrc.nist.gov/pubs/sp/800/122/final)

> [!nav]
> **Section** — [Responsible AI, Safety, and Governance](index.md)
>
> [← Security](security.md) [PII Leakage →](pii-leakage.md)
