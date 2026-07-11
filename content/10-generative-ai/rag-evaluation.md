---
title: RAG Evaluation
slug: generative-ai/rag-evaluation
description: RAG Evaluation overview and practical notes.
area: generative-ai
topics:
  - "rag"
  - "evaluation"
  - "retrieval"
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "nist-ai-rmf-2023"
---
# RAG Evaluation

## Summary

RAG evaluation should separate retrieval quality, context construction, generation quality, citation correctness, and final task utility. A single answer score is not enough because the same bad answer can come from different failures: the retriever missed the source, the context builder dropped it, or the model ignored it.

## Evaluation layers

1. Query understanding: did rewriting, routing, or filtering preserve the user's intent?
2. Retrieval: did the system retrieve the evidence needed to answer?
3. Context construction: did the prompt include the right passages without burying them in noise?
4. Generation: did the model answer correctly, completely, and with appropriate uncertainty?
5. Attribution: do citations support the exact claims being made?
6. Product utility: did the answer help the user complete the task at acceptable cost and latency?

## Metrics

- Retrieval: [recall at k](../11-information-retrieval-and-search/ranking-and-retrieval-metrics.md#recall-at-k), [precision at k](../11-information-retrieval-and-search/ranking-and-retrieval-metrics.md#precision-at-k), [MRR](../11-information-retrieval-and-search/ranking-and-retrieval-metrics.md#mean-reciprocal-rank), [NDCG](../11-information-retrieval-and-search/ranking-and-retrieval-metrics.md#normalized-discounted-cumulative-gain), [source coverage](../11-information-retrieval-and-search/ranking-and-retrieval-metrics.md#source-coverage).
- Generation: groundedness, factuality, completeness, refusal quality, style adherence.
- System: latency, cost, cache hit rate, abstention, error severity, and human acceptance.

## Worked example

For a policy assistant, create a golden set of questions with expected source documents and acceptable answer criteria. First evaluate whether the source appears in the top retrieved passages. Then inspect whether the selected chunks contain the exact relevant paragraph. Finally grade the generated answer for correctness, citation support, and whether it refuses when policy evidence is absent.

## Failure modes

Common failures include missing the right source, retrieving the right source but not placing it in context, ignoring context, citing unsupported text, and answering confidently when evidence is insufficient. Track severe errors separately from minor formatting issues so average quality does not hide risky behavior.

## Related topics

- [RAG](rag.md)
- [Search evaluation](../11-information-retrieval-and-search/search-evaluation.md)
- [Risk-weighted error taxonomies](../16-experimentation-and-evaluation/risk-weighted-error-taxonomies.md)
