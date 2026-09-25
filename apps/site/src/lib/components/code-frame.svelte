<script lang="ts">
import type { Snippet } from "svelte";
import type { TrackEvent } from "$lib/analytics";
import CopyButton from "./copy-button.svelte";
import Tabs from "./tabs.svelte";

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

<!-- Sivir's inset frame: a tinted outer card, a header in its padding, and the code on
     an inner surface whose radius is the outer one minus border and inset. -->
<div class={["min-w-0 max-w-full rounded-xl border border-border bg-card p-1 text-foreground", classProp]}>
	<div class="flex min-h-8 items-center gap-2 px-1 pb-1">
		{#if tabs?.length}
			<!-- Long file lists scroll inside the header instead of widening the frame. -->
			<div class="scrollbar-hide min-w-0 flex-1 overflow-x-auto">
				<Tabs {tabs} bind:active variant="segment" />
			</div>
		{:else if title}
			{@render title()}
		{/if}
		<div class="ml-auto shrink-0"><CopyButton text={copyText} {analytics} iconOnly /></div>
	</div>
	<div class="relative overflow-hidden rounded-[calc(var(--radius-xl)-1px-0.25rem)] bg-background">
		{@render children()}
	</div>
</div>
