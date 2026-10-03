<script lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@baby-ui/svelte";
import type { Snippet } from "svelte";
import type { TrackEvent } from "#lib/analytics.js";
import CopyButton from "./copy-button.svelte";

type Tab = { id: string; label: string };

let {
	tabs,
	active = $bindable(""),
	title,
	copyText,
	analytics,
	children,
	class: classProp,
}: {
	tabs?: Tab[];
	active?: string;
	title?: Snippet;
	copyText: string;
	analytics?: TrackEvent;
	children: Snippet;
	class?: string;
} = $props();
</script>

<!-- The inset frame: a tinted outer card, a header in its padding, and the code on
     an inner surface whose radius is the outer one minus border and inset. -->
<Tabs
	bind:value={active}
	variant="segment"
	size="sm"
	class="min-w-0 max-w-full rounded-xl border border-border bg-card p-1 text-foreground {classProp ?? ''}"
>
	<div class="flex min-h-8 items-center gap-2 px-1 pb-1">
		{#if tabs?.length}
			<!-- Long file lists scroll with edge arrows inside the header instead of widening it. -->
			<TabsList aria-label="Files" class="min-w-0 flex-1">
				{#each tabs as tab (tab.id)}
					<TabsTrigger value={tab.id}>{tab.label}</TabsTrigger>
				{/each}
			</TabsList>
		{:else if title}
			{@render title()}
		{/if}
		<div class="ml-auto shrink-0"><CopyButton text={copyText} {analytics} iconOnly /></div>
	</div>
	<div class="relative overflow-hidden rounded-[calc(var(--radius-xl)-1px-0.25rem)] bg-background">
		{@render children()}
	</div>
</Tabs>
