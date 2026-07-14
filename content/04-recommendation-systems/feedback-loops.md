---
title: Feedback Loops
slug: recommendation-systems/feedback-loops
description: "How recommender exposure changes the future data the recommender learns from."
area: recommendation-systems
topics:
  - feedback-loops
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - recommendation-system-overview.md
related:
  - implicit-feedback.md
  - exploration-versus-exploitation.md
  - offline-versus-online-evaluation.md
  - diversity-novelty-coverage-serendipity.md
  - evaluation-of-recommenders.md
historical_context: false
last_reviewed: 2026-07-11
---

# Feedback Loops

A recommender feedback loop occurs when the system's exposures shape the interactions used to train the next system. If popular items get more exposure, they get more clicks, which can make them appear even better. This is a central risk for [implicit feedback](implicit-feedback.md).

## Defining math

A minimal exposure update is

$$
e_i^{(t+1)}=\frac{e_i^{(t)}q_i}{\sum_j e_j^{(t)}q_j},
$$

where $e_i$ is exposure share and $q_i$ is click probability. Even when a niche item has higher quality, it cannot gather clicks without exposure. [Exploration](exploration-versus-exploitation.md) interrupts this dynamic.

## Worked example

Start with item A receiving 90% exposure and item B receiving 10%. A has click probability $0.06$; B is actually better with click probability $0.12$.

| Step                         | A exposure | B exposure | A expected clicks | B expected clicks |
| ---------------------------- | ---------: | ---------: | ----------------: | ----------------: |
| Before update                |       90.0 |       10.0 |               5.4 |               1.2 |
| After one click-based update |       81.8 |       18.2 |               4.9 |               2.2 |
| After three updates          |       52.9 |       47.1 |               3.2 |               5.7 |

The better item gains share only after repeated updates. With harsher exploitation, weaker initial exposure, or noisy short windows, it might never surface. This is why [offline evaluation](offline-versus-online-evaluation.md) needs exposure-aware logs.

## Caveats

Feedback loops are not always harmful; personalization necessarily changes future data. The problem is unmeasured reinforcement. Track exposure, not just clicks, and audit [diversity and coverage](diversity-novelty-coverage-serendipity.md) so the system does not silently narrow the catalog.

## References

- [Li et al., 2010, Unbiased Offline Evaluation of Contextual-bandit-based News Article Recommendation Algorithms](https://arxiv.org/abs/1003.5956)
- [Herlocker et al., 2004, Evaluating Collaborative Filtering Recommender Systems](https://doi.org/10.1145/963770.963772)
