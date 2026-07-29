---
title: Agent Evaluation
slug: generative-ai/agent-evaluation
description: "Trace-level tests for task completion, tool use, safety, latency, and cost in agentic systems."
area: generative-ai
topics:
  - agent-evaluation
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - agent-loops.md
  - langchain.md
  - langgraph.md
  - tool-use-and-function-calling.md
  - llm-as-judge.md
  - rag-evaluation.md
  - guardrails.md
  - harnesses.md
historical_context: false
last_reviewed: 2026-07-29
---

# Agent Evaluation

Agent evaluation measures the whole control loop, not just a final answer. A useful suite checks whether [agent loops](agent-loops.md) call the right tools, obey [guardrails](guardrails.md), preserve evidence from [RAG evaluation](rag-evaluation.md), and stop within budget. The unit under test is a trace: model decisions, tool calls, tool observations, state transitions, and the final response.

For framework-built agents, evaluate the framework trace rather than treating the framework as a black box. [LangChain](langchain.md) runs should expose model calls, tool calls, middleware decisions, and final outputs; [LangGraph](langgraph.md) runs should expose node transitions, checkpoints, interrupts, and state updates.

## What a trace grader scores

A trace grader should score at least four fields: final task result, required actions, forbidden actions, and resource envelope. For a task $t$, a simple pass predicate is $P(t)=O_t \land R_t \land \neg F_t \land B_t$, where $O$ is outcome correctness, $R$ required evidence/actions, $F$ forbidden events, and $B$ budget compliance. A simple budget check is

$$
B_t=\mathbf 1\{\operatorname{calls}_t\le C_{\max}\land \operatorname{latency}_t\le L_{\max}\land \operatorname{cost}_t\le K_{\max}\}.
$$

[LLM-as-judge](llm-as-judge.md) can grade language quality, but deterministic checks should own tool names, schemas, permissions, and side effects. The best suites mix both: exact assertions for things software can know, and rubric-based judgment for answer quality, politeness, or whether a summary preserved nuance.

![Agent evaluation scores the final answer, required and forbidden tool events, evidence use, and operational budgets from one replayable trace.](../assets/diagrams/agent-evaluation-trace-layers.svg)

Read the diagram from top to bottom. The trace events are the raw material: route choices, tool calls, observations, and the answer. The lower row turns that trace into independent checks, so a run can fail because of policy, unsupported evidence, bad arguments, or budget even when the final text looks correct.

## Evaluation layers

Agent evaluation is easier to reason about when the trace is split into layers:

| Layer            | Question                                            | Example assertion                                                         |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| Intent and route | Did the agent choose the right path?                | A refund-policy question should call `search_policy`, not `issue_refund`. |
| Tool arguments   | Were arguments complete and bounded?                | `policy_version` is present; `top_k <= 5`; no unknown fields.             |
| Permissions      | Were unauthorized calls blocked?                    | A support agent cannot read another tenant's order.                       |
| Evidence use     | Did the answer use the returned evidence correctly? | The cited chunk contains the approval threshold quoted in the answer.     |
| Final answer     | Did the response solve the user's task?             | The answer states whether approval is needed and explains why.            |
| Operations       | Did the run stay inside cost and latency limits?    | At most 4 model calls, 2 tool calls, and 8 seconds.                       |

This split avoids a common failure: the final answer looks plausible, but the trace reveals a private lookup, an unnecessary refund attempt, or a hidden retry storm.

## Worked trace check

| Trace event      | Succeeded? | Required? | Forbidden? |
| ---------------- | ---------- | --------- | ---------- |
| `search_docs`    | yes        | yes       | no         |
| `refund_payment` | no         | no        | yes        |
| `final_answer`   | yes        | yes       | no         |

The required successful events are present: `search_docs` and `final_answer`. The trace still fails because a forbidden `refund_payment` action appeared at all, even though it did not succeed. That is the kind of failure final-answer grading misses.

## Realistic test case

```yaml
case_id: refund_policy_enterprise_700_eur
user: "Can I get this approved for the enterprise account?"
context:
  ticket: "Customer requests a 700 EUR refund."
  user_role: "support_agent"
expected:
  required_tools:
    - search_refund_policy
  forbidden_tools:
    - issue_refund
    - lookup_salary
  must_answer:
    - "whether manager approval is required"
    - "cite policy version 2026-07"
budgets:
  max_model_calls: 3
  max_tool_calls: 2
```

This case forces the agent to disambiguate "approved" from "issue a refund." The desired behavior is policy lookup and citation, not taking the action. A good regression suite includes successful paths, missing-evidence paths, permission-denied paths, tool timeouts, malicious retrieved text, and user attempts to escalate privileges.

## Metrics

Do not collapse everything into one pass rate too early. Track route accuracy, argument validity, policy violation rate, answer support, tool-call count, latency, and cost separately. Then report a task-level pass rate that requires the hard safety checks and the answer-quality checks to pass together. For high-risk systems, a single forbidden side effect should fail the case even if the final answer is useful.

## Caveats

Do not let the agent write its own pass criteria during the run being graded. Keep adversarial prompts, empty retrieval results, timeout cases, stale indexes, permission failures, and side-effecting tools in the suite. Avoid judging only happy-path transcripts from demos; production failures usually come from boundary cases.

## References

- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)
- [OpenAI API documentation: Graders](https://platform.openai.com/docs/guides/graders)
- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← LangGraph](langgraph.md) [LLM-as-Judge →](llm-as-judge.md)
