---
title: Testing
slug: software-engineering/testing
description: Testing strategy for software, data, ML, and generative-AI systems.
area: software-engineering
topics:
  - "testing"
  - "quality"
  - "regression"
level: intermediate
status: review
page_type: concept
aliases:
  - "Automated testing"
prerequisites:
  - "software-architecture.md"
related:
  - "../16-experimentation-and-evaluation/golden-datasets.md"
  - "../13-ml-engineering-and-mlops/ci-cd-for-ml.md"
historical_context: false
last_reviewed: 2026-07-11
references:
  - "iso-25010-2011"
---
# Testing

## Summary

Testing checks whether a system behaves as intended under known conditions. For ML and AI systems, tests must cover code, data, model behavior, evaluation fixtures, prompts, retrieval, and operational failure modes.

## Test layers

- Unit tests for deterministic code.
- Contract tests for APIs and schemas.
- Data validation for schemas, distributions, and missingness.
- Model evaluation on golden datasets.
- Integration tests for retrieval, tool execution, and serving.
- End-to-end smoke tests for critical workflows.

## Step-by-step example

For a RAG endpoint, start with unit tests for chunk formatting and citation parsing. Add contract tests for the request and response schema. Add a golden dataset with questions, expected sources, and accepted answer criteria. Run an integration test that retrieves documents, builds context, calls the model, validates citations, and checks refusal behavior when evidence is missing.

## Test design principles

- Put deterministic checks as close to the failing code as possible.
- Use fixtures for data, model outputs, prompts, and retrieval results.
- Test both expected behavior and important failure paths.
- Keep slow model or integration tests separate from fast unit tests.
- Treat flaky tests as production signals, not background noise.

## Common gaps

Teams often test code but not data assumptions, prompts, model regressions, or incident recovery. Generative systems also need tests for refusal behavior, citation correctness, tool-call validity, and privacy boundaries.

## Related topics

- [Golden datasets](../16-experimentation-and-evaluation/golden-datasets.md)
- [CI/CD for ML](../13-ml-engineering-and-mlops/ci-cd-for-ml.md)
- [API design](api-design.md)
