---
title: Video Transformers
slug: video-understanding/video-transformers
description: "Transformer architectures that apply attention over spatial and temporal video tokens."
area: video-understanding
topics:
  - video-transformers
level: advanced
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - 3d-convolutional-networks.md
  - two-stream-models.md
  - video-language-models.md
  - ../06-deep-learning/attention.md
historical_context: false
last_reviewed: 2026-07-11
---
# Video Transformers

Video transformers tokenize a clip into frame patches or tubelets and let attention route information across space and time. Compared with [3D convolutional networks](3d-convolutional-networks.md), they are less tied to local kernels; compared with [two-stream models](two-stream-models.md), they learn motion interactions inside the same token system that carries appearance. Their core operation is the same scaled dot-product [attention](../06-deep-learning/attention.md) used in language models.

## Defining mechanism

For $N$ video tokens with dimension $d_k$,

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
$$

Full space-time attention forms an $N\times N$ score matrix, where $N=(T/\tau)(H/P)(W/P)$ for tubelet length $\tau$ and patch size $P$. Factorized variants attend spatially and temporally in separate steps to reduce cost and stabilize learning.

## Worked example

```python
import math, torch

torch.manual_seed(4)
frames, h, w, patch, tubelet = 8, 16, 16, 8, 2
tokens = (frames//tubelet) * (h//patch) * (w//patch)
Q = torch.randn(tokens, 4); K = torch.randn(tokens, 4); V = torch.randn(tokens, 4)
weights = (Q @ K.T / math.sqrt(4)).softmax(-1)
context = weights @ V
print("tokens", tokens, "attention_scores", tokens*tokens)
print("row0_top3_weights", torch.round(torch.topk(weights[0], 3).values, decimals=3).tolist())
print("context0", torch.round(context[0], decimals=3).tolist())
```

Observed output:

```text
tokens 16 attention_scores 256
row0_top3_weights [0.17100000381469727, 0.13099999725818634, 0.10899999737739563]
context0 [0.2280000001192093, -0.13300000131130219, -0.041999999433755875, -0.35100001096725464]
```

Even this tiny clip builds 256 pairwise scores. Real clips quickly make token count the dominant memory and latency constraint, which matters for [real-time video understanding](real-time-video-understanding.md).

## Caveats

Attention can model long-range dependencies, but it does not automatically solve sampling, supervision, or temporal boundary errors. Long videos require sparse, factorized, streaming, or hierarchical designs. Fine-tuning image-pretrained transformers can help, but video-specific motion cues still need adequate temporal coverage.

## References

- [Bertasius et al., 2021, Is Space-Time Attention All You Need for Video Understanding?](https://arxiv.org/abs/2102.05095)
- [Arnab et al., 2021, ViViT: A Video Vision Transformer](https://arxiv.org/abs/2103.15691)
- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)
