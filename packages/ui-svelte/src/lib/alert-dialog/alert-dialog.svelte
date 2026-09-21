<script lang="ts">
import type { Snippet } from "svelte";
import { setAlertDialog } from "./context";

let { children, open = $bindable(false) }: { children?: Snippet; open?: boolean } =
	$props();

const uid = $props.id();
let cancelEl = $state<HTMLElement>();
let footer = $state<{ children?: Snippet; class?: string }>();

setAlertDialog({
	get open() {
		return open;
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
