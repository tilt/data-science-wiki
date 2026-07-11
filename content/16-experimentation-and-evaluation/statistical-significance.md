---
title: Statistical Significance
slug: experimentation-and-evaluation/statistical-significance
description: Concise guide to Statistical Significance in Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - statistical-significance
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Statistical Significance

## Summary

Statistical significance assesses whether an observed difference is larger than expected under a null model and sampling variability. It does not by itself prove practical importance.

## Step-by-step example

An experiment may show a statistically significant 0.1 percent lift, but the effect may be too small to justify cost or risk.

## Common failure modes

- Choosing Statistical Significance metrics that do not match the decision, risk, or user-visible failure.
- Ignoring uncertainty, multiple comparisons, label quality, or segment-level disagreement.
- Treating evaluation output as final truth without inspecting examples and domain-review conflicts.

- Averaging away severe failures, minority slices, or uncertainty.
- Treating a benchmark result as production readiness without reviewing examples.

## Mechanism

Statistical significance compares an observed effect with the variation expected under a null hypothesis. It should be reported with effect size and uncertainty; a tiny effect can be statistically significant with enough data while still being operationally irrelevant.
