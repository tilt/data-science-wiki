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
  - "kv-cache"
  - "instruction-tuning"
  - "alignment"
  - "in-context-learning"
  - "prompting"
  - "sampling-and-decoding"
  - "temperature"
  - "top-k-and-top-p-sampling"
  - "determinism-and-reproducibility"
  - "vllm"
  - "sglang"
  - "langchain"
  - "langgraph"
level: foundational
status: review
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
last_reviewed: 2026-07-17
---

# Generative AI and Agentic Systems

Generative AI covers models and systems that create text, images, structured outputs, plans, tool calls, or multimodal responses. This section separates model-training concepts from application architecture: a language model can be pretrained and aligned, but a useful product still needs retrieval, context construction, tools, evaluation, privacy controls, and serving constraints.

Read the early pages for foundation-model mechanics, then follow the branch for the system you are building — RAG for evidence and retrieval, agents for tool-mediated loops, and the safety pages for behavior constraints.

## Knowledge map

Foundation-model mechanics feed generation control, retrieval, and multimodal generation; retrieval and generation combine into agents; serving and safety wrap everything that ships.

```mermaid
flowchart TD
  FM[Foundation Models and Training] --> Gen[Generation Control]
  FM --> RAG[Retrieval-Augmented Generation]
  Gen --> Agents[Tool Use and Agents]
  RAG --> Agents
  FM --> MM[Multimodal and Image Generation]
  Gen --> Serving[Serving, Cost, Quantization]
  Agents --> Safety[Guardrails, Injection, Privacy]
  RAG --> Safety
```

## Reading path

Read foundation-model mechanics and generation control first, then retrieval, agents, multimodal generation, serving, and safety.

1. [Foundation Models](foundation-models.md): what a large pretrained model is and is not.
2. [Language Model Architecture](language-model-architecture.md): the transformer stack behind LLMs.
3. [KV Cache](kv-cache.md): inference-time attention state for fast decoding and serving capacity.
4. [Tokenization](tokenization.md): the units an LLM reads and generates.
5. [Pretraining](pretraining.md): self-supervised learning on large corpora.
6. [LLM Training](llm-training.md): the full pretraining-to-alignment pipeline.
7. [Instruction Tuning](instruction-tuning.md): teaching a base model to follow instructions.
8. [Alignment](alignment.md): shaping behavior toward helpfulness and safety.
9. [In-Context Learning](in-context-learning.md): adapting from examples in the prompt.
10. [Prompting](prompting.md): structuring inputs to steer generation.
11. [Sampling and Decoding](sampling-and-decoding.md): turning logits into tokens.
12. [Top-k and Top-p Sampling](top-k-and-top-p-sampling.md): truncated sampling rules.
13. [Temperature and Determinism](temperature-and-determinism.md): controlling randomness.
14. [Determinism and Reproducibility](determinism-and-reproducibility.md): making runs repeatable.
15. [Structured Output](structured-output.md): constraining generations to a schema.
16. [RAG](rag.md): grounding generation in retrieved evidence.
17. [Embeddings](embeddings.md): vector representations for retrieval.
18. [Chunking](chunking.md): splitting documents into retrievable units.
19. [Vector Databases](vector-databases.md): storing and searching embeddings.
20. [Retrieval Pipelines](retrieval-pipelines.md): the offline and online retrieval contracts.
21. [Hybrid Retrieval](hybrid-retrieval.md): combining lexical and dense signals.
22. [Query Rewriting](query-rewriting.md): reshaping the query before retrieval.
23. [Reranking](reranking.md): reordering candidates with a stronger model.
24. [Context Construction](context-construction.md): assembling the final prompt context.
25. [Grounding](grounding.md): tying claims to sources.
26. [Citations](citations.md): attributing generated statements to evidence.
27. [Hallucination Mitigation](hallucination-mitigation.md): reducing unsupported output.
28. [RAG Evaluation](rag-evaluation.md): measuring retrieval and answer quality.
29. [RAG Architecture Comparison](rag-architecture-comparison.md): trade-offs across RAG designs.
30. [RAG Benchmark Design](rag-benchmark-design.md): building trustworthy RAG benchmarks.
31. [Fine Tuning Versus RAG](fine-tuning-versus-rag.md): when to train versus retrieve.
32. [Tool Use and Function Calling](tool-use-and-function-calling.md): the model's action layer.
33. [Tool Schemas](tool-schemas.md): declaring callable tools.
34. [Tool Routing](tool-routing.md): choosing which tool to call.
35. [Agent Loops](agent-loops.md): the observe-decide-act cycle.
36. [Agentic Systems](agentic-systems.md): systems that plan and act over many steps.
37. [Planning](planning.md): decomposing goals into steps.
38. [Memory](memory.md): persisting state across steps and sessions.
39. [Reflection and Reviewer Patterns](reflection-and-reviewer-patterns.md): self-critique against a rubric.
40. [Multi-Agent Systems](multi-agent-systems.md): coordinating multiple roles.
41. [Harnesses](harnesses.md): the runtime scaffolding around a model.
42. [LangChain](langchain.md): a configurable framework for models, tools, middleware, retrieval, and agent loops.
43. [LangGraph](langgraph.md): graph orchestration for durable, stateful, long-running agents.
44. [Agent Evaluation](agent-evaluation.md): measuring multi-step task success.
45. [LLM-as-Judge](llm-as-judge.md): using models to score outputs.
46. [Multimodal Models](multimodal-models.md): models over text, image, and more.
47. [Vision-Language Models](vision-language-models.md): joint image-text models.
48. [Stable Diffusion](stable-diffusion.md): latent-diffusion image generation.
49. [Local Versus Hosted Models](local-versus-hosted-models.md): where the model runs.
50. [Model Serving](model-serving.md): the runtime layer for reliable calls.
51. [vLLM](vllm.md): a high-throughput serving engine for self-hosted open models.
52. [SGLang](sglang.md): a high-performance runtime for self-hosted structured generation and multimodal serving.
53. [Quantization](quantization.md): lower-precision weights for cheaper serving.
54. [Cost and Latency Optimization](cost-and-latency-optimization.md): making systems affordable and fast.
55. [Guardrails](guardrails.md): runtime behavior constraints.
56. [Prompt Injection](prompt-injection.md): the core adversarial-input risk.
57. [Data Privacy](data-privacy.md): protecting user and training data.
58. [PII Protection](pii-protection.md): detecting and redacting personal information.

## Connections

- [Deep Learning](../06-deep-learning/index.md) and [Natural Language Processing](../08-natural-language-processing/index.md) supply the architectures and language tasks underneath.
- [Information Retrieval](../12-information-retrieval-and-search/index.md) provides the retrieval half of RAG, and [Responsible AI](../18-responsible-ai-safety-and-governance/index.md) governs deployed behavior.

> [!nav]
> **Learning path** — [Generative AI systems](../00-home-and-navigation/learning-paths.md#generative-ai-systems)
>
> [Foundation Models →](foundation-models.md)
