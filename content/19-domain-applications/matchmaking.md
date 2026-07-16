---
title: Matchmaking
slug: domain-applications/matchmaking
description: "Two-sided recommendation where success requires mutual interest, capacity, timing, and safety constraints."
area: domain-applications
topics:
  - application
  - matchmaking
level: intermediate
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../04-recommendation-systems/matchmaking-systems.md
  - ../04-recommendation-systems/collaborative-filtering.md
  - ../04-recommendation-systems/ranking.md
  - ../04-recommendation-systems/feedback-loops.md
  - ../04-recommendation-systems/diversity-novelty-coverage-serendipity.md
  - ../17-experimentation-and-evaluation/online-experiments.md
historical_context: false
last_reviewed: 2026-07-11
---

# Matchmaking

Matchmaking recommends people, teams, mentors, jobs, or peers where the recommended "item" can accept, reject, or be harmed by exposure. Inputs include explicit preferences, behavior, availability, geography, eligibility, safety filters, and interaction history. Targets include reciprocal reply, accepted match, retained relationship, or successful outcome after the match. The output is usually a ranked set with capacity and fairness constraints, not a single prediction.

## Framing

This is a two-sided form of [matchmaking systems](../04-recommendation-systems/matchmaking-systems.md). Unlike ordinary [collaborative filtering](../04-recommendation-systems/collaborative-filtering.md), scoring only one side's preference is insufficient; the system must estimate mutual compatibility and manage exposure. [Ranking](../04-recommendation-systems/ranking.md) objectives should include quality, reciprocity, diversity, and "do no harm" constraints. Online metrics should include accepted matches, reply rate, negative feedback, repeated exposure, and downstream retention, with [online experiments](../17-experimentation-and-evaluation/online-experiments.md) guarded against marketplace imbalance.

GroupLens' MovieLens 100K is not a matchmaking dataset, but it is a useful recommender baseline artifact: the page reports 100,000 ratings from 1,000 users on 1,700 movies. Reciprocal recommender papers extend this user-item idea to user-user matching.

## Executed Artifact

To show why matchmaking must score both sides of a pair, the example below combines each user's interest with the other side's attractiveness into one reciprocal score, then greedily selects non-overlapping pairs, exposing how early high-reciprocity choices leave weaker leftovers.

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

users = np.array([[1, 0, 0.6], [0.9, 0.2, 0], [0, 1, 0.3], [0.1, 0.7, 0.7]])
items = np.array([[1, 0, 0.4], [0.8, 0.1, 0.1], [0, 1, 0.6], [0.2, 0.8, 0]])
interest = cosine_similarity(users, items)
attractiveness = cosine_similarity(items, users).T
score = 0.55 * interest + 0.45 * attractiveness

pairs, used_users, used_items = [], set(), set()
for u, i in sorted(np.ndindex(4, 4), key=lambda x: score[x], reverse=True):
    if u not in used_users and i not in used_items:
        pairs.append((u, i, round(float(score[u, i]), 3)))
        used_users.add(u)
        used_items.add(i)

print("greedy_reciprocal_pairs", pairs)
print("min_pair_score", min(p[2] for p in pairs))
print("mean_pair_score", round(sum(p[2] for p in pairs) / len(pairs), 3))
```

Observed output:

```text
greedy_reciprocal_pairs [(1, 1, 0.988), (0, 0, 0.987), (2, 2, 0.969), (3, 3, 0.707)]
min_pair_score 0.707
mean_pair_score 0.913
```

The example is deliberately small: the last accepted pair is much weaker because earlier high-reciprocity choices consumed the best candidates. In a real system, locally high scores can still create bad global outcomes if popular users receive all exposure, which is a [feedback loop](../04-recommendation-systems/feedback-loops.md) problem.

## Failure Modes

Matchmaking fails when it optimizes clicks instead of mutually wanted outcomes, when it overexposes a small group, or when cold-start users are invisible. Diversity and coverage metrics from [diversity, novelty, coverage, and serendipity](../04-recommendation-systems/diversity-novelty-coverage-serendipity.md) should be tracked alongside success metrics. Safety filters and appeal processes are part of the product contract, not post-processing decoration.

## References

- [GroupLens: MovieLens 100K Dataset](https://grouplens.org/datasets/movielens/100k/)
- [Xia et al., Reciprocal Recommendation System for Online Dating](https://arxiv.org/abs/1501.06247)

> **Section — [Domain Applications](index.md):** ← [News Recommendation](news-recommendation.md) · [Cultural Heritage Document Extraction and Entity Matching](cultural-heritage-document-extraction-and-entity-matching.md) →
