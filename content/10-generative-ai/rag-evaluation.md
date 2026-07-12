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

Useful retrieval metrics include context recall, precision@k, nDCG, and filter correctness. Useful generation metrics include answer support, citation precision, citation coverage, abstention quality, and task success. [LLM-as-judge](llm-as-judge.md) can grade semantic support, but source IDs, retrieved chunk membership, and citation presence should be deterministic checks.

The evaluation set should include answerable questions, unanswerable questions, stale-source cases, conflicting-source cases, and adversarial retrieved text. Without those slices, a RAG system can look strong by answering easy questions while failing the exact cases that retrieval was meant to solve.

## Executed artifact

```python
gold = {"leave-eligibility", "manager-approval"}
retrieved = ["leave-eligibility", "parking", "manager-approval"]
cited = {"leave-eligibility"}
answer_claims = 3
supported_claims = 2

print("RAG_EVAL")
print("context_recall", len(gold & set(retrieved)) / len(gold))
print("citation_precision", len(cited & gold) / len(cited))
print("claim_support_rate", supported_claims / answer_claims)
```

Observed output:

```text
RAG_EVAL
context_recall 1.0
citation_precision 1.0
claim_support_rate 0.6666666666666666
```

The retriever found both gold chunks and the citation points to a gold source, but only two of three answer claims were supported.

## Caveats

A single aggregate score hides the failing stage. Keep per-stage traces from [retrieval pipelines](retrieval-pipelines.md), and report metrics by query type, source freshness, permission scope, and answerability.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)
- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
