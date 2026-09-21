<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getTabs, TABS_ACTIVE, TABS_RADIUS, TABS_TRIGGER } from "./context";

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
	class={cn(
		"relative z-10 inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
		TABS_ACTIVE[tabs.variant],
		TABS_RADIUS[tabs.variant],
		TABS_TRIGGER[tabs.size],
		classProp,
	)}
>
	{@render children?.()}
</button>
