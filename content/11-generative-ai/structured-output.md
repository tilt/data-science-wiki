---
title: Structured Output
slug: generative-ai/structured-output
description: "Constrained model responses that match a machine-readable schema."
area: generative-ai
topics:
  - structured-output
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - tool-schemas.md
  - tool-use-and-function-calling.md
  - guardrails.md
  - langchain.md
  - langgraph.md
  - prompting.md
  - model-serving.md
historical_context: false
last_reviewed: 2026-07-28
---

# Structured Output

Structured output asks the model to return data in a parseable shape, usually JSON matching a schema. It is essential when output feeds [tool use](tool-use-and-function-calling.md), databases, workflows, or [model serving](model-serving.md) validators.

## What a schema constrains

The schema defines fields, types, required keys, enums, and whether extra properties are allowed. Generation can be constrained by the provider, but applications should still validate the parsed object. [Tool schemas](tool-schemas.md) use the same idea for model-proposed tool calls.

[LangChain](langchain.md) can request schema-bound final outputs from an agent, while [LangGraph](langgraph.md) often uses structured outputs as state updates or routing decisions between nodes. In both cases, schema validity is only the first check.

## Schema Example

```json
{
  "type": "object",
  "required": ["merchant", "total", "currency"],
  "properties": {
    "merchant": { "type": "string" },
    "total": { "type": "number" },
    "currency": { "type": "string", "enum": ["EUR", "USD", "GBP"] }
  },
  "additionalProperties": false
}
```

For the record `{"merchant":"Miro Cafe","total":12.4,"currency":"EUR"}`, all required fields are present, the amount is numeric, and the currency is allowed. The record `{"merchant":"Miro Cafe","total":"12.40"}` fails even though it is parseable JSON: `total` is a string, `currency` is missing, and a downstream payment or accounting system should reject it before business logic runs.

| Check                       | Catches                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------- |
| JSON parsing                | Broken syntax.                                                                      |
| Schema validation           | Missing fields, wrong types, invalid enums, unexpected fields.                      |
| Source-grounding validation | Values not supported by the input document.                                         |
| Business-rule validation    | Impossible totals, unsupported currencies, duplicate records, or policy violations. |

The last two checks are the reason schema validity is not enough: valid JSON can still be semantically wrong, and only source-grounding and business-rule validation catch a well-formed record that misreports reality.

## References

- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [JSON Schema documentation: object](https://json-schema.org/understanding-json-schema/reference/object)
- [OpenAI API documentation: Function calling](https://platform.openai.com/docs/guides/function-calling)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Determinism and Reproducibility](determinism-and-reproducibility.md) [RAG →](rag.md)
