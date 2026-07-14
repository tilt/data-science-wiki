---
title: Transformers
slug: deep-learning/transformers
description: "Attention-based sequence architectures with residual, normalization, and feed-forward blocks."
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
  - attention.md
  - normalization.md
  - recurrent-neural-networks.md
  - ../08-natural-language-processing/bert-style-encoders.md
  - ../11-generative-ai/language-model-architecture.md
historical_context: false
last_reviewed: 2026-07-11
---
# Transformers

Transformers replace recurrent state updates with stacks of [attention](attention.md), feed-forward networks, residual paths, and [normalization](normalization.md). They process tokens, patches, or other items in parallel, then use attention masks and positional information to control what each position can use. This is why they sit behind modern [BERT-style encoders](../08-natural-language-processing/bert-style-encoders.md) and autoregressive [language models](../11-generative-ai/language-model-architecture.md).

## Defining math

A common pre-norm block is

$$
h' = h + \operatorname{SelfAttention}(\operatorname{LN}(h)),
$$

$$
h_{\text{out}} = h' + \operatorname{FFN}(\operatorname{LN}(h')).
$$

The feed-forward network is applied independently at each position:

$$
\operatorname{FFN}(x)=W_2\phi(W_1x+b_1)+b_2.
$$

Encoder blocks usually use bidirectional self-attention. Decoder language models use a causal mask so token $t$ cannot attend to positions $>t$, avoiding label leakage.

## Worked example

```python
import math, torch

torch.manual_seed(7)
X = torch.randn(3, 4)
Q = K = V = X
mask = torch.triu(torch.ones(3, 3) * float("-inf"), diagonal=1)
weights = ((Q @ K.T) / math.sqrt(4) + mask).softmax(-1)
attn = weights @ V
ffn = torch.relu(attn @ torch.randn(4, 8)) @ torch.randn(8, 4)
print("causal_weights", torch.round(weights, decimals=3).tolist())
print("block_output_shape", list(ffn.shape))
```

Observed output:

```text
causal_weights [[1.0, 0.0, 0.0], [0.017999999225139618, 0.9819999933242798, 0.0], [0.07400000095367432, 0.33000001311302185, 0.5950000286102295]]
block_output_shape [3, 4]
```

The upper-triangular mask forces the first token to see only itself and the second token to ignore the third. The block preserves sequence length and embedding width.

## Caveats

Quadratic attention cost is the obvious bottleneck, but positional encoding and masking are equally decisive. A larger context window does not imply reliable use of distant evidence. Pre-norm and post-norm variants can train differently even when parameter counts match.

## References

- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [PyTorch documentation: TransformerEncoderLayer](https://docs.pytorch.org/docs/2.7/generated/torch.nn.TransformerEncoderLayer.html)
