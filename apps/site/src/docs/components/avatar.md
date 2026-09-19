---
title: Avatar
description: User image with an initials fallback that shows only after the image actually fails.
component: avatar
category: base
tags: [avatar, profile, user]
---

The initials render first and the image fades in over them once it loads. That order
matters: the alternative is an empty box that pops, which looks like a bug on a slow
connection.

## The fallback is not a placeholder

If the image 404s, the initials stay. They are not a loading state that eventually gets
replaced; they are the fallback identity. `name` supplies both the alt text and the
initials, so the two cannot disagree.

Initials are the first letter of the first and last word, uppercased. One-word names get
a single letter rather than two letters from the same word.
