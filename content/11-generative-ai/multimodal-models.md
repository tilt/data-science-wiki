---
title: Multimodal Models
slug: generative-ai/multimodal-models
description: "Models that consume or produce more than one modality, such as text, image, audio, or video."
area: generative-ai
topics:
  - multimodal-models
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - vision-language-models.md
  - foundation-models.md
  - structured-output.md
  - ../06-deep-learning/multimodal-learning.md
  - prompting.md
historical_context: false
last_reviewed: 2026-07-11
---

# Multimodal Models

Multimodal models connect text with images, audio, video, or structured signals. In generative systems they support captioning, document extraction, visual question answering, and tool-augmented workflows. [Vision-language models](vision-language-models.md) are the most common case in this wiki.

## Mechanism

A common pattern is modality encoder -> projection/alignment -> language model. Contrastive models align image and text embeddings; generative VLMs condition token generation on visual features. [Structured output](structured-output.md) is often needed when perception feeds software, and [prompting](prompting.md) must specify what visual evidence counts.

| Pattern               | Mechanism                                             | Typical use                                         |
| --------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| Dual encoder          | encode each modality into comparable embeddings       | retrieval, matching, zero-shot classification       |
| Cross-attention model | let text tokens attend to visual/audio features       | captioning, question answering, document extraction |
| Token-unified model   | represent multiple modalities as token streams        | multimodal generation or reasoning                  |
| Tool-mediated system  | call OCR, ASR, vision, or search tools around a model | auditable workflows with specialized components     |

The modality boundary matters. If a document extraction system fails, the error may come from OCR, layout parsing, visual perception, language reasoning, or schema formatting. Good evaluations isolate those layers instead of scoring only the final JSON.

## Concrete artifact

```json
{
  "input": ["invoice_scan.png", "Extract supplier, date, total, currency"],
  "output_schema": { "supplier": "string", "total": "number", "currency": "string" },
  "validation": ["required_fields", "total_matches_line_items"]
}
```

## Caveats

Perception errors and language errors look similar in final text. Evaluate by modality, image quality, layout, language, and refusal on unreadable inputs. Also track whether the model uses visible evidence or fills gaps from prior knowledge, because fluent answers can hide weak visual grounding.

## References

- [Radford et al., 2021, CLIP](https://arxiv.org/abs/2103.00020)
- [Alayrac et al., 2022, Flamingo](https://arxiv.org/abs/2204.14198)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← LLM-as-Judge](llm-as-judge.md) [Vision-Language Models →](vision-language-models.md)
