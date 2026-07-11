---
title: Vision-Language Models
slug: generative-ai/vision-language-models
description: Vision-Language Models overview and practical notes.
area: generative-ai
topics:
  - "vision-language-models"
  - "multimodal-models"
level: intermediate
status: review
page_type: model
aliases:
  - "VLMs"
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "assran-2025-vjepa2"
---
# Vision-Language Models

## Summary

Vision-language models align visual inputs with language so a system can answer questions, follow instructions, generate captions, extract document fields, or ground text in image regions. They combine a visual encoder with a language model or a joint multimodal architecture.

## Core capabilities

- Image or video captioning: describe visual content in natural language.
- Visual question answering: answer questions conditioned on an image, document, chart, or frame sequence.
- Document understanding: read layout, text, tables, handwriting, stamps, and screenshots.
- Visual grounding: connect words to regions, boxes, or detected objects.
- Multimodal tool use: call OCR, detection, retrieval, or structured extraction tools when the model alone is not reliable.

## Step-by-step example

For invoice extraction, the system receives a scanned invoice and a schema. A VLM reads the image, identifies fields such as supplier, date, total, and line items, and returns structured output. A production workflow then validates arithmetic, checks required fields, compares extracted values against OCR spans, and routes low-confidence cases to human review.

## Evaluation

Evaluation should separate perception errors from language errors. A wrong answer can come from unreadable source text, missed visual evidence, ambiguous instructions, hallucinated reasoning, or invalid structured output. Useful tests include field-level accuracy, citation or span support, refusal on unreadable images, latency, and performance by document type or image quality.

## Contrast with V-JEPA 2

A VLM is defined by language alignment and language-conditioned behavior. V-JEPA 2 is primarily a self-supervised visual representation and world-modeling line; language alignment can be added for video question answering, but it is not the core training objective.

## Related topics

- [Multimodal models](multimodal-models.md)
- [Structured output](structured-output.md)
- [V-JEPA 2 versus Vision-Language Models](../09-video-understanding/v-jepa-2-versus-vision-language-models.md)
