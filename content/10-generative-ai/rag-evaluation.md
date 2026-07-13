---
title: RAG Evaluation
slug: generative-ai/rag-evaluation
description: "Measuring retrieval, context use, answer support, citation quality, and abstention in RAG systems."
area: generative-ai
topics:
  - rag-evaluation
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - rag.md
  - retrieval-pipelines.md
  - citations.md
  - grounding.md
  - llm-as-judge.md
  - rag-benchmark-design.md
historical_context: false
last_reviewed: 2026-07-11
---
# RAG Evaluation

RAG evaluation separates retrieval quality from generation quality. A good final answer can hide weak retrieval, and a bad answer can occur despite perfect retrieved evidence. Evaluate [retrieval pipelines](retrieval-pipelines.md), [grounding](grounding.md), [citations](citations.md), and abstention separately.

## Mechanism

Useful retrieval metrics include context recall, precision@k, [nDCG](../11-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md), and filter correctness. Useful generation metrics include answer support, citation precision, citation coverage, abstention quality, and task success. [LLM-as-judge](llm-as-judge.md) can grade semantic support, but source IDs, retrieved chunk membership, and citation presence should be deterministic checks.

| Metric | Definition |
| ------ | ---------- |
| Context recall | Fraction of labelled evidence sources or chunks recovered into the retrieval context. |
| Citation precision | Fraction of cited sources that actually support the cited claim or belong to the expected evidence set. |
| Citation coverage | Fraction of answer claims or required facts that carry a citation. |
| Answer support | Whether generated claims are entailed by, or at least directly backed by, retrieved evidence. |
| Claim support rate | Fraction of checked claims that are supported by the retrieved evidence. |
| Abstention quality | Whether the system refuses answerless or unsafe cases while still answering supported cases. |
| Task success | Whether the final answer satisfies the benchmark's task-specific acceptance criteria. |

With expected evidence $E$, retrieved context $C$, cited claims $Q_c$, and all checked claims $Q$, common deterministic summaries are:

$$
\operatorname{context\ recall}=\frac{|E\cap C|}{|E|},\quad
\operatorname{citation\ precision}=\frac{\#\text{ supported citations}}{\#\text{ citations}},
$$

$$
\operatorname{citation\ coverage}=\frac{|Q_c|}{|Q|},\quad
\operatorname{claim\ support\ rate}=\frac{\#\text{ supported claims}}{|Q|}.
$$

Abstention quality and task success are usually binary or rubric scores defined per benchmark item, then averaged across items.

The evaluation set should include answerable questions, unanswerable questions, stale-source cases, conflicting-source cases, and adversarial retrieved text. Without those slices, a RAG system can look strong by answering easy questions while failing the exact cases that retrieval was meant to solve.

## Worked evaluation table

Suppose the gold evidence set is `{leave-eligibility, manager-approval}`. The retriever returns `leave-eligibility`, `parking`, and `manager-approval`, and the answer cites only `leave-eligibility`.

| Check | Calculation | Result |
| --- | --- | ---: |
| Context recall | $2/2$ gold chunks retrieved | 1.0 |
| Citation precision | $1/1$ cited sources are gold evidence | 1.0 |
| Claim support rate | $2/3$ answer claims supported | 0.667 |

The retriever found both gold chunks and the citation points to a gold source, but only two of three answer claims were supported.

## Caveats

A single aggregate score hides the failing stage. Keep per-stage traces from [retrieval pipelines](retrieval-pipelines.md), and report metrics by query type, source freshness, permission scope, and answerability.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)
- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

> **Learning path — Generative AI systems:** ← [Tool Use and Function Calling](tool-use-and-function-calling.md) · [path overview](../00-home-and-navigation/learning-paths.md#generative-ai-systems) · [Responsible AI](../17-responsible-ai-safety-and-governance/index.md) →
