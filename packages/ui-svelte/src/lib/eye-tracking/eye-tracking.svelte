<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../lib/cn";
import { type EyeTrackingOptions, mountEyeTracking } from "./eyes";
import { type EyeTrackingSize, type EyeTrackingVariant, eyeTracking } from "./variants";

let {
	variant = "realistic",
	size = "md",
	eyeCount = 2,
	pupilRange = 0.7,
	blink = true,
	blinkInterval = 4000,
	reactivePupil = true,
	reflection = true,
	class: classProp,
}: {
	variant?: EyeTrackingVariant;
	size?: EyeTrackingSize;
	eyeCount?: number;
	/** How far the iris may travel toward the rim, 0 to 1. */
	pupilRange?: number;
	blink?: boolean;
	/** Time between blinks in ms. */
	blinkInterval?: number;
	/** Pupils widen as the pointer nears. */
	reactivePupil?: boolean;
	/** Light glints on the iris. */
	reflection?: boolean;
	class?: string;
} = $props();

let root: HTMLDivElement | undefined = $state();
let engine: ReturnType<typeof mountEyeTracking> | undefined;
const s = $derived(eyeTracking({ variant, size, blink, reflection }));
const count = $derived(Math.max(1, Math.floor(eyeCount)));
const options: EyeTrackingOptions = $derived({ pupilRange, reactivePupil });

$effect(() => {
	const el = root;
	if (!el) return;
	const mounted = untrack(() => mountEyeTracking(el, options));
	engine = mounted;
	return () => {
		mounted.destroy();
		engine = undefined;
	};
});

$effect(() => {
	void count;
	void variant;
	void size;
	engine?.update(options);
});
</script>

<div
	bind:this={root}
	aria-hidden="true"
	data-slot="eye-tracking"
	class={cn(s.root(), classProp)}
	style:--et-blink={`${blinkInterval}ms`}
>
	{#each { length: count }, i (i)}
		<div data-slot="eye-tracking-eye" class={s.eye()} style:animation-delay={`${i * 60}ms`}>
			<div class={s.iris()}>
				<div class={s.detail()}></div>
				<div class={s.pupil()}></div>
				<div class={s.glint()}></div>
				<div class={s.glintSmall()}></div>
			</div>
			<div class={s.lid()}></div>
			<div class={s.scan()}></div>
		</div>
	{/each}
</div>
