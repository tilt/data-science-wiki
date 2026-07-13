---
title: Marketing Text Categorization
slug: domain-applications/marketing-text-categorization
description: "Classifying short marketing and lifecycle messages into intent, channel, compliance, or routing categories."
area: domain-applications
topics:
  - application
  - marketing-text-categorization
level: foundational
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../07-natural-language-processing/text-classification.md
  - ../07-natural-language-processing/topic-classification.md
  - ../07-natural-language-processing/text-preprocessing.md
  - ../07-natural-language-processing/evaluation-of-nlp-systems.md
  - ../03-classical-machine-learning/class-imbalance.md
  - ../03-classical-machine-learning/calibration.md
historical_context: false
last_reviewed: 2026-07-11
---
# Marketing Text Categorization

Marketing text categorization assigns short copy to labels such as promotion, lifecycle nurture, transactional notice, product update, compliance risk, or unsubscribe intent. Inputs are subject lines, SMS copy, push notifications, landing-page snippets, campaign metadata, locale, and send context. The target should support a concrete action: route for legal review, choose a template, suppress promotional messages, or measure campaign mix.

## Framing

The core method is [text classification](../07-natural-language-processing/text-classification.md), often with sparse n-grams, embeddings, or encoder models. [Text preprocessing](../07-natural-language-processing/text-preprocessing.md) must preserve tokens that matter commercially, such as discount numbers, currency, expiration dates, and opt-out phrases. Evaluation should report macro-F1 by label, precision for regulated classes, calibration for human review thresholds, and slice performance by locale, channel, and campaign type. Labels are often skewed, so [class imbalance](../03-classical-machine-learning/class-imbalance.md) and [calibration](../03-classical-machine-learning/calibration.md) should be explicit.

The UCI SMS Spam Collection is a relevant public short-message benchmark: it contains 5,574 labeled SMS messages collected for mobile-phone spam research.

## Executed Artifact

This executed tiny TF-IDF logistic-regression example intentionally used only eight training messages and two held-out messages.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score
from sklearn.pipeline import make_pipeline

texts = [
    "free trial discount for teams",
    "renewal invoice due for your workspace",
    "webinar invite analytics leaders",
    "limited time coupon upgrade",
    "security update for account admins",
    "case study data platform launch",
    "exclusive offer save 30 percent",
    "billing receipt for annual plan",
    "join product demo next week",
    "password reset requested",
]
labels = [
    "promo", "transactional", "nurture", "promo", "transactional",
    "nurture", "promo", "transactional", "nurture", "transactional",
]
train = [0, 1, 2, 3, 4, 5, 7, 8]
test = [6, 9]
pipe = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2)),
    LogisticRegression(max_iter=1000, random_state=18),
).fit([texts[i] for i in train], [labels[i] for i in train])
pred = pipe.predict([texts[i] for i in test])

print("heldout_predictions", list(zip([texts[i] for i in test], pred.tolist())))
print("heldout_macro_f1", round(f1_score([labels[i] for i in test], pred, average="macro"), 3))
```

Observed output:

```text
heldout_predictions [('exclusive offer save 30 percent', 'nurture'), ('password reset requested', 'nurture')]
heldout_macro_f1 0.0
```

The failure is the point: with too few examples, the classifier misses obvious promotion and transactional cues. A production marketing classifier needs enough labeled examples per category, stable taxonomy definitions, and [evaluation of NLP systems](../07-natural-language-processing/evaluation-of-nlp-systems.md) by costly mistakes, not a demo-sized accuracy number.

## Failure Modes

Copy changes quickly around launches and seasonal campaigns, so stale examples cause drift. Ambiguous text can belong to multiple [topic classification](../07-natural-language-processing/topic-classification.md) labels, such as "webinar invite" being both nurture and event. Do not train on downstream engagement outcomes as if they were taxonomy labels; that changes the task from categorization to response prediction.

## References

- [UCI Machine Learning Repository: SMS Spam Collection](https://archive.ics.uci.edu/dataset/228/sms+spam+collection)
