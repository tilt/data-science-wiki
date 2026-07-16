---
title: Bandit Algorithms
slug: recommendation-systems/bandit-algorithms
description: "Online recommendation policies that learn while choosing what to expose."
area: recommendation-systems
topics:
  - bandit-algorithms
level: intermediate
status: review
page_type: algorithm
aliases: []
prerequisites:
  - multi-armed-bandits.md
related:
  - multi-armed-bandits.md
  - contextual-bandits.md
  - exploration-versus-exploitation.md
  - offline-versus-online-evaluation.md
  - cold-start-problem.md
historical_context: false
last_reviewed: 2026-07-11
---

# Bandit Algorithms

Bandit algorithms choose recommendations while learning from the rewards they cause. They are useful when a system must balance short-term performance with information gathering, especially for [cold-start](cold-start-problem.md) items and changing content.

## Defining math

For an arm $a$, empirical mean $\hat\mu_a$, count $n_a$, and time $t$, UCB chooses

$$
a_t=\arg\max_a \hat\mu_a+\sqrt{\frac{2\log t}{n_a}}.
$$

The bonus is larger for under-sampled arms, which formalizes [exploration versus exploitation](exploration-versus-exploitation.md). [Contextual bandits](contextual-bandits.md) add user or item features to the score.

## Worked example

This simulation runs a simple exploration strategy over arms and reports pulls, empirical click-through rates, and total clicks.

```python
import numpy as np
rng = np.random.default_rng(12)
true = np.array([.03, .05, .08])
counts = np.zeros(3); wins = np.zeros(3)
for t in range(1, 301):
    rates = np.divide(wins, counts, out=np.zeros(3), where=counts > 0)
    bonus = np.sqrt(2*np.log(max(t, 2)) / np.maximum(counts, 1))
    arm = int(np.argmax(rates + bonus))
    reward = rng.random() < true[arm]
    counts[arm] += 1; wins[arm] += reward
print("pulls", counts.astype(int).tolist())
print("empirical_ctr", np.round(wins / counts, 3).tolist())
print("total_clicks", int(wins.sum()))
```

Observed output:

```text
pulls [95, 97, 108]
empirical_ctr [0.053, 0.062, 0.074]
total_clicks 19
```

The best true arm gets the most pulls, but uncertainty keeps all arms alive. [Offline versus online evaluation](offline-versus-online-evaluation.md) matters because historical logs only reveal rewards for actions actually shown.

## Caveats

Bandits optimize the reward they observe, so a click reward can still harm satisfaction, diversity, or long-term retention. Non-stationary content needs decay or windowing. Guardrails are required so exploration does not show unsafe or ineligible items.

## References

- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)
- [Li et al., 2010, Unbiased Offline Evaluation of Contextual-bandit-based News Article Recommendation Algorithms](https://arxiv.org/abs/1003.5956)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Multi-Armed Bandits](multi-armed-bandits.md) [Contextual Bandits →](contextual-bandits.md)
