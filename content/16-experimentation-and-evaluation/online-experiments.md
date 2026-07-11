---
title: Online Experiments
slug: experimentation-and-evaluation/online-experiments
description: Controlled production experiments for measuring real user and business impact.
area: experimentation-and-evaluation
topics:
  - "online-experiments"
  - "ab-testing"
  - "statistical-significance"
level: intermediate
status: review
page_type: concept
aliases:
  - "A/B testing"
  - "Controlled experiments"
prerequisites:
  - "../02-probability-and-statistics/index.md"
related:
  - "paired-evaluation.md"
  - "../13-ml-engineering-and-mlops/canary-deployment.md"
historical_context: false
last_reviewed: 2026-07-11
references:
  - "kohavi-tang-xu-2020-trustworthy-online-experiments"
---
# Online Experiments

## Summary

Online experiments measure system changes in production with real users or traffic. A/B tests are the common form: randomly assign units to variants and compare outcomes.

## Why it matters

Offline metrics can miss product effects, feedback loops, user trust, latency sensitivity, and behavior changes caused by the model itself.

## Design considerations

- Define the unit of randomization.
- Pick primary and guardrail metrics before launch.
- Estimate sample size and runtime.
- Monitor data quality and assignment integrity.
- Separate launch safety from long-term product impact.

## Step-by-step example

For a recommender ranking change, randomize users into control and treatment. Choose click-through or conversion as a primary metric, but add guardrails for latency, diversity, complaint rate, and downstream retention. Before launch, verify sample-ratio integrity and event logging. During the test, avoid peeking-driven decisions unless the analysis plan supports sequential monitoring.

## Offline versus online

Offline evaluation checks whether a change is plausible and safe enough to test. Online experiments measure how real users respond when the system changes their choices, exposure, and feedback. A model can improve offline ranking metrics and still hurt the product if it narrows diversity, increases latency, or optimizes a proxy metric.

## Failure modes

Common failures include sample-ratio mismatch, novelty effects, interference between users, peeking without correction, and optimizing a proxy metric that harms the real objective.

## Related topics

- [A/B Testing](a-b-testing.md)
- [Statistical Significance](statistical-significance.md)
- [Canary Deployment](../13-ml-engineering-and-mlops/canary-deployment.md)
