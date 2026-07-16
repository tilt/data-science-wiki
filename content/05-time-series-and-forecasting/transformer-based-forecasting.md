---
title: Transformer-Based Forecasting
slug: time-series-and-forecasting/transformer-based-forecasting
description: Attention-based architectures adapted to multi-horizon time-series forecasting.
area: time-series-and-forecasting
topics:
  - transformer-based-forecasting
level: advanced
status: review
page_type: model
aliases:
  - "Transformer Based Forecasting"
prerequisites:
  - index.md
related:
  - deep-learning-forecasting.md
  - rnn-and-lstm-forecasting.md
  - temporal-convolutional-networks.md
  - n-beats-and-nhits.md
  - ../06-deep-learning/attention.md
  - ../06-deep-learning/transformers.md
historical_context: false
last_reviewed: 2026-07-11
---

# Transformer-Based Forecasting

Transformer forecasters adapt [attention](../06-deep-learning/attention.md) to temporal data. Instead of carrying a recurrent state, the model forms query, key, and value representations for time steps or patches and combines history through attention weights:

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
$$

For forecasting, token design matters as much as the attention equation. Tokens may represent individual time steps, patches of a long sequence, variables, or entity-time combinations. Inputs often combine past targets, observed covariates, known future covariates, static entity features, and positional or calendar encodings. The forecast head then emits one or more horizons, sometimes as quantiles for [probabilistic forecasting](probabilistic-forecasting.md).

Temporal Fusion Transformer is a well-known example for multi-horizon forecasting. It combines recurrent local processing, interpretable variable selection, gating, static covariate encoders, and attention over temporal features. Other transformer variants reduce attention cost or patch long histories to make longer context practical.

The main failure mode is assuming attention solves time-series structure by default. A transformer can attend to leaked future covariates, memorize entity identity, or waste capacity on short series where [exponential smoothing](exponential-smoothing.md), [ARIMA](arima.md), or gradient-boosted lag features are stronger. Backtests should be segmented by horizon, series age, volatility, and calendar regime before attributing gains to long-range context.

The architecture is most defensible when there are many related series, important known future covariates, or interactions across variables that simpler lag models miss. For a small univariate series, attention often adds variance before it adds signal.

## Connections

Transformer forecasting adapts [transformers](../06-deep-learning/transformers.md) to temporal data. It is one branch of [deep learning forecasting](deep-learning-forecasting.md), alongside [RNN and LSTM forecasting](rnn-and-lstm-forecasting.md), [temporal convolutional networks](temporal-convolutional-networks.md), and [N-BEATS and N-HiTS](n-beats-and-nhits.md).

## References

- [Lim et al., Temporal Fusion Transformers](https://arxiv.org/abs/1912.09363)
- [Vaswani et al., Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Nixtla NeuralForecast documentation](https://nixtlaverse.nixtla.io/neuralforecast/docs/getting-started/introduction.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Temporal Convolutional Networks](temporal-convolutional-networks.md) [N-BEATS and N-HiTS →](n-beats-and-nhits.md)
