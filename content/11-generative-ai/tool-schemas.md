---
title: Tool Schemas
slug: generative-ai/tool-schemas
description: "Machine-readable contracts for model-proposed external tool calls."
area: generative-ai
topics:
  - tool-schemas
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - tool-use-and-function-calling.md
  - structured-output.md
  - tool-routing.md
  - guardrails.md
  - agent-loops.md
historical_context: false
last_reviewed: 2026-07-20
---

# Tool Schemas

Tool schemas define the callable surface exposed to a model: tool name, description, argument object, required fields, allowed values, and sometimes side-effect warnings. They sit between model reasoning and application code. A model may propose a call, but the application owns validation, authorization, execution, and result handling.

## What a schema does

A useful schema does two jobs. First, it gives the model enough semantic guidance to choose the right tool and populate arguments. Second, it gives the runtime a deterministic validator before [tool use and function calling](tool-use-and-function-calling.md) reaches an external system. JSON Schema keywords such as `type`, `properties`, `required`, `enum`, and `additionalProperties` are directly relevant, but type validity is not permission. Permission checks belong in [guardrails](guardrails.md) and [tool routing](tool-routing.md).

## A bounded tool schema

```json
{
  "name": "search_refund_policy",
  "description": "Search approved refund-policy chunks visible to the current support agent.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "minLength": 3 },
      "policy_version": { "type": "string", "pattern": "^20[0-9]{2}-[0-9]{2}$" },
      "top_k": { "type": "integer", "minimum": 1, "maximum": 10 }
    },
    "required": ["query", "policy_version"],
    "additionalProperties": false
  }
}
```

The narrow name, bounded `top_k`, and explicit version make this safer than a generic `search(query: string)` tool. The schema still cannot decide whether the user is allowed to see a result; that check must run at execution time.

## Caveats

Vague tool names produce wrong calls. Broad string arguments move validation into fragile prose. Overly strict schemas can make legitimate tasks impossible, while overly permissive schemas let prompt injection steer tools toward unsafe side effects. Treat schema changes like API changes and test them with adversarial examples.

## References

- [OpenAI API documentation: Function calling](https://platform.openai.com/docs/guides/function-calling)
- [JSON Schema documentation: object](https://json-schema.org/understanding-json-schema/reference/object)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Tool Use and Function Calling](tool-use-and-function-calling.md) [Tool Routing →](tool-routing.md)
