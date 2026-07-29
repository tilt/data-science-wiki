---
title: In-Context Learning
slug: generative-ai/in-context-learning
description: "Task adaptation from examples placed in the prompt rather than from weight updates."
area: generative-ai
topics:
  - in-context-learning
level: intermediate
status: complete
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
  - structured-output.md
historical_context: false
last_reviewed: 2026-07-29
---

# In-Context Learning

In-context learning is the model's ability to infer a task pattern from examples in the prompt. It is a [prompting](prompting.md) technique, not weight training. Compared with [fine tuning versus RAG](fine-tuning-versus-rag.md), it is fast to change but limited by [context construction](context-construction.md). It is useful when a task can be demonstrated with a few representative examples and the examples fit in context.

## Conditioning on examples

A prompt supplies examples $(x_i,y_i)$ followed by a new input $x_*$. The model conditions on the whole sequence and estimates $p(y_*\mid x_1,y_1,\ldots,x_*)$. Example order, label balance, and decoding settings from [temperature and determinism](temperature-and-determinism.md) can change the result.

In-context examples work partly by showing format and partly by showing decision boundaries. If the examples demonstrate only easy cases, the model may still fail on ambiguous or high-impact cases.

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

## Example selection

Good few-shot examples are not random examples. They should cover:

- the normal case;
- a boundary case where labels or actions are easy to confuse;
- a negative or abstention case;
- the exact output format expected downstream;
- domain vocabulary that the model may otherwise misread.

For extraction tasks, examples should include missing fields and malformed inputs. For classification tasks, examples should include near-boundary items. For tool-routing tasks, examples should include requests that should _not_ call a tool.

## When to move beyond examples

In-context learning is a good first lever because it is cheap and reversible. Move to [structured output](structured-output.md), retrieval, or fine-tuning when examples become too many, the prompt becomes brittle, latency/cost grows, or behavior must remain stable across many tasks. If a dozen examples are required for every request, the system may need training data, a rules layer, or a narrower task definition.

## Caveats

Examples can teach the wrong pattern, leak sensitive labels, or crowd out retrieved evidence. They can also create position bias: the model may over-weight recent examples or copy labels from the demonstration distribution. Regression tests should pin the exact prompt and include shuffled-example or alternative-order checks for fragile tasks.

## References

- [Brown et al., 2020, Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Alignment](alignment.md) [Prompting →](prompting.md)
