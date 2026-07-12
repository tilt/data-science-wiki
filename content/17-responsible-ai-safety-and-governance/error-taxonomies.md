---
title: Error Taxonomies
slug: responsible-ai-safety-and-governance/error-taxonomies
description: "Structured failure labels that make AI evaluation actionable."
area: responsible-ai-safety-and-governance
topics:
  - error-taxonomies
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - factual-correctness.md
  - hallucinations.md
  - fairness.md
  - adversarial-evaluation.md
  - explainability.md
  - ../16-experimentation-and-evaluation/risk-weighted-error-taxonomies.md
historical_context: false
last_reviewed: 2026-07-11
---
# Error Taxonomies

An error taxonomy turns failures into structured evidence. Instead of reporting that "the assistant was wrong," reviewers label what failed, why it likely failed, who was affected, and how severe the outcome was. That makes [factual correctness](factual-correctness.md), [hallucinations](hallucinations.md), [fairness](fairness.md), and [adversarial evaluation](adversarial-evaluation.md) comparable across releases.

## Mechanism

A useful taxonomy separates symptom, cause, and consequence:

```yaml
error_id: E03
symptom: wrong_entity
likely_cause: retrieval
severity: 5
affected_group: enterprise_customer
control_gap: citation_resolution
owner: retrieval
regression_test: rag_wrong_entity_017
status: open
```

The label `wrong_answer` is too broad to drive action. `wrong_entity` points toward retrieval or entity linking; `unsupported_claim` points toward generation and citation checks; `pii_leak` points toward [privacy](privacy.md), access control, and [policy enforcement](policy-enforcement.md). The taxonomy should be stable enough for trending but flexible enough to add new classes when an incident exposes a missing category.

## Executed aggregation

I ran a tiny aggregation over six reviewed failures:

```python
from collections import Counter

errors = [
    ("E01", "unsupported_claim", "generation", 4),
    ("E02", "retrieval_miss", "retrieval", 3),
    ("E03", "wrong_entity", "retrieval", 5),
    ("E04", "pii_leak", "policy", 5),
    ("E05", "unsafe_tool_call", "agent", 5),
    ("E06", "format_violation", "interface", 1),
]
by_type = Counter(error_type for _, error_type, _, _ in errors)
by_cause = Counter(cause for _, _, cause, _ in errors)
risk_points = sum(severity for _, _, _, severity in errors)

print("ERROR_TAXONOMIES")
print("by_type", dict(by_type))
print("by_cause", dict(by_cause))
print("risk_points", risk_points)
```

Observed output:

```text
ERROR_TAXONOMIES
by_type {'unsupported_claim': 1, 'retrieval_miss': 1, 'wrong_entity': 1, 'pii_leak': 1, 'unsafe_tool_call': 1, 'format_violation': 1}
by_cause {'generation': 1, 'retrieval': 2, 'policy': 1, 'agent': 1, 'interface': 1}
risk_points 23
```

The important output is not the count of six; it is the split by cause. Retrieval owns two failures, while policy and agent controls own separate high-severity failures. That distinction is what lets [governance of model and knowledge base changes](governance-of-model-and-knowledge-base-changes.md) assign the next fix to the right owner.

## Caveats

Taxonomies drift when reviewers improvise labels. Keep a short label dictionary, require examples for new classes, and periodically measure inter-reviewer agreement. For generative systems, store representative examples because a label without the prompt, retrieved context, output, and expected behavior is hard to audit.

## References

- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [NIST AI 600-1: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
