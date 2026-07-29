---
title: Tokenization
slug: generative-ai/tokenization
description: "Splitting text into model tokens that determine context, cost, and generation units."
area: generative-ai
topics:
  - tokenization
level: foundational
status: complete
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
  - cost-and-latency-optimization.md
historical_context: false
last_reviewed: 2026-07-29
---

# Tokenization

Tokenization converts text into the units consumed by a model. It affects [language model architecture](language-model-architecture.md), [pretraining](pretraining.md), prompt cost, [chunking](chunking.md), truncation, latency, and generation boundaries. In production systems, "how many tokens?" is a cost, context, and reliability question, not only a preprocessing detail.

## Subword vocabularies

Subword tokenizers learn a vocabulary of pieces so rare words can be represented as combinations. Byte-pair encoding repeatedly merges frequent adjacent symbols; other systems use unigram or byte-level variants. Context limits count tokens, not words, so [context construction](context-construction.md) needs the model's tokenizer.

## Worked BPE Example

Starting with `lowest` as characters plus an end-of-word marker, learned byte-pair merges reduce the sequence:

| Merge rule                | Tokens after applying the rule       |
| ------------------------- | ------------------------------------ |
| Start                     | `l`, `o`, `w`, `e`, `s`, `t`, `</w>` |
| `l` + `o` -> `lo`         | `lo`, `w`, `e`, `s`, `t`, `</w>`     |
| `lo` + `w` -> `low`       | `low`, `e`, `s`, `t`, `</w>`         |
| `e` + `s` -> `es`         | `low`, `es`, `t`, `</w>`             |
| `es` + `t` -> `est`       | `low`, `est`, `</w>`                 |
| `low` + `est` -> `lowest` | `lowest`, `</w>`                     |

Without the last merge, the same word would remain split as `low` and `est`. That affects context length, billing, prompt truncation, and the units available to [language model architecture](language-model-architecture.md) during generation.

| Text type        | Why token counts can surprise                                    |
| ---------------- | ---------------------------------------------------------------- |
| Numbers          | Digit grouping and separators may split into several tokens.     |
| Code             | Symbols, indentation, and rare identifiers can tokenize densely. |
| Non-English text | Coverage depends on the tokenizer training mixture.              |
| Tables or JSON   | Repeated punctuation can consume context quickly.                |

## Why token counts matter

| System concern       | Tokenization effect                                                   |
| -------------------- | --------------------------------------------------------------------- |
| Context budget       | long prompts may evict evidence, examples, or instructions.           |
| Cost                 | hosted APIs usually bill on input and output tokens.                  |
| Latency              | long inputs increase prefill time; long outputs increase decode time. |
| Retrieval chunks     | chunk boundaries should target token counts, not character counts.    |
| Structured output    | JSON punctuation and repeated field names consume output budget.      |
| Multilingual support | some languages may require more tokens for the same meaning.          |

## Realistic failure case

A support RAG system chunks documents by 2,000 characters and assumes each chunk fits comfortably. A policy table with many product IDs, currency values, and JSON-like snippets tokenizes far denser than prose. At runtime, the context packer silently drops the final chunk containing the actual approval rule. The final answer then looks like a model hallucination, but the root cause is token-budget accounting.

The fix is to measure chunks with the target model tokenizer, reserve budget for instructions and output, and log both input-token and output-token counts for [cost and latency optimization](cost-and-latency-optimization.md).

## Caveats

Code, tables, numbers, and non-English text can tokenize very differently from prose. Tokenization changes can break cached counts, chunk sizes, prompt templates, and latency estimates. Always count with the tokenizer of the model that will actually serve the request.

## References

- [Hugging Face Tokenizers documentation](https://huggingface.co/docs/tokenizers/en/index)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Language Model Architecture](language-model-architecture.md) [Pretraining →](pretraining.md)
