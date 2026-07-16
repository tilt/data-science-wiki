---
title: Natural Language Processing
slug: 08-natural-language-processing
description: Index and learning map for Natural Language Processing.
area: natural-language-processing
topics:
  - "text-preprocessing"
  - "tokenization"
  - "embeddings"
  - "language-modelling"
  - "text-classification"
  - "topic-classification"
  - "urgency-classification"
  - "named-entity-recognition"
  - "entity-linking-and-matching"
  - "information-extraction"
  - "semantic-textual-similarity"
  - "sequence-labelling"
level: foundational
status: draft
page_type: area-index
aliases:
  - "Natural Language Processing"
prerequisites:
  - "02-probability-and-statistics/index.md"
  - "06-deep-learning/index.md"
related:
  - "11-generative-ai/index.md"
  - "12-information-retrieval-and-search/index.md"
historical_context: false
last_reviewed: 2026-07-10
---

# Natural Language Processing

## Summary

Natural language processing covers models and systems that turn text into tokens, labels, spans, embeddings, structured records, or generated language. This section focuses on language-specific tasks and evaluation contracts; broader foundation-model training and agent workflows live in [Generative AI and Agentic Systems](../11-generative-ai/index.md), while retrieval systems live in [Information Retrieval and Search](../12-information-retrieval-and-search/index.md).

The practical distinction is output shape. Text classification predicts document-level labels, sequence labelling predicts token or span annotations, semantic similarity compares meanings, and document understanding combines OCR, layout, text, and extraction.

## Task Map

| Output needed                   | Start with                                                                                                                                          | Typical evaluation concern              |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Clean text representation       | [Text Preprocessing](text-preprocessing.md), [Tokenization](tokenization.md), [Embeddings](embeddings.md)                                           | normalization and vocabulary choices    |
| Document or message labels      | [Text Classification](text-classification.md), [Topic Classification](topic-classification.md), [Urgency Classification](urgency-classification.md) | class imbalance and thresholding        |
| Entities and spans              | [Named Entity Recognition](named-entity-recognition.md), [Sequence Labelling](sequence-labelling.md)                                                | span boundaries and partial matches     |
| Matching and retrieval features | [Semantic Textual Similarity](semantic-textual-similarity.md), [Entity Linking and Matching](entity-linking-and-matching.md)                        | hard negatives and ambiguity            |
| Structured documents            | [OCR and Handwritten Text Recognition](ocr-and-handwritten-text-recognition.md), [Document Understanding](document-understanding.md)                | layout errors and extraction confidence |

## Subtopics

- [Text Preprocessing](text-preprocessing.md)
- [Tokenization](tokenization.md)
- [Embeddings](embeddings.md)
- [Language Modelling](language-modelling.md)
- [Text Classification](text-classification.md)
- [Topic Classification](topic-classification.md)
- [Urgency Classification](urgency-classification.md)
- [Named Entity Recognition](named-entity-recognition.md)
- [Entity Linking and Matching](entity-linking-and-matching.md)
- [Information Extraction](information-extraction.md)
- [Semantic Textual Similarity](semantic-textual-similarity.md)
- [Sequence Labelling](sequence-labelling.md)
- [Summarization](summarization.md)
- [Bert Style Encoders](bert-style-encoders.md)
- [Decoder Only Transformers](decoder-only-transformers.md)
- [Evaluation OF NLP Systems](evaluation-of-nlp-systems.md)
- [OCR and Handwritten Text Recognition](ocr-and-handwritten-text-recognition.md)
- [Document Understanding](document-understanding.md)

> **Learning path — Natural language processing:** [path overview](../00-home-and-navigation/learning-paths.md#natural-language-processing) · [Tokenization](tokenization.md) →
