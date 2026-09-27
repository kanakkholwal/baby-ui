<script lang="ts">
import { Spinner } from "@baby-ui/svelte";
import { demos } from "$lib/demos";
import { claim, type LiveSlot, watchLive } from "$lib/live-demo";
import type { CardItem } from "$lib/registry";

let { item }: { item: CardItem } = $props();

let frame = $state<HTMLElement>();
let live = $state(false);

const slot: LiveSlot = { visible: false, release: () => (live = false) };

function activate() {
	if (live) return;
	live = true;
	claim(slot);
}

// Live after resting in view while idle; released once far out of view.
$effect(() => {
	if (!frame) return;
	return watchLive(frame, slot, activate, () => (live = false));
});

const demoPromise = $derived(live ? demos[item.slug]?.() : undefined);
const demoProps = $derived(item.defaults);
</script>

<!-- Hover or focus mounts the demo at once; touch screens rely on the in-view rule. -->
<article
	class="group/card relative h-full min-w-0"
	onpointerenter={(e) => {
		if (e.pointerType === "mouse") activate();
	}}
	onfocusin={activate}
>
	<a
		href={item.href}
		aria-label="View {item.name}"
		class="absolute inset-0 z-20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
	></a>
	<!-- The same inset frame as the component page's preview, so a card reads as a small preview. -->
	<div
		class="relative flex h-full flex-col rounded-xl border border-border bg-card p-1 transition-[border-color,scale] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] group-hover/card:border-border-strong group-active/card:scale-[0.99] motion-reduce:transition-none"
	>
		<div class="px-3 pt-2.5 pb-3">
			<h3 class="flex items-center gap-2 font-semibold text-foreground text-sm">
				{item.name}
				{#if item.tier === "pro"}
					<span class="rounded-full bg-foreground px-1.5 py-px font-medium text-[10px] text-background">
						Pro
					</span>
				{/if}
			</h3>
			<p class="mt-1 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
				{item.description}
			</p>
		</div>
		<!-- Fixed height: a demo resolving inside must never resize the card or shift the grid. -->
		<div
			bind:this={frame}
			class="mt-auto grid h-56 min-w-0 shrink-0 grid-cols-[minmax(0,1fr)] place-items-center overflow-hidden rounded-[7px] bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] p-4"
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
