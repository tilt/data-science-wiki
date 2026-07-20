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
last_reviewed: 2026-07-20
---

# Glossary

This glossary defines recurring terms used across the wiki. It is intentionally concise; follow linked concept pages for formulas, examples, and production details. Use [acronyms](acronyms.md) for short forms, [notation](notation.md) for symbols, [metrics](metrics.md) for evaluation metrics, and [references](references.md) for source policy.

| Term                     | Meaning                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ALS                      | [Alternating least squares](../04-recommendation-systems/alternating-least-squares.md), an optimization method often used for recommender matrix factorization.                                               |
| ARIMA                    | [Autoregressive integrated moving average](../05-time-series-and-forecasting/arima.md), a univariate forecasting model.                                                                                       |
| Attention                | A mechanism that weights different input positions when forming each output; the core operation behind [transformers](../06-deep-learning/transformers.md) and [attention](../06-deep-learning/attention.md). |
| Backpropagation          | [Reverse-mode differentiation](../06-deep-learning/backpropagation.md) that computes gradients of a loss with respect to network parameters.                                                                  |
| Backtesting              | [Time-ordered evaluation](../05-time-series-and-forecasting/backtesting.md) that replays history to estimate forecast quality without leaking the future.                                                     |
| Bias-variance trade-off  | The [tension](../03-classical-machine-learning/bias-variance-trade-off.md) between underfitting (high bias) and overfitting (high variance) as model flexibility changes.                                     |
| BM25                     | [A lexical search scoring function](../12-information-retrieval-and-search/bm25.md) based on term frequency, inverse document frequency, and document-length normalization.                                   |
| Calibration              | Agreement between predicted probabilities and observed frequencies.                                                                                                                                           |
| Cold start               | A recommendation or forecasting problem where a new user, item, or series has little history; see [cold-start forecasting](../05-time-series-and-forecasting/cold-start-forecasting.md).                      |
| Concept drift            | A [change](../14-ml-engineering-and-mlops/concept-drift.md) in the input-output relationship that degrades a deployed model over time.                                                                        |
| Cross-entropy            | A [loss](../01-mathematical-foundations/cross-entropy.md) measuring the bits needed to encode outcomes from one distribution using another; standard for classification.                                      |
| Data leakage             | [Information from outside the training fold](../03-classical-machine-learning/data-leakage.md) that inflates offline scores and then fails in production.                                                     |
| Dimensionality reduction | [Methods](../03-classical-machine-learning/dimensionality-reduction.md) that compress features to fewer dimensions while preserving useful structure.                                                         |
| Embedding                | A vector representation of text, images, users, items, or other objects; see [embeddings](../11-generative-ai/embeddings.md).                                                                                 |
| Fine-tuning              | [Adapting](../06-deep-learning/fine-tuning.md) a pretrained model to a task or domain by continuing training on new data.                                                                                     |
| Golden dataset           | A curated, versioned evaluation set used for regression testing and model comparison.                                                                                                                         |
| Gradient descent         | The [iterative optimizer](../01-mathematical-foundations/gradient-descent.md) that steps parameters against the loss gradient.                                                                                |
| Grounding                | [Conditioning generated text](../11-generative-ai/grounding.md) on retrieved or provided evidence so claims are supported.                                                                                    |
| Guardrails               | [Input and output checks](../11-generative-ai/guardrails.md) that constrain a generative system to safe, valid behavior.                                                                                      |
| Hallucination            | Fluent but unsupported model output; see [hallucination mitigation](../11-generative-ai/hallucination-mitigation.md).                                                                                         |
| JEPA                     | Joint Embedding Predictive Architecture, a family of representation-learning methods that predict in embedding space.                                                                                         |
| KL divergence            | An [asymmetric measure](../01-mathematical-foundations/kl-divergence.md) of how much one probability distribution differs from another.                                                                       |
| MDP                      | [Markov decision process](../07-reinforcement-learning/markov-decision-processes.md), the formal model of sequential decision-making under reward.                                                            |
| Overfitting              | Fitting noise in the training set so test performance drops; the high-variance end of the [bias-variance trade-off](../03-classical-machine-learning/bias-variance-trade-off.md).                             |
| Quantization             | [Reducing the numeric precision](../11-generative-ai/quantization.md) of weights or activations to cut memory and latency.                                                                                    |
| RAG                      | [Retrieval-augmented generation](../11-generative-ai/rag.md), where retrieved evidence is used to condition a generative model.                                                                               |
| Regularization           | [Penalties or constraints](../03-classical-machine-learning/regularization.md) that reduce overfitting by discouraging overly complex models.                                                                 |
| Reranking                | [Reordering](../12-information-retrieval-and-search/reranking.md) an initial candidate list with a stronger, costlier model.                                                                                  |
| Stationarity             | A [time-series property](../05-time-series-and-forecasting/stationarity.md) where statistical behavior is stable over time; assumed by many classical models.                                                 |
| SVD                      | [Singular value decomposition](../01-mathematical-foundations/singular-value-decomposition.md), a matrix decomposition into singular vectors and singular values.                                             |
| Tokenization             | [Splitting text](../08-natural-language-processing/tokenization.md) into the discrete units a model consumes.                                                                                                 |
| Transformer              | The [attention-based architecture](../06-deep-learning/transformers.md) underlying most modern language and vision models.                                                                                    |
| Vector database          | [A store](../11-generative-ai/vector-databases.md) for embeddings that supports fast nearest-neighbor retrieval.                                                                                              |
| VLM                      | [Vision-language model](../11-generative-ai/vision-language-models.md), a model that aligns visual inputs with language.                                                                                      |

