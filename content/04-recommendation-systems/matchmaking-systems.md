---
title: Matchmaking Systems
slug: recommendation-systems/matchmaking-systems
description: "Recommendation systems where both sides must prefer the match."
area: recommendation-systems
topics:
  - matchmaking-systems
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - recommendation-system-overview.md
related:
  - ranking.md
  - candidate-generation.md
  - diversity-novelty-coverage-serendipity.md
  - feedback-loops.md
  - contextual-bandits.md
historical_context: false
last_reviewed: 2026-07-11
---
# Matchmaking Systems

Matchmaking systems recommend pairs where both sides matter: dating, hiring, mentoring, marketplaces, or team formation. Unlike one-sided [ranking](ranking.md), a high score from side A to side B is insufficient if side B would reject or be overloaded.

## Defining math

A simple reciprocal score combines directional preferences:

$$
s(a,b)=\sqrt{s_{A\to B}(a,b)\,s_{B\to A}(b,a)}.
$$

The geometric mean penalizes one-sided interest. A serving system still uses [candidate generation](candidate-generation.md), eligibility rules, and list-quality controls such as [diversity](diversity-novelty-coverage-serendipity.md).

## Worked example

```python
import numpy as np
A_to_B = np.array([[.9,.4,.2], [.3,.8,.6]])
B_to_A = np.array([[.7,.5], [.6,.9], [.2,.8]]).T
mutual = np.sqrt(A_to_B * B_to_A)
print("mutual_scores")
print(np.round(mutual, 3))
print("best_pair", tuple(int(v) for v in np.argwhere(mutual == mutual.max())[0]))
```

Observed output:

```text
mutual_scores
[[0.794 0.49  0.2  ]
 [0.387 0.849 0.693]]
best_pair (1, 1)
```

Pair `(1, 1)` wins because both sides score each other highly. A one-sided recommender might over-contact the same popular candidate and create a [feedback loop](feedback-loops.md).

## Caveats

Capacity constraints, fairness, safety, and strategic behavior are central. Optimizing total matches can overload high-demand participants or reduce diversity. Online experiments need marketplace-level metrics because one user's recommendation can remove an opportunity from another user.

## References

- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)
- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)
