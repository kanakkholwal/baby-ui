<script lang="ts">
import type { DemoLoader } from "@baby-ui/demos/svelte";
import type { Framework } from "@baby-ui/registry-schema";
import { Spinner } from "@baby-ui/svelte";
import { REACT_RUNNER_URL } from "$lib/flags";

let {
	framework,
	slug,
	demo,
	props,
	class: classProp,
}: {
	framework: Framework;
	slug: string;
	demo: DemoLoader | undefined;
	props: Record<string, unknown>;
	class?: string;
} = $props();

const demoPromise = $derived(demo?.());
const iframeSrc = $derived(
	REACT_RUNNER_URL
		? `${REACT_RUNNER_URL}?slug=${slug}&props=${encodeURIComponent(JSON.stringify(props))}`
		: null,
);
</script>

<!-- Sivir's inset frame: a tinted outer card, canvas sunk one level on bg-background. -->
<div class={["rounded-xl border border-border bg-card p-1", classProp]}>
	<div
		class="relative grid h-full min-h-88 grid-cols-[minmax(0,1fr)] place-items-center overflow-hidden rounded-[7px] bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-8"
	>
		{#if demoPromise}
			{#await demoPromise}
				<div class="flex flex-col items-center gap-2 text-muted-foreground text-sm">
					<Spinner size="md" label="Loading preview" />
					<span>Loading preview…</span>
				</div>
			{:then mod}
				{@const Demo = mod.default}
				<Demo {props} />
			{:catch}
				<p class="text-muted-foreground text-sm">Couldn't load this preview.</p>
			{/await}
		{:else}
			<p class="text-muted-foreground text-sm">No demo for this component yet.</p>
		{/if}
		{#if framework === "react" && demoPromise}
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
</div>
