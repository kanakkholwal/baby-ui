---
title: Show More
description: Clamps long content to a height and offers an expander only when it overflows.
component: show-more
category: base
tags: [show, more]
---

The control only renders when the content actually exceeds `collapsedHeight`, measured
with a `ResizeObserver`. A "Show more" that expands nothing is worse than no control.

## Why the fade matters

A hard cut at the clamp height reads as the end of the text. The gradient is the only
thing telling you there is more, and it is why this is a component rather than a
`max-height` utility.

Height is not animated. The content length is unknown, so any duration is wrong for most
of the cases.
