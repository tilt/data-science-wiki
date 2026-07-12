---
title: Interview Preparation
slug: interview-preparation
description: Interview-facing maps, prototype answers, and project-story patterns linked to canonical data-science pages.
area: interview-preparation
topics:
  - interview-preparation
  - answer-patterns
  - prototype-answers
level: foundational
status: review
page_type: section-index
aliases:
  - Interview Prep
prerequisites: []
related:
  - answer-patterns.md
  - prototype-answers.md
  - interview-examples.md
  - evaluation.md
  - generative-ai.md
  - recommendation-systems.md
  - time-series-forecasting.md
  - world-models.md
historical_context: false
last_reviewed: 2026-07-11
---
# Interview Preparation

This section is an interview layer over the canonical wiki. It should help answer questions crisply, then route deeper concept study to the subject sections. Use [Answer Patterns](answer-patterns.md) for structure, [Prototype Answers](prototype-answers.md) for prompt-specific drafts, [Interview Examples](interview-examples.md) for story grounding, and [Knowledge Gaps](knowledge-gaps.md) for follow-up study.

## Topic Maps

| Map | Use it for | Canonical direction |
| --- | --- | --- |
| [Evaluation](evaluation.md) | Metrics, launch gates, severe-error review, and uncertainty. | [Evaluation Metrics](../03-classical-machine-learning/evaluation-metrics.md), [Golden Datasets](../16-experimentation-and-evaluation/golden-datasets.md), [RAG Evaluation](../10-generative-ai/rag-evaluation.md) |
| [Generative AI](generative-ai.md) | RAG, structured output, tool use, hallucination, and reproducibility prompts. | [RAG](../10-generative-ai/rag.md), [Tool Use and Function Calling](../10-generative-ai/tool-use-and-function-calling.md), [Temperature and Determinism](../10-generative-ai/temperature-and-determinism.md) |
| [Recommendation Systems](recommendation-systems.md) | Sparse feedback, candidate generation, ranking, cold start, and online evaluation. | [Recommendation System Overview](../04-recommendation-systems/recommendation-system-overview.md), [Retrieval and Ranking Architectures](../04-recommendation-systems/retrieval-and-ranking-architectures.md) |
| [Time Series Forecasting](time-series-forecasting.md) | Forecast formulation, rolling-origin validation, intervals, and leakage. | [Time Series Fundamentals](../05-time-series-and-forecasting/time-series-fundamentals.md), [Backtesting](../05-time-series-and-forecasting/backtesting.md) |
| [World Models](world-models.md) | JEPA, V-JEPA, predictive latents, VLM comparisons, and planning claims. | [World Models and JEPA](../09-video-understanding/world-models-and-jepa.md), [V-JEPA 2](../09-video-understanding/v-jepa-2.md) |

## Prototype Prompts

| Prompt | Interview page | Canonical concept |
| --- | --- | --- |
| How does singular value decomposition differ from matrix factorization? | [SVD versus Matrix Factorization Prompt](svd-versus-matrix-factorization.md) | [SVD versus Matrix Factorization](../04-recommendation-systems/svd-versus-matrix-factorization.md) |
| Why does ordinary SVD not directly work well on a sparse utility matrix? | [Sparse Utility Matrix Prompt](sparse-utility-matrix-and-ordinary-svd.md) | [Sparse Utility Matrices and Ordinary SVD](../04-recommendation-systems/sparse-utility-matrices-and-svd.md) |
| How does a model know which tool to use? | [Tool-Use Prompt](how-model-knows-which-tool-to-use.md) | [Tool Use and Function Calling](../10-generative-ai/tool-use-and-function-calling.md) |
| How can generative-AI outputs be compared with classical ML outputs? | [Generative-AI versus Classical-ML Evaluation Prompt](compare-generative-ai-and-classical-ml-outputs.md) | [Comparing Generative AI and Classical ML Systems](../16-experimentation-and-evaluation/comparing-generative-ai-and-classical-ml-systems.md) |
| Are LLMs deterministic, and how does temperature work? | [Temperature and Determinism Prompt](llm-determinism-and-temperature.md) | [Temperature and Determinism](../10-generative-ai/temperature-and-determinism.md) |
| How does V-JEPA 2 differ from a vision-language model? | [V-JEPA 2 versus VLM Prompt](v-jepa-2-versus-vision-language-model.md) | [V-JEPA 2 versus Vision-Language Models](../09-video-understanding/v-jepa-2-versus-vision-language-models.md) |
| What motivates JEPA and world models? | [JEPA and World-Model Motivation Prompt](lecun-jepa-world-models-motivation.md) | [World Models and JEPA](../09-video-understanding/world-models-and-jepa.md) |

## Use Rule

Start with the direct answer, give the mechanism or distinction, add a concrete artifact, name the failure mode, and point back to the canonical page. If a follow-up exposes a missing concept, record it in [Knowledge Gaps](knowledge-gaps.md) instead of stretching an interview page into a full concept page.
