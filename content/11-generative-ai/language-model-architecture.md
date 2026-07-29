---
title: Language Model Architecture
slug: generative-ai/language-model-architecture
description: "Decoder-style transformer machinery behind next-token generation."
area: generative-ai
topics:
  - language-model-architecture
level: intermediate
status: complete
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - ../06-deep-learning/attention.md
  - tokenization.md
  - sampling-and-decoding.md
  - pretraining.md
  - context-construction.md
historical_context: false
last_reviewed: 2026-07-29
---

# Language Model Architecture

A modern language model usually tokenizes text, embeds tokens and positions, applies stacks of masked self-attention and feed-forward blocks, then projects hidden states to vocabulary logits for [sampling and decoding](sampling-and-decoding.md). The core mechanism is the transformer [attention](../06-deep-learning/attention.md) block. The architecture produces a probability distribution over the next token; product behavior comes from training, prompts, tools, and runtime controls around that distribution.

## Causal self-attention

Causal self-attention uses

$$
\operatorname{softmax}\left(\frac{QK^\top+M}{\sqrt{d_k}}\right)V,
$$

where mask $M$ sets future positions to $-\infty$. [Pretraining](pretraining.md) then optimizes next-token likelihood over [tokenization](tokenization.md) outputs.

The mask is what makes decoder language modeling causal. At generation time, the model can condition on the prompt and previously generated tokens, but not on future target tokens. During training, the same mask prevents label leakage.

## Worked mask example

For a three-token prefix, causal masking permits only the lower-triangular part of the attention matrix:

| Query position | Can attend to token 1 | Can attend to token 2 | Can attend to token 3 | Reason                                             |
| -------------- | --------------------: | --------------------: | --------------------: | -------------------------------------------------- |
| Token 1        |                   yes |                    no |                    no | No future context is available.                    |
| Token 2        |                   yes |                   yes |                    no | The model may use the prefix seen so far.          |
| Token 3        |                   yes |                   yes |                   yes | All positions up to the current token are visible. |

With unmasked scores $(2,1,0)$ at every row, the masked softmax weights become roughly $(1,0,0)$ for token 1, $(0.731,0.269,0)$ for token 2, and $(0.665,0.245,0.090)$ for token 3. The values differ by row because the denominator only includes visible positions. Without this mask, next-token training would leak future labels.

| Component              | Function                                                |
| ---------------------- | ------------------------------------------------------- |
| Token embedding        | Converts token IDs into vectors.                        |
| Positional information | Tells attention where each token sits in the sequence.  |
| Masked self-attention  | Routes information from earlier visible tokens.         |
| Feed-forward block     | Applies a position-wise nonlinear transformation.       |
| Vocabulary projection  | Converts the final hidden state into next-token logits. |

## From hidden state to text

At the final position, the model produces a hidden vector. A learned vocabulary projection turns it into logits, one score per token in the vocabulary. [Sampling and decoding](sampling-and-decoding.md) then chooses the next token by greedy decoding, temperature sampling, nucleus sampling, or another rule. The chosen token is appended to the context, and the process repeats.

This loop explains several product behaviors:

- Long prompts increase prefill work before the first token appears.
- Long outputs are slow because tokens are decoded sequentially.
- The model can be fluent without being grounded, because logits come from learned parameters and current context.
- Tool use is not part of the transformer block; it is orchestration around model outputs.

## Architecture versus system behavior

Architecture choices affect context length, latency, memory, and raw capability. They do not by themselves enforce privacy, citations, tool permissions, or domain policy. Those belong to [context construction](context-construction.md), [tool use](tool-use-and-function-calling.md), guardrails, and evaluation.

## Caveats

Long contexts increase attention memory and retrieval confusion. Architecture alone does not define product behavior; prompts, tools, safety layers, and context do. Treat architectural capability as the substrate, not the whole application.

## References

- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Foundation Models](foundation-models.md) [Tokenization →](tokenization.md)
