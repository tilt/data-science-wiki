---
title: Multi-Armed Bandits
slug: recommendation-systems/multi-armed-bandits
description: "The basic partial-feedback setup for exploration in recommenders."
area: recommendation-systems
topics:
  - multi-armed-bandits
level: intermediate
status: review
page_type: algorithm
aliases:
  - MAB
prerequisites:
  - exploration-versus-exploitation.md
related:
  - bandit-algorithms.md
  - contextual-bandits.md
  - exploration-versus-exploitation.md
  - offline-versus-online-evaluation.md
  - cold-start-problem.md
historical_context: false
last_reviewed: 2026-07-11
---
# Multi-Armed Bandits

A multi-armed bandit repeatedly chooses one action and observes reward only for that action. In recommendation, an arm can be a headline, module, notification, or item bucket. The missing labels for unchosen arms are the key difference from ordinary supervised [ranking](ranking.md).

## Defining math

Regret after $T$ rounds compares the policy with always choosing the best arm:

$$
R_T=T\mu^\*-\sum_{t=1}^T \mu_{a_t}.
$$

UCB-style methods choose arms with high estimated reward plus uncertainty:

$$
\hat\mu_a+\sqrt{\frac{2\log t}{n_a}}.
$$

[Contextual bandits](contextual-bandits.md) condition the choice on user and item features.

## Worked example

```python
import numpy as np
pulls = np.array([40, 10, 5])
wins = np.array([4, 2, 0])
t = pulls.sum()
ucb = wins / pulls + np.sqrt(2 * np.log(t) / pulls)
print("ucb_values", np.round(ucb, 3).tolist())
print("chosen_arm", int(np.argmax(ucb)))
```

Observed output:

```text
ucb_values [0.548, 1.095, 1.266]
chosen_arm 2
```

Arm 2 has no wins, but its low count gives it the largest exploration bonus. This is the mechanism behind [exploration versus exploitation](exploration-versus-exploitation.md).

## Caveats

Bandits need reward definitions that match product goals. Delayed rewards, repeated exposure, and interference between users violate the simplest assumptions. Use replay or randomized traffic for [offline versus online evaluation](offline-versus-online-evaluation.md), not ordinary logged-label accuracy.

## References

- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)
- [Li et al., 2010, Unbiased Offline Evaluation of Contextual-bandit-based News Article Recommendation Algorithms](https://arxiv.org/abs/1003.5956)
