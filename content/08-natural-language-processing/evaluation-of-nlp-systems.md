---
title: Evaluation of NLP Systems
slug: natural-language-processing/evaluation-of-nlp-systems
description: "Measuring text systems with task-specific metrics, slices, uncertainty, and example review."
area: natural-language-processing
topics:
  - evaluation-of-nlp-systems
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - text-classification.md
  - sequence-labelling.md
  - named-entity-recognition.md
  - summarization.md
  - urgency-classification.md
  - ../17-experimentation-and-evaluation/offline-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Evaluation of NLP Systems

NLP evaluation asks whether a text system does the task correctly under the ambiguity, noise, and cost structure of its use case. A [text classification](text-classification.md) router, [sequence labelling](sequence-labelling.md) tagger, [named entity recognition](named-entity-recognition.md) model, [summarization](summarization.md) system, and [urgency classification](urgency-classification.md) policy need different metrics and examples.

## Defining mechanism

For classification, precision, recall, and F1 for class $k$ are

$$
\operatorname{precision}_k=\frac{TP_k}{TP_k+FP_k},\quad
\operatorname{recall}_k=\frac{TP_k}{TP_k+FN_k},\quad
F1_k=\frac{2PR}{P+R}.
$$

Macro-F1 averages classes equally; micro-F1 aggregates counts. For NLP, also separate span correctness, label correctness, factual correctness, latency, abstention, and downstream utility. Bootstrap intervals communicate how unstable a small evaluation set is.

For generated text, BLEU compares a candidate output with one or more references using modified n-gram precision and a brevity penalty:

$$
\operatorname{BLEU}=BP\cdot \exp\left(\sum_{n=1}^{N} w_n \log p_n\right),
$$

where $p_n$ is modified $n$-gram precision, $w_n$ is the weight for each order, and $BP$ penalizes overly short candidates. It is most useful for corpus-level machine translation comparisons where many acceptable phrasings are represented in references. BLEU is a weak proxy for summarization quality, factuality, citation support, or instruction following, so generated text systems should pair it with task-specific review.

## Worked example

This snippet computes macro-F1 for a small classifier, bootstraps a confidence interval, and reports per-label F1 scores.

```python
import numpy as np
from sklearn.metrics import f1_score

np.random.seed(7)
y_true = np.array(["urgent", "normal", "urgent", "low", "normal", "urgent", "low", "normal"])
y_pred = np.array(["urgent", "normal", "normal", "low", "urgent", "urgent", "low", "normal"])
rng = np.random.default_rng(7)
boots = []
for _ in range(1000):
    idx = rng.integers(0, len(y_true), len(y_true))
    boots.append(f1_score(y_true[idx], y_pred[idx], average="macro"))
lo, hi = np.percentile(boots, [2.5, 97.5])
print("macro_f1", round(f1_score(y_true, y_pred, average="macro"), 3))
print("bootstrap_95_ci", (round(float(lo), 3), round(float(hi), 3)))
print("per_label", {label: round(float(score), 3) for label, score in zip(["low", "normal", "urgent"], f1_score(y_true, y_pred, labels=["low", "normal", "urgent"], average=None))})
```

Observed output:

```text
macro_f1 0.778
bootstrap_95_ci (0.444, 1.0)
per_label {'low': 1.0, 'normal': 0.667, 'urgent': 0.667}
```

The point estimate looks respectable, but the confidence interval is wide because there are only eight examples. That is a signal to collect more labelled cases before making production claims.

## Caveats

Aggregate metrics can hide minority-language failures, rare entity misses, or costly false negatives. Generated text needs factuality and citation checks, not only overlap metrics. Evaluation sets must freeze annotation rules, preprocessing, prompts, and thresholds; otherwise a score change may reflect the harness rather than the NLP model.

## References

- [scikit-learn documentation: classification metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics)
- [scikit-learn API: f1_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html)
- [Papineni et al., BLEU: a Method for Automatic Evaluation of Machine Translation](https://aclanthology.org/P02-1040/)

> **Learning path — Natural language processing:** ← [Text Classification](text-classification.md) · [path overview](../00-home-and-navigation/learning-paths.md#natural-language-processing)
