---
title: Recommendation Systems
slug: interview-preparation/recommendation-systems
description: Interview map for recommender-system design, sparse feedback, ranking, and evaluation questions.
area: interview-preparation
topics:
  - recommendation-systems
  - interview-question-map
level: foundational
status: review
page_type: topic-index
aliases: []
prerequisites:
  - index.md
related:
  - svd-versus-matrix-factorization.md
  - sparse-utility-matrix-and-ordinary-svd.md
  - "../04-recommendation-systems/recommendation-system-overview.md"
  - "../04-recommendation-systems/retrieval-and-ranking-architectures.md"
  - "../04-recommendation-systems/cold-start-problem.md"
  - "../04-recommendation-systems/evaluation-of-recommenders.md"
  - evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Recommendation Systems

## Map answer

Recommendation-system interviews test whether you can reason about sparse feedback, candidate generation, ranking, exploration, cold start, evaluation, feedback loops, and serving tradeoffs. Do not answer with one algorithm unless the question is specifically algorithmic.

## Question map

| Prompt type | Strong answer should mention | Canonical page |
| --- | --- | --- |
| "Design a news recommender." | Fast candidate sources, freshness, user/context features, ranking, diversity, editorial constraints, exploration, and latency. | [Retrieval and Ranking Architectures](../04-recommendation-systems/retrieval-and-ranking-architectures.md) |
| "How do you handle new users/items?" | Popularity, content features, onboarding, exploration, business rules, and segment-specific evaluation. | [Cold Start Problem](../04-recommendation-systems/cold-start-problem.md) |
| "Why not ordinary SVD?" | Missing means unknown, zero filling changes the objective, and observed-entry losses match the data better. | [Sparse Utility Matrices and Ordinary SVD](../04-recommendation-systems/sparse-utility-matrices-and-svd.md) |
| "How do you evaluate ranking?" | Recall@k, NDCG, coverage, diversity, novelty, time splits, online experiments, and guardrails. | [Evaluation of Recommenders](../04-recommendation-systems/evaluation-of-recommenders.md) |

## Interview artifact

For "Design a marketplace recommender," use a layered answer: candidate generation from collaborative, content, popularity, fresh-item, and sponsored sources; ranking with user, item, context, and interaction features; post-ranking filters for safety, availability, diversity, and business constraints; offline [evaluation](evaluation.md); then an online experiment with latency and complaint guardrails. This gives a better answer than jumping straight to [matrix factorization](../04-recommendation-systems/matrix-factorization.md).

## Common follow-ups

- **"What is the hardest data issue?"** Exposure bias: you only observe interactions for items the system showed.
- **"What is the simplest good baseline?"** Popularity plus recency and eligibility rules, compared against personalized retrieval and ranking.
- **"What do the SVD prompts test?"** Whether you understand sparse utility matrices and the difference between algebraic decomposition and recommender modelling.

## References

- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
- [Herlocker et al., 2004, Evaluating Collaborative Filtering Recommender Systems](https://doi.org/10.1145/963770.963772)

> **Learning path — Interview preparation:** ← [Interview Examples](interview-examples.md) · [path overview](../00-home-and-navigation/learning-paths.md#interview-preparation) · [Generative AI](generative-ai.md) →
