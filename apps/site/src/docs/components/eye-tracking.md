---
title: Eye Tracking
description: A row of eyes whose irises follow the pointer and blink now and then.
component: eye-tracking
category: animated
tags: [eyes, pointer, cursor, blink]
---

Pointer moves write an offset, a fibre rotation and a pupil scale per eye as CSS variables; transitions ease them. The blink is a CSS keyframe, so `blinkInterval` only changes its duration.

Four styles share the same parts, coloured from theme tokens so the sclera stays light and the pupil dark in either theme. Reduced motion centres the irises and stops blinking.
