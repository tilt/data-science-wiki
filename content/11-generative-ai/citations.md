---
title: Citations
slug: generative-ai/citations
description: "Links from generated claims to the exact retrieved evidence that supports them."
area: generative-ai
topics:
  - citations
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - grounding.md
  - rag.md
  - rag-evaluation.md
  - context-construction.md
  - hallucination-mitigation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Citations

Citations are evidence pointers, not decorations. A cited source must support the specific claim made by the answer. They are strongest when [grounding](grounding.md), [context construction](context-construction.md), and [RAG evaluation](rag-evaluation.md) all operate on stable passage IDs.

## Mechanism

A citation contract can require each factual claim to carry `{claim, source_id, span}`. A validator then checks that the source was retrieved, the span exists, and the claim is semantically supported. [Hallucination mitigation](hallucination-mitigation.md) should treat uncited factual claims as defects, not as style issues.

## Worked support check

| Generated claim                             | Cited passage                                    | Verdict          | Reason                                                                   |
| ------------------------------------------- | ------------------------------------------------ | ---------------- | ------------------------------------------------------------------------ |
| Manager approval is required above 500 EUR. | Manager approval is required above 500 EUR.      | Supported        | The threshold, actor, and requirement match.                             |
| Standard shipping is two days.              | Standard shipping is five days.                  | Contradicted     | The citation is about the right topic but gives a different duration.    |
| Premium members always receive refunds.     | Premium members may request refund review.       | Not supported    | The claim is stronger than the passage.                                  |
| The policy changed in 2026.                 | No retrieved span mentions a policy-change date. | Missing evidence | A citation cannot support a fact that is absent from the retrieved text. |

Lexical overlap would score the shipping example highly because both strings share "standard shipping" and "days." Citation support is stricter: the cited span must entail the generated claim at the right granularity.

## Citation Contract

```json
{
  "claim": "Manager approval is required above 500 EUR.",
  "source_id": "policy-7",
  "span": "Manager approval is required above 500 EUR.",
  "support": "supported"
}
```

The contract should travel with the answer so [RAG evaluation](rag-evaluation.md) can audit [source coverage](rag-evaluation.md), unsupported claims, and stale references.

## Caveats

Page-level links are too coarse for dense manuals. Citations can also be copied from retrieved context even when the generated sentence says something stronger than the passage.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

> **Section — [Generative AI and Agentic Systems](index.md):** ← [Grounding](grounding.md) · [Hallucination Mitigation](hallucination-mitigation.md) →
