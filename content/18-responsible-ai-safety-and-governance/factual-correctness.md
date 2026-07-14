---
title: Factual Correctness
slug: responsible-ai-safety-and-governance/factual-correctness
description: "Checking whether AI outputs are supported by accepted evidence."
area: responsible-ai-safety-and-governance
topics:
  - factual-correctness
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - hallucinations.md
  - error-taxonomies.md
  - adversarial-evaluation.md
  - policy-enforcement.md
  - ../11-generative-ai/grounding.md
  - ../11-generative-ai/citations.md
historical_context: false
last_reviewed: 2026-07-11
---

# Factual Correctness

Factual correctness is agreement between an output and the evidence the system is allowed to use. For retrieval-augmented generation, this links directly to [grounding](../11-generative-ai/grounding.md), [citations](../11-generative-ai/citations.md), and the [error taxonomy](error-taxonomies.md) used to classify unsupported, contradicted, stale, or wrong-entity claims.

## Mechanism

A factuality control needs three explicit contracts:

```yaml
evidence_policy:
  allowed_sources: ["approved_plan_docs", "security_policy"]
  stale_after_days: 30
answer_policy:
  require_citation_per_atomic_claim: true
  abstain_when_evidence_missing: true
review_labels:
  - supported
  - contradicted
  - not_in_evidence
  - wrong_entity
  - stale_source
```

The atomic claim is the unit of review. A paragraph can be mostly correct but still contain one unsupported claim. That is why factuality evaluation should not collapse everything into a single thumbs-up score.

## Executed groundedness check

I ran a deterministic toy checker over four claims and cited snippets:

This snippet checks cited claims against evidence passages with a simple token-support heuristic and flags unsupported or contradicted claims for review.

```python
import re

evidence = {
    "P1": "Refunds are available for 30 days.",
    "P2": "Enterprise customers get SSO.",
    "P3": "Dental surgery coverage is not stated in the plan document.",
    "S1": "MFA is required for administrators.",
}
claims = [
    ("A1", "Refunds are available for 30 days.", "P1"),
    ("A2", "Enterprise customers get SSO.", "P2"),
    ("A3", "Dental surgery is covered.", "P3"),
    ("A4", "MFA is required for administrators.", "S1"),
]

print("FACTUAL_CORRECTNESS")
for claim_id, claim, cite in claims:
    claim_tokens = [
        token
        for token in re.findall(r"[a-z]+", claim.lower())
        if token not in {"is", "are", "for", "the"}
    ]
    ev = evidence[cite].lower()
    support = sum(token in ev for token in claim_tokens) / len(claim_tokens)
    contradicted = "not stated" in ev and "covered" in claim.lower()
    status = "supported" if support >= 0.8 and not contradicted else "needs_review"
    print(claim_id, status, "token_support", round(support, 2), "evidence", cite)
```

Observed output:

```text
FACTUAL_CORRECTNESS
A1 supported token_support 1.0 evidence P1
A2 supported token_support 1.0 evidence P2
A3 needs_review token_support 0.67 evidence P3
A4 supported token_support 1.0 evidence S1
```

Claim `A3` said dental surgery was covered, while the evidence snippet said coverage was not stated. The checker flags it for review rather than letting the model infer from similar benefits. In production, the same pattern should be paired with [adversarial evaluation](adversarial-evaluation.md) cases for unanswerable and conflicting evidence.

## Caveats

Factual correctness depends on source quality. A model can be perfectly grounded in an outdated policy and still be wrong for the user. Retrieval failures also masquerade as generation failures: if the right document never reaches the prompt, a generation-only fix will not solve the problem. For high-impact domains, use [human oversight](human-oversight.md) for ambiguous or disputed evidence.

## References

- [NIST AI 600-1: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [OWASP LLM09:2025 Misinformation](https://genai.owasp.org/llmrisk/llm092025-misinformation/)
