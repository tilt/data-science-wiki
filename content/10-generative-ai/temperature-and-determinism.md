---
title: Temperature and Determinism
slug: generative-ai/temperature-and-determinism
description: Temperature and Determinism overview and practical notes.
area: generative-ai
topics:
  - "temperature"
  - "sampling-and-decoding"
  - "determinism"
level: intermediate
status: draft
page_type: concept
aliases: []
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "openai-text-generation-docs"
---
# Temperature and Determinism

## Summary

Temperature rescales logits before sampling. For logits $z_i$ and temperature $T$:

$$
p_i = \frac{\exp(z_i / T)}{\sum_j \exp(z_j / T)}
$$

Lower temperature sharpens the distribution. Higher temperature flattens it.

## Logits and softmax

A language model produces logits, which are unnormalized scores for possible next tokens. Softmax turns logits into probabilities. Temperature modifies the logits before softmax, changing how concentrated the distribution is.

## Temperature approaching zero

As $T$ approaches zero, the highest-logit token dominates the distribution. In practice, systems often implement temperature zero as greedy decoding or a near-greedy approximation. That reduces randomness but does not guarantee identical hosted outputs across all conditions.

## Sampling, top-k, and top-p

Temperature is only one decoding control. Top-k keeps the $k$ most likely tokens before sampling. Top-p, or nucleus sampling, keeps the smallest set of tokens whose cumulative probability exceeds a threshold. These filters interact with temperature: a high temperature followed by narrow top-k may still be constrained, while a low temperature with broad top-p may still behave mostly greedily.

## Small numeric example

For logits $[2, 1, 0]$:

- At $T=1$, the first token is preferred but alternatives remain plausible.
- At $T=0.5$, the first token becomes much more dominant.
- At $T=2$, the probabilities flatten and lower-scoring tokens become more likely.

The exact probabilities depend on applying softmax after scaling.

## Determinism caveat

A model forward pass can be deterministic under controlled software, hardware, seeds, model weights, and decoding settings. Hosted APIs may still change model versions, serving infrastructure, numeric kernels, safety layers, or hidden defaults, so temperature zero is not a universal reproducibility guarantee.

## Seeds and hosted APIs

Some APIs expose a seed parameter, but reproducibility also depends on model version, request parameters, retrieval context, tool outputs, and post-processing. A seed is useful for regression testing, not a complete provenance record.

## Production recommendations

Record model version, prompt, parameters, seed if available, tool schemas, retrieval inputs, and post-processing code. Use repeated sampling for evaluation when outputs are nondeterministic.

For high-stakes extraction, prefer constrained structured output, low temperature, explicit validation, and repeatable evaluation fixtures. For creative ideation, use higher temperature only when diversity is valuable and downstream review exists.

## References

- Primary: OpenAI API documentation, Text generation.
