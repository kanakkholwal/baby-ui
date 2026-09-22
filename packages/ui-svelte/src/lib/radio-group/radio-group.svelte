<script lang="ts">
import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { setRadioGroupItemContext } from "./context";
import type { RadioSize, RadioVariant } from "./variants";

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
} = $props();

setRadioGroupItemContext({
	get size() {
		return size;
	},
	get variant() {
		return variant;
	},
});
</script>

<RadioGroupPrimitive.Root
	{...rest}
	bind:value
	{orientation}
	{disabled}
	{name}
	data-slot="radio-group"
	class={cn(
		"flex gap-2",
		orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-start",
		disabled && "opacity-50",
		classProp,
	)}
>
	{@render children?.()}
</RadioGroupPrimitive.Root>
