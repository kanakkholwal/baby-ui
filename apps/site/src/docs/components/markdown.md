---
title: Markdown
description: Minimal block renderer for headings, paragraphs, lists and fenced code.
component: markdown
category: base
tags: [markdown]
---

Headings, paragraphs, lists, fenced code. That is the entire grammar, and that is the
point: it is 60 lines you can read, and it renders everything as text nodes so untrusted
input cannot inject markup.

If you need links, tables, footnotes or anything else, use a real pipeline. A
half-implemented markdown parser in a copied component is a liability, not a feature.
