---
title: Iridescent Fold
description: Holographic foil folds with a thin-film sheen, drawn in WebGL from theme tokens.
component: iridescent-fold
category: backgrounds
tags: [iridescent, holographic, foil, webgl]
---

Three rotated sine ridges make a soft crease field; the colour follows fold height and the angle to a fixed light, so the tones sweep across each crease like thin-film foil. Flat areas stay close to `--background`, so copy set over the middle keeps its contrast.

The root fills its nearest positioned parent (or the viewport with `position="fixed"`) and renders `children` above the effect. It draws at most 30 frames a second on a low-power WebGL context, pauses off screen and in hidden tabs, draws one still frame under reduced motion, and falls back to a token gradient without WebGL.
