---
title: Structured Output
slug: generative-ai/structured-output
description: "Constrained model responses that match a machine-readable schema."
area: generative-ai
topics:
  - structured-output
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - tool-schemas.md
  - tool-use-and-function-calling.md
  - guardrails.md
  - prompting.md
  - model-serving.md
historical_context: false
last_reviewed: 2026-07-11
---
# Structured Output

Structured output asks the model to return data in a parseable shape, usually JSON matching a schema. It is essential when output feeds [tool use](tool-use-and-function-calling.md), databases, workflows, or [model serving](model-serving.md) validators.

## Mechanism

The schema defines fields, types, required keys, enums, and whether extra properties are allowed. Generation can be constrained by the provider, but applications should still validate the parsed object. [Tool schemas](tool-schemas.md) use the same idea for model-proposed tool calls.

## Executed artifact

```python
schema_required = {"merchant": str, "total": float, "currency": str}
records = [
    {"merchant": "Miro Cafe", "total": 12.4, "currency": "EUR"},
    {"merchant": "Miro Cafe", "total": "12.40"},
]
print("SCHEMA_VALIDATION")
for record in records:
    valid = all(key in record and isinstance(record[key], typ) for key, typ in schema_required.items())
    print(record, "valid", valid)
```

Observed output:

```text
SCHEMA_VALIDATION
{'merchant': 'Miro Cafe', 'total': 12.4, 'currency': 'EUR'} valid True
{'merchant': 'Miro Cafe', 'total': '12.40'} valid False
```

The first record passes because all three required keys are present with the expected Python types. The second record fails both parts of the contract: `total` is the string `"12.40"` instead of a float, and `currency` is missing, so parseable JSON would still be rejected by schema validation.

## Caveats

Valid JSON can still be semantically wrong. Validate against source evidence and business rules, not only syntax.

## References

- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [JSON Schema documentation: object](https://json-schema.org/understanding-json-schema/reference/object)
- [OpenAI API documentation: Function calling](https://platform.openai.com/docs/guides/function-calling)
