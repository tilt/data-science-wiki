---
title: Model Serving
slug: generative-ai/model-serving
description: "Runtime infrastructure for reliable model calls, streaming, batching, routing, validation, and observability."
area: generative-ai
topics:
  - model-serving
level: intermediate
status: complete
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - local-versus-hosted-models.md
  - quantization.md
  - cost-and-latency-optimization.md
  - determinism-and-reproducibility.md
  - structured-output.md
  - tool-use-and-function-calling.md
  - guardrails.md
historical_context: false
last_reviewed: 2026-07-29
---

# Model Serving

Model serving is the runtime layer that turns application requests into model responses. It handles routing, rate limits, streaming, batching, retries, fallbacks, validation, and observability across [local versus hosted models](local-versus-hosted-models.md). For generative systems, serving also coordinates prompts, tools, schemas, safety checks, and cost controls.

## The serving path

A serving path typically runs request normalization, policy checks, [context construction](context-construction.md), model selection, model call, streaming or full decode, [structured output](structured-output.md) validation, logging, and retry or fallback. Local serving adds scheduler choices such as batching, KV-cache reuse, [quantization](quantization.md), and GPU memory management. Hosted serving adds provider rate limits, network latency, data-retention policy, and vendor-specific request features.

```mermaid
flowchart TD
  Request[Application request] --> Normalize[Request normalization and policy checks]
  Normalize --> Context[Context construction]
  Context --> Select[Model selection]
  Select --> Call[Model call: streaming or full decode]
  Call --> Validate[Structured-output validation]
  Validate --> Respond[Log and return response]
  Validate --> Fallback[Retry or fall back to another model]
  Fallback --> Call
```

The serving layer should log enough to reproduce and debug behavior without storing sensitive prompts unnecessarily: model identifier, prompt or context hash, tool versions, schema version, token counts, latency, retry count, validation result, and final status.

## Serving concerns

| Concern        | Why it matters                                                                   |
| -------------- | -------------------------------------------------------------------------------- |
| Model routing  | choose the cheapest model that satisfies quality, latency, and policy.           |
| Streaming      | improves perceived latency but complicates moderation and schema validation.     |
| Batching       | improves throughput for local models but can increase tail latency.              |
| KV cache reuse | reduces repeated prefill cost in multi-turn or shared-prefix workloads.          |
| Rate limits    | prevent provider or GPU overload and give callers predictable failures.          |
| Retries        | recover transient failures but must not duplicate side effects.                  |
| Validation     | blocks malformed [structured output](structured-output.md) and unsafe responses. |
| Observability  | explains regressions when prompts, models, tools, or indexes change.             |

## A serving route

```yaml
route: support_answer_v3
model_policy:
  primary: hosted_reasoning_model
  fallback: smaller_hosted_model
  timeout_ms: 12000
  max_retries: 1
validation:
  response_schema: support_answer.schema.json
  on_schema_fail: retry_once_then_escalate
observability:
  log_fields:
    [model, prompt_hash, context_hash, input_tokens, output_tokens, latency_ms, validator_result]
```

This record supports [determinism and reproducibility](determinism-and-reproducibility.md): if an answer changes, the team can tell whether the model, prompt, context, schema, or serving route changed.

## Realistic route design

A support product might use three routes:

- `support_fast`: small model, no tools, for simple FAQ answers.
- `support_grounded`: stronger model with retrieval and citation validation.
- `support_action`: tool-enabled route with confirmation gates and audit logs.

The route is part of product behavior. Sending an action request through `support_fast` is a bug even if the model answers politely. Sending a simple FAQ through the action route may waste latency and cost. Serving should make the allowed route explicit and observable.

## SLOs and degradation

Serving needs service-level objectives: median latency, tail latency, timeout rate, schema-failure rate, fallback rate, and cost per successful task. Degradation should be deliberate. If retrieval is down, the system may answer only from general knowledge with a warning, or it may abstain for policy questions. If the primary model times out, a smaller fallback must be tested against the same schema and safety expectations.

## Caveats

Retries can duplicate side effects unless tool calls are idempotent. Fallback models may not satisfy the same schema, latency, or safety behavior. Streaming improves perceived latency but complicates validation because the application may need to buffer before showing or acting on unsafe partial output. Logs can become privacy liabilities if raw prompts and tool results are stored indiscriminately.

## References

- [OpenAI API documentation: Latency optimization](https://platform.openai.com/docs/guides/latency-optimization)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Local Versus Hosted Models](local-versus-hosted-models.md) [Quantization →](quantization.md)
