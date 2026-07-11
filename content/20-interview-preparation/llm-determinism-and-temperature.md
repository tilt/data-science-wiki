---
title: Are LLMs deterministic, and how does temperature work?
slug: interview-preparation/llm-determinism-and-temperature
description: Interview prompt that links to the canonical temperature and determinism topic page.
area: interview-preparation
topics:
  - "interview-question"
  - "generative-ai"
  - "temperature"
level: intermediate
status: review
page_type: interview-question
aliases:
  - "Temperature zero determinism"
  - "LLM deterministic output"
prerequisites:
  - "../10-generative-ai/temperature-and-determinism.md"
related:
  - "../10-generative-ai/temperature-and-determinism.md"
historical_context: false
last_reviewed: 2026-07-11
---
# Are LLMs deterministic, and how does temperature work?

## Answer

Temperature rescales logits before sampling. Lower temperature sharpens the distribution and approaches greedy decoding, but hosted APIs can still vary because of model-version changes, serving infrastructure, numerical nondeterminism, seeds, and post-processing.

## What a strong answer adds

1. The model produces logits for possible next tokens.
2. Temperature divides those logits before they are converted to probabilities.
3. Low temperature concentrates probability on the highest-scoring tokens.
4. High temperature spreads probability across more alternatives.
5. Decoding then samples or chooses tokens according to the configured strategy.

Temperature controls sampling randomness, not every source of system nondeterminism. Even at a low temperature, outputs can change if the provider updates the model, batching changes floating-point behavior, retrieval context changes, or the application post-processes responses differently.

## Prototype answer

Start with: "Temperature changes the token distribution." Then add: "Temperature zero is closer to greedy decoding, but not a contractual guarantee of identical outputs in every hosted system." Finish with production practice: "For reproducibility, log model version, prompt, tools, retrieval context, decoding parameters, seed if supported, and output validation results."

## Common follow-ups

- Use lower temperature for extraction, classification, and tool calls.
- Use higher temperature for brainstorming or creative drafting.
- Use schema validation and golden tests when correctness matters more than variation.

## Canonical concept

Read the topic page: [Temperature and Determinism](../10-generative-ai/temperature-and-determinism.md).
