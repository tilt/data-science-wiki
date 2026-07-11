---
title: Language Modelling
slug: natural-language-processing/language-modelling
description: Concise guide to Language Modelling in Natural Language Processing.
area: natural-language-processing
topics:
  - language-modelling
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Language Modelling

## Summary

Language modelling estimates the probability of token sequences or predicts missing and future tokens. It underlies autocomplete, speech recognition, translation, and generative models.

## Step-by-step example

A next-token model sees "the capital of France is" and assigns high probability to "Paris" based on learned patterns and context.

## Common failure modes

- Training Language Modelling on ambiguous labels or annotation rules that annotators apply inconsistently.
- Evaluating only clean examples while long, multilingual, noisy, or domain-specific text fails.
- Ignoring entity, span, or document-level errors because the aggregate metric looks acceptable.

- Domain shift in vocabulary, style, language, or document structure.
- Evaluating surface form while missing semantic correctness or downstream utility.
