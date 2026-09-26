<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../lib/cn";
import { createReel } from "./reel";
import { type TextReelSize, textReel } from "./variants";

let {
	items,
	prefix,
	speed = 0.6,
	paused = false,
	size = "md",
	class: classProp,
}: {
	items: string[];
	/** Small caption above the reel. */
	prefix?: string;
	/** Drift in px per frame while the page is still; scrolling boosts and steers it. */
	speed?: number;
	paused?: boolean;
	size?: TextReelSize;
	class?: string;
} = $props();

let viewport: HTMLDivElement | undefined = $state();
let track: HTMLDivElement | undefined = $state();
let copies = $state(2);
let reel: ReturnType<typeof createReel> | undefined;
const s = $derived(textReel({ size }));
const onCopies = (count: number) => (copies = count);

$effect(() => {
	void items;
	const view = viewport;
	const row = track;
	if (!view || !row) return;
	// Speed and pause flow through update(); recreating would reset the reel's position.
	reel = untrack(() => createReel(view, row, { speed, paused, onCopies }));
	return () => reel?.destroy();
});

$effect(() => {
	reel?.update({ speed, paused, onCopies });
});
</script>

<div data-slot="text-reel" class={cn(s.root(), classProp)}>
	{#if prefix}<p class={s.prefix()}>{prefix}</p>{/if}
	<div bind:this={viewport} class={s.viewport()}>
		<div bind:this={track} class={s.track()}>
			{#each { length: copies } as _, copy (copy)}
				<div aria-hidden={copy > 0 || undefined} class={s.copy()}>
					{#each items as item, i (i)}
						<div class={s.item()}>{item}</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
