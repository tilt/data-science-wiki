---
title: N-BEATS and N-HiTS
slug: time-series-and-forecasting/n-beats-and-nhits
description: Neural basis-expansion and hierarchical interpolation architectures for time-series forecasting.
area: time-series-and-forecasting
topics:
  - n-beats-and-nhits
level: advanced
status: complete
page_type: model
aliases:
  - "N Beats and Nhits"
prerequisites:
  - index.md
related:
  - deep-learning-forecasting.md
  - temporal-convolutional-networks.md
  - transformer-based-forecasting.md
  - probabilistic-forecasting.md
  - forecast-error-metrics.md
historical_context: false
last_reviewed: 2026-07-20
---

# N-BEATS and N-HiTS

N-BEATS and N-HiTS are neural forecasting architectures built around direct multi-step forecasts from fixed history windows. They are not generic sequence encoders like [RNN and LSTM forecasting](rnn-and-lstm-forecasting.md) or attention models. Their distinctive idea is to stack blocks that repeatedly explain part of the input history and contribute part of the forecast.

In N-BEATS, each block receives a residual backcast input $x$, passes it through fully connected layers, and emits two vectors: a backcast $\hat{x}$ that tries to explain the input window, and a forecast $\hat{y}$ for the horizon. The next block receives the residual $x-\hat{x}$, while forecasts from blocks are added:

$$
\hat{y} = \sum_b \hat{y}^{(b)}.
$$

Some N-BEATS stacks use generic learned bases. Interpretable stacks constrain the basis so one part behaves like trend and another like seasonality. The residual stacking is the mechanism: later blocks focus on structure earlier blocks did not explain.

N-HiTS keeps the residual-stack idea but changes how blocks handle resolution. It uses hierarchical interpolation and multi-rate sampling so different stacks specialize in different frequency bands. Coarser blocks can model slow long-horizon movement cheaply; finer blocks can model near-term detail. That design targets a practical weakness of plain fully connected horizon models: long horizons can be expensive and can mix low-frequency and high-frequency signals in one representation.

These models usually work best as global models across many related series with careful scaling, window construction, and horizon-specific evaluation. They are poor magic defaults for small single series where [statistical forecasting](statistical-forecasting.md), [ARIMA](arima.md), or [exponential smoothing](exponential-smoothing.md) already fit the structure. If probabilistic outputs are needed, the loss and output head must be chosen accordingly, for example quantile outputs tied to [quantile loss](quantile-loss.md).

## Connections

N-BEATS and N-HiTS are specialized [deep learning forecasting](deep-learning-forecasting.md) models. They compete with [temporal convolutional networks](temporal-convolutional-networks.md) and [transformer-based forecasting](transformer-based-forecasting.md), and their value should be established through [forecast error metrics](forecast-error-metrics.md) by horizon and segment.

## References

- [Oreshkin et al., N-BEATS](https://arxiv.org/abs/1905.10437)
- [Challu et al., N-HiTS](https://arxiv.org/abs/2201.12886)
- [Nixtla NeuralForecast model documentation](https://nixtlaverse.nixtla.io/neuralforecast/docs/getting-started/introduction.html)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Transformer-Based Forecasting](transformer-based-forecasting.md) [Forecast Evaluation →](forecast-evaluation.md)
