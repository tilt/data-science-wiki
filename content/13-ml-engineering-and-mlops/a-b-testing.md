---
title: A/B Testing
slug: ml-engineering-and-mlops/a-b-testing
description: "Randomized online comparison of ML system variants under production conditions."
area: ml-engineering-and-mlops
topics:
  - a-b-testing
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - canary-deployment.md
  - evaluation-datasets.md
  - model-degradation.md
  - ../16-experimentation-and-evaluation/a-b-testing.md
  - ../16-experimentation-and-evaluation/online-experiments.md
historical_context: false
last_reviewed: 2026-07-11
---
# A/B Testing

A/B testing compares model or product variants by randomly assigning eligible units to control and treatment. In MLOps, it answers a different question than [evaluation datasets](evaluation-datasets.md): did the deployed system improve the production outcome for randomized traffic?

## Mechanism

The contract must state unit of randomization, assignment key, exposure rule, primary metric, guardrails, exclusion rules, ramp plan, and stopping rule. For two conversion rates, a simple large-sample check uses

$$
z=\frac{\hat p_B-\hat p_A}{\sqrt{\hat p(1-\hat p)(1/n_A+1/n_B)}}.
$$

The experimentation section has the canonical stats treatment in [A/B testing](../16-experimentation-and-evaluation/a-b-testing.md); this page focuses on ML release mechanics.

## Worked Check

For a production experiment with 12,000 control users and 11,850 treatment users:

| arm | users | conversions | rate |
| --- | ---: | ---: | ---: |
| control | 12,000 | 984 | 0.0820 |
| treatment | 11,850 | 1,055 | 0.0890 |

The absolute lift is 0.7 percentage points. Using the pooled-rate z-test gives $z=1.941$ and a two-sided $p=0.0522$, so the observed lift is positive but misses a conventional 5% two-sided threshold. A release decision should also inspect guardrails such as [model degradation](model-degradation.md), latency, complaint rate, and segment harm. A [canary deployment](canary-deployment.md) can precede the experiment, but it is not a substitute for randomized impact measurement.

## Failure Modes

Peeking, assignment drift, sample-ratio mismatch, interference, and mid-test model changes can invalidate the result. Recommenders and marketplaces may need switchback or cluster designs, covered more broadly in [online experiments](../16-experimentation-and-evaluation/online-experiments.md).

## References

- [Larsen et al., Statistical Challenges in Online Controlled Experiments](https://arxiv.org/abs/2212.11366)
- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
