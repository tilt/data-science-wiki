---
title: Prototype Answers
slug: interview-preparation/prototype-answers
description: Index of interview prototype answers with links back to canonical wiki pages.
area: interview-preparation
topics:
  - prototype-answers
  - interview-question
  - answer-patterns
level: foundational
status: review
page_type: topic-index
aliases:
  - Interview answer bank
  - Prototype interview answers
prerequisites:
  - answer-patterns.md
related:
  - answer-patterns.md
  - interview-examples.md
  - svd-versus-matrix-factorization.md
  - sparse-utility-matrix-and-ordinary-svd.md
  - how-model-knows-which-tool-to-use.md
  - llm-determinism-and-temperature.md
  - evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Prototype Answers

## Map answer

Prototype answers are interview-facing drafts, not canonical concept pages. Each entry should open with the shortest correct answer, add the strong-answer details, include a concrete artifact or scenario, and then point to the canonical wiki page for depth.

## Answer bank

| Interview prompt | Concise answer anchor | Canonical wiki page |
| --- | --- | --- |
| [How does singular value decomposition differ from matrix factorization?](svd-versus-matrix-factorization.md) | SVD decomposes a complete matrix; recommender factorization learns factors from sparse observed or weighted interactions. | [SVD versus Matrix Factorization](../04-recommendation-systems/svd-versus-matrix-factorization.md) |
| [Why does ordinary SVD not directly work well on a sparse utility matrix?](sparse-utility-matrix-and-ordinary-svd.md) | Missing recommender cells usually mean unknown or unexposed, not zero preference. | [Sparse Utility Matrices and Ordinary SVD](../04-recommendation-systems/sparse-utility-matrices-and-svd.md) |
| [How does a model know which tool to use?](how-model-knows-which-tool-to-use.md) | The model sees tool schemas and predicts a structured call; the application validates and executes it. | [Tool Use and Function Calling](../10-generative-ai/tool-use-and-function-calling.md) |
| [How can generative-AI outputs be compared with classical ML outputs?](compare-generative-ai-and-classical-ml-outputs.md) | Compare by workflow decision and risk, then add generative-specific groundedness and schema checks. | [Comparing Generative AI and Classical ML Systems](../16-experimentation-and-evaluation/comparing-generative-ai-and-classical-ml-systems.md) |
| [Are LLMs deterministic, and how does temperature work?](llm-determinism-and-temperature.md) | Temperature changes next-token sampling entropy; reproducibility also depends on model, context, tools, and traces. | [Temperature and Determinism](../10-generative-ai/temperature-and-determinism.md) |
| [How does V-JEPA 2 differ from a vision-language model?](v-jepa-2-versus-vision-language-model.md) | V-JEPA 2 learns predictive video latents; a VLM aligns visual inputs with language outputs. | [V-JEPA 2 versus Vision-Language Models](../09-video-understanding/v-jepa-2-versus-vision-language-models.md) |
| [What motivates JEPA and world models?](lecun-jepa-world-models-motivation.md) | The motivation is compact predictive representation for future state, action, and planning. | [World Models and JEPA](../09-video-understanding/world-models-and-jepa.md) |

## Maintenance rule

If the page teaches a concept, keep it in the canonical subject area. If it teaches how to answer a prompt, keep it here and link back. When a prototype answer repeats a technical claim, check it against the canonical page and add a note to [Knowledge Gaps](knowledge-gaps.md) if the concept page is missing the detail.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

> **Learning path — Interview preparation:** ← [Answer Patterns](answer-patterns.md) · [path overview](../00-home-and-navigation/learning-paths.md#interview-preparation) · [Interview Examples](interview-examples.md) →
