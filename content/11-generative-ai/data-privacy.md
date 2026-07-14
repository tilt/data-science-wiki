---
title: Data Privacy
slug: generative-ai/data-privacy
description: "Controls for what data enters prompts, retrieval, memory, logs, tools, and generated outputs."
area: generative-ai
topics:
  - data-privacy
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - pii-protection.md
  - prompt-injection.md
  - guardrails.md
  - memory.md
  - tool-use-and-function-calling.md
historical_context: false
last_reviewed: 2026-07-11
---

# Data Privacy

Data privacy in generative systems is a boundary problem. Sensitive data can leak through prompts, [memory](memory.md), retrieval indexes, [tool use](tool-use-and-function-calling.md), logs, citations, or generated outputs. [PII protection](pii-protection.md) is one control, not the whole privacy program.

## Mechanism

A privacy contract should define data classes, allowed processors, retention windows, access filters, redaction rules, and logging policy before model calls. Retrieval should apply permissions before ranking. Tools should fetch private records only after user authorization. Prompt and response logs should store the minimum needed for debugging and evaluation.

[Prompt injection](prompt-injection.md) matters because retrieved text can ask the model to reveal hidden data. Privacy controls should therefore be enforced outside the model: access checks, field-level filtering, redaction, audit logs, and deletion workflows.

## Concrete artifact

```yaml
fields:
  employee_salary:
    send_to_model: false
    retrieval_filter: manager_only
  support_ticket_text:
    send_to_model: true
    redact: [email, phone, card]
  account_id:
    send_to_model: true
    transform: stable_hash
logs:
  store_raw_prompts: false
  retention_days: 30
  access: security_and_eval_team
```

This policy is enforceable outside the model and testable with fixtures. A model instruction that says "do not reveal salaries" is not enough if salary fields are still retrieved and placed in context.

## Caveats

Summaries can still contain personal data. Synthetic examples copied from production tickets are production data unless de-identified. Redaction can break downstream retrieval or citation if identifiers are removed inconsistently, so privacy controls should be tested with realistic workflows.

## References

- [OpenAI platform documentation: Data controls](https://platform.openai.com/docs/guides/your-data)
- [NIST AI Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
