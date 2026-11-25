<script lang="ts">
import type { ComponentProps } from "svelte";
import DropdownMenuLabel from "../../dropdown-menu/svelte/dropdown-menu-label.svelte";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let { class: classProp, ...rest }: ComponentProps<typeof DropdownMenuLabel> = $props();
const ctx = composerState("ComposerMenuLabel");
</script>

<!-- A heading above a run of rows. -->
<DropdownMenuLabel class={cn(ctx.styles.menuLabel(), classProp)} {...rest} />
