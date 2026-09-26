<script lang="ts">
import { demos } from "@baby-ui/demos/svelte";
import type { ComponentSpec } from "@baby-ui/registry-schema";
import { Spinner } from "@baby-ui/svelte";
import { defaultProps, specHref } from "$lib/registry";

let { spec }: { spec: ComponentSpec } = $props();

const demoPromise = $derived(demos[spec.slug]?.());
const demoProps = $derived(defaultProps(spec));
</script>

<article class="group/card relative h-full min-w-0">
	<a
		href={specHref(spec)}
		aria-label="View {spec.name}"
		class="absolute inset-0 z-20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
	></a>
	<!-- The same inset frame as the component page's preview, so a card reads as a small preview. -->
	<div
		class="relative flex h-full flex-col rounded-xl border border-border bg-card p-1 transition-[border-color,scale] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] group-hover/card:border-border-strong group-active/card:scale-[0.99] motion-reduce:transition-none"
	>
		<div class="px-3 pt-2.5 pb-3">
			<h3 class="font-semibold text-foreground text-sm">{spec.name}</h3>
			<p class="mt-1 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
				{spec.description}
			</p>
		</div>
		<div
			class="grid min-h-44 max-h-64 min-w-0 flex-1 grid-cols-[minmax(0,1fr)] place-items-center overflow-hidden rounded-[7px] bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-4"
		>
			{#if demoPromise}
				{#await demoPromise}
					<Spinner size="sm" label="Loading preview" class="text-muted-foreground" />
				{:then mod}
					{@const Demo = mod.default}
					<!-- w-full: as a shrink-to-fit grid item, w-full demos (every chart) resolved to 0. -->
					<div
						class="pointer-events-none flex w-full scale-90 justify-center opacity-90 transition-opacity duration-[var(--duration-dropdown)] ease-[var(--ease-out)] group-hover/card:opacity-100 motion-reduce:transition-none"
					>
						<Demo props={demoProps} />
					</div>
				{/await}
			{/if}
		</div>
	</div>
</article>
