---
title: World Models and JEPA
slug: video-understanding/world-models-and-jepa
description: World Models and JEPA overview and practical notes.
area: video-understanding
topics:
  - "world-models"
  - "jepa"
  - "self-supervised-learning"
level: intermediate
status: draft
page_type: concept
aliases: []
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "lecun-2022-autonomous-machine-intelligence"
  - "dawid-lecun-2023-lvebm"
  - "assran-2025-vjepa2"
---
# World Models and JEPA

## Summary

A world model learns representations that support prediction of future or missing states. In JEPA-style systems, prediction occurs in representation space rather than by reconstructing every pixel or token.

## LeCun's stated motivation

LeCun argues that intelligence requires learning abstract world representations, predicting consequences, planning actions, and handling uncertainty. His critique of pure autoregressive token prediction is that it learns to imitate sequences rather than directly learning a compact model of the physical world.

## Predicting in representation space

JEPA-style systems avoid reconstructing every pixel or token. They learn an encoder that maps inputs into latent representations and train a predictor to estimate missing or future representations. The intended benefit is to focus on semantically meaningful structure while ignoring unpredictable low-level detail.

## Handling uncertainty

Raw-pixel prediction can be inefficient because many futures are plausible. A representation-space objective can avoid modelling every irrelevant detail, but it must still represent uncertainty well enough for planning and action.

## Perception, prediction, reasoning, and planning

LeCun's broader architecture separates several roles:

- perception builds representations from sensory input,
- prediction estimates future or missing state,
- cost modules represent goals or constraints,
- reasoning searches over possible latent states,
- planning chooses actions.

This separation is a research program, not a solved engineering recipe.

## Open questions

It remains unsettled how far representation-space prediction can scale, how to evaluate world models reliably, how to handle multimodal uncertainty, and how to connect perception to robust planning and action.

## Major criticisms and alternatives

Alternative viewpoints argue that autoregressive language models already learn useful abstractions, that generative video models may support simulation, or that hybrid systems combining LLMs, retrieval, model predictive control, and learned perception may be more practical than a pure JEPA-style route.

The author assessment in this wiki: JEPA and world models are important research directions, but current evidence does not yet establish them as a complete replacement for language-model-centric or hybrid AI systems.

## References

- Primary: Yann LeCun. A Path Towards Autonomous Machine Intelligence, version 0.9.2, 2022.
- Primary: Dawid and LeCun. Introduction to Latent Variable Energy-Based Models: A Path Towards Autonomous Machine Intelligence. arXiv:2306.02572, 2023.
