---
title: Download Card
description: "One card for any download, with size, speed, time left and a checking state."
component: download-card
category: advanced
tags: [download, progress, setup]
---

Pass real byte counts to `DownloadCard` and compose the parts you need: header with icon,
title and percent, the bar, then a footer with the stats and cancel. Use `variant="compact"` and
only the bar and footer inside another card, such as a step in a first-run Stepper.
