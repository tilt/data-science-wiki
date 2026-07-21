---
title: RNN and LSTM Forecasting
slug: time-series-and-forecasting/rnn-and-lstm-forecasting
description: Recurrent sequence models for forecasting from ordered windows and covariates.
area: time-series-and-forecasting
topics:
  - rnn-and-lstm-forecasting
level: intermediate
status: complete
page_type: model
aliases:
  - "RNN and Lstm Forecasting"
prerequisites:
  - index.md
related:
  - deep-learning-forecasting.md
  - temporal-convolutional-networks.md
  - transformer-based-forecasting.md
  - machine-learning-forecasting.md
  - ../06-deep-learning/recurrent-neural-networks.md
  - ../06-deep-learning/lstm-and-gru.md
historical_context: false
last_reviewed: 2026-07-20
---

# RNN and LSTM Forecasting

RNN forecasters process a sequence one time step at a time while carrying a hidden state. For a simple recurrent model,

$$
h_t = f(W_x x_t + W_h h_{t-1} + b), \qquad \hat{y}_{t+h}=g(h_t).
$$

The input $x_t$ can include the target history, observed covariates, entity embeddings, and calendar features. The hidden state is the learned summary of the past that the forecast head uses for one or more future horizons.

LSTMs and GRUs modify the recurrent update with gates that control what to keep, forget, and expose. This helps with longer dependencies compared with a plain RNN, where gradients can vanish or explode through many repeated updates. In forecasting, the practical distinction is not just "long memory"; it is whether the model can learn useful state transitions from enough leakage-free historical windows.

There are several output designs. A recursive model predicts one step and feeds that prediction back for later horizons. A direct multi-horizon model emits the full horizon at once. Encoder-decoder models read a history window and decode future steps, often with known future covariates such as holidays or planned prices. DeepAR-style models use recurrent state to parameterize a predictive distribution rather than only a point forecast, connecting recurrent forecasting to [probabilistic forecasting](probabilistic-forecasting.md).

RNNs and LSTMs can underperform simpler [feature engineering for forecasting](feature-engineering-for-forecasting.md) when series are short, seasonality is easy to encode, or covariate leakage is present. Their strongest use case is usually global learning across many related sequences where a shared recurrent representation can transfer behavior between entities.

## Connections

RNN/LSTM forecasters are one branch of [deep learning forecasting](deep-learning-forecasting.md). They share sequence-modeling concerns with [temporal convolutional networks](temporal-convolutional-networks.md), [transformer-based forecasting](transformer-based-forecasting.md), and the deep-learning pages on [recurrent neural networks](../06-deep-learning/recurrent-neural-networks.md) and [LSTM and GRU](../06-deep-learning/lstm-and-gru.md).

## References

- [Salinas, Flunkert, and Gasthaus, DeepAR](https://arxiv.org/abs/1704.04110)
- [PyTorch LSTM documentation](https://pytorch.org/docs/stable/generated/torch.nn.LSTM.html)
- [Nixtla NeuralForecast documentation](https://nixtlaverse.nixtla.io/neuralforecast/docs/getting-started/introduction.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Deep Learning Forecasting](deep-learning-forecasting.md) [Temporal Convolutional Networks →](temporal-convolutional-networks.md)
