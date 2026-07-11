---
title: Decoder Only Transformers
slug: natural-language-processing/decoder-only-transformers
description: Concise guide to Decoder Only Transformers in Natural Language Processing.
area: natural-language-processing
topics:
  - decoder-only-transformers
level: intermediate
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
# Decoder Only Transformers

## Summary

Decoder-only transformers generate text autoregressively: each token is predicted from previous tokens. This architecture underlies many chat and completion models.

## Step-by-step example

Given a prompt, the model repeatedly predicts the next token, appends it to the context, and continues until a stop condition.

## Common failure modes

- Treating the model as bidirectional; a decoder-only model can condition only on previous tokens in the sequence.
- Comparing outputs without fixing prompt format, tokenizer, sampling parameters, and stop conditions.
- Ignoring context-window limits, position handling, and KV-cache memory during long generations.
- Evaluating only final answers while missing error accumulation across generated tokens.
