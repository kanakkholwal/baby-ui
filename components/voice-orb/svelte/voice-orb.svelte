<script lang="ts">
import { untrack } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { createOrbRenderer, type OrbColors, type OrbRenderer } from "../renderer";
import {
	VOICE_ORB_PALETTES,
	type VoiceOrbSize,
	type VoiceOrbVariant,
	voiceOrb,
} from "../variants";

let {
	activity = 0,
	analyser = null,
	variant = "ember",
	size = "default",
	colors,
	active = true,
	speed = 1,
	label,
	onError,
	class: classProp,
	...rest
}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
	/** Voice level from 0 to 1, e.g. from your speech engine; ignored while `analyser` is set. */
	activity?: number;
	/** Your audio analyser; the orb reads it each frame and never opens a microphone. */
	analyser?: AnalyserNode | null;
	variant?: VoiceOrbVariant;
	size?: VoiceOrbSize;
	/** Base, highlight and shadow as hex, in place of the variant's palette. */
	colors?: OrbColors;
	/** False holds the surface still, e.g. while muted. */
	active?: boolean;
	/** How fast the liquid drifts; 0 stops it between words. */
	speed?: number;
	/** Names the orb, e.g. "Assistant is speaking"; without it the orb is decorative. */
	label?: string;
	onError?: (error: Error) => void;
} = $props();

let canvas = $state<HTMLCanvasElement>();
let renderer = $state.raw<OrbRenderer>();
let failed = $state(false);
const input = $derived({
	activity,
	analyser,
	colors: colors ?? VOICE_ORB_PALETTES[variant],
	active,
	speed,
});

$effect(() => {
	if (!canvas) return;
	const fail = (error: Error) => {
		failed = true;
		onError?.(error);
	};
	let created: OrbRenderer | undefined;
	try {
		created = createOrbRenderer(
			canvas,
			untrack(() => input),
			fail,
		);
		renderer = created;
	} catch (error) {
		fail(error instanceof Error ? error : new Error(String(error)));
	}
	return () => created?.dispose();
});
$effect(() => {
	renderer?.update(input);
});

const styles = $derived(voiceOrb({ variant, size }));
</script>

<div
	data-slot="voice-orb"
	data-variant={variant}
	data-render={failed ? "error" : "ready"}
	role={label ? "img" : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : true}
	class={cn(styles.root(), classProp)}
	{...rest}
>
	{#if failed}
		<div class={styles.fallback()}>Orb unavailable</div>
	{:else}
		<canvas bind:this={canvas} class={styles.canvas()}></canvas>
	{/if}
</div>
