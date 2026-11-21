<script lang="ts">
import {
	Button,
	WaveformTrim,
	WaveformTrimTimes,
	WaveformTrimTrack,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { WAVEFORM_SAMPLE } from "../data/waveform";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof WaveformTrim>>(props));
const DURATION = 24;
let range = $state<[number, number]>([0.12, 0.84]);
let position = $state(0.12);
let playing = $state(false);

// The demo plays the audio inside the kept range and loops; the component only draws the playhead.
$effect(() => {
	if (!playing) return;
	const id = setInterval(() => {
		const next = position + 1 / (DURATION * 20);
		position = next >= range[1] ? range[0] : Math.max(next, range[0]);
	}, 50);
	return () => clearInterval(id);
});
</script>

<div class="grid w-full max-w-xl gap-3">
	<WaveformTrim
		peaks={WAVEFORM_SAMPLE}
		variant={p.variant}
		duration={p.duration ?? DURATION}
		bind:range
		{position}
		onseek={(next) => (position = next)}
	>
		<WaveformTrimTrack />
		<WaveformTrimTimes />
	</WaveformTrim>
	<div class="flex justify-end">
		<Button variant="secondary" size="sm" onclick={() => (playing = !playing)}>
			{playing ? "Pause" : "Play selection"}
		</Button>
	</div>
</div>
