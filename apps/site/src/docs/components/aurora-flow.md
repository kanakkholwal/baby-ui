---
title: Aurora Flow
description: Layered silk veils drifting through a WebGL noise field, coloured from theme tokens.
component: aurora-flow
category: backgrounds
tags: [background, aurora, webgl, shader]
---

The shader warps several octaves of value noise into three veils and a folded sheen, then adds a drifting light and a vignette. Colours come from theme tokens, so the field follows the theme; light themes render the same scene in inverted space so glows read as ink instead of washing out.

The root fills its nearest positioned parent (or the viewport with `position="fixed"`) and renders `children` above the effect. The loop pauses off screen and in hidden tabs, reduced motion draws one still frame, and browsers without WebGL get a token gradient.
