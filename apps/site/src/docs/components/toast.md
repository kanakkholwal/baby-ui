---
title: Toast
description: Stacked notifications in a live region, dismissible and tone-aware.
component: toast
category: base
tags: [toast]
---

The container is `aria-live="polite"`, so a new toast is announced without cutting off
whatever is being read.

## Nothing auto-dismisses

There is no timer. A notification that removes itself after four seconds is unreadable for
anyone who reads slowly, is mid-sentence elsewhere, or uses a screen reader. The caller
owns the array and decides when something leaves.

The container is `pointer-events-none` with each card set to `auto`, so the empty space
around the stack never swallows a click meant for the page.
