---
title: Text Repel
description: Letters shy away from, or lean toward, the pointer and spring back when it leaves.
component: text-repel
category: text
tags: [text, cursor, hover]
---

Each letter reads its distance to the pointer and moves along that line, with a force that
falls off to nothing at `radius`. `attract` flips the direction.

The offsets are written straight onto each letter as CSS custom properties, and a spring sampled
into a `linear()` easing does the settling. Nothing re-renders per pointer move, and a new target
simply retargets the running transition, so fast moves stay smooth.
