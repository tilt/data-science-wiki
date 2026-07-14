---
title: API Design
slug: software-engineering/api-design
description: Design principles for stable service and tool interfaces in data and AI systems.
area: software-engineering
topics:
  - "api-design"
  - "interfaces"
  - "tool-schemas"
level: intermediate
status: review
page_type: concept
aliases:
  - "Interface design"
prerequisites:
  - "software-architecture.md"
related:
  - "web-backends.md"
  - "production-integration.md"
  - "software-architecture.md"
  - "testing.md"
  - "../11-generative-ai/tool-use-and-function-calling.md"
  - "../11-generative-ai/structured-output.md"
  - "../14-ml-engineering-and-mlops/model-serving.md"
historical_context: false
last_reviewed: 2026-07-11
---
# API Design

API design is the discipline of making a software boundary explicit enough that clients can depend on it. In AI systems the boundary may be an HTTP endpoint, a Python package function, a model-serving request, or a tool schema used by [tool use and function calling](../11-generative-ai/tool-use-and-function-calling.md). A good API says what fields mean, what errors are stable, which operations are idempotent, and which changes require a version.

## Contract Mechanism

The contract has four layers: resource model, request schema, response schema, and error model. HTTP APIs usually express this through OpenAPI paths, methods, status codes, media types, and JSON schemas. Internal Python APIs can use typed dataclasses or Pydantic models, but the same rule applies: invalid input should fail at the boundary, before it reaches business logic or [model serving](../14-ml-engineering-and-mlops/model-serving.md).

## Executed Artifact

```python
from typing import Literal
from pydantic import BaseModel, ConfigDict, ValidationError

class TicketTriageRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    ticket_id: str
    language: Literal["en", "de", "fr"]
    priority: Literal["low", "normal", "urgent"] = "normal"
    trace_id: str

valid = TicketTriageRequest.model_validate(
    {"ticket_id": "T-1042", "language": "de", "trace_id": "tr-7"}
)
print(valid.model_dump())
print(TicketTriageRequest.model_json_schema()["required"])
try:
    TicketTriageRequest.model_validate(
        {"ticket_id": "T-1042", "language": "es", "trace_id": "tr-7", "debug": True}
    )
except ValidationError as exc:
    print([(err["loc"], err["type"]) for err in exc.errors()])
```

Observed output:

```text
{'ticket_id': 'T-1042', 'language': 'de', 'priority': 'normal', 'trace_id': 'tr-7'}
['ticket_id', 'language', 'trace_id']
[(('language',), 'literal_error'), (('debug',), 'extra_forbidden')]
```

This tiny contract gives [web backends](web-backends.md) a concrete request boundary, gives [testing](testing.md) stable failure cases, and gives [production integration](production-integration.md) trace IDs for incident correlation. The `extra="forbid"` choice is deliberate: accepting unknown fields can hide client bugs and make versioning ambiguous.

## Versioning And Errors

Additive response fields are usually compatible; changing meanings, removing fields, or changing error codes is not. Prefer typed errors such as `invalid_request`, `not_authorized`, `schema_validation_failed`, and `upstream_timeout` over plain strings. HTTP problem details, OpenAPI schemas, and [structured output](../11-generative-ai/structured-output.md) all serve the same practical goal: make machine-facing contracts parseable instead of relying on prose.

## References

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [Pydantic documentation: JSON Schema](https://pydantic.dev/docs/validation/latest/concepts/json_schema/)
