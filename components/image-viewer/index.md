---
title: Image Viewer
description: "Full-screen lightbox that steps through a set of pictures with zoom, pan and a filmstrip."
component: image-viewer
category: advanced
tags: [lightbox, gallery, zoom, image]
---

Compose the parts you need inside `ImageViewerContent`: toolbar controls, the stage, an optional
details panel and the filmstrip. Zoom with the wheel (toward the cursor), the toolbar, `+` `-`
`0`, or a double click; drag to pan once zoomed. Fill `ImageViewerDetails` and any actions from
`useImageViewer()`, which exposes the current picture.
