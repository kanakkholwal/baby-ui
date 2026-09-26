---
title: Fisheye Infinite Grid
description: An endless image grid seen through a fisheye lens; drag with inertia or pan with arrow keys.
component: fisheye-infinite-grid
category: animated
tags: [gallery, fisheye, lens, grid, drag, images]
---

A per-axis fisheye magnifies the centre by `1 + lens` and compresses the edges, so rows and columns stay aligned while tiles swell toward the middle. `items` repeat endlessly in both directions.

Drag keeps `inertia` momentum on release; arrow keys glide one cell and Home recentres. The loop only runs while the grid moves. Reduced motion drops momentum and makes key presses jump.
