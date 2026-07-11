---
title: Tokenization
slug: natural-language-processing/tokenization
description: Concise guide to Tokenization in Natural Language Processing.
area: natural-language-processing
topics:
  - tokenization
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Tokenization converts raw text into units that NLP models can process. The tokenizer determines vocabulary, sequence length, handling of rare words, and the boundary between text preprocessing and modelling.

## NLP scope

Tokenizers may split by words, characters, subwords, bytes, or language-specific rules. Subword tokenization helps models handle rare words by composing them from smaller units.

## Example

The word "unhappiness" might be split into `un`, `happiness`, or smaller subword pieces depending on the tokenizer. That split affects model length and how meaning is represented.
