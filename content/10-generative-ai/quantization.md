---
title: Quantization
slug: generative-ai/quantization
description: Concise guide to Quantization in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - quantization
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Quantization

## Summary

Quantization reduces model memory and compute by representing weights or activations with lower-precision numbers. It trades precision for size, speed, or hardware fit.

## Mechanism

A simple uniform quantizer maps a floating-point value $x$ to an integer value $q$ with scale $s$ and zero point $z$:

$$
q = \operatorname{round}\left(\frac{x}{s}\right) + z.
$$

Approximate dequantization recovers

$$
\hat{x}=s(q-z).
$$

Lower bit width reduces memory and bandwidth, but the approximation error can change logits, attention behavior, tool-call formatting, and rare-token behavior. Weight-only quantization, activation quantization, post-training quantization, and quantization-aware training have different quality and deployment tradeoffs.

## Step-by-step example

A team serving a local assistant tests a 4-bit model because the full model exceeds GPU memory, then compares quality and structured-output validity on the same golden set.

## Common failure modes

- Benchmarking only average chat quality and missing degradation in structured output, long-context retrieval, code, or minority languages.
- Assuming lower bit width always improves latency; some hardware and kernels are bandwidth-, memory-, or batching-limited.
- Quantizing without a rollback path to the original model and without task-specific regression tests.
