---
title: Image Composer
description: "Prompt box for image generation with a shape toggle, model badge and send-or-stop."
component: image-composer
category: advanced
tags: [image, prompt, shape, composer]
---

Built on Composer: `ImageComposer` adds the shape choice, and you place `ComposerInput`,
`ComposerToolbar`, `ImageComposerShapes` and `ImageComposerTools` inside it. `onSubmit` receives the
prompt and the chosen shape; read the shape's ratio with `useImageComposer()` to size the result.
