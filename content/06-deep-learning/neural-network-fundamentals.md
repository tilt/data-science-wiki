---
title: Neural Network Fundamentals
slug: deep-learning/neural-network-fundamentals
description: "Layers, nonlinearities, losses, and gradient-based training as one parameterized function."
area: deep-learning
topics:
  - neural-network-fundamentals
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - backpropagation.md
  - activation-functions.md
  - loss-functions.md
  - optimizers.md
historical_context: false
last_reviewed: 2026-07-11
---
# Neural Network Fundamentals

A neural network is a differentiable function assembled from affine maps and nonlinearities. The simplest dense layer computes

$$
h=\phi(xW+b),
$$

and a stack composes those maps:

$$
f_\theta(x)=f_L(f_{L-1}(\cdots f_1(x))).
$$

The nonlinearity is what makes the model more than a linear projection; without [activation functions](activation-functions.md), any stack of dense layers collapses to one affine layer. Training chooses parameters $\theta$ by minimizing a [loss function](loss-functions.md), usually with gradients from [backpropagation](backpropagation.md) and updates from an [optimizer](optimizers.md).

## Intuition

Hidden layers learn intermediate coordinates that make the target easier to predict. In vision those coordinates may resemble edges or parts; in tabular data they may be interactions that were not manually encoded. The same mechanism also creates the usual risks: a high-capacity network can memorize small data, and a bad loss or initialization can make the optimization problem look harder than the prediction problem really is.

## Worked example

```python
import torch
import torch.nn.functional as F

torch.manual_seed(1)
X = torch.tensor([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])
y = torch.tensor([[0.], [1.], [1.], [0.]])
net = torch.nn.Sequential(torch.nn.Linear(2, 4), torch.nn.Tanh(), torch.nn.Linear(4, 1))
opt = torch.optim.SGD(net.parameters(), lr=0.5)
loss0 = F.binary_cross_entropy_with_logits(net(X), y).item()
for _ in range(400):
    opt.zero_grad()
    loss = F.binary_cross_entropy_with_logits(net(X), y)
    loss.backward()
    opt.step()
probs = torch.sigmoid(net(X)).detach().flatten()
print("loss_before", round(loss0, 4), "loss_after", round(loss.item(), 4))
print("probabilities", torch.round(probs, decimals=3).tolist())
print("predictions", (probs > 0.5).int().tolist())
```

Observed output:

```text
loss_before 0.6955 loss_after 0.0267
probabilities [0.017000000923871994, 0.9679999947547913, 0.9739999771118164, 0.029999999329447746]
predictions [0, 1, 1, 0]
```

The hidden tanh layer lets the network represent XOR, which a purely linear classifier cannot separate in the original two coordinates.

## Caveats

Depth and width are capacity, not quality. The training loop only optimizes the chosen objective; it does not guarantee calibration, robustness, or causal structure. Debug from the pieces: inspect the loss, gradients, activation ranges, and validation errors before changing architecture.

## References

- [Goodfellow, Bengio, and Courville, Deep Learning, Chapter 8: Optimization for Training Deep Models](https://www.deeplearningbook.org/contents/optimization.html)
- [PyTorch documentation: Autograd mechanics](https://docs.pytorch.org/docs/2.7/notes/autograd.html)
