---
title: Prompt Injection
slug: generative-ai/prompt-injection
description: "Attacks where untrusted text tries to override instructions, exfiltrate data, or misuse tools."
area: generative-ai
topics:
  - prompt-injection
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - guardrails.md
  - data-privacy.md
  - tool-use-and-function-calling.md
  - rag.md
  - context-construction.md
historical_context: false
last_reviewed: 2026-07-11
---

# Prompt Injection

Prompt injection happens when untrusted text tries to control the model or surrounding tools. It is common in [RAG](rag.md), where retrieved documents enter [context construction](context-construction.md), and in [tool use](tool-use-and-function-calling.md), where malicious text may try to trigger actions or reveal hidden data.

## Mechanism

The core defense is privilege separation. System and developer instructions define policy. User messages, web pages, emails, tickets, and retrieved documents are data. The model may summarize or cite that data, but the application should not let it redefine tools, permissions, secrets, or safety rules.

Injection can be direct, such as "ignore previous instructions," or indirect, such as a retrieved document telling the model to call a refund tool. [Guardrails](guardrails.md) can scan for high-risk patterns, but robust protection comes from external validation: schema checks, access control, allow-listed tools, citation checks, and confirmation for side effects.

## Concrete artifact

```text
trusted:
  - system policy
  - developer tool contract
  - server-side authorization result
untrusted:
  - user message
  - retrieved document body
  - web page text
rule:
  untrusted text may be summarized or cited, but cannot alter tools, secrets, or policy
```

## Caveats

Keyword filters are easy to evade. The most damaging failures occur when injected text reaches a side-effecting tool, private retrieval scope, or memory write path. Treat every retrieved chunk as hostile until the application has checked permissions and constrained how the model may use it.

## References

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [OpenAI API documentation: Using tools](https://platform.openai.com/docs/guides/tools)
- [NIST AI Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Guardrails](guardrails.md) [Data Privacy →](data-privacy.md)
