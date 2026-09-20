<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getSelect } from "./context";

let {
	placeholder = "Select an option",
	class: classProp,
	...rest
}: { placeholder?: string; class?: string } & HTMLAttributes<HTMLSpanElement> = $props();

const select = getSelect();
const label = $derived(select.labels[select.value]);
</script>

<span
	{...rest}
	data-slot="select-value"
	class={cn(label ? "text-foreground" : "text-muted-foreground", "whitespace-nowrap",classProp)}
>
	{label ?? placeholder}
</span>
