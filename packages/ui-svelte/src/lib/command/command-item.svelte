<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getCommand } from "./context";

let {
	children,
	value,
	keywords = "",
	class: classProp,
	onclick,
	...rest
}: {
	children?: Snippet;
	value: string;
	keywords?: string;
	class?: string;
} & HTMLButtonAttributes = $props();

const command = getCommand();
const uid = $props.id();
const visible = $derived(command.matches(`${value} ${keywords}`));
const active = $derived(command.activeId === uid);
</script>

{#if visible}
	<button
		{...rest}
		type="button"
		role="option"
		id={uid}
		data-slot="command-item"
		data-value={value}
		aria-selected={active}
		onpointermove={() => command.setActive(uid)}
		{onclick}
		class={cn(
			"flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
			active ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground",
			classProp,
		)}
	>
		{@render children?.()}
	</button>
{/if}
