---
title: Learning Paths
slug: home-and-navigation/learning-paths
description: Suggested study sequences through the wiki for foundations, classical ML, deep learning, and the main applied and production areas.
area: home-and-navigation
topics:
  - "learning-paths"
  - "navigation"
level: foundational
status: review
page_type: topic-index
aliases:
  - "Study paths"
prerequisites: []
related:
  - "knowledge-map.md"
  - "technical-answer-patterns.md"
  - "01-mathematical-foundations/index.md"
historical_context: false
last_reviewed: 2026-07-15
---

# Learning Paths

Use these paths when the goal is guided study rather than browsing the full taxonomy. Each path is an ordered arc: prerequisites first, then core concepts, then the evaluation or production pages that tie the concept to real decisions. The [knowledge map](knowledge-map.md) shows why these orders exist; this page turns that dependency graph into sequences you can follow end to end.

Each path names who it is for. Pick the one closest to your goal, and branch into prerequisite links whenever a formula or assumption is unfamiliar.

## Foundations

For readers new to the field who want the shared vocabulary before any specialization.

[Mathematical Foundations](../01-mathematical-foundations/index.md) -> [Probability and Statistics](../02-probability-and-statistics/index.md) -> [Classical Machine Learning](../03-classical-machine-learning/index.md) -> [Supervised Learning](../03-classical-machine-learning/supervised-learning.md) -> [Evaluation Metrics](../03-classical-machine-learning/evaluation-metrics.md)

## Deep learning

For readers who know classical ML and want the mechanics behind modern models.

[Deep Learning](../06-deep-learning/index.md) -> [Neural Network Fundamentals](../06-deep-learning/neural-network-fundamentals.md) -> [Backpropagation](../06-deep-learning/backpropagation.md) -> [Optimizers](../06-deep-learning/optimizers.md) -> [Transformers](../06-deep-learning/transformers.md)

## Recommender systems

For readers building personalization or ranking systems.

[Recommendation Systems](../04-recommendation-systems/index.md) -> [Collaborative Filtering](../04-recommendation-systems/collaborative-filtering.md) -> [Matrix Factorization](../04-recommendation-systems/matrix-factorization.md) -> [SVD versus Matrix Factorization](../04-recommendation-systems/svd-versus-matrix-factorization.md) -> [Evaluation of Recommenders](../04-recommendation-systems/evaluation-of-recommenders.md)

## Forecasting

For readers working on demand, load, or other time-indexed prediction.

[Time-Series Forecasting](../05-time-series-and-forecasting/index.md) -> [Time-Series Fundamentals](../05-time-series-and-forecasting/time-series-fundamentals.md) -> [Stationarity](../05-time-series-and-forecasting/stationarity.md) -> [ARIMA](../05-time-series-and-forecasting/arima.md) -> [Backtesting](../05-time-series-and-forecasting/backtesting.md) -> [Forecast Evaluation](../05-time-series-and-forecasting/forecast-evaluation.md)

## Natural language processing

For readers moving from text preprocessing to model-based language understanding.

[Natural Language Processing](../08-natural-language-processing/index.md) -> [Tokenization](../08-natural-language-processing/tokenization.md) -> [Embeddings](../08-natural-language-processing/embeddings.md) -> [Decoder-Only Transformers](../08-natural-language-processing/decoder-only-transformers.md) -> [Text Classification](../08-natural-language-processing/text-classification.md) -> [Evaluation of NLP Systems](../08-natural-language-processing/evaluation-of-nlp-systems.md)

## Computer vision

For readers working on images: representation, detection, and modern architectures.

[Computer Vision](../09-computer-vision/index.md) -> [Image Representation](../09-computer-vision/image-representation.md) -> [Object Detection](../09-computer-vision/object-detection.md) -> [Detection and Segmentation Metrics](../09-computer-vision/detection-and-segmentation-metrics.md) -> [Vision Transformers](../09-computer-vision/vision-transformers.md)

## Information retrieval and search

For readers building search or the retrieval half of a RAG system.

[Information Retrieval and Search](../12-information-retrieval-and-search/index.md) -> [Inverted Indexes](../12-information-retrieval-and-search/inverted-indexes.md) -> [BM25](../12-information-retrieval-and-search/bm25.md) -> [Dense Retrieval](../12-information-retrieval-and-search/dense-retrieval.md) -> [Hybrid Search](../12-information-retrieval-and-search/hybrid-search.md) -> [Search Evaluation](../12-information-retrieval-and-search/search-evaluation.md)

## Reinforcement learning

For readers going from the MDP framing to preference-based fine-tuning.

[Reinforcement Learning](../07-reinforcement-learning/index.md) -> [Markov Decision Processes](../07-reinforcement-learning/markov-decision-processes.md) -> [Value Functions and Bellman Equations](../07-reinforcement-learning/value-functions-and-bellman-equations.md) -> [Temporal-Difference Learning](../07-reinforcement-learning/temporal-difference-learning.md) -> [Q-Learning and DQN](../07-reinforcement-learning/q-learning-and-dqn.md) -> [Policy Gradients and Actor-Critic Methods](../07-reinforcement-learning/policy-gradients-and-actor-critic.md) -> [Reinforcement Learning from Human Feedback](../07-reinforcement-learning/reinforcement-learning-from-human-feedback.md)

## Generative AI systems

For readers assembling retrieval-augmented and agentic systems.

[Generative AI](../11-generative-ai/index.md) -> [Foundation Models](../11-generative-ai/foundation-models.md) -> [Retrieval Pipelines](../11-generative-ai/retrieval-pipelines.md) -> [RAG](../11-generative-ai/rag.md) -> [Tool Use and Function Calling](../11-generative-ai/tool-use-and-function-calling.md) -> [RAG Evaluation](../11-generative-ai/rag-evaluation.md) -> [Responsible AI](../18-responsible-ai-safety-and-governance/index.md)

## Production ML

For readers taking a trained model into a monitored, governed system.

[ML System Lifecycle](../14-ml-engineering-and-mlops/ml-system-lifecycle.md) -> [Training Pipelines](../14-ml-engineering-and-mlops/training-pipelines.md) -> [Model Serving](../14-ml-engineering-and-mlops/model-serving.md) -> [Monitoring](../14-ml-engineering-and-mlops/monitoring.md) -> [Production Incident Response](../14-ml-engineering-and-mlops/production-incident-response.md)

## Focused review and explanation

For interview or review practice, where the goal is concise explanation rather than first-time learning.

[Technical Answer Patterns](technical-answer-patterns.md) -> [Recommendation Systems](../04-recommendation-systems/index.md) -> [Generative AI](../11-generative-ai/index.md) -> [Experimentation and Evaluation](../17-experimentation-and-evaluation/index.md) -> [Time-Series Forecasting](../05-time-series-and-forecasting/index.md)

## How to study a path

1. Read the index page first to understand the local vocabulary.
2. Open prerequisite links when a formula or assumption is unfamiliar, then return.
3. Work through one worked example before adding advanced variants.
4. Finish on the evaluation and production pages so the concept is tied to real decisions, not left as theory.
