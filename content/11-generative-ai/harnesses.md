---
title: Harnesses
slug: generative-ai/harnesses
description: "The runtime around a model that turns it into an agent: loop, tools, context management, state, permissions, and verification."
area: generative-ai
topics:
  - harnesses
  - agentic-systems
  - context-engineering
level: advanced
status: complete
page_type: system-design
aliases:
  - Agent Harnesses
  - Agent Harness
  - Agent Scaffold
  - Context Engineering
prerequisites:
  - agent-loops.md
related:
  - agent-loops.md
  - agentic-systems.md
  - evaluation-harnesses.md
  - memory.md
  - context-construction.md
  - tool-routing.md
  - multi-agent-systems.md
  - langgraph.md
  - guardrails.md
historical_context: false
last_reviewed: 2026-09-25
---

# Harnesses

An agent harness is everything around the model at runtime: the [agent loop](agent-loops.md), tool definitions and execution, context management, persisted state, permissions, verification hooks, and traces. The model proposes the next step; the harness decides what the model sees, what it may do, and what survives between steps and sessions. Since 2025, "harness" usually means this runtime. The older sense of a controlled test wrapper is covered in [evaluation harnesses](evaluation-harnesses.md). Research papers often call the same thing an agent scaffold.

The harness is not a thin wrapper. The Holistic Agent Leaderboard (Kapoor et al., 2025) ran 21,730 agent rollouts across nine models and nine benchmarks. It found that scaffolds strongly affect both accuracy and cost, and it uncovered a major bug in one TAU-bench scaffold. A reported agent score is therefore a score for a model–harness pair, not for the model alone.

## Harness responsibilities

| Responsibility          | Typical mechanisms                                       | Failure if missing                                        |
| ----------------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| Loop control            | step and token budgets, stop conditions, retries         | runaway cost, silent non-termination                      |
| Tool layer              | schemas, MCP servers, tool search, argument validation   | wrong tool, malformed calls, bloated context              |
| Context management      | compaction, tool-result clearing, just-in-time retrieval | context rot: recall degrades as the window fills          |
| Durable state           | progress files, task lists, checkpoints, version control | each session restarts from scratch or from a wrong belief |
| Permissions and sandbox | allow-lists, confirmation gates, isolated execution      | irreversible side effects, data exfiltration              |
| Verification            | tests, validators, end-to-end checks, reviewers          | the agent declares success without evidence               |
| Observability           | traces of calls, observations, costs, stop reasons       | failures cannot be diagnosed or evaluated                 |

[LangGraph](langgraph.md) and agent SDKs provide parts of this runtime. The design decisions stay with the application: which tools exist, what is persisted, and which actions need a human.

## Context management

Context windows are large but not uniformly usable. Anthropic's context-engineering guidance (2025) describes context rot: as the number of tokens grows, the model's ability to recall information from the window drops. It frames context as a finite attention budget to spend deliberately. Context engineering is the harness discipline of deciding which tokens are in the window at each step. It extends [context construction](context-construction.md) from a single request to a whole trajectory.

| Technique              | What the harness does                                                                                              | Best for                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Tool-result clearing   | Drops raw tool outputs deep in the history once they have been used                                                | Any long loop; the cheapest first step                               |
| Compaction             | Summarizes the history near the limit and restarts with the summary, keeping decisions, open bugs, and key details | Long back-and-forth sessions                                         |
| Structured notes       | The agent writes progress and decisions to files outside the window and rereads them                               | Iterative work over many sessions                                    |
| Subagents              | Delegate a focused search to a fresh context that returns a short summary                                          | Broad exploration; see [multi-agent systems](multi-agent-systems.md) |
| Just-in-time retrieval | Keep identifiers (paths, queries, URLs) in context and load content on demand through tools                        | Large corpora and codebases                                          |
| Tool search            | Load tool definitions on demand instead of all upfront                                                             | Large tool catalogs; see [tool routing](tool-routing.md)             |

Compaction is lossy. Test it the way you would test retrieval: after compaction, does the agent still know the constraints, the open tasks, and the reasons behind earlier decisions? A summary that drops a constraint turns into a wrong action several steps later.

## Long-running work across context windows

Some tasks span many context windows, such as building an application feature by feature. Anthropic's report on long-running coding agents (2025) describes three failure modes:

- **Overreach:** the agent tries to finish everything at once, runs out of context mid-implementation, and leaves work undocumented.
- **Premature completion:** a later session surveys the existing work and wrongly declares the project finished.
- **Unverified completion:** features are marked done without end-to-end testing.

The harness that addressed these used two roles:

1. **An initializer session** sets up a startup script, a JSON feature list with a pass/fail flag per feature, a progress file, and an initial version-control commit.
2. **Worker sessions** read the progress file and commit history, implement one feature, verify it end to end with browser automation, commit, and update the progress file before stopping.

The general lesson is that state crossing a context boundary should be an explicit artifact the next session can check. A handoff file for such a harness might look like this:

```json
{
  "task": "checkout-service refactor",
  "session": 14,
  "features": [
    {
      "id": "F-07",
      "title": "retry payment authorization",
      "status": "passing",
      "verified_by": "e2e:checkout_retry"
    },
    {
      "id": "F-08",
      "title": "idempotency keys",
      "status": "in_progress",
      "notes": "key stored; replay path untested"
    },
    { "id": "F-09", "title": "timeout alerting", "status": "not_started" }
  ],
  "decisions": ["Keep provider SDK v4; v5 breaks sandbox auth"],
  "next_step": "Write replay test for F-08 before touching F-09",
  "last_commit": "a41c9e2"
}
```

Only the harness, or a verifier it runs, should set `status` to `passing`. The model can propose it but cannot certify it. That single rule blocks the premature-completion failure.

## Model versus harness

Models increasingly do things that used to be harness code. They reason between tool calls, decide when to search, delegate to subagents, and summarize their own history. Some also emit tool calls in parallel. The harness keeps the responsibilities that must hold even when the model is wrong:

- budgets and stop conditions
- permissions, sandboxing, and confirmation for side effects
- what counts as verified
- what state persists and who can read it
- the trace used for evaluation and audit

A useful test: if a behavior must hold for every run, enforce it in the harness. If it is a quality improvement that may vary, it can live in the model's instructions.

## Evaluating harness changes

Treat a harness change like a model change. Compaction thresholds, tool descriptions, subagent limits, and verification steps all move results. Run the same frozen cases through an [evaluation harness](evaluation-harnesses.md) before and after the change. Report results as model plus harness version. Compare against at least one simpler harness, because extra scaffolding can lower accuracy as well as raise it.

## Caveats

- Harness complexity has a maintenance cost and can hide failures behind retries.
- Summaries and notes written by the model are not ground truth. Verify critical facts against the source before acting on them.
- A harness tuned to one model can underperform after a model upgrade. Re-evaluate before switching.
- Code-execution sandboxes, file access, and network access widen the attack surface for [prompt injection](prompt-injection.md). Scope them to the task.

## References

- [Anthropic Engineering, 2025, Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic Engineering, 2025, Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Anthropic Engineering, 2024, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Kapoor et al., 2025, Holistic Agent Leaderboard: The Missing Infrastructure for AI Agent Evaluation](https://arxiv.org/abs/2510.11977)
- [Ning et al., 2026, Code as Agent Harness](https://arxiv.org/abs/2605.18747)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Agent Loops](agent-loops.md) [Agentic Systems →](agentic-systems.md)
