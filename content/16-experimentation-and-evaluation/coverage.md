---
title: Coverage
slug: experimentation-and-evaluation/coverage
description: "Measuring which slices, cases, sources, and decision paths an evaluation actually exercises."
area: experimentation-and-evaluation
topics:
  - coverage
  - slices
  - evaluation
level: intermediate
status: review
page_type: concept
aliases:
  - "Evaluation coverage"
prerequisites:
  - golden-datasets.md
related:
  - golden-datasets.md
  - offline-evaluation.md
  - repeated-sampling.md
  - abstention.md
  - risk-weighted-error-taxonomies.md
historical_context: false
last_reviewed: 2026-07-11
---
# Coverage

Coverage asks what an evaluation actually reaches: languages, domains, classes, source documents, risk categories, thresholds, fallbacks, and user segments. It is different from quality. A slice can be covered and fail badly; an uncovered slice makes the aggregate score silent. This is why [golden datasets](golden-datasets.md) need metadata, not just inputs and labels.

## Defining mechanism

For categorical slices, coverage is the fraction of required cells with at least one valid example:

$$
\text{coverage}=\frac{|\{c\in C:\text{count}(c)>0\}|}{|C|}.
$$

For numeric regions, define bins before evaluation: score thresholds, latency bands, document age, or confidence ranges. [Repeated sampling](repeated-sampling.md) can quantify metric variability, but it cannot create evidence for cells that have zero examples.

## Worked calculation

```python
import numpy as np

slices = np.array([["en","billing"],["en","billing"],["en","legal"],["de","billing"],["de","legal"],["es","billing"]])
langs = ["en","de","es","fr"]
domains = ["billing","legal"]
covered = {(l, d) for l, d in slices}
print(f"covered_cells {len(covered)}/{len(langs)*len(domains)}")
for l in langs:
    print(l, "".join("1" if (l, d) in covered else "0" for d in domains))
```

Observed output:

```text
covered_cells 5/8
en 11
de 11
es 10
fr 00
```

The set covers 5 of 8 required language-domain cells. Aggregate accuracy from this set says nothing about French, and it only tests Spanish billing. That gap should block claims about broad launch readiness even if [offline evaluation](offline-evaluation.md) looks strong.

## Caveats

Counting rows can exaggerate coverage when examples are near-duplicates. Source coverage is not answer coverage in RAG: a question may retrieve a policy document yet never exercise the refusal path. Coverage plans should include [abstention](abstention.md) and severe-error categories, not only happy-path inputs.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
