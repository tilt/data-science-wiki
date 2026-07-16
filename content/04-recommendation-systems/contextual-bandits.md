---
title: Contextual Bandits
slug: recommendation-systems/contextual-bandits
description: "Bandit policies that use user, item, or request features when choosing actions."
area: recommendation-systems
topics:
  - contextual-bandits
level: advanced
status: review
page_type: algorithm
aliases: []
prerequisites:
  - multi-armed-bandits.md
related:
  - multi-armed-bandits.md
  - bandit-algorithms.md
  - exploration-versus-exploitation.md
  - offline-versus-online-evaluation.md
  - candidate-generation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Contextual Bandits

Contextual bandits choose actions using features available at decision time: user segment, device, query, location, item age, or content embedding. They are bandits because only the chosen action's reward is observed, but they can personalize exploration instead of treating every user the same.

## Defining math

LinUCB estimates one linear model per arm. For context $x$, arm matrix $A_a$, and vector $b_a$,

$$
\hat\theta_a=A_a^{-1}b_a,
$$

and chooses

$$
a_t=\arg\max_a x^\top\hat\theta_a+\alpha\sqrt{x^\top A_a^{-1}x}.
$$

The second term is uncertainty, linking directly to [exploration versus exploitation](exploration-versus-exploitation.md).

## Worked example

This snippet evaluates LinUCB scores for candidate arms from a context vector and selects the arm with the largest upper confidence bound.

```python
import numpy as np
alpha = .7; x = np.array([1., .4])
A = [np.eye(2)*2, np.eye(2)*2, np.array([[3., .5], [.5, 1.5]])]
b = [np.array([.6, .1]), np.array([.3, .7]), np.array([.8, .2])]
ucb = []
for Ai, bi in zip(A, b):
    inv = np.linalg.inv(Ai); theta = inv @ bi
    ucb.append(x @ theta + alpha * np.sqrt(x @ inv @ x))
print("linucb_scores", np.round(ucb, 3).tolist())
print("chosen_arm", int(np.argmax(ucb)))
```

Observed output:

```text
linucb_scores [0.853, 0.823, 0.704]
chosen_arm 0
```

The policy chooses arm 0 because its predicted reward plus uncertainty is highest for this context. In a recommender, that arm might be a news article, module, or [candidate generation](candidate-generation.md) source selected by a broader set of [bandit algorithms](bandit-algorithms.md).

## Caveats

Contextual bandits need logged propensities or randomization for valid replay. Features can leak post-treatment information if they are computed after exposure. They optimize immediate reward unless long-term outcomes are included in the reward or evaluated through [online experiments](../17-experimentation-and-evaluation/online-experiments.md).

## References

- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)
- [Li et al., 2010, Unbiased Offline Evaluation of Contextual-bandit-based News Article Recommendation Algorithms](https://arxiv.org/abs/1003.5956)

> **Section — [Recommendation Systems and Personalization](index.md):** ← [Bandit Algorithms](bandit-algorithms.md) · [Matchmaking Systems](matchmaking-systems.md) →
