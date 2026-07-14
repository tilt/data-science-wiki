---
title: Responsible AI, Safety, and Governance
slug: 18-responsible-ai-safety-and-governance
description: "Governance, safety, privacy, security, fairness, and compliance controls for AI systems."
area: responsible-ai-safety-and-governance
topics:
  - factual-correctness
  - hallucinations
  - privacy
  - pii-leakage
  - security
  - prompt-injection
  - compliance
  - auditability
  - explainability
  - fairness
  - policy-enforcement
  - human-oversight
level: foundational
status: review
page_type: area-index
aliases:
  - "Responsible AI, Safety, and Governance"
prerequisites:
  - ../11-generative-ai/index.md
  - ../14-ml-engineering-and-mlops/index.md
related:
  - ../17-experimentation-and-evaluation/index.md
  - ../11-generative-ai/guardrails.md
  - ../14-ml-engineering-and-mlops/ml-system-lifecycle.md
historical_context: false
last_reviewed: 2026-07-11
---
# Responsible AI, Safety, and Governance

This section covers the controls that make AI behavior testable, reviewable, and governable: factuality, privacy, security, fairness, oversight, compliance, audit evidence, and release governance.

## Control Map

Responsible AI work is not a separate review at the end of a project. It maps risks to controls throughout the system lifecycle:

| Risk family | Typical failure | Primary controls |
| --- | --- | --- |
| Factuality | The system answers with unsupported or stale claims. | [Factual Correctness](factual-correctness.md), [Hallucinations](hallucinations.md), [Error Taxonomies](error-taxonomies.md), and [RAG Evaluation](../11-generative-ai/rag-evaluation.md). |
| Privacy | Prompts, outputs, logs, or retrieved context expose sensitive data. | [Privacy](privacy.md), [PII Leakage](pii-leakage.md), and [Policy Enforcement](policy-enforcement.md). |
| Security | Users or retrieved content steer the model into unsafe tool use. | [Security](security.md), [Prompt Injection](prompt-injection.md), and [Adversarial Evaluation](adversarial-evaluation.md). |
| Fairness and accountability | Performance differs across groups or decisions cannot be explained. | [Fairness](fairness.md), [Explainability](explainability.md), and [Auditability](auditability.md). |
| Release governance | Model, prompt, or knowledge-base changes ship without traceable approval. | [Risk Classification](risk-classification.md), [Compliance](compliance.md), [Human Oversight](human-oversight.md), and [Governance of Model and Knowledge Base Changes](governance-of-model-and-knowledge-base-changes.md). |

For deployed systems, connect these controls to [ML system lifecycle](../14-ml-engineering-and-mlops/ml-system-lifecycle.md) practices: versioned artifacts, approval gates, monitored metrics, incident response, and rollback plans.

## LLM Safety

- [Factual Correctness](factual-correctness.md)
- [Hallucinations](hallucinations.md)
- [Prompt Injection](prompt-injection.md)
- [Adversarial Evaluation](adversarial-evaluation.md)
- [Error Taxonomies](error-taxonomies.md)

## Privacy and Security

- [Privacy](privacy.md)
- [PII Leakage](pii-leakage.md)
- [Security](security.md)
- [Policy Enforcement](policy-enforcement.md)

## Fairness and Explanations

- [Fairness](fairness.md)
- [Explainability](explainability.md)

## Governance

- [Risk Classification](risk-classification.md)
- [Compliance](compliance.md)
- [Auditability](auditability.md)
- [Human Oversight](human-oversight.md)
- [Governance of Model and Knowledge Base Changes](governance-of-model-and-knowledge-base-changes.md)

> **Learning path — Generative AI systems:** ← [RAG Evaluation](../11-generative-ai/rag-evaluation.md) · [path overview](../00-home-and-navigation/learning-paths.md#generative-ai-systems)
