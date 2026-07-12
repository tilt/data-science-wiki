---
title: How does a model know which tool to use?
slug: interview-preparation/how-model-knows-which-tool-to-use
description: Interview prompt that links to the canonical tool-use and function-calling topic page.
area: interview-preparation
topics:
  - "interview-question"
  - "generative-ai"
  - "tool-use"
level: intermediate
status: review
page_type: interview-question
aliases:
  - "Tool selection"
  - "Function calling tool routing"
prerequisites:
  - "../10-generative-ai/tool-use-and-function-calling.md"
related:
  - "../10-generative-ai/tool-use-and-function-calling.md"
  - "../10-generative-ai/tool-routing.md"
  - "../10-generative-ai/tool-schemas.md"
  - "../10-generative-ai/structured-output.md"
  - "../10-generative-ai/agent-loops.md"
  - answer-patterns.md
  - generative-ai.md
historical_context: false
last_reviewed: 2026-07-11
---
# How does a model know which tool to use?

## Answer

A model does not have private access to tools. The application gives it tool names, descriptions, and schemas in the prompt or API request; the model then predicts either a normal answer or a structured tool call. Application code still validates arguments, checks permissions, executes the tool, handles failures, and returns the result.

## What a strong answer adds

1. Tool choice is part of decoding: the model sees a tool contract and emits a structured action when that is more likely than answering directly.
2. [Tool schemas](../10-generative-ai/tool-schemas.md) reduce ambiguity by specifying names, argument types, required fields, and descriptions.
3. [Tool routing](../10-generative-ai/tool-routing.md) can be model-driven, rule-based, or hybrid; the important contract is the route, arguments, confidence, and confirmation policy.
4. [Structured output](../10-generative-ai/structured-output.md) is not the same as execution. A syntactically valid call can still be unauthorized, unsafe, stale, or semantically wrong.
5. The surrounding [agent loop](../10-generative-ai/agent-loops.md) decides whether to retry, ask a clarifying question, fall back to retrieval, or stop.

## Interview artifact

For a travel assistant, expose only these tools:

```json
[
  {"name": "search_flights", "arguments": {"origin": "string", "destination": "string", "date": "YYYY-MM-DD"}},
  {"name": "lookup_policy", "arguments": {"topic": "string"}}
]
```

If the user asks, "Can I fly from Berlin to Lisbon next Friday with a carry-on?", a good answer says the model may call `search_flights` for availability and `lookup_policy` for baggage rules, but it must not book anything unless the application exposes a booking tool and the user confirms. This is the production boundary the canonical [tool use and function calling](../10-generative-ai/tool-use-and-function-calling.md) page emphasizes.

## Common follow-ups

- **"Can prompt wording fix bad tool calls?"** It helps, but overlapping tool descriptions and weak schemas still cause routing errors.
- **"Who enforces safety?"** The application, through permissions, allow-lists, confirmations, idempotency keys, rate limits, logging, and sandboxing.
- **"How do you evaluate it?"** Use held-out requests with expected direct answers, expected tool calls, expected refusals, malformed arguments, and adversarial retrieved content.

## Canonical links

Use [Generative AI](generative-ai.md) for the interview map and [Answer Patterns](answer-patterns.md) for the spoken structure. Read the deeper concept pages on [tool use and function calling](../10-generative-ai/tool-use-and-function-calling.md), [tool routing](../10-generative-ai/tool-routing.md), and [tool schemas](../10-generative-ai/tool-schemas.md).

## References

- [OpenAI API documentation: Function calling](https://developers.openai.com/api/docs/guides/function-calling)
- [OpenAI API documentation: Using tools](https://developers.openai.com/api/docs/guides/tools)
