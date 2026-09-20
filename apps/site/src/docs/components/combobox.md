---
title: Combobox
description: Filtering input with an anchored result list and full keyboard selection.
component: combobox
category: base
tags: [combobox, overlay]
---

Focus stays in the input while the arrow keys move through results. That is what
`aria-activedescendant` is for: the highlighted option is announced without focus ever
leaving the field, so typing and navigating do not fight each other.

## The empty state is rendered

When nothing matches, the list stays open with a message rather than collapsing. A list
that vanishes leaves the user unsure whether it is filtering, loading, or broken.

## Highlight resets on input

Changing the query resets the highlight to the first result. Keeping the old index means
Enter selects whatever happens to be in that position now, which is rarely what was
wanted.
