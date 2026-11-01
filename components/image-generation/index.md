---
title: Image Generation
description: "An image being made: a drifting dot field, then a blur that sharpens into the picture, with a status line, the prompt and a retry."
component: image-generation
category: agents
tags: [image, generation, ai, agent]
---

Set `status` from your request: `queued`, `generating`, `refining` (with a preview inside
ImageGenerationMedia if the model streams one), then `complete` or `error`. The frame reserves
its `aspectRatio` from the start, so the finished image lands without moving anything.

## Parts

- `ImageGenerationFrame` holds the image and names it with `label`.
- `ImageGenerationMedia` wraps your `img`, `video` or `canvas`; it sharpens as the status moves on.
- `ImageGenerationField` is the dot field that stands in until the image is ready.
- `ImageGenerationBadge` labels a corner, such as the resolution.
- `ImageGenerationCaption` holds `ImageGenerationStatus` and `ImageGenerationPrompt` below the frame.
- `ImageGenerationRetry` appears only after a failure.
