<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { type RadioSize, type RadioVariant, setRadioGroup } from "./context";

let {
	children,
	value = $bindable(""),
	orientation = "vertical",
	variant = "default",
	size = "md",
	disabled = false,
	name,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value?: string;
	orientation?: "vertical" | "horizontal";
	variant?: RadioVariant;
	size?: RadioSize;
	disabled?: boolean;
	name?: string;
	class?: string;
} & HTMLAttributes<HTMLDivElement> = $props();

let root = $state<HTMLDivElement>();

setRadioGroup({
	get value() {
		return value;
	},
	get name() {
		return name;
	},
	get size() {
		return size;
	},
	get variant() {
		return variant;
	},
	get disabled() {
		return disabled;
	},
	setValue: (next) => (value = next),
	step: (from, delta) => {
		const items = [...(root?.querySelectorAll<HTMLElement>("[data-value]") ?? [])];
		const i = items.findIndex((el) => el.dataset.value === from);
		const next = items[(i + delta + items.length) % items.length];
		if (!next?.dataset.value) return;
		value = next.dataset.value;
		next.focus();
	},
});
</script>

<div
	{...rest}
	bind:this={root}
	role="radiogroup"
	data-slot="radio-group"
	aria-orientation={orientation}
	class={cn(
		"flex gap-2",
		orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-start",
		disabled && "opacity-50",
		classProp,
	)}
>
	{@render children?.()}
</div>
