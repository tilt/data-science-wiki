---
title: Regularization
slug: deep-learning/regularization
description: "Constraints and training noise that reduce overfitting in high-capacity neural networks."
area: deep-learning
topics:
  - regularization
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - loss-functions.md
  - fine-tuning.md
  - optimizers.md
  - ../03-classical-machine-learning/regularization.md
historical_context: false
last_reviewed: 2026-07-22
---

# Regularization

Regularization changes the training problem so a neural network is less free to memorize. In deep learning this can be explicit penalties in the [loss](loss-functions.md), stochastic training behavior such as dropout, data augmentation, early stopping, or freezing layers during [fine-tuning](fine-tuning.md). It overlaps with but is not identical to [classical regularization](../03-classical-machine-learning/regularization.md): the classical page covers ridge, lasso, and why lasso can prune features, while this page focuses on neural-network training behavior.

## Ways to regularize a network

Deep learning has several regularizers that all fight memorization, each in a different way:

| Technique         | What it does                                   |
| ----------------- | ---------------------------------------------- |
| Weight decay (L2) | shrinks weights toward zero                    |
| Dropout           | randomly zeros activations during training     |
| Early stopping    | halts training when validation stops improving |
| Data augmentation | expands the effective training set             |

The two with an explicit formula are weight decay and dropout.

## Weight decay and dropout

Weight decay adds an L2 term to the empirical loss:

$$
J(\theta)=\frac{1}{n}\sum_i L(f_\theta(x_i),y_i)+\frac{\lambda}{2}\lVert\theta\rVert_2^2.
$$

This is the neural-network version of the same $\ell_2$ shrinkage idea used by [ridge regularization](../03-classical-machine-learning/regularization.md#defining-math). For SGD this contributes $\lambda\theta$ to the gradient. In inverted dropout, a hidden activation $h$ becomes

$$
\tilde h=\frac{m\odot h}{1-p}, \qquad m_j\sim\operatorname{Bernoulli}(1-p),
$$

so the expected activation scale is preserved during training and dropout is disabled at inference.

## Worked example

This snippet contrasts dropout in training and evaluation modes and adds an $L_2$ penalty to a data loss.

```python
import torch

torch.manual_seed(3)
x = torch.ones(6)
dropout = torch.nn.Dropout(p=0.5)
train_out = dropout(x)
dropout.eval()
eval_out = dropout(x)
w = torch.tensor([2.0, -1.0])
data_loss = torch.tensor(0.7)
penalty = 0.1 * (w @ w) / 2
print("dropout_train", train_out.tolist())
print("dropout_eval", eval_out.tolist())
print("loss_with_l2", round((data_loss + penalty).item(), 3))
```

Observed output:

```text
dropout_train [2.0, 2.0, 0.0, 2.0, 0.0, 0.0]
dropout_eval [1.0, 1.0, 1.0, 1.0, 1.0, 1.0]
loss_with_l2 0.95
```

During training, surviving units are scaled by $1/(1-p)=2$ and dropped units are zero. In evaluation mode the same module passes activations through unchanged.

## Caveats

Dropout is often harmful in heavily normalized transformer blocks when applied blindly, while weight decay can be too strong for biases and normalization scales. Regularization strength must be tuned against validation behavior, not copied from a model with different data size or optimizer.

## References

- [Srivastava et al., 2014, Dropout: A Simple Way to Prevent Neural Networks from Overfitting](https://jmlr.org/papers/v15/srivastava14a.html)
- [Goodfellow, Bengio, and Courville, Deep Learning, Chapter 8](https://www.deeplearningbook.org/contents/optimization.html)

> [!nav]
> **Section** — [Deep Learning](index.md)
>
> [← Normalization](normalization.md) [Residual Connections →](residual-connections.md)
