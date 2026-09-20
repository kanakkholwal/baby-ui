<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { setToggleGroup, type ToggleGroupSize } from "./context";

let {
	children,
	value = $bindable<string | string[]>(""),
	type = "single",
	size = "md",
	disabled = false,
	label = "Options",
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value?: string | string[];
	type?: "single" | "multiple";
	size?: ToggleGroupSize;
	disabled?: boolean;
	label?: string;
	class?: string;
} & HTMLAttributes<HTMLDivElement> = $props();

setToggleGroup({
	get size() {
		return size;
	},
	get disabled() {
		return disabled;
	},
	isOn: (item) =>
		type === "multiple" ? (value as string[]).includes(item) : value === item,
	toggle: (item) => {
		if (type === "single") {
			value = value === item ? "" : item;
			return;
		}
		const list = value as string[];
		value = list.includes(item) ? list.filter((v) => v !== item) : [...list, item];
	},
});
</script>

<div
	{...rest}
	role="group"
	data-slot="toggle-group"
	aria-label={label}
	class={cn(
		"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
		disabled && "opacity-50",
		classProp,
	)}
>
	{@render children?.()}
</div>
