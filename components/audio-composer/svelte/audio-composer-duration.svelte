<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import {
	AUDIO_COMPOSER_ICONS,
	dialArc,
	dialPoint,
	dialRatio,
	durationToRatio,
	formatLength,
	ratioToDuration,
	stepDuration,
} from "../duration";
import { type AudioDurationShape, audioComposer } from "../variants";
import { getAudioComposer } from "./context";

/** How long the clip will be: minus and plus buttons, or with `shape="dial"` a knob you turn. */
let {
	shape = "stepper",
	class: classProp,
}: { shape?: AudioDurationShape; class?: string } = $props();

const composer = getAudioComposer();
const styles = audioComposer();
const ratio = $derived(durationToRatio(composer.duration, composer.min, composer.max));
const knob = $derived(dialPoint(ratio, 15, 20));

function turn(event: PointerEvent) {
	const el = event.currentTarget;
	if (!(el instanceof HTMLElement)) return;
	const box = el.getBoundingClientRect();
	const dx = event.clientX - (box.left + box.width / 2);
	const dy = event.clientY - (box.top + box.height / 2);
	composer.duration = ratioToDuration(
		dialRatio(dx, dy),
		composer.step,
		composer.min,
		composer.max,
	);
}

function key(event: KeyboardEvent) {
	const dir =
		event.key === "ArrowLeft" || event.key === "ArrowDown"
			? -1
			: event.key === "ArrowRight" || event.key === "ArrowUp"
				? 1
				: 0;
	if (!dir) return;
	event.preventDefault();
	composer.duration = stepDuration(
		composer.duration,
		dir,
		composer.step,
		composer.min,
		composer.max,
	);
}
</script>

{#snippet glyph(name: keyof typeof AUDIO_COMPOSER_ICONS)}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
		<path d={AUDIO_COMPOSER_ICONS[name]} />
	</svg>
{/snippet}

{#if shape === "dial"}
	<div data-slot="audio-composer-duration" class={cn(styles.dialGroup(), classProp)}>
		<div
			role="slider"
			data-disabled={composer.loading ? "" : undefined}
			tabindex={composer.loading ? -1 : 0}
			aria-label="Length"
			aria-valuemin={composer.min}
			aria-valuemax={composer.max}
			aria-valuenow={composer.duration}
			aria-valuetext={formatLength(composer.duration)}
			class={styles.dial()}
			onpointerdown={(event) => {
				event.currentTarget.setPointerCapture(event.pointerId);
				turn(event);
			}}
			onpointermove={(event) => {
				if (event.currentTarget.hasPointerCapture(event.pointerId)) turn(event);
			}}
			onkeydown={key}
		>
			<svg viewBox="0 0 40 40" aria-hidden="true" class="size-full" stroke-width="3" stroke-linecap="round">
				<path d={dialArc(1, 15, 20)} class={styles.dialTrack()} />
				<path d={dialArc(ratio, 15, 20)} class={styles.dialArc()} />
				<circle cx={knob[0]} cy={knob[1]} r="3.2" class={styles.dialKnob()} stroke="none" />
			</svg>
		</div>
		<span aria-live="polite" class={styles.dialValue()}>{formatLength(composer.duration)}</span>
	</div>
{:else}
	<div data-slot="audio-composer-duration" role="group" aria-label="Length" class={cn(styles.stepper(), classProp)}>
		<Button
			variant="ghost"
			size="icon-sm"
			aria-label="Shorter"
			disabled={composer.loading || composer.duration <= composer.min}
			onclick={() => (composer.duration = stepDuration(composer.duration, -1, composer.step, composer.min, composer.max))}
		>
			{@render glyph("minus")}
		</Button>
		<span aria-live="polite" class={styles.value()}>{formatLength(composer.duration)}</span>
		<Button
			variant="ghost"
			size="icon-sm"
			aria-label="Longer"
			disabled={composer.loading || composer.duration >= composer.max}
			onclick={() => (composer.duration = stepDuration(composer.duration, 1, composer.step, composer.min, composer.max))}
		>
			{@render glyph("plus")}
		</Button>
	</div>
{/if}
