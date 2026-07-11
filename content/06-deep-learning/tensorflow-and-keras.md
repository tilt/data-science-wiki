---
title: TensorFlow and Keras
slug: deep-learning/tensorflow-and-keras
description: "A production-oriented tensor framework and high-level neural-network API."
area: deep-learning
topics:
  - tensorflow-and-keras
level: foundational
status: review
page_type: implementation
aliases:
  - tensorflow
  - keras
prerequisites:
  - index.md
related:
  - pytorch.md
  - neural-network-fundamentals.md
  - loss-functions.md
  - optimizers.md
historical_context: false
last_reviewed: 2026-07-11
---
# TensorFlow and Keras

TensorFlow provides tensor execution, automatic differentiation, saved models, and deployment tooling; Keras is its high-level model-building API. A Keras `Dense` layer still implements the same affine-plus-activation mechanism from [neural network fundamentals](neural-network-fundamentals.md), but the framework organizes training through `compile`, `fit`, losses, metrics, callbacks, and export paths. [PyTorch](pytorch.md) tends to make the custom training loop more visible.

## Defining mechanism

A dense classifier computes

$$
z=xW+b,\qquad p=\operatorname{softmax}(z),
$$

then minimizes a [loss](loss-functions.md), often cross-entropy:

$$
L=-\log p_y.
$$

Keras `compile(optimizer=..., loss=...)` binds that objective to an [optimizer](optimizers.md); `fit()` repeatedly batches data, records gradients, and applies updates. Lower-level TensorFlow uses `tf.GradientTape` for custom loops.

## Worked example

TensorFlow is not installed in this workspace, so this runnable NumPy snippet shows the exact dense-layer and softmax computation that a one-layer Keras classifier would perform.

```python
import numpy as np

np.random.seed(15)
x = np.array([[1.0, -2.0]])
W = np.random.normal(size=(2, 3))
b = np.array([0.1, 0.0, -0.1])
logits = x @ W + b
probs = np.exp(logits) / np.exp(logits).sum(axis=1, keepdims=True)
print("dense_logits", np.round(logits, 3).tolist())
print("softmax_probs", np.round(probs, 3).tolist())
print("predicted_class", probs.argmax(axis=1).tolist())
```

Observed output:

```text
dense_logits [[0.791, -0.132, 3.271]]
softmax_probs [[0.075, 0.03, 0.895]]
predicted_class [2]
```

The highest logit dominates the softmax distribution, so the predicted class is index 2. Keras would wrap this same computation in layer objects and training callbacks.

## Caveats

High-level APIs reduce boilerplate but can hide defaults: loss reduction, metric state, training/evaluation mode, and callback side effects matter. Serialization format and serving target should influence design early if the model must run outside Python.

## References

- [TensorFlow guide: Keras, the high-level API for TensorFlow](https://www.tensorflow.org/guide/keras)
- [PyTorch documentation: Autograd mechanics](https://docs.pytorch.org/docs/2.7/notes/autograd.html)
