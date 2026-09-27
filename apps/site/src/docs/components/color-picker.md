---
title: Color Picker
description: Swatches plus the native colour input and a hex field.
component: color-picker
category: base
tags: [color, picker]
---

Built on `<input type="color">`, so the platform picker, the system eyedropper, and any
OS-level accessibility come free. A hand-rolled saturation square gets none of that.

The hex field is editable and labelled. For anyone who cannot use a visual picker, typing
the value is the only path, and a lot of colour pickers do not provide one.

## Popover

`variant="popover"` puts the picker behind a swatch-and-hex trigger, for toolbars and forms
where the full panel would take too much room. Pass `recent` to show the last colours used;
the parent owns that list. Where the browser has the EyeDropper API, a button reads any colour
off the screen.
