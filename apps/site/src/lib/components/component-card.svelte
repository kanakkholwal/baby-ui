<script lang="ts">
import { demos } from "@baby-ui/demos/svelte";
import type { ComponentSpec } from "@baby-ui/registry-schema";
import { defaultProps } from "$lib/registry";

let { spec }: { spec: ComponentSpec } = $props();

const Demo = $derived(demos[spec.slug]);
const demoProps = $derived(defaultProps(spec));
</script>

<article class="group/card relative h-full">
	<a
		href="/components/{spec.category}/{spec.slug}"
		aria-label="View {spec.name}"
		class="absolute inset-0 z-20 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
	></a>
	<div
		class="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 ease-[var(--ease-out)] group-hover/card:border-ring"
	>
		<div class="grid flex-1 place-items-center overflow-hidden p-6">
			{#if Demo}
				<div class="pointer-events-none scale-90 opacity-90 transition-[transform,opacity] duration-300 ease-[var(--ease-out)] group-hover/card:scale-95 group-hover/card:opacity-100 motion-reduce:transition-none">
					<Demo props={demoProps} />
				</div>
			{/if}
		</div>
		<div class="border-border/60 border-t px-5 py-4">
			<h3 class="font-medium text-foreground text-sm">{spec.name}</h3>
			<p class="mt-1 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
				{spec.description}
			</p>
		</div>
	</div>
</article>
