---
title: Tool Routing
slug: generative-ai/tool-routing
description: "Choosing whether to answer directly or call a specific tool."
area: generative-ai
topics:
  - tool-routing
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - tool-use-and-function-calling.md
  - tool-schemas.md
  - agent-loops.md
  - planning.md
  - guardrails.md
historical_context: false
last_reviewed: 2026-07-17
---

# Tool Routing

Tool routing decides whether a request should be answered directly, sent to retrieval, or handled by an external tool. In [agent loops](agent-loops.md), routing connects [planning](planning.md) to [tool use and function calling](tool-use-and-function-calling.md).

## Mechanism

Routing can be rule-based, model-based, or hybrid. The route should include tool name, arguments, confidence, and required confirmation. [Tool schemas](tool-schemas.md) validate arguments, while [guardrails](guardrails.md) enforce permissions and side-effect policy.

## Routing approaches

| Approach    | How the route is chosen                | Best when                                   |
| ----------- | -------------------------------------- | ------------------------------------------- |
| Rule-based  | keyword, pattern, or intent classifier | few tools; high-stakes or regulated routing |
| Model-based | the model selects a tool from schemas  | many tools; open-ended requests             |
| Hybrid      | rules gate, model chooses within scope | most production systems                     |

A safe default is hybrid: deterministic rules decide what is _allowed_ (permissions, side-effect confirmation) and the model chooses _which_ allowed tool fits — so a routing mistake can never exceed the caller's authorization.

## Worked routing table

| User request                 | Intent signal         | Route           | Required argument check                          |
| ---------------------------- | --------------------- | --------------- | ------------------------------------------------ |
| `weather in Berlin`          | Weather lookup        | `get_weather`   | Location is present.                             |
| `refund order 52`            | Side-effecting refund | `create_refund` | Order ID and user authorization must be checked. |
| `what is your return policy` | Policy question       | `search_docs`   | Query can be answered from documentation.        |

The table maps three inputs to distinct tools: weather lookup, refund creation, and document search. That is the contract a model router must satisfy too: choose the route from the user's intent, then provide arguments that match the selected tool's schema.

## Caveats

Similar tool descriptions cause wrong calls. Never let a model route to tools the user is not authorized to use.

## References

- [OpenAI API documentation: Using tools](https://platform.openai.com/docs/guides/tools)
- [OpenAI API documentation: Function calling](https://platform.openai.com/docs/guides/function-calling)
- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Tool Schemas](tool-schemas.md) [Agent Loops →](agent-loops.md)
