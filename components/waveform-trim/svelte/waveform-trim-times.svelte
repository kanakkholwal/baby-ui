<script lang="ts">
import { cn } from "../../lib/cn";
import { clampRange, formatTime, MIN_GAP } from "../trim";
import { waveformTrim } from "../variants";
import { getWaveformTrim } from "./context";

/** Start, kept length and end, in seconds when `duration` is given and as percent otherwise. */
let { class: classProp }: { class?: string } = $props();

const trim = getWaveformTrim();
const styles = $derived(waveformTrim({ variant: trim.variant }));
const bounds = $derived(clampRange(trim.range, MIN_GAP));
const at = (r: number) =>
	trim.duration ? formatTime(r * trim.duration) : `${Math.round(r * 100)}%`;
const kept = $derived(
	trim.duration
		? `${formatTime((bounds[1] - bounds[0]) * trim.duration)} kept`
		: `${Math.round((bounds[1] - bounds[0]) * 100)}% kept`,
);
</script>

<p data-slot="waveform-trim-times" class={cn(styles.times(), classProp)}>
	<span>{at(bounds[0])}</span>
	<span>{kept}</span>
	<span>{at(bounds[1])}</span>
</p>
