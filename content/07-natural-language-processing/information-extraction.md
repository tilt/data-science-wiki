---
title: Information Extraction
slug: natural-language-processing/information-extraction
description: "Turning unstructured text into typed fields, relations, events, and records with source evidence."
area: natural-language-processing
topics:
  - information-extraction
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - named-entity-recognition.md
  - sequence-labelling.md
  - entity-linking-and-matching.md
  - document-understanding.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---
# Information Extraction

Information extraction (IE) converts text into structured records: entities, fields, relations, events, or table rows. [Named entity recognition](named-entity-recognition.md) finds typed spans; IE adds schema constraints such as invoice id, total, due date, buyer, supplier, and source offsets. It connects naturally to [document understanding](document-understanding.md) when layout matters.

## Defining mechanism

An extraction system predicts a record

$$
\hat r=\{(f_j, v_j, s_j, e_j)\}_{j=1}^m,
$$

where $f_j$ is a field name, $v_j$ is a value, and $(s_j,e_j)$ identifies the supporting span. Sequence models estimate span labels; rule systems can use typed patterns; generative systems should still return evidence spans. Evaluation often checks field-level exact match, not only token F1.

Field exact match is the indicator $\mathbf 1\{\hat v_f=v_f\}$ for one schema field. Field exact accuracy averages that indicator across required fields and records, so a nearly correct value still counts as wrong when exact downstream values matter.

## Worked example

```python
import numpy as np, re

np.random.seed(7)
texts = ["Invoice 104 total $42.10 due 2026-08-01",
         "Invoice 105 total $17.00 due 2026-08-09"]
gold = [{"id": "104", "total": "42.10", "due": "2026-08-01"},
        {"id": "105", "total": "17.00", "due": "2026-08-09"}]
pat = re.compile(r"Invoice (?P<id>\d+) total \$(?P<total>\d+\.\d{2}) due (?P<due>\d{4}-\d{2}-\d{2})")
pred = [pat.search(t).groupdict() for t in texts]
field_acc = np.mean([pred[i][k] == gold[i][k] for i in range(2) for k in gold[i]])
print("records", pred)
print("field_exact_accuracy", round(float(field_acc), 3))
```

Observed output:

```text
records [{'id': '104', 'total': '42.10', 'due': '2026-08-01'}, {'id': '105', 'total': '17.00', 'due': '2026-08-09'}]
field_exact_accuracy 1.0
```

The regex is deliberately narrow, but it demonstrates the artifact IE must produce: typed fields, not just highlighted text.

## Caveats

Exact schemas are brittle. Real documents contain missing fields, repeated totals, handwritten corrections, OCR errors, and values split across layout regions. Low-confidence extractions should carry source spans for review. For names or products, pair extraction with [entity linking and matching](entity-linking-and-matching.md), then report field-level and record-level metrics in [evaluation of NLP systems](evaluation-of-nlp-systems.md).

## References

- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)
- [Finkel, Grenager, and Manning, Incorporating Non-local Information into Information Extraction Systems](https://aclanthology.org/P05-1045/)
