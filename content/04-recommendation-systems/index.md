---
title: Recommendation Systems and Personalization
slug: 04-recommendation-systems
description: Index and learning map for Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - "recommendation-system-overview"
  - "content-based-recommendation"
  - "collaborative-filtering"
  - "user-based-collaborative-filtering"
  - "item-based-collaborative-filtering"
  - "utility-and-interaction-matrices"
  - "explicit-versus-implicit-feedback"
  - "matrix-factorization"
  - "latent-factor-models"
  - "classical-svd"
  - "truncated-svd"
  - "funk-svd"
level: foundational
status: draft
page_type: area-index
aliases:
  - "Recommendation Systems and Personalization"
prerequisites:
  - "01-mathematical-foundations/index.md"
  - "03-classical-machine-learning/index.md"
related:
  - "12-information-retrieval-and-search/index.md"
  - "17-experimentation-and-evaluation/index.md"
historical_context: false
last_reviewed: 2026-07-10
---
# Recommendation Systems and Personalization

## Summary

Recommendation systems choose, order, and diversify items for a user or context. A recommender is usually a multi-stage system: candidate generation finds a tractable set, ranking orders it, and post-processing applies constraints such as diversity, freshness, eligibility, or safety. The hard part is often not the scoring model but the feedback loop between exposure, user behavior, and future training data.

This section connects [linear algebra](../01-mathematical-foundations/linear-algebra.md), [classical machine learning](../03-classical-machine-learning/index.md), [information retrieval](../12-information-retrieval-and-search/index.md), and [experimentation](../17-experimentation-and-evaluation/index.md).

## System Map

| Problem | Start with | Why it matters |
| --- | --- | --- |
| Represent interactions | [Utility and Interaction Matrices](utility-and-interaction-matrices.md), [Explicit Versus Implicit Feedback](explicit-versus-implicit-feedback.md) | defines what the model treats as preference |
| Collaborative signal | [Collaborative Filtering](collaborative-filtering.md), [User Based Collaborative Filtering](user-based-collaborative-filtering.md), [Item Based Collaborative Filtering](item-based-collaborative-filtering.md) | uses patterns across users and items |
| Latent factors | [Matrix Factorization](matrix-factorization.md), [Funk SVD](funk-svd.md), [Weighted Matrix Factorization](weighted-matrix-factorization.md) | handles sparse interaction data |
| Retrieval and ranking | [Candidate Generation](candidate-generation.md), [Ranking](ranking.md), [Retrieval and Ranking Architectures](retrieval-and-ranking-architectures.md) | separates recall from final ordering |
| Online behavior | [Feedback Loops](feedback-loops.md), [Bandit Algorithms](bandit-algorithms.md), [Exploration Versus Exploitation](exploration-versus-exploitation.md) | controls learning under changing exposure |

## Subtopics

- [Recommendation System Overview](recommendation-system-overview.md)
- [Content Based Recommendation](content-based-recommendation.md)
- [Collaborative Filtering](collaborative-filtering.md)
- [User Based Collaborative Filtering](user-based-collaborative-filtering.md)
- [Item Based Collaborative Filtering](item-based-collaborative-filtering.md)
- [Utility and Interaction Matrices](utility-and-interaction-matrices.md)
- [Explicit Versus Implicit Feedback](explicit-versus-implicit-feedback.md)
- [Matrix Factorization](matrix-factorization.md)
- [Latent Factor Models](latent-factor-models.md)
- [Classical SVD](classical-svd.md)
- [Truncated SVD](truncated-svd.md)
- [Funk SVD](funk-svd.md)
- [Alternating Least Squares](alternating-least-squares.md)
- [Weighted Matrix Factorization](weighted-matrix-factorization.md)
- [Bayesian Personalized Ranking](bayesian-personalized-ranking.md)
- [Cold Start Problem](cold-start-problem.md)
- [Hybrid Recommenders](hybrid-recommenders.md)
- [Candidate Generation](candidate-generation.md)
- [Ranking](ranking.md)
- [Retrieval and Ranking Architectures](retrieval-and-ranking-architectures.md)
- [Evaluation OF Recommenders](evaluation-of-recommenders.md)
- [Offline Versus Online Evaluation](offline-versus-online-evaluation.md)
- [Diversity Novelty Coverage Serendipity](diversity-novelty-coverage-serendipity.md)
- [Feedback Loops](feedback-loops.md)
- [Bandit Algorithms](bandit-algorithms.md)
- [Multi Armed Bandits](multi-armed-bandits.md)
- [Contextual Bandits](contextual-bandits.md)
- [Exploration Versus Exploitation](exploration-versus-exploitation.md)
- [Matchmaking Systems](matchmaking-systems.md)
- [Image Based Recommendation](image-based-recommendation.md)
- [Content-Based Image Retrieval](content-based-image-retrieval.md)

> **Learning path — Recommender systems:** [path overview](../00-home-and-navigation/learning-paths.md#recommender-systems) · [Collaborative Filtering](collaborative-filtering.md) →
