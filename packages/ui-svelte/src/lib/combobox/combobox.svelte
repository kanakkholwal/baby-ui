<script lang="ts">
import type { Snippet } from "svelte";
import type { AnchorPlacement } from "../lib/anchor";
import Popover from "../popover/popover.svelte";

let {
	children,
	open = $bindable(false),
	placement = "bottom-start",
	gap = 6,
}: {
	children?: Snippet;
	open?: boolean;
	placement?: AnchorPlacement;
	gap?: number;
} = $props();
</script>

<Popover bind:open {placement} {gap}>
	{@render children?.()}
</Popover>
