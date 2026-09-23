---
title: Text Transition
description: "19 named text-reveal presets sharing one CSS animation engine."
component: text-transition
category: text
tags: [text, transition, reveal, animated, preset]
---

Consolidates animata's whole `text-animator.tsx` preset family (blur-out-up,
soft-blur-in, fade-through, per-character-rise, shared-axis-y/z, spring-scale-in, and 13
more) into one component with a `variant` prop instead of 19 separate registry items.

## One engine, not 19 keyframes

Every preset shares a single `@keyframes` block in `motion.css`, driven by CSS custom
properties (`--tt-from-opacity`, `--tt-from-x/y`, `--tt-from-scale`, `--tt-from-blur`)
set per preset -- the original ships a JS/WAAPI engine; this ships CSS transitions
instead, matching the rest of this library's motion.

## Replays on `text` change, not a timer

There's no built-in cycling. Pass a new `text` (or switch `variant`) and the animated
units remount, replaying the entrance. Pair it with your own interval, or with
`CycleText`, if you want auto-rotation.
