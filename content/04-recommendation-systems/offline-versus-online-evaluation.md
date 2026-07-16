---
title: Offline Versus Online Evaluation
slug: recommendation-systems/offline-versus-online-evaluation
description: "Why historical recommender metrics and live experiments answer different questions."
area: recommendation-systems
topics:
  - offline-versus-online-evaluation
level: intermediate
status: review
page_type: comparison
aliases: []
prerequisites:
  - evaluation-of-recommenders.md
related:
  - evaluation-of-recommenders.md
  - bandit-algorithms.md
  - contextual-bandits.md
  - feedback-loops.md
  - ../17-experimentation-and-evaluation/online-experiments.md
historical_context: false
last_reviewed: 2026-07-11
---

# Offline Versus Online Evaluation

Offline evaluation replays or splits historical data. Online evaluation measures behavior under actual exposure, usually through experiments. Recommenders need both because recommendations change what users see and therefore change future labels.

## Defining math

For randomized logged bandit data, replay keeps only events where the new policy matches the logged action:

$$
\hat V(\pi)=\frac{1}{\lvert M\rvert}\sum_{t\in M}r_t,\qquad M=\{t:\pi(x_t)=a_t\}.
$$

With known propensities $p_t$, inverse propensity scoring uses

$$
\hat V_{\text{IPS}}(\pi)=\frac{1}{T}\sum_t \frac{\mathbf 1\{\pi(x_t)=a_t\}r_t}{p_t}.
$$

This is different from ordinary [evaluation of recommenders](evaluation-of-recommenders.md) on held-out items.

## Worked example

Replay evaluation keeps only rows where the candidate policy chose the same action as the logged policy:

| Event | Logged action | Reward | Candidate action | Replay? |
| ----: | ------------: | -----: | ---------------: | ------- |
|     1 |             0 |      1 |                0 | yes     |
|     2 |             1 |      0 |                0 | no      |
|     3 |             0 |      0 |                0 | yes     |
|     4 |             2 |      1 |                2 | yes     |
|     5 |             1 |      1 |                2 | no      |
|     6 |             2 |      0 |                2 | yes     |

Only four events can be replayed because rewards for unshown actions are missing. Among the matched rows, rewards are $1,0,1,0$, so the replay CTR is $2/4=0.5$. [Bandit algorithms](bandit-algorithms.md) require this partial-feedback discipline.

## Caveats

Offline ranking metrics are cheap and reproducible but can overfit historical exposure. Online tests measure real behavior but are slower, riskier, and sensitive to interference. Use offline gates to reject bad candidates, then confirm important changes with [online experiments](../17-experimentation-and-evaluation/online-experiments.md).

## References

- [Li et al., 2010, Unbiased Offline Evaluation of Contextual-bandit-based News Article Recommendation Algorithms](https://arxiv.org/abs/1003.5956)
- [Herlocker et al., 2004, Evaluating Collaborative Filtering Recommender Systems](https://doi.org/10.1145/963770.963772)

> **Section — [Recommendation Systems and Personalization](index.md):** ← [Evaluation of Recommenders](evaluation-of-recommenders.md) · [Diversity, Novelty, Coverage, and Serendipity](diversity-novelty-coverage-serendipity.md) →
