---
title: LLM-as-Judge
slug: experimentation-and-evaluation/llm-as-judge
description: Concise guide to LLM-as-Judge in Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - llm-as-judge
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

LLM-as-judge evaluation uses a language model to assess outputs from another system. It can scale qualitative review, but it must be calibrated against human judgment and protected from bias, prompt leakage, and brittle rubrics.

## Core idea

A judge model receives an input, one or more candidate outputs, and a rubric. It returns a score, label, preference, or critique. The rubric should define observable criteria such as correctness, completeness, groundedness, tone, or policy compliance.

## Example

For a support assistant, a judge can compare an answer with the retrieved policy passages and rate whether the answer is supported, complete, and safe. Human reviewers should audit a sample to estimate where the judge over- or under-penalizes outputs.

## Good practice

Use blinded comparisons when possible, randomize answer order, include adversarial and low-quality examples, measure agreement with humans, and keep judge prompts versioned. Treat judge scores as evaluation signals, not objective truth.

## Failure modes

LLM judges can prefer verbose answers, be influenced by formatting, miss subtle factual errors, leak benchmark assumptions, and share failure modes with the system being evaluated.
