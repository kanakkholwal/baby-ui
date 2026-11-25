---
title: Carousel
description: "Slides browsed by drag, flick, trackpad swipe or keys. Compose content, arrows, dots and thumbnails; neighbours can peek in."
component: carousel
category: base
tags: [carousel, slider, gallery, swipe]
---

Compose `CarouselContent` with one `CarouselItem` per slide, then add the controls you want as
siblings: `CarouselPrevious`, `CarouselNext`, `CarouselDots` and
`CarouselThumbs` (one `CarouselThumb` per slide). Arrows float over the slide's edges.

`variant="peek"` shows scaled neighbours beside the slide; `flat` keeps them full size.
`variant="showcase"` is for large editorial media: put the controls in a `CarouselControls` row
and they become compact pill controls. Rotation has no button: set `interval` and drive
`autoplay` from your own state, and only when the viewer asked for it.

`projection="concave"` and `projection="convex"` keep the same controlled index, gestures,
keyboard behavior and controls while projecting each slide's x, y and scale onto a cylinder.
They wrap continuously by design. `visibleItems` is a ceiling: the carousel shows only as many
slides as fit across its width without overlapping, down to one on a narrow container.
