---
title: Light Rays
description: Vertical shafts of light that fade up, hold and fade out, drawn in WebGL from theme tokens.
component: light-rays
category: backgrounds
tags: [background, rays, light, webgl, shader, hero]
---

Each beam derives its position, width, phase and colour from a hash of its index, so one `seed` always gives the same field and a handful of uniforms describe all of it. Beams paint their own colour with coverage as alpha, which reads on light and dark pages and leaves the canvas transparent: page content and a transparent header sit over it unchanged.

`soft` is a few wide hazy shafts; `crisp` is many fine hairlines. The root fills its nearest positioned parent (or the viewport with `position="fixed"`) and renders `children` above the effect. The loop runs at 30fps, pauses off screen and in hidden tabs, reduced motion draws one still frame, and the canvas stays transparent until the first frame, so nothing tints the page while it loads or without WebGL.
