---
title: Transformers
slug: deep-learning/transformers
description: Concise guide to Transformers in Deep Learning.
area: deep-learning
topics:
  - transformers
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
# Transformers

## Summary

Transformers are neural architectures built around attention, feed-forward blocks, residual connections, and normalization. They model interactions across tokens, patches, or time steps in parallel.

## Mechanism

A transformer block applies attention, residual connections, normalization, and a position-wise feed-forward network. A common pre-norm decoder block is:

$$
h' = h + \operatorname{SelfAttention}(\operatorname{LN}(h)),
$$

$$
h_{\text{out}} = h' + \operatorname{FFN}(\operatorname{LN}(h')).
$$

Self-attention lets positions in the same sequence exchange information. Cross-attention uses queries from one sequence and keys/values from another, which is common in encoder-decoder models and multimodal conditioning.

Because attention itself is permutation-invariant, transformers need position information. Positional encodings can be fixed sinusoidal vectors, learned position embeddings, rotary position embeddings, or relative-position biases.

## Step-by-step example

In language modelling, each token representation attends to earlier tokens, passes through stacked blocks, and produces next-token probabilities.

## Common failure modes

- Assuming a larger context window means reliable long-context reasoning.
- Forgetting that positional encoding and attention mask choices change what information can flow.
- Comparing transformer variants without controlling for data, parameter count, compute budget, and evaluation protocol.
