---
title: Guardrails
slug: generative-ai/guardrails
description: "Runtime controls that block, shape, route, or escalate model behavior before and after generation."
area: generative-ai
topics:
  - guardrails
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - prompt-injection.md
  - structured-output.md
  - tool-schemas.md
  - langchain.md
  - langgraph.md
  - alignment.md
  - data-privacy.md
  - tool-use-and-function-calling.md
  - agent-evaluation.md
historical_context: false
last_reviewed: 2026-07-29
---

# Guardrails

Guardrails are runtime controls around a model. They include input filtering, [prompt injection](prompt-injection.md) defenses, [structured output](structured-output.md) validation, [tool schemas](tool-schemas.md), permission checks, output policy checks, and human escalation. They complement [alignment](alignment.md); they do not replace model training or product-level risk design.

A guardrail is useful when it has a clear risk, a clear enforcement point, and a clear failure action. A vague instruction such as "be safe" is not a guardrail; a server-side rule that blocks `issue_refund` without confirmation is.

## Where guardrails run

A guardrail pipeline can run before retrieval, before generation, before tool execution, and before final output. Deterministic checks should own hard constraints such as JSON schema validity, enum values, authorization, rate limits, and PII redaction. Model-based classifiers can triage ambiguous language, but their labels should be logged with confidence, policy version, and action taken.

Guardrails should be attached to the risk they control. A citation validator checks whether claims are supported by retrieved context. A tool gate checks whether a proposed call is allowed for the user and task. A privacy guard checks whether [data privacy](data-privacy.md) rules permit the data to enter the model call or leave the system.

In implementation, [LangChain](langchain.md) middleware can attach checks around model and tool calls, and [LangGraph](langgraph.md) can make high-risk gates explicit nodes or interrupts. The important design point is that guardrails enforce policy outside the model's prose.

## Guardrail types

| Guardrail                 | Runs where                                                    | Example failure action                               |
| ------------------------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| Input classification      | before retrieval or generation                                | refuse, ask clarification, or route to a safer flow. |
| Retrieval ACL filter      | before candidate retrieval and reranking                      | remove unauthorized documents.                       |
| Prompt-injection handling | before and after context construction                         | label untrusted text and restrict tool access.       |
| Schema validation         | before consuming model output                                 | retry once, then escalate or fail closed.            |
| Tool permission gate      | before [tool use](tool-use-and-function-calling.md) execution | block and log the attempted action.                  |
| Side-effect confirmation  | before irreversible actions                                   | ask user or human reviewer.                          |
| Output policy check       | before response is shown                                      | revise, redact, cite, abstain, or escalate.          |

The best guardrails are boring software checks. Model-based classifiers are useful for semantic ambiguity, but hard constraints should be deterministic whenever possible.

## A layered guardrail pipeline

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

This policy is testable because each check has a stage and a failure action. A production implementation should also include policy version, owner, telemetry fields, and examples of allowed and blocked cases.

## Realistic example

For a finance assistant, the user asks: "Refund order 52 and tell me the customer's full billing address." A layered system might:

1. classify the request as involving a side effect and personal data;
2. check whether the current user can access order 52;
3. expose `lookup_order` but not `issue_refund` until refund eligibility is confirmed;
4. redact billing-address fields unless the user has a business reason;
5. require confirmation before any refund tool executes;
6. log the blocked or confirmed path for [agent evaluation](agent-evaluation.md).

The guardrail is not one filter. It is a set of gates attached to the specific risks in the workflow.

## Caveats

Overbroad guardrails create false refusals and users route around them. Under-specified guardrails create theater: logs look safe while unsafe tools still execute. Guardrail quality should be evaluated with adversarial cases, benign edge cases, and production incident reviews, not only with happy-path demos. A guardrail that cannot be measured will decay as prompts, tools, and models change.

## References

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Cost and Latency Optimization](cost-and-latency-optimization.md) [Prompt Injection →](prompt-injection.md)
