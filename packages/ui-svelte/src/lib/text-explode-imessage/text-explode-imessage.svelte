<script lang="ts">
import { cn } from "../lib/cn";
import {
	type TextExplodeIMessageMode,
	type TextExplodeIMessageSize,
	textExplodeIMessage,
} from "./variants";

let {
	text,
	mode = "loop",
	durationMs = 4000,
	size = "lg",
	class: classProp,
}: {
	text: string;
	/** Plays continuously, or once per hover/tap. */
	mode?: TextExplodeIMessageMode;
	/** Full shrink-jitter-explode-reset cycle length, in ms. */
	durationMs?: number;
	size?: TextExplodeIMessageSize;
	class?: string;
} = $props();

// Seeded, not Math.random(): per-character values must match between SSR and hydration.
function seededRandom(seed: number): number {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function explosionVars(index: number, total: number) {
	const seed = index * 137.51;
	const direction = seededRandom(seed) > 0.5 ? -1 : 1;
	const x = seededRandom(seed + 1) * 10 * total * direction;
	const radius = total * 4;
	const angle = total > 1 ? (index / (total - 1)) * Math.PI : 0;
	const y = radius * -Math.sin(angle) * seededRandom(seed + 2);
	const rotation = seededRandom(seed + 3) * 360 * direction;
	return {
		x: `${x}px`,
		y: `${y}px`,
		rot: `${rotation}deg`,
		jitterX: `${-3 + seededRandom(seed + 4) * 6}px`,
		jitterY: `${-2 + seededRandom(seed + 5) * 4}px`,
		scaleExtra: (seededRandom(seed + 6) * 2).toFixed(2),
	};
}

const characters = $derived([...text]);
const vars = $derived.by(() =>
	characters.map((_, index) => explosionVars(index, characters.length)),
);
let playing = $state(false);

function trigger() {
	if (mode === "hover" && !playing) playing = true;
}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -- decorative hover/tap replay, no click semantics or keyboard action to offer -->
<div
	data-slot="text-explode-imessage"
	data-mode={mode}
	onmouseenter={trigger}
	onpointerdown={trigger}
	class={cn(textExplodeIMessage({ size }), classProp)}
>
	{#each characters as char, index (`${text}-${index}`)}
		<span
			class={cn("text-explode-char inline-block", mode === "hover" && playing && "text-explode-char--playing")}
			style="--te-x: {vars[index]?.x}; --te-y: {vars[index]?.y}; --te-rot: {vars[index]
				?.rot}; --te-jitter-x: {vars[index]?.jitterX}; --te-jitter-y: {vars[index]
				?.jitterY}; --te-scale-extra: {vars[index]?.scaleExtra}; --te-duration: {durationMs}ms;"
			onanimationend={() => {
				if (mode === "hover") playing = false;
			}}
		>
			{char === " " ? "\u00a0" : char}
		</span>
	{/each}
	<span class="sr-only">{text}</span>
</div>
