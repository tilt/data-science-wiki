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
last_reviewed: 2026-07-11
---
# Tool Routing

Tool routing decides whether a request should be answered directly, sent to retrieval, or handled by an external tool. In [agent loops](agent-loops.md), routing connects [planning](planning.md) to [tool use and function calling](tool-use-and-function-calling.md).

## Mechanism

Routing can be rule-based, model-based, or hybrid. The route should include tool name, arguments, confidence, and required confirmation. [Tool schemas](tool-schemas.md) validate arguments, while [guardrails](guardrails.md) enforce permissions and side-effect policy.

## Executed artifact

```python
queries = ["weather in Berlin", "refund order 52", "what is your return policy"]
rules = [("weather", "get_weather"), ("refund", "create_refund"), ("return policy", "search_docs")]
print("TOOL_ROUTING")
for query in queries:
    route = next(tool for keyword, tool in rules if keyword in query)
    print(query, "->", route)
```

Observed output:

```text
TOOL_ROUTING
weather in Berlin -> get_weather
refund order 52 -> create_refund
what is your return policy -> search_docs
```

The deterministic router maps all three inputs to distinct tools: weather lookup, refund creation, and document search. That is the contract a model router must satisfy too: choose the route from the user's intent, then provide arguments that match the selected tool's schema.

## Caveats

Similar tool descriptions cause wrong calls. Never let a model route to tools the user is not authorized to use.

## References

- [OpenAI API documentation: Using tools](https://platform.openai.com/docs/guides/tools)
- [OpenAI API documentation: Function calling](https://platform.openai.com/docs/guides/function-calling)
- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)
