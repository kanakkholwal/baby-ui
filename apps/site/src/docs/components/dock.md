---
title: Dock
description: macOS-style dock whose items magnify by cursor proximity, with a spring-settled active indicator.
component: dock
category: animated
tags: [dock, navigation, magnify]
---

Items grow as the cursor approaches and settle back under a spring. The interpolation
itself is linear in cursor distance; the curve you actually see is the spring's, which
is why an interrupted return keeps its velocity instead of snapping to a new tween.

## Tuning

`magnification` and `distance` are the two that change the feel. A large
`magnification` with a small `distance` gives a sharp, local bulge; the reverse gives a
broad swell that lifts most of the dock at once. Start from the defaults and change one
at a time.

`spring` picks a named spring from the token layer rather than exposing stiffness and
damping. Those two numbers mean different things in Motion and in `svelte/motion`, so
naming the spring is what keeps the React and Svelte renders identical.

## What it deliberately does not do

Magnification is pointer-only. Tabbing through the dock does not move anything, because
a dock that churns while you traverse it with the keyboard is unusable.

The active indicator is a pill inset inside its item, so it magnifies along with it. It
crossfades when the active item changes rather than sliding between items: a
shared-layout slide has no portable equivalent in Svelte, and a component whose two
ports diverge on something that visible is not one component.

Under `prefers-reduced-motion` magnification is off entirely. Hover still changes the
background, so the dock stays legible as an interactive surface.
