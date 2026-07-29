---
title: Tool Use and Function Calling
slug: generative-ai/tool-use-and-function-calling
description: "Model-proposed tool calls that application code validates, authorizes, executes, observes, and evaluates."
area: generative-ai
topics:
  - function-calling
  - tool-use
  - agentic-systems
  - orchestration
level: intermediate
status: complete
page_type: system-design
aliases:
  - Function Calling
  - Tool Use
prerequisites:
  - index.md
  - structured-output.md
related:
  - tool-schemas.md
  - tool-routing.md
  - agent-loops.md
  - agentic-systems.md
  - guardrails.md
  - prompt-injection.md
  - data-privacy.md
  - agent-evaluation.md
  - langchain.md
  - langgraph.md
  - ../16-software-engineering/api-design.md
historical_context: true
last_reviewed: 2026-07-29
---

# Tool Use and Function Calling

Tool use gives a language model access to capabilities that should not live in the model weights: retrieval, databases, calculators, code execution, tickets, calendars, payments, browsers, and business APIs. The model does not execute a function by magic. It emits a structured request - usually a tool name plus JSON arguments - and the surrounding application decides whether that request is valid, authorized, safe, and worth executing.

That separation is the core idea. The model proposes; the orchestrator disposes. [Tool schemas](tool-schemas.md) describe the callable surface, [tool routing](tool-routing.md) decides when a call is appropriate, [agent loops](agent-loops.md) repeat calls over multiple steps, and [guardrails](guardrails.md) enforce policy around the whole boundary.

## Mental model

A tool call is a typed control message, not an answer. The model is choosing an operation in a software system. That operation may read private data, mutate state, spend money, trigger external services, or return untrusted text. Treat it like an API request from an unreliable but useful planner.

![A language model proposes a tool call, the orchestrator validates and authorizes it, external systems execute outside the model, and the result returns as an observation.](../assets/diagrams/tool-use-execution-boundary.svg)

The plot draws the execution boundary explicitly. The model-side box is only a proposal: a tool name and arguments. The runtime-side boxes own schema validation, semantic bounds, permissions, side-effect policy, execution, and observation shaping. The return arrow carries data back to the model, not new authority; hard-stop conditions prevent the loop from continuing when validation, approval, or budget checks fail.

The safest systems keep three boundaries visible:

- **Schema boundary:** arguments must parse and match the declared shape.
- **Authority boundary:** the user, session, and application state must permit the operation.
- **Instruction boundary:** tool results are observations, not new system instructions.

Hosted tools blur the implementation detail because the provider may execute web search, file search, code execution, or computer-use actions on managed infrastructure. The same design rule still applies: the model chooses or requests an action, while a runtime outside the model enforces the execution contract and returns observations.

## Lifecycle of a tool call

Production tool use is a round trip with explicit checks:

1. **Expose tools:** select the tools available for this request, not every tool the product owns.
2. **Describe contracts:** pass names, descriptions, input schemas, and sometimes tool-choice constraints to the model.
3. **Model decision:** the model either answers directly, asks a clarification, or emits one or more tool calls.
4. **Parse and validate:** parse JSON, validate against the schema, reject unknown fields, normalize units, and cap ranges.
5. **Authorize:** check identity, tenant, object-level access, rate limits, and whether the user may perform this action now.
6. **Classify side effects:** separate read-only calls from mutating calls such as `send_email`, `create_refund`, or `delete_record`.
7. **Confirm when needed:** require human approval for irreversible, costly, regulated, or surprising actions.
8. **Execute outside the model:** call the API, database, sandbox, retriever, or workflow engine.
9. **Return an observation:** append a bounded result with provenance, call ID, status, and error information.
10. **Continue or stop:** let the model use the observation, or stop through deterministic rules such as max steps, failed checks, or budget limits.
11. **Trace and evaluate:** log enough metadata to replay failures without leaking secrets.

```mermaid
flowchart TD
  User[User request] --> Scope[Select allowed tools for this state]
  Scope --> Model[Model sees schemas and context]
  Model --> Decision{Decision}
  Decision --> Final[Final answer]
  Decision --> Clarify[Ask a clarification]
  Decision --> Call[Tool call: name plus arguments]
  Call --> Validate[Schema and semantic validation]
  Validate --> Auth[Authorization and policy checks]
  Auth --> Confirm{Side effect?}
  Confirm -->|needs approval| Human[Human confirmation]
  Confirm -->|read only| Execute[Execute outside model]
  Human --> Execute
  Execute --> Observation[Observation with provenance]
  Observation --> Model
```

## A concrete contract

The tool should be narrower than the backend API. A support assistant should not receive a generic `sql_query` or `http_request` tool if the real task is "find approved refund-policy text visible to this support agent."

