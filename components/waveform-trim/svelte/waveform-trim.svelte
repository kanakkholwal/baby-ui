<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import type { TrimRange } from "../trim";
import { type WaveformTrimVariant, waveformTrim } from "../variants";
import { setWaveformTrim } from "./context";

/** Audio with two trim handles. Peaks are 0 to 1 loudness samples your app computed. */
let {
	peaks,
	range = $bindable([0, 1]),
	onRangeChange,
	position,
	onseek,
	duration,
	variant = "bars",
	class: classProp,
	children,
	...rest
}: {
	peaks: number[];
	/** Kept part of the audio as `[start, end]`, each 0 to 1; bindable. */
	range?: TrimRange;
	onRangeChange?: (range: TrimRange) => void;
	/** Playhead, 0 to 1. The app owns playback. */
	position?: number;
	/** Called with 0 to 1 when the track is clicked; without it the track is not a seek target. */
	onseek?: (position: number) => void;
	/** Length in seconds; adds real times to `WaveformTrimTimes`. */
	duration?: number;
	variant?: WaveformTrimVariant;
	class?: string;
	children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> = $props();

setWaveformTrim({
	get peaks() {
		return peaks;
	},
	get range() {
		return range;
	},
	set range(next) {
		range = next;
		onRangeChange?.(next);
	},
	get position() {
		return position;
	},
	get onseek() {
		return onseek;
	},
	get duration() {
		return duration;
	},
	get variant() {
		return variant;
	},
});

const root = $derived(waveformTrim({ variant }).root());
</script>

<div {...rest} data-slot="waveform-trim" class={cn(root, classProp)}>
	{@render children?.()}
</div>
