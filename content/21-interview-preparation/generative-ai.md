---
title: Generative AI
slug: interview-preparation/generative-ai
description: Interview map for generative-AI prompts, system-design questions, and evaluation tradeoffs.
area: interview-preparation
topics:
  - generative-ai
  - interview-question-map
level: foundational
status: review
page_type: topic-index
aliases: []
prerequisites:
  - index.md
related:
  - how-model-knows-which-tool-to-use.md
  - llm-determinism-and-temperature.md
  - compare-generative-ai-and-classical-ml-outputs.md
  - "../11-generative-ai/rag.md"
  - "../11-generative-ai/structured-output.md"
  - "../11-generative-ai/tool-routing.md"
  - "../11-generative-ai/hallucination-mitigation.md"
  - evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Generative AI

## Map answer

For interview purposes, define generative AI as systems that produce open-ended text, code, images, structured objects, plans, or tool calls. A strong answer separates the model from the product system: prompting, [RAG](../11-generative-ai/rag.md), [structured output](../11-generative-ai/structured-output.md), tools, safety controls, latency, cost, and evaluation are all part of the answer.

## Question map

| Prompt type | Strong answer should mention | Canonical page |
| --- | --- | --- |
| "Design a document assistant." | Ingestion, chunking, retrieval, context packing, citation validation, abstention, and rollback. | [RAG](../11-generative-ai/rag.md) |
| "How do models call tools?" | Tool schemas, routing, validation, authorization, execution, retries, and audit logs. | [Tool Use and Function Calling](../11-generative-ai/tool-use-and-function-calling.md) |
| "How do you make output machine-readable?" | JSON schema, constrained generation, parsing, validation, and semantic checks. | [Structured Output](../11-generative-ai/structured-output.md) |
| "Why did the answer hallucinate?" | Missing evidence, weak grounding, stale retrieval, unsupported claims, and citation checks. | [Hallucination Mitigation](../11-generative-ai/hallucination-mitigation.md) |
| "Are LLM outputs reproducible?" | Decoding settings, temperature, model versions, retrieval state, tool outputs, and traces. | [Temperature and Determinism](../11-generative-ai/temperature-and-determinism.md) |

## Interview artifact

For a support assistant, answer with a logged pipeline, not "use an LLM": user question -> query rewrite -> retrieved policy chunks -> context construction -> answer with citations -> schema validator -> refusal or escalation if evidence is insufficient. That artifact connects to the tool-use prompt [How does a model know which tool to use?](how-model-knows-which-tool-to-use.md), the decoding prompt [Are LLMs deterministic?](llm-determinism-and-temperature.md), and the comparison prompt [How can generative-AI outputs be compared with classical ML outputs?](compare-generative-ai-and-classical-ml-outputs.md).

## Common follow-ups

- **Baseline:** compare against search, rules, templates, a classifier, or a human workflow before claiming an LLM is necessary.
- **Evaluation:** break failures into retrieval, grounding, answer quality, citation correctness, schema validity, tool-call safety, and user outcome.
- **Operations:** log prompts, retrieved IDs, tool schemas, model version, decoding settings, latency, cost, refusal rate, and severe incidents.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OpenAI API documentation: Structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI API documentation: Function calling](https://developers.openai.com/api/docs/guides/function-calling)

> **Learning path — Interview preparation:** ← [Recommendation Systems](recommendation-systems.md) · [path overview](../00-home-and-navigation/learning-paths.md#interview-preparation) · [Evaluation](evaluation.md) →
