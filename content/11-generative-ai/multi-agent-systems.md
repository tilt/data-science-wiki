---
title: Multi-Agent Systems
slug: generative-ai/multi-agent-systems
description: "Workflows with multiple model roles coordinated through explicit protocols, typed handoffs, and shared evidence."
area: generative-ai
topics:
  - multi-agent-systems
level: advanced
status: complete
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - agentic-systems.md
  - agent-loops.md
  - langgraph.md
  - langchain.md
  - tool-routing.md
  - reflection-and-reviewer-patterns.md
  - agent-evaluation.md
historical_context: false
last_reviewed: 2026-07-29
---

# Multi-Agent Systems

A multi-agent system uses more than one model role or policy loop, such as researcher, planner, coder, reviewer, and coordinator. It extends [agentic systems](agentic-systems.md), but it also increases coordination cost and [agent evaluation](agent-evaluation.md) complexity. Add roles only when the boundary creates better evidence, review, or specialization.

## Protocol over personas

The reliable version is not free-form chat between personas. It is a protocol: role, input contract, output schema, allowed tools, handoff condition, and stop rule. [Tool routing](tool-routing.md) should remain centralized when tools have permissions or side effects. [Reflection and reviewer patterns](reflection-and-reviewer-patterns.md) are a two-role special case where one role produces and another critiques against a rubric.

Shared evidence matters more than role labels. If the researcher passes unsourced prose to the writer, the writer inherits unverified claims. A better handoff passes claim objects with source IDs, confidence, and unresolved questions. The coordinator then decides whether the next role has enough evidence to proceed.

[LangGraph](langgraph.md) is a natural fit when those roles need explicit state, handoffs, checkpoints, or human interrupts. [LangChain](langchain.md) components can still run inside individual role nodes for model calls, tools, retrieval, and structured outputs.

```mermaid
flowchart TD
  Coordinator[Coordinator] --> Researcher[Researcher]
  Researcher --> Handoff[Typed handoff: claims with source IDs]
  Handoff --> Coordinator
  Coordinator --> Writer[Writer]
  Writer --> Reviewer[Reviewer: critique against a rubric]
  Reviewer --> Coordinator
  Coordinator --> Output[Final output, or reject and retry]
```

## A typed handoff

```json
{
  "handoff": "researcher_to_writer",
  "payload": {
    "claims": [
      {
        "text": "Enterprise refunds above 500 EUR require manager approval.",
        "source_id": "policy-7"
      }
    ],
    "open_questions": ["Does the customer have enterprise status?"]
  },
  "acceptance": "all_claims_have_sources"
}
```

This artifact makes the handoff auditable. The writer receives source-linked claims rather than a free-form summary, and the coordinator can reject the handoff when a claim lacks evidence or when an open question blocks a safe answer. That is the difference between a multi-agent workflow and several prompts passing unverified prose to each other.

## When multiple agents help

| Situation                                             | Useful split                            |
| ----------------------------------------------------- | --------------------------------------- |
| evidence gathering and writing need different context | researcher -> writer.                   |
| high-risk output needs independent critique           | drafter -> reviewer.                    |
| tool execution needs approval                         | planner -> executor -> human gate.      |
| coding task needs tests                               | implementer -> test runner -> reviewer. |
| long workflow needs durable checkpoints               | coordinator with typed role nodes.      |

The split is less useful when all roles see the same context, use the same tools, and produce free-form summaries. That usually adds latency without adding control.

## Evaluation

Evaluate role handoffs, not only final output. A trace should show which role produced each claim, which source supports it, which role accepted or rejected it, and which unresolved questions remained. Metrics include handoff rejection rate, unsupported-claim rate after review, number of role turns, cost, latency, and human-escalation rate.

## Caveats

More agents can amplify errors through plausible summaries. Use typed handoffs, shared evidence stores, and centralized permission checks rather than relying on conversational memory. Add agents only when the role boundary removes real complexity or creates an auditable review point. Otherwise, a single well-instrumented agent loop is easier to test and operate.

## References

- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)
- [OpenAI API documentation: Using tools](https://platform.openai.com/docs/guides/tools)
- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Reflection and Reviewer Patterns](reflection-and-reviewer-patterns.md) [Harnesses →](harnesses.md)
