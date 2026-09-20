---
title: Reasoning
description: Collapsible chain-of-thought panel that opens while thinking and closes when done.
component: reasoning
category: agents
tags: [reasoning, thinking, ai]
---

Opens on its own while the model is reasoning and closes when it finishes -- unless you
have touched it, in which case your choice wins for the rest of the turn. An interface
that keeps re-opening a panel you just closed is arguing with you.

## Not a live region

Reasoning is supplementary to the answer. Marking it `aria-live` would have a screen
reader read the model's scratch work over the actual response, which is exactly
backwards.

The header shimmers while thinking and settles into a duration when it stops, so the
panel reports what it cost you without needing a timer on screen.
