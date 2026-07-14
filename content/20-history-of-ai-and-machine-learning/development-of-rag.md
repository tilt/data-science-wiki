---
title: Development of RAG
slug: history-of-ai-and-machine-learning/development-of-rag
description: "How sparse retrieval, dense passage retrieval, and retrieval-augmented generation converged into grounded LLM systems."
area: history-of-ai-and-machine-learning
topics:
  - development-of-rag
level: foundational
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - ../11-generative-ai/rag.md
  - ../11-generative-ai/retrieval-pipelines.md
  - ../11-generative-ai/context-construction.md
  - ../12-information-retrieval-and-search/bm25.md
  - ../12-information-retrieval-and-search/dense-retrieval.md
  - ../12-information-retrieval-and-search/hybrid-search.md
historical_context: true
last_reviewed: 2026-07-11
---

# Development of RAG

Retrieval-augmented generation did not appear as a chatbot trick. It joined an older [information retrieval](../12-information-retrieval-and-search/bm25.md) tradition with neural language generation so that a model could answer from an updateable corpus instead of only from parametric memory.

## Verified chronology

| Year        | Milestone                                                                                                     | Why it followed                                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1970s-2000s | Sparse retrieval systems matured around inverted indexes, TF-IDF, and later BM25-style ranking.               | Search could find documents reliably, but it returned evidence rather than synthesized answers.                                                                                  |
| 2020        | Guu, Lee, Tung, Pasupat, and Chang introduced REALM, a retrieval-augmented language-model pretraining method. | It attacked the problem that factual knowledge stored only in parameters is hard to inspect or update.                                                                           |
| 2020        | Karpukhin and coauthors introduced Dense Passage Retrieval (DPR) for open-domain question answering.          | Learned dual encoders made [dense retrieval](../12-information-retrieval-and-search/dense-retrieval.md) competitive with strong sparse baselines for question-passage matching.  |
| 2020        | Lewis and coauthors introduced Retrieval-Augmented Generation (RAG) for knowledge-intensive NLP tasks.        | A seq2seq generator could condition on retrieved Wikipedia passages, combining parametric generation with non-parametric memory.                                                 |
| 2020s       | Production RAG systems added chunking, reranking, query rewriting, citations, and evaluation.                 | The research model became a [retrieval pipeline](../11-generative-ai/retrieval-pipelines.md) problem: retrieve the right context, fit it into the prompt, and verify the answer. |

## Historical mechanism

The causal thread is simple: language models became fluent before they became reliable knowledge systems. A parametric model can compress facts, but updating one fact usually means retraining or fine-tuning a large model. A retrieval index can be refreshed, filtered, audited, and access-controlled. RAG connected those strengths: retrieve candidate passages, construct context, then generate an answer grounded in that evidence.

That made [context construction](../11-generative-ai/context-construction.md) a first-class design problem. Sparse retrieval still matters for exact names, identifiers, and rare terms; dense retrieval helps when the query and document use different words; [hybrid search](../12-information-retrieval-and-search/hybrid-search.md) combines both. The generator is downstream of all of those choices, so a fluent answer can still be wrong if the retriever misses, the chunk boundary hides the evidence, or the prompt fails to require citations.

The historical lesson is that RAG shifted part of model quality into corpus engineering. It made knowledge more governable, but it did not eliminate hallucination; it made the system's evidence path visible enough to test.

## References

- [Guu et al., 2020, REALM: Retrieval-Augmented Language Model Pre-Training](https://arxiv.org/abs/2002.08909)
- [Karpukhin et al., 2020, Dense Passage Retrieval for Open-Domain Question Answering](https://arxiv.org/abs/2004.04906)
- [Lewis et al., 2020, Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
