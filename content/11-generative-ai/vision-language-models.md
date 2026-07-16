---
title: Vision-Language Models
slug: generative-ai/vision-language-models
description: "Multimodal models that condition language behavior on images, documents, or video frames."
area: generative-ai
topics:
  - vision-language-models
  - multimodal-models
level: intermediate
status: review
page_type: model
aliases:
  - "VLMs"
prerequisites:
  - index.md
related:
  - multimodal-models.md
  - structured-output.md
  - grounding.md
  - ../09-computer-vision/vision-transformers.md
  - ../10-video-understanding/v-jepa-2-versus-vision-language-models.md
historical_context: false
last_reviewed: 2026-07-11
---

# Vision-Language Models

Vision-language models condition text generation or scoring on visual input. They are a [multimodal models](multimodal-models.md) subtype used for image QA, captioning, screenshot understanding, document extraction, and visual grounding.

## Mechanism

A VLM usually encodes an image into visual tokens or features, aligns them with a language model, and generates text conditioned on both visual and textual tokens. Some systems use contrastive image-text encoders; others use cross-attention or projected visual tokens inside a generative decoder. [Structured output](structured-output.md) turns visual perception into usable fields.

For document and screenshot tasks, the model must combine at least three signals: visual appearance, spatial layout, and language. A receipt total is not just a word sequence; it is a value near labels, line items, currency symbols, and page regions. This is why VLM prompts should name the evidence requirement, not only the desired answer.

| Task                     | Evidence the VLM must use              | Common failure                        |
| ------------------------ | -------------------------------------- | ------------------------------------- |
| Image question answering | objects, attributes, spatial relations | answers from priors instead of pixels |
| Document extraction      | text, layout, field labels, tables     | plausible fields from wrong region    |
| Screenshot understanding | UI hierarchy, visible state, icons     | hallucinated invisible controls       |
| Video-frame reasoning    | sampled frames and temporal order      | missed short event or wrong ordering  |

## Concrete artifact

```json
{
  "task": "invoice_extraction",
  "visual_input": "scan.png",
  "required_evidence": ["supplier region", "total amount region"],
  "output": { "supplier": "string", "total": "number", "currency": "string" }
}
```

## Caveats

A VLM can hallucinate unreadable text, miss small visual details, or confuse layout. Evaluate perception separately from language formatting and [grounding](grounding.md). For extraction workflows, include unreadable, rotated, cropped, low-resolution, and multi-page cases so refusal and uncertainty behavior are tested, not only happy paths.

## References

- [Radford et al., 2021, CLIP](https://arxiv.org/abs/2103.00020)
- [Alayrac et al., 2022, Flamingo](https://arxiv.org/abs/2204.14198)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)

> **Section — [Generative AI and Agentic Systems](index.md):** ← [Multimodal Models](multimodal-models.md) · [Stable Diffusion](stable-diffusion.md) →
