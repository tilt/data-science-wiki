---
title: Contrastive Learning
slug: deep-learning/contrastive-learning
description: "Self-supervised representation learning by pulling positive pairs together and negatives apart."
area: deep-learning
topics:
  - contrastive-learning
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - self-supervised-learning.md
  - representation-learning.md
  - multimodal-learning.md
  - ../11-information-retrieval-and-search/dense-retrieval.md
historical_context: false
last_reviewed: 2026-07-11
---
# Contrastive Learning

Contrastive learning trains an embedding space by defining positives and negatives. In [self-supervised learning](self-supervised-learning.md), positives are often two augmentations of the same item; in [multimodal learning](multimodal-learning.md), positives can be paired image-text examples. The resulting vectors are useful for [dense retrieval](../11-information-retrieval-and-search/dense-retrieval.md) and downstream classifiers.

## Defining math

For normalized embeddings $z_i,z_j$ and temperature $\tau$, the NT-Xent loss for positive pair $(i,j)$ is

$$
\ell_{i,j}=-\log\frac{\exp(\operatorname{sim}(z_i,z_j)/\tau)}
{\sum_{k\ne i}\exp(\operatorname{sim}(z_i,z_k)/\tau)}.
$$

The numerator pulls the positive together; the denominator pushes the anchor away from every other item in the batch. Temperature controls how sharply the softmax focuses on hard negatives.

## Worked example

```python
import torch
import torch.nn.functional as F

torch.manual_seed(10)
z = F.normalize(torch.randn(4, 3), dim=1)
z[1] = F.normalize(z[0] + 0.1 * torch.randn(3), dim=0)
z[3] = F.normalize(z[2] + 0.1 * torch.randn(3), dim=0)
sim = z @ z.T / 0.5
sim.fill_diagonal_(-1e9)
targets = torch.tensor([1, 0, 3, 2])
loss = F.cross_entropy(sim, targets)
probs = sim.softmax(1)[torch.arange(4), targets]
print("nt_xent_loss", round(loss.item(), 4))
print("positive_probs", torch.round(probs, decimals=3).tolist())
```

Observed output:

```text
nt_xent_loss 0.9418
positive_probs [0.38600000739097595, 0.3869999945163727, 0.3959999978542328, 0.3919999897480011]
```

The positive pairs are already close, but each anchor still assigns substantial probability to negatives. Training would raise the positive probabilities and lower the loss.

## Caveats

Batch composition changes the task: false negatives can push semantically similar items apart, and too-easy negatives teach little. Augmentations define invariances, so an image model can become insensitive to information that a later task needs. Temperature is not cosmetic; it changes gradient concentration.

## References

- [Chen et al., 2020, SimCLR](https://arxiv.org/abs/2002.05709)
- [Radford et al., 2021, Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)
