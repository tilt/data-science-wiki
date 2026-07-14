---
title: Query Rewriting
slug: generative-ai/query-rewriting
description: "Transforming a user request into retrieval queries while preserving intent, scope, and constraints."
area: generative-ai
topics:
  - query-rewriting
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - rag.md
  - retrieval-pipelines.md
  - hybrid-retrieval.md
  - context-construction.md
  - rag-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Query Rewriting

Query rewriting converts a user request into one or more search queries for [retrieval pipelines](retrieval-pipelines.md). It helps [RAG](rag.md) when the user uses pronouns, conversational context, task language, or partial identifiers that differ from source documents.

## Mechanism

A rewrite should preserve answer intent while making retrieval terms explicit. The system can produce lexical queries, dense-search text, filters, date constraints, and permission constraints. [Hybrid retrieval](hybrid-retrieval.md) benefits when rewrites include both exact entities for sparse search and semantic paraphrases for dense retrieval.

The rewrite should be logged beside the original request. If evaluation only sees the final answer, a bad rewrite can masquerade as model hallucination. If [rag evaluation](rag-evaluation.md) sees both, the team can tell whether retrieval failed because the corpus lacked evidence or because the system searched for the wrong thing.

## Concrete artifact

```json
{
  "user_question": "Can I get this approved?",
  "conversation_hint": "700 EUR refund request for enterprise customer",
  "rewritten_queries": [
    "enterprise refund approval threshold 700 EUR",
    "manager approval refund policy enterprise account"
  ],
  "filters": { "document_type": "policy", "policy_version": "2026-07" },
  "must_preserve": ["amount", "customer_type", "approval_action"]
}
```

## Caveats

Bad rewrites can answer a different question. Rewriters often drop negation, dates, jurisdiction, product version, or user role. For high-risk workflows, keep the original query available to the model and cite which retrieved evidence came from which rewritten query.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)
