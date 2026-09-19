---
title: Accordion
description: Disclosure list with single or multiple open panels and animated height.
component: accordion
category: base
tags: [accordion, disclosure, faq]
---

Single mode by default, with `collapsible` letting the open panel close again. Set
`multiple` when panels are independent and people will want to compare them.

## Height without measuring

The panel animates `grid-template-rows` from `0fr` to `1fr`. No JavaScript measures
anything, no `max-height` guess is involved, and a panel with forty lines of content
opens at the same speed as one with two. `max-height` transitions are the usual approach
and they always animate to the guess rather than the content, which is why a short panel
opens instantly and a tall one lags.

Each header is a real button with `aria-expanded` and `aria-controls` pointing at its
region, so the relationship is announced rather than implied by proximity.
