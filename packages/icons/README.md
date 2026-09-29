# @baby-ui/icons

Rounded line icons for the Baby UI site: Solar line-duotone for navigation, Solar linear for
chevrons and small glyphs, Simple Icons for brands. One Svelte component per icon, tree-shakeable.

```svelte
<script lang="ts">
import { IconSearch } from "@baby-ui/icons";
</script>

<IconSearch size={16} class="text-muted-foreground" />
```

- `size` sets width and height (default 24); every other prop lands on the `<svg>`.
- Icons are `aria-hidden` unless you pass `aria-label`.
- `import type { Icon } from "@baby-ui/icons"` types a prop that takes an icon.

## Adding an icon

1. Add a line to `icons.json`: `"our-name": "solar:<name>-line-duotone"` (or `-linear` for a plain
   glyph), `"simple:<slug>"` for a brand, or drop an SVG in `custom/` and use `"custom:<file>"`.
2. Run `pnpm --filter @baby-ui/icons generate`. It writes `src/icons/<our-name>.svelte` and the
   `IconOurName` export; never edit those by hand.
3. `pnpm --filter @baby-ui/icons check` fails when the generated files drift from the manifest.

## Sources

- Solar icon set by 480 Design, CC BY 4.0: https://www.figma.com/community/file/1166831539721848736
- Simple Icons brand marks, CC0 1.0: https://simpleicons.org
