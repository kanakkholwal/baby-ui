<script lang="ts">
import { untrack } from "svelte";

let { value }: { value: string } = $props();

type Layer = { id: number; text: string; state: "static" | "enter" | "leave" };

const STAGGER_MS = 25;
const EXIT_MS = 160;

// svelte-ignore state_referenced_locally -- first paint shows the value still; changes animate
let layers = $state<Layer[]>([{ id: 0, text: value, state: "static" }]);
let seq = 0;

$effect(() => {
	const next = value;
	untrack(() => {
		if (layers.at(-1)?.text === next) return;
		const leaving = layers.map((layer) => ({ ...layer, state: "leave" as const }));
		layers = [...leaving, { id: ++seq, text: next, state: "enter" }];
		const longest = Math.max(...leaving.map((layer) => layer.text.length), 0);
		setTimeout(
			() => {
				const ids = new Set(leaving.map((layer) => layer.id));
				layers = layers.filter((layer) => !ids.has(layer.id));
			},
			EXIT_MS + (longest * STAGGER_MS) / 2 + 40,
		);
	});
});
</script>

<!-- A sizer holds the width; letters sit absolutely on top and roll through a vertical clip. -->
<span class="cascade relative inline-block whitespace-nowrap align-bottom"
	><span class="invisible whitespace-pre">{value}</span><span class="sr-only">{value}</span
	>{#each layers as layer (layer.id)}<span
			aria-hidden="true"
			class="absolute top-0 left-0 whitespace-pre"
			data-state={layer.state}
			>{#each [...layer.text] as char, i (i)}<span class="letter inline-block whitespace-pre" style:--i={i}
					>{char}</span
				>{/each}</span
		>{/each}</span
>

<style>
	.cascade {
		clip-path: inset(0 -999px);
	}

	[data-state="enter"] .letter {
		animation: cascade-in 420ms cubic-bezier(0.34, 1.3, 0.64, 1) both;
		animation-delay: calc(var(--i) * 25ms);
	}

	[data-state="leave"] .letter {
		animation: cascade-out 160ms cubic-bezier(0.23, 1, 0.32, 1) both;
		animation-delay: calc(var(--i) * 12.5ms);
	}

	@keyframes cascade-in {
		from {
			opacity: 0;
			transform: translateY(105%);
			filter: blur(2px);
		}
	}

	@keyframes cascade-out {
		to {
			opacity: 0;
			transform: translateY(-105%);
			filter: blur(2px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.letter {
			animation: none !important;
		}

		[data-state="leave"] {
			display: none;
		}
	}
</style>
