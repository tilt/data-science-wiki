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

A trace grader should score at least four fields: final task result, required actions, forbidden actions, and resource envelope. For a task $t$, a simple pass predicate is $P(t)=O_t \land R_t \land \neg F_t \land B_t$, where $O$ is outcome correctness, $R$ required evidence/actions, $F$ forbidden events, and $B$ budget compliance. A simple budget check is

$$
B_t=\mathbf 1\{\operatorname{calls}_t\le C_{\max}\land \operatorname{latency}_t\le L_{\max}\land \operatorname{cost}_t\le K_{\max}\}.
$$

[LLM-as-judge](llm-as-judge.md) can grade language quality, but deterministic checks should own tool names, schemas, and permissions.

## Worked trace check

| Trace event | Succeeded? | Required? | Forbidden? |
| --- | --- | --- | --- |
| `search_docs` | yes | yes | no |
| `refund_payment` | no | no | yes |
| `final_answer` | yes | yes | no |

The required successful events are present: `search_docs` and `final_answer`. The trace still fails because a forbidden `refund_payment` action appeared at all, even though it did not succeed. That is the kind of failure final-answer grading misses.

## Caveats

Do not let the agent write its own pass criteria during the run being graded. Keep adversarial prompts, empty retrieval results, timeout cases, and side-effecting tools in the suite.

## References

- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)
- [OpenAI API documentation: Graders](https://platform.openai.com/docs/guides/graders)
- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)
