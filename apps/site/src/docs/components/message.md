---
title: Message
description: Chat turn with sender-aware alignment, avatar, and actions that appear on hover.
component: message
category: agents
tags: [message, chat, ai]
---

User turns align right on the primary surface, assistant turns align left on a card.
The asymmetry is what lets you skim a long transcript without reading the names.

## Hover actions stay reachable

Copy and retry fade in on hover. They also appear on `focus-within`, and they never
leave the tab order. Actions that exist only on hover are invisible to a keyboard, which
turns a convenience into a trap.

## Waiting is not progress

The pending state is three dots on a staggered loop. It deliberately does not look like
a progress bar, because nothing is being measured -- a bar would be claiming knowledge
the interface does not have.
