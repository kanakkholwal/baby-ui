---
title: Counter
description: Counts up (or down) to a target number.
component: counter
category: text
tags: [text, counter, number, count-up]
---

Written directly to the element's `textContent` per frame, not via re-render.
Changing `value` re-counts from wherever the display currently sits, and
`triggerOnView` (on by default) waits for the first scroll-into-view before it starts.
