---
title: Temporal Convolutional Networks
slug: time-series-and-forecasting/temporal-convolutional-networks
description: Causal dilated convolutional models for sequence and forecasting tasks.
area: time-series-and-forecasting
topics:
  - temporal-convolutional-networks
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - deep-learning-forecasting.md
  - rnn-and-lstm-forecasting.md
  - transformer-based-forecasting.md
  - n-beats-and-nhits.md
  - ../06-deep-learning/convolutional-neural-networks.md
historical_context: false
last_reviewed: 2026-07-11
---

# Temporal Convolutional Networks

Temporal convolutional networks forecast with one-dimensional convolutions that respect time order. A causal convolution computes each hidden value from the current and previous inputs only, never future inputs. Dilated convolutions skip positions so the receptive field grows quickly without very deep recurrence.

For kernel size $k$ and dilation $d$, a causal convolution at time $t$ uses inputs

$$
x_t,\ x_{t-d},\ x_{t-2d},\ldots,\ x_{t-(k-1)d}.
$$

Stacking layers with increasing dilation lets the model cover long histories while evaluating many time steps in parallel. Residual connections and normalization are often used so deep stacks remain trainable. This gives TCNs a different tradeoff from [RNN and LSTM forecasting](rnn-and-lstm-forecasting.md): less sequential dependency during training, but a receptive field that must be designed to reach the lags that matter.

The receptive field is the key forecasting check. If weekly demand depends on the same weekday several weeks back, the dilation schedule must actually reach those lags. If yearly seasonality matters, a small TCN history window will not discover it by architecture alone. In those cases explicit lag [feature engineering for forecasting](feature-engineering-for-forecasting.md), [SARIMA](sarima.md), or longer-window global models may be better baselines.

TCNs can be used for direct multi-horizon forecasts, quantile heads, or as encoders inside larger [deep learning forecasting](deep-learning-forecasting.md) systems. They are especially attractive when sequences are many, local patterns are repeated, and parallel training speed matters.

## Connections

TCNs are a convolutional branch of deep forecasting. Their receptive fields compete with recurrence in [RNN and LSTM forecasting](rnn-and-lstm-forecasting.md), attention in [transformer-based forecasting](transformer-based-forecasting.md), and basis-expansion models such as [N-BEATS and N-HiTS](n-beats-and-nhits.md).

## References

- [Bai, Kolter, and Koltun, Empirical Evaluation of Generic Convolutional and Recurrent Networks](https://arxiv.org/abs/1803.01271)
- [PyTorch Conv1d documentation](https://pytorch.org/docs/stable/generated/torch.nn.Conv1d.html)
