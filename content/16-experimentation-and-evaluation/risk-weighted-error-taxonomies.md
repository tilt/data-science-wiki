---
title: Risk-Weighted Error Taxonomies
slug: experimentation-and-evaluation/risk-weighted-error-taxonomies
description: A method for classifying model errors by type, severity, and operational risk.
area: experimentation-and-evaluation
topics:
  - "risk-weighted-error-taxonomies"
  - "responsible-ai"
  - "evaluation"
level: intermediate
status: review
page_type: concept
aliases:
  - "Error taxonomy"
  - "Risk-weighted evaluation"
prerequisites:
  - "golden-datasets.md"
related:
  - "../17-responsible-ai-safety-and-governance/index.md"
  - "comparing-generative-ai-and-classical-ml-systems.md"
historical_context: false
last_reviewed: 2026-07-11
references:
  - "nist-ai-rmf-2023"
---
# Risk-Weighted Error Taxonomies

## Summary

A risk-weighted error taxonomy classifies failures by what went wrong and how much it matters. It prevents low-risk formatting errors from being treated the same as unsupported medical, legal, financial, or safety-critical claims.

## Dimensions

- Error type: factual, retrieval, reasoning, formatting, tool-call, privacy, security, fairness, or refusal.
- Severity: nuisance, recoverable, harmful, critical.
- Detectability: obvious to user, detectable by system, silent.
- Exposure: internal, limited beta, production, regulated workflow.
- Remediation: automatic retry, human review, rollback, incident response.

## Use in evaluation

Score systems not only by average correctness but by severe-error rate. A model with slightly lower average score can be preferable if it has fewer high-severity failures and better abstention behavior.

## Step-by-step example

For a medical-document assistant, classify each bad answer by type and severity. A typo in a harmless summary may be low severity. A wrong medication dosage, unsupported diagnosis, or privacy leak is high severity even if most answers are correct. Report the severe-error rate separately and require human review or abstention for high-risk classes.

## Designing the taxonomy

- Keep labels mutually understandable for reviewers.
- Include examples of each severity level.
- Record whether the system could have detected or prevented the error.
- Review disagreements and revise ambiguous categories.
- Track risk by slice, source, user task, and model version.

## Related topics

- [Golden Datasets](golden-datasets.md)
- [Human Evaluation](human-evaluation.md)
- [Responsible AI](../17-responsible-ai-safety-and-governance/index.md)
