---
title: Message
description: Chat turn with sender-aware alignment, an independent colour variant, and actions that appear on hover.
component: message
category: agents
tags: [message, chat, ai]
---

`align` only drives which side the turn sits on; `tone` picks the bubble's colour on its own,
so Message works anywhere a coloured turn is useful, not only in a two-party chat where one
side is always the same colour.

## Colour, layout and motion are independent

`tone` covers the palette: `surface` (neutral, the default received-style look), `solid`
(high-emphasis fill), `muted`, `outline`, `destructive` (a failed-to-send or system turn), and
`raw`, which drops only the border and background (padding and shape stay) so you supply your
own surface via `bubbleClassName`. `layout="compact"` drops the avatar for dense reuse, such as a plain turn
inside Conversation; `layout="wide"` removes the 85% width clamp. `motion="imessage"` plays a
slide-up-with-scale-overshoot on mount, matching iMessage's bubble pop; `fade` and `slide` are
plainer entrances.

## Hover actions stay reachable

Copy fades in on hover and reads the rendered bubble's own text, no `text` prop needed. Retry
only renders when you pass `onRetry`, so it's never a button that does nothing. Both appear on
`focus-within` too and never leave the tab order; actions that exist only on hover are
invisible to a keyboard, which turns a convenience into a trap.

## Waiting is not progress

The pending state is three dots on a staggered loop. It deliberately does not look like
a progress bar, because nothing is being measured -- a bar would be claiming knowledge
the interface does not have.
