---
title: Experimentation and Evaluation
slug: 17-experimentation-and-evaluation
description: Index and learning map for Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - "offline-evaluation"
  - "online-experiments"
  - "ab-testing"
  - "statistical-significance"
  - "golden-datasets"
  - "calibration"
  - "coverage"
  - "abstention"
  - "risk-weighted-error-taxonomies"
  - "paired-evaluation"
  - "repeated-sampling"
  - "human-evaluation"
level: foundational
status: draft
page_type: area-index
aliases:
  - "Experimentation and Evaluation"
prerequisites:
  - "02-probability-and-statistics/index.md"
related:
  - "05-time-series-and-forecasting/backtesting.md"
  - "05-time-series-and-forecasting/forecast-error-metrics.md"
  - "05-time-series-and-forecasting/forecast-calibration.md"
  - "11-generative-ai/index.md"
  - "14-ml-engineering-and-mlops/index.md"
historical_context: false
last_reviewed: 2026-07-10
---

# Experimentation and Evaluation

## Summary

Experimentation and evaluation turns model behavior into evidence. Offline evaluation estimates behavior before launch, online experiments measure user or business impact under real traffic, and human or model-assisted review handles cases where there is no simple label. The core question is always the same: what decision will this evidence support, and what failure modes would the aggregate metric hide?

This section connects statistical testing from [Probability and Statistics](../02-probability-and-statistics/index.md), forecasting backtests from [Time-Series Forecasting](../05-time-series-and-forecasting/index.md), and production monitoring from [ML Engineering and MLOps](../14-ml-engineering-and-mlops/index.md).

## Evaluation Route

| Situation | Start with | Watch for |
| --- | --- | --- |
| Model selection before launch | [Offline Evaluation](offline-evaluation.md), [Golden Datasets](golden-datasets.md) | leakage, stale labels, slice regressions |
| Product or policy change | [Online Experiments](online-experiments.md), [A/B Testing](a-b-testing.md) | interference, novelty effects, underpowered tests |
| Generative or subjective outputs | [Human Evaluation](human-evaluation.md), [LLM-as-Judge](llm-as-judge.md), [Paired Evaluation](paired-evaluation.md) | rubric drift, order bias, judge bias |
| Safety-sensitive systems | [Risk Weighted Error Taxonomies](risk-weighted-error-taxonomies.md), [Abstention](abstention.md), [Coverage](coverage.md) | hidden high-cost errors |

## Subtopics

- [Offline Evaluation](offline-evaluation.md)
- [Online Experiments](online-experiments.md)
- [A/B Testing](a-b-testing.md)
- [Statistical Significance](statistical-significance.md)
- [Golden Datasets](golden-datasets.md)
- [Calibration](calibration.md)
- [Coverage](coverage.md)
- [Abstention](abstention.md)
- [Risk Weighted Error Taxonomies](risk-weighted-error-taxonomies.md)
- [Paired Evaluation](paired-evaluation.md)
- [Repeated Sampling](repeated-sampling.md)
- [Human Evaluation](human-evaluation.md)
- [LLM-as-Judge](llm-as-judge.md)
