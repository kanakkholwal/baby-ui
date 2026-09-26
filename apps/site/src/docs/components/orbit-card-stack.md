---
title: Orbit Card Stack
description: Profile cards piled in a stack that fan out on hover or focus and raise the active card.
component: orbit-card-stack
category: animated
tags: [stack, cards, profiles, team, fan]
---

Hovering or focusing a card fans the stack out and lifts that card; leaving closes it around the
active card. Arrow keys, Home and End move between cards, Escape closes.

The active card is `value` with `onValueChange` (`bind:value` in Svelte), and the fan is `open`.
Open spacing shrinks to fit the container. Items with `href` get a real link button.
