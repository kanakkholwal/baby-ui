<script lang="ts">
import { ScrollProgress, type ScrollProgressPosition } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const sections = ["Overview", "Install", "Usage", "Props", "Motion", "Accessibility"];
let box = $state<HTMLDivElement | null>(null);
</script>

<div class="relative h-80 w-full max-w-md overflow-hidden rounded-xl border bg-card">
	<div bind:this={box} class="h-full overflow-y-auto px-10 py-8">
		{#each sections as title (title)}
			<section class="mb-10">
				<h3 class="mb-2 font-semibold text-foreground">{title}</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					Scroll this panel and the rail on the edge fills tick by tick, with the percentage
					riding along the fill.
				</p>
				<div class="mt-3 h-24 rounded-lg bg-foreground/[0.04]"></div>
			</section>
		{/each}
	</div>
	{#if box}
		<ScrollProgress
			container={box}
			position={(props.position as ScrollProgressPosition) ?? "right"}
			tickCount={Number(props.tickCount ?? 40)}
			height={Number(props.height ?? 160)}
			width={Number(props.width ?? 14)}
			showLabel={props.showLabel !== false}
		/>
	{/if}
</div>
