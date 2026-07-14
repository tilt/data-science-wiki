---
title: Tokenization
slug: generative-ai/tokenization
description: "Splitting text into model tokens that determine context, cost, and generation units."
area: generative-ai
topics:
  - tokenization
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - language-model-architecture.md
  - context-construction.md
  - chunking.md
  - pretraining.md
  - ../08-natural-language-processing/tokenization.md
historical_context: false
last_reviewed: 2026-07-11
---
# Tokenization

Tokenization converts text into the units consumed by a model. It affects [language model architecture](language-model-architecture.md), [pretraining](pretraining.md), prompt cost, [chunking](chunking.md), truncation, and generation boundaries.

## Mechanism

Subword tokenizers learn a vocabulary of pieces so rare words can be represented as combinations. Byte-pair encoding repeatedly merges frequent adjacent symbols; other systems use unigram or byte-level variants. Context limits count tokens, not words, so [context construction](context-construction.md) needs the model's tokenizer.

## Worked BPE Example

Starting with `lowest` as characters plus an end-of-word marker, learned byte-pair merges reduce the sequence:

| Merge rule | Tokens after applying the rule |
| --- | --- |
| Start | `l`, `o`, `w`, `e`, `s`, `t`, `</w>` |
| `l` + `o` -> `lo` | `lo`, `w`, `e`, `s`, `t`, `</w>` |
| `lo` + `w` -> `low` | `low`, `e`, `s`, `t`, `</w>` |
| `e` + `s` -> `es` | `low`, `es`, `t`, `</w>` |
| `es` + `t` -> `est` | `low`, `est`, `</w>` |
| `low` + `est` -> `lowest` | `lowest`, `</w>` |

Without the last merge, the same word would remain split as `low` and `est`. That affects context length, billing, prompt truncation, and the units available to [language model architecture](language-model-architecture.md) during generation.

| Text type | Why token counts can surprise |
| --- | --- |
| Numbers | Digit grouping and separators may split into several tokens. |
| Code | Symbols, indentation, and rare identifiers can tokenize densely. |
| Non-English text | Coverage depends on the tokenizer training mixture. |
| Tables or JSON | Repeated punctuation can consume context quickly. |

## Caveats

Code, tables, numbers, and non-English text can tokenize very differently from prose. Tokenization changes can break cached counts.

## References

- [Hugging Face Tokenizers documentation](https://huggingface.co/docs/tokenizers/en/index)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
