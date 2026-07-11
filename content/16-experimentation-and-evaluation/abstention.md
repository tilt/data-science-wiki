---
title: Abstention
slug: experimentation-and-evaluation/abstention
description: Concise guide to Abstention in Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - abstention
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
# Abstention

## Summary

Abstention is the decision not to answer, classify, or act when confidence or evidence is insufficient. It is a safety and quality mechanism, not only a fallback.

## Step-by-step example

A medical assistant should abstain when retrieved evidence does not support a specific answer, even if the model can produce plausible text.

## Common failure modes

- Choosing Abstention metrics that do not match the decision, risk, or user-visible failure.
- Ignoring uncertainty, multiple comparisons, label quality, or segment-level disagreement.
- Treating evaluation output as final truth without inspecting examples and domain-review conflicts.

- Averaging away severe failures, minority slices, or uncertainty.
- Treating a benchmark result as production readiness without reviewing examples.

## Mechanism

Abstention introduces a decision threshold: answer only when confidence, evidence support, or policy conditions are sufficient. The system then has at least three outcomes: correct answer, incorrect answer, and no-answer. Evaluation must measure both error reduction and coverage loss.
