<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor } from "../lib/anchor";
import { setTooltip } from "./context";

let {
	children,
	open = $bindable(false),
	placement = "top",
	delay = 400,
}: {
	children?: Snippet;
	open?: boolean;
	placement?: AnchorPlacement;
	delay?: number;
} = $props();

const contentId = $props.id();
let triggerEl = $state<HTMLElement>();
let contentEl = $state<HTMLElement>();
let timer: ReturnType<typeof setTimeout>;

setTooltip({
	get open() {
		return open;
	},
	contentId,
	// Keyboard focus skips the delay: the user has already committed to the control.
	show: (immediate = false) => {
		clearTimeout(timer);
		timer = setTimeout(() => (open = true), immediate ? 0 : delay);
	},
	hide: () => {
		clearTimeout(timer);
		open = false;
	},
	setTrigger: (el) => (triggerEl = el),
	setContent: (el) => (contentEl = el),
});

$effect(() => {
	if (!open || !triggerEl || !contentEl) return;
	return anchor(triggerEl, contentEl, { placement, gap: 6 });
});

$effect(() => {
	if (!open) return;
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") open = false;
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

{@render children?.()}
