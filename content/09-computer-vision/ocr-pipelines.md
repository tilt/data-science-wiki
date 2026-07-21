---
title: OCR Pipelines
slug: computer-vision/ocr-pipelines
description: "Document-image preprocessing, layout detection, text recognition, correction, and field extraction."
area: computer-vision
topics:
  - ocr-pipelines
level: intermediate
status: review
page_type: system-design
aliases:
  - optical character recognition
prerequisites:
  - index.md
related:
  - classical-image-processing.md
  - rotated-object-detection.md
  - document-image-analysis-and-field-extraction.md
  - image-representation.md
historical_context: false
last_reviewed: 2026-07-21
---

# OCR Pipelines

An OCR pipeline converts document images into text and structured fields. It combines [classical image processing](classical-image-processing.md), page or text-region detection, recognition, language correction, layout reconstruction, and downstream extraction. For skewed labels and text lines, [rotated object detection](rotated-object-detection.md) may be the localization step.

## The OCR composition

A practical OCR system is a composition

$$
I \rightarrow I' \rightarrow R=\{r_i\} \rightarrow \hat t_i \rightarrow \hat T \rightarrow \hat F,
$$

where $I'$ is the cleaned image, $r_i$ are text regions, $\hat t_i$ are recognized strings, $\hat T$ is reconstructed text, and $\hat F$ are structured fields. Recognition models often minimize CTC loss, which marginalizes over alignments between frame-level predictions and the final character sequence.

## Worked example

This snippet computes edit-distance based character error rate and word error rate for an OCR hypothesis against a reference transcription.

```python
import numpy as np

def edit(a, b):
    dp = np.zeros((len(a)+1, len(b)+1), int)
    dp[:,0] = np.arange(len(a)+1); dp[0,:] = np.arange(len(b)+1)
    for i, ca in enumerate(a, 1):
        for j, cb in enumerate(b, 1):
            dp[i,j] = min(dp[i-1,j]+1, dp[i,j-1]+1, dp[i-1,j-1] + (ca != cb))
    return int(dp[-1,-1])

truth = "INV-1042 TOTAL 39.50"
ocr = "INV-I042 T0TAL 39.5O"
print("char_edits", edit(truth, ocr), "cer", round(edit(truth, ocr) / len(truth), 3))
print("word_edits", edit(truth.split(), ocr.split()), "wer", round(edit(truth.split(), ocr.split()) / len(truth.split()), 3))
```

Observed output:

```text
char_edits 3 cer 0.15
word_edits 3 wer 1.0
```

Three character substitutions make every token wrong under exact word matching, which is why field-level validation is often more useful than OCR text alone.

## Caveats

Deskew and binarization can improve clean scans but damage faint ink. Recognition errors are not independent: one layout miss can delete an entire paragraph. In [document image analysis and field extraction](document-image-analysis-and-field-extraction.md), entity linking may matter more than raw character error rate.

## References

- [Tesseract OCR documentation](https://tesseract-ocr.github.io/tessdoc/)
- [An End-to-End Trainable Neural Network for Image-based Sequence Recognition](https://arxiv.org/abs/1507.05717)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Content-Based Image Retrieval](content-based-image-retrieval.md) [Document Image Analysis and Field Extraction →](document-image-analysis-and-field-extraction.md)
