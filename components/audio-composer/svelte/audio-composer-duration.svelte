<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import RollingDigits from "../../rolling-digits/svelte/rolling-digits.svelte";
import { AUDIO_COMPOSER_ICONS, formatLength, stepDuration } from "../duration";
import { audioComposer } from "../variants";
import { getAudioComposer } from "./context";

/** How long the clip will be: minus and plus buttons around the value. */
let { class: classProp }: { class?: string } = $props();

const composer = getAudioComposer();
const styles = audioComposer();
</script>

{#snippet glyph(name: keyof typeof AUDIO_COMPOSER_ICONS)}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
		<path d={AUDIO_COMPOSER_ICONS[name]} />
	</svg>
{/snippet}

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
	<span aria-live="polite" class={styles.value()}>
		<RollingDigits value={composer.duration} format={formatLength} startOnView={false} />
	</span>
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
