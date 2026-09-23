---
title: Text Explode (iMessage)
description: "A shrink, jitter, then explode-outward cycle, iMessage-invisible-ink style."
component: text-explode-imessage
category: text
tags: [text, explode, imessage, invisible-ink, animated]
---

One shared keyframe timeline runs per character, each with its own random outward
direction, rotation and scale baked in once as CSS custom properties when `text`
changes. `loop` mode repeats continuously; `hover` mode plays one cycle per hover or tap.
