<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getTabs, TABS_RADIUS, TABS_TRIGGER } from "./context";

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
		tabs.variant === "underline" && "aria-selected:text-foreground",
		TABS_RADIUS[tabs.variant],
		TABS_TRIGGER[tabs.size],
		classProp,
	)}
>
	{@render children?.()}
	{#if tabs.variant !== "underline"}
		<span
			aria-hidden="true"
			data-tabs-label
			class="pointer-events-none absolute inset-0 inline-flex items-center justify-center text-primary-foreground transition-[clip-path] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] [clip-path:inset(0_100%_0_0)] motion-reduce:transition-none"
		>
			{@render children?.()}
		</span>
	{/if}
</button>
