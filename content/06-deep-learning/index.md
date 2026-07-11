---
title: Deep Learning
slug: 06-deep-learning
description: "Learning map for neural network mechanisms, architectures, representation learning, and training systems."
area: deep-learning
topics:
  - neural-network-fundamentals
  - backpropagation
  - activation-functions
  - loss-functions
  - initialization
  - normalization
  - regularization
  - optimizers
  - convolutional-neural-networks
  - recurrent-neural-networks
  - lstm-and-gru
  - attention
  - transformers
  - representation-learning
  - self-supervised-learning
  - contrastive-learning
  - transfer-learning
  - fine-tuning
  - multimodal-learning
  - distributed-training
  - mixed-precision
  - pytorch
  - tensorflow-and-keras
level: foundational
status: review
page_type: area-index
aliases:
  - Deep Learning
prerequisites:
  - ../01-mathematical-foundations/index.md
  - ../03-classical-machine-learning/index.md
related:
  - ../07-natural-language-processing/index.md
  - ../08-computer-vision/index.md
  - ../10-generative-ai/index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Deep Learning

Deep learning studies neural networks as trainable function approximators: layers define the computation, losses define the target, gradients move parameters, and architecture choices determine what structure is easy to learn. Use this section as a mechanism-first path rather than a catalogue.

## Fundamentals

- [Neural Network Fundamentals](neural-network-fundamentals.md): how affine layers, nonlinearities, losses, and optimizers combine into a trainable model.
- [Backpropagation](backpropagation.md): reverse-mode chain-rule differentiation through a computational graph.
- [Activation Functions](activation-functions.md): nonlinearities that control expressiveness and gradient flow.
- [Loss Functions](loss-functions.md): differentiable objectives for regression, binary classification, multiclass classification, and regularized training.

## Training Mechanics

- [Optimizers](optimizers.md): SGD, momentum, and Adam-style rules that turn gradients into updates.
- [Initialization](initialization.md): starting weight scales that keep activations and gradients usable.
- [Normalization](normalization.md): batch and layer standardization with trainable affine recovery.
- [Regularization](regularization.md): dropout, weight penalties, freezing, and other ways to reduce memorization.

## Architectures

- [Convolutional Neural Networks](convolutional-neural-networks.md): shared local filters for grids and images.
- [Recurrent Neural Networks](recurrent-neural-networks.md): stateful sequence models with shared temporal transitions.
- [LSTM and GRU](lstm-and-gru.md): gated recurrent cells for longer sequence credit assignment.
- [Attention](attention.md): content-based weighted routing between positions or modalities.
- [Transformers](transformers.md): attention, residual, normalization, and feed-forward blocks for parallel sequence modeling.

## Representation Learning

- [Representation Learning](representation-learning.md): learned feature spaces for reconstruction, prediction, retrieval, and transfer.
- [Self-Supervised Learning](self-supervised-learning.md): pretext objectives generated from unlabeled data.
- [Contrastive Learning](contrastive-learning.md): embedding objectives that pull positives together and push negatives apart.
- [Transfer Learning](transfer-learning.md): reusing pretrained features on a new task.
- [Fine-Tuning](fine-tuning.md): selectively updating pretrained parameters or adapters.
- [Multimodal Learning](multimodal-learning.md): aligning and fusing text, image, audio, video, and other modalities.

## Engineering

- [PyTorch](pytorch.md): dynamic-tape tensor programming and explicit training loops.
- [TensorFlow and Keras](tensorflow-and-keras.md): high-level model APIs and production-oriented TensorFlow workflows.
- [Mixed Precision](mixed-precision.md): lower-precision arithmetic with scaling and FP32 safeguards.
- [Distributed Training](distributed-training.md): synchronized or partitioned training across devices and machines.
