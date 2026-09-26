---
title: Art Gallery
description: "An endless grid of framed images seen through a lens; drag to pan and it pulls back while you move."
component: art-gallery
category: advanced
tags: [gallery, webgl, grid, drag, lens, images, portfolio, infinite]
---

One WebGL shader draws the whole grid, so a thousand tiles cost the same as ten. No three.js:
the shader runs on a single full-screen triangle.

Remote images must send CORS headers, or WebGL can't read them. Colours come from your
theme, and without WebGL it falls back to a plain grid of the same images.
