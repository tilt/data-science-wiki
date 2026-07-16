---
title: In-Context Learning
slug: generative-ai/in-context-learning
description: "Task adaptation from examples placed in the prompt rather than from weight updates."
area: generative-ai
topics:
  - in-context-learning
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - prompting.md
  - foundation-models.md
  - fine-tuning-versus-rag.md
  - context-construction.md
  - temperature-and-determinism.md
historical_context: false
last_reviewed: 2026-07-11
---

# In-Context Learning

In-context learning is the model's ability to infer a task pattern from examples in the prompt. It is a [prompting](prompting.md) technique, not weight training. Compared with [fine tuning versus RAG](fine-tuning-versus-rag.md), it is fast to change but limited by [context construction](context-construction.md).

## Mechanism

A prompt supplies examples $(x_i,y_i)$ followed by a new input $x_*$. The model conditions on the whole sequence and estimates $p(y_*\mid x_1,y_1,\ldots,x_*)$. Example order, label balance, and decoding settings from [temperature and determinism](temperature-and-determinism.md) can change the result.

## Worked example

Few-shot examples teach a pattern only if they disambiguate the input space:

| Example input               | Label   | Signal                                   |
| --------------------------- | ------- | ---------------------------------------- |
| `invoice overdue`           | billing | `invoice` points to billing.             |
| `refund status`             | support | `refund` points to support.              |
| `rain tomorrow`             | weather | Weather is clearly separate.             |
| New input: `refund invoice` | ?       | Contains one cue for each of two labels. |

The new input is ambiguous because it combines `refund` and `invoice`. A model may choose either label depending on example order, wording, and prior knowledge. Better in-context examples would include refund invoices explicitly, or the prompt should ask a clarifying question when examples conflict.

| Prompt design lever    | Why it matters                                          |
| ---------------------- | ------------------------------------------------------- |
| Balanced labels        | Prevents the model from overusing the majority example. |
| Boundary examples      | Shows what to do when cues conflict.                    |
| Output format examples | Teaches stable structure without fine-tuning.           |
| Fallback instruction   | Reduces confident guesses on ambiguous inputs.          |

## Caveats

Examples can teach the wrong pattern, leak sensitive labels, or crowd out retrieved evidence. Regression tests should pin the exact prompt.

## References

- [Brown et al., 2020, Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

> **Section — [Generative AI and Agentic Systems](index.md):** ← [Alignment](alignment.md) · [Prompting](prompting.md) →
