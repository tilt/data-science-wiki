---
title: Evaluation
slug: interview-preparation/evaluation
description: Interview map for evaluation answers across classical ML, recommender systems, forecasting, and generative AI.
area: interview-preparation
topics:
  - evaluation
  - interview-question-map
level: foundational
status: review
page_type: topic-index
aliases: []
prerequisites:
  - index.md
related:
  - compare-generative-ai-and-classical-ml-outputs.md
  - recommendation-systems.md
  - time-series-forecasting.md
  - "../03-classical-machine-learning/evaluation-metrics.md"
  - "../16-experimentation-and-evaluation/golden-datasets.md"
  - "../16-experimentation-and-evaluation/online-experiments.md"
  - "../10-generative-ai/rag-evaluation.md"
historical_context: false
last_reviewed: 2026-07-11
---
# Evaluation

## Map answer

Evaluation answers should start from the decision being supported, then choose metrics, data, uncertainty checks, slices, and launch gates. The main interview signal is judgement: you can explain why a metric matches the workflow and what failure would block deployment.

## Question map

| System | Strong answer should separate | Canonical page |
| --- | --- | --- |
| Classical classifier | Accuracy, precision/recall, calibration, thresholds, class imbalance, and segment errors. | [Evaluation Metrics](../03-classical-machine-learning/evaluation-metrics.md) |
| RAG assistant | Retrieval recall, context quality, grounded answer quality, citation support, abstention, and severe errors. | [RAG Evaluation](../10-generative-ai/rag-evaluation.md) |
| Recommender | Candidate recall, ranking quality, coverage, diversity, novelty, cold-start slices, and online guardrails. | [Evaluation of Recommenders](../04-recommendation-systems/evaluation-of-recommenders.md) |
| Forecast | Baselines, rolling-origin validation, horizon-specific error, prediction-interval coverage, and leakage. | [Backtesting](../05-time-series-and-forecasting/backtesting.md) |
| Product launch | Offline evidence, online experiment design, primary metric, guardrails, sample-ratio checks, and monitoring. | [Online Experiments](../16-experimentation-and-evaluation/online-experiments.md) |

## Interview artifact

For a RAG support bot, give this launch gate: "Ship only if the golden set passes retrieval recall, answer support, citation precision, refusal behavior, latency, and severe-error review. Then run an online experiment with customer-resolution rate as the primary metric and complaint rate, escalation rate, latency, and unsupported-claim incidents as guardrails." This ties the interview page [generative-AI versus classical-ML evaluation](compare-generative-ai-and-classical-ml-outputs.md) to [Golden Datasets](../16-experimentation-and-evaluation/golden-datasets.md).

## Common follow-ups

- **"What if the metric improves but examples look worse?"** Inspect severity-weighted errors and slices before trusting the aggregate.
- **"How do you handle uncertainty?"** Use confidence intervals, repeated backtests, bootstrap or paired comparisons where appropriate, and online experiment runtime planning.
- **"What blocks launch?"** Regressions in high-risk slices, data leakage, sample-ratio mismatch, unsupported generated claims, or unacceptable latency/cost.

## References

- [scikit-learn User Guide: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

> **Learning path — Interview preparation:** ← [Generative AI](generative-ai.md) · [path overview](../00-home-and-navigation/learning-paths.md#interview-preparation)
