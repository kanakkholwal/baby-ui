---
title: Infinite Image Field
description: An endless field of images that drifts toward whichever side of the centre the pointer is on.
component: infinite-image-field
category: animated
tags: [images, field, infinite, drift, canvas]
---

The pointer's offset from the centre sets a drift velocity up to `maxSpeed`, eased by `smoothing`. A small dead zone in the middle lets the field rest, and held arrow keys drift it the same way.

Each cell always shows the same image. The loop stops once the drift settles, offscreen or in a hidden tab; reduced motion keeps the field still and arrow keys jump one tile.
