<script lang="ts">
import { demos } from "@baby-ui/demos/svelte";
import type { ComponentSpec } from "@baby-ui/registry-schema";
import { Spinner } from "@baby-ui/svelte";
import { defaultProps, specHref } from "$lib/registry";

let { spec }: { spec: ComponentSpec } = $props();

const demoPromise = $derived(demos[spec.slug]?.());
const demoProps = $derived(defaultProps(spec));
</script>

<article class="group/card relative h-full">
	<a
		href={specHref(spec)}
		aria-label="View {spec.name}"
		class="absolute inset-0 z-20 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
	></a>
	<!-- Sivir's inset frame: a rim in bg-background around a bg-card preview window, so every
	     card's preview sits in the same fixed-height box regardless of the demo's own size. -->
	<div
		class="relative flex h-full flex-col gap-3 rounded-3xl border border-border bg-background p-1 transition-colors duration-300 ease-[var(--ease-out)] group-hover/card:border-ring"
	>
		<div class="px-3 pt-2">
			<h3 class="font-semibold text-foreground text-sm">{spec.name}</h3>
			<p class="mt-1 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
				{spec.description}
			</p>
		</div>
		<div
			class="grid min-h-44 max-h-64 flex-1 place-items-center overflow-hidden rounded-[19px] bg-card p-4"
		>
			{#if demoPromise}
				{#await demoPromise}
					<Spinner size="sm" label="Loading preview" class="text-muted-foreground" />
				{:then mod}
					{@const Demo = mod.default}
					<div class="pointer-events-none scale-90 opacity-90 transition-opacity duration-300 ease-[var(--ease-out)] group-hover/card:opacity-100 motion-reduce:transition-none">
						<Demo props={demoProps} />
					</div>
				{/await}
			{/if}
		</div>
	</div>
</article>
