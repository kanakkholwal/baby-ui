---
title: Fullscreen Nav
description: Full-viewport navigation overlay with staggered links and scroll locking.
component: fullscreen-nav
category: boilerplate
tags: [fullscreen, nav]
---

Links stagger in at 45ms, which is inside the range where a stagger still reads as one
gesture rather than a queue. Only opacity and transform animate, so a long list costs
nothing in layout.

## Scroll locking restores, not blanks

Body overflow is captured before it is changed and restored on close. Setting it to an
empty string on the way out clobbers whatever the page had, which is how a locked
scrollbar survives the menu closing.
