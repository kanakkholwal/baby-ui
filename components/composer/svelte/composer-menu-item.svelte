<script lang="ts">
import type { ComponentProps } from "svelte";
import DropdownMenuItem from "../../dropdown-menu/svelte/dropdown-menu-item.svelte";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let { class: classProp, ...rest }: ComponentProps<typeof DropdownMenuItem> = $props();
const ctx = composerState("ComposerMenuItem");
</script>

<!-- One row: put a ComposerMenuIcon, a ComposerMenuTitle and optionally a ComposerMenuHint inside. -->
<DropdownMenuItem class={cn(ctx.styles.menuRow(), classProp)} {...rest} />
