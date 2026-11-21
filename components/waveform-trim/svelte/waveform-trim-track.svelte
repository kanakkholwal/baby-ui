<script lang="ts">
import { cn } from "../../lib/cn";
import { isKept, moveHandle, place, ratioFromPointer } from "../trim";
import { waveformTrim } from "../variants";
import { getWaveformTrim } from "./context";

/** The waveform, the cut-away shading, the playhead and both handles. */
let { class: classProp }: { class?: string } = $props();

const trim = getWaveformTrim();
const styles = $derived(waveformTrim({ variant: trim.variant }));
let track = $state<HTMLDivElement>();

function drag(which: "start" | "end", event: PointerEvent) {
	const rect = track?.getBoundingClientRect();
	const el = event.currentTarget;
	if (!rect || !(el instanceof HTMLElement) || !el.hasPointerCapture(event.pointerId))
		return;
	trim.range = moveHandle(
		trim.range,
		which,
		ratioFromPointer(event.clientX, rect.left, rect.width),
	);
}

function key(which: "start" | "end", event: KeyboardEvent) {
	const step = event.shiftKey ? 0.1 : 0.01;
	const dir =
		event.key === "ArrowLeft" || event.key === "ArrowDown"
			? -1
			: event.key === "ArrowRight" || event.key === "ArrowUp"
				? 1
				: 0;
	if (!dir) return;
	event.preventDefault();
	trim.range = moveHandle(
		trim.range,
		which,
		(which === "start" ? trim.range[0] : trim.range[1]) + dir * step,
	);
}
</script>

{#snippet handle(which: "start" | "end")}
	{@const value = which === "start" ? trim.range[0] : trim.range[1]}
	<button
		type="button"
		role="slider"
		data-slot={`waveform-trim-${which}`}
		aria-label={which === "start" ? "Trim start" : "Trim end"}
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(value * 100)}
		class={styles.handle()}
		style:left={place(value)}
		onpointerdown={(event) => {
			event.stopPropagation();
			event.currentTarget.setPointerCapture(event.pointerId);
		}}
		onpointermove={(event) => drag(which, event)}
		onkeydown={(event) => key(which, event)}
	>
		<span aria-hidden="true" class={styles.grip()}></span>
	</button>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={track}
	data-slot="waveform-trim-track"
	class={cn(styles.track(), trim.onseek && "cursor-pointer", classProp)}
	onpointerdown={(event) => {
		const rect = track?.getBoundingClientRect();
		if (rect && trim.onseek) trim.onseek(ratioFromPointer(event.clientX, rect.left, rect.width));
	}}
>
	<div class={styles.bars()}>
		{#each trim.peaks as peak, i (i)}
			<i
				class={waveformTrim({ variant: trim.variant, kept: isKept(i, trim.peaks.length, trim.range) }).bar()}
				style:height={`${Math.max(0.06, Math.min(1, peak)) * 100}%`}
			></i>
		{/each}
	</div>
	<span class={styles.cut()} style:left="0" style:width={place(trim.range[0])}></span>
	<span class={styles.cut()} style:right="0" style:width={`calc(100% - ${place(trim.range[1])})`}></span>
	{#if trim.position !== undefined}
		<span
			data-slot="waveform-trim-playhead"
			class={styles.playhead()}
			style:left={place(Math.min(1, Math.max(0, trim.position)))}
		></span>
	{/if}
	{@render handle("start")}
	{@render handle("end")}
</div>
