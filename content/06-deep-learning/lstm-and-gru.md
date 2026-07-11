---
title: LSTM and GRU
slug: deep-learning/lstm-and-gru
description: "Gated recurrent cells that regulate what sequence information is stored, overwritten, and exposed."
area: deep-learning
topics:
  - lstm-and-gru
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - recurrent-neural-networks.md
  - attention.md
  - transformers.md
  - backpropagation.md
historical_context: false
last_reviewed: 2026-07-11
---
# LSTM and GRU

LSTMs and GRUs are gated variants of [recurrent neural networks](recurrent-neural-networks.md). They were designed to keep useful sequence information across longer gaps than a vanilla tanh recurrence. Modern [attention](attention.md) often wins when parallelism and long-range access matter, but gated RNNs remain useful for streaming and low-latency sequence problems.

## Defining math

An LSTM uses gates to update a cell state:

$$
i_t=\sigma(W_ix_t+U_ih_{t-1}),\quad
f_t=\sigma(W_fx_t+U_fh_{t-1}),\quad
o_t=\sigma(W_ox_t+U_oh_{t-1}),
$$

$$
\tilde c_t=\tanh(W_cx_t+U_ch_{t-1}),\quad
c_t=f_t\odot c_{t-1}+i_t\odot\tilde c_t,\quad
h_t=o_t\odot\tanh(c_t).
$$

A GRU merges cell and hidden state:

$$
z_t=\sigma(W_zx_t+U_zh_{t-1}),\quad
r_t=\sigma(W_rx_t+U_rh_{t-1}),
$$

$$
\tilde h_t=\tanh(W_hx_t+U_h(r_t\odot h_{t-1})),\quad
h_t=(1-z_t)\odot\tilde h_t+z_t\odot h_{t-1}.
$$

The additive state paths reduce the repeated multiplication that makes vanilla [backpropagation](backpropagation.md) through time fragile.

## Worked example

```python
import torch

torch.manual_seed(5)
x = torch.randn(1, 3)
lstm = torch.nn.LSTMCell(3, 4)
gru = torch.nn.GRUCell(3, 4)
h0 = torch.zeros(1, 4)
c0 = torch.zeros(1, 4)
h_lstm, c_lstm = lstm(x, (h0, c0))
h_gru = gru(x, h0)
print("lstm_h", torch.round(h_lstm, decimals=3).tolist())
print("lstm_c", torch.round(c_lstm, decimals=3).tolist())
print("gru_h", torch.round(h_gru, decimals=3).tolist())
```

Observed output:

```text
lstm_h [[-0.0430000014603138, 0.0020000000949949026, -0.09099999815225601, -0.057999998331069946]]
lstm_c [[-0.13099999725818634, 0.004999999888241291, -0.32199999690055847, -0.09399999678134918]]
gru_h [[0.2029999941587448, 0.4490000009536743, 0.10300000011920929, -0.13099999725818634]]
```

The LSTM exposes a hidden state and a separate cell state; the GRU returns only a hidden state. That design difference is the main practical distinction when wiring models.

## Caveats

Gates do not make unlimited memory. Very long dependencies can still fade, and recurrent computation is hard to parallelize across time. Packed sequences, masks, and hidden-state resets must be handled explicitly or batches leak information across examples.

## References

- [Hochreiter and Schmidhuber, 1997, Long Short-Term Memory](https://www.bioinf.jku.at/publications/older/2604.pdf)
- [Chung et al., 2014, Empirical Evaluation of Gated Recurrent Neural Networks on Sequence Modeling](https://arxiv.org/abs/1412.3555)
