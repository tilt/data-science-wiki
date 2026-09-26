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
last_reviewed: 2026-09-21
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

## MCP as a tool layer

The [Model Context Protocol](https://modelcontextprotocol.io/specification/2026-07-28/server/tools) is one way to standardize the boundary between an AI client and external capabilities. An MCP server can expose a set of named tools, each with a description and JSON input schema; a client discovers those tools with `tools/list` and invokes a selected tool with `tools/call`. The protocol does not remove the need for product controls. It gives applications a common way to present capabilities, while the client and server still need authorization, validation, audit logs, and human confirmation for sensitive actions.

MCP is useful to understand because it makes tool availability explicit. If a fieldwork-log server exposes `search_observations` and `mark_reviewed`, a model can route to those capabilities. If it does not expose `delete_observation`, the model may describe deletion but cannot legitimately perform it through that server. The tool list is therefore part of the agent's real capability boundary, not just documentation.

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

## Minimal round trip

A no-argument tool such as `get_latest_calibration_batch` is the smallest useful example:

```json
{
  "name": "get_latest_calibration_batch",
  "description": "Return the identifier of the latest approved sensor calibration batch.",
  "parameters": {
    "type": "object",
    "properties": {},
    "additionalProperties": false
  }
}
```

When the user asks "which calibration batch should I use for this week's reef-temperature import?", the model should not invent an identifier from training data. It should emit a tool request, the runtime should execute the function, and the result should return as an observation:

```json
{
  "tool_call_id": "call_calibration_1",
  "tool_name": "get_latest_calibration_batch",
  "arguments": {},
  "status": "ok",
  "observation": {
    "batch_id": "calibration-reef-temp-2026-07",
    "approved_at": "2026-07-12"
  }
}
```

The final answer is generated after that observation is appended. This trace is intentionally boring: it shows the important boundary without hiding it inside a framework. A framework may automate the loop, but the same contract remains: model proposal, runtime execution, bounded observation, and a stop rule such as `max_steps` or `max_tool_calls`.

This complete loop uses the model to decide each tool call. The two tools are parameterized queries against the field-monitoring database, run through a read-only connection; the decision about which tool to call comes from the model response. The runtime still owns dispatch, validation, observations, and the step budget.

```mermaid
flowchart TD
  Request[Station import request] --> Model[Model chooses next action]
  Model -->|needs calibration| Calibration[get_latest_calibration_batch]
  Calibration --> State1[Update state with batch]
  State1 --> Model
  Model -->|needs open records| Search[search_observations]
  Search --> State2[Update state with observations]
  State2 --> Model
  Model -->|enough evidence| Final[Final answer]
```

```python
from __future__ import annotations

import json
import os
from collections.abc import Callable
from typing import Any

from openai import OpenAI
from sqlalchemy import create_engine, text

MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o")  # Pin the model you evaluate.
field_db = create_engine(os.environ["FIELD_DB_URL"])  # Connect with a read-only database role.


def validate_tool_call(call: dict[str, Any]) -> None:
    if call["name"] not in tools:
        raise ValueError(f"unknown tool: {call['name']}")
    args = call["arguments"]
    if call["name"] == "get_latest_calibration_batch":
        if args != {}:
            raise ValueError("get_latest_calibration_batch does not accept arguments")
    if call["name"] == "search_observations":
        if set(args) != {"station_id", "reviewed"}:
            raise ValueError("search_observations requires station_id and reviewed")


def get_latest_calibration_batch() -> dict[str, str]:
    with field_db.connect() as conn:
        row = conn.execute(
            text(
                "SELECT batch_id, approved_at FROM calibration_batches "
                "WHERE status = 'approved' ORDER BY approved_at DESC LIMIT 1"
            )
        ).mappings().one()
    return {"batch_id": row["batch_id"], "approved_at": str(row["approved_at"])}


def search_observations(station_id: str, reviewed: bool) -> list[dict[str, Any]]:
    with field_db.connect() as conn:
        rows = conn.execute(
            text(
                "SELECT observation_id, station_id, metric, value, reviewed "
                "FROM observations WHERE station_id = :station_id AND reviewed = :reviewed "
                "ORDER BY observed_at DESC LIMIT 50"
            ),
            {"station_id": station_id, "reviewed": reviewed},
        ).mappings().all()
    return [dict(row) for row in rows]


tools: dict[str, Callable[..., Any]] = {
    "get_latest_calibration_batch": get_latest_calibration_batch,
    "search_observations": search_observations,
}


openai_tools = [
    {
        "type": "function",
        "name": "get_latest_calibration_batch",
        "description": "Return the latest approved reef-temperature calibration batch.",
        "parameters": {
            "type": "object",
            "properties": {},
            "required": [],
            "additionalProperties": False,
        },
        "strict": True,
    },
    {
        "type": "function",
        "name": "search_observations",
        "description": "Search field observations by station and review state.",
        "parameters": {
            "type": "object",
            "properties": {
                "station_id": {"type": "string"},
                "reviewed": {"type": "boolean"},
            },
            "required": ["station_id", "reviewed"],
            "additionalProperties": False,
        },
        "strict": True,
    },
]


def run_model_driven_tool_loop(user_request: str, max_steps: int = 4) -> str:
    client = OpenAI()
    response = client.responses.create(
        model=MODEL,
        input=user_request,
        tools=openai_tools,
    )

    for _ in range(max_steps):
        tool_outputs = []
        for item in response.output:
            if item.type != "function_call":
                continue

            # Example first model decision:
            # name="get_latest_calibration_batch", arguments="{}"
            # Example second model decision after observing the batch:
            # name="search_observations",
            # arguments='{"station_id": "reef-17", "reviewed": false}'
            tool_call = {
                "name": item.name,
                "arguments": json.loads(item.arguments or "{}"),
            }
            validate_tool_call(tool_call)

            tool_function = tools[item.name]
            result = tool_function(**tool_call["arguments"])
            tool_outputs.append(
                {
                    "type": "function_call_output",
                    "call_id": item.call_id,
                    "output": json.dumps(result, default=str),
                }
            )

        if not tool_outputs:
            return response.output_text

        response = client.responses.create(
            model=MODEL,
            previous_response_id=response.id,
            input=tool_outputs,
            tools=openai_tools,
        )

    raise RuntimeError("tool loop stopped because max_steps was reached")


if __name__ == "__main__":
    answer = run_model_driven_tool_loop(
        "Prepare this week's reef-temperature import for station reef-17."
    )
    print(answer)
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
- [DeepLearning.AI: Agentic AI](https://www.deeplearning.ai/courses/agentic-ai/)
- [Google Gemini API documentation: Function calling](https://ai.google.dev/gemini-api/docs/function-calling)
- [Model Context Protocol specification: Tools](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
- [Model Context Protocol blog: 2026-07-28 specification](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
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
