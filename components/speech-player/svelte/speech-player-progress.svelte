<script lang="ts">
import Progress from "../../progress/svelte/progress.svelte";
import Slider from "../../slider/svelte/slider.svelte";
import { chunkRatio } from "../chunks";
import { MAX_TICKS, type SpeechProgressShape } from "../variants";
import { getSpeechPlayer } from "./context";

/** Progress by chunk. `scrub` is a seekable track with a tick per passage; it needs `onseek`. */
let {
	label = "Reading progress",
	shape = "bar",
	onseek,
}: {
	label?: string;
	shape?: SpeechProgressShape;
	/** With `scrub`: called with the passage number (1 to `count`) to jump to. */
	onseek?: (passage: number) => void;
} = $props();

const player = getSpeechPlayer();
const scrub = $derived(
	shape === "scrub" && !!onseek && player.count > 1 && player.count <= MAX_TICKS,
);
const marks = $derived(
	Array.from({ length: player.count }, (_, i) => ({ value: i + 1 })),
);
</script>

{#if scrub}
	<Slider
		size="sm"
		{label}
		min={1}
		max={player.count}
		step={1}
		{marks}
		value={Math.max(1, player.at)}
		onValueChange={(next) => {
			if (typeof next === "number") onseek?.(next);
		}}
	/>
{:else}
	<Progress
		size="sm"
		{label}
		value={chunkRatio(player.at, player.count)}
		indeterminate={player.state === "preparing"}
	/>
{/if}
