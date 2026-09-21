<script lang="ts">
import type { Snippet } from "svelte";
import type { DialogVariant } from "../dialog/context";
import { setAlertDialog } from "./context";

let {
	children,
	open = $bindable(false),
	variant = "framed",
}: { children?: Snippet; open?: boolean; variant?: DialogVariant } = $props();

const uid = $props.id();
let cancelEl = $state<HTMLElement>();
let footer = $state<{ children?: Snippet; class?: string }>();

setAlertDialog({
	get open() {
		return open;
	},
	get variant() {
		return variant;
	},
	titleId: `${uid}-title`,
	descriptionId: `${uid}-description`,
	setOpen: (next) => (open = next),
	setCancel: (el) => (cancelEl = el),
	get footer() {
		return footer;
	},
	set footer(next) {
		footer = next;
	},
});

// Focus the safe choice, never the destructive one.
$effect(() => {
	if (open) cancelEl?.focus();
});
</script>

{@render children?.()}
