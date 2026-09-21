<script lang="ts">
import type { Snippet } from "svelte";
import { type DialogSize, setDialog } from "./context";

let {
	children,
	open = $bindable(false),
	size = "md",
	dismissOnBackdrop = true,
}: {
	children?: Snippet;
	open?: boolean;
	size?: DialogSize;
	dismissOnBackdrop?: boolean;
} = $props();

const uid = $props.id();
let footer = $state<{ children?: Snippet; class?: string }>();

setDialog({
	get open() {
		return open;
	},
	get size() {
		return size;
	},
	get dismissOnBackdrop() {
		return dismissOnBackdrop;
	},
	titleId: `${uid}-title`,
	descriptionId: `${uid}-description`,
	setOpen: (next) => (open = next),
	get footer() {
		return footer;
	},
	set footer(next) {
		footer = next;
	},
});
</script>

{@render children?.()}
