---
title: Development of Tool-Using Language Models and Agents
slug: history-of-ai-and-machine-learning/development-of-tool-using-language-models-and-agents
description: "How language models moved from direct text completion toward tool calls, action loops, and agentic systems."
area: history-of-ai-and-machine-learning
topics:
  - development-of-tool-using-language-models-and-agents
level: foundational
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - ../11-generative-ai/tool-use-and-function-calling.md
  - ../11-generative-ai/tool-schemas.md
  - ../11-generative-ai/tool-routing.md
  - ../11-generative-ai/agent-loops.md
  - ../11-generative-ai/planning.md
  - ../11-generative-ai/agent-evaluation.md
historical_context: true
last_reviewed: 2026-07-11
---
# Development of Tool-Using Language Models and Agents

Tool use developed because fluent language models still failed at tasks that ordinary software handles cleanly: arithmetic, search, database lookup, code execution, and transactions. The historical move was from asking a model to answer directly toward wrapping it in [tool schemas](../11-generative-ai/tool-schemas.md), execution policies, and [agent loops](../11-generative-ai/agent-loops.md).

## Verified chronology

| Year | Milestone | Why it followed |
|---|---|---|
| 2022 | Karpas and coauthors described MRKL systems: modular language-model systems connected to external knowledge and reasoning modules. | The paper framed tool use as a systems architecture problem, not a single-model capability. |
| 2022 | Yao and coauthors introduced ReAct, prompting language models to interleave reasoning traces with actions. | Chain-of-thought helped planning, but actions let the model inspect environments or retrieve facts before continuing. |
| 2023 | Schick and coauthors introduced Toolformer, training a model to decide which API calls to insert and how to use results. | Tool calls moved from hand-written demonstrations toward self-supervised data creation for API use. |
| 2020s | Application stacks standardized structured calls, permission checks, retrieval tools, code tools, and stopping rules. | The hard part became [tool routing](../11-generative-ai/tool-routing.md): selecting the right action, validating arguments, and deciding when the task is done. |

## Historical mechanism

The early pattern was "model as assistant": prompt in, text out. Tool use changed the contract to "model as controller inside a bounded system." A model may propose an API call, but software owns schema validation, credentials, rate limits, retries, logging, and side-effect control. This is why [tool-use and function-calling](../11-generative-ai/tool-use-and-function-calling.md) pages are systems pages as much as modeling pages.

Agents added temporal structure. A typical loop observes the state, reasons or plans, selects a tool, executes it, reads the result, and either revises the plan or stops. That made [planning](../11-generative-ai/planning.md) and [agent evaluation](../11-generative-ai/agent-evaluation.md) central: a tool-using model can fail by calling the wrong tool, calling the right tool with unsafe arguments, ignoring the observation, or continuing after the correct answer is already available.

The historical lesson is that tool use increased capability by narrowing trust. The model became more useful when it was no longer expected to internalize every capability. The surrounding system had to become stricter.

## References

- [Karpas et al., 2022, MRKL Systems](https://arxiv.org/abs/2205.00445)
- [Yao et al., 2022, ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- [Schick et al., 2023, Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761)
