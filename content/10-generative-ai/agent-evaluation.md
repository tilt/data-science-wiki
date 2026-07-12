---
title: Agent Evaluation
slug: generative-ai/agent-evaluation
description: "Trace-level tests for task completion, tool use, safety, latency, and cost in agentic systems."
area: generative-ai
topics:
  - agent-evaluation
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - agent-loops.md
  - tool-use-and-function-calling.md
  - llm-as-judge.md
  - rag-evaluation.md
  - guardrails.md
historical_context: false
last_reviewed: 2026-07-11
---
# Agent Evaluation

Agent evaluation measures the whole control loop, not just a final answer. A useful suite checks whether [agent loops](agent-loops.md) call the right tools, obey [guardrails](guardrails.md), preserve evidence from [RAG evaluation](rag-evaluation.md), and stop within budget.

## Mechanism

A trace grader should score at least four fields: final task result, required actions, forbidden actions, and resource envelope. For a task $t$, a simple pass predicate is $P(t)=O_t \land R_t \land \neg F_t \land B_t$, where $O$ is outcome correctness, $R$ required evidence/actions, $F$ forbidden events, and $B$ budget compliance. [LLM-as-judge](llm-as-judge.md) can grade language quality, but deterministic checks should own tool names, schemas, and permissions.

## Executed artifact

```python
trace = [("search_docs", True), ("refund_payment", False), ("final_answer", True)]
required = {"search_docs", "final_answer"}
forbidden = {"refund_payment"}
successful_events = {name for name, ok in trace if ok}
all_events = {name for name, _ in trace}
print("TRACE_EVAL")
print({"required_seen": required <= successful_events, "forbidden_called": bool(forbidden & all_events)})
```

Observed output:

```text
TRACE_EVAL
{'required_seen': True, 'forbidden_called': True}
```

The trace found the required calls but still fails because a forbidden `refund_payment` action appeared. That is the kind of failure final-answer grading misses.

## Caveats

Do not let the agent write its own pass criteria during the run being graded. Keep adversarial prompts, empty retrieval results, timeout cases, and side-effecting tools in the suite.

## References

- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)
- [OpenAI API documentation: Graders](https://platform.openai.com/docs/guides/graders)
- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)
