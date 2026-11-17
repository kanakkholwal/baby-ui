---
title: Scroll Area
description: Scroll container with edge fades that appear only when there is more to see.
component: scroll-area
category: base
tags: [scroll, area]
---

Native scrolling. Not a JavaScript reimplementation, so keyboard scrolling, momentum,
trackpad overscroll and screen-reader virtual cursors all keep working for free.

## Visible by default, removable when the surrounding UI already signals overflow

The custom scrollbar is visible by default. Use `scrollbar="hidden"` for constrained UI such
as a persistent navigation rail where clipping, edge fades or visible continuation already
signal that more content exists. The viewport remains natively scrollable and reserves no
scrollbar gutter.

## Scrollbar, gutter, orientation and ends

- `scrollbar`: `auto` (always), `hover` (on hover, focus or scroll), `scroll` (only while scrolling), `hidden`.
- `gutter`: `overlay` (bar over content) or `reserve` (content padded so it never overlaps).
- `orientation`: `vertical`, `horizontal` or `both`.
- `fade`: `mask` fades the clipped end of the content itself, `blur` softens it, `none` cuts it.

The ends only appear when content is genuinely clipped there,
so a list that happens to fit has no false edge.

Overscroll is contained inside the viewport, so reaching the end of a sidebar or panel does
not continue the same wheel gesture on the page behind it.
