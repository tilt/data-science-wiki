---
title: Experiment Tracking
slug: ml-engineering-and-mlops/experiment-tracking
description: Concise guide to Experiment Tracking in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - experiment-tracking
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

Experiment tracking records the code, data, configuration, metrics, artifacts, and notes associated with model experiments. It prevents teams from losing the evidence behind a promising result.

## What to track

Track dataset versions, feature pipeline versions, code commit, hyperparameters, random seeds, environment, metrics, plots, model artifacts, and evaluation slices. For generative systems, also track prompts, retrieval configuration, judge versions, and sampled outputs.

## Example

Two training runs differ only in learning rate and input features. Without tracking, the better score is hard to reproduce. With tracking, the team can compare configuration, dataset version, validation split, model artifact, and error analysis side by side.

## Practical workflow

Log every serious run automatically, name experiments by question rather than by timestamp, record failed runs, and connect promoted models to the exact experiment that produced them. Human notes should explain why the run was attempted and what was learned.

## Failure modes

Experiment tracking fails when it stores metrics without data versions, when notebooks contain untracked manual steps, or when teams keep only successful runs and lose negative evidence.
