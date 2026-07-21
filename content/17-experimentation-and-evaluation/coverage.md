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
last_reviewed: 2026-07-21
---

# Coverage

Coverage asks what an evaluation actually reaches: languages, domains, classes, source documents, risk categories, thresholds, fallbacks, and user segments. It is different from quality. A slice can be covered and fail badly; an uncovered slice makes the aggregate score silent. This is why [golden datasets](golden-datasets.md) need metadata, not just inputs and labels.

## Measuring slice coverage

For categorical slices, coverage is the fraction of required cells with at least one valid example:

$$
\text{coverage}=\frac{|\{c\in C:\text{count}(c)>0\}|}{|C|}.
$$

For numeric regions, define bins before evaluation: score thresholds, latency bands, document age, or confidence ranges. [Repeated sampling](repeated-sampling.md) can quantify metric variability, but it cannot create evidence for cells that have zero examples.

For evidence-grounded systems, source coverage uses the same idea over required source handles:

$$
\operatorname{source\ coverage}=\frac{|S_{\mathrm{tested}}\cap S_{\mathrm{required}}|}{|S_{\mathrm{required}}|}.
$$

## Worked calculation

Suppose the required launch claim spans four languages and two domains. The evaluation set contains English billing, English legal, German billing, German legal, and Spanish billing examples:

| language | billing |   legal |
| -------- | ------: | ------: |
| English  | covered | covered |
| German   | covered | covered |
| Spanish  | covered | missing |
| French   | missing | missing |

The set covers 5 of 8 required language-domain cells, so slice coverage is $5/8=0.625$. Aggregate accuracy from this set says nothing about French, and it only tests Spanish billing. That gap should block claims about broad launch readiness even if [offline evaluation](offline-evaluation.md) looks strong.

## Caveats

Counting rows can exaggerate coverage when examples are near-duplicates. Source coverage is not answer coverage in RAG: a question may retrieve a policy document yet never exercise the refusal path. Coverage plans should include [abstention](abstention.md) and severe-error categories, not only happy-path inputs.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)

> [!nav]
> **Section** — [Experimentation and Evaluation](index.md)
>
> [← Comparing Generative AI and Classical ML Systems](comparing-generative-ai-and-classical-ml-systems.md) [Abstention →](abstention.md)
