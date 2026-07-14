---
title: BERT-Style Encoders
slug: natural-language-processing/bert-style-encoders
description: "Bidirectional transformer encoders trained to produce contextual token and sentence representations."
area: natural-language-processing
topics:
  - bert-style-encoders
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - embeddings.md
  - tokenization.md
  - decoder-only-transformers.md
  - sequence-labelling.md
  - semantic-textual-similarity.md
  - ../06-deep-learning/transformers.md
historical_context: false
last_reviewed: 2026-07-11
---

# BERT-Style Encoders

BERT-style encoders read an entire token sequence bidirectionally and produce contextual representations for tokens or pooled text. They are strong for [sequence labelling](sequence-labelling.md), [semantic textual similarity](semantic-textual-similarity.md), classification, reranking, and feature extraction. Unlike [decoder-only transformers](decoder-only-transformers.md), they are not trained to generate left-to-right completions.

## Defining mechanism

Encoder self-attention has no causal future mask:

$$
H^{(\ell+1)}=\operatorname{TransformerEncoderLayer}(H^{(\ell)}),
$$

so token $i$ can attend to tokens on both sides. BERT-style pretraining commonly uses masked language modelling:

$$
\mathcal L_{\text{MLM}}=-\sum_{i\in M}\log P_\theta(t_i\mid t_{\setminus M}),
$$

where $M$ is the set of masked positions. [Tokenization](tokenization.md) defines those positions, and the resulting contextual [embeddings](embeddings.md) can be fine-tuned or reused.

## Worked example

This snippet computes bidirectional self-attention weights for token embeddings and shows that the first token can attend to later positions.

```python
import math, torch

torch.manual_seed(7)
X = torch.randn(4, 3)
Wq, Wk, Wv = torch.randn(3, 3), torch.randn(3, 3), torch.randn(3, 2)
weights = torch.softmax((X @ Wq) @ (X @ Wk).T / math.sqrt(3), dim=-1)
print("row0_weights", torch.round(weights[0], decimals=3).tolist())
print("row0_future_mass_positions_1_to_3", round(float(weights[0,1:].sum()), 3))
print("all_rows_sum", torch.round(weights.sum(dim=1), decimals=3).tolist())
```

Observed output:

```text
row0_weights [0.257999986410141, 0.019999999552965164, 0.04399999976158142, 0.6769999861717224]
row0_future_mass_positions_1_to_3 0.742
all_rows_sum [1.0, 1.0, 1.0, 1.0]
```

Position 0 places most of its attention mass on later positions because no causal mask blocks them. That is useful for understanding tasks but invalid for next-token generation.

## Caveats

Encoder outputs are sensitive to truncation, pooling choice, and domain mismatch. A classifier head can overfit annotation artifacts even when the base encoder is strong. For multilingual or noisy inputs, inspect tokenizer fragmentation and slice metrics before trusting pooled vectors.

## References

- [Devlin et al., BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805)
- [Vaswani et al., Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [PyTorch documentation: MultiheadAttention](https://docs.pytorch.org/docs/2.7/generated/torch.nn.MultiheadAttention.html)
