---
title: Multimodal Models
slug: generative-ai/multimodal-models
description: "Models that consume or produce more than one modality, such as text, image, audio, or video."
area: generative-ai
topics:
  - multimodal-models
level: intermediate
status: complete
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
  - hallucination-mitigation.md
  - data-privacy.md
historical_context: false
last_reviewed: 2026-07-29
---

# Multimodal Models

Multimodal models connect text with images, audio, video, or structured signals. In generative systems they support captioning, document extraction, visual question answering, moderation, accessibility, and tool-augmented workflows. [Vision-language models](vision-language-models.md) are the most common case in this wiki.

## Encoder to language model

A common pattern is modality encoder -> projection/alignment -> language model. Contrastive models align image and text embeddings; generative VLMs condition token generation on visual features. [Structured output](structured-output.md) is often needed when perception feeds software, and [prompting](prompting.md) must specify what visual evidence counts.

| Pattern               | Mechanism                                             | Typical use                                         |
| --------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| Dual encoder          | encode each modality into comparable embeddings       | retrieval, matching, zero-shot classification       |
| Cross-attention model | let text tokens attend to visual/audio features       | captioning, question answering, document extraction |
| Token-unified model   | represent multiple modalities as token streams        | multimodal generation or reasoning                  |
| Tool-mediated system  | call OCR, ASR, vision, or search tools around a model | auditable workflows with specialized components     |

The modality boundary matters. If a document extraction system fails, the error may come from OCR, layout parsing, visual perception, language reasoning, or schema formatting. Good evaluations isolate those layers instead of scoring only the final JSON.

## Product patterns

| Pattern                   | Example                                              | Important checks                                         |
| ------------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| Visual question answering | "Does this dashboard show revenue below target?"     | chart reading, units, visible evidence.                  |
| Document extraction       | invoice fields from a scan                           | OCR quality, layout, schema validation.                  |
| Image moderation          | classify unsafe uploaded image                       | thresholding, appeals, false positives.                  |
| Multimodal RAG            | retrieve images or pages, then answer with citations | source provenance and visual grounding.                  |
| Audio assistant           | transcribe and summarize a meeting                   | speaker attribution and [data privacy](data-privacy.md). |
| Tool-mediated workflow    | OCR tool -> language model -> validator              | error attribution across components.                     |

## An extraction contract

```json
{
  "input": ["invoice_scan.png", "Extract supplier, date, total, currency"],
  "output_schema": { "supplier": "string", "total": "number", "currency": "string" },
  "validation": ["required_fields", "total_matches_line_items"]
}
```

This contract is deliberately explicit about validation. A multimodal model may read the total incorrectly because the image is blurry, because OCR split the currency symbol, or because the language model inferred a plausible total from line items. The downstream system should not treat the final JSON as ground truth without checks.

## Evaluation

Evaluate by modality and by degradation. For images, slice by resolution, blur, rotation, screenshots, handwriting, tables, and diagrams. For audio, slice by noise, accents, overlapping speakers, and domain vocabulary. For video, slice by temporal localization and whether the relevant event is visible. Also test abstention: if the image is unreadable, the model should say so rather than fill gaps from prior knowledge.

Multimodal systems are especially prone to hidden [hallucination](hallucination-mitigation.md), because final text can sound confident even when visual evidence was weak. Require evidence references for high-stakes extraction and avoid asking the model to infer invisible attributes.

## Caveats

Perception errors and language errors look similar in final text. Evaluate by modality, image quality, layout, language, and refusal on unreadable inputs. Also track whether the model uses visible evidence or fills gaps from prior knowledge, because fluent answers can hide weak visual grounding. Privacy risk is higher because images and audio can contain incidental bystanders, screens, addresses, or voices that the user did not intend to expose.

## References

- [Radford et al., 2021, CLIP](https://arxiv.org/abs/2103.00020)
- [Alayrac et al., 2022, Flamingo](https://arxiv.org/abs/2204.14198)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← LLM-as-Judge](llm-as-judge.md) [Vision-Language Models →](vision-language-models.md)
