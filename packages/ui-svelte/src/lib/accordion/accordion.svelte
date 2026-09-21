<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { setAccordion } from "./context";

type Props = {
	children?: Snippet;
	type?: "single" | "multiple";
	/** Single mode only: whether the open panel can be closed again. */
	collapsible?: boolean;
	/** The open item in single mode, the open items in multiple mode. */
	value?: string | string[];
	class?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

let {
	children,
	type = "single",
	collapsible = false,
	value = $bindable(),
	class: classProp,
	...rest
}: Props = $props();

const open = $derived(value === undefined ? [] : Array.isArray(value) ? value : [value]);

setAccordion({
	get type() {
		return type;
	},
	isOpen: (item) => open.includes(item),
	toggle(item) {
		const isOpen = open.includes(item);
		if (type === "multiple") {
			value = isOpen ? open.filter((x) => x !== item) : [...open, item];
			return;
		}
		if (isOpen) {
			if (collapsible) value = "";
			return;
		}
		value = item;
	},
});
</script>

<div
	{...rest}
	data-slot="accordion"
	class={cn("divide-y divide-border overflow-hidden rounded-xl border border-border", classProp)}
>
	{@render children?.()}
</div>
