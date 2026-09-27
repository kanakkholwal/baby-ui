---
title: Mega Navbar
description: Marketing site header with a morphing mega menu on desktop and an accordion sheet on mobile.
component: mega-navbar
category: blocks
tags: [navbar, header, mega menu, navigation, marketing]
---

One shared panel resizes and slides between desktop triggers instead of a fresh popover
mounting per item, so moving along the row reads as the panel morphing to the next group.

## Not a menu

The panel holds links to pages, not commands, so it's a disclosure pattern rather than
`role="menu"`: the browser's own link semantics are what a screen reader should hear.

## Mobile is a real sheet

Below `md`, the trigger opens a full-height sheet: one accordion section open at a time,
plus the same `links`/`actions` data the desktop row uses. Navigating (an `active` change)
closes it automatically.

## Notched variant

`variant="notched"` hangs the whole row from the top edge on a card-coloured
[Notched Shelf](/components/blocks/notched-shelf), leaving the page visible on either
side. The mega panel drops from the shelf the same way it drops from the solid bar.
Below `md` it becomes a plain bar with a hairline rule that fades in once the page
scrolls, and the sheet drops from the top instead of sliding in from the side.
