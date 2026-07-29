---
title: Instruction Tuning
slug: generative-ai/instruction-tuning
description: "Supervised adaptation that teaches a pretrained model to follow task instructions and response formats."
area: generative-ai
topics:
  - instruction-tuning
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - llm-training.md
  - pretraining.md
  - alignment.md
  - fine-tuning-versus-rag.md
  - prompting.md
  - structured-output.md
  - ../07-reinforcement-learning/reinforcement-learning-from-human-feedback.md
historical_context: false
last_reviewed: 2026-07-29
---

# Instruction Tuning

Instruction tuning trains a pretrained model on instruction-response pairs so it follows natural-language tasks more reliably. It sits between [pretraining](pretraining.md) and [alignment](alignment.md), and can reduce prompt burden for [structured output](structured-output.md) or domain-specific workflows. It teaches the model _how to respond_ to tasks, not which current facts are true.

## Training on demonstrations

Given demonstrations $(x,y)$, supervised instruction tuning minimizes token cross-entropy $-\sum_t\log p_\theta(y_t\mid x,y_{<t})$. Preference methods can then compare outputs, but the supervised stage teaches the basic mapping from instruction to answer.

The training row needs to specify more than the target text. It should make the task, input evidence, response format, and refusal boundary explicit enough that the model learns a reusable behavior instead of memorizing a surface phrase.

| Component        | Role in the example                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| User instruction | Describes the extraction task in natural language.                                              |
| Source text      | Supplies the value `12.40 EUR` that the answer must preserve.                                   |
| Target response  | Encodes the expected machine-readable fields and numeric type.                                  |
| Held-out checks  | Test the same behavior on unseen merchants, currencies, missing values, and malformed receipts. |

## What belongs in the dataset

| Include                                    | Avoid                                                    |
| ------------------------------------------ | -------------------------------------------------------- |
| durable output formats and task procedures | fast-changing policy facts that belong in [RAG](rag.md). |
| domain phrasing and edge cases             | private user data without a retention/legal basis.       |
| refusal and abstention examples            | examples where the model guesses missing evidence.       |
| negative examples and malformed inputs     | only polished happy-path demonstrations.                 |
| held-out evaluation rows                   | training on the evaluation cases.                        |

## A training row

```jsonl
{
  "messages": [
    {
      "role": "user",
      "content": "Extract total and currency: Paid 12.40 EUR"
    }
  ],
  "response": {
    "total": 12.4,
    "currency": "EUR"
  }
}
```

This row teaches the model to map evidence into a JSON-like structure. It should not be used to store fast-changing policy facts that belong in [RAG](rag.md): a new refund limit should live in retrieved context, while a durable extraction format can live in instruction-tuning data.

## Realistic improvement loop

Suppose an invoice assistant already receives the correct PDF text but often returns `"12.40 EUR"` as a string instead of separate numeric and currency fields. Prompting and [structured output](structured-output.md) should be tried first. If failures persist across many invoices, instruction-tuning data can teach the durable transformation:

```text
source: "Total: EUR 12.40"
target: {"total": 12.4, "currency": "EUR"}
```

The same dataset should include missing totals, multiple currencies, handwritten OCR noise, and invoices that require human review. Otherwise the tuned model may become confidently wrong on the cases that matter.

## Evaluation

Evaluate instruction tuning against a held-out set with exact-schema checks, semantic task checks, refusal checks, and regression cases from production. Compare to the base prompt and to a retrieval/schema-only baseline. If the improvement appears only on examples similar to training rows, the tuning may be memorizing style rather than learning the task.

## Caveats

Bad demonstrations produce polished bad behavior. Keep held-out tasks, refusal examples, and negative examples separate from the training set so evaluation can catch over-compliance, format drift, and memorized answers. Instruction tuning can also reduce useful uncertainty if the dataset rewards always answering, so include abstention and escalation examples.

## References

- [Ouyang et al., 2022, Training language models to follow instructions](https://arxiv.org/abs/2203.02155)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [Hu et al., 2021, LoRA](https://arxiv.org/abs/2106.09685)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← LLM Training](llm-training.md) [Alignment →](alignment.md)
