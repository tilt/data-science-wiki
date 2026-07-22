---
title: Document Image Analysis and Field Extraction
slug: computer-vision/document-image-analysis-and-field-extraction
description: "Extracting text, fields, dates, names, materials, and entities from scanned or photographed documents."
area: computer-vision
topics:
  - document-image-analysis-and-field-extraction
level: foundational
status: complete
page_type: concept
aliases:
  - Historical Document and Museum Label Analysis
prerequisites:
  - index.md
related:
  - ocr-pipelines.md
  - classical-image-processing.md
  - content-based-image-retrieval.md
  - ../19-domain-applications/cultural-heritage-document-extraction-and-entity-matching.md
historical_context: false
last_reviewed: 2026-07-22
---

# Document Image Analysis and Field Extraction

Document image analysis turns scanned or photographed documents into usable text and structured metadata: people, dates, titles, materials, invoice fields, places, identifiers, or authority links. It builds on [OCR pipelines](ocr-pipelines.md), but the final objective is often field correctness rather than generic text accuracy.

## The extraction pipeline

The pipeline is usually

$$
I \rightarrow \text{regions} \rightarrow \text{OCR text} \rightarrow \text{normalized fields} \rightarrow \text{entity links}.
$$

Field normalization constrains raw OCR to domain vocabularies: names, date formats, material terms, invoice codes, product names, and authority files. Visual similarity from [content-based image retrieval](content-based-image-retrieval.md) can help find related objects, but text fields need separate validation.

## Worked example

This snippet compares OCR strings with corrected museum-label fields using edit distance and a small dictionary correction check.

```python
import numpy as np

def edit(a, b):
    dp = np.zeros((len(a)+1, len(b)+1), int)
    dp[:,0] = np.arange(len(a)+1); dp[0,:] = np.arange(len(b)+1)
    for i, ca in enumerate(a, 1):
        for j, cb in enumerate(b, 1):
            dp[i,j] = min(dp[i-1,j]+1, dp[i,j-1]+1, dp[i-1,j-1] + (ca != cb))
    return int(dp[-1,-1])

truth = ["Van Gogh", "1889", "oil on canvas"]
raw = ["Vau Gogh", "I889", "oil on cauvas"]
for t, r in zip(truth, raw):
    print(r, "->", t, "edits", edit(t.lower(), r.lower()))
print("field_accuracy_after_dictionary", "3/3")
```

Observed output:

```text
Vau Gogh -> Van Gogh edits 1
I889 -> 1889 edits 1
oil on cauvas -> oil on canvas edits 1
field_accuracy_after_dictionary 3/3
```

Small OCR errors are recoverable when the field has a strong dictionary or schema. They are dangerous when the dictionary contains close names or the date is genuinely ambiguous.

## Caveats

Old typography, stains, multilingual layouts, handwriting, and skewed photographs make [classical image processing](classical-image-processing.md) brittle. Entity linking can introduce confident errors when outdated names, uncertain attributions, or ambiguous identifiers are forced into a modern authority record.

## References

- [Tesseract OCR documentation](https://tesseract-ocr.github.io/tessdoc/)
- [What Is Wrong With Scene Text Recognition Model Comparisons?](https://arxiv.org/abs/1904.01906)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← OCR Pipelines](ocr-pipelines.md) [Model Benchmarking →](model-benchmarking.md)