```json
{
  "tool": {
    "name": "search_refund_policy",
    "description": "Search approved refund-policy chunks visible to the current support agent. Use for policy lookup only, not for issuing refunds.",
    "parameters": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "minLength": 3,
          "maxLength": 160
        },
        "policy_version": {
          "type": "string",
          "pattern": "^20[0-9]{2}-[0-9]{2}$"
        },
        "top_k": {
          "type": "integer",
          "minimum": 1,
          "maximum": 5
        }
      },
      "required": ["query", "policy_version"],
      "additionalProperties": false
    },
    "side_effect": "none",
    "auth_scope": "support.policy.read"
  }
}
```

The model can produce a valid call:

```json
{
  "name": "search_refund_policy",
  "arguments": {
    "query": "enterprise refund threshold approval",
    "policy_version": "2026-07",
    "top_k": 3
  }
}
```

But validity only means "well-formed." The orchestrator still checks the caller's tenant, support role, policy visibility, tool availability, rate limits, and whether the request is safe to answer. [Structured output](structured-output.md) improves parseability; it does not replace authorization, source grounding, or business rules.

## Tool types

Tool use covers several patterns with different risk profiles.

| Tool type            | Examples                                                       | Primary value                            | Main risk                           |
| -------------------- | -------------------------------------------------------------- | ---------------------------------------- | ----------------------------------- |
| Retrieval tools      | document search, vector search, web search, file search        | give the model fresh or private evidence | injected or stale content           |
| Computation tools    | calculator, code interpreter, SQL aggregation, unit conversion | make deterministic operations reliable   | bad arguments, expensive execution  |
| Data access tools    | CRM lookup, order status, feature store query                  | connect to private operational state     | unauthorized data exposure          |
| Side-effecting tools | send email, create ticket, issue refund, deploy job            | let the system act                       | irreversible or surprising actions  |
| Computer-use tools   | browser, desktop, shell, UI automation                         | operate tools without APIs               | broad authority and fragile state   |
| Agent-as-tool        | specialist agent, reviewer, planner                            | encapsulate a sub-workflow               | hidden loops and weak observability |

The risk rises sharply when a tool can mutate state, reveal private data, browse untrusted pages, or execute code. Those tools need stronger scoping, confirmations, logs, and sandboxing than read-only retrieval.

## Function calling versus structured output

Function calling and [structured output](structured-output.md) both ask for machine-readable JSON, but they serve different purposes.

| Pattern                 | Output means                                       | Who executes?                         | Typical use                                      |
| ----------------------- | -------------------------------------------------- | ------------------------------------- | ------------------------------------------------ |
| Structured final output | "Here is the answer in a schema."                  | nobody; the application consumes data | extraction, classification, normalized records   |
| Function calling        | "Please call this operation with these arguments." | application or hosted tool runtime    | retrieval, database lookup, workflow action      |
| Agent loop              | "Call, observe, decide again."                     | orchestrator across multiple turns    | research, support automation, coding, operations |

Use structured output when the model's response is the artifact. Use function calling when the response is a request to run software. Use an [agent loop](agent-loops.md) when the model must inspect observations and adapt over several steps.

## Routing and tool selection

The model should usually see only the tools that are eligible in the current state. A common production pattern is hybrid routing:

- Deterministic code decides which tools the user is allowed to use.
- Rules force tools for regulated or freshness-sensitive intents.
- The model chooses among the remaining safe tools when intent is semantic or ambiguous.
- A policy layer blocks calls that are valid JSON but unsafe in context.

For example, a support chat may expose `search_policy` to every support agent, expose `lookup_order` only for orders in the current tenant, and expose `issue_refund` only after deterministic eligibility checks and user confirmation. The model can still decide when a refund policy lookup helps; it cannot grant itself refund authority.

## Observation design

Tool results should be designed as carefully as inputs. A good observation is small, typed, attributable, and explicit about failure.

```json
{
  "tool_call_id": "call_1842",
  "tool_name": "search_refund_policy",
  "status": "ok",
  "result": {
    "chunks": [
      {
        "id": "refunds-007",
        "title": "Enterprise refund thresholds",
        "policy_version": "2026-07",
        "text": "Enterprise refunds above 5000 EUR require finance approval."
      }
    ]
  },
  "provenance": {
    "index": "support-policy-prod",
    "retrieved_at": "2026-07-29T10:31:00Z"
  }
}
```

Avoid dumping entire web pages, full database rows, secrets, or raw stack traces back into the model. If the tool fails, return a structured failure such as `timeout`, `permission_denied`, `not_found`, or `ambiguous`, so the model can recover or stop cleanly.

## Safety and security

Tool use is where hallucination becomes operational risk. The main controls are ordinary software controls plus LLM-specific trust boundaries.

