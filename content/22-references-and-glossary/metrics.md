---
title: Metrics Glossary
slug: references-and-glossary/metrics
description: Cross-domain lookup index for evaluation metrics used across the wiki.
area: references-and-glossary
topics:
  - "metrics"
  - "evaluation"
  - "glossary"
level: foundational
status: review
page_type: reference
aliases:
  - "Metric reference"
prerequisites: []
related:
  - glossary.md
  - notation.md
  - ../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md
  - ../12-information-retrieval-and-search/ranking-and-retrieval-metrics.md
historical_context: false
last_reviewed: 2026-07-13
---
# Metrics Glossary

This glossary is a cross-domain lookup index for evaluation metrics used across the wiki. Each row names the metric, gives its field of application, and links to the page that owns the fuller definition, formula, examples, and caveats.

## Classification and Probability Calibration

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [Accuracy](../03-classical-machine-learning/evaluation-metrics.md) | Classification | Fraction of examples whose predicted class equals the label. |
| [Precision](../03-classical-machine-learning/evaluation-metrics.md) | Classification | Fraction of predicted positives that are true positives. |
| [Recall](../03-classical-machine-learning/evaluation-metrics.md) | Classification | Fraction of actual positives found by the model. |
| [F1](../03-classical-machine-learning/evaluation-metrics.md) | Classification | Harmonic mean of precision and recall for a class or averaging scheme. |
| [Balanced accuracy](../03-classical-machine-learning/class-imbalance.md) | Imbalanced classification | Accuracy averaged across classes so a majority class cannot dominate the score. |
| [ROC-AUC](../03-classical-machine-learning/evaluation-metrics.md) | Binary ranking and classification | Threshold-free discrimination score based on the receiver operating characteristic curve. |
| [PR-AUC / average precision](../03-classical-machine-learning/class-imbalance.md) | Rare-positive classification | Area-style summary of precision-recall ranking quality, often more informative under extreme imbalance. |
| [Log loss](../03-classical-machine-learning/calibration.md) | Probabilistic classification | Negative log-likelihood that rewards calibrated probability assigned to the observed label. |
| [Brier score](../17-experimentation-and-evaluation/calibration.md) | Probability calibration | Mean squared error between predicted probability and binary outcome. |
| [Expected calibration error](../17-experimentation-and-evaluation/calibration.md) | Probability calibration | Weighted gap between predicted confidence and observed accuracy across bins. |
| [Sensitivity](../09-computer-vision/medical-image-analysis.md) | Clinical and safety classification | Positive-class recall, usually emphasizing missed positives. |
| [Specificity](../09-computer-vision/medical-image-analysis.md) | Clinical and safety classification | Fraction of actual negatives correctly rejected. |

## Regression

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [Mean absolute error](../03-classical-machine-learning/evaluation-metrics.md) | Regression | Average absolute prediction error in target units. |
| [Mean squared error](../03-classical-machine-learning/evaluation-metrics.md) | Regression | Average squared prediction error, emphasizing larger misses. |
| [Root mean squared error](../03-classical-machine-learning/evaluation-metrics.md) | Regression | Square root of mean squared error, reported in target units. |
| [R-squared](../03-classical-machine-learning/regression.md) | Regression | Share of target variance explained relative to a baseline. |

## Ranking and Retrieval

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [Precision@k](../12-information-retrieval-and-search/ranking-and-retrieval-metrics.md) | Ranked retrieval | Fraction of the visible top results that are relevant. |
| [Recall@k](../12-information-retrieval-and-search/ranking-and-retrieval-metrics.md) | Ranked retrieval | Fraction of known relevant results recovered in the top results. |
| [MAP](../12-information-retrieval-and-search/ranking-and-retrieval-metrics.md) | Ranked retrieval | Mean of average precision scores across queries. |
| [MRR](../12-information-retrieval-and-search/ranking-and-retrieval-metrics.md) | Ranked retrieval | Average reciprocal rank of the first relevant result. |
| [NDCG](../12-information-retrieval-and-search/ranking-and-retrieval-metrics.md) | Ranked retrieval | Rank-discounted graded relevance normalized by the ideal ordering. |
| [Rank of first expected source](../11-generative-ai/rag-benchmark-design.md) | RAG retrieval benchmarks | Position of the earliest labelled evidence source in the retrieved list. |

