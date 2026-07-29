---
title: Citations
slug: generative-ai/citations
description: "Links from generated claims to the exact retrieved evidence that supports them."
area: generative-ai
topics:
  - citations
level: intermediate
status: complete
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
  - retrieval-pipelines.md
historical_context: false
last_reviewed: 2026-07-29
---

# Citations

Citations are evidence pointers, not decorations. A cited source must support the specific claim made by the answer. They are strongest when [grounding](grounding.md), [context construction](context-construction.md), and [RAG evaluation](rag-evaluation.md) all operate on stable passage IDs.

A good citation lets a reader or validator answer: "Which exact source span supports this exact claim, and was that span available to the model?"

## What a citation must prove

A citation contract can require each factual claim to carry `{claim, source_id, span}`. A validator then checks that the source was retrieved, the span exists, and the claim is semantically supported. [Hallucination mitigation](hallucination-mitigation.md) should treat uncited factual claims as defects, not as style issues.

Citation granularity matters. Page-level links are acceptable for broad reading recommendations, but not for dense manuals, policies, medical guidance, or contract extraction. In those settings, the citation should point to a chunk, paragraph, table row, or bounding box.

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

## Citation design

| Design choice   | Stronger pattern                                                               |
| --------------- | ------------------------------------------------------------------------------ |
| Source ID       | stable document ID plus version, not a transient URL alone.                    |
| Location        | paragraph, chunk, page, table row, or character span.                          |
| Claim mapping   | citation attached to each factual claim, not only at the end of a paragraph.   |
| Source metadata | retrieval timestamp, document version, jurisdiction, tenant, or validity date. |
| Validation      | check that cited sources were actually retrieved and packed into context.      |

## Realistic citation failure

Generated answer:

```text
Finance approval is required above 700 EUR. [policy-7]
```

Source span:

```text
Manager approval is required above 500 EUR. Finance approval is required above 5000 EUR.
```

The citation is not fabricated, but it is wrong. The source supports manager approval for 700 EUR and contradicts finance approval. A citation validator should mark this as contradicted, not supported. This is why citation quality is stricter than source relevance.

## Caveats

Page-level links are too coarse for dense manuals. Citations can also be copied from retrieved context even when the generated sentence says something stronger than the passage. Citation UX can hide uncertainty: a neat footnote may make an unsupported answer look authoritative, so support checks should happen before display.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Grounding](grounding.md) [Hallucination Mitigation →](hallucination-mitigation.md)
