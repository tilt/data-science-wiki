---
title: Generative AI and Agentic Systems
slug: 11-generative-ai
description: Index and learning map for Generative AI and Agentic Systems.
area: generative-ai
topics:
  - "foundation-models"
  - "stable-diffusion"
  - "generative-adversarial-networks"
  - "language-model-architecture"
  - "tokenization"
  - "pretraining"
  - "llm-training"
  - "instruction-tuning"
  - "alignment"
  - "in-context-learning"
  - "prompting"
  - "sampling-and-decoding"
  - "temperature"
  - "top-k-and-top-p-sampling"
  - "determinism-and-reproducibility"
level: foundational
status: draft
page_type: area-index
aliases:
  - "Generative AI and Agentic Systems"
prerequisites:
  - "06-deep-learning/index.md"
  - "12-information-retrieval-and-search/index.md"
related:
  - "../18-responsible-ai-safety-and-governance/index.md"
  - "../14-ml-engineering-and-mlops/index.md"
historical_context: false
last_reviewed: 2026-07-10
---

# Generative AI and Agentic Systems

## Summary

Generative AI covers models and systems that create text, images, structured outputs, plans, tool calls, or multimodal responses. This section separates model training concepts from application architecture: a language model can be pretrained and aligned, but a useful product still needs retrieval, context construction, tools, evaluation, privacy controls, and serving constraints.

Read the early pages for foundation-model mechanics, then branch based on the system you are building. RAG pages focus on evidence and retrieval, agent pages focus on tool-mediated loops, and safety pages focus on behavior constraints and failure handling.

## System Map

| Goal                                  | Start with                                                                                                                                  | Then read                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Understand model behavior             | [Foundation Models](foundation-models.md), [Language Model Architecture](language-model-architecture.md), [LLM Training](llm-training.md)   | [Instruction Tuning](instruction-tuning.md), [Alignment](alignment.md)                    |
| Control generation                    | [Prompting](prompting.md), [Sampling and Decoding](sampling-and-decoding.md), [Temperature and Determinism](temperature-and-determinism.md) | [Structured Output](structured-output.md), [Guardrails](guardrails.md)                    |
| Build RAG                             | [RAG](rag.md), [Retrieval Pipelines](retrieval-pipelines.md), [Chunking](chunking.md)                                                       | [RAG Evaluation](rag-evaluation.md), [Citations](citations.md)                            |
| Build agents                          | [Agentic Systems](agentic-systems.md), [Tool Use and Function Calling](tool-use-and-function-calling.md), [Agent Loops](agent-loops.md)     | [Agent Evaluation](agent-evaluation.md), [Harnesses](harnesses.md)                        |
| Work with images or multimodal models | [Multimodal Models](multimodal-models.md), [Vision Language Models](vision-language-models.md), [Stable Diffusion](stable-diffusion.md)     | [Generative Adversarial Networks](../06-deep-learning/generative-adversarial-networks.md) |

## Subtopics

- [Foundation Models](foundation-models.md)
- [Language Model Architecture](language-model-architecture.md)
- [Tokenization](tokenization.md)
- [Pretraining](pretraining.md)
- [LLM Training](llm-training.md)
- [Instruction Tuning](instruction-tuning.md)
- [Alignment](alignment.md)
- [In-Context Learning](in-context-learning.md)
- [Prompting](prompting.md)
- [Sampling and Decoding](sampling-and-decoding.md)
- [Top-k and Top-p Sampling](top-k-and-top-p-sampling.md)
- [Temperature and Determinism](temperature-and-determinism.md)
- [Determinism and Reproducibility](determinism-and-reproducibility.md)
- [Structured Output](structured-output.md)
- [Tool Use and Function Calling](tool-use-and-function-calling.md)
- [Agentic Systems](agentic-systems.md)
- [Planning](planning.md)
- [Tool Routing](tool-routing.md)
- [Tool Schemas](tool-schemas.md)
- [Agent Loops](agent-loops.md)
- [Memory](memory.md)
- [Multi Agent Systems](multi-agent-systems.md)
- [Reflection and Reviewer Patterns](reflection-and-reviewer-patterns.md)
- [RAG](rag.md)
- [RAG Architecture Comparison](rag-architecture-comparison.md)
- [Retrieval Pipelines](retrieval-pipelines.md)
- [Chunking](chunking.md)
- [Embeddings](embeddings.md)
- [Vector Databases](vector-databases.md)
- [Hybrid Retrieval](hybrid-retrieval.md)
- [Reranking](reranking.md)
- [Query Rewriting](query-rewriting.md)
- [Context Construction](context-construction.md)
- [Grounding](grounding.md)
- [Citations](citations.md)
- [Hallucination Mitigation](hallucination-mitigation.md)
- [RAG Evaluation](rag-evaluation.md)
- [RAG Benchmark Design](rag-benchmark-design.md)
- [Agent Evaluation](agent-evaluation.md)
- [Harnesses](harnesses.md)
- [LLM-as-Judge](llm-as-judge.md)
- [Fine Tuning Versus RAG](fine-tuning-versus-rag.md)
- [Multimodal Models](multimodal-models.md)
- [Vision Language Models](vision-language-models.md)
- [Stable Diffusion](stable-diffusion.md)
- [Generative Adversarial Networks](../06-deep-learning/generative-adversarial-networks.md)
- [Local Versus Hosted Models](local-versus-hosted-models.md)
- [Model Serving](model-serving.md)
- [Quantization](quantization.md)
- [Guardrails](guardrails.md)
- [Prompt Injection](prompt-injection.md)
- [Data Privacy](data-privacy.md)
- [PII Protection](pii-protection.md)
- [Cost and Latency Optimization](cost-and-latency-optimization.md)

> **Learning path — Generative AI systems:** [path overview](../00-home-and-navigation/learning-paths.md#generative-ai-systems) · [Tool Use and Function Calling](tool-use-and-function-calling.md) →
