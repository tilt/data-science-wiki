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
  - "../11-generative-ai/temperature-and-determinism.md"
related:
  - "../11-generative-ai/temperature-and-determinism.md"
  - "../11-generative-ai/sampling-and-decoding.md"
  - "../11-generative-ai/top-k-and-top-p-sampling.md"
  - "../11-generative-ai/determinism-and-reproducibility.md"
  - "../11-generative-ai/structured-output.md"
  - how-model-knows-which-tool-to-use.md
  - generative-ai.md
historical_context: false
last_reviewed: 2026-07-11
---
# Are LLMs deterministic, and how does temperature work?

## Answer

Temperature rescales next-token logits before sampling. Lower temperature sharpens the distribution and moves decoding toward greedy choices; higher temperature spreads probability mass across more alternatives. Temperature controls sampling randomness, but hosted LLM applications can still change because retrieval, tools, model versions, seeds, batching, validators, or post-processing changed.

## What a strong answer adds

1. The model produces logits, not final words. [Sampling and decoding](../11-generative-ai/sampling-and-decoding.md) convert those logits into tokens.
2. The canonical formula is $p_i(T)=\exp(z_i/T)/\sum_j \exp(z_j/T)$, where $z_i$ is a token logit and $T$ is temperature.
3. Low temperature is appropriate for extraction, classification, and [tool-use](how-model-knows-which-tool-to-use.md) style calls where variation is a liability.
4. High temperature can help brainstorming, but it also increases the chance of unsupported or poorly formatted output.
5. Reproducibility requires a run trace: model identifier, prompt, retrieved documents, tool schemas, tool outputs, decoding settings, seed if available, validators, and output.

## Interview artifact

Use this compact contrast in a spoken answer: "If the top token logit is only slightly higher than the next token, temperature can decide whether the model almost always takes the top token or samples from several plausible continuations. But if my RAG index changes between runs, a fixed temperature does not save reproducibility." That links temperature to [determinism and reproducibility](../11-generative-ai/determinism-and-reproducibility.md) rather than treating it as a magic switch.

## Common follow-ups

- **"Is temperature 0 guaranteed deterministic?"** No. It is close to greedy decoding, but provider infrastructure, floating-point behavior, model updates, retrieval, and application code can still change outputs.
- **"How do top-p and top-k relate?"** [Top-k and top-p sampling](../11-generative-ai/top-k-and-top-p-sampling.md) truncate the candidate set; temperature changes the shape of the probabilities before or around that sampling step.
- **"What would you do in production?"** Use low temperature, [structured output](../11-generative-ai/structured-output.md), schema validation, golden tests, and full trace logging.

## Canonical links

Read [Temperature and Determinism](../11-generative-ai/temperature-and-determinism.md) for the formula and toy output, [Sampling and Decoding](../11-generative-ai/sampling-and-decoding.md) for the larger decoding family, and [Generative AI](generative-ai.md) for the interview map.

## References

- [OpenAI API documentation: Text generation](https://developers.openai.com/api/docs/guides/text)
- [Holtzman et al., 2020, The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)
