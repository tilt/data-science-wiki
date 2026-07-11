---
title: References
slug: references-and-glossary/references
description: Concise guide to References in References and Glossary.
area: references-and-glossary
topics:
  - references
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# References

## Summary

References connect topic pages to source material. The wiki uses human-readable reference sections in pages and machine-readable bibliography keys in front matter for validation.

## Reference policy

- Prefer primary sources for algorithms, model families, standards, and API behavior.
- Use authoritative books or standards for stable foundational material.
- Use official documentation for product or API usage.
- Use secondary explanations only as supporting context, not as the sole source for technical claims.

## Page-level references

When a page relies on a source, add a short `## References` section explaining the source in prose. If the source is in `references/bibliography.yml`, also add its key to the front matter under `references`.

## Common mistakes

- Citing a blog post for a result that should cite the original paper.
- Adding a bibliography key to a page before the key exists in the central bibliography.
- Leaving source notes in prose without enough detail to find the source again.
