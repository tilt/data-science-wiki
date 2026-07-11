---
title: Human Evaluation
slug: experimentation-and-evaluation/human-evaluation
description: Concise guide to Human Evaluation in Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - human-evaluation
level: intermediate
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
# Human Evaluation

## Summary

Human evaluation uses reviewers to judge outputs when automatic labels or metrics are insufficient. It is essential for open-ended generation, severity assessment, and subjective utility.

## Step-by-step example

Reviewers can grade support-ticket answers for correctness, empathy, policy compliance, and whether the cited source supports the response.

## Common failure modes

- Choosing Human Evaluation metrics that do not match the decision, risk, or user-visible failure.
- Ignoring uncertainty, multiple comparisons, label quality, or segment-level disagreement.
- Treating evaluation output as final truth without inspecting examples and domain-review conflicts.

- Averaging away severe failures, minority slices, or uncertainty.
- Treating a benchmark result as production readiness without reviewing examples.

## Design check

Human evaluation needs a rubric, examples, reviewer training, disagreement handling, and sampling plan. Without those controls, reviewer preference, fatigue, and ambiguity can dominate the measured system difference.
