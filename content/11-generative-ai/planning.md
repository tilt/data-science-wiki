---
title: Planning
slug: generative-ai/planning
description: "Explicit intermediate task state used to choose actions, order dependencies, and stop agent workflows."
area: generative-ai
topics:
  - planning
level: advanced
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - agent-loops.md
  - agentic-systems.md
  - langgraph.md
  - tool-routing.md
  - reflection-and-reviewer-patterns.md
  - agent-evaluation.md
historical_context: false
last_reviewed: 2026-07-28
---

# Planning

Planning decomposes a goal into actions before execution or replans after observations. In [agent loops](agent-loops.md), a plan is useful only when it improves tool choice, dependency ordering, evidence gathering, or stopping behavior. It is not valuable as hidden prose that cannot be inspected.

## The plan as a state object

A plan should be a state object. Useful fields include goal, steps, dependencies, allowed tools, evidence needed, risk gates, and done condition. [Tool routing](tool-routing.md) maps planned steps to callable tools, while [agent evaluation](agent-evaluation.md) checks whether the trace followed the plan or revised it for a valid reason.

Planning can happen once at the beginning, incrementally after each observation, or through a planner/reviewer split. Incremental planning is safer for workflows where tool output can invalidate the original path. The loop should log both the previous plan and the reason for any replan.

When plans become operational state rather than explanatory text, [LangGraph](langgraph.md) can encode plan fields, allowed transitions, replanning nodes, and approval interrupts directly in the graph.

## A plan object

```json
{
  "goal": "answer refund approval question",
  "steps": [
    { "id": "s1", "action": "search_refund_policy", "needs": ["policy_version"] },
    { "id": "s2", "action": "read approval threshold", "depends_on": ["s1"] },
    { "id": "s3", "action": "answer_with_citation", "depends_on": ["s2"] }
  ],
  "risk_gates": ["do_not_issue_refund", "cite_policy_span"],
  "done_when": "answer cites policy span or abstains"
}
```

## Caveats

Plans become harmful when the model follows an obsolete plan after tool output contradicts it. Replanning must be explicit and logged. Long plans also create false confidence; for uncertain tasks, the next best action and evidence requirement are often more useful than a fully specified route.

## References

- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)
- [OpenAI API documentation: Using tools](https://platform.openai.com/docs/guides/tools)
- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Agentic Systems](agentic-systems.md) [Memory →](memory.md)
