---
title: How can outputs from generative-AI information systems be compared with outputs from classical ML systems?
slug: interview-preparation/compare-generative-ai-and-classical-ml-outputs
description: Interview prompt that links to the canonical evaluation comparison topic page.
area: interview-preparation
topics:
  - "interview-question"
  - "evaluation"
  - "generative-ai"
level: intermediate
status: review
page_type: interview-question
aliases: []
prerequisites:
  - "../16-experimentation-and-evaluation/golden-datasets.md"
related:
  - "../16-experimentation-and-evaluation/comparing-generative-ai-and-classical-ml-systems.md"
historical_context: false
last_reviewed: 2026-07-11
---
# How can outputs from generative-AI information systems be compared with outputs from classical ML systems?

## Answer

Decompose the task, compare shared outcomes such as correctness, cost, latency, calibration, coverage, and business utility, then add generative-specific measures such as factuality, citation correctness, groundedness, instruction following, and tool-call validity.

## What a strong answer adds

1. Define the decision the system supports.
2. Identify shared metrics: accuracy, precision, recall, calibration, cost, latency, and user impact.
3. Add output-specific criteria for generative systems: groundedness, citation support, schema validity, refusal quality, and severe-error rate.
4. Use the same examples for both systems where possible.
5. Compare failures by severity rather than only by average score.

## Worked example

For document triage, a classical classifier may output a label and probability. A generative system may output a label, explanation, extracted fields, and citations. Compare the label accuracy for both. Then separately score the generative explanation for factual support and whether cited spans actually justify the claim.

## Common follow-ups

- Generative systems often need human or rubric-based evaluation in addition to exact metrics.
- Classical systems may be easier to calibrate and monitor when outputs are fixed labels.
- The better choice depends on the workflow, not on whether the output is more fluent.

## Canonical concept

Read the topic page: [Comparing Generative AI and Classical ML Systems](../16-experimentation-and-evaluation/comparing-generative-ai-and-classical-ml-systems.md).