## Application Domains

Application pages connect canonical methods to domain-specific inputs, outputs, risks, and evaluation slices. They carry the `application` topic in front matter so the wiki can surface them together.

| Application                           | Canonical page                                                                                                                                      | Main method families                                                          |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Autonomous driving                    | [Autonomous Driving](../19-domain-applications/autonomous-driving.md)                                                                               | Perception, prediction, planning, control, simulation, safety evaluation.     |
| Autonomous-driving evaluation         | [Autonomous Driving Model Evaluation](../19-domain-applications/autonomous-driving-model-evaluation.md)                                             | Scenario slicing, risk-weighted metrics, simulation, replay.                  |
| Demand prediction in logistics        | [Demand Prediction in Logistics](../19-domain-applications/demand-prediction-in-logistics.md)                                                       | Forecasting, covariates, hierarchy, cold starts.                              |
| Energy forecasting                    | [Energy Forecasting](../19-domain-applications/energy-forecasting.md)                                                                               | Time-series forecasting, exogenous variables, calibration.                    |
| Malware classification and clustering | [Malware Classification and Clustering](../19-domain-applications/malware-classification-and-clustering.md)                                         | Classification, clustering, embeddings, adversarial drift.                    |
| Business message classification       | [Business Message Classification](../19-domain-applications/business-message-classification.md)                                                     | Text classification, taxonomy design, evaluation.                             |
| Matchmaking                           | [Matchmaking](../19-domain-applications/matchmaking.md)                                                                                             | Recommendation, ranking, constraints, fairness.                               |
| Medical MRI analysis                  | [Medical MRI Analysis](../19-domain-applications/medical-mri-analysis.md)                                                                           | Computer vision, segmentation, classification, patient-level validation.      |
| Cultural heritage document extraction | [Cultural Heritage Document Extraction and Entity Matching](../19-domain-applications/cultural-heritage-document-extraction-and-entity-matching.md) | OCR, entity matching, retrieval, human review.                                |
| News recommendation                   | [News Recommendation](../19-domain-applications/news-recommendation.md)                                                                             | Recommenders, ranking, freshness, diversity, feedback loops.                  |
| Predictive maintenance                | [Predictive Maintenance](../19-domain-applications/predictive-maintenance.md)                                                                       | Time series, anomaly detection, survival/risk scoring.                        |
| Real-time action recognition          | [Real Time Action Recognition](../19-domain-applications/real-time-action-recognition.md)                                                           | Video understanding, streaming inference, trigger prediction.                 |
| Road scene perception                 | [Road Scene Perception](../19-domain-applications/road-scene-perception.md)                                                                         | Semantic segmentation, detection, pose estimation, tracking, scenario slices. |
| Gesture-based interaction             | [Gesture-Based Interaction](../19-domain-applications/gesture-based-interaction.md)                                                                 | Gesture recognition, temporal localization, false-trigger control.            |

## How to use this page

Use the glossary when a term appears before its full explanation. For study, jump from the term to the relevant subject area: matrix terms usually live in mathematical foundations, recommender terms in recommendation systems, retrieval terms in search, and governance terms in responsible AI.

> [!nav]
> **Section** — [References and Glossary](index.md)
>
> [Acronyms →](acronyms.md)
