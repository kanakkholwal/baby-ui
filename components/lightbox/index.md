---
title: Lightbox
description: "Full-screen lightbox that flies a picture out of its thumbnail, with zoom, pan, a filmstrip and a details panel."
component: lightbox
category: base
tags: [lightbox, gallery, zoom, image]
---

Compose the parts you need inside `LightboxContent`: toolbar controls, the stage, an optional
details panel and the filmstrip. Zoom with the wheel (toward the cursor), the toolbar, `+` `-`
`0`, or a double click; drag to pan once zoomed. Fill `LightboxDetails` and any actions from
`useLightbox()`, which exposes the current picture.

## Flying out of the thumbnail

Give each `LightboxTrigger` an `index`. It opens that picture and becomes the thumbnail it
flies out of when the viewer opens and lands back in when it closes, cropped to the thumbnail's
shape on the way. For tiles you render yourself, pass `origin` to `Lightbox` and return the
element for a picture:

```tsx
<Lightbox images={images} open={open} index={index} origin={(i) => tiles.get(i)} />
```

Stepping to another picture slides it in from the side it came from. Reduced motion keeps the
plain fade.
