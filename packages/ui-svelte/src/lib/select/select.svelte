<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor, dismissable } from "../lib/anchor";
import { setSelect } from "./context";

let {
	children,
	value = $bindable(""),
	open = $bindable(false),
	placement = "bottom-start",
	disabled = false,
}: {
	children?: Snippet;
	value?: string;
	open?: boolean;
	placement?: AnchorPlacement;
	disabled?: boolean;
} = $props();

const contentId = $props.id();
let triggerEl = $state<HTMLElement>();
let contentEl = $state<HTMLElement>();
let labels = $state<Record<string, string>>({});

function close() {
	open = false;
	triggerEl?.focus();
}

setSelect({
	get open() {
		return open;
	},
	get value() {
		return value;
	},
	get disabled() {
		return disabled;
	},
	get labels() {
		return labels;
	},
	contentId,
	register: (item, label) => {
		if (labels[item] !== label) labels = { ...labels, [item]: label };
	},
	setOpen: (next) => (open = next),
	commit: (next) => {
		value = next;
		close();
	},
	setTrigger: (el) => (triggerEl = el),
	setContent: (el) => (contentEl = el),
});

$effect(() => {
	if (!open || !triggerEl || !contentEl) return;
	const stopAnchor = anchor(triggerEl, contentEl, {
		placement,
		gap: 6,
		matchWidth: true,
	});
	const stopDismiss = dismissable([triggerEl, contentEl], close);
	return () => {
		stopAnchor();
		stopDismiss();
	};
});
</script>

{@render children?.()}
