---
title: Python
slug: software-engineering/python
description: Concise guide to Python in Software Engineering.
area: software-engineering
topics:
  - python
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

Python is the dominant language for data science and ML because its ecosystem connects numerical computing, modelling, orchestration, and service development. Production Python needs more discipline than exploratory notebooks: clear packaging, typing, tests, and dependency control.

## Core practices

Use virtual environments, lock dependencies, keep notebooks out of core library code, and make data transformations testable as functions. Type hints are especially useful at service boundaries, configuration objects, dataset records, and model inputs. They do not prove numerical correctness, but they catch many integration mistakes.

A maintainable Python ML project usually separates:

- library code for reusable transformations and model logic;
- scripts or CLIs for training, evaluation, and backfills;
- configuration for paths, feature flags, and hyperparameters;
- tests for deterministic logic and representative data fixtures;
- notebooks for exploration and communication only.

## Example

A feature calculation first appears in a notebook. Before production use, move it into a module, add tests for nulls and edge cases, expose it through a pipeline step, and keep the notebook as an experiment report that imports the library function.

## Failure modes

Common Python failures include hidden global state, unpinned dependencies, circular imports, mutable default arguments, and code paths that depend on the current working directory. In ML projects, also watch for silent dtype changes and train-serving skew.
