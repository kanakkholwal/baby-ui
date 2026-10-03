# Baby UI design contract

The single reference for how every base component looks and moves. Tokens live in
`packages/tokens/src` (`tokens.css`, `theme.css`, `motion.css`); class contracts live in each
component's `variants.ts`.

## API

- shadcn shape only: `variant` and `size` props, plus a component-specific axis where needed
  (`side`, `density`). No new API ideology.
- Every class contract is a `tv()` object in `variants.ts`, with one slot per part
  (`backdrop`, `popup`, `panel`, `handle`...). No UPPER_CASE class-string constants.
- Prop types derive from the tv: `NonNullable<VariantProps<typeof x>["variant"]>`.
- Shared contracts are written for both primitives at once: Base UI emits
  `data-open`/`data-closed`/`data-starting-style`, bits-ui emits `data-state=open|closed`.

## Colour

- Neutrals: `background`, `card`, `popover`, `muted`, `border`, `border-strong`, `input`.
  `muted`, `popover` and `card` are close, so nested panels separate with a border.
- Accent: Blue. `primary` is `var(--accent)`; `ring` and `accent-ink` follow the theme ink.
- Status: `success`, `warning`, `destructive`, `info`.
- Theme presets swap the accent only; neutrals never change per theme.

## Shape

- `--radius` scales `sm` to `3xl` (`-4px` to `+10px`).
- Controls: `rounded-lg`. Popovers and menus: `rounded-xl`. Dialogs and sheets: `rounded-2xl`.
  Drawers: `rounded-3xl` on the free edge. Calendar days and range cells: `rounded-full`.
- Shadows: `shadow-surface`, `shadow-overlay`, `shadow-field`, `shadow-thumb`.

## Motion

Motion is CSS-only. Exits undercut entrances; reduced motion keeps opacity and drops travel.

| Contract | Used by | In | Out | Easing |
| --- | --- | --- | --- | --- |
| `ANCHORED` (`lib/anchor.ts`) | Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu, Select, Combobox, MultiSelect, NavigationMenu, DatePicker, ColorPicker field | opacity + scale 0.9 to 1, 4px lean from the trigger, 150ms | to scale 0.95, 100ms | `ease` |
| `dialogFrame` popup | Dialog, AlertDialog | opacity + scale 1.05 to 1, 250ms | to scale 0.95, 100ms | `--ease-out-quad` |
| `dialogFrame` backdrop | Dialog, AlertDialog, Command | opacity, 150ms | 100ms | `--ease-out` |
| `sheet` panel and backdrop | Sheet | translate from the edge, 250ms | 200ms | `--ease-drawer` |
| vaul | Drawer | vaul's drag physics, 500ms | gesture-driven | `--ease-drawer` |
| Command popup | Command | instant (opened from the keyboard) | fade, 100ms | `--ease-out` |
| Collapse | Accordion, Collapsible, FileTree | grid-template-rows, 200ms | 150ms | `--ease-out-quad` |
| Press | Button, menu rows, calendar days, pagination, breadcrumb ellipsis | `--press-scale*` per size | eases back over 250ms | `--ease-out-quart` |
| Check and dot | Menu checkbox/radio rows, Select, MultiSelect, RadioGroup | tick draws (stroke-dashoffset), dot pops 0.7 to 1, 250ms | reverse | linear / `--ease-out-quart` |
| Chip | MultiSelect, TagInput | pops in from 0.95, 200ms | removed at once | `--ease-out` |
| Indicator | Tabs, ToggleGroup | 250ms slide | 250ms | `--ease-drawer` |
| Filter pill (`lib/pill.ts`) | Command filters and scopes, DateRangePicker presets | 250ms slide between options | 250ms | `--ease-out` |
| Row marker | Command | snaps on keys; glides 150ms when the pointer moves it | snaps | `--ease-out` |
| Key cap | Command hints | 1px press while its key is held | 100ms | `--ease-out` |

Micro-interactions everywhere: every interactive part answers. Presses scale, the active
option's indicator slides instead of repainting, paging views slide the way they travel, chevrons
rotate with their disclosure, changing values roll or tick. Keyboard-repeated motion snaps;
pointer-driven motion may glide.

Tokens:

- Durations: `--duration-dropdown` 150, `--duration-collapse` 200, `--duration-overlay` 250,
  `--duration-panel-exit` 200, `--duration-exit` 100, `--duration-drawer` 500 (vaul only).
- Scales: `--popover-enter-scale` 0.9, `--popover-exit-scale` 0.95, `--modal-enter-scale` 1.05,
  `--press-scale` 0.97 (`-sm` 0.98, `-lg` 0.96, `-icon` 0.93, `-row` 0.98).
- Anything whose content changes size animates the size (grid rows), never pops.

## States

- Hover, highlight and open fills are a 6% foreground tint (`bg-foreground/[0.06]`), never
  `bg-muted`: muted, card and popover are the same colour, so a muted fill vanishes on them.
- Fields (Input, InputGroup, Select and Combobox triggers, MultiSelect, TagInput, ScrubField,
  date/time fields) share one frame: `border-input`, `hover:border-border-strong`,
  `border-ring` + `ring-2` on focus or while open, destructive border when invalid.
- A popover opened from a field anchors to the whole field and matches its width.
- Search, password, currency, phone and card fields are InputGroup recipes, not components.

## Date and time

- Fields are segmented (month, day, year, hour, minute, period). Literals are muted, empty
  segments show a placeholder, the focused segment takes a soft primary tint.
- Calendars read the month from the start edge with prev/next together at the end. Paging
  slides the weeks and caption the way they travel with a blur-fade. Today is a soft primary
  tint, selected a fill.
- Dropdown captions are month and year buttons opening a 4 by 3 month or year grid. The grid
  overlays the hidden day grid, so the calendar never resizes; cells are caption-sized pills
  (`h-7`, 13px), the page zooms out on open and back in on pick, and focus returns to the button.
- Pickers open their calendar on `ANCHORED`.

## Icons

- `@baby-ui/icons`: Solar line-duotone and linear (rounded corners), brands from Simple Icons.
- Chevrons and table-of-contents glyphs are linear, never duotone.

## OG images

- One accent mark per card (a dot, a period, a circle, a wash); canvases stay foreground and background.
- No blurred corner glows or grid-plus-glow backdrops. `tone` defaults to `neutral`.
- Colour-led templates (`og-pipes`, `og-gradient-mesh`) draw only from `--chart-1..5`.
- One design per template; a reference's look never hides behind a variant switch.
- Renderer limits: 2D transforms only, no `.ico` images, SVG colours via `currentColor`.
- Negative angles as `rotate-[-45deg]`: `-rotate-45` compiles to a calc() angle takumi drops.
- The renderer registers fonts under the exact `--font-*` family names; a miss falls back silently.
