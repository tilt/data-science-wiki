---
title: PII Protection
slug: generative-ai/pii-protection
description: "Detecting, redacting, minimizing, and controlling personally identifiable information in model workflows."
area: generative-ai
topics:
  - pii-protection
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-privacy.md
  - guardrails.md
  - prompt-injection.md
  - structured-output.md
  - memory.md
historical_context: false
last_reviewed: 2026-07-11
---
# PII Protection

PII protection reduces exposure of personal data in prompts, retrieval, logs, [memory](memory.md), and outputs. It is a control inside broader [data privacy](data-privacy.md) and [guardrails](guardrails.md), not a guarantee by itself.

## Mechanism

A practical pipeline classifies fields, redacts or masks high-risk patterns, minimizes context, and enforces permissions before [tool use](tool-use-and-function-calling.md). Deterministic recognizers catch common emails, phone numbers, and card-shaped strings. Model classifiers may help with free-form sensitive text, but they should not be the only control for regulated fields.

Use the least destructive control that satisfies the privacy requirement. Some tasks need redaction before the model call. Others should keep private fields out of the prompt and fetch them through a permissioned tool only when needed. Logs should avoid raw prompts unless the retention and access policy explicitly allows them.

## Worked redaction example

Before sending support text to a model, deterministic recognizers can replace high-risk fields with typed placeholders:

| input span | recognizer | replacement |
|---|---|---|
| `ana@example.com` | email pattern | `[EMAIL]` |
| `1234-5678-9012-3456` | card-shaped digit pattern | `[CARD]` |

The prompt fragment

```text
Email ana@example.com about acct 1234-5678-9012-3456.
```

becomes

```text
Email [EMAIL] about acct [CARD].
```

Typed placeholders preserve the task shape while removing direct identifiers. The example is intentionally narrow: deterministic rules are useful for structured PII, but they do not solve names, addresses, or context-dependent identifiers by themselves.

## Caveats

Regex misses names, addresses, and context-dependent identifiers. Redaction can break task quality, so systems may need permissioned tools instead of sending raw records to the model. Synthetic examples copied from production support tickets should still be treated as production data unless they have been de-identified.

## References

- [OpenAI platform documentation: Data controls](https://platform.openai.com/docs/guides/your-data)
- [NIST AI Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
