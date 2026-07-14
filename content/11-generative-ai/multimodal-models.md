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

## Concrete artifact

```json
{
  "input": ["invoice_scan.png", "Extract supplier, date, total, currency"],
  "output_schema": {"supplier": "string", "total": "number", "currency": "string"},
  "validation": ["required_fields", "total_matches_line_items"]
}
```

## Caveats

Perception errors and language errors look similar in final text. Evaluate by modality, image quality, layout, and refusal on unreadable inputs.

## References

- [Radford et al., 2021, CLIP](https://arxiv.org/abs/2103.00020)
- [Alayrac et al., 2022, Flamingo](https://arxiv.org/abs/2204.14198)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
