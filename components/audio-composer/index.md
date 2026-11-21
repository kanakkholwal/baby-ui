---
title: Audio Composer
description: "Prompt box for generating audio with a length stepper and a style choice."
component: audio-composer
category: agents
tags: [audio, prompt, composer, generate]
---

Built on Composer. Place `ComposerInput`, then a `ComposerToolbar` holding `AudioComposerDuration`,
`AudioComposerStyle` and an `AudioComposerTools` group that ends in `ComposerSubmit`. `onSubmit`
receives the prompt, the length in seconds and the chosen style.
