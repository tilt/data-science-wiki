---
title: PII Leakage
slug: responsible-ai-safety-and-governance/pii-leakage
description: "Paths by which AI systems expose personally identifiable information."
area: responsible-ai-safety-and-governance
topics:
  - pii-leakage
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - privacy.md
  - security.md
  - prompt-injection.md
  - policy-enforcement.md
  - auditability.md
  - ../11-generative-ai/pii-protection.md
historical_context: false
last_reviewed: 2026-07-11
---
# PII Leakage

PII leakage occurs when an AI system exposes personally identifiable information to a user, model provider, tool, log sink, retrieval result, analyst, or downstream system that should not receive it. It is both a [privacy](privacy.md) failure and a [security](security.md) failure because leakage often happens through permission gaps, prompt injection, or overly broad logging.

## Mechanism

Common leakage paths in AI systems include:

| Path | Example | Control |
| --- | --- | --- |
| Prompt input | User pastes a benefits form with SSN | Client-side warning, redaction, retention policy |
| Retrieval | HR document returned to unauthorized user | Permission-aware retrieval |
| Generation | Model repeats another user's account detail | Output filter and access check |
| Logs/traces | Raw prompt copied into analytics | Redacted observability schema |
| Tool call | Agent sends private data to external API | [Policy enforcement](policy-enforcement.md) and allowlisted tools |

NIST SP 800-122 treats PII confidentiality as context-dependent: the same field can have different risk depending on linkability, sensitivity, and exposure. For generative systems, [prompt injection](prompt-injection.md) can turn latent access into active exfiltration.

## Executed redaction check

I ran a tiny pattern-based redaction over three log records:

```python
import re
from collections import Counter

records = [
    "user=alice email=alice@example.com msg=refund question",
    "user=bob ssn=123-45-6789 msg=benefits form",
    "user=chen phone=+1 415 555 0199 msg=callback",
]
patterns = {
    "email": re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"),
    "ssn": re.compile(r"\b\d{3}-\d{2}-\d{4}\b"),
    "phone": re.compile(r"\+?1?\s?\(?\d{3}\)?\s?\d{3}\s?\d{4}"),
}

counts = Counter()
print("PII_LEAKAGE")
for row in records:
    redacted = row
    for kind, pattern in patterns.items():
        redacted, n = pattern.subn(f"[{kind.upper()}]", redacted)
        counts[kind] += n
    print(redacted)
print("redactions", dict(counts))
```

Observed output:

```text
PII_LEAKAGE
user=alice email=[EMAIL] msg=refund question
user=bob ssn=[SSN] msg=benefits form
user=chen phone=[PHONE] msg=callback
redactions {'email': 1, 'ssn': 1, 'phone': 1}
```

This is not a complete PII detector. It is an executable evidence artifact showing that the logging path can mask obvious email, SSN, and phone patterns before records reach [auditability](auditability.md) or monitoring sinks. Production controls need named-entity review, access control, and sampling for misses.

## Caveats

Redaction can break debugging, and debugging can break privacy. Store hashes, IDs, and minimal snippets where possible; keep raw payload access behind a separate approval path. Also test for indirect leakage: retrieved context, screenshots, exported CSVs, and human review queues often bypass the model-facing filter.

## References

- [NIST SP 800-122: Guide to Protecting the Confidentiality of PII](https://csrc.nist.gov/pubs/sp/800/122/final)
- [OWASP LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)
- [NIST AI 600-1: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
