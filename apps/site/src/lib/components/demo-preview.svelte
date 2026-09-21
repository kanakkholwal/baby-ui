<script lang="ts">
import type { DemoComponent } from "@baby-ui/demos/svelte";
import type { Framework } from "@baby-ui/registry-schema";
import { REACT_RUNNER_URL } from "$lib/flags";

let {
	framework,
	slug,
	demo,
	props,
}: {
	framework: Framework;
	slug: string;
	demo: DemoComponent | undefined;
	props: Record<string, unknown>;
} = $props();

const Demo = $derived(demo);
const iframeSrc = $derived(
	REACT_RUNNER_URL
		? `${REACT_RUNNER_URL}?slug=${slug}&props=${encodeURIComponent(JSON.stringify(props))}`
		: null,
);
</script>

<div
	class="relative grid min-h-88 place-items-center overflow-hidden rounded-xl border border-border bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-8"
>
	{#if Demo}
		<Demo {props} />
	{:else}
		<p class="text-muted-foreground text-sm">No demo for this component yet.</p>
	{/if}
	{#if framework === "react" && Demo}
		{#if iframeSrc}
			<iframe
				src={iframeSrc}
				title="React preview of {slug}"
				class="h-full min-h-[18rem] w-full border-0 bg-transparent"
				sandbox="allow-scripts"
			></iframe>
		{:else}
			<!-- Same tokens, same spec: the Svelte render stands in until the React runner ships. -->
			<p class="absolute right-3 bottom-2 text-[10px] text-muted-foreground">
				Rendered by the Svelte port
			</p>
		{/if}
	{/if}
</div>
