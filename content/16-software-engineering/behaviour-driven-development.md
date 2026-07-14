---
title: Behaviour Driven Development
slug: software-engineering/behaviour-driven-development
description: Observable examples that turn requirements into executable behavior.
area: software-engineering
topics:
  - behaviour-driven-development
level: foundational
status: review
page_type: concept
aliases:
  - BDD
prerequisites:
  - requirements-engineering.md
related:
  - "requirements-engineering.md"
  - "testing.md"
  - "documentation.md"
  - "code-review.md"
historical_context: false
last_reviewed: 2026-07-11
---
# Behaviour Driven Development

Behaviour-driven development turns a requirement into examples of externally visible behavior. The mechanism is the Given-When-Then scenario: initial state, action, expected result. It sits between [requirements engineering](requirements-engineering.md) and [testing](testing.md): stakeholders can read it before code exists, and engineers can later automate the example.

## Contract Form

```gherkin
Feature: Feed personalization opt-out

  Scenario: Opted-out users never use behavioral features
    Given the user has opted out of personalization
    And user_click_history is available
    When the home feed is ranked
    Then the request is rejected as a policy violation

  Scenario: Opted-out users can still receive contextual ranking
    Given the user has opted out of personalization
    And only locale is available
    When the home feed is ranked
    Then the contextual ranker is used
```

The scenario names policy behavior, not implementation classes. That makes it suitable for [documentation](documentation.md), review comments, and future regression tests.

## Executed Artifact

```python
def route_feed(opted_out: bool, available_features: set[str]) -> str:
    if opted_out and "user_click_history" in available_features:
        return "policy_violation"
    if opted_out:
        return "contextual_ranker"
    return "personalized_ranker"

scenarios = [
    ("opted out blocks behavioral features", True, {"user_click_history", "locale"}, "policy_violation"),
    ("opted out allows contextual features", True, {"locale"}, "contextual_ranker"),
    ("opted in uses personalization", False, {"user_click_history"}, "personalized_ranker"),
]
for name, opted_out, features, expected in scenarios:
    actual = route_feed(opted_out, features)
    print(f"{name}: {actual == expected} -> {actual}")
```

Observed output:

```text
opted out blocks behavioral features: True -> policy_violation
opted out allows contextual features: True -> contextual_ranker
opted in uses personalization: True -> personalized_ranker
```

BDD is strongest for deterministic edges: authorization, consent, routing, workflow state, and fallback behavior. It is weaker for exact model scores; use evaluation datasets and [golden datasets](../17-experimentation-and-evaluation/golden-datasets.md) for statistical behavior. During [code review](code-review.md), a scenario is useful if the reviewer can point to the user-visible rule it protects.

## Failure Modes

BDD becomes theatre when scenarios are written after implementation or restate private method names. Keep the scenario count small, name the business rule, and move brittle setup into fixtures. If every scenario requires a full browser and real provider call, the examples will be too slow to guide design.

## References

- [Cucumber documentation: Gherkin reference](https://cucumber.io/docs/gherkin/reference/)
- [pytest documentation: assertions](https://docs.pytest.org/en/stable/how-to/assert.html)
