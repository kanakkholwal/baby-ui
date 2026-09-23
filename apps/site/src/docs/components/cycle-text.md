---
title: Cycle Text
description: Cycles through a list of words on an interval.
component: cycle-text
category: text
tags: [text, cycle, rotate, loop, interval]
---

Fully controlled: pass `index`/`onIndexChange` to drive which word shows, or leave it
uncontrolled and it auto-advances every `intervalMs`. Reuses `TextTransition`'s
`.text-transition-unit` CSS engine for the enter animation.
