---
title: Tool Schemas
slug: generative-ai/tool-schemas
description: "Machine-readable contracts for model-proposed external tool calls."
area: generative-ai
topics:
  - tool-schemas
level: intermediate
status: complete
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
  - langchain.md
  - prompt-injection.md
historical_context: false
last_reviewed: 2026-07-29
---

# Tool Schemas

Tool schemas define the callable surface exposed to a model: tool name, description, argument object, required fields, allowed values, and sometimes side-effect warnings. They sit between model reasoning and application code. A model may propose a call, but the application owns validation, authorization, execution, and result handling.

A schema is both model instruction and API contract. It should help the model choose correctly while giving the runtime something deterministic to reject.

## What a schema does

A useful schema does two jobs. First, it gives the model enough semantic guidance to choose the right tool and populate arguments. Second, it gives the runtime a deterministic validator before [tool use and function calling](tool-use-and-function-calling.md) reaches an external system. JSON Schema keywords such as `type`, `properties`, `required`, `enum`, and `additionalProperties` are directly relevant, but type validity is not permission. Permission checks belong in [guardrails](guardrails.md) and [tool routing](tool-routing.md).

[LangChain](langchain.md) uses tool schemas as part of its agent harness: the framework can expose callable functions to the model, but application code still owns the schema design and enforcement boundary.

## Schema design rules

| Rule                          | Why                                                               |
| ----------------------------- | ----------------------------------------------------------------- |
| Use narrow tool names         | `search_refund_policy` is safer than `search`.                    |
| Bound strings and numbers     | prevents huge queries, expensive searches, or invalid quantities. |
| Prefer enums for modes        | avoids free-form policy interpretation.                           |
| Require business identifiers  | makes missing tenant, version, or object ID fail early.           |
| Forbid extra fields           | blocks prompt-injected arguments from slipping through.           |
| Separate read and write tools | makes side-effect policy visible.                                 |
| Include side-effect metadata  | supports confirmation gates and audit logs.                       |

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

## Bad schema, better schema

Bad:

```json
{
  "name": "do_admin_task",
  "parameters": {
    "type": "object",
    "properties": {
      "task": { "type": "string" }
    }
  }
}
```

Better:

```json
{
  "name": "create_refund_draft",
  "description": "Create a non-final refund draft for an order visible to the current support agent. Does not submit payment.",
  "parameters": {
    "type": "object",
    "required": ["order_id", "amount_eur", "reason_code"],
    "properties": {
      "order_id": { "type": "string", "pattern": "^ord_[a-z0-9]+$" },
      "amount_eur": { "type": "number", "minimum": 0.01, "maximum": 5000 },
      "reason_code": { "type": "string", "enum": ["duplicate", "service_issue", "goodwill"] }
    },
    "additionalProperties": false
  },
  "side_effect": "draft_only"
}
```

The better schema names the business operation, bounds the amount, limits reason codes, prevents unknown fields, and makes the side-effect level explicit. The runtime still needs permission checks and confirmation before any final refund.

## Testing schemas

Test tool schemas with positive examples, missing required fields, unknown fields, boundary values, malicious strings, and confusingly similar tools. Also test natural-language requests that should _not_ call the tool. Schema quality is measured by both valid-call success and invalid-call rejection.

## Caveats

Vague tool names produce wrong calls. Broad string arguments move validation into fragile prose. Overly strict schemas can make legitimate tasks impossible, while overly permissive schemas let [prompt injection](prompt-injection.md) steer tools toward unsafe side effects. Treat schema changes like API changes and test them with adversarial examples.

## References

- [OpenAI API documentation: Function calling](https://platform.openai.com/docs/guides/function-calling)
- [JSON Schema documentation: object](https://json-schema.org/understanding-json-schema/reference/object)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Tool Use and Function Calling](tool-use-and-function-calling.md) [Tool Routing →](tool-routing.md)
