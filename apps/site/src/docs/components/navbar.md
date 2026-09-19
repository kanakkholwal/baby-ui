---
title: Navbar
description: Production site header with a scroll-aware surface, an active-link indicator that slides, and a mobile sheet.
component: navbar
category: boilerplate
tags: [navbar, header, saas]
---

The header is transparent over the top of the page and only gains a border and a
blurred surface once you have scrolled past it. That keeps a hero image uninterrupted
while still giving the header a readable backing the moment it overlaps content.

## The indicator

The active pill is measured from the current link's box rather than positioned from an
index. That costs a `ResizeObserver`, and buys correctness when a font finishes loading
or the viewport changes: the pill is never half a word off.

Pass `active` as the current `href`. It sets `aria-current="page"`, and the indicator
reads that attribute rather than a separate piece of state, so the two cannot disagree.

## Mobile

Below the medium breakpoint the links collapse into a sheet that slides up from the
bottom edge. Bottom is deliberate: it is the reachable part of a phone screen.

Escape closes the sheet and returns focus to the button that opened it.
