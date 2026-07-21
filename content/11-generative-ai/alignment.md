---
title: Alignment
slug: generative-ai/alignment
description: "Training and system controls that make model behavior fit human intent, policy, and context."
area: generative-ai
topics:
  - alignment
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - llm-training.md
  - instruction-tuning.md
  - guardrails.md
  - hallucination-mitigation.md
  - data-privacy.md
  - agent-evaluation.md
  - ../07-reinforcement-learning/reinforcement-learning-from-human-feedback.md
historical_context: false
last_reviewed: 2026-07-20
---

# Alignment

Alignment is not one switch. It combines training, preference optimization, prompting, [guardrails](guardrails.md), [data privacy](data-privacy.md), and evaluation so a model follows intended behavior under realistic pressure.

## Training signal and runtime layers

Instruction-tuned systems often start with supervised demonstrations and then use human or AI preference data. A preference objective can compare a chosen response $y_w$ to a rejected response $y_l$ for prompt $x$ and increase the margin between their scores. Runtime alignment is separate: the application constrains tools, validates [structured output](structured-output.md), and checks [hallucination mitigation](hallucination-mitigation.md).

One common preference-learning signal is pairwise: for the same prompt, the training data says that $y_w$ is preferred to $y_l$. The optimizer should raise the relative score of the chosen response without simply making every response longer or more agreeable. In production, that learned preference is only one layer:

| Layer                         | What it controls                                                         |
| ----------------------------- | ------------------------------------------------------------------------ |
| Supervised instruction data   | Basic task following, response style, and refusal patterns.              |
| Preference optimization       | Ranking chosen answers above rejected answers for comparable prompts.    |
| System prompt and tool policy | Runtime boundaries, allowed actions, and required evidence.              |
| Validators and audits         | Schema validity, citation support, privacy checks, and regression tests. |

## An alignment contract

```json
{
  "policy": "Answer with cited sources or say evidence is unavailable.",
  "training_signal": "chosen_vs_rejected",
  "runtime_checks": ["citation_support", "pii_redaction", "tool_permission"]
}
```

The artifact separates learned behavior from controls that remain outside the model. A citation policy can be reinforced during training, but the application still needs an evidence checker because a fluent unsupported answer can satisfy style preferences while failing the workflow.

## Caveats

Preference data can encode annotator bias or reward verbosity. A model can be aligned for chat helpfulness but misaligned for a regulated workflow unless the workflow has its own tests.

## References

- [Ouyang et al., 2022, Training language models to follow instructions](https://arxiv.org/abs/2203.02155)
- [Rafailov et al., 2023, Direct Preference Optimization](https://arxiv.org/abs/2305.18290)
- [NIST AI Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Instruction Tuning](instruction-tuning.md) [In-Context Learning →](in-context-learning.md)
