<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor, dismissable } from "../lib/anchor";
import { setPopover } from "./context";

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

const contentId = $props.id();
let triggerEl = $state<HTMLElement>();
let contentEl = $state<HTMLElement>();

setPopover({
	get open() {
		return open;
	},
	contentId,
	setOpen: (next) => (open = next),
	setTrigger: (el) => (triggerEl = el),
	setContent: (el) => (contentEl = el),
});

$effect(() => {
	if (!open || !triggerEl || !contentEl) return;
	const stopAnchor = anchor(triggerEl, contentEl, { placement, gap });
	const stopDismiss = dismissable([triggerEl, contentEl], () => {
		open = false;
		triggerEl?.focus();
	});
	return () => {
		stopAnchor();
		stopDismiss();
	};
});
</script>

{@render children?.()}
