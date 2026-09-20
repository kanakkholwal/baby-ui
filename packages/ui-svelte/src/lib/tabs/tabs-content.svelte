<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getTabs } from "./context";

let {
	children,
	value,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value: string;
	class?: string;
} & HTMLAttributes<HTMLDivElement> = $props();

const tabs = getTabs();
const active = $derived(tabs.value === value);
</script>

<!-- Inactive panels stay in the DOM so their content is still findable and crawlable. -->
<div
	{...rest}
	id="panel-{value}"
	role="tabpanel"
	data-slot="tabs-content"
	data-state={active ? "active" : "inactive"}
	aria-labelledby="tab-{value}"
	hidden={!active}
	class={cn("mt-4", classProp)}
>
	{@render children?.()}
</div>
