<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getTabs } from "./context";
import { tabsFrame } from "./variants";

let {
	children,
	value,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value: string;
	class?: string;
} & HTMLButtonAttributes = $props();

const tabs = getTabs();
const active = $derived(tabs.value === value);
const frame = $derived(tabsFrame({ variant: tabs.variant, size: tabs.size }));
</script>

<button
	{...rest}
	type="button"
	role="tab"
	data-slot="tabs-trigger"
	data-tab={value}
	data-state={active ? "active" : "inactive"}
	id="tab-{value}"
	aria-selected={active}
	aria-controls="panel-{value}"
	tabindex={active ? 0 : -1}
	onclick={() => tabs.setValue(value)}
	class={cn(frame.trigger(), classProp)}
>
	{@render children?.()}
</button>
