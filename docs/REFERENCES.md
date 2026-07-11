# References

The reference system is conservative, portable Markdown plus a centralized YAML bibliography.

## Decision

Every article may contain:

- a front-matter `references` list of bibliography keys
- a `## References` section with stable descriptive links or source names

The centralized bibliography lives in `references/bibliography.yml`. `make validate` fails when a page cites an unknown key or when a bibliography entry is missing required fields.

This avoids coupling canonical content to a Quartz-only citation plugin and keeps migration to MkDocs straightforward.

Prefer primary sources: papers, official documentation, standards, and authoritative books. Do not fabricate references or cite sources that were not checked.

## Why YAML first

YAML is easy to validate with the existing Node toolchain and preserves enough structure for later BibTeX, CSL JSON, or MkDocs plugin export. A future converter can map each key to BibTeX or CSL JSON without changing canonical pages.