## Recommendation

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [Top-k precision](../04-recommendation-systems/evaluation-of-recommenders.md) | Recommender ranking | Fraction of recommended items in a list that match the user's held-out relevant set. |
| [Top-k recall](../04-recommendation-systems/evaluation-of-recommenders.md) | Recommender ranking | Fraction of the user's held-out relevant items recovered by the recommendation list. |
| [Catalog coverage](../04-recommendation-systems/diversity-novelty-coverage-serendipity.md) | Recommender list health | Portion of the item catalog or user space reached by recommendations. |
| [Intra-list diversity](../04-recommendation-systems/diversity-novelty-coverage-serendipity.md) | Recommender list health | Degree to which items in the same recommendation list differ from one another. |
| [Novelty](../04-recommendation-systems/diversity-novelty-coverage-serendipity.md) | Recommender list health | Degree to which recommended items are not already obvious or popular. |
| [Serendipity](../04-recommendation-systems/diversity-novelty-coverage-serendipity.md) | Recommender list health | Degree to which recommendations are both unexpected and useful. |

## Time-Series Forecasting

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [MAE](../05-time-series-and-forecasting/forecast-error-metrics.md) | Point forecasting | Average absolute forecast error in the target unit. |
| [RMSE](../05-time-series-and-forecasting/forecast-error-metrics.md) | Point forecasting | Square root of average squared forecast error, emphasizing large misses. |
| [MAPE](../05-time-series-and-forecasting/forecast-error-metrics.md) | Point forecasting | Average absolute percentage error, unstable when actuals are zero or near zero. |
| [WAPE](../05-time-series-and-forecasting/forecast-error-metrics.md) | Demand and portfolio forecasting | Total absolute error divided by total actual volume. |
| [MASE](../05-time-series-and-forecasting/forecast-error-metrics.md) | Cross-series forecasting | Absolute error scaled by a naive or seasonal-naive baseline. |
| [Forecast bias](../05-time-series-and-forecasting/forecast-error-metrics.md) | Point forecasting | Signed average error showing systematic overforecasting or underforecasting. |
| [Quantile loss / pinball loss](../05-time-series-and-forecasting/quantile-loss.md) | Probabilistic forecasting | Asymmetric loss for evaluating a forecasted quantile. |
| [Empirical interval coverage](../05-time-series-and-forecasting/prediction-intervals.md) | Prediction intervals | Fraction of realized values falling inside predicted intervals. |
| [Interval width](../05-time-series-and-forecasting/prediction-intervals.md) | Prediction intervals | Size of the predicted interval, reported alongside coverage. |
| [Sharpness](../05-time-series-and-forecasting/probabilistic-forecasting.md) | Probabilistic forecasting | Concentration of a predictive distribution when calibration is acceptable. |
| [Forecast calibration](../05-time-series-and-forecasting/forecast-calibration.md) | Probabilistic forecasting | Agreement between predicted quantiles or intervals and observed frequencies. |

## NLP and Text Generation

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [Macro-F1](../08-natural-language-processing/evaluation-of-nlp-systems.md) | NLP classification | Class-level F1 averaged equally across labels. |
| [Micro-F1](../08-natural-language-processing/evaluation-of-nlp-systems.md) | NLP classification | F1 computed from aggregated counts across labels. |
| [Span F1](../08-natural-language-processing/named-entity-recognition.md) | Sequence labelling and extraction | F1 over matched spans rather than only token labels. |
| [Field exact match](../08-natural-language-processing/information-extraction.md) | Information extraction | Whether an extracted field value exactly matches the reference value. |
| [Field exact accuracy](../08-natural-language-processing/information-extraction.md) | Information extraction | Fraction of schema fields whose extracted values exactly match references. |
| [Character error rate](../08-natural-language-processing/ocr-and-handwritten-text-recognition.md) | OCR and transcription | Edit distance normalized by reference character count. |
| [Word error rate](../08-natural-language-processing/ocr-and-handwritten-text-recognition.md) | OCR and speech-style transcription | Word-level edit distance normalized by reference word count. |
| [Perplexity](../08-natural-language-processing/language-modelling.md) | Language modelling | Exponentiated average negative log-likelihood per predicted token. |
| [BLEU](../08-natural-language-processing/evaluation-of-nlp-systems.md) | Machine translation and generation | Reference-overlap score based on modified n-gram precision. |

