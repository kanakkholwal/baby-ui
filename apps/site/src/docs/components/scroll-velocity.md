---
title: Scroll Velocity
description: Marquee rows that drift at rest, speed up as the page scrolls and flip direction with it.
component: scroll-velocity
category: text
tags: [marquee, scroll, velocity]
---

Each row is a plain CSS loop, so the resting drift costs nothing on the main thread. Scrolling
only changes the running animations' `playbackRate`: faster scroll, faster rows, and scrolling up
turns them around. The position never jumps, because the same animation keeps running at a new
rate.
