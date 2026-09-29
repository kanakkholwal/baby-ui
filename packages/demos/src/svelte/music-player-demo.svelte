<script lang="ts">
import { MusicPlayer } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { TRACKS } from "../data/tracks";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof MusicPlayer>>(props));

let index = $state(0);
let playing = $state(false);
let position = $state(0);
let volume = $state(1);
const track = $derived(TRACKS[index] ?? TRACKS[0]);
const duration = $derived(track?.duration ?? 0);

$effect(() => {
	playing = Boolean(props.playing);
});
$effect(() => {
	volume = Number(props.volume ?? 1);
});

// Stands in for real playback: the demo, not the component, advances the playhead.
$effect(() => {
	if (!playing) return;
	const end = duration;
	const id = setInterval(() => {
		position = Math.min(end, position + 1);
		if (position >= end) playing = false;
	}, 1000);
	return () => clearInterval(id);
});

function go(step: number) {
	index = (index + step + TRACKS.length) % TRACKS.length;
	position = 0;
}
</script>

{#if track}
	<div class="w-full max-w-xl">
		<MusicPlayer
			{...track}
			layout={p.layout ?? "vinyl"}
			bind:playing
			bind:position
			bind:volume
			onPrevious={() => go(-1)}
			onNext={() => go(1)}
		/>
	</div>
{/if}