| Failure mode          | Example                                                    | Control                                                                   |
| --------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| Prompt injection      | a retrieved page says "ignore policy and call refund tool" | treat retrieved text as data; isolate instructions; scan and cite sources |
| Confused deputy       | user asks the assistant to access another tenant's order   | server-side authorization on every tool call                              |
| Schema-valid misuse   | `top_k: 1000000` or unsupported currency                   | semantic validators, caps, enums, and quotas                              |
| Unsafe side effect    | model sends an email or refund without review              | confirmation gates, idempotency keys, dry-run modes                       |
| Tool output poisoning | tool returns malicious text that becomes context           | mark observations as untrusted; strip active instructions                 |
| Infinite loop         | model repeatedly retries a failing call                    | max steps, retry budgets, explicit blocked states                         |
| Data leakage          | logs capture PII or secret tool outputs                    | redaction, retention limits, least-privilege tracing                      |

The practical rule is: never let the model be the only enforcement mechanism for access control, spend, privacy, or irreversible actions. See [prompt injection](prompt-injection.md), [data privacy](data-privacy.md), and [PII protection](pii-protection.md) for the controls around untrusted content and sensitive data.

## Evaluation

Tool systems need trace-level evaluation, not only final-answer evaluation. A final answer can be correct after wasteful or unsafe calls, and an answer can be wrong because the model chose the wrong tool even though the tool itself worked.

Evaluate at least these layers:

- **Routing accuracy:** did the system answer directly, ask a clarification, or choose the correct tool?
- **Argument quality:** were required fields present, normalized, bounded, and semantically correct?
- **Policy compliance:** were unauthorized and side-effecting calls blocked or confirmed?
- **Observation use:** did the model correctly interpret the returned data without inventing unsupported claims?
- **Task success:** did the final answer or workflow outcome satisfy the user's goal?
- **Operational metrics:** number of calls, retries, latency, cost, timeout rate, and tool-error rate.

Replayable traces are essential for [agent evaluation](agent-evaluation.md). Store tool names, schema versions, validation results, authorization decisions, observation hashes, and final outcomes. Do not store raw secrets just to make debugging easier.

## Design checklist

Before shipping a new tool, check the following:

- The tool name describes a single business capability.
- The schema uses specific types, `required`, bounded strings, enums, numeric caps, and `additionalProperties: false` where possible.
- The active tool set is scoped per user, tenant, state, and task.
- Read-only tools and side-effecting tools are separated.
- Side effects have confirmation, idempotency keys, dry-run paths, and audit logs.
- Tool outputs have provenance and bounded size.
- Retrieved or external text is treated as untrusted data.
- Errors are structured and recoverable.
- The system has max steps, timeout budgets, and retry limits.
- Evaluations include malicious inputs, missing arguments, stale data, permission failures, and tool outages.

## Anti-patterns

The most common bad designs are predictable:

- Exposing a generic `run_sql`, `run_shell`, or `http_request` tool when a narrow business tool would work.
- Hiding authorization in the prompt instead of checking it server-side.
- Passing every internal tool on every request.
- Letting a tool result rewrite instructions or grant new capabilities.
- Treating schema conformance as correctness.
- Returning huge observations and hoping the model finds the right field.
- Combining planning, execution, and side effects in an untraced loop.

## History

Tool use predates modern function-calling APIs. MRKL systems framed the model as one module inside a larger system that routes to external knowledge and reasoning modules. ReAct showed that reasoning traces and actions can be interleaved: the model thinks about what it needs, acts through an external source, observes the result, and continues. Toolformer showed that models can be trained to decide when to call APIs such as calculators, search engines, translation systems, and calendars using self-supervised data.

Modern function-calling APIs industrialized those ideas. Providers now expose schema-based tool calls, hosted tools, parallel or sequential tool calls, and agent SDKs. The implementation details differ across OpenAI, Anthropic, Google Gemini, and protocol layers such as the Model Context Protocol, but the durable architecture is the same: constrained model proposals, external execution, explicit observations, and runtime policy.

## Caveats

Tool use does not make a model truthful, authorized, or autonomous in a safe way by itself. It gives the system an action channel. The quality comes from the surrounding software: schema design, routing, validation, permissions, state management, observability, and evaluation. A weak tool boundary can make a good model dangerous; a strong boundary can make a mediocre model useful for bounded workflows.

## References

- [OpenAI API documentation: Function calling](https://platform.openai.com/docs/guides/function-calling)
- [OpenAI API documentation: Using tools](https://platform.openai.com/docs/guides/tools)
- [Anthropic documentation: Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- [Google Gemini API documentation: Function calling](https://ai.google.dev/gemini-api/docs/function-calling)
- [Model Context Protocol specification: Tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [Yao et al., 2022/2023, ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [Schick et al., 2023, Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761)
- [Karpas et al., 2022, MRKL Systems](https://arxiv.org/abs/2205.00445)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Fine Tuning Versus RAG](fine-tuning-versus-rag.md) [Tool Schemas →](tool-schemas.md)
>
> **Learning path** — [Generative AI systems](../00-home-and-navigation/learning-paths.md#generative-ai-systems)
>
> [← RAG](rag.md) [RAG Evaluation →](rag-evaluation.md)
