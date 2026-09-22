<script lang="ts">
import type { Snippet } from "svelte";
import { type DialogSize, type DialogVariant, setDialog } from "./context";

let {
	children,
	open = $bindable(false),
	size = "md",
	variant = "default",
	dismissOnBackdrop = true,
}: {
	children?: Snippet;
	open?: boolean;
	size?: DialogSize;
	variant?: DialogVariant;
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
	get variant() {
		return variant;
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
