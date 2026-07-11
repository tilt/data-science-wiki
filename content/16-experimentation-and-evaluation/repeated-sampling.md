---
title: Repeated Sampling
slug: experimentation-and-evaluation/repeated-sampling
description: Concise guide to Repeated Sampling in Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - repeated-sampling
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
## Summary

Repeated sampling estimates variability by rerunning an evaluation process over multiple samples, resamples, seeds, prompts, or traffic slices. It helps distinguish robust improvements from noise.

## Core idea

A single evaluation number hides sampling variability. Repeated sampling asks how much the result changes when the dataset, generation sample, model seed, or user slice changes. The output is a distribution of scores or differences rather than one point.

## Example

A summarization system is evaluated on 500 documents. Bootstrap resampling creates many resampled datasets of size 500, computes the metric difference for each, and reports the distribution of differences. If most differences are positive, the improvement is more credible than one isolated score.

## Generative systems

For LLMs, repeated sampling can also mean generating multiple outputs per prompt to estimate variability under decoding settings. This is useful when temperature, tool calls, or retrieval can change the answer.

## Failure modes

Repeated sampling does not fix biased datasets, flawed rubrics, or leakage. It only quantifies variability under the sampling scheme you choose.
