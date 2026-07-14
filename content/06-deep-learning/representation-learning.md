---
title: Representation Learning
slug: deep-learning/representation-learning
description: "Learning feature spaces that make downstream prediction or reconstruction easier."
area: deep-learning
topics:
  - representation-learning
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - autoencoders.md
  - self-supervised-learning.md
  - contrastive-learning.md
  - transfer-learning.md
  - neural-network-fundamentals.md
historical_context: false
last_reviewed: 2026-07-11
---
# Representation Learning

Representation learning is the practice of learning features instead of hand-designing them. A network maps raw input $x$ to a latent vector $z=f_\theta(x)$ that should make reconstruction, classification, retrieval, or [transfer learning](transfer-learning.md) easier. It is the shared substrate behind [autoencoders](autoencoders.md), [self-supervised learning](self-supervised-learning.md), and [contrastive learning](contrastive-learning.md).

## Defining math

For an encoder $f_\theta$ and downstream head $g_\psi$,

$$
z=f_\theta(x), \qquad \hat y=g_\psi(z).
$$

A supervised representation minimizes

$$
\min_{\theta,\psi}\frac{1}{n}\sum_i L(g_\psi(f_\theta(x_i)),y_i).
$$

An [autoencoder](autoencoders.md) instead learns by reconstruction:

$$
z=f_\theta(x),\qquad \hat x=d_\phi(z),\qquad
L=\lVert x-\hat x\rVert_2^2.
$$

The useful representation is not necessarily the one that preserves every bit of input; it is the one that preserves factors needed by the next task.

## Worked example

This snippet trains a tiny autoencoder for one step and reports reconstruction loss before and after along with one latent vector.

```python
import torch
import torch.nn.functional as F

torch.manual_seed(8)
X = torch.randn(80, 3)
X[:, 2] = X[:, 0] * 0.5 - X[:, 1] * 0.2
enc = torch.nn.Linear(3, 2)
dec = torch.nn.Linear(2, 3)
opt = torch.optim.Adam(list(enc.parameters()) + list(dec.parameters()), lr=0.05)
start = F.mse_loss(dec(enc(X)), X).item()
for _ in range(200):
    opt.zero_grad()
    loss = F.mse_loss(dec(enc(X)), X)
    loss.backward()
    opt.step()
z0 = enc(X[:1]).detach()
print("recon_loss_before", round(start, 4), "after", round(loss.item(), 4))
print("first_latent", torch.round(z0, decimals=3).tolist())
```

Observed output:

```text
recon_loss_before 1.102 after 0.0
first_latent [[1.6230000257492065, 0.7910000085830688]]
```

The third feature is a linear combination of the first two, so a two-dimensional latent code can reconstruct the data essentially perfectly.

## Caveats

Good reconstruction is not the same as semantic usefulness: an autoencoder can preserve nuisance details that hurt a classifier. Conversely, a contrastive or supervised representation can discard information that later tasks need. Evaluate representations with the downstream task, not only with the pretraining loss.

## References

- [Bengio, Courville, and Vincent, 2012, Representation Learning: A Review and New Perspectives](https://arxiv.org/abs/1206.5538)
- [Goodfellow, Bengio, and Courville, Deep Learning, Chapter 15: Representation Learning](https://www.deeplearningbook.org/contents/representation.html)
