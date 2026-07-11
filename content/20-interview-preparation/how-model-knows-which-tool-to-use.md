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
historical_context: false
last_reviewed: 2026-07-11
---
# How does a model know which tool to use?

## Answer

The model receives tool names, descriptions, and schemas in context and generates a structured tool call when the distribution favors that action. The application validates arguments, enforces permissions, executes the external tool, handles errors, and passes results back to the model or agent loop.

## What a strong answer adds

1. The application provides available tools, descriptions, and JSON-like schemas.
2. The prompt or system policy tells the model when tool use is appropriate.
3. The model chooses between answering directly and emitting a structured tool call.
4. The application validates the call before executing anything.
5. Tool results are returned to the model or used directly by the application.

The model does not independently know whether a tool is safe, permitted, or correct. Tool execution is an application responsibility.

## Worked example

For a weather assistant, the model sees a `get_weather(location, date)` tool. If the user asks for tomorrow's forecast, the model emits a call with location and date. The application validates the date, calls the weather service, and returns the result. If the user asks for medical advice, the application should not expose or execute an unrelated tool just because the model could produce a plausible call.

## Common follow-ups

- Tool descriptions should be specific and non-overlapping.
- Schemas reduce ambiguity but do not replace validation.
- Permissions, rate limits, audit logging, and retries belong outside the model.

## Canonical concept

Read the topic page: [Tool Use and Function Calling](../10-generative-ai/tool-use-and-function-calling.md).
