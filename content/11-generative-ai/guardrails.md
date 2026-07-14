---
title: Guardrails
slug: generative-ai/guardrails
description: "Runtime controls that block, shape, route, or escalate model behavior before and after generation."
area: generative-ai
topics:
  - guardrails
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - prompt-injection.md
  - structured-output.md
  - tool-schemas.md
  - alignment.md
  - data-privacy.md
historical_context: false
last_reviewed: 2026-07-11
---

# Guardrails

Guardrails are runtime controls around a model. They include input filtering, [prompt injection](prompt-injection.md) defenses, [structured output](structured-output.md) validation, [tool schemas](tool-schemas.md), permission checks, output policy checks, and human escalation. They complement [alignment](alignment.md); they do not replace model training or product-level risk design.

## Mechanism

A guardrail pipeline can run before retrieval, before generation, before tool execution, and before final output. Deterministic checks should own hard constraints such as JSON schema validity, enum values, authorization, rate limits, and PII redaction. Model-based classifiers can triage ambiguous language, but their labels should be logged with confidence, policy version, and action taken.

Guardrails should be attached to the risk they control. A citation validator checks whether claims are supported by retrieved context. A tool gate checks whether a proposed call is allowed for the user and task. A privacy guard checks whether [data privacy](data-privacy.md) rules permit the data to enter the model call or leave the system.

## Concrete artifact

```yaml
input_checks:
  - pii_redaction
  - prompt_injection_scan
retrieval_checks:
  - acl_filter_before_search
tool_checks:
  - schema_validation
  - permission_check
  - confirmation_for_side_effects
output_checks:
  - json_schema
  - citation_support
  - refusal_policy
on_fail:
  high: block
  medium: human_review
  low: warn_and_log
```

## Caveats

Overbroad guardrails create false refusals and users route around them. Under-specified guardrails create theater: logs look safe while unsafe tools still execute. Guardrail quality should be evaluated with adversarial cases, benign edge cases, and production incident reviews, not only with happy-path demos.

## References

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
