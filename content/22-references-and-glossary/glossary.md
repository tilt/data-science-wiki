---
title: Glossary
slug: references-and-glossary/glossary
description: Portable glossary of recurring terms, acronyms, and notation.
area: references-and-glossary
topics:
  - "glossary"
  - "notation"
level: foundational
status: review
page_type: reference
aliases:
  - "Acronyms"
  - "Notation"
prerequisites: []
related:
  - acronyms.md
  - notation.md
  - references.md
  - bibliography.md
historical_context: false
last_reviewed: 2026-07-10
---
# Glossary

This glossary defines recurring terms used across the wiki. It is intentionally concise; follow linked concept pages for formulas, examples, and production details. Use [acronyms](acronyms.md) for short forms, [notation](notation.md) for symbols, [metrics](metrics.md) for evaluation metrics, and [references](references.md) for source policy.

| Term | Meaning |
| ---- | ------- |
| ALS | [Alternating least squares](../04-recommendation-systems/alternating-least-squares.md), an optimization method often used for recommender matrix factorization. |
| ARIMA | [Autoregressive integrated moving average](../05-time-series-and-forecasting/arima.md), a univariate forecasting model. |
| BM25 | [A lexical search scoring function](../12-information-retrieval-and-search/bm25.md) based on term frequency, inverse document frequency, and document-length normalization. |
| Calibration | Agreement between predicted probabilities and observed frequencies. |
| Cold start | A recommendation problem where a new user or item has little interaction history. |
| Embedding | A vector representation of text, images, users, items, or other objects; see [embeddings](../11-generative-ai/embeddings.md). |
| Golden dataset | A curated, versioned evaluation set used for regression testing and model comparison. |
| JEPA | Joint Embedding Predictive Architecture, a family of representation-learning methods that predict in embedding space. |
| RAG | [Retrieval-augmented generation](../11-generative-ai/rag.md), where retrieved evidence is used to condition a generative model. |
| SVD | [Singular value decomposition](../01-mathematical-foundations/singular-value-decomposition.md), a matrix decomposition into singular vectors and singular values. |
| VLM | [Vision-language model](../11-generative-ai/vision-language-models.md), a model that aligns visual inputs with language. |

## Application Domains

Application pages connect canonical methods to domain-specific inputs, outputs, risks, and evaluation slices. They carry the `application` topic in front matter so the wiki can surface them together.

| Application | Canonical page | Main method families |
| --- | --- | --- |
| Autonomous driving | [Autonomous Driving](../19-domain-applications/autonomous-driving.md) | Perception, prediction, planning, control, simulation, safety evaluation. |
| Autonomous-driving evaluation | [Autonomous Driving Model Evaluation](../19-domain-applications/autonomous-driving-model-evaluation.md) | Scenario slicing, risk-weighted metrics, simulation, replay. |
| Demand prediction in logistics | [Demand Prediction in Logistics](../19-domain-applications/demand-prediction-in-logistics.md) | Forecasting, covariates, hierarchy, cold starts. |
| Energy forecasting | [Energy Forecasting](../19-domain-applications/energy-forecasting.md) | Time-series forecasting, exogenous variables, calibration. |
| Malware classification and clustering | [Malware Classification and Clustering](../19-domain-applications/malware-classification-and-clustering.md) | Classification, clustering, embeddings, adversarial drift. |
| Marketing text categorization | [Marketing Text Categorization](../19-domain-applications/marketing-text-categorization.md) | Text classification, taxonomy design, evaluation. |
| Matchmaking | [Matchmaking](../19-domain-applications/matchmaking.md) | Recommendation, ranking, constraints, fairness. |
| Medical MRI analysis | [Medical MRI Analysis](../19-domain-applications/medical-mri-analysis.md) | Computer vision, segmentation, classification, patient-level validation. |
| Museum label extraction and entity matching | [Museum Label Text Extraction and Entity Matching](../19-domain-applications/museum-label-text-extraction-and-entity-matching.md) | OCR, entity matching, retrieval, human review. |
| News recommendation | [News Recommendation](../19-domain-applications/news-recommendation.md) | Recommenders, ranking, freshness, diversity, feedback loops. |
| Predictive maintenance | [Predictive Maintenance](../19-domain-applications/predictive-maintenance.md) | Time series, anomaly detection, survival/risk scoring. |
| Real-time action recognition | [Real Time Action Recognition](../19-domain-applications/real-time-action-recognition.md) | Video understanding, streaming inference, trigger prediction. |
| Street-scene segmentation and pose detection | [Street Scene Segmentation and Pose Detection](../19-domain-applications/street-scene-segmentation-and-pose-detection.md) | Semantic segmentation, pose estimation, detection metrics. |
| Video gesture recognition | [Video Gesture Recognition](../19-domain-applications/video-gesture-recognition.md) | Gesture recognition, temporal localization, tracking. |

## How to use this page

Use the glossary when a term appears before its full explanation. For study, jump from the term to the relevant subject area: matrix terms usually live in mathematical foundations, recommender terms in recommendation systems, retrieval terms in search, and governance terms in responsible AI.
