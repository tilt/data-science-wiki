---
title: Markov Renewal Processes
slug: probability-and-statistics/markov-renewal-processes
description: "State-transition processes that model both the next state and the waiting time until that transition."
area: probability-and-statistics
topics:
  - markov-renewal-processes
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - markov-chains.md
  - renewal-theory.md
  - random-walks.md
  - conditional-probability.md
historical_context: false
last_reviewed: 2026-07-11
---
# Markov Renewal Processes

A Markov renewal process extends a [Markov chain](markov-chains.md) by attaching a holding time to each state transition. With states $X_n$ and jump times $T_n$, the kernel is a [conditional probability](conditional-probability.md) distribution over both destination and elapsed time:

$$
Q_{ij}(t)=P(X_{n+1}=j,\ T_{n+1}-T_n\le t\mid X_n=i).
$$

The embedded transition matrix is

$$
P_{ij}=Q_{ij}(\infty).
$$

If holding times do not depend on states, the timing resembles [renewal theory](renewal-theory.md); if holding times are exponential and state dependent, the model approaches a continuous-time Markov chain. Unlike a simple [random walk](random-walks.md), both path and duration matter.

## Worked simulation

This simulation samples both the next state and the holding time for a Markov renewal process, recording the first transitions and accumulated elapsed time.

```python
import numpy as np

P = np.array([[.75, .25], [.4, .6]])
means = np.array([[2.0, 6.0], [3.0, 8.0]])
state, t = 0, 0.0
visits = []
rng = np.random.default_rng(44)
for _ in range(12):
    nxt = rng.choice([0, 1], p=P[state])
    hold = rng.exponential(means[state, nxt])
    t += hold
    visits.append((int(state), int(nxt), round(hold, 2), round(t, 2)))
    state = nxt
print("first_transitions", visits[:6])
print("time_after_12", round(t, 2), "final_state", int(state))
```

Observed output:

```text
first_transitions [(0, 0, 0.97, 0.97), (0, 0, 2.15, 3.12), (0, 0, 0.18, 3.3), (0, 0, 3.76, 7.07), (0, 0, 3.46, 10.53), (0, 0, 1.42, 11.95)]
time_after_12 38.09 final_state 1
```

The first six transitions all stay in state 0, but their holding times range from `0.18` to `3.76`, so the state path alone hides elapsed time. After 12 transitions the process has consumed `38.09` time units and ended in state 1.

## Caveats

Estimation is data-hungry because each origin-destination pair can have its own holding-time distribution. Censoring, rare states, and omitted covariates can distort both transition probabilities and waiting-time tails.

## References

- [Markov renewal process](https://en.wikipedia.org/wiki/Markov_renewal_process)
- [Renewal theory](https://en.wikipedia.org/wiki/Renewal_theory)
