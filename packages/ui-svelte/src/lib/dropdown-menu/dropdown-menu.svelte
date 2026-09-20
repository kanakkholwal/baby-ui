<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor, dismissable } from "../lib/anchor";
import { setDropdownMenu } from "./context";

let {
	children,
	open = $bindable(false),
	placement = "bottom-start",
}: { children?: Snippet; open?: boolean; placement?: AnchorPlacement } = $props();

const contentId = $props.id();
let triggerEl = $state<HTMLElement>();
let contentEl = $state<HTMLElement>();

function close() {
	open = false;
	triggerEl?.focus();
}

setDropdownMenu({
	get open() {
		return open;
	},
	contentId,
	setOpen: (next) => (open = next),
	close,
	setTrigger: (el) => (triggerEl = el),
	setContent: (el) => (contentEl = el),
});

$effect(() => {
	if (!open || !triggerEl || !contentEl) return;
	const stopAnchor = anchor(triggerEl, contentEl, { placement, gap: 6 });
	const stopDismiss = dismissable([triggerEl, contentEl], close);
	return () => {
		stopAnchor();
		stopDismiss();
	};
});
</script>

{@render children?.()}
