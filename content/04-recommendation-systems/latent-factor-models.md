---
title: Latent Factor Models
slug: recommendation-systems/latent-factor-models
description: "Recommenders that score users and items through learned hidden dimensions."
area: recommendation-systems
topics:
  - latent-factor-models
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - matrix-factorization.md
related:
  - matrix-factorization.md
  - funk-svd.md
  - hybrid-recommenders.md
  - content-based-recommendation.md
  - cold-start-problem.md
historical_context: false
last_reviewed: 2026-07-11
---

# Latent Factor Models

A latent factor model maps users and items to hidden coordinates and scores compatibility from those coordinates. In recommender systems, [matrix factorization](matrix-factorization.md) is the canonical example, but factor models can also include side features, biases, context, or neural encoders.

## Defining math

The core scoring contract is

$$
s(u,i)=p_u^\top q_i,
$$

or with biases,

$$
s(u,i)=\mu+b_u+b_i+p_u^\top q_i.
$$

The factors are "latent" because no column is pre-labeled as genre, price sensitivity, or expertise. Their meaning comes from the training objective and data. [Content-based recommendation](content-based-recommendation.md) starts from observed item features; latent factor models infer features from interaction patterns.

## Worked example

For a user vector $p_u=[1.2,-0.4]$, score each item by a dot product:

| Item | Item vector $q_i$ |       Score $p_u^\top q_i$ |
| ---- | ----------------- | -------------------------: |
| 0    | $[1.0,-0.2]$      |  $1.2(1.0)-0.4(-0.2)=1.28$ |
| 1    | $[-0.3,1.1]$      | $1.2(-0.3)-0.4(1.1)=-0.80$ |
| 2    | $[0.8,-0.5]$      |  $1.2(0.8)-0.4(-0.5)=1.16$ |

Item 0 is the top recommendation because it has the largest dot product. Item 0 and item 2 align with the user vector; item 1 points in the opposite direction. [Hybrid recommenders](hybrid-recommenders.md) often combine these latent scores with content features to reduce [cold-start](cold-start-problem.md) damage.

## Caveats

Latent dimensions are useful but not guaranteed to be stable or interpretable across retrains. They reflect exposure and feedback loops in the logs, not pure preference. When a product needs explanation, constraints, or editorial control, latent factors usually feed a broader [retrieval and ranking architecture](retrieval-and-ranking-architectures.md) rather than serving alone.

## References

- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
- [Rendle, 2012, BPR: Bayesian Personalized Ranking from Implicit Feedback](https://arxiv.org/abs/1205.2618)

> **Section — [Recommendation Systems and Personalization](index.md):** ← [Matrix Factorization for Recommender Systems](matrix-factorization.md) · [Classical SVD](classical-svd.md) →
