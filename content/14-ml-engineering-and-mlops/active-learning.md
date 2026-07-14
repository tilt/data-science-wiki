---
title: Active Learning
slug: ml-engineering-and-mlops/active-learning
description: "Selecting the next examples to label when annotation is expensive."
area: ml-engineering-and-mlops
topics:
  - active-learning
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - human-in-the-loop-systems.md
  - evaluation-datasets.md
  - model-degradation.md
  - dataset-versioning.md
  - ../03-classical-machine-learning/classification.md
historical_context: false
last_reviewed: 2026-07-11
---
# Active Learning

Active learning selects unlabeled examples for annotation because the model expects those labels to improve learning more than random labels would. It is an ML operations loop: model scores a pool, a selection policy creates a labeling batch, [human-in-the-loop systems](human-in-the-loop-systems.md) collect labels, and a fixed [evaluation dataset](evaluation-datasets.md) checks whether the loop actually helped.

## Mechanism

Uncertainty sampling selects examples with small margin between the top two predicted classes. Diversity and stratification are usually added so the batch is not full of duplicates or low-value edge cases.

## Executed Selection

```python
import numpy as np

proba = np.array([
    [0.52, 0.48, 0.00],
    [0.91, 0.09, 0.00],
    [0.34, 0.33, 0.33],
    [0.65, 0.25, 0.10],
    [0.41, 0.39, 0.20],
])
sorted_p = np.sort(proba, axis=1)[:, ::-1]
margin = sorted_p[:, 0] - sorted_p[:, 1]
selected = np.argsort(margin)[:3]
print("active_margins", np.round(margin, 3).tolist())
print("active_selected_ids", selected.tolist())
```

Observed output:

```text
active_margins [0.04, 0.82, 0.01, 0.4, 0.02]
active_selected_ids [2, 4, 0]
```

Examples 2, 4, and 0 are most uncertain. The batch should still be deduplicated, source-balanced, and recorded through [dataset versioning](dataset-versioning.md), otherwise later [model degradation](model-degradation.md) analysis cannot tell which labels came from the active-learning policy.

## Failure Modes

Active learning can over-sample ambiguous cases, amplify annotator bias, and make evaluation optimistic if the queried pool becomes the benchmark. Keep a random audit sample and freeze the validation set between labeling rounds.

## References

- [Settles, Active Learning Literature Survey](https://burrsettles.com/pub/settles.activelearning.pdf)
- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
