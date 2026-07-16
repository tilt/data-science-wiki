---
title: Security
slug: responsible-ai-safety-and-governance/security
description: "Threat modeling and controls for AI models, data, tools, prompts, and outputs."
area: responsible-ai-safety-and-governance
topics:
  - security
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - prompt-injection.md
  - pii-leakage.md
  - policy-enforcement.md
  - adversarial-evaluation.md
  - privacy.md
  - ../11-generative-ai/tool-use-and-function-calling.md
historical_context: false
last_reviewed: 2026-07-11
---

# Security

AI security protects models, data, prompts, tools, outputs, and users from misuse or compromise. It includes ordinary application security plus AI-specific risks: [prompt injection](prompt-injection.md), data poisoning, model extraction, sensitive information disclosure, excessive agency, unsafe tool use, and corrupted retrieval content.

## Threat model

A practical AI threat model starts with assets and trust boundaries:

```yaml
assets:
  - user_personal_data
  - system_prompts
  - model_weights_or_provider_credentials
  - retrieval_corpus
  - tool_tokens
  - audit_logs
attack_paths:
  - indirect_prompt_injection_from_retrieved_document
  - overprivileged_tool_call
  - sensitive_data_in_logs
  - poisoned_knowledge_base_update
  - exposed_model_endpoint_abuse
controls:
  - least_privilege_tool_tokens
  - retrieval_authorization_filter
  - output_validation
  - dependency_and_model_supply_chain_review
  - adversarial_regression_suite
```

This artifact links security directly to [policy enforcement](policy-enforcement.md), [PII leakage](pii-leakage.md), [privacy](privacy.md), and [adversarial evaluation](adversarial-evaluation.md). The model is one component; the security boundary must be outside it.

## Sourced artifact

OWASP's 2025 LLM Top 10 includes prompt injection, sensitive information disclosure, supply-chain risk, data/model poisoning, improper output handling, excessive agency, system prompt leakage, vector/embedding weaknesses, misinformation, and unbounded consumption. NIST's Generative AI Profile similarly calls for evaluating security and resilience, including threats such as data breaches, compromised dependencies, model theft, inference, bypass, and extraction.

## Caveats

Security fails when teams grant an agent broad credentials "temporarily," store secrets in prompts, or let retrieved text determine tool calls. Do not rely on model compliance for authorization. Apply normal controls first: authentication, authorization, secret management, network isolation, rate limits, logging, incident response, and change review for [model and knowledge base changes](governance-of-model-and-knowledge-base-changes.md).

## References

- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI 600-1: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [NIST AI 100-2: Adversarial Machine Learning taxonomy](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-2e2023.pdf)

> **Section — [Responsible AI, Safety, and Governance](index.md):** ← [Prompt Injection](prompt-injection.md) · [Privacy](privacy.md) →
