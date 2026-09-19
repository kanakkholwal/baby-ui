<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { cn } from "../lib/cn.js";
	import { type InputSize, input } from "./variants.js";

	type Props = {
		value?: string;
		class?: string;
		size?: InputSize;
		invalid?: boolean;
	} & Omit<HTMLInputAttributes, "size" | "value" | "class">;

	let {
		value = $bindable(""),
		class: classProp,
		size = "md",
		invalid = false,
		...rest
	}: Props = $props();
</script>

<input
	{...rest}
	bind:value
	aria-invalid={invalid || undefined}
	class={cn(input({ size }), classProp)}
/>
