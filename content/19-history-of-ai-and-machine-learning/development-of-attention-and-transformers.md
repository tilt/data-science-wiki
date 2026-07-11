---
title: Development OF Attention and Transformers
slug: history-of-ai-and-machine-learning/development-of-attention-and-transformers
description: Concise guide to Development OF Attention and Transformers in
  History of AI and Machine Learning.
area: history-of-ai-and-machine-learning
topics:
  - development-of-attention-and-transformers
level: foundational
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: true
last_reviewed: 2026-07-11
---
# Development of Attention and Transformers

## Summary

Attention and transformers shifted sequence modelling from recurrent state updates toward content-based interaction between positions. The result was more parallel training and better handling of long-range dependencies.

## Timeline

- Encoder-decoder recurrent models compressed source sequences into fixed-size states, which made long sentences difficult.
- Attention added a learned alignment between decoder states and source positions, letting translation models focus on relevant words.
- Self-attention removed recurrence from the core sequence operation: every position could directly exchange information with other positions.
- Transformers combined self-attention, feed-forward blocks, residual connections, normalization, and positional information into a scalable architecture.

## Historical mechanism

The key shift was replacing fixed-size sequence summaries and recurrent bottlenecks with direct pairwise interaction between positions. Attention made long-range dependencies easier to optimize, and transformers made those interactions parallelizable at scale.