## Computer Vision and Video

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [Intersection over union](../09-computer-vision/detection-and-segmentation-metrics.md) | Detection and segmentation | Overlap divided by union between predicted and reference regions. |
| [Dice coefficient](../09-computer-vision/detection-and-segmentation-metrics.md) | Segmentation | Twice the overlap divided by combined predicted and reference region sizes. |
| [Average precision](../09-computer-vision/detection-and-segmentation-metrics.md) | Object detection | Precision-recall summary after confidence sorting and overlap-based matching. |
| [mAP](../09-computer-vision/detection-and-segmentation-metrics.md) | Object detection | Mean detection average precision across classes and often overlap thresholds. |
| [Pixel accuracy](../09-computer-vision/semantic-segmentation.md) | Semantic segmentation | Fraction of pixels assigned the correct class. |
| [Mean IoU](../09-computer-vision/semantic-segmentation.md) | Semantic segmentation | Average class-wise region overlap score. |
| [PCK](../09-computer-vision/pose-estimation.md) | Pose estimation | Fraction of visible keypoints within a normalized distance threshold. |
| [Temporal IoU](../10-video-understanding/temporal-localization.md) | Temporal localization | Overlap divided by union for predicted and reference time segments. |
| [Temporal mAP](../10-video-understanding/temporal-localization.md) | Temporal action detection | Mean average precision for time segments across temporal overlap thresholds. |

## Clustering and Representation

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [Silhouette score](../03-classical-machine-learning/clustering.md) | Clustering | Geometry-only score comparing within-cluster distance with nearest other-cluster distance. |
| [Adjusted Rand index](../03-classical-machine-learning/unsupervised-learning.md) | Clustering with labels | Chance-adjusted agreement between a clustering and reference labels. |

## Generative AI, RAG, and Agents

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [Context recall](../11-generative-ai/rag-evaluation.md) | RAG retrieval | Fraction of expected evidence recovered into the model context. |
| [Citation precision](../11-generative-ai/rag-evaluation.md) | RAG answers | Fraction of cited sources that correspond to expected or supporting evidence. |
| [Citation coverage](../11-generative-ai/rag-evaluation.md) | RAG answers | Degree to which answer claims or required facts have citations. |
| [Answer support](../11-generative-ai/rag-evaluation.md) | RAG answers | Degree to which generated claims are backed by retrieved evidence. |
| [Claim support rate](../11-generative-ai/rag-evaluation.md) | RAG answers | Fraction of checked answer claims judged supported by evidence. |
| [Abstention quality](../11-generative-ai/rag-evaluation.md) | RAG and generative systems | Whether the system refuses or answers appropriately when evidence is missing. |
| [Task success](../11-generative-ai/rag-evaluation.md) | Generative task systems | Whether the final output satisfies the task-specific success criteria. |
| [Pass predicate](../11-generative-ai/agent-evaluation.md) | Agent evaluation | Boolean conjunction of outcome correctness, required actions, forbidden-action absence, and budget compliance. |
| [Budget compliance](../11-generative-ai/agent-evaluation.md) | Agent evaluation | Whether a trace stays within resource, latency, or call limits. |
| [Source coverage](../17-experimentation-and-evaluation/coverage.md) | RAG and evaluation datasets | Degree to which required source documents or evidence categories are exercised. |

## Experiment and Agreement Statistics

| Metric | Field of application | Meaning |
| ------ | -------------------- | ------- |
| [p-value](../02-probability-and-statistics/hypothesis-testing.md) | Hypothesis testing | Probability of a statistic at least as extreme under a specified null model. |
| [Confidence interval](../02-probability-and-statistics/confidence-intervals.md) | Statistical estimation | Repeated-sampling interval procedure with nominal long-run parameter coverage. |
| [Statistical power](../17-experimentation-and-evaluation/a-b-testing.md) | Experiment planning | Probability of detecting a specified effect under the planned test design. |
| [Bootstrap interval](../17-experimentation-and-evaluation/repeated-sampling.md) | Evaluation uncertainty | Interval estimated by resampling examples and recomputing a statistic. |
| [Evaluation coverage](../17-experimentation-and-evaluation/coverage.md) | Evaluation datasets | Fraction of required slices, cases, sources, or paths represented in the evaluation. |
| [Raw agreement](../17-experimentation-and-evaluation/human-evaluation.md) | Human evaluation | Fraction of reviewer labels that match before chance adjustment. |
| [Cohen's kappa](../17-experimentation-and-evaluation/human-evaluation.md) | Human evaluation | Reviewer agreement adjusted for expected chance agreement. |

## How to use this page

Use this glossary when a metric name appears before its full explanation. For study, jump from the metric to the owning subject area: classification and regression metrics usually live in classical machine learning, forecast metrics in time-series forecasting, ranked-list metrics in search or recommendation systems, and judge or trace metrics in generative AI and experimentation.
