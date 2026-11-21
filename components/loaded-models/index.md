---
title: Loaded Models
description: "Popover that shows which models are in memory, with state, speed and load or unload actions."
component: loaded-models
category: advanced
tags: [models, memory, status, popover]
---

Give `LoadedModels` the models your app knows about. The trigger reads "Nothing loaded", a model
name, or "2 models loaded". Pass `onUnload` and `onLoad` to show the actions; add a `measurement`
to a ready model after a real speed test to show its bar and verdict.
