---
title: Tool Use and Function Calling
slug: generative-ai/tool-use-and-function-calling
description: Tool Use and Function Calling overview and practical notes.
area: generative-ai
topics:
  - "function-calling"
  - "tool-use"
  - "agentic-systems"
level: intermediate
status: draft
page_type: system-design
aliases: []
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "openai-function-calling-docs"
  - "openai-structured-outputs-docs"
---
# Tool Use and Function Calling

## Summary

An LLM does not execute tools internally. It generates a tool-call structure, typically a name plus arguments conforming to a schema. The application validates the call, executes external code, and sends the result back into the conversation or agent loop.

## Decision mechanism

Tool choice is conditioned on the prompt, tool names, tool descriptions, schemas, examples, and the model's training. At inference time, selecting a tool is token generation under constraints, not a symbolic guarantee that the tool is correct.

## Tool descriptions and schemas

A tool definition usually includes:

- a stable tool name,
- a natural-language description of when to use it,
- a machine-readable argument schema,
- type constraints, enums, and required fields,
- sometimes examples or policy instructions.

The schema serves two purposes. It tells the model what calls are available, and it gives the application a deterministic contract for validation.

## Prompt-level availability

The model can only choose tools that the application exposes in the current request or agent state. A calendar tool might be available in one workflow and absent in another. Tool availability is therefore an application policy decision, not a fixed model capability.

## Function-calling training and token generation

Modern tool-capable models are trained or adapted to emit structured tool calls when doing so is useful. At inference time, the model still generates tokens or structured output. The selected function name and arguments are the output of a probabilistic model conditioned on the conversation and tool definitions.

## Routing as probabilistic inference

The model does not "know" the best tool in a symbolic sense. It estimates, from context, whether a tool call is likely to satisfy the task. Similar tool descriptions, vague prompts, or underspecified schemas can produce wrong routing. For critical workflows, use rules, typed routers, or explicit confirmation gates.

## Agent loops

A basic agent loop is:

1. User asks for a task.
2. Application sends instructions, state, and available tool schemas to the model.
3. Model emits either a final answer or a tool call.
4. Application validates and executes the tool externally.
5. Tool result is returned to the model.
6. The loop repeats until completion, failure, or a policy limit.

Tool execution is outside the language model. The model requests; the application decides and executes.

## Error handling and retries

Production systems should handle invalid arguments, timeouts, permission failures, empty results, partial results, and non-idempotent side effects. Retries should be explicit and bounded. For side-effecting operations, use idempotency keys and confirmation steps.

## Parallel and sequential tool calls

Some tasks support parallel calls, such as fetching weather and calendar context independently. Other tasks require sequential calls, such as searching first and then retrieving a selected document. The orchestrator should decide which patterns are allowed.

## Production boundaries

Validate every argument, enforce permissions outside the model, apply idempotency where needed, log tool calls, and use explicit routers or rules when compliance, latency, or cost requires deterministic behavior.

## Concrete example

For "Find the latest invoice and email it to finance":

1. The model may request `search_documents(query="latest invoice")`.
2. The application validates that document search is allowed.
3. The application returns candidate documents.
4. The model selects a document and proposes `send_email`.
5. The application enforces permissions, asks for confirmation if needed, and executes the email tool.

The sensitive operation is guarded by application policy, not by model intent alone.

## When an explicit router is preferable

Use a separate router, rules engine, or workflow state machine when:

- tool choice has compliance consequences,
- latency or cost must be predictable,
- the tool set is large and specialized,
- user permissions vary by organization,
- the process is transactional,
- auditability matters more than flexible language reasoning.

## References

- Primary: OpenAI API documentation, Function calling.
- Primary: OpenAI API documentation, Structured outputs.
