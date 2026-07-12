---
title: RAG Benchmark Design
slug: generative-ai/rag-benchmark-design
description: "A methodology for benchmarking RAG systems: labelled question items, retrieval and answer metrics, trace auditing, and a fair architecture comparison procedure."
area: generative-ai
topics:
  - rag
  - rag-evaluation
  - benchmark-design
level: intermediate
status: review
page_type: system-design
aliases:
  - RAG benchmarking
prerequisites:
  - index.md
  - rag.md
related:
  - rag-evaluation.md
  - rag-architecture-comparison.md
  - citations.md
  - grounding.md
  - ../11-information-retrieval-and-search/search-evaluation.md
  - ../11-information-retrieval-and-search/ranking-and-retrieval-metrics.md
  - ../16-experimentation-and-evaluation/golden-datasets.md
  - ../16-experimentation-and-evaluation/llm-as-judge.md
historical_context: false
last_reviewed: 2026-07-12
---
# RAG Benchmark Design

A RAG benchmark is a collection of representative questions with expected evidence and answer characteristics, used to compare systems on the same footing. It generalizes a [golden dataset](../16-experimentation-and-evaluation/golden-datasets.md) to the RAG setting by labelling *both* the evidence a system should retrieve and the facts its answer should contain. Without labelled evidence, retrieval failures and generation failures are indistinguishable.

## Benchmark item schema

Each item pins down the question, the evidence that should support it, and what a correct answer looks like. Source identifiers are opaque handles into the indexed corpus, not document contents.

```yaml
- id: q001
  question: "What is the configured limit for parameter X?"
  expected_sources:      # evidence handles that should be retrieved
    - source_a
    - source_b
  expected_facts:        # atomic claims a correct answer must contain
    - "limit is 100"
    - "applies per request"
  unsupported: false     # true when the corpus should NOT be able to answer
  category: configuration
  difficulty: easy
  retrieval_type: mixed  # lexical | semantic | mixed
```

Include `unsupported: true` items on purpose: a system that answers a question the corpus cannot support is failing even if the text sounds fluent, and abstention is the correct behaviour.

## What is evaluated

Good evaluation covers retrieval and answer quality separately, plus the trace and the operational envelope.

| Group | Metrics |
| --- | --- |
| Retrieval | expected sources in top-k; rank of first expected source; source recall@k; evidence precision when labelled; whether retrieved evidence is sufficient for synthesis |
| Answer | expected facts present; unsupported claims absent; citations present; citations correspond to retrieved evidence; abstains when evidence is missing; language and format compliance |
| Trace / audit | tool calls captured; retrieved chunks captured; final answer linked to evidence; duplicate or repeated searches avoided; context expansions recorded |
| Operational | latency; number of model calls; number of retrieval calls; index build time; storage size; embedding-model dependency; failure modes |

Retrieval and answer metrics are complementary: source recall@k explains *whether the evidence was available*, while the answer metrics explain *whether the model used it faithfully*. Citation-correspondence and [grounding](grounding.md) checks connect the two — a fact should trace to a retrieved source, verified against the labelled evidence rather than judged on tone. Where a rubric judgment is needed, an [LLM-as-judge](../16-experimentation-and-evaluation/llm-as-judge.md) can score fact presence, but it should compare against the labelled `expected_facts`, not grade freely.

## Comparison procedure

To compare architectures such as those in [RAG architecture comparison](rag-architecture-comparison.md) fairly, hold the benchmark fixed and vary only the system:

1. Run the same benchmark questions against each architecture.
2. Record retrieved evidence, tool traces, and final answers for every item.
3. Score retrieval against the expected sources.
4. Score answers against expected facts and unsupported-claim checks.
5. Compare traces for auditability and wasted work.
6. Compare operational behaviour — runtime, setup complexity, and model dependencies.
7. Summarize the trade-offs per architecture.

Because retrieval labels are shared, a retrieval regression on one architecture is directly comparable to another, which is what makes the ranking in the architecture comparison an empirical result rather than an assertion.

## Caveats

A benchmark is only as representative as its question mix: skewing toward exact-identifier questions flatters lexical retrieval, and skewing toward paraphrase flatters dense retrieval, so category and `retrieval_type` balance matter as much as raw item count. Labelled `expected_sources` also drift as the corpus changes — treat the benchmark as versioned data with the same refresh discipline as the index it evaluates, and see [search evaluation](../11-information-retrieval-and-search/search-evaluation.md) for slice-level reporting that keeps aggregate scores from hiding per-category regressions.

## References

- [Es et al., 2023, RAGAS: Automated Evaluation of Retrieval Augmented Generation](https://arxiv.org/abs/2309.15217)
- [Chen et al., 2023, Benchmarking Large Language Models in Retrieval-Augmented Generation](https://arxiv.org/abs/2309.01431)
- [Manning, Raghavan, and Schütze, Introduction to Information Retrieval: Evaluation in information retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html)
