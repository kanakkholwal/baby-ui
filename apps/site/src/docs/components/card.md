---
title: Card
description: Surface with optional header, body and footer slots that keep consistent padding.
component: card
category: base
tags: [card, surface, panel]
---

Three padding steps, applied consistently to header, body and footer so nested cards
do not drift out of alignment.

## interactive is a promise

Setting `interactive` adds a hover lift. Only set it when the entire card is a link or
button. A card that lifts under the cursor and then does nothing when clicked is worse
than a card that never moved, because the hover state made a promise.

Put the real link inside the card and let it fill the surface. The hover style is
decoration on top of a real affordance, not a substitute for one.
