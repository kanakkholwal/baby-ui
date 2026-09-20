<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { setTabs, type TabsSize, type TabsVariant } from "./context";

let {
	children,
	value = $bindable(""),
	variant = "pill",
	size = "md",
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value?: string;
	variant?: TabsVariant;
	size?: TabsSize;
	class?: string;
} & HTMLAttributes<HTMLDivElement> = $props();

setTabs({
	get value() {
		return value;
	},
	get variant() {
		return variant;
	},
	get size() {
		return size;
	},
	setValue: (next) => (value = next),
});
</script>

<div {...rest} data-slot="tabs" class={cn("flex flex-col", classProp)}>
	{@render children?.()}
</div>
