<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { setCollapsible } from "./context";

let {
	children,
	open = $bindable(false),
	disabled = false,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	open?: boolean;
	disabled?: boolean;
	class?: string;
} & HTMLAttributes<HTMLDivElement> = $props();

const contentId = $props.id();

setCollapsible({
	get open() {
		return open;
	},
	contentId,
	toggle: () => {
		if (!disabled) open = !open;
	},
});
</script>

<div
	{...rest}
	data-slot="collapsible"
	data-state={open ? "open" : "closed"}
	class={cn("w-full", classProp)}
>
	{@render children?.()}
</div>
