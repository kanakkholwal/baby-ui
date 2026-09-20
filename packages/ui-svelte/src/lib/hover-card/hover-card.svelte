<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor } from "../lib/anchor";
import { setHoverCard } from "./context";

let {
	children,
	open = $bindable(false),
	placement = "bottom-start",
	openDelay = 300,
	closeDelay = 150,
}: {
	children?: Snippet;
	open?: boolean;
	placement?: AnchorPlacement;
	openDelay?: number;
	closeDelay?: number;
} = $props();

const contentId = $props.id();
let triggerEl = $state<HTMLElement>();
let contentEl = $state<HTMLElement>();
let timer: ReturnType<typeof setTimeout>;

setHoverCard({
	get open() {
		return open;
	},
	contentId,
	// The close delay is what lets the pointer cross the gap into the card.
	schedule: (next) => {
		clearTimeout(timer);
		timer = setTimeout(() => (open = next), next ? openDelay : closeDelay);
	},
	setTrigger: (el) => (triggerEl = el),
	setContent: (el) => (contentEl = el),
});

$effect(() => {
	if (!open || !triggerEl || !contentEl) return;
	return anchor(triggerEl, contentEl, { placement, gap: 8 });
});
</script>

{@render children?.()}
