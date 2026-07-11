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
  - "../10-generative-ai/tool-use-and-function-calling.md"
  - "../13-ml-engineering-and-mlops/model-serving.md"
historical_context: false
last_reviewed: 2026-07-11
references:
  - "openai-function-calling-docs"
---
# API Design

## Summary

API design defines how software components communicate. In AI systems, APIs often expose model serving, retrieval, evaluation, feature access, and tool execution.

## Design principles

- Make inputs and outputs explicit.
- Version contracts that downstream systems depend on.
- Use typed schemas for model tools and service requests.
- Validate arguments outside the model.
- Return structured errors that support retries and incident diagnosis.
- Separate user-facing language from machine-facing contracts.

## Step-by-step example

For an extraction service, define a request with document ID, task type, allowed fields, and trace ID. Define a response with extracted values, confidence, source spans, validation errors, and model version. Reject unknown fields, validate enum values, and return typed errors such as `invalid_request`, `source_unavailable`, or `schema_validation_failed`.

## Versioning and compatibility

Version an API when clients depend on field names, semantics, error codes, or latency expectations. Additive fields are usually safer than changing existing meanings. For ML services, include model or prompt version in metadata so downstream teams can debug regressions after rollout.

## AI-specific concerns

For LLM tools, the schema is part of the prompt and the runtime contract. The model may propose a call, but the application must enforce permissions, validate arguments, execute the tool, and decide whether to retry or escalate.

## Related topics

- [Tool Use and Function Calling](../10-generative-ai/tool-use-and-function-calling.md)
- [Structured Output](../10-generative-ai/structured-output.md)
- [Model Serving](../13-ml-engineering-and-mlops/model-serving.md)
