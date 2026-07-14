---
title: In-Context Learning
slug: generative-ai/in-context-learning
description: "Task adaptation from examples placed in the prompt rather than from weight updates."
area: generative-ai
topics:
  - in-context-learning
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - prompting.md
  - foundation-models.md
  - fine-tuning-versus-rag.md
  - context-construction.md
  - temperature-and-determinism.md
historical_context: false
last_reviewed: 2026-07-11
---
# In-Context Learning

In-context learning is the model's ability to infer a task pattern from examples in the prompt. It is a [prompting](prompting.md) technique, not weight training. Compared with [fine tuning versus RAG](fine-tuning-versus-rag.md), it is fast to change but limited by [context construction](context-construction.md).

## Mechanism

A prompt supplies examples $(x_i,y_i)$ followed by a new input $x_*$. The model conditions on the whole sequence and estimates $p(y_*\mid x_1,y_1,\ldots,x_*)$. Example order, label balance, and decoding settings from [temperature and determinism](temperature-and-determinism.md) can change the result.

## Executed artifact

```python
import numpy as np

examples = [("invoice overdue", "billing"), ("refund status", "support"), ("rain tomorrow", "weather")]
query = "refund invoice"
vocab = sorted(set(" ".join([text for text, _ in examples] + [query]).split()))

def bow(text):
    return np.array([text.split().count(word) for word in vocab], dtype=float)

def cosine(a, b):
    denom = np.linalg.norm(a) * np.linalg.norm(b)
    return 0.0 if denom == 0 else float(a @ b / denom)

query_vec = bow(query)
scores = [(label, round(cosine(query_vec, bow(text)), 3)) for text, label in examples]
print("IN_CONTEXT")
print(sorted(scores, key=lambda item: -item[1]))
```

Observed output:

```text
IN_CONTEXT
[('billing', 0.5), ('support', 0.5), ('weather', 0.0)]
```

A toy bag-of-words nearest-example classifier ties between billing and support for `refund invoice`, illustrating why ambiguous demonstrations need clearer examples or a fallback question.

## Caveats

Examples can teach the wrong pattern, leak sensitive labels, or crowd out retrieved evidence. Regression tests should pin the exact prompt.

## References

- [Brown et al., 2020, Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
