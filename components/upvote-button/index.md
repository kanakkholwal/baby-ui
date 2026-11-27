---
title: Upvote Button
description: "A vote toggle where the vote rises through the button, with a floating +1 and a rolling count."
component: upvote-button
category: animated
tags: [vote, upvote, toggle, count, micro-interaction]
---

The fill climbs from the bottom as a filled arrow rises in behind the outline one, a +1 floats
away and the count rolls to its new total. Taking the vote back runs it all downward, a little
faster.

`count` is everyone else's votes; the viewer's own vote is added on top, so the number you pass
never has to change when the viewer votes. Leave `voted` out to let the button drive itself, or
pass `voted` and `onVotedChange` to keep the state yourself (`bind:voted` in Svelte).

`orientation` stacks the arrow over the count (`vertical`, a tall card) or places them side by
side (`horizontal`, a 36px pill that lines up with other controls).

## Colour

`variant` picks the fill: the brand colour (`default`), a `secondary` neutral, or a status colour
(`success`, `warning`, `info`, `destructive`). The fill, the +1 and the text on the fill all read two
CSS variables, so any colour is one class away:

```tsx
<UpvoteButton count={12} className="[--upvote-color:oklch(0.7_0.2_30)] [--upvote-on:white]" />
```
