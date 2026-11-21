<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import Slider from "../../slider/svelte/slider.svelte";
import { voicePicker } from "../variants";
import { formatSpeed, nextSpeed, VOICE_SPEEDS } from "../voice";
import { getVoicePicker } from "./context";

/** A slider in `stack`; in `inline` there is no room for a track, so it is one button that cycles speeds. */
let {
	min = 0.5,
	max = 2,
	step = 0.05,
	speeds = VOICE_SPEEDS,
	class: classProp,
}: {
	min?: number;
	max?: number;
	step?: number;
	/** The speeds the inline button cycles through. */
	speeds?: number[];
	class?: string;
} = $props();

const picker = getVoicePicker();
const styles = $derived(voicePicker({ variant: picker.variant }));
</script>

{#if picker.variant === "inline"}
	<Button
		data-slot="voice-picker-speed"
		variant="ghost"
		aria-label={`Speaking speed ${formatSpeed(picker.speed)}. Press to change.`}
		class={cn("tabular-nums", classProp)}
		onclick={() => (picker.speed = nextSpeed(picker.speed, speeds))}
	>
		{formatSpeed(picker.speed)}
	</Button>
{:else}
	<div data-slot="voice-picker-speed" class={cn(styles.speed(), classProp)}>
		<span class={styles.speedValue()}>{formatSpeed(picker.speed)}</span>
		<div class={styles.speedTrack()}>
			<Slider
				{min}
				{max}
				{step}
				label="Speaking speed"
				value={picker.speed}
				onValueChange={(next) => {
					if (typeof next === "number") picker.speed = next;
				}}
			/>
		</div>
	</div>
{/if}
