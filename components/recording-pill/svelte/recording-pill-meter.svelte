<script lang="ts">
import { cn } from "../../lib/cn";
import { meterLevel } from "../timer";
import { BAR_WEIGHTS, type RecordingPillShape, recordingPill } from "../variants";
import { getRecordingPill } from "./context";

/** Level while listening, a soft pulse while working, hidden for a notice. `bars` draws a small waveform. */
let { shape = "line", class: classProp }: { shape?: RecordingPillShape; class?: string } =
	$props();

const pill = getRecordingPill();
const styles = $derived(recordingPill({ state: pill.state, shape }));
const level = $derived(meterLevel(pill.level));
</script>

<div data-slot="recording-pill-meter" data-shape={shape} aria-hidden="true" class={cn(styles.meter(), classProp)}>
	{#if shape === "bars"}
		{#each BAR_WEIGHTS as weight, i (i)}
			<i
				class={cn(styles.bar(), pill.state === "working" && "motion-safe:animate-pulse")}
				style:transform={`scaleY(${pill.state === "listening" ? Math.max(0.15, level * weight) : 0.25})`}
				style:animation-delay={pill.state === "working" ? `${i * 120}ms` : undefined}
			></i>
		{/each}
	{:else}
		<i class={styles.fill()} style:transform={pill.state === "listening" ? `scaleX(${level})` : undefined}></i>
	{/if}
</div>
