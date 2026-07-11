---
title: Attention
slug: deep-learning/attention
description: Concise guide to Attention in Deep Learning.
area: deep-learning
topics:
  - attention
level: intermediate
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
# Attention

## Summary

Attention lets a model compute context-dependent weighted combinations of representations. It is the mechanism that allows tokens, patches, or frames to selectively use information from other positions.

## Mechanism

Scaled dot-product attention starts with three learned projections of the input representations: queries $Q$, keys $K$, and values $V$. For one attention head,

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
$$

The matrix $QK^\top$ scores how strongly each query position should use each key position. Dividing by $\sqrt{d_k}$ keeps logits from growing too large as the key dimension increases. The softmax turns scores into weights, and multiplying by $V$ forms the weighted context vectors.

Multi-head attention runs several attention heads in parallel:

$$
\operatorname{head}_i=\operatorname{Attention}(QW_i^Q,KW_i^K,VW_i^V).
$$

The heads are concatenated and projected so different heads can specialize in different relationships, such as local syntax, long-range references, or modality alignment.

## Step-by-step example

In a sentence, the token "it" can attend strongly to the noun it refers to, making the representation depend on context rather than position alone.

## Common failure modes

- Treating attention weights as complete explanations; they show routing of representation, not necessarily causal importance.
- Extending context length without testing whether the model uses distant evidence correctly.
- Ignoring quadratic memory and latency costs in long-sequence workloads.
